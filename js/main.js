let unChoosenAvatar = document.querySelector(".choose-avatar")
let profileInput = document.querySelector(".profile-input")
let userName = document.querySelector(".user-name")
let logedUser = JSON.parse(localStorage.getItem("user"))
let elList = document.querySelector(".table-body")


let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

profileInput.addEventListener("change", function(evt){
    unChoosenAvatar.src = URL.createObjectURL(evt.target.files[0]);
})  

userName.textContent = logedUser.user


// Add part start
function handleAddClick() {
    elModalWrapper.classList.remove("hidden");
    setTimeout(() => {
        elModal.classList.remove("scale-0");
    }, 50);

    elModal.innerHTML = `
        <div class="flex flex-col items-center justify-center">
            <form class="add-person-form flex flex-col items-center justify-center gap-[20px]">
                <label class="flex flex-col items-center">
                    <img class="added-img" src="./images/person.svg" alt="edit button" width="30" height="30">
                    <span>Choose your img</span>
                    <input class="newImgInput hidden" type="file" name="userImg">
                </label>
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user name" type="text" name="person">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user email" type="email" name="userEmail">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user number" type="tel" name="userNumber">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user serial number" type="text" name="userID">
                <input required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="" type="date" name="registerDate">
                <button type="submit">Add</button>
            </form>
        </div>
    `;
    let addImg = document.querySelector(".added-img")
    let addImgInput = document.querySelector(".newImgInput")
    addImgInput.addEventListener("change", function(evt){
        addImg.src = URL.createObjectURL(evt.target.files[0]);
    })  
    let elAddForm = document.querySelector(".add-person-form");
    elAddForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        let newAdd = {
            img:addImg.src,
            name: ev.target.person.value,
            email: ev.target.userEmail.value,
            number: ev.target.userNumber.value,
            serial: ev.target.userID.value,
            date: ev.target.registerDate.value
        };
        axios.post("http://localhost:3000/items", newAdd)
        ev.target.reset();
    });
}

elModalWrapper.addEventListener("click", function(ev){
    if(ev.target.id == "wrapper"){
        elModal.classList.add("scale-0")
        setTimeout(()=>{
            elModalWrapper.classList.add("hidden")
        },200)
    }
})
// Add part end

function renderUsers(list){
    axios.get("http://localhost:3000/items")
    .then(res=>{
        res.data.map(item=>{
            const element = document.createElement("tr");
        element.innerHTML = `
          <td class="text-center">
    <img class="w-[65px] h-[55px] rounded-md object-cover" src="${item.img}" alt="${item.name} img" width="50">
</td>
<td class="text-center">${item.name}</td>
<td class="text-center">${item.email}</td>
<td class="text-center">${item.number}</td>
<td class="text-center">${item.serial}</td>
<td class="text-center">
    <button onclick="singleItem('${item.id}')">
        <img src="./images/more.svg" alt="more btn" width="19" height="5">
    </button>
    <button onclick="editItem('${item.id}')">
        <img src="./images/edit.svg" alt="edit" width="19" height="19">
    </button>
    <button onclick="deleteItem('${item.id}')">
        <img src="./images/delete.svg" alt="delete" width="16" height="18">
    </button>
</td>`;
            list.append(element);
        })
    })
}
renderUsers(elList)

// Delete part start
function deleteItem(id){
    axios.delete(`http://localhost:3000/items/${id}`)
}
// Delete part end

// Edit Part start
function editItem(id) {
    axios.get(`http://localhost:3000/items/${id}`)
        .then(item => {
            elModalWrapper.classList.remove("hidden");
            setTimeout(() => {
                elModal.classList.remove("scale-0");
            }, 50);

            elModal.innerHTML = `
                <div class="flex flex-col items-center justify-center">
                    <form class="edit-person-form flex flex-col items-center justify-center gap-[20px]">
                        <label class="flex flex-col items-center">
                            <img class="added-img" id="currentImg" src="${item.data.img}" alt="User Image" width="100" height="100">
                            <span>Choose your img</span>
                            <input class="newImgInput hidden" type="file" name="userImg">
                        </label>
                        <input value="${item.data.name}" required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user name" type="text" name="person">
                        <input value="${item.data.email}" required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user email" type="email" name="userEmail">
                        <input value="${item.data.number}" required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user number" type="tel" name="userNumber">
                        <input value="${item.data.serial}" required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter user serial number" type="text" name="userID">
                        <input value="${item.data.date}" required class="w-[400px] p-4 border-[2px] border-[#E5E5E5] outline-none rounded-lg" placeholder="Enter registration date" type="date" name="registerDate">
                        <button type="submit">Update</button>
                    </form>
                </div>
            `;
            let editForm = document.querySelector(".edit-person-form")
            let addImg = document.querySelector(".added-img")
            let addImgInput = document.querySelector(".newImgInput")
            addImgInput.addEventListener("change", function(evt){
                addImg.src = URL.createObjectURL(evt.target.files[0]);
            })  

            editForm.addEventListener("submit", function(ev) {
                ev.preventDefault();

                let updatedData = {
                    img: addImg.src,
                    name: ev.target.person.value,
                    email: ev.target.userEmail.value,
                    number: ev.target.userNumber.value,
                    serial: ev.target.userID.value,
                    date: ev.target.registerDate.value
                };
                axios.put(`http://localhost:3000/items/${id}`, updatedData)
            });
        })
}
// Edit Part end

function singleItem(id){
    axios.get("http://localhost:3000/items")
    .then(res => {
       res.data.filter(item=>item.id == id)
       localStorage.setItem("single", JSON.stringify(res.data.filter(item=>item.id == id)))
    })
    setTimeout(()=>{
        location.pathname = "./singleperson.html"
    })
    
}