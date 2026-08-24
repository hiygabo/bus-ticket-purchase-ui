import { Link } from 'react-router-dom';
import './Footer.css';

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/reservation', label: 'Book a Ticket' },
  { to: '/travel-search', label: 'Search Travels' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__brand">
          <p className="footer__logo">
            TRANS <strong>COPACABANA</strong>
          </p>
          <p className="footer__tagline">
            Buy your bus tickets online in minutes. Choose your travel, pick
            your seat and hit the road.
          </p>
        </section>

        <nav className="footer__col" aria-label="Explore">
          <h3 className="footer__title">Explore</h3>
          <ul className="footer__list">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link className="footer__link" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="footer__col" aria-label="Contact">
          <h3 className="footer__title">Contact</h3>
          <ul className="footer__list footer__list--contact">
            <li>Gabriel Omar Andia Alave</li>
            <li>
              <a
                className="footer__link"
                href="mailto:gaboandiaalave@gmail.com"
              >
                gaboandiaalave@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer__bottom">
        <p>
          © {year} Trans Copacabana S.A. — Developed by Gabriel Omar Andia
          Alave
          <a
            className="footer__github"
            href="https://github.com/hiygabo"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
