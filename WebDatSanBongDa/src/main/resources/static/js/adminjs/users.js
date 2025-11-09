// User Management
let currentViewingUserId = null;

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

function renderUsersTable(users = JSON.parse(localStorage.getItem('users') || '[]')) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            <td>${u.status}</td>
            <td>
                <button onclick="viewUserDetails(${u.id})" class="text-blue-600">Chi tiết</button>
                <button onclick="deleteUser(${u.id})" class="text-red-600">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function viewUserDetails(id) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === id);
    if (!user) return;

    currentViewingUserId = id;
    const modal = document.getElementById('userModal');
    const content = document.getElementById('userDetails');
    if (content) {
        content.innerHTML = `
            <p><b>Tên:</b> ${user.name}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>SĐT:</b> ${user.phone}</p>
            <p><b>Trạng thái:</b> ${user.status}</p>
        `;
    }
    if (modal) modal.classList.remove('hidden');
}

function closeUserModal() {
    document.getElementById('userModal').classList.add('hidden');
    currentViewingUserId = null;
}

function toggleUserStatus() {
    if (currentViewingUserId === null) return;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === currentViewingUserId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        localStorage.setItem('users', JSON.stringify(users));
        renderUsersTable(users);
        showNotification(`Đã ${user.status === 'active' ? 'kích hoạt' : 'vô hiệu'} người dùng`, 'success');
        closeUserModal();
    }
}

function deleteUser(id) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsersTable(users);
    showNotification('Xóa người dùng thành công', 'success');
}

document.addEventListener('DOMContentLoaded', renderUsersTable);
