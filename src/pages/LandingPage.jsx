import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Blockchain Energy Trading</h1>
      <p>
        Welcome! Learn about the project, view manuals, and explore peer-to-peer
        energy trading using blockchain.
      </p>
      <div className="landing-links">
        <a href="/auth/signin" className="button">
          Login
        </a>
        <a href="/auth/signup" className="button">
          Registration
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
