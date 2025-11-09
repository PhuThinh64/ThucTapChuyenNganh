// /js/adminjs/venues.js
// Lưu ý: File này cần được tải SAU admin.js trong layout.html

// Biến dữ liệu cục bộ cho trang Venues
let venues = [];

// Hàm render bảng (logic hiển thị riêng của trang này)
window.renderVenuesTable = function(data) {
    venues = data;
    const tbody = document.getElementById('venuesTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map(venue => `
        <tr>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${venue.name}</td>
            <td class="px-6 py-4 text-sm text-gray-600">${venue.location}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${window.formatCurrency(venue.price)}</td>
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
                        <button onclick="window.approveVenue(${venue.id})" class="text-green-600 hover:text-green-700 font-semibold">Duyệt</button>
                        <button onclick="window.rejectVenue(${venue.id})" class="text-orange-600 hover:text-orange-700 font-semibold">Từ chối</button>
                    ` : `
                        <button onclick="window.editVenue(${venue.id})" class="text-blue-600 hover:text-blue-700 font-semibold">Sửa</button>
                    `}
                    <button onclick="window.openDeleteModal(${venue.id})" class="text-red-600 hover:text-red-700 font-semibold">Xóa</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadVenues() {
    const stored = localStorage.getItem('venues');
    if (stored) {
        venues = JSON.parse(stored);
    } else {
        // Data mặc định
        venues = [
            { id: 1, name: 'Sân bóng Trung Tâm', location: 'Quận 1, TP.HCM', price: 300000, rating: 5, types: ['5v5', '7v7', '11v11'], status: 'active', description: 'Sân bóng chất lượng cao với trang thiết bị hiện đại' },
            { id: 2, name: 'Sân bóng Khu Đô Thị', location: 'Quận 2, TP.HCM', price: 350000, rating: 5, types: ['5v5', '7v7', '11v11'], status: 'active', description: 'Sân bóng chuẩn quốc tế' },
            { id: 3, name: 'Sân bóng Công Viên', location: 'Quận 7, TP.HCM', price: 280000, rating: 4, types: ['5v5', '7v7'], status: 'pending', description: 'Sân bóng gần công viên thoáng mát' },
            { id: 4, name: 'Sân bóng Thể Thao', location: 'Quận 12, TP.HCM', price: 320000, rating: 4, types: ['5v5', '7v7', '11v11'], status: 'active', description: 'Sân bóng chuyên nghiệp' }
        ];
        localStorage.setItem('venues', JSON.stringify(venues));
    }
    // Gán vào window để hàm filterVenues trong admin.js có thể truy cập
    window.venues = venues;
    renderVenuesTable(venues);
}

function waitForAdminFunctions() {
    // Chờ các hàm từ admin.js (checkAdminAuth, formatCurrency) được tải xong
    if (typeof window.checkAdminAuth === 'undefined' || typeof window.formatCurrency === 'undefined') {
        setTimeout(waitForAdminFunctions, 100);
        return;
    }
    window.checkAdminAuth();
    loadVenues();
}

document.addEventListener('DOMContentLoaded', function() {
    waitForAdminFunctions();

    // Gắn sự kiện filter cho các input và select, gọi hàm filterVenues từ admin.js
    const filterName = document.getElementById('filterName');
    const filterLocation = document.getElementById('filterLocation');
    const filterStatus = document.getElementById('filterStatus');

    if (filterName) filterName.addEventListener('input', window.filterVenues);
    if (filterLocation) filterLocation.addEventListener('input', window.filterVenues);
    if (filterStatus) filterStatus.addEventListener('change', window.filterVenues);
});