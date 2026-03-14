document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userName", data.name);
            alert("✓ " + data.message + " Redirecting...");
            
            // Redirect based on role
            if (data.role === 'org') {
                window.location.href = "upload.html";
            } else {
                window.location.href = "index (1).html";
            }
        } else {
            alert("❌ Expected Error: " + data.error);
        }
    } catch (err) {
        alert("Server connection failed. Is the Node backend running?");
        console.error(err);
    }
});
