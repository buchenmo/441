// 主页功能
document.addEventListener('DOMContentLoaded', function() {
    loadCourses123();
    loadKits123();
    setupNavigation123();
});

// 设置导航
function setupNavigation123() {
    // 平滑滚动到页面内部分区
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 加载课程数据
function loadCourses123() {
    // 模拟课程数据 - 实际应用中应从JSON文件加载
    const courses = [
        {
            id: 1,
            title: "Web Development Fundamentals",
            description: "Learn the basics of HTML, CSS, and JavaScript to build responsive websites.",
            duration: "6 weeks",
            price: "$499",
            image: "Web Development Fundamentals.jpg"
        },
        {
            id: 2,
            title: "Python Programming",
            description: "Master Python programming from basics to advanced concepts and applications.",
            duration: "8 weeks",
            price: "$599",
            image: "Python Programming.jpg"
        },
        {
            id: 3,
            title: "Data Science Essentials",
            description: "Introduction to data analysis, visualization, and machine learning techniques.",
            duration: "10 weeks",
            price: "$799",
            image: "Data Science Essentials.jpg"
        },
        {
            id: 4,
            title: "Cybersecurity Fundamentals",
            description: "Learn essential cybersecurity concepts and practices to protect digital assets.",
            duration: "8 weeks",
            price: "$699",
            image: "Cybersecurity Fundamentals.jpg"
        },
        {
            id: 5,
            title: "Cloud Computing with AWS",
            description: "Comprehensive training on Amazon Web Services and cloud infrastructure.",
            duration: "12 weeks",
            price: "$899",
            image: "Cloud Computing with AWS.jpg"
        }
    ];
    
    // 渲染课程到首页
    const featuredCoursesContainer = document.getElementById('featured-courses');
    if (featuredCoursesContainer) {
        featuredCoursesContainer.innerHTML = '';
        
        courses.slice(0, 3).forEach(course => {
            featuredCoursesContainer.innerHTML += `
                <div class="course-card">
                    <div class="card-img" style="background-image: url('${course.image}')"></div>
                    <div class="card-content">
                        <h3 class="card-title">${course.title}</h3>
                        <p class="card-description">${course.description}</p>
                        <p><strong>Duration:</strong> ${course.duration}</p>
                        <div class="card-price">${course.price}</div>
                    </div>
                </div>
            `;
        });
    }
    
    // 渲染所有课程到课程页面
    const allCoursesContainer = document.getElementById('all-courses');
    if (allCoursesContainer) {
        allCoursesContainer.innerHTML = '';
        
        courses.forEach(course => {
            allCoursesContainer.innerHTML += `
                <div class="course-card">
                    <div class="card-img" style="background-image: url('${course.image}')"></div>
                    <div class="card-content">
                        <h3 class="card-title">${course.title}</h3>
                        <p class="card-description">${course.description}</p>
                        <p><strong>Duration:</strong> ${course.duration}</p>
                        <div class="card-price">${course.price}</div>
                    </div>
                </div>
            `;
        });
    }
}

// 加载资源包数据
function loadKits123() {
    // 模拟资源包数据 - 实际应用中应从JSON文件加载
    const kits = [
        {
            id: 1,
            title: "Web Development Kit",
            description: "Complete resource kit for teaching web development fundamentals.",
            price: "$199",
            unitCode: "ICTWEB431",
            image: "Web Development Kit.jpg"
        },
        {
            id: 2,
            title: "Python Programming Kit",
            description: "Comprehensive materials for Python programming courses.",
            price: "$249",
            unitCode: "ICTPRG430",
            image: "Python Programming Kit.jpg"
        },
        {
            id: 3,
            title: "Data Science Resource Kit",
            description: "Resources for data analysis, visualization and machine learning.",
            price: "$299",
            unitCode: "ICTDSA430",
            image: "Data Science Resource Kit.jpg"
        },
        {
            id: 4,
            title: "Cybersecurity Training Kit",
            description: "Complete cybersecurity training materials and resources.",
            price: "$349",
            unitCode: "ICTCSY430",
            image: "Cybersecurity Training Kit.jpg"
        },
        {
            id: 5,
            title: "Cloud Computing Resource Kit",
            description: "AWS and cloud computing training resources and materials.",
            price: "$399",
            unitCode: "ICTCLD430",
            image: "Cloud Computing Resource Kit.jpg"
        },
        {
            id: 6,
            title: "Mobile App Development Kit",
            description: "Resources for teaching mobile app development with React Native.",
            price: "$279",
            unitCode: "ICTMOB430",
            image: "Mobile App Development Kit.jpg"
        },
        {
            id: 7,
            title: "Database Management Kit",
            description: "SQL and database management training materials and exercises.",
            price: "$229",
            unitCode: "ICTDBM430",
            image: "Database Management Kit.jpg"
        },
        {
            id: 8,
            title: "Network Fundamentals Kit",
            description: "Networking concepts and configuration training resources.",
            price: "$269",
            unitCode: "ICTNET430",
            image: "Network Fundamentals Kit.jpg"
        },
        {
            id: 9,
            title: "UI/UX Design Resource Kit",
            description: "User interface and experience design principles and exercises.",
            price: "$219",
            unitCode: "ICTUIX430",
            image: "UIUX Design Resource Kit.jpg"
        },
        {
            id: 10,
            title: "IT Project Management Kit",
            description: "Project management methodologies and templates for IT projects.",
            price: "$329",
            unitCode: "ICTPRM430",
            image: "IT Project Management Kit.jpg"
        }
    ];
    
    // 渲染热门资源包到首页
    const featuredKitsContainer = document.getElementById('featured-kits');
    if (featuredKitsContainer) {
        featuredKitsContainer.innerHTML = '';
        
        kits.slice(0, 4).forEach(kit => {
            featuredKitsContainer.innerHTML += `
                <div class="kit-card">
                    <div class="card-img" style="background-image: url('${kit.image}')"></div>
                    <div class="card-content">
                        <h3 class="card-title">${kit.title}</h3>
                        <p class="card-description">${kit.description}</p>
                        <p><strong>Unit Code:</strong> ${kit.unitCode}</p>
                        <div class="card-price">${kit.price}</div>
                        <button class="btn" onclick="addToCart123(${kit.id})">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }
    
    // 渲染所有资源包到资源包页面
    const allKitsContainer = document.getElementById('all-kits');
    if (allKitsContainer) {
        allKitsContainer.innerHTML = '';
        
        kits.forEach(kit => {
            allKitsContainer.innerHTML += `
                <div class="kit-card">
                    <div class="card-img" style="background-image: url('${kit.image}')"></div>
                    <div class="card-content">
                        <h3 class="card-title">${kit.title}</h3>
                        <p class="card-description">${kit.description}</p>
                        <p><strong>Unit Code:</strong> ${kit.unitCode}</p>
                        <div class="card-price">${kit.price}</div>
                        <button class="btn" onclick="addToCart123(${kit.id})">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }
}

// 添加到购物车功能
function addToCart123(kitId) {
    if (!isLoggedIn123()) {
        alert('Please login to add items to cart');
        window.location.href = 'login.html';
        return;
    }
    
    const kits = [
        { id: 1, title: "Web Development Kit", price: 199, image: "Web Development Kit.jpg" },
        { id: 2, title: "Python Programming Kit", price: 249, image: "Python Programming Kit.jpg" },
        { id: 3, title: "Data Science Resource Kit", price: 299, image: "Data Science Resource Kit.jpg" },
        { id: 4, title: "Cybersecurity Training Kit", price: 349, image: "Cybersecurity Training Kit.jpg" },
        { id: 5, title: "Cloud Computing Resource Kit", price: 399, image: "Cloud Computing Resource Kit.jpg" },
        { id: 6, title: "Mobile App Development Kit", price: 279, image: "Mobile App Development Kit.jpg" },
        { id: 7, title: "Database Management Kit", price: 229, image: "Database Management Kit.jpg" },
        { id: 8, title: "Network Fundamentals Kit", price: 269, image: "Network Fundamentals Kit.jpg" },
        { id: 9, title: "UI/UX Design Resource Kit", price: 219, image: "UIUX Design Resource Kit.jpg" },
        { id: 10, title: "IT Project Management Kit", price: 329, image: "IT Project Management Kit.jpg" }
    ];
    
    const kit = kits.find(k => k.id === kitId);
    if (!kit) return;
    
    const currentUser = getCurrentUser123();
    const cartKey = `cart_${currentUser}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    // 检查商品是否已在购物车中
    const existingItem = cart.find(item => item.id === kitId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: kit.id,
            title: kit.title,
            price: kit.price,
            image: kit.image,
            quantity: 1
        });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    // 显示添加成功动画
    alert('Item added to cart successfully!');
}