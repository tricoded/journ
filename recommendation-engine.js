class RecommendationEngine {
  constructor(profiles) {
    this.profiles = profiles;
    this.allAttractions = [];
    this.allRestaurants = [];
  }

  loadAttractionsData() {
    // In a real app, you might fetch this from an API or your HTML
    this.allAttractions = [
      {
        name: "Jet d'Eau",
        type: "Landmark",
        rating: 4.7,
        price: "Free",
        tags: ["Iconic", "Photo Spot"]
      },
      {
        name: "Patek Philippe Museum",
        type: "Museum",
        rating: 4.8,
        price: "CHF 10",
        tags: ["Watches", "Luxury"]
      },
      // Add all your attractions here
    ];
  }

  loadFoodData() {
    // Similarly for restaurants
    this.allRestaurants = [
      {
        name: "Jiaxiang Restaurant 家湘",
        cuisine: "Chinese",
        rating: 5.0,
        price: "CHF 30-40",
        tags: ["Spicy", "Authentic"]
      },
      // Add all your restaurants here
    ];
  }

  scoreAttraction(attraction, member) {
    const profile = this.profiles[member];
    let score = 0;

    // Type matching
    if (profile.preferences.attractions.some(pref => 
      attraction.type.includes(pref))) {
      score += 30;
    }

    // Rating importance
    score += attraction.rating * 5;

    // Price matching
    const priceLevel = this.getPriceLevel(attraction.price);
    const budgetLevel = profile.preferences.budget.length;
    if (priceLevel <= budgetLevel) score += 20;

    // Tag matching
    attraction.tags.forEach(tag => {
      if (profile.preferences.attractions.includes(tag)) score += 5;
    });

    // Past likes/dislikes
    if (profile.pastLikes.includes(attraction.name)) score += 40;
    if (profile.pastDislikes.includes(attraction.name)) score -= 30;

    return Math.min(100, score); // Cap at 100%
  }

  getFoodRecommendations(member, count = 3) {
    return this.allRestaurants
      .map(restaurant => ({
        ...restaurant,
        score: this.scoreFoodItem(restaurant, member)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  scoreFoodItem(restaurant, member) {
    const profile = this.profiles[member];
    let score = 0;

    // Cuisine matching
    if (profile.preferences.food.includes(restaurant.cuisine)) {
      score += 30;
    }

    // Rating importance
    score += restaurant.rating * 5;

    // Price matching
    const priceLevel = this.getPriceLevel(restaurant.price);
    const budgetLevel = profile.preferences.budget.length;
    if (priceLevel <= budgetLevel) score += 20;

    return Math.min(100, score);
  }

  getPriceLevel(priceText) {
    if (priceText.includes('Free')) return 0;
    if (priceText.includes('CHF 10-20')) return 1;
    if (priceText.includes('CHF 20-30')) return 2;
    if (priceText.includes('CHF 30+')) return 3;
    return 1;
  }

  getRecommendations(member, count = 3) {
    return this.allAttractions
      .map(attraction => ({
        ...attraction,
        score: this.scoreAttraction(attraction, member)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }
}