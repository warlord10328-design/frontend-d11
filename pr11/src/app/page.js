import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.image_bar}>
        <div className={styles.image_window}>
          <div className={`${styles.image} ${styles.ig1}`}></div>
          <div className={`${styles.image} ${styles.ig2}`}></div>
          <div className={`${styles.image} ${styles.ig3}`}></div>
          <div className={`${styles.image} ${styles.ig4}`}></div>
          <div className={`${styles.image} ${styles.ig5}`}></div>
        </div>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.match}>
        <div className={styles.first_container}>
          <div className={styles.league}>Asia cup T20</div>
          <div className={styles.slip_bond}>
            <div className={styles.first_team}>
              <div className={styles.flag}></div>
              <div className={styles.name}>IND</div>
            </div>
            <div className={styles.tournament}>
              <div className={styles.time}>Tomorrow</div>
              <div className={styles.time}>8:00 PM</div>
              <div className={styles.vanue}>DUBAI</div>
            </div>
            <div className={styles.second_team}>
              <div className={styles.flag2}></div>
              <div className={styles.name2}>BAN</div>
            </div>
          </div>
          <div className={styles.slip}>
            <div className={styles.special}>
              <div className={styles.price_logo}></div>win <b> BIKE </b>
            </div>
            <div className={styles.special}>
              Top <b> 1000 Ranks </b> Win Cash Prizes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
