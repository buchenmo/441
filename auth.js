// 认证相关功能
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus123();
    
    // 登录表单提交事件
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login123();
        });
    }
    
    // 注册表单提交事件
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            register123();
        });
    }
    
    // 登出按钮事件
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout123();
        });
    }
});

// 检查用户登录状态
function checkLoginStatus123() {
    const currentUser = getCurrentUser123();
    const userGreeting = document.getElementById('user-greeting');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (currentUser && userGreeting && loginBtn && registerBtn && logoutBtn) {
        userGreeting.textContent = `Welcome, ${currentUser}`;
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else if (userGreeting && loginBtn && registerBtn && logoutBtn) {
        userGreeting.textContent = 'Welcome, Guest';
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

// 登录功能
function login123() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // 清除之前的错误信息
    clearErrors123('login');
    
    // 基本验证
    let isValid = true;
    
    if (!username) {
        showError123('login-username-error', 'Username is required');
        isValid = false;
    }
    
    if (!password) {
        showError123('login-password-error', 'Password is required');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // 登录成功
        sessionStorage.setItem('currentUser', username);
        checkLoginStatus123();
        window.location.href = 'cart.html';
    } else {
        showError123('login-password-error', 'Invalid username or password');
    }
}

// 注册功能
function register123() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const phone = document.getElementById('register-phone').value;
    const address = document.getElementById('register-address').value;
    
    // 清除之前的错误信息
    clearErrors123('register');
    
    // 验证表单
    let isValid = true;
    
    if (!username) {
        showError123('register-username-error', 'Username is required');
        isValid = false;
    }
    
    if (!email) {
        showError123('register-email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail123(email)) {
        showError123('register-email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password) {
        showError123('register-password-error', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError123('register-password-error', 'Password must be at least 6 characters long');
        isValid = false;
    } else if (!hasSpecialChar123(password)) {
        showError123('register-password-error', 'Password must contain at least one special character');
        isValid = false;
    }
    
    if (!confirmPassword) {
        showError123('register-confirm-password-error', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError123('register-confirm-password-error', 'Passwords do not match');
        isValid = false;
    }
    
    if (!phone) {
        showError123('register-phone-error', 'Phone number is required');
        isValid = false;
    }
    
    if (!address) {
        showError123('register-address-error', 'Address is required');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // 检查用户名是否已存在
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
        showError123('register-username-error', 'Username already exists');
        return;
    }
    
    // 保存用户数据
    const newUser = {
        username,
        email,
        password,
        phone,
        address
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // 自动登录
    sessionStorage.setItem('currentUser', username);
    checkLoginStatus123();
    window.location.href = 'cart.html';
}

// 登出功能
function logout123() {
    sessionStorage.removeItem('currentUser');
    checkLoginStatus123();
    window.location.href = 'index.html';
}