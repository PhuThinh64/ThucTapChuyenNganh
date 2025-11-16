function loadDashboardData() {
    const venues = getOwnerVenues();
    const bookings = loadOwnerBookings();
    const revenue = getRevenueData();

    // Update stats
    document.getElementById('totalVenues').textContent = venues.length;
    document.getElementById('approvedVenues').textContent = venues.filter(v => v.status === 'active').length;
    document.getElementById('pendingVenues').textContent = venues.filter(v => v.status === 'pending').length;
    document.getElementById('totalBookings').textContent = bookings.length;

    // Update revenue
    document.getElementById('totalRevenue').textContent = formatCurrencyDisplay(revenue.totalRevenue);

    const currentMonth = new Date().toISOString().substring(0, 7);
    const monthRevenue = revenue.monthlyRevenue[currentMonth] || 0;
    document.getElementById('monthRevenue').textContent = formatCurrencyDisplay(monthRevenue);

    // Recent bookings
    const recentBookingsDiv = document.getElementById('recentBookings');
    if (bookings.length > 0) {
        const recent = bookings.slice(-5).reverse();
        recentBookingsDiv.innerHTML = recent.map(b => `
                    <div class="p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="font-medium text-gray-900">${b.userName}</p>
                                <p class="text-sm text-gray-600">${b.venueName}</p>
                                <p class="text-xs text-gray-500 mt-1">${b.date} ${b.time}</p>
                            </div>
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${
            b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
        }">${
            b.status === 'confirmed' ? 'Xác nhận' :
                b.status === 'pending' ? 'Chờ xác nhận' :
                    'Hủy'
        }</span>
                        </div>
                    </div>
                `).join('');
    }
}

loadDashboardData();