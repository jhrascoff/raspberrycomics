import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ComicCard from '../components/ComicCard';
import MerchCard from '../components/MerchCard';

export default function Welcome() {
  const [comics, setComics] = useState([]);
  const [merch, setMerch] = useState([]);

  useEffect(() => {
    fetch('/api/comics').then(r => r.json()).then(setComics);
    fetch('/api/merch').then(r => r.json()).then(setMerch);
  }, []);

  return (
    <div className="page welcome">
      <section className="welcome-hero">
        <div className="welcome-hero-content">
          <h1>Raspberry Comics</h1>
          <p className="welcome-tagline">Stories worth collecting. Rewards worth earning.</p>
          <p className="welcome-sub">Browse our curated catalog of original comics and exclusive merch. Earn points with every purchase and unlock Berry, Jam, and Royal tier rewards.</p>
          <div className="welcome-cta">
            <Link to="/comics" className="btn btn-primary btn-lg">Browse Comics</Link>
            <Link to="/merch" className="btn btn-outline btn-lg">Shop Merch</Link>
          </div>
        </div>
      </section>

      <section className="welcome-section">
        <div className="welcome-section-header">
          <h2>Latest Comics</h2>
          <Link to="/comics" className="view-all">View all &rarr;</Link>
        </div>
        <div className="comic-grid">
          {comics.slice(0, 4).map(comic => <ComicCard key={comic.id} comic={comic} />)}
        </div>
      </section>

      <section className="welcome-features">
        <div className="feature-card">
          <span className="feature-icon">🍇</span>
          <h3>Earn Points</h3>
          <p>Get 10 points for every $1 you spend. Points multiply as you level up.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏆</span>
          <h3>Unlock Tiers</h3>
          <p>Rise through Berry, Jam, and Royal tiers for bigger multipliers and exclusive perks.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💰</span>
          <h3>Redeem Rewards</h3>
          <p>Use your points for discounts at checkout. 100 points = $1 off your order.</p>
        </div>
      </section>

      <section className="welcome-section">
        <div className="welcome-section-header">
          <h2>Popular Merch</h2>
          <Link to="/merch" className="view-all">View all &rarr;</Link>
        </div>
        <div className="merch-grid">
          {merch.slice(0, 4).map(item => <MerchCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="welcome-cta-banner">
        <h2>Support Independent Creators</h2>
        <p>Every purchase and donation helps fund the next generation of comic storytellers.</p>
        <Link to="/donate" className="btn btn-primary btn-lg">Donate Now</Link>
      </section>
    </div>
  );
}
