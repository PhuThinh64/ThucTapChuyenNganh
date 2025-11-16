function submitContact(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    alert('Cảm ơn ' + name + '! Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất!');
    document.getElementById('contactForm').reset();
}