
    let venues = [];
    let currentEditingVenueId = null;
    let venueToDelete = null;

    function ensureDependenciesLoaded() {
        // Kiểm tra xem formatCurrency (từ admin.js) đã load chưa
        if (typeof window.formatCurrency === 'undefined' || typeof window.showNotification === 'undefined') {
            setTimeout(ensureDependenciesLoaded, 50); // Thử lại sau 50ms
            return;
        }
        // Khi admin.js load xong, bắt đầu load dữ liệu của venues.js
        loadVenues();
    }

    document.addEventListener('DOMContentLoaded', function() {
        ensureDependenciesLoaded();
});

    function loadVenues() {
    // Load from localStorage or use default data
    const stored = localStorage.getItem('venues');
    if (stored) {
    venues = JSON.parse(stored);
} else {
    venues = [
{ id: 1, name: 'Sân bóng Trung Tâm', location: 'Quận 1, TP.HCM', price: 300000, rating: 5, types: ['5v5', '7v7', '11v11'], status: 'active', description: 'Sân bóng chất lượng cao với trang thiết bị hiện đại' },
{ id: 2, name: 'Sân bóng Khu Đô Thị', location: 'Quận 2, TP.HCM', price: 350000, rating: 5, types: ['5v5', '7v7', '11v11'], status: 'active', description: 'Sân bóng chuẩn quốc tế' },
{ id: 3, name: 'Sân bóng Công Viên', location: 'Quận 7, TP.HCM', price: 280000, rating: 4, types: ['5v5', '7v7'], status: 'pending', description: 'Sân bóng gần công viên thoáng mát' },
{ id: 4, name: 'Sân bóng Thể Thao', location: 'Quận 12, TP.HCM', price: 320000, rating: 4, types: ['5v5', '7v7', '11v11'], status: 'active', description: 'Sân bóng chuyên nghiệp' }
    ];
    localStorage.setItem('venues', JSON.stringify(venues));
}
        window.venues = venues;
    renderVenuesTable(venues);
}

    function renderVenuesTable(data) {
    const tbody = document.getElementById('venuesTableBody');
    tbody.innerHTML = data.map(venue => `
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${venue.name}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${venue.location}</td>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${formatCurrency(venue.price)}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                        <span class="text-yellow-400">★</span> ${venue.rating}/5
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${
    venue.status === 'active' ? 'bg-green-100 text-green-800' :
    venue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
    'bg-gray-100 text-gray-800'
}">
                            ${venue.status === 'active' ? 'Hoạt động' : venue.status === 'pending' ? 'Chờ duyệt' : 'Ngừng hoạt động'}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <div class="flex gap-2 flex-wrap">
                            ${venue.status === 'pending' ? `
                                <button onclick="approveVenue(${venue.id})" class="text-green-600 hover:text-green-700 font-semibold">Duyệt</button>
                                <button onclick="rejectVenue(${venue.id})" class="text-orange-600 hover:text-orange-700 font-semibold">Từ chối</button>
                            ` : `
                                <button onclick="editVenue(${venue.id})" class="text-blue-600 hover:text-blue-700 font-semibold">Sửa</button>
                            `}
                            <button onclick="openDeleteModal(${venue.id})" class="text-red-600 hover:text-red-700 font-semibold">Xóa</button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

    function openAddVenueModal() {
    currentEditingVenueId = null;
    document.getElementById('modalTitle').textContent = 'Thêm sân bóng mới';
    document.getElementById('venueForm').reset();
    document.getElementById('venueModal').classList.remove('hidden');
}

    function closeVenueModal() {
    document.getElementById('venueModal').classList.add('hidden');
    currentEditingVenueId = null;
}

    function editVenue(id) {
    const venue = venues.find(v => v.id === id);
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

    function saveVenue(event) {
    event.preventDefault();

    const name = document.getElementById('venueName').value;
    const location = document.getElementById('venueLocation').value;
    const price = parseInt(document.getElementById('venuePrice').value);
    const rating = parseFloat(document.getElementById('venueRating').value);
    const description = document.getElementById('venueDescription').value;
    const status = document.getElementById('venueStatus').value;
    const types = [];

    if (document.getElementById('type5v5').checked) types.push('5v5');
    if (document.getElementById('type7v7').checked) types.push('7v7');
    if (document.getElementById('type11v11').checked) types.push('11v11');

    if (types.length === 0) {
    showNotification('Vui lòng chọn ít nhất một loại sân', 'error');
    return;
}

    if (currentEditingVenueId) {
    // Edit existing
    const index = venues.findIndex(v => v.id === currentEditingVenueId);
    venues[index] = { ...venues[index], name, location, price, rating, description, status, types };
    showNotification('Cập nhật sân bóng thành công', 'success');
} else {
    // Add new
    const newId = venues.length > 0 ? Math.max(...venues.map(v => v.id)) + 1 : 1;
    venues.push({ id: newId, name, location, price, rating, description, status, types });
    showNotification('Thêm sân bóng thành công', 'success');
}

    localStorage.setItem('venues', JSON.stringify(venues));
    closeVenueModal();
    renderVenuesTable(venues);
}

    function openDeleteModal(id) {
    venueToDelete = id;
    document.getElementById('deleteModal').classList.remove('hidden');
}

    function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    venueToDelete = null;
}

    function confirmDelete() {
    venues = venues.filter(v => v.id !== venueToDelete);
    localStorage.setItem('venues', JSON.stringify(venues));
    closeDeleteModal();
    showNotification('Xóa sân bóng thành công', 'success');
    renderVenuesTable(venues);
}

    function filterVenues() {
    const name = document.getElementById('filterName').value.toLowerCase();
    const location = document.getElementById('filterLocation').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;

    const filtered = venues.filter(v => {
    const nameMatch = v.name.toLowerCase().includes(name);
    const locationMatch = v.location.toLowerCase().includes(location);
    const statusMatch = !status || v.status === status;
    return nameMatch && locationMatch && statusMatch;
});

    renderVenuesTable(filtered);
}

    function toggleAdminMenu() {
    const menu = document.getElementById('adminMenu');
    menu.classList.toggle('hidden');
}

    document.addEventListener('click', function(event) {
    const menu = document.getElementById('adminMenu');
    if (!event.target.closest('button') && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
}
});


window.loadVenues = loadVenues;
window.renderVenuesTable = renderVenuesTable;
window.openAddVenueModal = openAddVenueModal;
window.closeVenueModal = closeVenueModal;
window.editVenue = editVenue;
window.saveVenue = saveVenue;
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.filterVenues = filterVenues;
window.toggleAdminMenu = toggleAdminMenu;