// Định dạng số tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

// Cập nhật tổng tiền
function updateTotalPrice(total) {
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = formatPrice(total) + 'đ';
    }
}

// Tính tổng tiền
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Lấy giỏ hàng từ localStorage
function getCart() {
    const cart = localStorage.getItem('footballFieldCart');
    return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem('footballFieldCart', JSON.stringify(cart));
}

// Hiển thị các mục trong giỏ hàng
function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const totalItems = document.getElementById('total-items');
    const totalHours = document.getElementById('total-hours');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        updateTotalPrice(0);
        totalItems.textContent = '0 sân';
        totalHours.textContent = '0 giờ';
        return;
    }

    emptyCartMessage.classList.add('hidden');
    let totalTime = 0;

    const cartHTML = cart.map(item => {
        // Tính số giờ từ thời gian
        const timeMatch = item.time.match(/\d+/g);
        const hours = timeMatch ? Math.abs(parseInt(timeMatch[1]) - parseInt(timeMatch[0])) : 0;
        totalTime += hours;

        return `
        <div class="py-6 flex items-center hover:bg-gray-50" data-id="${item.id}">
            <div class="flex-shrink-0 w-24 h-24">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded-lg">
            </div>
            <div class="ml-6 flex-1">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900">${item.name}</h3>
                    <p class="ml-4 text-lg font-medium text-blue-600">${formatPrice(item.price)}đ</p>
                </div>
                <div class="mt-1 text-sm text-gray-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    ${item.time} (${hours} giờ)
                </div>
                <div class="mt-1 text-sm text-gray-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    ${item.location || 'Địa điểm chưa cập nhật'}
                </div>
            </div>
            <div class="ml-4">
                <button onclick="removeFromCart('${item.id}')" class="text-sm font-medium text-red-600 hover:text-red-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    `}).join('');

    cartItems.innerHTML = cartHTML;
    totalItems.textContent = `${cart.length} sân`;
    totalHours.textContent = `${totalTime} giờ`;
    updateTotalPrice(calculateTotal(cart));
}

// Xóa một mục khỏi giỏ hàng
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    displayCart();
}

// Xóa tất cả các mục trong giỏ hàng
function clearCart() {
    if (confirm('Bạn có chắc muốn xóa tất cả sân đã chọn?')) {
        localStorage.removeItem('footballFieldCart');
        displayCart();
    }
}

// Tính tổng giá
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Cập nhật hiển thị tổng giá
function updateTotalPrice(total) {
    document.getElementById('total-price').textContent = formatPrice(total) + 'đ';
}

// Định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Chuyển đến trang thanh toán
function proceedToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Vui lòng chọn sân trước khi thanh toán');
        return;
    }
    window.location.href = '/checkout';
}

// Thêm sân vào giỏ hàng
function addToCart(fieldData) {
    let cart = getCart();
    
    // Kiểm tra xem sân đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => 
        item.id === fieldData.id && item.time === fieldData.time
    );

    if (existingItem) {
        alert('Sân này đã có trong giỏ hàng!');
        return;
    }

    cart.push(fieldData);
    saveCart(cart);
    alert('Đã thêm sân vào giỏ hàng!');
}

// Cập nhật số lượng sản phẩm trong icon giỏ hàng
function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length.toString();
    }
}

// Khởi tạo giỏ hàng khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
});

// Khởi tạo trang giỏ hàng
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị giỏ hàng khi trang được load
    displayCart();

    // Thêm sự kiện cho các nút
    const clearCartBtn = document.querySelector('button[onclick="clearCart()"]');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    const checkoutBtn = document.querySelector('button[onclick="proceedToCheckout()"]');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
});

// Thêm sân vào giỏ hàng (được gọi từ trang chi tiết sân)
function addToCart(fieldData) {
    let cart = getCart();
    
    // Kiểm tra xem sân đã có trong giỏ hàng chưa
    const existingField = cart.find(item => 
        item.id === fieldData.id && item.time === fieldData.time
    );

    if (existingField) {
        alert('Sân này đã có trong giỏ hàng!');
        return false;
    }

    cart.push(fieldData);
    saveCart(cart);
    alert('Đã thêm sân vào giỏ hàng!');
    return true;
}