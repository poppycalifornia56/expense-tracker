export const getCategoryIcon = (
  categoryName: string,
  userSelectedIcon?: string
): string => {
  if (userSelectedIcon) {
    return userSelectedIcon;
  }

  if (!categoryName) return "🏷️";

  const name = categoryName.toLowerCase().trim();

  if (
    name.includes("food") ||
    name.includes("restaurant") ||
    name.includes("dining") ||
    name.includes("meal") ||
    name.includes("lunch") ||
    name.includes("dinner") ||
    name.includes("breakfast") ||
    name.includes("eat") ||
    name.includes("snack") ||
    name.includes("grocery") ||
    name.includes("groceries")
  ) {
    return "🍔";
  }

  if (
    name.includes("transport") ||
    name.includes("car") ||
    name.includes("gas") ||
    name.includes("fuel") ||
    name.includes("uber") ||
    name.includes("taxi") ||
    name.includes("bus") ||
    name.includes("train") ||
    name.includes("flight") ||
    name.includes("travel") ||
    name.includes("parking")
  ) {
    return "🚗";
  }

  if (
    name.includes("entertainment") ||
    name.includes("movie") ||
    name.includes("cinema") ||
    name.includes("game") ||
    name.includes("sport") ||
    name.includes("music") ||
    name.includes("concert") ||
    name.includes("show") ||
    name.includes("hobby") ||
    name.includes("fun") ||
    name.includes("leisure")
  ) {
    return "🎮";
  }

  if (
    name.includes("shopping") ||
    name.includes("clothes") ||
    name.includes("clothing") ||
    name.includes("fashion") ||
    name.includes("shoes") ||
    name.includes("accessories") ||
    name.includes("purchase") ||
    name.includes("buy") ||
    name.includes("store")
  ) {
    return "🛍️";
  }

  if (
    name.includes("health") ||
    name.includes("medical") ||
    name.includes("doctor") ||
    name.includes("hospital") ||
    name.includes("medicine") ||
    name.includes("pharmacy") ||
    name.includes("dental") ||
    name.includes("fitness") ||
    name.includes("gym")
  ) {
    return "🏥";
  }

  if (
    name.includes("bill") ||
    name.includes("utility") ||
    name.includes("electric") ||
    name.includes("water") ||
    name.includes("internet") ||
    name.includes("phone") ||
    name.includes("rent") ||
    name.includes("mortgage") ||
    name.includes("insurance")
  ) {
    return "📄";
  }

  if (
    name.includes("education") ||
    name.includes("school") ||
    name.includes("book") ||
    name.includes("course") ||
    name.includes("tuition") ||
    name.includes("learn") ||
    name.includes("study") ||
    name.includes("university") ||
    name.includes("college")
  ) {
    return "📚";
  }

  if (
    name.includes("home") ||
    name.includes("house") ||
    name.includes("garden") ||
    name.includes("furniture") ||
    name.includes("repair") ||
    name.includes("maintenance") ||
    name.includes("decoration") ||
    name.includes("cleaning")
  ) {
    return "🏠";
  }

  if (
    name.includes("work") ||
    name.includes("business") ||
    name.includes("office") ||
    name.includes("supply") ||
    name.includes("equipment") ||
    name.includes("professional") ||
    name.includes("meeting") ||
    name.includes("conference")
  ) {
    return "💼";
  }

  if (
    name.includes("gift") ||
    name.includes("donation") ||
    name.includes("charity") ||
    name.includes("present") ||
    name.includes("birthday") ||
    name.includes("wedding") ||
    name.includes("holiday")
  ) {
    return "🎁";
  }

  if (
    name.includes("personal") ||
    name.includes("beauty") ||
    name.includes("haircut") ||
    name.includes("salon") ||
    name.includes("cosmetic") ||
    name.includes("skincare") ||
    name.includes("spa") ||
    name.includes("grooming")
  ) {
    return "💄";
  }

  if (
    name.includes("pet") ||
    name.includes("dog") ||
    name.includes("cat") ||
    name.includes("animal") ||
    name.includes("vet") ||
    name.includes("veterinary")
  ) {
    return "🐕";
  }

  if (
    name.includes("tech") ||
    name.includes("computer") ||
    name.includes("software") ||
    name.includes("app") ||
    name.includes("subscription") ||
    name.includes("streaming") ||
    name.includes("device") ||
    name.includes("gadget")
  ) {
    return "💻";
  }

  if (
    name.includes("coffee") ||
    name.includes("drink") ||
    name.includes("beverage") ||
    name.includes("bar") ||
    name.includes("alcohol") ||
    name.includes("cafe") ||
    name.includes("tea") ||
    name.includes("juice")
  ) {
    return "☕";
  }

  if (
    name.includes("bank") ||
    name.includes("fee") ||
    name.includes("atm") ||
    name.includes("finance") ||
    name.includes("loan") ||
    name.includes("credit") ||
    name.includes("investment") ||
    name.includes("saving")
  ) {
    return "🏦";
  }

  return "🏷️";
};

export const getCategoryColor = (categoryName: string): string => {
  if (!categoryName) return "#00c853";

  const colors = [
    "#1565c0",
    "#00c853",
    "#ff6b6b",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#f97316",
    "#84cc16",
  ];

  const hash = categoryName.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};
