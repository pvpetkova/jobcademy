function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username === "admin" && password === "admin") {
        sessionStorage.setItem('userType', 'admin');
        window.location = "current-courses.html";
    } else if (username === "pesho" && password === "1234") {
        sessionStorage.setItem('userType', 'user');
        window.location = "course-dashboard.html";
    } else {
        document.getElementById("invalidCredentials").style.display = "inline";
    }
}

function myCourses() {
    let userType = sessionStorage.getItem('userType');
    if (userType === 'admin') {
        window.location = 'current-courses.html';
    }
    if (userType === 'user') {
        window.location = 'course-dashboard.html'
    }
}