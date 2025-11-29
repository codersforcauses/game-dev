import Image from "next/image";
import React from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";
import styles from "@/styles/game.module.css";

// import navbar
// import footer

export default function IndividualGamePage() {
  return (
    <div className={styles.gameLandingContainer}>
      {/* <Navbar /> */}
      <section className={styles.showcaseHeader}>
        <div className={styles.showcaseImage}>
          <Image
            src="/games/Game_Cover_Sample.png"
            alt="Game Cover"
            width={600}
            height={340}
            style={{ borderRadius: "12px", background: "#232345" }}
            className={styles.showcaseImage}
            priority
          />
        </div>
      </section>
      <main className={styles.mainContent}>
        <h1 className={styles.gameTitle}>Game Title</h1>
        <div className={styles.gameInfo}>
          <div className={styles.gameDescription}>
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
          <div className={styles.gameMeta}>
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
        <section className={styles.gameCard}>
          {/* Replace with actual embed/card */}
          {/* <Image src="/assets/game-card-placeholder.png" alt="Game Card" style={{ width: '100%' }} /> */}
        </section>
        <section className={styles.gameArt}>
          <h2>GAME ART</h2>
          <div className={styles.artGallery}>
            <div className={styles.artItem}>
              <span role="img" aria-label="art" style={{ fontSize: "32px" }}>
                🖼️
              </span>
            </div>
            <div className={styles.artItem}>
              <span role="img" aria-label="art" style={{ fontSize: "32px" }}>
                🖼️
              </span>
            </div>
            <div className={styles.artItem}>
              <span role="img" aria-label="art" style={{ fontSize: "32px" }}>
                🖼️
              </span>
            </div>
          </div>
          <ItchEmbed
            embedID="3"
            hostURL="https://leafo.itch.io/x-moon"
            name="X-Moon by leafy"
          />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
