// Family preferences for attractions
    const familyPreferences = {
      mom: {
        types: ["Park", "Viewpoint", "Shopping"],
        priceRange: ["Free", "CHF 10-20"],
        minRating: 4.0
      },
      dad: {
        types: ["Museum", "Landmark", "Activity"],
        priceRange: ["Free", "CHF 10-20", "CHF 20-30"],
        minRating: 4.0
      },
      sister: {
        types: ["Activity", "Shopping"],
        priceRange: ["Free", "CHF 10-20"],
        minRating: 4.0
      }
    };

    document.addEventListener("DOMContentLoaded", function () {
      // DOM elements
      const typeFilter = document.querySelector('select[name="type-filter"]');
      const priceFilter = document.querySelector('select[name="price-filter"]');
      const ratingFilter = document.querySelector('select[name="rating-filter"]');
      const items = document.querySelectorAll(".item");

      // Main filter function
      function filterItems() {
        const type = typeFilter.value;
        const price = priceFilter.value;
        const rating = ratingFilter.value;

        items.forEach(item => {
          const itemType = item.querySelector("p:nth-of-type(1)").textContent.split(": ")[1];
          const itemRatingText = item.querySelector("p:nth-of-type(2)").textContent;
          const itemPrice = item.querySelector("p:nth-of-type(3)").textContent.split(": ")[1];

          // Extract numeric rating
          const ratingMatchValue = parseFloat(itemRatingText.match(/[\d.]+/)[0]);

          // Standard filter matches
          const typeMatch = !type || itemType.includes(type);
          const priceMatch = !price || itemPrice.includes(price);
          
          let ratingMatch = true;
          if (rating === "3-4") {
            ratingMatch = ratingMatchValue >= 3 && ratingMatchValue < 4;
          } else if (rating === "4-5") {
            ratingMatch = ratingMatchValue >= 4 && ratingMatchValue < 5;
          } else if (rating === "5") {
            ratingMatch = ratingMatchValue === 5;
          }

          // Show/hide based on filters
          if (typeMatch && priceMatch && ratingMatch) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }

          // Update family tags regardless of visibility
          updateFamilyTags(item, itemType, itemPrice, ratingMatchValue);
        });

        // Update family sections after filtering
        updateFamilySections();
      }

      // Add/update family tags for an attraction
      function updateFamilyTags(item, type, price, rating) {
        const tagsContainer = item.querySelector('.family-tags') || createTagsContainer(item);
        
        // Remove existing family tags if any
        const existingTags = tagsContainer.querySelectorAll('.family-tag');
        existingTags.forEach(tag => tag.remove());
        
        // Create a container for family tags if it doesn't exist
        let familyTagsContainer = tagsContainer.querySelector('.family-tags-inner');
        if (!familyTagsContainer) {
          familyTagsContainer = document.createElement('div');
          familyTagsContainer.className = 'family-tags-inner';
          tagsContainer.appendChild(familyTagsContainer);
        } else {
          familyTagsContainer.innerHTML = '';
        }

        for (const member in familyPreferences) {
          const prefs = familyPreferences[member];
          const typeMatch = prefs.types.some(t => type.includes(t));
          const priceMatch = prefs.priceRange.includes(price);
          const ratingMatch = rating >= prefs.minRating;

          if (typeMatch && priceMatch && ratingMatch) {
            const tag = document.createElement('span');
            tag.className = `family-tag ${member}-tag`;
            tag.textContent = member.charAt(0).toUpperCase() + member.slice(1);
            familyTagsContainer.appendChild(tag);
          }
        }
      }

      // Update family-specific sections
      function updateFamilySections() {
        // Clear existing sections
        document.querySelectorAll('.family-picks').forEach(section => {
          section.innerHTML = '';
        });

        // Populate with filtered items that match each family member
        items.forEach(item => {
          if (item.style.display !== "none") {
            const itemType = item.querySelector("p:nth-of-type(1)").textContent.split(": ")[1];
            const itemPrice = item.querySelector("p:nth-of-type(3)").textContent.split(": ")[1];
            const ratingMatchValue = parseFloat(item.querySelector("p:nth-of-type(2)").textContent.match(/[\d.]+/)[0]);

            for (const member in familyPreferences) {
              const prefs = familyPreferences[member];
              const typeMatch = prefs.types.some(t => itemType.includes(t));
              const priceMatch = prefs.priceRange.includes(itemPrice);
              const ratingMatch = ratingMatchValue >= prefs.minRating;

              if (typeMatch && priceMatch && ratingMatch) {
                const clone = item.cloneNode(true);
                document.querySelector(`#${member}-picks`).appendChild(clone);
              }
            }
          }
        });
      }

      // Initialize everything
      function initialize() {
        // Add tags to all items initially
        items.forEach(item => {
          const itemType = item.querySelector("p:nth-of-type(1)").textContent.split(": ")[1];
          const itemPrice = item.querySelector("p:nth-of-type(3)").textContent.split(": ")[1];
          const ratingMatchValue = parseFloat(item.querySelector("p:nth-of-type(2)").textContent.match(/[\d.]+/)[0]);
          updateFamilyTags(item, itemType, itemPrice, ratingMatchValue);
        });

        // Populate family sections initially
        updateFamilySections();

        // Set up event listeners
        typeFilter.addEventListener("change", filterItems);
        priceFilter.addEventListener("change", filterItems);
        ratingFilter.addEventListener("change", filterItems);
      }
      
      initialize();
    });