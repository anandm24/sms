document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const className = document.getElementById("class").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, class: className })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Student registered!");
      // Optionally add to list
      const li = document.createElement("li");
      li.textContent = `${name} - Class ${className}`;
      document.getElementById("list").appendChild(li);
    } else {
      alert(data.message || "Failed to register student.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error occurred.");
  }
});
