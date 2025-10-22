import { useState } from "react";
import axios from "axios";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [location, setLocation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5173/auth/signup", {
        name,
        email,
        role,
        walletAddress,
        location,
        mobileNumber,
      });

      setSuccess("Registration successful! You can now log in.");
      // Clear fields
      setName("");
      setEmail("");
      setRole("");
      setWalletAddress("");
      setLocation("");
      setMobileNumber("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Network error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select required value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            Select role
          </option>
          <option value="producer">Producer</option>
          <option value="consumer">Consumer</option>
          <option value="prosumer">Prosumer</option>
        </select>
        <input
          type="text"
          placeholder="MetaMask Wallet Address"
          required
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          required
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit mobile number"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default RegisterPage;
