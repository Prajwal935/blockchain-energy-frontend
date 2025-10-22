import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/UserProfilePage.css";

function UserProfilePage() {
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5173/api/users/${userid}`
        );
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userid]);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-section">
        <p>
          <strong>User ID:</strong> {userid}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Wallet:</strong> {user.walletAddress}
        </p>
        <p>
          <strong>Location:</strong> {user.location}
        </p>
      </div>
      <div className="profile-transactions">
        <h3>Transactions</h3>
        <ul>
          {user.transactions && user.transactions.length > 0 ? (
            user.transactions.map((txn, index) => (
              <li key={index}>
                {txn.description}: {txn.volume} kWh, ₹{txn.amount}
              </li>
            ))
          ) : (
            <li>No transactions found</li>
          )}
        </ul>
      </div>
      <div className="profile-balance">
        <p>
          <strong>Balance:</strong> ₹{user.balance}
        </p>
        <p>
          <strong>Energy Produced:</strong> {user.energyProduced} kWh
        </p>
      </div>
    </div>
  );
}

export default UserProfilePage;
