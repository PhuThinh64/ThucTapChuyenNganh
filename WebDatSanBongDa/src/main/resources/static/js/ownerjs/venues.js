
    let ownerVenues = [];



function loadVenuesData() {
    ownerVenues = getOwnerVenues();
    window.ownerVenues = ownerVenues;
    renderOwnerVenuesTable(ownerVenues);
}

function renderOwnerVenuesTable(venues) {
    const tbody = document.getElementById('venuesTableBody');

    if (venues.length === 0) {
    tbody.innerHTML = '<tr class="border-b border-gray-200"><td colspan="6" class="px-6 py-12 text-center text-gray-600 text-sm">Không có sân bóng</td></tr>';
    return;
}

    tbody.innerHTML = venues.map(venue => `
                <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${venue.name}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${venue.location}</td>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${formatCurrency(venue.price)}</td>
                    <td class="px-6 py-4 text-sm">
                        <div class="flex gap-1">
                            ${venue.types.map(t => `<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">${t}</span>`).join('')}
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${
    venue.status === 'active' ? 'bg-green-100 text-green-700' :
    venue.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700'
}">${
    venue.status === 'active' ? 'Đã duyệt' :
    venue.status === 'pending' ? 'Chờ duyệt' :
    'Không hoạt động'
}</span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <div class="flex gap-2">
                            <button onclick="editVenue(${venue.id})" class="text-blue-600 hover:text-blue-700 font-medium">Sửa</button>
                            <button onclick="openDeleteModal(${venue.id})" class="text-red-600 hover:text-red-700 font-medium">Xóa</button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

window.renderOwnerVenuesTable = renderOwnerVenuesTable;

loadVenuesData();
