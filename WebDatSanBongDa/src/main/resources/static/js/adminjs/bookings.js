// Bookings Management
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
                'bg-blue-500'
    } z-[9999] max-w-sm`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function loadBookings() {
    const stored = localStorage.getItem('bookings');
    if (stored) return JSON.parse(stored);
    const bookings = [
        { id: 1, userName: 'Nguyễn Văn A', venueName: 'Sân Trung Tâm', date: '2024-12-25', time: '19:00', duration: 90, price: 300000, status: 'confirmed' },
        { id: 2, userName: 'Trần Thị B', venueName: 'Sân Đô Thị', date: '2024-12-26', time: '20:00', duration: 90, price: 350000, status: 'pending' },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings;
}

function renderBookingsTable(bookings = loadBookings()) {
    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;
    tbody.innerHTML = bookings.map(b => `
        <tr>
            <td>${b.id}</td>
            <td>${b.userName}</td>
            <td>${b.venueName}</td>
            <td>${b.date} ${b.time}</td>
            <td>${b.status}</td>
            <td>${b.price.toLocaleString()}đ</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderBookingsTable);
