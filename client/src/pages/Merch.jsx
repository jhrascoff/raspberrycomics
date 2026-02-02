import { useState, useEffect } from 'react';
import MerchCard from '../components/MerchCard';

export default function Merch() {
  const [merch, setMerch] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/merch').then(r => r.json()).then(setMerch);
  }, []);

  const categories = ['All', ...new Set(merch.map(m => m.category))];
  const filtered = filter === 'All' ? merch : merch.filter(m => m.category === filter);

  return (
    <div className="page merch-page">
      <div className="merch-hero">
        <h1>Merch Store</h1>
        <p>Rep your favorite comics with official Raspberry merch. Earn rewards points on every purchase.</p>
      </div>

      <div className="filter-bar">
        {categories.map(c => (
          <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="merch-grid">
        {filtered.map(item => <MerchCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
