showNotes();

// Whenever user tries to add a note we will store it in the localStorage
let addBtn = document.getElementById("addbtn");
addBtn.addEventListener('click', (e) => {
    let addTxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    //If their is no notes make an empty array
    if (notes == null) {
        notesObj = [];
    }
    else { //If notes are present then parse the string to form an object/array
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title: addtitle.value,
        text: addTxt.value
    }
    if(validate(myobj)){
        //Pushing the element in the array
        notesObj.push(myobj);
        //Stringifying the object to store in local storage
        localStorage.setItem("notes", JSON.stringify(notesObj));
        //Making the text field blank after adding the array
        addTxt.value = "";
        addtitle.value = "";
        show('success', "Notes added successfully");
    }else{
        show('danger', "Cannot add empty note");
    }
    showNotes();
});

function show(type, displaymsg) {
    let message = document.getElementById("message");
    let boldtext;
    if (type == 'success') {
        boldtext = 'Success!!'
    }
    else {
        boldtext = 'Error!!'
    }
    message.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldtext}</strong> ${displaymsg}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        `;
    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);
}


function validate(myobj) {
    if (myobj.text.length == 0) {
        return false;
    }
    else {
        return true;
    }
}

//Function to display the added notes

function showNotes() {
    //Parsing the notes as we did while adding
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //Adding the notes field's html for showing the notes
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button onclick="deleteNote(this.id)" class="btn btn-primary" id = "${index}">Delete Note</button>
                </div>
            </div>
            `;
    });
    let notesElem = document.getElementById("notes");
    //If their are notes then show them otherwise display the message
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `No notes added`
    }
}

// Function to delete the note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Function for search
let search = document.getElementById("searchtxt");
search.addEventListener('input',()=>{
    let inputval = search.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach((element)=>{
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if(cardtxt.includes(inputval.toLowerCase())||cardtxt.includes(inputval.toUpperCase())||cardtxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});
