import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logos/logocop.png';
import './Navbar.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/reservation', label: 'Book a Ticket' },
  { to: '/travel-search', label: 'Search Travels' },
  { to: '/about', label: 'About Us' },
  { to: '/admin', label: 'Admin' },
];

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Home">
          <img
            className="navbar__brand-logo"
            src={logo}
            alt="Trans Copacabana logo"
          />
        </Link>

        <nav aria-label="Main navigation">
          <ul className="navbar__links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`.trim()
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="navbar__logout"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M10 17v-2h8V9h-8V7l-5 5 5 5zm-8-2h8v2H2v-2zm0-6h8v2H2V9zm0 0"
              fill="currentColor"
            />
          </svg>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
