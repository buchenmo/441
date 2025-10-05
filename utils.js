// 学生ID后三位
const studentIdSuffix = '123';

// 工具函数
function showError123(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors123(formType) {
    const errorElements = document.querySelectorAll(`#${formType}-form .error-message`);
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

function isValidEmail123(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function hasSpecialChar123(password) {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
}

function formatPrice123(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

function getCurrentUser123() {
    return sessionStorage.getItem('currentUser');
}

function isLoggedIn123() {
    return getCurrentUser123() !== null;
}

function checkAuth123() {
    if (!isLoggedIn123()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 动画效果
function animateElement123(element, animation) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = animation;
    }, 10);
}