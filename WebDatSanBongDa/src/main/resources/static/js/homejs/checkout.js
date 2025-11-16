// Load booking data
document.addEventListener('DOMContentLoaded', function() {
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');
    if (bookingData.fullName) {
        document.getElementById('bookingName').textContent = bookingData.fullName;
    }
});

function applyPromo() {
    const promoCode = document.getElementById('promoCode').value;
    if (promoCode === 'SAVE10') {
        document.getElementById('discountRow').classList.remove('hidden');
        alert('Áp dụng thành công! Giảm 10%');
    } else {
        alert('Mã khuyến mại không hợp lệ');
    }
}

function completePayment() {
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Vui lòng đồng ý với điều khoản sử dụng');
        return;
    }

    alert('Thanh toán thành công! Mã đặt sân của bạn: #BK' + Math.random().toString(36).substr(2, 9).toUpperCase());
    // In a real app, this would process the payment and redirect
    setTimeout(() => {
        window.location.href = 'account.html';
    }, 1500);
}