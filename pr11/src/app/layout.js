"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import styles from "./page.module.css";
import NoZoom from "./NoZoom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const showonUser = ["/login","/"]
  const showonLogin =["/login"]
  const showonBoth = ["/"]
  const showHome =["/user","/"]
  const showWallet =["/user/wallet"]
  const showSetting =["/user/setting"]
  const showAbout =["/user/about"]

  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NoZoom />
          <div className={styles.barr}>
            <div className={styles.left_items}>
              {!showonUser.includes(pathname)&&<div className={styles.profile} onClick={()=>router.push("/user/profile")}></div>}
              <div className={styles.logoos}></div>
            </div>
            <div className={styles.right_items}>
              {showonBoth.includes(pathname)&&<div className={styles.login_bt} onClick={()=>router.push("/login")}>Login</div>}
              {showonBoth.includes(pathname)&&<div className={styles.signin_bt} onClick={()=>router.push("/login")}>Register</div>}
              {!showonUser.includes(pathname)&&<div className={styles.notify}>🔔</div>}
            </div>
          </div>

          {!showonLogin.includes(pathname)&&<div className={styles.foot}>
            <div className={`${styles._bt} ${showHome.includes(pathname) ? styles.home_bt2 : styles.home_bt}`} onClick={()=>router.push("/user")}></div>
            <div className={`${styles._bt} ${showSetting.includes(pathname) ? styles.setting_bt2 : styles.setting_bt}`} onClick={()=>router.push("/user/setting")}></div>
            <div className={`${styles._bt} ${showWallet.includes(pathname) ? styles.wallet_bt2 : styles.wallet_bt}`} onClick={()=>router.push("/user/wallet")}></div>
            <div className={`${styles._bt} ${showAbout.includes(pathname) ? styles.about_bt2 : styles.about_bt}`} onClick={()=>router.push("/user/about")}></div>
          </div>}
        {children}
      </body>
    </html>
  );
}