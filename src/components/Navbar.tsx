import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logos/logocop.png';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/travel-search', label: 'Book a Ticket' },
  { to: '/about', label: 'About Us' },
];

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('admin_token')
  );

  let userName = '';
  let role = '';
  const token = localStorage.getItem('admin_token');
  
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      userName = decoded.full_name || '';
      role = decoded.role;
    } catch {
      userName = '';
      role = '';
    }
  }

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('admin_token'));
    };
    window.addEventListener('auth-changed', handleAuthChange);
    return () => window.removeEventListener('auth-changed', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.dispatchEvent(new Event('auth-changed'));
    navigate('/');
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

        {isAuthenticated ? (

          <>
          {userName && <span className="navbar__greeting">Hi, {userName}</span>}

            {role == 'ADMIN'? (
              <NavLink
              to="/admin"
              className={({ isActive }) =>
                `navbar__link navbar__admin ${isActive ? 'navbar__link--active' : ''}`.trim()
              }
            >
              Admin
            </NavLink>
            ):null}
            <button
              type="button"
              className="navbar__logout"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar__login">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
