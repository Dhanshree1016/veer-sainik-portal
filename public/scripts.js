document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch("/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem("userRole", response.role);

            // ✅ Clear fields
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";

            // ✅ Redirect based on role
            if (response.role === "admin") {
                window.location.href = "admin_dashboard.html";
            } else {
                window.location.href = "team.html";
            }
        } else {
            document.getElementById("message").innerText = "Invalid credentials.";
        }
    });
});
