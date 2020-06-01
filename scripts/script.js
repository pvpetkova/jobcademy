let userType;

function setUserType(ut) {
    userType = ut;
}

function myCourses(){
    if(userType === 0){
        window.location = 'current-courses.html';
    }
    if(userType === 1){
        window.location = 'course-dashboard.html'
    }
}