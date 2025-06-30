document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const visibleCount = 6;

  // Shuffle the items
  const shuffled = Array.from(items).sort(() => Math.random() - 0.5);

  // Hide all items initially
  items.forEach(item => item.classList.add("hidden-item"));

  // Show only the first 6 shuffled items
  shuffled.slice(0, visibleCount).forEach(item => item.classList.remove("hidden-item"));
});
