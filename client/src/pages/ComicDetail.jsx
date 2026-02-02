import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ComicDetail() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/comics/${id}`).then(r => r.json()).then(setComic);
  }, [id]);

  if (!comic) return <div className="page loading">Loading...</div>;

  return (
    <div className="page comic-detail">
      <Link to="/" className="back-link">&larr; Back to Shop</Link>
      <div className="detail-layout">
        <div className="detail-cover" style={{ backgroundColor: comic.color }}>
          <div className="comic-cover-text large">
            <span className="comic-issue">#{comic.issue}</span>
          </div>
        </div>
        <div className="detail-info">
          <h1>{comic.title}</h1>
          <p className="detail-author">by {comic.author}</p>
          <p className="detail-description">{comic.description}</p>
          <div className="detail-buy">
            <span className="detail-price">${comic.price.toFixed(2)}</span>
            <button className="btn btn-primary" onClick={() => addToCart(comic)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
