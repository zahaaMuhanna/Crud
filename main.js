var courseName=document.querySelector("#courseName");
var courseCategory =document.querySelector("#courseCategory");
var coursePrice=document.querySelector("#coursePrice");
var courseDescription=document.querySelector("#courseDescription");
var courseCapacity=document.querySelector("#courseCapacity");
var addbtn=document.querySelector("#click");
var inputs=document.querySelector(".inputs");
var search=document.querySelector("#search");
var nameError=document.querySelector(".nameError");
var isNameTrue=false;
var courses=[];


courses= JSON.parse(localStorage.getItem("courses"));
printData();

addbtn.addEventListener("click",function(e){
    e.preventDefault();
    addCourse();
    printData();
    clearInputs();
})

function addCourse(){
    var course={
        name:courseName.value,
        Category:courseCategory.value,
        Price:coursePrice.value,
        desc:courseDescription.value,
        capacity:courseCapacity.value
    }
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses))
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'course add succsefully',
        showConfirmButton: false,
        timer: 1500
      })
}

function clearInputs(){
    for(let i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

function printData(){
    var result=``;
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
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id,1);
            localStorage.setItem("courses",JSON.stringify(courses))
             printData();
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
        
}

search.addEventListener("keyup",function(e){
    
    var result=``;
    for(let i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(e.target.value.toLowerCase()))
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

})

courseName.addEventListener("keyup",function(){
    
    var pattern= /^[A-Z][a-z]{2,10}$/ ;

    if(pattern.test(courseName.value)){
        if(courseName.classList.contains('is-invalid')){
            courseName.classList.remove('is-invalid');
            courseName.classList.add('is-valid');
        }
        courseName.classList.add('is-valid');
        nameError.style.cssText='display:none'
        isNameTrue=true;
    }
    else{
        if(courseName.classList.contains('is-valid')){
            courseName.classList.remove('is-valid');
            courseName.classList.add('is-invalid'); 
        }
        courseName.classList.add('is-invalid'); 
        nameError.style.cssText='display:block'
        isNameTrue=false;
    }
    if(isNameTrue){
        addbtn.removeAttribute("disabled");
    }
    else{
        addbtn.setAttribute("disapled","disapled");
    }
    
})
