document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Lưu thay đổi thành công!');
});

function logout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        window.location.href = 'index.html';
    }
}