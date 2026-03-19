/* ============================================================
   MediScan AI — Authentication Logic
   File: js/auth.js
   Handles: Sign Up, Log In, Log Out, Session Management
   ============================================================ */

// ── Load users from localStorage (simulated database) ──
let users = JSON.parse(localStorage.getItem('mediscan_users') || '[]');
let currentUser = JSON.parse(localStorage.getItem('mediscan_current') || 'null');


/* ─────────────────────────────────────────
   SIGN UP FUNCTION
   Called when user clicks "Create My Account"
───────────────────────────────────────── */
function doSignup() {
  // Clear all previous error messages
  clearErrors(['err-fname', 'err-lname', 'err-su-email', 'err-phone', 'err-su-pass', 'err-su-cpass']);

  // Collect form values
  const fname  = document.getElementById('su-fname').value.trim();
  const lname  = document.getElementById('su-lname').value.trim();
  const email  = document.getElementById('su-email').value.trim().toLowerCase();
  const phone  = document.getElementById('su-phone').value.trim();
  const age    = document.getElementById('su-age').value.trim();
  const gender = document.getElementById('su-gender').value.trim();
  const pass   = document.getElementById('su-pass').value;
  const cpass  = document.getElementById('su-cpass').value;

  // ── Validation ──
  let isValid = true;

  if (!fname) {
    setErr('err-fname', 'First name is required');
    isValid = false;
  }
  if (!lname) {
    setErr('err-lname', 'Last name is required');
    isValid = false;
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setErr('err-su-email', 'Enter a valid email address');
    isValid = false;
  }
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    setErr('err-phone', 'Enter a valid 10-digit phone number');
    isValid = false;
  }
  if (!pass || pass.length < 6) {
    setErr('err-su-pass', 'Password must be at least 6 characters');
    isValid = false;
  }
  if (pass !== cpass) {
    setErr('err-su-cpass', 'Passwords do not match');
    isValid = false;
  }

  if (!isValid) return; // Stop if validation fails

  // ── Check for duplicate email ──
  if (users.find(u => u.email === email)) {
    setErr('err-su-email', 'This email is already registered. Please log in.');
    return;
  }

  // ── Create new user object ──
  const newUser = {
    fname,
    lname,
    email,
    phone,
    age,
    gender,
    pass,
    joinedAt: new Date().toLocaleDateString()
  };

  // ── Save to localStorage (simulated DB) ──
  users.push(newUser);
  localStorage.setItem('mediscan_users', JSON.stringify(users));

  // ── Auto-login after signup ──
  currentUser = newUser;
  localStorage.setItem('mediscan_current', JSON.stringify(newUser));

  // ── Update UI and navigate ──
  updateNav();
  updateDashboardUser();
  showToast(`🎉 Welcome, ${fname}! Your account has been created.`);
  showPage('dashboard');
}


/* ─────────────────────────────────────────
   LOGIN FUNCTION
   Called when user clicks "Log In"
───────────────────────────────────────── */
function doLogin() {
  // Clear previous errors
  clearErrors(['err-li-email', 'err-li-pass', 'err-login']);

  // Collect form values
  const email = document.getElementById('li-email').value.trim().toLowerCase();
  const pass  = document.getElementById('li-pass').value;

  // ── Validation ──
  let isValid = true;

  if (!email) {
    setErr('err-li-email', 'Please enter your email address');
    isValid = false;
  }
  if (!pass) {
    setErr('err-li-pass', 'Please enter your password');
    isValid = false;
  }

  if (!isValid) return;

  // ── Match user in database ──
  const matchedUser = users.find(u => u.email === email && u.pass === pass);

  if (!matchedUser) {
    setErr('err-login', '❌ Invalid email or password. Please try again.');
    return;
  }

  // ── Save session ──
  currentUser = matchedUser;
  localStorage.setItem('mediscan_current', JSON.stringify(matchedUser));

  // ── Update UI and navigate ──
  updateNav();
  updateDashboardUser();
  showToast(`👋 Welcome back, ${matchedUser.fname}!`);
  showPage('dashboard');
}


/* ─────────────────────────────────────────
   LOGOUT FUNCTION
───────────────────────────────────────── */
function logout() {
  currentUser = null;
  localStorage.removeItem('mediscan_current');
  updateNav();
  showToast('You have been logged out successfully.');
  showPage('home');
}


/* ─────────────────────────────────────────
   UPDATE NAVBAR based on login state
───────────────────────────────────────── */
function updateNav() {
  const loggedIn = !!currentUser;

  document.getElementById('nav-login').style.display  = loggedIn ? 'none' : '';
  document.getElementById('nav-signup').style.display = loggedIn ? 'none' : '';
  document.getElementById('nav-logout').style.display = loggedIn ? '' : 'none';
}


/* ─────────────────────────────────────────
   UPDATE DASHBOARD with user's name & email
───────────────────────────────────────── */
function updateDashboardUser() {
  if (!currentUser) return;

  document.getElementById('user-avatar').textContent = currentUser.fname[0].toUpperCase();
  document.getElementById('user-greet').textContent  = `Hello, ${currentUser.fname} ${currentUser.lname}!`;
  document.getElementById('user-info').textContent   = `${currentUser.email} · MediScan AI Member`;
}


/* ─────────────────────────────────────────
   HELPER: Set error message in form
───────────────────────────────────────── */
function setErr(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}


/* ─────────────────────────────────────────
   HELPER: Clear multiple error fields
───────────────────────────────────────── */
function clearErrors(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}


/* ─────────────────────────────────────────
   ON PAGE LOAD — Restore session if exists
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  updateNav();

  if (currentUser) {
    updateDashboardUser();
    showPage('dashboard');
  }
});
