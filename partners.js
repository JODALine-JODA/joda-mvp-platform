// partners.js
// Single source of truth for categories and partner links

export const categories = [
  { id: "electronics",  label: "Electronics" },
  { id: "fashion",      label: "Fashion" },
  { id: "food_drink",   label: "Food & Drink" },
  { id: "travel",       label: "Travel" },
  { id: "finance",      label: "Finance" },
  { id: "others",       label: "Others" },
];

// Tip: add/rename partners freely. Just set category to the id above.
export const partners = [
  // Electronics
  { name: "Amazon",   category: "electronics", url: "https://www.amazon.com" },
  { name: "eBay",     category: "electronics", url: "https://www.ebay.com" },
  { name: "AliExpress", category: "electronics", url: "https://www.aliexpress.com" },

  // Fashion
  { name: "Zara",     category: "fashion",     url: "https://www.zara.com" },
  { name: "H&M",      category: "fashion",     url: "https://www2.hm.com" },

  // Food & Drink
  { name: "DoorDash", category: "food_drink",  url: "https://www.doordash.com" },
  { name: "Uber Eats",category: "food_drink",  url: "https://www.ubereats.com" },

  // Travel
  { name: "Booking.com", category: "travel",   url: "https://www.booking.com" },
  { name: "Expedia",     category: "travel",   url: "https://www.expedia.com" },

  // Finance
  { name: "Wise",     category: "finance",     url: "https://wise.com" },
  { name: "Revolut",  category: "finance",     url: "https://www.revolut.com" },

  // Others
  { name: "Temu",     category: "others",      url: "https://www.temu.com" },
  { name: "Etsy",     category: "others",      url: "https://www.etsy.com" },
];



