'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import validator from 'validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [togo, setActive] = useState("I don't have an account");
  const isLogin = togo === "I don't have an account";
  const [showPass, setShowPass] = useState(false);
  const [flip, setFlip] = useState(false);
  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);

  // ------------------- Toast -------------------
  const showToast = (msg, type = 'error') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ------------------- Toggle -------------------
  const toggleMode = () => {
    setActive(isLogin ? "I have an account" : "I don't have an account");
    setEmail(''); setPassword(''); setConfirmPassword('');
  };
  const togglePass = () => setShowPass(!showPass);
  const flipCard = () => { setFlip(!flip); stopTimer(); };

  // ------------------- OTP Timer -------------------
  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) { clearInterval(timerRef.current); timerRef.current = null; return 0; }
        return prev - 1;
      });
    }, 1000);
  };
  const stopTimer = () => { clearInterval(timerRef.current); timerRef.current = null; setTimer(10); };

  // ------------------- Sanitize -------------------
  const sanitizeEmail = input => input.trim().toLowerCase().replace(/\s+/g, '');
  const sanitizePassword = input => input.trim();

  // ------------------- Validate -------------------
  const validateInputs = () => {
    const cleanEmail = sanitizeEmail(email);
    const cleanPassword = sanitizePassword(password);
    const cleanConfirm = sanitizePassword(confirmPassword);

    if (!cleanEmail || !cleanPassword) { showToast("Please fill all required fields"); return null; }
    if (!validator.isEmail(cleanEmail)) { showToast("Invalid email"); return null; }
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(cleanPassword)) { showToast("Password must include uppercase, lowercase, number & special char"); return null; }
    if (!isLogin && cleanPassword !== cleanConfirm) { showToast("Passwords do not match"); return null; }

    return { cleanEmail, cleanPassword };
  };

  // ------------------- Safe Fetch -------------------
  const safeFetch = async (url, options) => {
    try {
      const res = await fetch(url, { ...options, credentials: 'include' });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) throw new Error("Server did not return JSON");
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      return { error: "Something went wrong" };
    }
  };

  // ------------------- Submit Auth -------------------
  const submitAuth = async () => {
    const valid = validateInputs();
    if (!valid) return;
    const { cleanEmail, cleanPassword } = valid;

    try {
      if (isLogin) {
        const data = await safeFetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        });
        if (data.error) return showToast(data.error);
        showToast(data.message, "success");
        setUser(data.user);
      } else {
        // Send OTP first
        const otpData = await safeFetch("http://localhost:5000/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail }),
        });
        if (otpData.error) return showToast(otpData.error);
        showToast("OTP sent!", "success");
        flipCard();
        startTimer();
      }
    } catch (err) { showToast("Something went wrong"); }
  };

  // ------------------- Verify OTP -------------------
  const verifyOtp = async () => {
    try {
      const data = await safeFetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp, password }),
      });
      if (data.error) return showToast(data.error);
      showToast(data.message, "success");
      flipCard();
      stopTimer();
      setUser(data.user);
    } catch (err) { showToast("Something went wrong"); }
  };

  // ------------------- Check user on load -------------------
  useEffect(() => {
    safeFetch("http://localhost:5000/me", { method: "GET" }).then(data => setUser(data.user));
  }, []);

  const logout = async () => {
    await safeFetch("http://localhost:5000/logout", { method: "POST" });
    setUser(null);
  };

  // ------------------- Render -------------------
  return (
    <div>
      {toast && <div className={`${styles.toast} ${toast.type==='error'?styles.toastError:styles.toastSuccess}`}>{toast.message}</div>}

      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
          {/* Login/Register Card */}
          <div className={`${styles.outbox} ${flip?styles.flipped:''}`}>
            <div className={isLogin?styles.inheadl:styles.inheads}>{isLogin?"Log in":"Sign in"}</div>
            <div className={styles.greet}>{isLogin?"🏏 Welcome back, champ!":"🎯 Start your winning journey!"}</div>

            <div className={styles.emailheading}>Email *</div>
            <input className={styles.email} type="email" placeholder="Enter your Email" value={email} onChange={e=>setEmail(sanitizeEmail(e.target.value))} />

            <div className={styles.emailheading}>{isLogin?"Password *":"Set Password *"}</div>
            <input className={styles.email} type={showPass?"text":"password"} placeholder="Enter Your Password" value={password} onChange={e=>setPassword(sanitizePassword(e.target.value))} />
            <div className={styles.hider} onClick={togglePass}>{showPass?"😳":"🫣"}</div>

            {!isLogin && <>
              <div className={styles.emailheading}>Confirm Password *</div>
              <input className={styles.email} type={showPass?"text":"password"} placeholder="Confirm Your Password" value={confirmPassword} onChange={e=>setConfirmPassword(sanitizePassword(e.target.value))} />
            </>}

            <div className={isLogin?styles.forgot:styles.thenone}>forgot password</div>
            <button className={isLogin?styles.butl:styles.buts} onClick={submitAuth}>{isLogin?"Log in":"Sign in"}</button>
            <div className={styles.toog} onClick={toggleMode}>{togo}</div>
          </div>

          {/* OTP Card */}
          <div className={`${styles.outbox2} ${flip?'':styles.flipped}`}>
            <div className={isLogin?styles.inheadl:styles.inheads}>{isLogin?"Log in":"Sign in"}</div>
            <div className={styles.greet}>{isLogin?"🏏 Welcome back, champ!":"🎯 Start your winning journey!"}</div>

            <div className={`${styles.emailheading} ${styles.otp}`}>Verification code *</div>
            <input className={styles.email} type="text" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter code here" />
            <button className={styles.butl} onClick={verifyOtp}>Verify OTP</button>

            <div className={styles.butl} style={{filter:"grayscale(100%)"}} onClick={submitAuth}>Resend ({timer})</div>
            <div className={styles.forgot} onClick={flipCard}>Change email</div>
          </div>
        </>
      )}
    </div>
  );
}
