function handleRegister(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Mật khẩu không trùng khớp!');
        return;
    }

    // Validate password length
    if (password.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự!');
        return;
    }

    // Store user data
    const userData = { fullName, email, phone };
    sessionStorage.setItem('currentUser', JSON.stringify(userData));

    alert('Đăng ký thành công! Chào mừng bạn đến với SânBóng');
    window.location.href = '/';
}