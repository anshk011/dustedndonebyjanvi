// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentProduct = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartUI();
});

// ===== RENDER PRODUCTS =====
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-light);grid-column:1/-1;padding:40px">No products found 💕</p>';
    return;
  }

  list.forEach(p => {
    const discount = Math.round((1 - p.price / p.originalPrice) * 100);
    const priceDisplay = p.price === 0
      ? `<span class="product-price custom-price">Create your dream set</span>`
      : `<span class="product-price">₹${p.price}</span>
          <span class="product-og-price">₹${p.originalPrice}</span>
          <span class="product-discount">${discount}% off</span>`;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = p.category;
    card.onclick = () => openModal(p);

    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400/fce8ed/6b1a33?text=💅'">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          ${priceDisplay}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== FILTER =====
function filterProducts(category, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

// ===== PRODUCT MODAL =====
function openModal(product) {
  currentProduct = product;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalPrice').textContent = product.price === 0 ? 'Create your dream set' : `₹${product.price}`;
  document.getElementById('modalOgPrice').textContent = product.price === 0 ? '' : `₹${product.originalPrice}`;
  document.getElementById('modalDesc').innerHTML = product.category === 'custom'
    ? product.description.replace(/\n/g, '<br>') + `<br><br><a href="https://instagram.com/dustedndonebyjanvi" target="_blank" class="modal-ig-link">📸 DM us on Instagram @dustedndonebyjanvi</a>`
    : product.description;
  document.getElementById('modalImg').src = product.images[0];

  // Dots for multiple images
  const dots = document.getElementById('modalDots');
  dots.innerHTML = '';
  if (product.images.length > 1) {
    product.images.forEach((img, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => {
        document.getElementById('modalImg').src = img;
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      };
      dots.appendChild(dot);
    });
  }

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentProduct = null;
}

function addToCartFromModal() {
  if (!currentProduct) return;
  addToCart(currentProduct);
  closeModal();
  openCart();
}

// ===== CART =====
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  animateCartBtn();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

function animateCartBtn() {
  const btn = document.querySelector('.cart-btn');
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => btn.style.transform = '', 200);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
  } else {
    openCart();
  }
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart">Your bag is empty 💕</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'flex';
  container.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${item.images[0]}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70x70/fce8ed/6b1a33?text=💅'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
        <div class="cart-qty">
          <button onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    `;
    container.appendChild(el);
  });

  document.getElementById('cartTotal').textContent = `₹${total}`;
}

// ===== CHECKOUT =====
function proceedToCheckout() {
  // Close cart
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');

  // Build summary
  renderCheckoutSummary();
  document.getElementById('checkoutOverlay').classList.add('open');
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkoutSummary');
  let subtotal = 0;
  let html = '<div class="order-summary-title">📦 Your Order</div>';

  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    html += `<div class="summary-row"><span>${item.name} × ${item.qty}</span><span>₹${lineTotal}</span></div>`;
  });

  const shipping = subtotal >= shopSettings.freeShippingThreshold ? 0 : 49;
  const processing = shopSettings.processingFee;
  const grand = subtotal + shipping + processing;

  html += `<div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE 🎉' : '₹' + shipping}</span></div>`;
  html += `<div class="summary-row"><span>Processing Fee</span><span>₹${processing}</span></div>`;
  html += `<div class="summary-row total"><span>Total</span><span>₹${grand.toFixed(2)}</span></div>`;

  el.innerHTML = html;
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function placeOrder() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const address = document.getElementById('cAddress').value.trim();
  const pin = document.getElementById('cPin').value.trim();
  const city = document.getElementById('cCity').value.trim();

  if (!name || !phone || !address || !pin || !city) {
    alert('Please fill in all required fields (marked with *)');
    return;
  }

  if (phone.length < 10) {
    alert('Please enter a valid phone number');
    return;
  }

  // Build order summary for WhatsApp
  const insta = document.getElementById('cInsta').value.trim();
  const note = document.getElementById('cNote').value.trim();
  const state = document.getElementById('cState').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const hasRefPhoto = document.getElementById('refUpload').files.length > 0;
  const hasCustom = cart.some(i => i.category === 'custom');

  const paymentLabels = { upi: 'UPI (GPay / PhonePe / Paytm)', bank: 'Bank Transfer (NEFT/IMPS)', cod: 'Cash on Delivery (COD)' };

  let subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const shipping = subtotal >= shopSettings.freeShippingThreshold ? 0 : 49;
  const grand = subtotal + shipping + shopSettings.processingFee;
  const advance = subtotal > 0 ? Math.ceil(grand * 0.5) : null;

  let orderText = `🍒 *NEW ORDER — Dusted N Done By Janvi* 🍒\n`;
  orderText += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  orderText += `👤 *Customer Details*\n`;
  orderText += `• Name: ${name}\n`;
  orderText += `• Phone: ${phone}\n`;
  if (email) orderText += `• Email: ${email}\n`;
  if (insta) orderText += `• Instagram: ${insta}\n`;
  orderText += `\n`;

  orderText += `📦 *Order Summary*\n`;
  cart.forEach(i => {
    const linePrice = i.price === 0 ? 'Price TBD' : `₹${i.price * i.qty}`;
    orderText += `• ${i.name} × ${i.qty} — ${linePrice}\n`;
  });
  orderText += `\n`;

  if (subtotal > 0) {
    orderText += `💰 *Payment Breakdown*\n`;
    orderText += `• Subtotal: ₹${subtotal}\n`;
    orderText += `• Shipping: ${shipping === 0 ? 'FREE 🎉' : '₹' + shipping}\n`;
    orderText += `• Grand Total: ₹${grand.toFixed(2)}\n`;
    orderText += `• Advance (50%): ₹${advance}\n`;
    orderText += `• Remaining (50%): ₹${(grand - advance).toFixed(2)} — at delivery\n`;
    orderText += `\n`;
  } else {
    orderText += `💰 *Payment:* Custom order — pricing to be confirmed\n\n`;
  }

  orderText += `💳 *Payment Method:* ${paymentLabels[paymentMethod] || paymentMethod}\n\n`;

  orderText += `🏠 *Shipping Address*\n`;
  orderText += `${address}, ${city}${state ? ', ' + state : ''} — ${pin}, India\n\n`;

  if (note) orderText += `📝 *Special Note:* ${note}\n\n`;

  if (hasRefPhoto) {
    orderText += `📎 *Reference Photo:* Customer has a reference photo — please ask them to send it in this chat.\n\n`;
  }

  if (hasCustom) {
    orderText += `🎨 *Custom Order:* Please ask the customer to send their inspo/reference images in this chat.\n\n`;
  }

  orderText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  orderText += `📸 Remind customer to send nail size photo!\n`;
  orderText += `@dustedndonebyjanvi`;

  const waUrl = `https://wa.me/${shopSettings.whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(orderText)}`;
  window.open(waUrl, '_blank');

  // Store flags for success screen
  window._lastOrderHasRef = hasRefPhoto;
  window._lastOrderHasCustom = hasCustom;

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();

  // Close checkout, show success
  closeCheckout();

  // Update success screen reminder based on order type
  const reminder = document.getElementById('successReminder');
  if (window._lastOrderHasCustom) {
    reminder.innerHTML = `🎨 Please send your inspo/reference photos to <strong>@dustedndonebyjanvi</strong> on Instagram or WhatsApp so we can get started on your custom set!`;
  } else if (window._lastOrderHasRef) {
    reminder.innerHTML = `📎 Please send your reference photo + nail size photo to <strong>@dustedndonebyjanvi</strong> on Instagram or in the WhatsApp chat!`;
  } else {
    reminder.innerHTML = `📸 Don't forget to send your nail size photo to <strong>@dustedndonebyjanvi</strong> on Instagram!`;
  }

  document.getElementById('successOverlay').classList.add('open');
}

function closeSuccess() {
  document.getElementById('successOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== FAQ =====
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));

  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== KEYBOARD ESC =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeCheckout();
    closeSuccess();
  }
});
