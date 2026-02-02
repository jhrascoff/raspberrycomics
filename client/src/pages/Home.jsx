import { useState, useEffect } from 'react';
import ComicCard from '../components/ComicCard';

export default function Home() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetch('/api/comics').then(r => r.json()).then(setComics);
  }, []);

  return (
    <div className="page home">
      <div className="home-hero">
        <h1>Welcome to Raspberry Comics</h1>
        <p>Your favorite comic book store. Earn rewards with every purchase.</p>
      </div>

      <div className="comic-grid">
        {comics.map(comic => <ComicCard key={comic.id} comic={comic} />)}
      </div>
    </div>
  );
}
