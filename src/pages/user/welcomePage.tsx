import { useState, useEffect, useCallback } from 'react';
import './WelcomePage.css';

interface Slide {
  src?: string;
  alt: string;
  label: string;
  color: string;
}

const slides: Slide[] = [
  { alt: 'Bus travel', label: 'Travel comfortably', color: '#1a1a2e' },
  { alt: 'Scenic route', label: 'Discover new routes', color: '#16213e' },
  { alt: 'Online booking', label: 'Book in minutes', color: '#0f3460' },
  { alt: 'Safe journey', label: 'Travel safe', color: '#533483' },
];

function WelcomePage() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="welcome">
      <section className="welcome__carousel" aria-label="Image carousel">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`welcome__carousel-slide${i === current ? ' welcome__carousel-slide--active' : ''}`}
          >
            {slide.src ? (
              <img
                className="welcome__carousel-img"
                src={slide.src}
                alt={slide.alt}
              />
            ) : (
              <div
                className="welcome__carousel-placeholder"
                style={{ background: slide.color }}
              >
                {slide.label}
              </div>
            )}
          </div>
        ))}

        <div className="welcome__carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`welcome__carousel-dot${i === current ? ' welcome__carousel-dot--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </section>

      <section className="welcome__hero">
        <h1 className="welcome__title">
          Travel with <strong>Trans Copacabana</strong>
        </h1>
        <p className="welcome__subtitle">
          Book your bus tickets online in just a few clicks. Comfort, safety
          and the best routes across the region.
        </p>
      </section>

      <section className="welcome__features">
        <div className="welcome__feature">
          <div className="welcome__feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="welcome__feature-title">Best Routes</h3>
          <p className="welcome__feature-text">
            We connect the most popular destinations with frequent daily
            departures so you can travel whenever you need.
          </p>
        </div>

        <div className="welcome__feature">
          <div className="welcome__feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3 className="welcome__feature-title">Fast & Easy</h3>
          <p className="welcome__feature-text">
            Select your route, pick your seat and confirm your purchase in
            under two minutes. It really is that simple.
          </p>
        </div>

        <div className="welcome__feature">
          <div className="welcome__feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <h3 className="welcome__feature-title">Safe Travel</h3>
          <p className="welcome__feature-text">
            Our fleet is fully maintained and every trip is operated by
            experienced, certified drivers.
          </p>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
