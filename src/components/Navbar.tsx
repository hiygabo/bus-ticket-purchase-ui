import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logos/logocop.png';
import './Navbar.css';

function Navbar() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));

  const syncAuth = () => {
    setToken(localStorage.getItem('admin_token'));
  };

  useEffect(() => {
    window.addEventListener('storage', syncAuth);
    window.addEventListener('auth-changed', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('auth-changed', syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_info');
    window.dispatchEvent(new Event('auth-changed'));
    window.location.href = '/';
  };

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/reservation', label: 'Book Ticket' },
    { to: '/about', label: 'About' },
    ...(token ? [{ to: '/admin', label: 'Admin' }] : []),
    ...(token ? [] : [{ to: '/login', label: 'Login' }]),
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <img
            className="navbar__brand-logo"
            src={logo}
            alt="Trans Copacabana logo"
          />
        </NavLink>

        <nav aria-label="Main navigation">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {token && (
              <li>
                <button className="navbar__logout" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <path d="M16 17l5-5-5-5" />
                    <path d="M21 12H9" />
                  </svg>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
