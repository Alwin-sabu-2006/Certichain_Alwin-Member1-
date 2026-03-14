document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Login Successful! Redirecting...");
    window.location.href = "upload.html";
});
