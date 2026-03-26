// ============================================================
//  PRODUCTS CATALOG — EDIT THIS FILE TO ADD/REMOVE PRODUCTS
// ============================================================
//
//  HOW TO ADD A NEW PRODUCT:
//  1. Copy one product block (from { to },)
//  2. Paste it at the end of the array (before the last ])
//  3. Update all the fields:
//     - id: must be unique (just increment the number)
//     - name: product name as shown on website
//     - category: "short" | "medium" | "long" (for filter tabs)
//     - price: selling price in ₹ (number only, no ₹ sign)
//     - originalPrice: crossed out price (number only)
//     - description: shown on product detail page
//     - images: array of image URLs or local paths like "images/myproduct.jpg"
//     - badge: optional label like "NEW", "BESTSELLER", "SOLD OUT" — or "" for none
//
//  HOW TO ADD YOUR OWN PHOTOS:
//  1. Put your .jpg or .png files in the "images/" folder
//  2. Set images: ["images/your-file-name.jpg"]
//  3. You can have multiple images per product: ["images/a.jpg", "images/b.jpg"]
//
// ============================================================

const products = [
  {
    id: 1,
    name: "Lilac Daydream - (Almond)",
    category: "medium",
    price: 499,
    originalPrice: 799,
    description: "Soft lilac almond nails with a dreamy floral accent — tiny hand-painted blooms and pastel yellow details on a creamy base. Light, feminine, and effortlessly cute. Short almond shape.",
    images: ["images/Lilac_Daydream.JPG"],
    badge: "NEW"
  },
  {
    id: 2,
    name: "Mocha Dots - (Oval)",
    category: "medium",
    price: 599,
    originalPrice: 899,
    description: "A retro-chic polka dot set in rich mocha brown, powder blue, and soft cream. Each nail is hand-dotted for a playful, vintage-inspired look. Medium oval shape.",
    images: ["images/Mocha_Dots.JPG"],
    badge: "NEW"
  },
  {
    id: 3,
    name: "Sweetheart Red - (Almond)",
    category: "medium",
    price: 499,
    originalPrice: 799,
    description: "Deep cherry red with a glossy finish and a delicate hand-painted white bow accent. Bold, romantic, and totally irresistible. Medium almond shape.",
    images: ["images/Sweetheart_Red.JPG"],
    badge: "NEW"
  },
  {
    id: 4,
    name: "Pink Mirage - (Stilleto)",
    category: "long",
    price: 999,
    originalPrice: 1199,
    description: "Nude base meets hot pink artistry — hand-painted florals, polka dot patterns, diagonal tips, and gold star accents all in one statement set. Medium Stilleto shape.",
    images: ["images/Pink_Mirage.JPG"],
    badge: "NEW"
  },
  {
    id: 5,
    name: "Royal Merlot - (Almond)",
    category: "medium",
    price: 899,
    originalPrice: 1099,
    description: "Elegant nude base with deep merlot French tips and a hand-placed gold starburst accent. Minimal, sophisticated, and effortlessly chic. Medium almond shape.",
    images: ["images/Royal_Merlot.JPG"],
    badge: "NEW"
  },
  {
    id: 6,
    name: "Custom Order 🍒",
    category: "custom",
    price: 0,
    originalPrice: 0,
    description: "Create Your Dream Set 💫\n\nEvery custom set is uniquely designed just for you. Pricing depends on the level of detail, nail length, and extras like charms or special finishes.\n\nCustom orders start at ₹499+\n\nSend your inspo and let's bring your vision to life 💕",
    images: ["images/Custom_Order.JPG"],
    badge: "CUSTOM"
  }
];

// ============================================================
//  SHOP SETTINGS — edit these too!
// ============================================================
const shopSettings = {
  instagramHandle: "@dustedndonebyjanvi",
  instagramUrl: "https://instagram.com/dustedndonebyjanvi",
  freeShippingThreshold: 699,    // ₹ amount for free shipping
  processingFee: 10.81,          // fixed processing fee in ₹
  upiId: "7017959231@pthdfc",         // YOUR UPI ID — update this!
  whatsappNumber: "+917017959231" // YOUR WhatsApp number — update this!
};
