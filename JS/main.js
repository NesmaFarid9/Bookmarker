var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var addTableInput = document.getElementById("addTable");
var urlIcon = document.getElementById("urlIcon");
var messageBox = document.getElementById("messageBox");

var bookList = [];

// 
if(localStorage.getItem("Books") != null){
    // convert to object 
    bookList = JSON.parse(localStorage.getItem("Books"));
    displayBookMarker();
}
else{
    bookList = [];
}
function addBookMarker(){
    book = {
        name: siteNameInput.value,
        url: siteURLInput.value
    };
    bookList.push(book);
    localStorage.setItem("Books", JSON.stringify(bookList));
    // console.log(bookList);
    clearBookMarker();
    displayBookMarker();
};
function clearBookMarker(){
    siteNameInput.value = null;
    siteURLInput.value = null;
};
function displayBookMarker(){
    books = '';
    for(var i = 0; i < bookList.length; i++){
        books += `          
            <tr>
                <td class="pb-2 pt-2">${i + 1}</td>
                <td class="pb-2 pt-2">${bookList[i].name}</td>
                <td class="pb-2 pt-2"><button class="btn view-btn"><a href="${bookList[i].url}" target="_blank" class="text-decoration-none"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button></td>
                <td class="pb-2 pt-2"><button onclick="deleteBookMarker(${i})" class="btn delete-btn"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>   
        `
    }
    addTableInput.innerHTML = books;
};
function deleteBookMarker(deleteIndex){
    // console.log("delete");
    bookList.splice(deleteIndex, 1);
    localStorage.setItem("Books", JSON.stringify(bookList));
    displayBookMarker();
};
// validation
// function validationName(){
//     // delete any whiteSpaces
//     var nameValue = siteNameInput.value.trim();
//     var nameRegex = /^[a-zA-Z0-9 ]+$/;

//     if(nameValue.length < 3 || !nameRegex.test(nameValue)){
//         siteNameInput.style.boxShadow = "0 0 0 0.25rem rgba(150, 25, 25, 0.25)";
//         siteNameInput.style.borderColor = "#ba081d";
//         nameIcon.innerHTML = '<i class="fa-solid fa-circle-info text-danger"></i>';
//         return false;
//     }
//     else{
//         siteNameInput.style.boxShadow = "0 0 0 0.25rem rgba(25, 135, 84, 0.25)";
//         siteNameInput.style.borderColor = "#198754";
//         nameIcon.innerHTML = '<i class="fa-solid fa-check text-success"></i>';
//         return true;
//     }
// };
function validationUrl(){
    var urlValue = siteURLInput.value.trim();
    let urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/\S*)?$/;

    if(urlRegex.test(urlValue)){
        siteURLInput.style.boxShadow = "0 0 0 0.25rem rgba(25, 135, 84, 0.25)";
        siteURLInput.style.borderColor = "#198754";
        urlIcon.innerHTML = '<i class="fa-solid fa-check text-success"></i>';
        return true;
    }
    else{
        siteURLInput.style.boxShadow = "0 0 0 0.25rem rgba(150, 25, 25, 0.25)";
        siteURLInput.style.borderColor = "#ba081d";
        urlIcon.innerHTML = '<i class="fa-solid fa-circle-info text-danger"></i>';
        return false;
    }
    
};

document.querySelectorAll('.view-btn, .delete-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('clicked');
  });
});

// function checkInputs(){
//     if((siteNameInput.value.trim() != "") && (siteURLInput.value.trim() != "")){
//         addBookMarker();
//         hideMessage();
//     }
//     else if((siteNameInput.value.trim() == "") && (siteURLInput.value.trim() == "")){
//         showMessage();
//     }
//     if(!validationUrl() && !validationName()){
//         showMessage();
//     }
// };
function showMessage(){
    messageBox.classList.remove("d-none");
}
function hideMessage(){
    messageBox.classList.add("d-none");
};
function checkInputs(){
    var isNameValid = validationName();
    var isUrlValid = validationUrl();
    if (isNameValid && isUrlValid) {
        addBookMarker();
        hideMessage();
    } else {
        showMessage();
    }
}
function validationName(){
    var nameValue = siteNameInput.value.trim();
    var nameRegex = /^[a-zA-Z0-9 ]+$/;

    if(nameValue.length < 3 || !nameRegex.test(nameValue)){
        siteNameInput.style.boxShadow = "0 0 0 0.25rem rgba(150, 25, 25, 0.25)";
        siteNameInput.style.borderColor = "#ba081d";
        nameIcon.innerHTML = '<i class="fa-solid fa-circle-info text-danger"></i>';
        return false;
    } else {
        siteNameInput.style.boxShadow = "0 0 0 0.25rem rgba(25, 135, 84, 0.25)";
        siteNameInput.style.borderColor = "#198754";
        nameIcon.innerHTML = '<i class="fa-solid fa-check text-success"></i>';
        return true;
    }
}

