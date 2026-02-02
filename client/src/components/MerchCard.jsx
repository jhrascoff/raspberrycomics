import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MerchCard({ item }) {
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart({
      id: `merch-${item.id}`,
      title: item.name,
      price: item.price,
      color: item.color,
      issue: item.icon,
      author: item.category,
      quantity: 1,
    });
  }

  return (
    <div className="merch-card">
      <Link to={`/merch/${item.id}`} className="merch-cover" style={{ backgroundColor: item.color }}>
        <span className="merch-icon">{item.icon}</span>
        <span className="merch-category-tag">{item.category}</span>
      </Link>
      <div className="merch-info">
        <h3 className="merch-name">{item.name}</h3>
        <p className="merch-category">{item.category}</p>
        <div className="merch-footer">
          <span className="merch-price">${item.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
