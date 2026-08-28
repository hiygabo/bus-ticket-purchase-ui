import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logos/logocop.png';
import './Navbar.css';
const userInfo = localStorage.getItem('user_info');
  
const user = userInfo? JSON.parse(userInfo) : null;
const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/reservation', label: 'Book Ticket' },
  { to: '/about', label: 'About' },
  ...(user && user.role === 'ADMIN'? [{ to: '/admin', label: 'Admin' }] : []),
  { to: '/login', label: 'Login' },
];

function Navbar() {


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
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
