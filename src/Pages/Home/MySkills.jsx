import data from "../../data/index.json";

export default function MySkills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <header className="section__head" data-reveal>
          <span className="section__index">03</span>
          <h2 className="section__title">Toolkit</h2>
          <p className="section__sub">What I reach for, grouped by the job it does.</p>
        </header>

        <div className="skills">
          {data.skills.map((group, index) => (
            <div
              key={group.group}
              className="skillgroup"
              data-reveal
              style={{ "--delay": `${index * 40}ms` }}
            >
              <h3 className="skillgroup__title">{group.group}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
