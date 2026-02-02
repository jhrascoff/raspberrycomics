import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MerchDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/merch/${id}`).then(r => r.json()).then(data => {
      setItem(data);
      if (data.sizes?.length) setSelectedSize(data.sizes[0]);
    });
  }, [id]);

  if (!item) return <div className="page loading">Loading...</div>;

  function handleAdd() {
    addToCart({
      id: `merch-${item.id}-${selectedSize}`,
      title: `${item.name}${selectedSize !== 'One Size' ? ` (${selectedSize})` : ''}`,
      price: item.price,
      color: item.color,
      issue: item.icon,
      author: item.category,
      quantity: 1,
    });
  }

  return (
    <div className="page merch-detail">
      <Link to="/merch" className="back-link">&larr; Back to Merch</Link>
      <div className="detail-layout">
        <div className="merch-detail-cover" style={{ backgroundColor: item.color }}>
          <span className="merch-detail-icon">{item.icon}</span>
        </div>
        <div className="detail-info">
          <h1>{item.name}</h1>
          <p className="detail-author">{item.category}</p>
          <span className="detail-genre-tag">{item.category}</span>
          <p className="detail-description">{item.description}</p>

          {item.sizes && item.sizes.length > 1 && (
            <div className="merch-sizes">
              <label>Size</label>
              <div className="size-options">
                {item.sizes.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="detail-buy">
            <span className="detail-price">${item.price.toFixed(2)}</span>
            <button className="btn btn-primary" onClick={handleAdd}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
