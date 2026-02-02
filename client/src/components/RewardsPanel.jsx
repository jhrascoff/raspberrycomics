import { useUser } from '../context/UserContext';

export default function RewardsPanel() {
  const { rewards } = useUser();
  const { tier } = rewards;

  const progress = tier.nextAt
    ? Math.min(100, (rewards.points / tier.nextAt) * 100)
    : 100;

  return (
    <div className="rewards-panel">
      <div className="rewards-header">
        <h3>Your Rewards</h3>
        <span className="tier-badge large" data-tier={tier.name.toLowerCase()}>{tier.name} Tier</span>
      </div>

      <div className="points-display">
        <span className="points-number">{rewards.points}</span>
        <span className="points-label">points</span>
      </div>

      {tier.nextAt && (
        <div className="tier-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-text">{tier.nextAt - rewards.points} points to {tier.next}</p>
        </div>
      )}

      <div className="rewards-perks">
        <h4>Your Perks</h4>
        <ul>
          <li>{tier.multiplier}x points multiplier</li>
          {tier.freeShipping && <li>Free shipping on all orders</li>}
          <li>100 points = $1.00 discount</li>
        </ul>
      </div>

      <div className="tier-overview">
        <h4>All Tiers</h4>
        <div className="tier-list">
          <div className={`tier-item ${tier.name === 'Berry' ? 'active' : ''}`}>
            <span className="tier-badge" data-tier="berry">Berry</span>
            <span>0+ pts &middot; 1x multiplier</span>
          </div>
          <div className={`tier-item ${tier.name === 'Jam' ? 'active' : ''}`}>
            <span className="tier-badge" data-tier="jam">Jam</span>
            <span>500+ pts &middot; 1.5x multiplier</span>
          </div>
          <div className={`tier-item ${tier.name === 'Royal' ? 'active' : ''}`}>
            <span className="tier-badge" data-tier="royal">Royal</span>
            <span>2000+ pts &middot; 2x + free shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}
