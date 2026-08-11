"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import type { editor as MonacoEditor } from "monaco-editor";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";

// Use the bundled Monaco rather than the loader's default CDN copy. Two
// reasons: nothing is fetched from a third-party host at runtime, and
// y-monaco binds against this exact instance — a second copy would hand it
// models it does not recognise.
loader.config({ monaco });

if (typeof window !== "undefined" && !(window as unknown as Record<string, unknown>).MonacoEnvironment) {
  // Go highlighting is Monarch-based and needs no web worker; this stub keeps
  // Monaco from throwing if some other language service asks for one.
  (window as unknown as Record<string, unknown>).MonacoEnvironment = {
    getWorker: () => new Worker(URL.createObjectURL(new Blob([""], { type: "text/javascript" }))),
  };
}

// Monaco's stock vs-dark is blue-black and fights the warm palette.
const THEME = "warm-dark";
monaco.editor.defineTheme(THEME, {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#1b1815",
    "editor.foreground": "#ede6da",
    "editorGutter.background": "#1b1815",
    "editorLineNumber.foreground": "#7c7263",
    "editorLineNumber.activeForeground": "#f5a524",
    "editorCursor.foreground": "#f5a524",
    "editor.selectionBackground": "#3c362d",
    "editorIndentGuide.background1": "#2b2620",
  },
});

/** Marks a transaction as arriving from the other peer, so we never echo it back. */
const REMOTE = "remote";

const TEXT_KEY = "code";

const SEED = `// Two independent Yjs documents, one per peer.
// Type in either pane — updates cross-apply as CRDT deltas.
// Go offline, edit both, then reconnect: they converge.

func worker(jobs <-chan Job, out chan<- Result) {
	for j := range jobs {
		out <- process(j)
	}
}
`;

const EDITOR_OPTIONS: MonacoEditor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 12.5,
  lineHeight: 20,
  fontFamily: "JetBrains Mono, ui-monospace, monospace",
  scrollBeyondLastLine: false,
  automaticLayout: true,
  renderLineHighlight: "none",
  overviewRulerLanes: 0,
  scrollbar: { vertical: "auto", horizontalScrollbarSize: 8, verticalScrollbarSize: 8 },
  padding: { top: 10, bottom: 10 },
  tabSize: 2,
  wordWrap: "on",
};

type Peer = "a" | "b";

export function ConfluxDemo() {
  // Two docs standing in for two clients. Created once, never recreated.
  const docs = useRef<{ a: Y.Doc; b: Y.Doc }>();
  if (!docs.current) {
    docs.current = { a: new Y.Doc(), b: new Y.Doc() };
    docs.current.a.getText(TEXT_KEY).insert(0, SEED);
    // Bring B up to date with the seed before either editor mounts.
    Y.applyUpdate(docs.current.b, Y.encodeStateAsUpdate(docs.current.a), REMOTE);
  }

  const bindings = useRef<Partial<Record<Peer, MonacoBinding>>>({});
  const online = useRef(true);

  const [isOnline, setIsOnline] = useState(true);
  const [pending, setPending] = useState({ a: 0, b: 0 });
  const [converged, setConverged] = useState(true);

  const sample = useCallback(() => {
    const { a, b } = docs.current!;
    setConverged(a.getText(TEXT_KEY).toString() === b.getText(TEXT_KEY).toString());
  }, []);

  // Relay updates between the two docs while "connected".
  useEffect(() => {
    const { a, b } = docs.current!;

    const relay = (to: Y.Doc, peer: Peer) => (update: Uint8Array, origin: unknown) => {
      if (origin === REMOTE) return;
      if (!online.current) {
        setPending((p) => ({ ...p, [peer]: p[peer] + 1 }));
        sample();
        return;
      }
      Y.applyUpdate(to, update, REMOTE);
      sample();
    };

    const onA = relay(b, "a");
    const onB = relay(a, "b");

    a.on("update", onA);
    b.on("update", onB);

    return () => {
      a.off("update", onA);
      b.off("update", onB);
    };
  }, [sample]);

  useEffect(
    () => () => {
      Object.values(bindings.current).forEach((binding) => binding?.destroy());
      bindings.current = {};
    },
    []
  );

  const attach = (peer: Peer) => (editor: MonacoEditor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    bindings.current[peer]?.destroy();
    bindings.current[peer] = new MonacoBinding(
      docs.current![peer].getText(TEXT_KEY),
      model,
      new Set([editor])
    );
  };

  const toggleConnection = () => {
    const next = !online.current;
    online.current = next;
    setIsOnline(next);

    if (next) {
      // Reconnect the way a real provider does: exchange state vectors, then
      // send only what the other side is missing. Order is irrelevant.
      const { a, b } = docs.current!;
      Y.applyUpdate(b, Y.encodeStateAsUpdate(a, Y.encodeStateVector(b)), REMOTE);
      Y.applyUpdate(a, Y.encodeStateAsUpdate(b, Y.encodeStateVector(a)), REMOTE);
      setPending({ a: 0, b: 0 });
      sample();
    }
  };

  const reset = () => {
    const { a, b } = docs.current!;
    online.current = true;
    setIsOnline(true);
    [a, b].forEach((doc) => {
      const text = doc.getText(TEXT_KEY);
      doc.transact(() => {
        text.delete(0, text.length);
        text.insert(0, SEED);
      }, REMOTE);
    });
    Y.applyUpdate(b, Y.encodeStateAsUpdate(a, Y.encodeStateVector(b)), REMOTE);
    Y.applyUpdate(a, Y.encodeStateAsUpdate(b, Y.encodeStateVector(a)), REMOTE);
    setPending({ a: 0, b: 0 });
    setConverged(true);
  };

  const totalPending = pending.a + pending.b;

  return (
    <section className="my-8 overflow-hidden rounded-md border border-line bg-surface">
      {/* control bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
          live crdt demo
        </span>

        <span className="flex items-center gap-2 font-mono text-[11px]">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: isOnline ? "var(--accent)" : "var(--dim)" }}
          />
          <span className={isOnline ? "text-accent" : "text-dim"}>
            {isOnline ? "connected" : "disconnected"}
          </span>
        </span>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleConnection}
            className="rounded border border-line-2 px-2 py-1 font-mono text-[11px] text-muted hover:border-accent hover:text-accent"
          >
            {isOnline ? "go offline" : "reconnect"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-line px-2 py-1 font-mono text-[11px] text-dim hover:border-line-2 hover:text-muted"
          >
            reset
          </button>
        </div>
      </div>

      {/* the two peers */}
      <div className="grid gap-px bg-line md:grid-cols-2">
        {(["a", "b"] as Peer[]).map((peer) => (
          <div key={peer} className="bg-bg">
            <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
              <span className="font-mono text-[11px] text-muted">peer {peer.toUpperCase()}</span>
              {pending[peer] > 0 && (
                <span className="font-mono text-[10px] text-dim">
                  {pending[peer]} local edit{pending[peer] === 1 ? "" : "s"} unsent
                </span>
              )}
            </div>
            <Editor
              height="252px"
              defaultLanguage="go"
              theme={THEME}
              onMount={attach(peer)}
              options={EDITOR_OPTIONS}
              loading={
                <span className="font-mono text-[11px] text-dim">initialising editor…</span>
              }
            />
          </div>
        ))}
      </div>

      {/* status line */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line px-3 py-2 font-mono text-[11px]">
        <span className={converged ? "text-accent" : "text-dim"}>
          {converged ? "documents identical" : "documents diverged"}
        </span>
        <span className="text-dim">·</span>
        <span className="text-dim">
          {isOnline
            ? "updates relayed as they are produced"
            : `${totalPending} update${totalPending === 1 ? "" : "s"} held — reconnect to exchange state vectors`}
        </span>
      </div>

      <noscript>
        <p className="border-t border-line px-3 py-3 text-[13px] text-muted">
          This demo needs JavaScript. The rest of this page does not.
        </p>
      </noscript>
    </section>
  );
}
