// 订单管理功能
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('orders.html')) {
        if (!checkAuth123()) return;
        
        setupOrderManagement123();
        loadTodoList123();
    }
});

// 设置订单管理功能
function setupOrderManagement123() {
    // 下载订单历史
    const downloadOrdersBtn = document.getElementById('download-orders-btn');
    if (downloadOrdersBtn) {
        downloadOrdersBtn.addEventListener('click', downloadOrders123);
    }
    
    // 清除数据
    const clearDataBtn = document.getElementById('clear-data-btn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', clearData123);
    }
    
    // 登出按钮
    const logoutManagementBtn = document.getElementById('logout-management-btn');
    if (logoutManagementBtn) {
        logoutManagementBtn.addEventListener('click', logout123);
    }
    
    // 待办事项
    const addTodoBtn = document.getElementById('add-todo-btn');
    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', addTodoItem123);
    }
    
    const todoInput = document.getElementById('todo-input');
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodoItem123();
            }
        });
    }
}

// 下载订单历史
function downloadOrders123() {
    const currentUser = getCurrentUser123();
    const ordersKey = `orders_${currentUser}`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
    
    if (orders.length === 0) {
        alert('No order history found');
        return;
    }
    
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders_${currentUser}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 清除数据
function clearData123() {
    if (confirm('Are you sure you want to clear all your cart and order history? This action cannot be undone.')) {
        const currentUser = getCurrentUser123();
        
        // 清空购物车
        const cartKey = `cart_${currentUser}`;
        localStorage.setItem(cartKey, JSON.stringify([]));
        
        // 清空订单历史
        const ordersKey = `orders_${currentUser}`;
        localStorage.setItem(ordersKey, JSON.stringify([]));
        
        // 清空待办事项
        const todoKey = `todos_${currentUser}`;
        localStorage.setItem(todoKey, JSON.stringify([]));
        
        alert('All data has been cleared successfully');
        
        // 重新加载待办事项列表
        loadTodoList123();
    }
}

// 加载待办事项列表
function loadTodoList123() {
    const currentUser = getCurrentUser123();
    const todoKey = `todos_${currentUser}`;
    const todos = JSON.parse(localStorage.getItem(todoKey) || '[]');
    
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;
    
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button onclick="toggleTodo123(${index})">${todo.completed ? '↶' : '✓'}</button>
                <button onclick="deleteTodo123(${index})">✕</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// 添加待办事项
function addTodoItem123() {
    const todoInput = document.getElementById('todo-input');
    const text = todoInput.value.trim();
    
    if (!text) {
        alert('Please enter a task');
        return;
    }
    
    const currentUser = getCurrentUser123();
    const todoKey = `todos_${currentUser}`;
    const todos = JSON.parse(localStorage.getItem(todoKey) || '[]');
    
    todos.push({
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem(todoKey, JSON.stringify(todos));
    todoInput.value = '';
    loadTodoList123();
}

// 切换待办事项状态
function toggleTodo123(index) {
    const currentUser = getCurrentUser123();
    const todoKey = `todos_${currentUser}`;
    const todos = JSON.parse(localStorage.getItem(todoKey) || '[]');
    
    if (todos[index]) {
        todos[index].completed = !todos[index].completed;
        localStorage.setItem(todoKey, JSON.stringify(todos));
        loadTodoList123();
    }
}

// 删除待办事项
function deleteTodo123(index) {
    const currentUser = getCurrentUser123();
    const todoKey = `todos_${currentUser}`;
    let todos = JSON.parse(localStorage.getItem(todoKey) || '[]');
    
    todos.splice(index, 1);
    localStorage.setItem(todoKey, JSON.stringify(todos));
    loadTodoList123();
}