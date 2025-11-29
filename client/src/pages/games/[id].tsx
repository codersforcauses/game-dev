import React from "react";
// import navbar
// import footer

export default function IndividualGamePage() {
  return (
    <div className="game-landing-container">
      {/* <Navbar /> */}
      <section className="showcase-header">
        <div className="showcase-image">
          {/* Replace with actual image */}
          <span role="img" aria-label="showcase" style={{ fontSize: "48px" }}>
            🖼️
          </span>
        </div>
      </section>
      <main className="main-content">
        <h1 className="game-title">Game Title</h1>
        <div className="game-info">
          <div className="game-description">
            <p>
              Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33
              error molestias...
            </p>
            <ul>
              <li>Et laborum vitae est inventore obcaecati...</li>
              <li>Qui quisquam nihil non porro velit hic magni...</li>
            </ul>
            <p>
              <strong>Eum veniam quisquam et veniam distinctio.</strong>
            </p>
            <p>
              <em>In laudantium adipisci aut molestiae consequatur.</em>
            </p>
            <p>
              <strong>Eum itaque rerum qui enim aliquam.</strong>
            </p>
            <p>
              <em>Id dolor consequatur ut aperiam omnis.</em>
            </p>
            <p>Ut possimus architecto eos ullam ducimus ut...</p>
          </div>
          <div className="game-meta">
            <table>
              <tbody>
                <tr>
                  <td>Contributors</td>
                  <td>
                    Developer 1<br />
                    Developer 2<br />
                    Artist 1
                  </td>
                </tr>
                <tr>
                  <td>Development Stage</td>
                  <td>Beta</td>
                </tr>
                <tr>
                  <td>Host Site</td>
                  <td>itch.io/xxx</td>
                </tr>
                <tr>
                  <td>Event</td>
                  <td>Game Jam November 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <section className="game-card">
          {/* Replace with actual embed/card */}
          {/* <Image src="/assets/game-card-placeholder.png" alt="Game Card" style={{ width: '100%' }} /> */}
        </section>
        <section className="game-art">
          <h2>GAME ART</h2>
          <div className="art-gallery">
            <div className="art-item">
              <span role="img" aria-label="art" style={{ fontSize: "32px" }}>
                🖼️
              </span>
            </div>
            <div className="art-item">
              <span role="img" aria-label="art" style={{ fontSize: "32px" }}>
                🖼️
              </span>
            </div>
            <div className="art-item">
              <span role="img" aria-label="art" style={{ fontSize: "32px" }}>
                🖼️
              </span>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
