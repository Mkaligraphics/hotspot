let selectedPkg = "";
let selectedPrice = "";

document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', function() {
    selectedPkg = this.getAttribute("data-pkg");
    selectedPrice = this.getAttribute("data-price");
    document.getElementById("packageDetails").innerText = 
      `You selected: ${selectedPkg} (Ksh ${selectedPrice})`;
    document.getElementById("paymentModal").style.display = "block";
  });
});

// Close modal
document.querySelector(".close").onclick = function() {
  document.getElementById("paymentModal").style.display = "none";
}

// Handle Pay button
document.getElementById("payBtn").addEventListener("click", function() {
  let phone = document.getElementById("phoneInput").value.trim();
  if (phone === "") {
    alert("Please enter your phone number.");
    return;
  }
  
  // Redirect with details
  let url = `https://nicktechsolutions.com/buy-voucher?pkg=${selectedPkg}&price=${selectedPrice}&phone=${encodeURIComponent(phone)}`;
  window.location.href = url;
});

// Close when clicking outside modal
window.onclick = function(event) {
  if (event.target == document.getElementById("paymentModal")) {
    document.getElementById("paymentModal").style.display = "none";
  }
}