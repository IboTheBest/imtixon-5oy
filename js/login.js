let elLoginForm = document.querySelector(".login-form")
let elLoginBtn = document.querySelector(".login-btn")

elLoginForm.addEventListener("submit",function(e){
    e.preventDefault()
    let data = {
        user: e.target.user.value,
        password: e.target.password.value
    }
    localStorage.setItem("user", JSON.stringify(data))
    
    axios.get("http://localhost:3000/users")
    .then(res=>{

            let user = res.data.some(item => item.newUserName === data.user && item.newUserPassword === data.password);
            if(user){
                location.pathname = "./main.html"
            }
            else{
                elLoginBtn.textContent = 'Login is not correct'
                elLoginBtn.classList.add("text-red-600")
                setTimeout(()=>{
                    elLoginBtn.classList.remove("text-red-600")
                    elLoginBtn.textContent = "SIGN IN"
                    
                },1500)
            }
        })
})
