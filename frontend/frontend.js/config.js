const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function getContractInstance() {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Fetch the ABI file from the contracts directory relative to the HTML files
    const response = await fetch('../contracts/CertChain.json');
    const data = await response.json();
    const abi = data.abi;

    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
}