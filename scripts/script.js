let userType;

function setUserType(ut) {
    userType = ut;
}


function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username === "admin" && password === "admin") {
        setUserType(0);
        window.location = "current-courses.html";
    } else if (username === "pesho" && password === "1234") {
        setUserType(1);
        window.location = "course-dashboard.html";
    } else {
        document.getElementById("invalidCredentials").style.display = "inline";
    }
}

function myCourses(){
    if(userType === 0){
        window.location = 'current-courses.html';
    }
    if(userType === 1){
        window.location = 'course-dashboard.html'
    }
}