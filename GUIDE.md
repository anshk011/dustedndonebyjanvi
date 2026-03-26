# 🍒 dustedndonebyjanvi — Website Owner Guide

## 📁 Folder Structure
```
dustedndonebyjanvi/
├── index.html          ← Main website file (don't edit much)
├── css/
│   └── style.css       ← All styling/colors (don't edit unless needed)
├── js/
│   ├── products.js     ← ⭐ YOUR CATALOG — edit this to add products
│   └── app.js          ← Website logic (don't edit)
└── images/             ← Put your nail photos here
```

---

## 💅 HOW TO ADD A NEW PRODUCT

Open `js/products.js` and add a new block inside the `products = [ ]` array.

### Example — copy this and fill in your details:
```javascript
{
  id: 7,                          // ← unique number (increment by 1 each time)
  name: "Pink Cloud — Long Stiletto",
  category: "long",               // ← "short" | "medium" | "long"
  price: 599,                     // ← selling price (no ₹ sign)
  originalPrice: 1000,            // ← original/crossed out price
  description: "Soft pink glazed nails with cloud-like finish. Long stiletto shape. Reusable and waterproof.",
  images: [
    "images/pink-cloud-1.jpg",    // ← your photo file name
    "images/pink-cloud-2.jpg"     // ← optional second photo
  ],
  badge: "NEW"                    // ← "NEW" | "BESTSELLER" | "LUXURY" | "SOLD OUT" | ""
},
```

### Steps:
1. Copy your nail photo into the `images/` folder
2. Open `js/products.js`
3. Find the last product and add a comma after its closing `}`
4. Paste the new product block
5. Save the file

---

## 🗑️ HOW TO REMOVE A PRODUCT

In `js/products.js`, find the product you want to remove and delete its entire block from `{` to `},`.

---

## 🖼️ HOW TO ADD YOUR OWN PHOTOS

1. Take your nail photo (clear lighting, white/grey background works best)
2. Rename it something simple: `red-desire.jpg`, `candy-set.jpg` etc.
3. Put it in the `images/` folder in your project
4. In `products.js`, set: `images: ["images/red-desire.jpg"]`

> 💡 Tip: Resize photos to 800×800px for faster loading. Use squoosh.app (free) to compress.

---

## 💳 HOW TO SET UP PAYMENTS

### Option 1 — Manual UPI (What this website uses by default)
When a customer orders, the website sends them to WhatsApp with their order details. You then send a UPI payment request manually.

**To set up:**
1. Open `js/products.js`
2. Find `shopSettings` at the bottom
3. Update:
```javascript
const shopSettings = {
  upiId: "janvi@paytm",              // ← your UPI ID
  whatsappNumber: "+919XXXXXXXXX"    // ← your WhatsApp with country code
};
```

### Option 2 — Instamojo (Recommended for automatic payments 🇮🇳)
Free to set up, charges 2% per transaction, supports UPI/cards/netbanking.

**Steps:**
1. Sign up at instamojo.com
2. Create a "Payment Link" for each product
3. In `products.js`, add `paymentLink: "https://imojo.in/your-link"` to each product
4. In `app.js`, replace the WhatsApp redirect with `window.open(product.paymentLink)`

### Option 3 — Razorpay Payment Pages (Also free to set up)
1. Sign up at razorpay.com
2. Go to Payment Pages → Create Page
3. Add your products
4. Share the link — OR embed it using their free widget

---

## 🚀 HOW TO HOST FOR FREE

###0 Option A — Netlify (Easiest, recommended)
1. Go to netlify.com → Sign up free
2. Drag and drop your entire `dustedndonebyjanvi/` folder onto the Netlify dashboard
3. Done! You'll get a URL like `dustedndonebyjanvi.netlify.app`
4. To update: just drag and drop again anytime

### Option B — GitHub + Vercel
1. Create account on github.com
2. Create a new repository called `dustedndonebyjanvi`
3. Upload all your files
4. Go to vercel.com → Import your GitHub repo → Deploy
5. You get a free URL like `dustedndonebyjanvi.vercel.app`
6. Every time you push to GitHub, Vercel auto-deploys ✨

### Option C — GitHub Pages (100% free, slightly manual)
1. Upload files to a GitHub repo
2. Go to repo Settings → Pages → Source: main branch
3. Your site is live at `yourusername.github.io/dustedndonebyjanvi`

### Custom Domain (Optional — ~₹800/year)
Buy a domain from GoDaddy or Namecheap (e.g., `dustedndonebyjanvi.com`)
and connect it to Netlify/Vercel for free in their settings.

---

## ✏️ HOW TO CHANGE COLORS / BRANDING

Open `css/style.css` and find the `:root` section at the top:
```css
:root {
  --pink-light: #fce8ed;     ← light pink background
  --maroon: #6b1a33;         ← main dark color (buttons, text)
  --maroon-light: #9b3055;   ← hover color
  ...
}
```
Change any hex color code to update the entire website's theme instantly.

---

## 📸 HOW TO UPDATE SHOP SETTINGS

In `js/products.js`, update the `shopSettings` object:
```javascript
const shopSettings = {
  instagramHandle: "@dustedndonebyjanvi",
  instagramUrl: "https://instagram.com/dustedndonebyjanvi",
  freeShippingThreshold: 699,   // ← change free shipping minimum
  processingFee: 10.81,         // ← change processing fee
  upiId: "yourname@upi",        // ← YOUR UPI ID
  whatsappNumber: "+91XXXXXXXXXX" // ← YOUR phone number
};
```

---

## ❓ Quick Help

| Issue | Fix |
|-------|-----|
| Product photo not showing | Check image file name matches exactly in products.js |
| WhatsApp not opening | Update whatsappNumber in shopSettings |
| Want to add "SOLD OUT" | Set `badge: "SOLD OUT"` in the product |
| Want to hide a product | Delete it from products.js or add `hidden: true` |
| Change Instagram link | Update instagramUrl in shopSettings |

---

Made with 💕 for @dustedndonebyjanvi
