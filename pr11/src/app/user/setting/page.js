"use client";

import { useState } from 'react';
import styles from './page.module.css';

export default function MyContest() {
    const [activeTab, setActiveTab] = useState("Upcoming");

    const tabs = ["Upcoming", "Live", "Completed"];

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Toggle active class
    }

    return (
        <div>
            <div className={styles.horibar}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={`${styles.hori} ${activeTab === tab ? styles.hori2 : ""}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
        </div>
    );
}
