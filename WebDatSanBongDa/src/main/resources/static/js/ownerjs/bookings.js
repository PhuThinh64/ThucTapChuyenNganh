let ownerBookings = [];



function loadBookingsData() {
    ownerBookings = loadOwnerBookings();
    window.ownerBookings = ownerBookings;
    renderOwnerBookingsTable(ownerBookings);
}

function renderOwnerBookingsTable(bookings) {
    const tbody = document.getElementById('bookingsTableBody');

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr class="border-b border-gray-200"><td colspan="6" class="px-6 py-12 text-center text-gray-600 text-sm">Không có lịch đặt sân</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.map(booking => `
                <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${booking.userName}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.venueName}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.date} ${booking.time}</td>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${formatCurrency(booking.price)}</td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${
        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
    }">${
        booking.status === 'confirmed' ? 'Xác nhận' :
            booking.status === 'pending' ? 'Chờ xác nhận' :
                'Hủy'
    }</span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button onclick="viewBookingDetails(${booking.id})" class="text-blue-600 hover:text-blue-700 font-medium">Chi tiết</button>
                    </td>
                </tr>
            `).join('');
}

window.renderOwnerBookingsTable = renderOwnerBookingsTable;

loadBookingsData();