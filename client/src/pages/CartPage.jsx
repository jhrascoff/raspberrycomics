import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { user, token, rewards, earnPoints, redeemPoints } = useUser();
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [orderComplete, setOrderComplete] = useState(null);

  const discount = redeemAmount / 100;
  const total = Math.max(0, subtotal - discount);

  async function handleCheckout() {
    if (redeemAmount > 0) {
      await redeemPoints(redeemAmount);
    }

    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['x-user-id'] = token;
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify({ items, redeemPoints: redeemAmount }),
    });
    const order = await res.json();
    const earned = await earnPoints(order.total, order.id);

    setOrderComplete({ order, earned });
    clearCart();
    setRedeemAmount(0);
  }

  if (orderComplete) {
    return (
      <div className="page cart-page">
        <div className="order-success">
          <h2>Order Confirmed!</h2>
          <p>Order #{orderComplete.order.id} &mdash; Total: ${orderComplete.order.total.toFixed(2)}</p>
          <p className="points-earned">+{orderComplete.earned.earned} points earned!</p>
          <p>Your tier: <span className="tier-badge" data-tier={orderComplete.earned.tier.name.toLowerCase()}>{orderComplete.earned.tier.name}</span></p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page cart-page">
        <h2>Your Cart</h2>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">Browse Comics</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-cover" style={{ backgroundColor: item.color }} />
              <div className="cart-item-info">
                <h4>{item.title} #{item.issue}</h4>
                <p className="cart-item-author">{item.author}</p>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>×</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>

          {rewards.points > 0 && (
            <div className="redeem-section">
              <label>Redeem points (you have {rewards.points})</label>
              <input
                type="range"
                min={0}
                max={Math.min(rewards.points, Math.floor(subtotal * 100))}
                step={100}
                value={redeemAmount}
                onChange={e => setRedeemAmount(Number(e.target.value))}
              />
              <span>{redeemAmount} pts = -${discount.toFixed(2)}</span>
            </div>
          )}

          {discount > 0 && <div className="summary-row discount"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
          <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <p className="points-preview">You'll earn ~{Math.floor(total * 10 * rewards.tier.multiplier)} points</p>
          {user ? (
            <button className="btn btn-primary btn-lg" onClick={handleCheckout}>Checkout</button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-lg" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Sign in to Checkout</Link>
          )}
        </div>
      </div>
    </div>
  );
}
