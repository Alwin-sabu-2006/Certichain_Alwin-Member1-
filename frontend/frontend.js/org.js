window.createAccount = async function () {
    let orgName = document.getElementById("orgName").value;
    let email = document.getElementById("email").value;
    let website = document.getElementById("website").value;
    let password = document.getElementById("password").value;

    if (orgName === "" || email === "" || website === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/org/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orgName, email, website, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem("orgName", orgName);
            alert("✓ " + data.message + " Redirecting...");
            window.location.href = "upload.html";
        } else {
            alert("❌ Expected Error: " + data.error);
        }
    } catch (err) {
        alert("Server connection failed. Is the Node backend running?");
        console.error(err);
    }
};

// Expose the blockchain logic to the upload page
window.mintCertificateOnChain = async function(studentName, courseName, issueDate) {
    const orgName = localStorage.getItem("orgName") || "Organization";
    
    // contract is fetched dynamically via getContractInstance from config.js
    const contract = await getContractInstance();
    if (!contract) return null; // Metamask not found

    try {
        console.log("Mining transaction on the blockchain...");
        
        // Match the Solitiy function variables (studentName, course, issuer, issueDate)
        const tx = await contract.issueCertificate(studentName, courseName, orgName, issueDate);
        
        // Wait for it to be minted
        const receipt = await tx.wait();
        
        console.log("Success! Certificate is on the Blockchain. receipt:", receipt);
        return tx.hash; // return the real transaction hash for the UI modal
    } catch (err) {
        console.error("Blockchain error:", err);
        throw err;
    }
};
