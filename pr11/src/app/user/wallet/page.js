"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function WalletPage() {

  return (
  <div>
      <div className={styles.wallet_card}>
        <div className={styles.section}>
          <div className={styles.t_cash}>Total Cash</div>
          <div className={styles.t_history}>Transaction History</div>
        </div>
        <div className={styles.section}>
        <div className={styles._section}>
          <div className={styles.o_logo}></div>
          <div className={styles.o_logo}></div>
          <div className={styles.o_logo}></div>
          <div className={styles.o_logo}></div>
        </div>
        <div className={styles._section}>
          <div className={styles.o_info_t}>0.83</div>
          <div className={styles.o_info}>Deposit Cash</div>
          <div className={styles.o_info}>Winning Cash</div>
          <div className={styles.o_info}>Bonus Cash</div>
        </div>
        <div className={styles._section}>
          <div className={styles.ro_info_t}>$0</div>
          <div className={styles.ro_info}>$0.83</div>
          <div className={styles.ro_info}>$100</div>
        </div>
      </div>
    </div>
    <div className={styles.section}>
     <div className={styles._but_a}> + Add Cash</div>
     <div className={styles._but_w}>Withdraw</div>
    </div>
    <div className={styles.c_code}>
      <div className={styles.c_logo}></div>
      <div className={styles.c_text}>Apply Coupen Code</div>
    </div>
</div>
  );
}
