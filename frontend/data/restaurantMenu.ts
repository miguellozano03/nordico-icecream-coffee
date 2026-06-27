export const MenuCategories = {
  COFFEE: "Brews & Coffee",
  SANDWICHES: "Between Bread",
  ICE_CREAM: "Artisan Ice Cream",
  SWEETS: "Bakery & Brownies"
};

export const FullMenu = [
  // --- CATEGORÍA: CAFÉS ---
  {
    category: MenuCategories.COFFEE,
    image: "/americano_coffee.jpg",
    title: "Classic Coffee",
    description:
      "Our masterpiece. A double scoop of our signature sea-salt artisan vanilla ice cream, drowned in a freshly pulled shot of hot espresso.",
    price: "$2.50"
  },
  {
    category: MenuCategories.COFFEE,
    image: "/espresso-shot.jpg",
    title: "Double Espresso",
    description: "A concentrated, bold shot of our single-origin house roast with a rich golden crema.",
    price: "$3.00",
  },
  {
    category: MenuCategories.COFFEE,
    image: "/cappucino.jpg",
    title: "Classic Cappuccino",
    description: "Equal parts of espresso, steamed milk, and a thick layer of luxurious milk foam on top.",
    price: "$4.50",
  },
  {
    category: MenuCategories.COFFEE,
    image: "/cold-brew.jpg",
    title: "18-Hour Cold Brew",
    description: "Slow-steeped specialty coffee served over ice, naturally sweet with low acidity.",
    price: "$4.80",
  },

  // --- CATEGORÍA: ENTRE PANES ---
  {
    category: MenuCategories.SANDWICHES,
    image: "/sourdough-sandwich.jpg",
    title: "Nordic Turkey Club",
    description: "Smoked turkey breast, fresh avocado, argula, and herbed cream cheese on toasted artisan sourdough bread.",
    price: "$8.50",
  },
  {
    category: MenuCategories.SANDWICHES,
    image: "/croissant-sandwich.jpg",
    title: "Buttery Ham & Cheese Croissant",
    description: "A flaky, baked-daily croissant stuffed with premium cured ham and melted Swiss cheese.",
    price: "$6.50",
  },

  // --- CATEGORÍA: HELADOS ---

  {
    category: MenuCategories.ICE_CREAM,
    image: "/affogato.webp",
    title: "The Nordico Affogato",
    description:
      "Our masterpiece. A double scoop of our signature sea-salt artisan vanilla ice cream, drowned in a freshly pulled shot of hot espresso.",
    price: "$6.00",
  },
  {
    category: MenuCategories.ICE_CREAM,
    image: "/ice-cream.jpg",
    title: "Artisan Ice Cream",
    description:
      "Made from scratch in small batches using local organic dairy and real, seasonal ingredients. No artificial colors, just pure flavor.",
    price: "$4.50",
  },

  {
    category: MenuCategories.ICE_CREAM,
    image: "/pistachio-ice-cream.jpg",
    title: "Salted Pistachio Gelato",
    description: "Creamy, house-spun artisan ice cream made with real roasted pistachios and a hint of sea salt.",
    price: "$5.00",
  },
  {
    category: MenuCategories.ICE_CREAM,
    image: "/berry-sorbet.webp",
    title: "Wild Berry Sorbet",
    description: "A refreshing, dairy-free scoop bursting with raspberries, blackberries, and a touch of fresh mint.",
    price: "$4.50",
  },

  // --- CATEGORÍA: POSTRES Y BROWNIES ---
  {
    category: MenuCategories.SWEETS,
    image: "/fudge-brownie.jpg",
    title: "Fudgy Chocolate Brownie",
    description: "Rich, dense chocolate brownie with a crinkly top and a gooey center. Perfect paired with an espresso.",
    price: "$4.00",
  },
  {
    category: MenuCategories.SWEETS,
    image: "/cinnamon-roll.jpg",
    title: "Scandinavian Cinnamon Roll",
    description: "Soft, spiced dough twisted with brown sugar and cinnamon, topped with a light vanilla glaze.",
    price: "$4.20",
  }
];