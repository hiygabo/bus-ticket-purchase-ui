import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const stats = [
  { value: '15+', label: 'Years of experience' },
  { value: '9', label: 'Departments connected' },
  { value: '50+', label: 'Daily departures' },
  { value: '2M+', label: 'Passengers served' },
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Our Story',
    text: 'Founded in the heart of the Andes, Trans Copacabana began as a small family operation connecting La Paz to the shores of Lake Titicaca. Today, we are one of Bolivia\'s most trusted transport companies.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    title: 'Our Mission',
    text: 'To provide safe, comfortable and affordable transportation across Bolivia, connecting people with the places they love while supporting local communities along every route.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    title: 'Our Vision',
    text: 'To become Bolivia\'s leading bus transport company by 2030, setting the standard for modern, sustainable and passenger-first travel across South America.',
  },
];

const milestones = [
  { year: '2009', event: 'Trans Copacabana is founded with 3 buses and a single route: La Paz – Copacabana.' },
  { year: '2013', event: 'Expansion to 5 departments. New modern fleet with onboard Wi-Fi and entertainment.' },
  { year: '2017', event: 'We reach 1 million passengers. Launch of the online ticket booking platform.' },
  { year: '2021', event: 'Coverage of all 9 Bolivian departments. Partnership with local tourism agencies.' },
  { year: '2024', event: 'Over 2 million passengers served. Introduction of eco-friendly buses on major routes.' },
];

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-overlay" />
        <div className="about__hero-content">
          <span className="about__hero-tag">Who we are</span>
          <h1 className="about__hero-title">
            Connecting Bolivia,<br />
            <strong>One journey at a time</strong>
          </h1>
          <p className="about__hero-text">
            For over 15 years, Trans Copacabana has been the bridge between
            Bolivia's most stunning destinations and the people who love to explore them.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="about__stat">
            <span className="about__stat-value">{stat.value}</span>
            <span className="about__stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="about__values">
        {values.map((item) => (
          <div key={item.title} className="about__value">
            <div className="about__value-icon">{item.icon}</div>
            <h3 className="about__value-title">{item.title}</h3>
            <p className="about__value-text">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="about__timeline-section">
        <h2 className="about__section-title">
          Our <strong>Journey</strong>
        </h2>
        <div className="about__timeline">
          {milestones.map((m) => (
            <div key={m.year} className="about__timeline-item">
              <div className="about__timeline-dot" />
              <div className="about__timeline-line" />
              <span className="about__timeline-year">{m.year}</span>
              <p className="about__timeline-event">{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <h2 className="about__cta-title">
          Ready to ride with us?
        </h2>
        <p className="about__cta-text">
          Experience the comfort and safety that over 2 million passengers already trust.
        </p>
        <button
          className="about__cta-btn"
          onClick={() => navigate('/reservation')}
        >
          Book your trip
        </button>
      </section>
    </div>
  );
}

export default AboutUs;
