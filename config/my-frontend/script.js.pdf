const BASE_URL = "http://localhost:4000";  // 🌾 KrushiMitra Backend API

// -----------------------------
// Page Navigation
// -----------------------------
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function goToAuthPage() { showPage('auth-page'); }
function goToRoleSelection() { showPage('role-selection-page'); }
function goBackToWelcome() { showPage('welcome-page'); }
function goBackToRoleSelection() { showPage('role-selection-page'); }

// -----------------------------
// 🌱 CONNECTED LOGIN (Updated)
// -----------------------------
async function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) return alert("⚠️ Please enter email and password.");

  try {
    // 🌐 Connect frontend → backend
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('userEmail', email);
      alert(`Welcome back, ${email.split('@')[0]}! 🌾`);
      goToRoleSelection();
    } else {
      alert(`❌ ${data.message || "Login failed"}`);
    }
  } catch (error) {
    alert("🚨 Backend not reachable. Please start your server.");
    console.error(error);
  }
}

// -----------------------------
// 🌾 CONNECTED SIGNUP
// -----------------------------
async function signupUser() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  if (!email || !password) return alert("⚠️ Please fill all fields.");

  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('userEmail', email);
      alert("🎉 Account created successfully!");
      goToRoleSelection();
    } else {
      alert(`❌ ${data.message || "Signup failed"}`);
    }
  } catch (error) {
    alert("🚨 Backend not reachable. Please start your server.");
    console.error(error);
  }
}

// -----------------------------
// Placeholder logins
// -----------------------------
function googleLogin() {
  alert("🔗 Google login coming soon!");
  goToRoleSelection();
}

function appleLogin() {
  alert("🍎 Apple login coming soon!");
  goToRoleSelection();
}

// -----------------------------
// Role selection
// -----------------------------
function selectRole(role) {
  localStorage.setItem("selectedRole", role);
  switch(role) {
    case 'farmer': showPage('farmer-dashboard'); break;
    case 'service-provider': showPage('service-dashboard'); break;
    case 'admin': showPage('admin-dashboard'); break;
    default: alert("Invalid role selected");
  }
}

// -----------------------------
// Dashboard actions
// -----------------------------
function farmerFeatureAction(feature) {
  switch(feature) {
    case 'mandi': alert("📈 Fetching real-time mandi prices..."); break;
    case 'ai-advisor': alert("🤖 Opening AI Crop Advisor..."); break;
    case 'weather': alert("🌦️ Loading weather updates..."); break;
    case 'market': alert("🛒 Opening marketplace..."); break;
  }
}

function serviceFeatureAction(feature) {
  switch(feature) {
    case 'bookings': alert("📅 Viewing booking requests..."); break;
    case 'equipment': alert("🧰 Managing equipment..."); break;
    case 'earnings': alert("📊 Checking earnings..."); break;
    case 'support': alert("💬 Opening customer chat..."); break;
  }
}

function adminFeatureAction(feature) {
  switch(feature) {
    case 'verify': alert("🧾 Reviewing service listings..."); break;
    case 'users': alert("👥 Managing user accounts..."); break;
    case 'analytics': alert("📊 Loading platform insights..."); break;
    case 'announcements': alert("📢 Creating announcements..."); break;
  }
}

function openAIAssistant() {
  alert("🤖 AI Krushi Assistant is being trained to guide farmers!");
}

// -----------------------------
// Auto-bind feature buttons
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-feature]").forEach(btn => {
    btn.addEventListener("click", () => {
      const role = localStorage.getItem("selectedRole");
      const feature = btn.dataset.feature;

      if (role === "farmer") farmerFeatureAction(feature);
      else if (role === "service-provider") serviceFeatureAction(feature);
      else if (role === "admin") adminFeatureAction(feature);
    });
  });
});
