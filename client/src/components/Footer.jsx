import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-icon">🍇</span>
          <span className="footer-brand-text">Raspberry Comics</span>
          <p className="footer-tagline">Your favorite comic book store.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <Link to="/comics">Browse Comics</Link>
          <Link to="/merch">Merch</Link>
          <Link to="/shop">Shopify Store</Link>
          <Link to="/shop/cart">Cart</Link>
          <Link to="/rewards">Rewards</Link>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/donate">Donate</Link>
          <Link to="/login">My Account</Link>
        </div>
        <div className="footer-links">
          <h4>Connect</h4>
          <a href="#" onClick={e => e.preventDefault()}>Twitter</a>
          <a href="#" onClick={e => e.preventDefault()}>Instagram</a>
          <a href="#" onClick={e => e.preventDefault()}>Discord</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Raspberry Comics. All rights reserved.</p>
      </div>
    </footer>
  );
}
