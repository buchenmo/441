// 购物车功能
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        if (!checkAuth123()) return;
        updateCartDisplay123();
    }
    
    if (window.location.pathname.includes('checkout.html')) {
        if (!checkAuth123()) return;
        displayCheckout123();
        
        const confirmOrderBtn = document.getElementById('confirm-order-btn');
        if (confirmOrderBtn) {
            confirmOrderBtn.addEventListener('click', confirmOrder123);
        }
    }
});

// 更新购物车显示
function updateCartDisplay123() {
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartContent.style.display = 'block';
    
    // 渲染购物车项目
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${formatPrice123(item.price)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity123(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantityInput123(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity123(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">${formatPrice123(itemTotal)}</div>
                <button class="btn btn-danger" onclick="removeFromCart123(${item.id})">Remove</button>
            </div>
        `;
    });
    
    // 更新总计
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('cart-subtotal').textContent = formatPrice123(subtotal);
    document.getElementById('cart-tax').textContent = formatPrice123(tax);
    document.getElementById('cart-total').textContent = formatPrice123(total);
}

// 更新商品数量
function updateQuantity123(itemId, change) {
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity < 1) {
            item.quantity = 1;
        }
        
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartDisplay123();
    }
}

// 通过输入框更新数量
function updateQuantityInput123(itemId, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartDisplay123();
    }
}

// 从购物车移除商品
function removeFromCart123(itemId) {
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartDisplay123();
}

// 显示订单确认页面
function displayCheckout123() {
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    const checkoutContent = document.getElementById('checkout-content');
    
    if (cart.length === 0) {
        checkoutContent.innerHTML = '<p>Your cart is empty. <a href="cart.html">Return to cart</a></p>';
        return;
    }
    
    let html = `
        <div class="cart-summary">
            <h3>Order Summary</h3>
    `;
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="summary-row">
                <span>${item.title} x ${item.quantity}</span>
                <span>${formatPrice123(itemTotal)}</span>
            </div>
        `;
    });
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    html += `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatPrice123(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>${formatPrice123(tax)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total:</span>
                <span>${formatPrice123(total)}</span>
            </div>
        </div>
    `;
    
    checkoutContent.innerHTML = html;
}

// 确认订单
function confirmOrder123() {
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // 计算订单总额
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // 创建订单
    const order = {
        id: Date.now(),
        username: currentUser,
        date: new Date().toISOString(),
        items: [...cart],
        subtotal: subtotal,
        tax: tax,
        total: total
    };
    
    // 保存订单到历史记录
    const ordersKey = `orders_${currentUser}`;
    let orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
    orders.push(order);
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    
    // 清空购物车
    localStorage.setItem(cartKey, JSON.stringify([]));
    
    // 显示成功消息并重定向
    alert('Order confirmed successfully!');
    window.location.href = 'orders.html';
}