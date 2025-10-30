import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/RegisterEnergyPage.css";
import "../styles/common.css";

function RegisterEnergyPage({ userId }) {
  const [volume, setVolume] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:5173/energy/register",
        {
          volume: Number(volume),
          location,
        }
      );

      setSuccess(
        "Energy volume registered successfully. Verification in progress."
      );
      setVolume("");
      setLocation("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to register energy");
      } else {
        setError("Network error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-energy-page" style={{ position: "relative" }}>
      {userId && (
        <Link className="profile" to={`/users/${userId}`} title="Go to Profile">
          Profile
        </Link>
      )}
      {/* <Link className="profile" to={`/users/${userId}`} title="Go to Profile">
        Profile
      </Link> */}

      <h2>Register Your Energy</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Volume of Energy (kWh)"
          required
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          min="0"
          step="any"
        />
        <input
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || volume <= 0 || !location.trim()}
        >
          {loading ? "Registering..." : "Register Energy"}
        </button>
      </form>
      <div className="energy-status">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {!error && !success && (
          <p>
            Energy registration will be verified and tokens minted upon
            approval.
          </p>
        )}
      </div>
    </div>
  );
}

export default RegisterEnergyPage;