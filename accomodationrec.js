// Simple hardcoded recommendations by city
const hotelRecommendations = {
  Zurich: [
    {
      name: "Hotel Schweizerhof Zurich",
      address: "Bahnhofplatz 7, 8001 Zurich",
      phone: "+41 44 2188888"
    },
    {
      name: "Hotel St. Gotthard",
      address: "Bahnhofstrasse 87, 8001 Zurich",
      phone: "+41 44 2277700"
    }
  ],
  Geneva: [
    {
      name: "Hotel Cornavin",
      address: "Gare de Cornavin, 1201 Geneva",
      phone: "+41 22 7161212"
    },
    {
      name: "Hotel Bristol Geneva",
      address: "Rue du Mont-Blanc 10, 1201 Geneva",
      phone: "+41 22 7165700"
    }
  ]
};

// Find the last booked city (for demo, just use the last hotel-card)
window.addEventListener('DOMContentLoaded', function() {
  const hotelCards = document.querySelectorAll('.hotel-card');
  let lastCity = "Geneva";
  // Try to detect city from hotel name/address
  if (hotelCards.length > 0) {
    // Check for Zurich in any hotel card
    for (let i = hotelCards.length - 1; i >= 0; i--) {
      const text = hotelCards[i].innerText;
      if (text.includes("Zurich")) {
        lastCity = "Zurich";
        break;
      }
      if (text.includes("Geneva")) {
        lastCity = "Geneva";
        break;
      }
    }
  }

  // Render recommendations
  const recList = document.getElementById('recommendation-list');
  if (recList && hotelRecommendations[lastCity]) {
    hotelRecommendations[lastCity].forEach(hotel => {
      const div = document.createElement('div');
      div.className = 'hotel-card recommended';
      div.innerHTML = `
        <div class="hotel-header">
          <h3>${hotel.name}</h3>
        </div>
        <p>📍 ${hotel.address}</p>
        <p>📞 ${hotel.phone}</p>
      `;
      recList.appendChild(div);
    });
  }
});