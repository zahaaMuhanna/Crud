let courseName=document.querySelector("#courseName");
let courseCategory =document.querySelector("#courseCategory");
let coursePrice=document.querySelector("#coursePrice");
let courseDescription=document.querySelector("#courseDescription");
let courseCapacity=document.querySelector("#courseCapacity");
let addbtn=document.querySelector("#click");
let inputs=document.querySelector(".inputs")
let courses=[];


addbtn.addEventListener("click",function(e){
    e.preventDefault();
    addCourse();
    clearInputs();
    printData();
})

function addCourse(){
    let course={
        name:courseName.value,
        Category:courseCategory.value,
        Price:coursePrice.value,
        desc:courseDescription.value,
        capacity:courseCapacity.value
    }
    courses.push(course);
}

function clearInputs(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

function printData(){
    let result=``;
    for(let i=0;i<courses.length;i++){
        result+=`
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].Category}</td>
            <td>${courses[i].Price}</td>
            <td>${courses[i].desc}</td>
            <td>${courses[i].capacity}</td>
            <td><button class="btn btn-outline-info">update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("data").innerHTML=result;
}

function deleteCourse(id){
        courses.splice(id,1);
        printData();
}