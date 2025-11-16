
let bookings = [];

document.addEventListener('DOMContentLoaded', function() {
    loadAllBookings();
});

function loadAllBookings() {
    const stored = localStorage.getItem('bookings');
    if (stored) {
        bookings = JSON.parse(stored);
    } else {
        bookings = [
            {
                id: 1,
                userName: 'Nguyễn Văn A',
                venueName: 'Sân bóng Trung Tâm',
                date: '2024-12-25',
                time: '19:00',
                duration: 90,
                price: 300000,
                status: 'confirmed',
                createdAt: '2024-12-20'
            },
            {
                id: 2,
                userName: 'Trần Thị B',
                venueName: 'Sân bóng Khu Đô Thị',
                date: '2024-12-26',
                time: '20:00',
                duration: 90,
                price: 350000,
                status: 'pending',
                createdAt: '2024-12-21'
            },
            {
                id: 3,
                userName: 'Lê Văn C',
                venueName: 'Sân bóng Công Viên',
                date: '2024-12-27',
                time: '18:00',
                duration: 90,
                price: 280000,
                status: 'confirmed',
                createdAt: '2024-12-22'
            }
        ];
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }
    window.bookings=bookings;
    renderBookingsTable(bookings);
}

function renderBookingsTable(data) {
    const tbody = document.getElementById('bookingsTableBody');
    tbody.innerHTML = data.map(booking => `
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${booking.userName}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.venueName}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.date} ${booking.time}</td>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${formatCurrency(booking.price)}</td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${
        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
    }">
                            ${booking.status === 'confirmed' ? 'Xác nhận' : booking.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy'}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button onclick="viewBookingDetails(${booking.id})" class="text-blue-600 hover:text-blue-700 font-semibold">Chi tiết</button>
                    </td>
                </tr>
            `).join('');
}

function viewBookingDetails(id) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    window.currentViewingBookingId = id;
    const details = document.getElementById('bookingDetails');
    details.innerHTML = `
                <div class="space-y-3">
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Người đặt</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.userName}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Sân bóng</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.venueName}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Ngày</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.date}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Giờ</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.time}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Thời lượng</p>
                        <p class="text-sm font-semibold text-gray-900">${booking.duration} phút</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Giá</p>
                        <p class="text-sm font-semibold text-gray-900">${formatCurrency(booking.price)}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Trạng thái</p>
                        <p class="text-sm font-semibold text-gray-900">${
        booking.status === 'confirmed' ? 'Xác nhận' :
            booking.status === 'pending' ? 'Chờ xác nhận' :
                'Đã hủy'
    }</p>
                    </div>
                </div>
            `;

    const approveBtn = document.getElementById('approveBtn');
    if (approveBtn) {
        if (booking.status === 'pending') {
            approveBtn.textContent = 'Xác nhận';
            approveBtn.className = 'flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold';
        } else {
            approveBtn.textContent = 'Hủy đặt sân';
            approveBtn.className = 'flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold';
        }
    }

    document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    currentViewingBookingId = null;
}
function approveBooking() {
    if (window.currentViewingBookingId === null) return;

    const booking = window.bookings.find(b => b.id === window.currentViewingBookingId);
    if (!booking) return;

    if (booking.status === 'pending') {
        booking.status = 'confirmed';
        window.showNotification('Xác nhận đặt sân thành công', 'success');
    } else if (booking.status === 'confirmed') {
        booking.status = 'cancelled';
        window.showNotification('Hủy đặt sân thành công', 'success');
    }

    localStorage.setItem('bookings', JSON.stringify(window.bookings));
    renderBookingsTable(bookings);
    closeBookingModal();
}



window.loadAllBookings = loadAllBookings;
window.renderBookingsTable = renderBookingsTable;
window.viewBookingDetails = viewBookingDetails;
window.closeBookingModal = closeBookingModal;
window.approveBooking = approveBooking;
window.filterBookings = filterBookings;
