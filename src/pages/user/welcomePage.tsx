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
    </div>
  );
}

export default WelcomePage;
