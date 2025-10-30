import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/EnergyMarketPage.css";
import "../styles/common.css";

function EnergyMarketPage({ userId }) {
  const [energySources, setEnergySources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSources, setFilteredSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEnergySources() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5173/energy/market");
        console.log("API response:", response.data);

        const sources = Array.isArray(response.data) ? response.data : [];

        setEnergySources(sources);
        setFilteredSources(sources);
        setError(null);
      } catch (err) {
        setError("Failed to load energy sources");
        setEnergySources([]);
        setFilteredSources([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEnergySources();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = energySources.filter(
      (source) =>
        (source.location &&
          source.location.toLowerCase().includes(lowerSearch)) ||
        (source.sourceType &&
          source.sourceType.toLowerCase().includes(lowerSearch))
    );
    setFilteredSources(filtered);
  }, [searchTerm, energySources]);

  return (
    <div className="market-page">
      <div style={{ position: "relative" }}>
        {userId && (
        <Link className="profile" to={`/users/${userId}`}>
          Profile
        </Link>
      )}
        {/* <Link className="profile" to={`/users/${userId}`}>
          Profile
        </Link> */}

        <h2>Energy Marketplace</h2>
        <div className="market-search">
          <input
            type="text"
            placeholder="Search by location, source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading && <p>Loading energy sources...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div className="market-list">
            <h3>Energy Sources</h3>
            {Array.isArray(filteredSources) && filteredSources.length > 0 ? (
              <ul>
                {filteredSources.map((source) => (
                  <li key={source.id}>
                    {source.name} – {source.sourceType} – {source.volume} kWh –{" "}
                    {source.location}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No energy sources match your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EnergyMarketPage;
