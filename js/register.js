let elRegisterForm = document.querySelector(".register-form")
let elRegisterBtn = document.querySelector(".register-btn")

elRegisterForm.addEventListener("submit", function(ev){
    ev.preventDefault()
    let newData = {
        newUserName: ev.target.newuser.value,
        newUserPassword: ev.target.newpassword.value
    }
    axios.get("http://localhost:3000/users")
    .then(res =>{
        let userExists = res.data.some(user => user.newUserName == newData.newUserName);
           if(userExists){
               elRegisterBtn.textContent = "ERROR this login has already been used"
               elRegisterBtn.classList.add("text-red-500")
               setTimeout(()=>{
                    elRegisterBtn.classList.remove("text-red-500")
                    elRegisterBtn.classList.add("uppercase")
                   elRegisterBtn.textContent = "Sign Up"
               },2000)
            }
            else{
               axios.post("http://localhost:3000/users", newData)
           }
        
    })
    
})
