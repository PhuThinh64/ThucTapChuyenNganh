// Global variables
let currentEditingVenueId = null;
let currentViewingBookingId = null;

// Owner Authentication
function checkOwnerAuth() {
    const currentOwner = sessionStorage.getItem('currentOwner');
    const rememberOwner = localStorage.getItem('rememberOwner');

    if (!currentOwner && !rememberOwner) {
        window.location.href = 'login.html';
        return;
    }

    const owner = currentOwner ? JSON.parse(currentOwner) : JSON.parse(rememberOwner);
    const ownerNameElement = document.getElementById('ownerName');
    if (ownerNameElement) {
        ownerNameElement.textContent = owner.name || 'Chủ Sân';
    }
}

function handleOwnerLogin(event) {
    event.preventDefault();
    const email = document.getElementById('ownerEmail').value;
    const password = document.getElementById('ownerPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (email === 'owner@sanbong.com' && password === 'owner123') {
        const ownerUser = {
            id: 'owner-1',
            name: 'Chủ Sân',
            email: email,
            role: 'owner',
            loginTime: new Date().toISOString()
        };

        sessionStorage.setItem('currentOwner', JSON.stringify(ownerUser));

        if (rememberMe) {
            localStorage.setItem('rememberOwner', JSON.stringify(ownerUser));
        }

        showNotification('Đăng nhập thành công!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showNotification('Email hoặc mật khẩu không đúng', 'error');
    }
}

function handleOwnerLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        sessionStorage.removeItem('currentOwner');
        localStorage.removeItem('rememberOwner');
        window.location.href = 'login.html';
    }
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    } z-[9999] max-w-sm`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
}

// Get owner's venues
function getOwnerVenues() {
    const allVenues = JSON.parse(localStorage.getItem('venues') || '[]');
    return allVenues.filter(v => v.ownerId === 'owner-1');
}

// Venue Management
function openAddVenueModal() {
    currentEditingVenueId = null;
    const modalTitle = document.getElementById('modalTitle');
    const venueForm = document.getElementById('venueForm');
    const venueModal = document.getElementById('venueModal');

    if (modalTitle) modalTitle.textContent = 'Thêm sân bóng mới';
    if (venueForm) venueForm.reset();
    if (venueModal) venueModal.classList.remove('hidden');
}

function closeVenueModal() {
    const modal = document.getElementById('venueModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentEditingVenueId = null;
}

function editVenue(id) {
    const venues = getOwnerVenues();
    const venue = venues.find(v => v.id === id);

    if (venue) {
        currentEditingVenueId = id;
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) modalTitle.textContent = 'Chỉnh sửa sân bóng';

        const venueName = document.getElementById('venueName');
        const venueLocation = document.getElementById('venueLocation');
        const venuePrice = document.getElementById('venuePrice');
        const venueRating = document.getElementById('venueRating');
        const venueDescription = document.getElementById('venueDescription');
        const venueStatus = document.getElementById('venueStatus');
        const type5v5 = document.getElementById('type5v5');
        const type7v7 = document.getElementById('type7v7');
        const type11v11 = document.getElementById('type11v11');

        if (venueName) venueName.value = venue.name;
        if (venueLocation) venueLocation.value = venue.location;
        if (venuePrice) venuePrice.value = venue.price;
        if (venueRating) venueRating.value = venue.rating;
        if (venueDescription) venueDescription.value = venue.description || '';
        if (venueStatus) venueStatus.value = venue.status;

        if (type5v5) type5v5.checked = venue.types.includes('5v5');
        if (type7v7) type7v7.checked = venue.types.includes('7v7');
        if (type11v11) type11v11.checked = venue.types.includes('11v11');

        const venueModal = document.getElementById('venueModal');
        if (venueModal) venueModal.classList.remove('hidden');
    }
}

function saveVenue(event) {
    event.preventDefault();

    const venueName = document.getElementById('venueName');
    const venueLocation = document.getElementById('venueLocation');
    const venuePrice = document.getElementById('venuePrice');
    const venueRating = document.getElementById('venueRating');
    const venueDescription = document.getElementById('venueDescription');
    const venueStatus = document.getElementById('venueStatus');
    const type5v5 = document.getElementById('type5v5');
    const type7v7 = document.getElementById('type7v7');
    const type11v11 = document.getElementById('type11v11');

    const name = venueName ? venueName.value : '';
    const location = venueLocation ? venueLocation.value : '';
    const price = venuePrice ? parseInt(venuePrice.value) : 0;
    const rating = venueRating ? parseFloat(venueRating.value) : 0;
    const description = venueDescription ? venueDescription.value : '';
    const status = venueStatus ? venueStatus.value : 'pending';
    const types = [];

    if (type5v5 && type5v5.checked) types.push('5v5');
    if (type7v7 && type7v7.checked) types.push('7v7');
    if (type11v11 && type11v11.checked) types.push('11v11');

    if (types.length === 0) {
        showNotification('Vui lòng chọn ít nhất một loại sân', 'error');
        return;
    }

    let venues = JSON.parse(localStorage.getItem('venues') || '[]');

    if (currentEditingVenueId) {
        const allIndex = venues.findIndex(v => v.id === currentEditingVenueId);
        if (allIndex !== -1) {
            venues[allIndex] = { ...venues[allIndex], name, location, price, rating, description, status, types };
            showNotification('Cập nhật sân bóng thành công', 'success');
        }
    } else {
        const newId = venues.length > 0 ? Math.max(...venues.map(v => v.id)) + 1 : 1;
        venues.push({ id: newId, name, location, price, rating, description, status: 'pending', types, ownerId: 'owner-1' });
        showNotification('Thêm sân bóng thành công. Chờ admin duyệt!', 'success');
    }

    localStorage.setItem('venues', JSON.stringify(venues));
    closeVenueModal();

    if (window.renderOwnerVenuesTable) {
        window.renderOwnerVenuesTable(getOwnerVenues());
    }
}

function openDeleteModal(id) {
    window.venueToDelete = id;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) deleteModal.classList.add('hidden');
    window.venueToDelete = null;
}

function confirmDelete() {
    if (window.venueToDelete !== null) {
        let venues = JSON.parse(localStorage.getItem('venues') || '[]');
        venues = venues.filter(v => v.id !== window.venueToDelete);
        localStorage.setItem('venues', JSON.stringify(venues));
        closeDeleteModal();
        showNotification('Xóa sân bóng thành công', 'success');

        if (window.renderOwnerVenuesTable) {
            window.renderOwnerVenuesTable(getOwnerVenues());
        }
    }
}

// Bookings Management
function loadOwnerBookings() {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const ownerVenues = getOwnerVenues();
    const ownerVenueIds = ownerVenues.map(v => v.id);
    return allBookings.filter(b => ownerVenueIds.includes(b.venueId));
}

function getBookingStats() {
    const bookings = loadOwnerBookings();
    return {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        pending: bookings.filter(b => b.status === 'pending').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
    };
}

function viewBookingDetails(id) {
    const bookings = loadOwnerBookings();
    const booking = bookings.find(b => b.id === id);

    if (!booking) return;

    currentViewingBookingId = id;
    const bookingDetails = document.getElementById('bookingDetails');
    if (bookingDetails) {
        bookingDetails.innerHTML = `
            <div class="space-y-3">
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Tên khách hàng</p>
                    <p class="text-sm font-semibold text-gray-900">${booking.userName}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Sân bóng</p>
                    <p class="text-sm font-semibold text-gray-900">${booking.venueName}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Ngày chơi</p>
                    <p class="text-sm font-semibold text-gray-900">${booking.date}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Giờ chơi</p>
                    <p class="text-sm font-semibold text-gray-900">${booking.time}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Thời lượng</p>
                    <p class="text-sm font-semibold text-gray-900">${booking.duration} phút</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Giá tiền</p>
                    <p class="text-sm font-semibold text-gray-900">${formatCurrency(booking.price)}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Trạng thái</p>
                    <p class="text-sm font-semibold ${
                        booking.status === 'confirmed' ? 'text-green-600' :
                        booking.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                    }">${
                        booking.status === 'confirmed' ? 'Xác nhận' :
                        booking.status === 'pending' ? 'Chờ xác nhận' :
                        'Hủy'
                    }</p>
                </div>
            </div>
        `;
    }

    const approveBtn = document.getElementById('approveBookingBtn');
    const rejectBtn = document.getElementById('rejectBookingBtn');

    if (approveBtn) {
        if (booking.status === 'pending') {
            approveBtn.classList.remove('hidden');
        } else {
            approveBtn.classList.add('hidden');
        }
    }

    if (rejectBtn) {
        if (booking.status === 'pending') {
            rejectBtn.classList.remove('hidden');
        } else {
            rejectBtn.classList.add('hidden');
        }
    }

    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) bookingModal.classList.remove('hidden');
}

function closeBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) bookingModal.classList.add('hidden');
    currentViewingBookingId = null;
}

function approveBooking() {
    if (currentViewingBookingId === null) return;

    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.id === currentViewingBookingId);

    if (booking) {
        booking.status = 'confirmed';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        showNotification('Xác nhận đặt sân thành công', 'success');
        closeBookingModal();

        if (window.renderOwnerBookingsTable) {
            window.renderOwnerBookingsTable(loadOwnerBookings());
        }
    }
}

function rejectBooking() {
    if (currentViewingBookingId === null) return;

    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.id === currentViewingBookingId);

    if (booking) {
        booking.status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        showNotification('Từ chối đặt sân thành công', 'success');
        closeBookingModal();

        if (window.renderOwnerBookingsTable) {
            window.renderOwnerBookingsTable(loadOwnerBookings());
        }
    }
}

// Revenue Calculation
function getRevenueData() {
    const bookings = loadOwnerBookings().filter(b => b.status === 'confirmed');
    const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
    
    const monthlyRevenue = {};
    bookings.forEach(b => {
        const month = b.date.substring(0, 7);
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + b.price;
    });

    return { totalRevenue, monthlyRevenue, bookingCount: bookings.length };
}

function filterOwnerVenues() {
    if (!window.ownerVenues) return;

    const name = document.getElementById('filterName');
    const status = document.getElementById('filterStatus');

    const nameValue = name ? name.value.toLowerCase() : '';
    const statusValue = status ? status.value : '';

    const filtered = window.ownerVenues.filter(v => {
        const nameMatch = v.name.toLowerCase().includes(nameValue);
        const statusMatch = !statusValue || v.status === statusValue;
        return nameMatch && statusMatch;
    });

    if (window.renderOwnerVenuesTable) {
        window.renderOwnerVenuesTable(filtered);
    }
}

function filterOwnerBookings() {
    if (!window.ownerBookings) return;

    const status = document.getElementById('filterStatus');
    const date = document.getElementById('filterDate');

    const statusValue = status ? status.value : '';
    const dateValue = date ? date.value : '';

    const filtered = window.ownerBookings.filter(b => {
        const statusMatch = !statusValue || b.status === statusValue;
        const dateMatch = !dateValue || b.date === dateValue;
        return statusMatch && dateMatch;
    });

    if (window.renderOwnerBookingsTable) {
        window.renderOwnerBookingsTable(filtered);
    }
}

// Export Functions
window.checkOwnerAuth = checkOwnerAuth;
window.handleOwnerLogin = handleOwnerLogin;
window.handleOwnerLogout = handleOwnerLogout;
window.showNotification = showNotification;
window.formatCurrency = formatCurrency;
window.getOwnerVenues = getOwnerVenues;
window.openAddVenueModal = openAddVenueModal;
window.closeVenueModal = closeVenueModal;
window.editVenue = editVenue;
window.saveVenue = saveVenue;
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.loadOwnerBookings = loadOwnerBookings;
window.getBookingStats = getBookingStats;
window.viewBookingDetails = viewBookingDetails;
window.closeBookingModal = closeBookingModal;
window.approveBooking = approveBooking;
window.rejectBooking = rejectBooking;
window.getRevenueData = getRevenueData;
window.filterOwnerVenues = filterOwnerVenues;
window.filterOwnerBookings = filterOwnerBookings;
