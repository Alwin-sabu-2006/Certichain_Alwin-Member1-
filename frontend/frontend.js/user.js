document.getElementById("signupForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const university = document.getElementById("university").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, university, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("userName", fullName);
            alert("✓ " + data.message + " Returning to home.");
            window.location.href = "index (1).html";
        } else {
            alert("❌ " + data.error);
        }
    } catch (err) {
        alert("Server connection failed.");
        console.error(err);
    }
});