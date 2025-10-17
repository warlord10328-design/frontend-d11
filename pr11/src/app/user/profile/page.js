"use client";
import styles from "./page.module.css";

export default function PageUser() {
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_card}>
        <div className={styles.profile_image}></div>

        <h2 className={styles.profile_name}>User_10328</h2>
        <p className={styles.user_email}>user10328@gmail.com</p>

        {/* ---- Non-editable info ---- */}
        <div className={styles.section_title}>Account Info</div>
        <div className={styles.info_section}>
          <div className={styles.info_row}>
            <span className={styles.label}>Total Matches Played</span>
            <span className={styles.value}>10</span>
          </div>
          <div className={styles.info_row}>
            <span className={styles.label}>Total Winnings</span>
            <span className={styles.value}>₹1230</span>
          </div>
        </div>

        {/* ---- Editable info ---- */}
        <div className={styles.section_title}>Personal Info</div>
        <div className={styles.info_section}>
          <div className={styles.info_row}>
            <span className={styles.label}>Name</span>
            <input
              className={styles.input_field}
              type="text"
              defaultValue="Aniket Ghadge"
            />
          </div>
          <div className={styles.info_row}>
            <span className={styles.label}>UPI ID</span>
            <input
              className={styles.input_field}
              type="text"
              defaultValue="user@upi"
            />
          </div>
          <div className={styles.info_row}>
            <span className={styles.label}>State</span>
            <input
              className={styles.input_field}
              type="text"
              defaultValue="Maharashtra"
            />
          </div>
          <div className={styles.info_row}>
            <span className={styles.label}>Birth Date</span>
            <input
              className={styles.input_field}
              type="date"
              defaultValue="2000-10-15"
            />
          </div>
          <div className={styles.info_row}>
            <span className={styles.label}>Gender</span>
            <select className={styles.input_field}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.info_row}>
            <span className={styles.label}>Mobile No.</span>
            <input
              className={styles.input_field}
              type="text"
              defaultValue="+91 9970410861"
            />
          </div>
        </div>

        <div className={styles.action_buttons}>
          <button className={styles.edit_bt}>Save Changes</button>
          <button className={styles.logout_bt}>Logout</button>
        </div>
      </div>
    </div>
  );
}
