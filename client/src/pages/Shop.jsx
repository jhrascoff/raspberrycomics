import { useShopify } from '../context/ShopifyContext';

export default function Shop() {
  const { products, loading, addToShopifyCart } = useShopify();

  if (loading) return <div className="page loading">Loading store...</div>;

  if (products.length === 0) {
    return (
      <div className="page shop">
        <div className="shop-hero">
          <h1>Shopify Store</h1>
          <p>No products available yet. Add products to your Shopify store to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page shop">
      <div className="shop-hero">
        <h1>Shopify Store</h1>
        <p>Official Raspberry Comics products — powered by Shopify.</p>
      </div>

      <div className="shop-grid">
        {products.map(product => {
          const image = product.images?.[0]?.src;
          const variant = product.variants?.[0];
          const price = variant?.price?.amount || variant?.price || '0.00';

          return (
            <div key={product.id} className="shop-card">
              <div className="shop-card-image" style={image ? {} : { backgroundColor: '#D81B60' }}>
                {image ? (
                  <img src={image} alt={product.title} />
                ) : (
                  <span className="shop-card-placeholder">🍇</span>
                )}
              </div>
              <div className="shop-card-info">
                <h3>{product.title}</h3>
                <p className="shop-card-desc">{product.description?.slice(0, 100)}{product.description?.length > 100 ? '...' : ''}</p>
                <div className="shop-card-footer">
                  <span className="shop-card-price">${parseFloat(price).toFixed(2)}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToShopifyCart(variant.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
