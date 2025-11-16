let currentStep = 1;

function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    alert('Mã xác nhận đã được gửi đến ' + email);
    showStep(2);
}

function handleVerifyCode(e) {
    e.preventDefault();
    const code = document.getElementById('verificationCode').value;
    if (code === '123456') {
        alert('Mã xác nhận hợp lệ!');
        showStep(3);
    } else {
        alert('Mã xác nhận không chính xác!');
    }
}

function handleResetPassword(e) {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Mật khẩu không trùng khớp!');
        return;
    }

    if (newPassword.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự!');
        return;
    }

    alert('Mật khẩu đã được đặt lại thành công!');
    showStep(4);
}

function showStep(step) {
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.add('hidden');

    document.getElementById('step' + step).classList.remove('hidden');
    currentStep = step;
}

function backToStep1() {
    showStep(1);
}

function resendCode() {
    alert('Mã xác nhận mới đã được gửi!');
}