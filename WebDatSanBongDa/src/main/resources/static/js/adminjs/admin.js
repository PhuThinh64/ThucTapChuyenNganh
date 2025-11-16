// Global variables
let currentEditingVenueId = null;
let currentViewingUserId = null;
let venueToDelete = null;


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
    const venues = JSON.parse(localStorage.getItem('venues') || '[]');
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
    const status = venueStatus ? venueStatus.value : 'active';
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
        const index = venues.findIndex(v => v.id === currentEditingVenueId);
        if (index !== -1) {
            venues[index] = { ...venues[index], name, location, price, rating, description, status, types };
            showNotification('Cập nhật sân bóng thành công', 'success');
        }
    } else {
        const newId = venues.length > 0 ? Math.max(...venues.map(v => v.id)) + 1 : 1;
        venues.push({ id: newId, name, location, price, rating, description, status, types });
        showNotification('Thêm sân bóng thành công', 'success');
    }

    localStorage.setItem('venues', JSON.stringify(venues));
    closeVenueModal();

    if (window.renderVenuesTable) {
        window.renderVenuesTable(venues);
    }
}

function openDeleteModal(id) {
    venueToDelete = id;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) deleteModal.classList.add('hidden');
    venueToDelete = null;
}

function confirmDelete() {
    if (venueToDelete !== null) {
        let venues = JSON.parse(localStorage.getItem('venues') || '[]');
        venues = venues.filter(v => v.id !== window.venueToDelete);
        localStorage.setItem('venues', JSON.stringify(venues));
        closeDeleteModal();
        showNotification('Xóa sân bóng thành công', 'success');

        if (window.renderVenuesTable) {
            window.renderVenuesTable(venues);
        }
    }
}

// User Management
function viewUserDetails(id) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === id);

    if (!user) return;

    currentViewingUserId = id;
    const userDetails = document.getElementById('userDetails');
    if (userDetails) {
        userDetails.innerHTML = `
            <div class="space-y-3">
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Tên</p>
                    <p class="text-sm font-semibold text-gray-900">${user.name}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Email</p>
                    <p class="text-sm font-semibold text-gray-900">${user.email}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Số điện thoại</p>
                    <p class="text-sm font-semibold text-gray-900">${user.phone}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Ngày tham gia</p>
                    <p class="text-sm font-semibold text-gray-900">${user.joinDate}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase">Số lần đặt sân</p>
                    <p class="text-sm font-semibold text-gray-900">${user.bookings}</p>
                </div>
            </div>
        `;
    }

    const toggleBtn = document.getElementById('toggleStatusBtn');
    if (toggleBtn) {
        if (user.status === 'active') {
            toggleBtn.textContent = 'Vô hiệu hóa';
            toggleBtn.className = 'flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold';
        } else {
            toggleBtn.textContent = 'Kích hoạt';
            toggleBtn.className = 'flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold';
        }
    }

    const userModal = document.getElementById('userModal');
    if (userModal) userModal.classList.remove('hidden');
}

function closeUserModal() {
    const userModal = document.getElementById('userModal');
    if (userModal) userModal.classList.add('hidden');
    currentViewingUserId = null;
}

function toggleUserStatus() {
    if (currentViewingUserId === null) return;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === currentViewingUserId);

    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        localStorage.setItem('users', JSON.stringify(users));
        renderUsersTable(users);
        showNotification(`${user.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} người dùng thành công`, 'success');
        closeUserModal();
    }
}

function deleteUser(id) {
    if (confirm('B��n có chắc chắn muốn xóa người dùng này?')) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        showNotification('Xóa người dùng thành công', 'success');

        if (window.renderUsersTable) {
            window.renderUsersTable(users);
        }
    }
}

function filterVenues() {
    // if (!window.venues) return;
    const venuesToFilter = window.venues || JSON.parse(localStorage.getItem('venues') || '[]');

    const name = document.getElementById('filterName');
    const location = document.getElementById('filterLocation');
    const status = document.getElementById('filterStatus');

    const nameValue = name ? name.value.toLowerCase() : '';
    const locationValue = location ? location.value.toLowerCase() : '';
    const statusValue = status ? status.value : '';

    const filtered = venuesToFilter.filter(v => {
        const nameMatch = v.name.toLowerCase().includes(nameValue);
        const locationMatch = v.location.toLowerCase().includes(locationValue);
        const statusMatch = !statusValue || v.status === statusValue;
        return nameMatch && locationMatch && statusMatch;
    });

    if (window.renderVenuesTable) {
        window.renderVenuesTable(filtered);
    }
}

function filterUsers() {
    if (!window.users) return;

    const name = document.getElementById('filterName');
    const email = document.getElementById('filterEmail');
    const status = document.getElementById('filterStatus');

    const nameValue = name ? name.value.toLowerCase() : '';
    const emailValue = email ? email.value.toLowerCase() : '';
    const statusValue = status ? status.value : '';

    const filtered = window.users.filter(u => {
        const nameMatch = u.name.toLowerCase().includes(nameValue);
        const emailMatch = u.email.toLowerCase().includes(emailValue);
        const statusMatch = !statusValue || u.status === statusValue;
        return nameMatch && emailMatch && statusMatch;
    });

    if (window.renderUsersTable) {
        window.renderUsersTable(filtered);
    }
}

function filterBookings() {
    const userName = document.getElementById('filterUserName').value.toLowerCase();
    const venueName = document.getElementById('filterVenueName').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;

    const filtered = bookings.filter(b => {
        const userMatch = b.userName.toLowerCase().includes(userName);
        const venueMatch = b.venueName.toLowerCase().includes(venueName);
        const statusMatch = !status || b.status === status;
        return userMatch && venueMatch && statusMatch;
    });

    renderBookingsTable(filtered);
}

// Report Generation
function generateReport(type) {
    let data = '';

    if (type === 'venues') {
        const venues = JSON.parse(localStorage.getItem('venues') || '[]');
        data = JSON.stringify(venues, null, 2);
    } else if (type === 'users') {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        data = JSON.stringify(users, null, 2);
    } else if (type === 'bookings') {
        const bookings = loadBookings();
        data = JSON.stringify(bookings, null, 2);
    }

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification(`Tạo báo cáo ${type} thành công`, 'success');
}

// Venue Approval for Owners
function approveVenue(id) {
    let venues = JSON.parse(localStorage.getItem('venues') || '[]');
    const venue = venues.find(v => v.id === id);

    if (venue) {
        venue.status = 'active';
        localStorage.setItem('venues', JSON.stringify(venues));
        showNotification('Duyệt sân bóng thành công', 'success');

        if (window.renderVenuesTable) {
            window.renderVenuesTable(venues);
        }
    }
}

function rejectVenue(id) {
    let venues = JSON.parse(localStorage.getItem('venues') || '[]');
    const venue = venues.find(v => v.id === id);

    if (venue) {
        venue.status = 'inactive';
        localStorage.setItem('venues', JSON.stringify(venues));
        showNotification('Từ chối duyệt sân bóng thành công', 'success');

        if (window.renderVenuesTable) {
            window.renderVenuesTable(venues);
        }
    }
}

// Export Functions

window.showNotification = showNotification;
window.formatCurrency = formatCurrency;
window.openAddVenueModal = openAddVenueModal;
window.closeVenueModal = closeVenueModal;
window.editVenue = editVenue;
window.saveVenue = saveVenue;
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.viewUserDetails = viewUserDetails;
window.closeUserModal = closeUserModal;
window.toggleUserStatus = toggleUserStatus;
window.deleteUser = deleteUser;
window.filterVenues = filterVenues;
window.filterUsers = filterUsers;
window.loadBookings = loadBookings;
window.getBookingStats = getBookingStats;
window.generateReport = generateReport;
window.approveVenue = approveVenue;
window.rejectVenue = rejectVenue;
