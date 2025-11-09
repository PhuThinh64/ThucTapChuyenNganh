// admin.js
window.venues = [];
let currentEditingVenueId = null;
let venueToDelete = null;

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } z-[9999] max-w-sm`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

// Load venues from localStorage
function loadVenues() {
    window.venues = JSON.parse(localStorage.getItem('venues') || '[]');
    renderVenuesTable(window.venues);
}

// Render venues table
function renderVenuesTable(data) {
    const tbody = document.getElementById('venuesTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map(v => `
        <tr>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${v.name}</td>
            <td class="px-6 py-4 text-sm text-gray-600">${v.location}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${formatCurrency(v.price)}</td>
            <td class="px-6 py-4 text-sm text-gray-600">${v.rating}/5</td>
            <td class="px-6 py-4 text-sm">
                <span class="px-3 py-1 rounded-full text-sm font-medium ${
        v.status === 'active' ? 'bg-green-100 text-green-800' :
            v.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
    }">${v.status === 'active' ? 'Hoạt động' : v.status === 'pending' ? 'Chờ duyệt' : 'Ngừng hoạt động'}</span>
            </td>
            <td class="px-6 py-4 text-sm flex gap-2 flex-wrap">
                ${v.status === 'pending' ? `
                    <button onclick="approveVenue(${v.id})" class="text-green-600 hover:text-green-700 font-semibold">Duyệt</button>
                    <button onclick="rejectVenue(${v.id})" class="text-orange-600 hover:text-orange-700 font-semibold">Từ chối</button>
                ` : `<button onclick="editVenue(${v.id})" class="text-blue-600 hover:text-blue-700 font-semibold">Sửa</button>`}
                <button onclick="openDeleteModal(${v.id})" class="text-red-600 hover:text-red-700 font-semibold">Xóa</button>
            </td>
        </tr>
    `).join('');
}

// Open Add Venue Modal
function openAddVenueModal() {
    currentEditingVenueId = null;
    document.getElementById('modalTitle').textContent = 'Thêm sân bóng mới';
    document.getElementById('venueForm').reset();
    document.getElementById('venueModal').classList.remove('hidden');
}

// Close Modal
function closeVenueModal() {
    document.getElementById('venueModal').classList.add('hidden');
    currentEditingVenueId = null;
}

// Edit venue
function editVenue(id) {
    const venue = window.venues.find(v => v.id === id);
    if (!venue) return;

    currentEditingVenueId = id;
    document.getElementById('modalTitle').textContent = 'Chỉnh sửa sân bóng';
    document.getElementById('venueName').value = venue.name;
    document.getElementById('venueLocation').value = venue.location;
    document.getElementById('venuePrice').value = venue.price;
    document.getElementById('venueRating').value = venue.rating;
    document.getElementById('venueDescription').value = venue.description || '';
    document.getElementById('venueStatus').value = venue.status;
    document.getElementById('type5v5').checked = venue.types.includes('5v5');
    document.getElementById('type7v7').checked = venue.types.includes('7v7');
    document.getElementById('type11v11').checked = venue.types.includes('11v11');

    document.getElementById('venueModal').classList.remove('hidden');
}

// Save venue
function saveVenue(event) {
    event.preventDefault();

    const name = document.getElementById('venueName').value.trim();
    const location = document.getElementById('venueLocation').value.trim();
    const price = parseInt(document.getElementById('venuePrice').value);
    const rating = parseFloat(document.getElementById('venueRating').value);
    const description = document.getElementById('venueDescription').value.trim();
    const status = document.getElementById('venueStatus').value;
    const types = [];
    if (document.getElementById('type5v5').checked) types.push('5v5');
    if (document.getElementById('type7v7').checked) types.push('7v7');
    if (document.getElementById('type11v11').checked) types.push('11v11');

    if (!name || !location || !price || types.length === 0) {
        showNotification('Vui lòng nhập đầy đủ thông tin và chọn ít nhất 1 loại sân', 'error');
        return;
    }

    if (currentEditingVenueId) {
        const index = window.venues.findIndex(v => v.id === currentEditingVenueId);
        if (index !== -1) {
            window.venues[index] = { ...window.venues[index], name, location, price, rating, description, status, types };
            showNotification('Cập nhật sân bóng thành công', 'success');
        }
    } else {
        const newId = window.venues.length ? Math.max(...window.venues.map(v => v.id)) + 1 : 1;
        window.venues.push({ id: newId, name, location, price, rating, description, status, types });
        showNotification('Thêm sân bóng thành công', 'success');
    }

    localStorage.setItem('venues', JSON.stringify(window.venues));
    renderVenuesTable(window.venues);
    closeVenueModal();
}

// Delete venue
function openDeleteModal(id) {
    venueToDelete = id;
    document.getElementById('deleteModal').classList.remove('hidden');
}
function closeDeleteModal() {
    venueToDelete = null;
    document.getElementById('deleteModal').classList.add('hidden');
}
function confirmDelete() {
    if (venueToDelete === null) return;
    window.venues = window.venues.filter(v => v.id !== venueToDelete);
    localStorage.setItem('venues', JSON.stringify(window.venues));
    renderVenuesTable(window.venues);
    showNotification('Xóa sân bóng thành công', 'success');
    closeDeleteModal();
}

// Filter venues
function filterVenues() {
    const name = document.getElementById('filterName').value.toLowerCase();
    const location = document.getElementById('filterLocation').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;

    const filtered = window.venues.filter(v => {
        return v.name.toLowerCase().includes(name) &&
            v.location.toLowerCase().includes(location) &&
            (!status || v.status === status);
    });
    renderVenuesTable(filtered);
}

// Approve / Reject
function approveVenue(id) {
    const v = window.venues.find(v => v.id === id);
    if (!v) return;
    v.status = 'active';
    localStorage.setItem('venues', JSON.stringify(window.venues));
    renderVenuesTable(window.venues);
    showNotification('Duyệt sân bóng thành công', 'success');
}
function rejectVenue(id) {
    const v = window.venues.find(v => v.id === id);
    if (!v) return;
    v.status = 'inactive';
    localStorage.setItem('venues', JSON.stringify(window.venues));
    renderVenuesTable(window.venues);
    showNotification('Từ chối duyệt sân bóng thành công', 'success');
}

// Init
document.addEventListener('DOMContentLoaded', loadVenues);

// Global exposure
window.openAddVenueModal = openAddVenueModal;
window.closeVenueModal = closeVenueModal;
window.editVenue = editVenue;
window.saveVenue = saveVenue;
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.filterVenues = filterVenues;
window.approveVenue = approveVenue;
window.rejectVenue = rejectVenue;
window.showNotification = showNotification;
window.formatCurrency = formatCurrency;
