const addbox = document.querySelector(".add-box"),
popupbox = document.querySelector(".popup-box"),
popupboxTitle = popupbox.querySelector("header p"),
closeIcon = document.querySelector(".content header i"),
titleTag = popupbox.querySelector("input"),
descTag = popupbox.querySelector("textarea"),
addBtn = popupbox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let updated = false, updateId;


addbox.addEventListener("click",()=>{
    titleTag.focus();
    popupbox.classList.add("show");
});
closeIcon.addEventListener("click",()=>{
    updated = false;
    titleTag.value="";
    descTag.value="";
    popupboxTitle.innerText = 'Add a new note';
    addBtn.innerText = 'Add note';
    popupbox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach((note) => {note.remove();});
    notes.forEach( (note, index) => {
       let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.desc}</span>
                        </div>
                        <div class="bottom_content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showmenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${note.desc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                     </li>`;
        addbox.insertAdjacentHTML("afterend", liTag);
        });
};
showNotes();

function deleteNote(noteId){
    notes.splice(noteId,1);//removing selected note from array
    localStorage.setItem("notes", JSON.stringify(notes));//saving updated notes to localstorag
    showNotes();
}
function updateNote(noteId, title, desc){
    updated = true;
    updateId = noteId;
    addbox.click();
    titleTag.value=title;
    descTag.value=desc;
    popupboxTitle.innerText = 'Update a note';
    addBtn.innerText = 'Update note';
    console.log(noteId, title, desc);
}
function showmenu(elm){
        elm.parentElement.classList.add("show");
        document.addEventListener("click", e => {
            if(e.target.tagName != "I" || e.target != elm){
                elm.parentElement.classList.remove("show");
            }
        });
}
addBtn.addEventListener("click",()=>{
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    if(noteTitle || noteDesc )
    {
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();
        let noteInfo = {
            title : noteTitle, desc : noteDesc,
            date : `${month} ${day}, ${year}`
        }
        if(!updated){
            notes.push(noteInfo); 
        }
        else{
            notes[updateId] = noteInfo;
            updated = false;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
     
    }
    
});