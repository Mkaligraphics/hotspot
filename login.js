let selectedPkg = "";
let selectedPrice = "";

// Handle package selection
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    selectedPkg = button.dataset.pkg;
    selectedPrice = button.dataset.price;

    document.getElementById("packageDetails").innerText =
      `You selected: ${selectedPkg} (Ksh ${selectedPrice})`;

    document.getElementById("paymentModal").style.display = "block";
  });
});

// Close modal (X button)
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("paymentModal").style.display = "none";
});

// Handle Pay button
document.getElementById("payBtn").addEventListener("click", () => {
  const phone = document.getElementById("phoneInput").value.trim();
  const mac = document.getElementById("mac")?.value.trim() || "";
  const uptime = document.getElementById("uptime")?.value.trim() || "";
  const port = document.getElementById("port")?.value.trim() || "";
  const ip = document.getElementById("ip")?.value.trim() || "";

  if (!phone) {
    alert("Please enter your phone number.");
    return;
  }

  fetch("https://nicktechsolutions.com/callback/stkPush.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pkg: selectedPkg,
      price: selectedPrice,
      mac,
      ip,
      uptime,
      port,
      phone
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ STK Push sent! Check your phone to complete payment.");
      } else {
        console.error("STK Error:", data);
        alert("❌ Payment failed: " + (data.message || "Unknown error"));
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      alert("⚠️ Something went wrong. Try again.");
    });
});

// Close modal when clicking outside of it
window.addEventListener("click", event => {
  if (event.target === document.getElementById("paymentModal")) {
    document.getElementById("paymentModal").style.display = "none";
  }
});
