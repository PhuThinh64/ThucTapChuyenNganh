// Dashboard Page - Thống kê tổng quan
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
        { id: 1, userName: 'Nguyễn Văn A', venueName: 'Sân Trung Tâm', date: '2024-12-25', status: 'confirmed', price: 300000 },
        { id: 2, userName: 'Trần Thị B', venueName: 'Sân Đô Thị', date: '2024-12-26', status: 'pending', price: 350000 },
        { id: 3, userName: 'Lê Văn C', venueName: 'Sân Công Viên', date: '2024-12-27', status: 'confirmed', price: 280000 },
    ];
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings;
}

function getBookingStats() {
    const bookings = loadBookings();
    return {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        pending: bookings.filter(b => b.status === 'pending').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
}

function renderDashboard() {
    const venues = JSON.parse(localStorage.getItem('venues') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const stats = getBookingStats();

    document.getElementById('totalVenues').textContent = venues.length;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalBookings').textContent = stats.total;
    document.getElementById('confirmedBookings').textContent = stats.confirmed;
}

// Gọi khi trang load
document.addEventListener('DOMContentLoaded', renderDashboard);
