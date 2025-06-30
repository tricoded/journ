const cuisineFilter = document.querySelector('select[name="cuisine-filter"]');
const priceFilter = document.querySelector('select[name="price-filter"]');
const ratingFilter = document.querySelector('select[name="rating-filter"]');
const itemsContainer = document.querySelector("#food-list");
const items = Array.from(itemsContainer.querySelectorAll(".item"));
let isCollapsed = true;

function shuffleItems() {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  shuffled.forEach(item => itemsContainer.appendChild(item)); // Rearranging DOM
}

function updateVisibleItems(count = 6) {
  items.forEach((item, index) => {
    item.classList.toggle("hidden-item", isCollapsed && index >= count);
  });
}

function applyFilters() {
  const selectedCuisine = cuisineFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedRating = ratingFilter.value;

  items.forEach(item => {
    const cuisine = item.querySelector("p:nth-of-type(1)")?.textContent || "";
    const price = item.querySelector("p:nth-of-type(3)")?.textContent || "";
    const ratingText = item.querySelector("p:nth-of-type(2)")?.textContent || "";

    const matchesCuisine = !selectedCuisine || cuisine.includes(selectedCuisine);
    const matchesPrice = !selectedPrice || price.includes(selectedPrice);

    let ratingValue = parseFloat(ratingText.replace(/[^\d.]/g, ""));
    if (isNaN(ratingValue)) ratingValue = 0;

    let matchesRating = true;
    if (selectedRating === "3-4") matchesRating = ratingValue >= 3 && ratingValue < 4;
    else if (selectedRating === "4-5") matchesRating = ratingValue >= 4 && ratingValue < 5;
    else if (selectedRating === "5") matchesRating = ratingValue === 5;

    if (matchesCuisine && matchesPrice && matchesRating) {
      item.classList.remove("hidden-item");
    } else {
      item.classList.add("hidden-item");
    }
  });
}

function toggleCollapse(id, btn) {
  isCollapsed = !isCollapsed;
  updateVisibleItems(); // Update visibility
  btn.textContent = isCollapsed ? "Show More" : "Show Less";
}

document.addEventListener("DOMContentLoaded", () => {
  shuffleItems();        // Randomize order
  updateVisibleItems(6); // Show first 6
  cuisineFilter.addEventListener("change", applyFilters);
  priceFilter.addEventListener("change", applyFilters);
  ratingFilter.addEventListener("change", applyFilters);
});
