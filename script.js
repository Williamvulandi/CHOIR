var cart = {};

document.addEventListener('DOMContentLoaded', () => {
    setupIntersectionObserver();
    setupQuantityControls();
    setupCartUI();
});

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function setupQuantityControls() {
    const handleUpdate = (btn, change) => {
        const container = btn.closest('.quantity-controls');
        const id = container.dataset.id;
        const name = container.dataset.name;
        const price = parseInt(container.dataset.price);

        const display = document.getElementById(`qty-${id}`);
        let currentVal = parseInt(display.textContent);
        let newVal = currentVal + change;

        if (newVal < 0) newVal = 0;

        // Update Display
        display.textContent = newVal;

        // Update Cart
        if (newVal > 0) {
            cart[id] = { name, price, qty: newVal };
        } else {
            delete cart[id];
        }

        updateCartDisplay();
    };

    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => handleUpdate(btn, -1));
    });

    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => handleUpdate(btn, 1));
    });
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-price');

    container.innerHTML = '';
    let total = 0;
    const items = Object.values(cart);

    if (items.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
    } else {
        items.forEach(item => {
            total += item.price * item.qty;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <span class="item-price">R${item.price} each</span>
                </div>
                <div class="item-total">
                    x${item.qty} (R${item.price * item.qty})
                </div>
            `;
            container.appendChild(div);
        });
    }

    totalEl.textContent = `R${total}`;
}

function setupCartUI() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const closeBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartToggleBtn = document.getElementById('cart-toggle-btn');

    closeBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', openCart);
    }

    checkoutBtn.addEventListener('click', () => {
        const items = Object.values(cart);
        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let msg = "Hello! I would like to place an order:%0A%0A";
        let total = 0;

        items.forEach(item => {
            msg += `- ${item.qty}x ${item.name} (R${item.price * item.qty})%0A`;
            total += item.price * item.qty;
        });

        msg += `%0ATotal: R${total}`;

        const url = `https://wa.me/27676827139?text=${msg}`;
        window.open(url, '_blank');
    });
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}
