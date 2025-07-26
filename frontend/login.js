document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Store login state and redirect
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";  // or use 'dashboard.html' if you create one

    } else {
      document.getElementById("message").textContent = data.message || "Login failed";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("message").textContent = "Something went wrong!";
  }
});
