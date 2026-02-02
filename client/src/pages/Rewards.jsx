import RewardsPanel from '../components/RewardsPanel';
import { useUser } from '../context/UserContext';

export default function Rewards() {
  const { rewards } = useUser();

  return (
    <div className="page rewards-page">
      <h2>Raspberry Rewards</h2>
      <RewardsPanel />

      {rewards.history.length > 0 && (
        <div className="rewards-history">
          <h3>History</h3>
          <div className="history-list">
            {[...rewards.history].reverse().map((entry, i) => (
              <div key={i} className={`history-item ${entry.type}`}>
                <span className="history-points">
                  {entry.type === 'earn' ? '+' : ''}{entry.points} pts
                </span>
                <span className="history-detail">
                  {entry.type === 'earn' ? `Order #${entry.orderId}` : `Redeemed $${entry.discount.toFixed(2)} discount`}
                </span>
                <span className="history-date">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
