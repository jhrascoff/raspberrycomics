import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useShopify } from '../context/ShopifyContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, rewards, logout } = useUser();
  const { cartCount } = useShopify();

  const combinedCart = totalItems + cartCount;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🍇</span>
        <span className="brand-text">Raspberry Comics</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/comics" className="nav-link">Comics</Link>
        <Link to="/merch" className="nav-link">Merch</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/donate" className="nav-link">Donate</Link>
        <Link to="/rewards" className="nav-link">Rewards</Link>
        {user ? (
          <>
            <Link to="/rewards" className="nav-link rewards-link">
              <span className="tier-badge" data-tier={rewards.tier.name.toLowerCase()}>{rewards.tier.name}</span>
              {rewards.points} pts
            </Link>
            <Link to="/shop/cart" className="nav-link cart-link">
              Cart {combinedCart > 0 && <span className="cart-badge">{combinedCart}</span>}
            </Link>
            <span className="nav-user">
              {user.picture && <img src={user.picture} alt="" className="nav-avatar" />}
              {user.name}
            </span>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/shop/cart" className="nav-link cart-link">
              Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <Link to="/login" className="nav-link btn btn-primary btn-sm">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}
