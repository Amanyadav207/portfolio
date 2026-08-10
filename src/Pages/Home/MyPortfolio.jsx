import data from "../../data/index.json";
import { ArrowUpRight } from "../../components/Icons";

export default function MyPortfolio() {
  const github = data.socials.find((s) => s.id === "github");

  return (
    <section id="projects" className="section section--alt">
      <div className="shell">
        <header className="section__head section__head--split" data-reveal>
          <div>
            <span className="section__index">02</span>
            <h2 className="section__title">Projects</h2>
            <p className="section__sub">Things I built to learn the hard parts.</p>
          </div>
          <a
            className="btn btn--ghost"
            href={github.url}
            target="_blank"
            rel="noreferrer"
          >
            All repositories
            <ArrowUpRight size={16} />
          </a>
        </header>

        <div className="projects">
          {data.projects.map((project, index) => (
            <a
              key={project.id}
              className="project"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              data-reveal
              style={{ "--delay": `${index * 80}ms` }}
            >
              <div className="project__top">
                <h3 className="project__title">{project.title}</h3>
                <span className="project__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <p className="project__blurb">{project.blurb}</p>

              <ul className="project__highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>

              <ul className="tags">
                {project.tech.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
