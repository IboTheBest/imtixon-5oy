let object = JSON.parse(localStorage.getItem("user"))
document.querySelector(".userNameSingle").textContent = object.user
let itemImg = document.querySelector(".single")
let singlePerson = JSON.parse(localStorage.getItem("single"))
singlePerson.map(item=>{
    itemImg.className = "ml-[29px] bg-white flex gap=-[52px] items-center w-[592px] pt-[28px] pb-[148px] mt-[41px]  rounded-[24px]" 
    itemImg.innerHTML=`
    <img class="w-[209px] h-[216px]" src="${item.img}" alt="" >
    <div class="flex flex-col justify-between gap-4">
        <div>
            <span class="text-[#ACACAC] text-[12px] font-semibold">Name</span>
            <p class="text-[14px] font-normal">${item.name}</p>
        </div>
        <div>
            <span class="text-[#ACACAC] text-[12px] font-semibold">Email</span>
            <p class="text-[14px] font-normal">${item.email}</p>
        </div>
        <div>
            <span class="text-[#ACACAC] text-[12px] font-semibold">Phone</span>
            <p class="text-[14px] font-normal">${item.number}</p>
        </div>
        <div>
            <span class="text-[#ACACAC] text-[12px] font-semibold">Date admission</span>
            <p class="text-[14px] font-normal">${item.date}</p>
        </div>
    </div>
`
})

let exitPage = document.querySelector(".exit")
exitPage.addEventListener("click", function(ev){
    location.pathname = "./main.html"
})

