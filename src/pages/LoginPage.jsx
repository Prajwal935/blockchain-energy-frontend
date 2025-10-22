import { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5173/auth/signin", {
        email,
        password,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to login");
      } else {
        setError("Network error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="social-login">
        <button type="button">Login with Google</button>
        <button type="button">Login with Facebook</button>
      </div>
    </div>
  );
}

export default LoginPage;
