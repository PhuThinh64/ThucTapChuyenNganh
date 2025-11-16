

function loadRevenueData() {
    const revenue = getRevenueData();
    const bookings = loadOwnerBookings().filter(b => b.status === 'confirmed');

    // Update summary stats
    document.getElementById('totalRevenueDisplay').textContent = formatCurrency(revenue.totalRevenue);
    document.getElementById('confirmedBookingsDisplay').textContent = revenue.bookingCount;

    const currentMonth = new Date().toISOString().substring(0, 7);
    const monthRevenue = revenue.monthlyRevenue[currentMonth] || 0;
    document.getElementById('monthRevenueDisplay').textContent = formatCurrency(monthRevenue);

    // Render monthly chart
    renderMonthlyChart(revenue.monthlyRevenue);

    // Render bookings table
    renderBookingsTable(bookings);
}

function renderMonthlyChart(monthlyRevenue) {
    const container = document.getElementById('monthlyChartContainer');

    const months = [];
    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = date.toISOString().substring(0, 7);
        months.push(month);
    }

    const maxRevenue = Math.max(...months.map(m => monthlyRevenue[m] || 0), 1);

    if (Object.keys(monthlyRevenue).length === 0) {
        container.innerHTML = '<div class="w-full text-center text-gray-600 text-sm">Chưa có dữ liệu doanh thu</div>';
        return;
    }

    container.innerHTML = months.map(month => {
        const revenue = monthlyRevenue[month] || 0;
        const height = (revenue / maxRevenue) * 100;
        const monthLabel = month.substring(5);

        return `
                    <div class="flex flex-col items-center flex-1">
                        <div class="w-full bg-green-100 rounded-t-lg relative" style="height: ${height}%; min-height: 10px;">
                            ${revenue > 0 ? `<div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">${formatCurrency(revenue)}</div>` : ''}
                        </div>
                        <div class="text-xs text-gray-600 mt-2">${monthLabel}</div>
                    </div>
                `;
    }).join('');
}

function renderBookingsTable(bookings) {
    const tbody = document.getElementById('bookingsTableBody');

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr class="border-b border-gray-200"><td colspan="5" class="px-6 py-12 text-center text-gray-600 text-sm">Không có dữ liệu</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.map(booking => `
                <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${booking.userName}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.venueName}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.date}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${booking.duration} phút</td>
                    <td class="px-6 py-4 text-sm font-semibold text-gray-900">${formatCurrency(booking.price)}</td>
                </tr>
            `).join('');
}

function exportReport() {
    const revenue = getRevenueData();
    const bookings = loadOwnerBookings();

    const reportData = {
        generatedAt: new Date().toISOString(),
        totalRevenue: revenue.totalRevenue,
        totalBookings: revenue.bookingCount,
        monthlyRevenue: revenue.monthlyRevenue,
        bookings: bookings.filter(b => b.status === 'confirmed')
    };

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2)));
    element.setAttribute('download', `revenue-report-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('Xuất báo cáo thành công', 'success');
}

loadRevenueData();