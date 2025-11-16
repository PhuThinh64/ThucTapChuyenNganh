
let users = [];
let currentViewingUserId = null;


document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

function loadUsers() {
    // Load from localStorage or use default data
    const stored = localStorage.getItem('users');
    if (stored) {
        users = JSON.parse(stored);
    } else {
        users = [
            { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0912345678', joinDate: '2024-01-15', status: 'active', bookings: 12 },
            { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0987654321', joinDate: '2024-02-20', status: 'active', bookings: 8 },
            { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', phone: '0909123456', joinDate: '2024-03-10', status: 'active', bookings: 5 },
            { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0933445566', joinDate: '2024-01-25', status: 'inactive', bookings: 3 }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    renderUsersTable(users);
}

function renderUsersTable(data) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = data.map(user => `
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${user.name}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${user.email}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${user.phone}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${user.joinDate}</td>
                    <td class="px-6 py-4 text-sm">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${
        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }">
                            ${user.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button onclick="viewUserDetails(${user.id})" class="text-blue-600 hover:text-blue-700 font-semibold">Chi tiết</button>
                    </td>
                </tr>
            `).join('');
}

function viewUserDetails(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    currentViewingUserId = id;
    const details = document.getElementById('userDetails');
    details.innerHTML = `
                <div class="space-y-3">
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Tên</p>
                        <p class="text-sm font-semibold text-gray-900">${user.name}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Email</p>
                        <p class="text-sm font-semibold text-gray-900">${user.email}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Số điện thoại</p>
                        <p class="text-sm font-semibold text-gray-900">${user.phone}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Ngày tham gia</p>
                        <p class="text-sm font-semibold text-gray-900">${user.joinDate}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500 uppercase">Số lần đặt sân</p>
                        <p class="text-sm font-semibold text-gray-900">${user.bookings}</p>
                    </div>
                </div>
            `;

    const toggleBtn = document.getElementById('toggleStatusBtn');
    if (user.status === 'active') {
        toggleBtn.textContent = 'Vô hiệu hóa';
        toggleBtn.className = 'flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold';
    } else {
        toggleBtn.textContent = 'Kích hoạt';
        toggleBtn.className = 'flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold';
    }

    document.getElementById('userModal').classList.remove('hidden');
}

function closeUserModal() {
    document.getElementById('userModal').classList.add('hidden');
    currentViewingUserId = null;
}

function toggleUserStatus() {
    const user = users.find(u => u.id === currentViewingUserId);
    if (!user) return;

    user.status = user.status === 'active' ? 'inactive' : 'active';
    localStorage.setItem('users', JSON.stringify(users));
    renderUsersTable(users);
    showNotification(`${user.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} người dùng thành công`, 'success');
    closeUserModal();
}

function filterUsers() {
    const name = document.getElementById('filterName').value.toLowerCase();
    const email = document.getElementById('filterEmail').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;

    const filtered = users.filter(u => {
        const nameMatch = u.name.toLowerCase().includes(name);
        const emailMatch = u.email.toLowerCase().includes(email);
        const statusMatch = !status || u.status === status;
        return nameMatch && emailMatch && statusMatch;
    });

    renderUsersTable(filtered);
}


    