/**
 * Amazon Egypt - Main JavaScript Logic File
 * Multi-category E-commerce Engine with LocalStorage Cart, Flash Deals, & Search/Filter.
 */

// Global State Management
let products = [
    {
        id: 1,
        name: "سماعات رأس لاسلكية إلغاء الضوضاء الصوتية الفائقة - أنكير سوندكور",
        category: "electronics",
        price: 1850,
        oldPrice: 2400,
        rating: 4.7,
        reviews: 320,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        badge: "الأكثر مبيعاً",
        isFlash: true,
        claimed: 78,
        specs: ["بطارية تدوم 40 ساعة", "تقنية بلوتوث 5.3", "ميكروفون مزدوج للمكالمات"]
    },
    {
        id: 2,
        name: "هاتف ذكي بذاكرة 256 جيجابايت وكاميرا بدقة 108 ميجابكسل",
        category: "electronics",
        price: 12400,
        oldPrice: 14500,
        rating: 4.8,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
        badge: "عرض حصري",
        isFlash: true,
        claimed: 92,
        specs: ["شاشة AMOLED 120Hz", "شحن سريع بقدرة 67 واط", "ضمان لمدة سنة"]
    },
    {
        id: 3,
        name: "ساعة ذكية رياضية بشاشة لمس وتتبع اللياقة البدنية ومعدل النبض",
        category: "electronics",
        price: 2100,
        oldPrice: 2900,
        rating: 4.5,
        reviews: 180,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        badge: "خصم 28%",
        isFlash: false,
        claimed: 0,
        specs: ["مقاومة للماء بمعيار IP68", "قياس نسبة الأكسجين", "دعم كامل للغة العربية"]
    },
    {
        id: 4,
        name: "ماكينة تحضير الإسبريسو والقهوة السريعة للمنزل والمكتب",
        category: "home",
        price: 3950,
        oldPrice: 4800,
        rating: 4.6,
        reviews: 240,
        image: "https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?w=500&q=80",
        badge: "شحن مجاني",
        isFlash: true,
        claimed: 45,
        specs: ["مضخة ضغط 15 بار", "خزان ماء سعة 1.2 لتر", "مبخر حليب احترافي"]
    },
    {
        id: 5,
        name: "حذاء رياضي مريح للجري والمشي اليومي - أسود وأبيض",
        category: "fashion",
        price: 890,
        oldPrice: 1200,
        rating: 4.3,
        reviews: 94,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        badge: "جديد",
        isFlash: false,
        claimed: 0,
        specs: ["نعل مرن ممتص للصدمات", "قماش خفيف ناعم", "متوفر بمقاسات 40-45"]
    },
    {
        id: 6,
        name: "قلاية هوائية بدون زيت سعة 5.5 لتر بشاشة رقمية تفاعلية",
        category: "home",
        price: 4200,
        oldPrice: 5500,
        rating: 4.9,
        reviews: 680,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
        badge: "توفير 1300 ج.م",
        isFlash: true,
        claimed: 88,
        specs: ["توفير 85% من الدهون", "8 برامج طهي جاهزة", "وعاء سهل التنظيف"]
    },
    {
        id: 7,
        name: "عبوة زيت زيتون بكر ممتاز نقي 1 لتر - عصرة أولى على البارد",
        category: "supermarket",
        price: 340,
        oldPrice: 410,
        rating: 4.7,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
        badge: "سوبرماركت",
        isFlash: false,
        claimed: 0,
        specs: ["طبيعي 100% بدون إضافات", "حموضة أقل من 0.8%", "إنتاج مصري فاخر"]
    },
    {
        id: 8,
        name: "حقيبة ظهر أنيقة للكمبيوتر المحمول مقاومة للماء والماء",
        category: "fashion",
        price: 650,
        oldPrice: 850,
        rating: 4.4,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        badge: "خصم 23%",
        isFlash: false,
        claimed: 0,
        specs: ["تتسع لأجهزة حتى 15.6 بوصة", "منفذ شحن USB خارجي", "جيوب سرية للأغراض"]
    }
];

let cart = [];
let activeCategory = 'all';

// Application Initialization
window.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderFlashDeals();
    renderProducts(products);
    updateCartUI();
    startCountdownTimer();
});

// Render Main Product Catalog
function renderProducts(items) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (!items || items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full bg-white p-8 text-center rounded-xl border border-gray-200 my-4 shadow-sm">
                <i class="fa-solid fa-box-open text-5xl text-gray-300 mb-3 block"></i>
                <p class="text-gray-700 font-bold text-base mb-2">عذراً! لم نجد أي منتجات تطابق طلبك.</p>
                <p class="text-xs text-gray-400 mb-4">جرب البحث بكلمات أخرى أو اختر قسماً آخر من القائمة.</p>
                <button onclick="resetFilters()" class="bg-amazon-button hover:bg-amazon-buttonHover text-amazon-dark text-xs font-extrabold px-5 py-2.5 rounded-lg transition shadow-sm">
                    إعادة عرض كافة المنتجات
                </button>
            </div>`;
        return;
    }

    container.innerHTML = items.map(product => `
        <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div class="p-4 relative">
                ${product.badge ? `<span class="absolute top-2 right-2 bg-amazon-accent text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm z-10">${product.badge}</span>` : ''}
                
                <div class="w-full h-44 flex items-center justify-center mb-3 cursor-pointer overflow-hidden rounded-lg bg-gray-50" onclick="openQuickView(${product.id})">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" 
                         onerror="this.src='https://placehold.co/300x300/131921/FFFFFF?text=Amazon+EG'">
                </div>

                <h3 onclick="openQuickView(${product.id})" class="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 hover:text-amazon-link cursor-pointer mb-2 leading-snug min-h-[36px]">
                    ${product.name}
                </h3>

                <div class="flex items-center gap-1.5 text-xs mb-2">
                    <div class="text-amazon-orange text-xs">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="text-gray-500 text-[11px] font-medium">(${product.reviews})</span>
                </div>

                <div class="flex items-baseline gap-2">
                    <span class="text-lg font-black text-gray-900">${product.price.toLocaleString()} <span class="text-xs font-semibold text-gray-600">ج.م</span></span>
                    ${product.oldPrice ? `<span class="text-xs text-gray-400 line-through">${product.oldPrice.toLocaleString()} ج.م</span>` : ''}
                </div>
            </div>

            <div class="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                <button onclick="addToCart(${product.id})" class="flex-1 bg-amazon-button hover:bg-amazon-buttonHover text-amazon-dark font-extrabold text-xs py-2 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95">
                    <i class="fa-solid fa-cart-plus text-sm"></i> أضف للعربة
                </button>
                <button onclick="openQuickView(${product.id})" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs font-bold transition">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Render Flash Sale Section
function renderFlashDeals() {
    const container = document.getElementById('flashDealsContainer');
    if (!container) return;

    const flashItems = products.filter(p => p.isFlash);

    container.innerHTML = flashItems.map(p => `
        <div class="bg-gradient-to-b from-gray-50 to-white rounded-xl p-3 border border-red-100 shadow-sm flex flex-col justify-between hover:border-red-300 transition">
            <div>
                <div class="h-32 flex items-center justify-center mb-2 cursor-pointer bg-white rounded-lg p-2" onclick="openQuickView(${p.id})">
                    <img src="${p.image}" alt="${p.name}" class="max-h-full object-contain" onerror="this.src='https://placehold.co/200x200?text=Deal'">
                </div>
                <h4 onclick="openQuickView(${p.id})" class="text-xs font-bold text-gray-800 line-clamp-2 mb-1 hover:text-amazon-link cursor-pointer">${p.name}</h4>
                <div class="text-amazon-accent font-extrabold text-sm mb-2">${p.price.toLocaleString()} ج.م</div>
                
                <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                    <div class="bg-red-600 h-full rounded-full transition-all duration-500" style="width: ${p.claimed}%"></div>
                </div>
                <div class="flex justify-between items-center text-[10px] text-gray-500 font-bold">
                    <span>مباع: ${p.claimed}%</span>
                    <span class="text-red-600">متبقي قليل</span>
                </div>
            </div>

            <button onclick="addToCart(${p.id})" class="mt-3 w-full bg-amazon-button hover:bg-amazon-buttonHover text-amazon-dark font-extrabold text-xs py-2 rounded-lg shadow-sm transition active:scale-95">
                اطلب فوراً
            </button>
        </div>
    `).join('');
}

// Star Rating SVG/FontAwesome Generator Helper
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
    }
    if (hasHalf) {
        starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
    }
    return starsHtml;
}

// Filter Products by Selected Category
function filterByCategory(category) {
    activeCategory = category;
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);

    const titleEl = document.getElementById('catalogTitle');
    if (titleEl) {
        const categoryNames = {
            'all': 'جميع المنتجات المتاحة في مصر',
            'electronics': 'قسم الإلكترونيات والهواتف',
            'supermarket': 'قسم منتجات السوبر ماركت',
            'fashion': 'قسم الأزياء والموضة',
            'home': 'قسم المنزل والمطبخ'
        };
        titleEl.textContent = categoryNames[category] || 'المنتجات المتاحة';
    }

    const gridSection = document.getElementById('productsGrid');
    if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
}

// Reset Search & Category Filters
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchCategory = document.getElementById('searchCategory');
    if (searchInput) searchInput.value = '';
    if (searchCategory) searchCategory.value = 'all';

    filterByCategory('all');
}

// Execute Search from Input Bar
function handleSearch(event) {
    if (event.key === 'Enter') {
        executeSearch();
    }
}

function executeSearch() {
    const queryInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('searchCategory');

    const query = queryInput ? queryInput.value.trim().toLowerCase() : '';
    const category = categorySelect ? categorySelect.value : 'all';

    let results = products;

    if (category !== 'all') {
        results = results.filter(p => p.category === category);
    }

    if (query) {
        results = results.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.specs.some(s => s.toLowerCase().includes(query))
        );
    }

    renderProducts(results);

    const gridSection = document.getElementById('productsGrid');
    if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
}

// Sort Products
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    const sortValue = sortSelect.value;
    let currentList = [...products];

    if (activeCategory !== 'all') {
        currentList = currentList.filter(p => p.category === activeCategory);
    }

    if (sortValue === 'low-high') {
        currentList.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'high-low') {
        currentList.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating') {
        currentList.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(currentList);
}

// Local Storage Load & Save Functions
function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('amazon_eg_cart');
        cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Could not load cart from localStorage", e);
        cart = [];
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('amazon_eg_cart', JSON.stringify(cart));
    } catch (e) {
        console.error("Could not save cart to localStorage", e);
    }
}

// Add Item to Shopping Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`تمت إضافة "${product.name}" إلى عربة التسوق بنجاح!`);
}

// Modify Item Quantity
function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCartToStorage();
    updateCartUI();
}

// Remove Single Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCartToStorage();
    updateCartUI();
    showToast("تمت إزالة المنتج من عربة التسوق");
}

// Clear Entire Cart
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast("تم تفريغ عربة التسوق بالكامل");
}

// Update Cart Counter & Drawer Interface
function updateCartUI() {
    const cartCountEl = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSubtotalItems = document.getElementById('cartSubtotalItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const freeShippingText = document.getElementById('freeShippingText');
    const shippingProgressBar = document.getElementById('shippingProgressBar');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCountEl) cartCountEl.textContent = totalCount;
    if (cartSubtotalItems) cartSubtotalItems.textContent = `${totalCount} منتجات`;
    if (cartTotalPrice) cartTotalPrice.textContent = `${totalPrice.toLocaleString()} ج.م`;

    // Free Shipping Progress Calculation (Target: 350 EGP)
    const targetShipping = 350;
    if (freeShippingText && shippingProgressBar) {
        if (totalPrice >= targetShipping) {
            freeShippingText.innerHTML = '<span class="text-green-700 font-bold"><i class="fa-solid fa-circle-check ml-1"></i> مبروك! لقد حصلت على شحن مجاني للطلب!</span>';
            shippingProgressBar.style.width = '100%';
            shippingProgressBar.className = 'bg-green-600 h-full transition-all duration-300';
        } else {
            const needed = targetShipping - totalPrice;
            freeShippingText.textContent = `أضف ${needed.toLocaleString()} ج.م إضافية للحصول على شحن مجاني!`;
            const percentage = Math.min((totalPrice / targetShipping) * 100, 100);
            shippingProgressBar.style.width = `${percentage}%`;
            shippingProgressBar.className = 'bg-amazon-orange h-full transition-all duration-300';
        }
    }

    // Render Cart Drawer HTML List
    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="text-center py-12 text-gray-400 space-y-3">
                <i class="fa-solid fa-cart-shopping text-6xl text-gray-200"></i>
                <p class="font-bold text-gray-600 text-sm">عربة التسوق فارغة حالياً</p>
                <p class="text-xs text-gray-400">تصفح المنتجات وأضف ما يعجبك إلى العربة</p>
            </div>`;
        return;
    }

    cartItemsList.innerHTML = cart.map(item => `
        <div class="flex gap-3 pt-3 items-center justify-between">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded border border-gray-200 p-1" onerror="this.src='https://placehold.co/100x100?text=Item'">
            <div class="flex-1 min-w-0">
                <h4 class="text-xs font-bold text-gray-800 truncate">${item.name}</h4>
                <div class="text-xs text-amazon-accent font-extrabold mt-0.5">${(item.price * item.quantity).toLocaleString()} ج.م</div>
                
                <div class="flex items-center gap-3 mt-2">
                    <div class="flex items-center border border-gray-300 rounded bg-gray-50 overflow-hidden">
                        <button onclick="changeQuantity(${item.id}, -1)" class="px-2 py-0.5 text-xs font-bold hover:bg-gray-200 text-gray-700">-</button>
                        <span class="px-2 text-xs font-bold text-gray-900">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" class="px-2 py-0.5 text-xs font-bold hover:bg-gray-200 text-gray-700">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-xs text-red-500 hover:underline font-semibold">إزالة</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Cart Drawer Visibility
function toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
        drawer.classList.toggle('hidden');
    }
}

// Quick View Modal Controls
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalContent = document.getElementById('modalContent');
    const modal = document.getElementById('quickViewModal');

    if (!modalContent || !modal) return;

    modalContent.innerHTML = `
        <div class="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
            <img src="${product.image}" alt="${product.name}" class="max-h-72 object-contain rounded-lg drop-shadow-md" onerror="this.src='https://placehold.co/400x400?text=Product'">
        </div>
        <div class="space-y-4 flex flex-col justify-between">
            <div>
                <span class="text-xs font-bold text-amazon-accent bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">${product.badge || 'منتج أصلي 100%'}</span>
                <h2 class="text-base sm:text-lg font-bold text-gray-900 mt-2 leading-snug">${product.name}</h2>
                
                <div class="flex items-center gap-2 my-2">
                    <span class="text-amazon-orange text-xs">${generateStarRating(product.rating)}</span>
                    <span class="text-xs text-gray-500 font-bold">(${product.rating} من 5)</span>
                </div>

                <div class="text-2xl font-black text-gray-900 my-3">
                    ${product.price.toLocaleString()} <span class="text-sm font-semibold text-gray-600">ج.م</span>
                    ${product.oldPrice ? `<span class="text-xs text-gray-400 line-through mr-2 font-normal">${product.oldPrice.toLocaleString()} ج.م</span>` : ''}
                </div>

                <div class="space-y-1.5 border-t pt-3 my-2">
                    <h5 class="text-xs font-bold text-gray-700">المواصفات الرئيسية:</h5>
                    <ul class="text-xs text-gray-600 space-y-1 list-disc list-inside">
                        ${product.specs ? product.specs.map(spec => `<li>${spec}</li>`).join('') : '<li>ضمان كامل لمدة سنة</li>'}
                    </ul>
                </div>
            </div>

            <button onclick="addToCart(${product.id}); closeQuickView();" class="w-full bg-amazon-button hover:bg-amazon-buttonHover text-amazon-dark font-extrabold py-3 rounded-xl shadow transition duration-200 flex items-center justify-center gap-2">
                <i class="fa-solid fa-cart-plus text-base"></i> أضف إلى عربة التسوق
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.add('hidden');
}

// Checkout Form Modal Logic
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("عربة التسوق فارغة! أضف بعض المنتجات أولاً للمتابعة.");
        return;
    }
    toggleCartDrawer();
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) checkoutModal.classList.remove('hidden');
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) checkoutModal.classList.add('hidden');
}

// Process Order Submission
function processOrder(e) {
    e.preventDefault();
    closeCheckoutModal();
    
    cart = [];
    saveCartToStorage();
    updateCartUI();
    
    showToast("🎉 تم إرسال طلبك بنجاح! وسيتصل بك مندوب الشحن قريبًا.");
}

// Dynamic Toast Notification System
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-amazon-dark text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-amazon-yellow transition-all duration-300 pointer-events-auto transform translate-y-2 opacity-0';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-amazon-yellow text-base"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    // Fade-in animation
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Auto dismiss
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Flash Deals Real-time Countdown Timer
function startCountdownTimer() {
    let totalSeconds = 5 * 3600 + 42 * 60 + 18; // Initial countdown: 05:42:18

    setInterval(() => {
        if (totalSeconds <= 0) return;
        totalSeconds--;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}