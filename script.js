const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const contractABI = [
  "function donate() public payable",
  "function getDonations(address donor) public view returns (uint256)"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install Metamask!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  alert("Wallet connected");
}

async function donate() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.donate({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Donation successful!");
  } catch (error) {
    console.error(error);
    alert("Donation failed. See console for details.");
  }
}

async function fetchDonations() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const userAddress = await provider.getSigner().getAddress();
  const donationAmount = await contract.getDonations(userAddress);

  alert(`You have donated: ${ethers.utils.formatEther(donationAmount)} ETH`);
}
