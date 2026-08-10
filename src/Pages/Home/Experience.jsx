import data from "../../data/index.json";
import { ArrowUpRight } from "../../components/Icons";

export default function Experience() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <header className="section__head" data-reveal>
          <span className="section__index">01</span>
          <h2 className="section__title">Experience</h2>
          <p className="section__sub">
            Where I've shipped, and what actually moved.
          </p>
        </header>

        <ol className="timeline">
          {data.experience.map((job, index) => (
            <li
              key={job.id}
              className="timeline__item"
              data-reveal
              style={{ "--delay": `${index * 80}ms` }}
            >
              <span
                className={`timeline__marker ${job.current ? "is-current" : ""}`}
                aria-hidden="true"
              />

              <article className="job">
                <div className="job__head">
                  <div>
                    <h3 className="job__company">
                      <a href={job.link} target="_blank" rel="noreferrer">
                        {job.company}
                        <ArrowUpRight size={14} />
                      </a>
                      {job.current && <span className="badge">current</span>}
                    </h3>
                    <p className="job__role">{job.role}</p>
                  </div>
                  <div className="job__when">
                    <p className="job__period">{job.period}</p>
                    <p className="job__location">{job.location}</p>
                  </div>
                </div>

                <ul className="job__highlights">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>

                <ul className="tags">
                  {job.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
