// for Login Card
function login(){
let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

    if(user === 'admin' && pass === 'admin123'){
        alert('Login Successful')
        window.location.href = 'issue.html'
    }else{
        alert('Invalid username or password !')
    };
}
