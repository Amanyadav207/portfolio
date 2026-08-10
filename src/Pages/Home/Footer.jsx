import { Link } from "react-scroll";
import data from "../../data/index.json";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { profile, socials } = data;

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__left">
          <Link
            to="home"
            smooth={true}
            duration={500}
            offset={-72}
            className="footer__brand"
          >
            {profile.name}
          </Link>
          <p className="footer__note">
            {profile.role} · {profile.location}
          </p>
        </div>

        <ul className="footer__links">
          {socials.map((social) => (
            <li key={social.id}>
              <a href={social.url} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
      </div>

      <div className="shell footer__base">
        <p>© {YEAR} {profile.name}</p>
        <p>Built with React.</p>
      </div>
    </footer>
  );
}
