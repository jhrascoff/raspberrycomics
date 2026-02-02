import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ComicCard({ comic }) {
  const { addToCart } = useCart();

  return (
    <div className="comic-card">
      <Link to={`/comic/${comic.id}`} className="comic-cover" style={{ backgroundColor: comic.color }}>
        <div className="comic-cover-text">
          <span className="comic-issue">#{comic.issue}</span>
        </div>
      </Link>
      <div className="comic-info">
        <h3 className="comic-title">{comic.title}</h3>
        <p className="comic-author">by {comic.author}</p>
        <div className="comic-footer">
          <span className="comic-price">${comic.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => addToCart(comic)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
