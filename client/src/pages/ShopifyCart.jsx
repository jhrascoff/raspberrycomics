import { Link } from 'react-router-dom';
import { useShopify } from '../context/ShopifyContext';

export default function ShopifyCart() {
  const { checkout, removeFromShopifyCart, updateShopifyQuantity, openCheckout, cartCount, cartTotal } = useShopify();

  if (!checkout || cartCount === 0) {
    return (
      <div className="page cart-page">
        <h2>Your Cart</h2>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary">Browse Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {checkout.lineItems.map(item => {
            const image = item.variant?.image?.src;
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-cover" style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: '#D81B60' }} />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  {item.variant?.title !== 'Default Title' && (
                    <p className="cart-item-author">{item.variant?.title}</p>
                  )}
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateShopifyQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateShopifyQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <span className="cart-item-price">
                  ${(parseFloat(item.variant?.price?.amount || item.variant?.price || 0) * item.quantity).toFixed(2)}
                </span>
                <button className="cart-item-remove" onClick={() => removeFromShopifyCart(item.id)}>×</button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
          <button className="btn btn-primary btn-lg" onClick={openCheckout}>
            Checkout on Shopify
          </button>
          <p className="shopify-note">You'll be redirected to Shopify's secure checkout.</p>
        </div>
      </div>
    </div>
  );
}
