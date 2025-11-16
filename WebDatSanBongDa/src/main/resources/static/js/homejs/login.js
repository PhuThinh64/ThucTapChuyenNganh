// Giả định: admin dashboard nằm ở /admin/dashboard
const ADMIN_DASHBOARD_URL = '/admin/dashboard';
// Giả định: owner dashboard nằm ở /owner/dashboard
const OWNER_DASHBOARD_URL = '/owner/dashboard';

function handleLogin(event) {
    // Ngăn chặn form submit truyền thống
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageBox = document.getElementById('loginMessage');

    // Xóa thông báo cũ
    if (messageBox) {
        messageBox.remove();
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let redirectUrl = null;
    let role = null;

    // --- LOGIC XÁC THỰC GIẢ LẬP ---
    if (email === 'admin@123' && password === 'admin123') {
        redirectUrl = ADMIN_DASHBOARD_URL;
        role = 'admin';
    } else if (email === 'owner@123' && password === 'owner123') {
        redirectUrl = OWNER_DASHBOARD_URL;
        role = 'owner';
    }
    // Nếu bạn có thêm role cho người dùng thông thường:
    // else if (email === 'user@123' && password === 'user123') {
    //     redirectUrl = '/home/index'; // Ví dụ: Trang chủ cho người dùng
    //     role = 'user';
    // }

    if (redirectUrl) {
        // Lưu thông tin (giả lập) vào localStorage nếu cần
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);

        // Chuyển hướng thành công
        window.location.href = redirectUrl;

    } else {
        // Hiển thị thông báo lỗi
        displayLoginError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
        passwordInput.value = ''; // Xóa mật khẩu sau khi nhập sai
        passwordInput.focus();
    }
}

/**
 * Hiển thị thông báo lỗi ngay trên form đăng nhập
 * @param {string} message
 */
function displayLoginError(message) {
    const loginForm = document.getElementById('loginForm');

    // Tạo phần tử thông báo
    const messageDiv = document.createElement('div');
    messageDiv.id = 'loginMessage';
    messageDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4';
    messageDiv.setAttribute('role', 'alert');
    messageDiv.innerHTML = `<span class="block sm:inline">${message}</span>`;

    // Chèn vào trước form
    loginForm.parentElement.insertBefore(messageDiv, loginForm);
}

// Gắn hàm vào window để HTML có thể gọi
window.handleLogin = handleLogin;