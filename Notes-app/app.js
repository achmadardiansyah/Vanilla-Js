const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', addNote);

const getNote = JSON.parse(localStorage.getItem('notes'))

if(getNote){
    getNote.forEach(note => addNote(note))
}

function addNote(text){
    const noteBox = document.createElement('div');
    noteBox.classList.add('note-box');

    const d = new Date().toDateString();   

    noteBox.innerHTML = `
        <nav>
            <span class="date-info"></span>
            <div class="buttons">
                <button class="delete-btn" title="delete note"><i class="fa fa-trash"></i></button>
                <button class="save-btn" title="save note"><i class="fa fa-save"></i></button>
            </div>
        </nav>
        <textarea name="note" class="note" id="note" cols="40" rows="15" placeholder="write something..." spellcheck="false">
        </textarea>
    `;

    const deleteBtn = noteBox.querySelector('.delete-btn');
    const saveBtn = noteBox.querySelector('.save-btn');
    const textarea = noteBox.querySelector('.note');
    const dateInfo = noteBox.querySelector('.date-info');
    

    if (text.text === undefined){
        textarea.value = "";
    } else {
        textarea.value = text.text
    }

    if (text.date){
        dateInfo.innerHTML = text.date
    } else {
        dateInfo.innerHTML = d;
    }

    saveBtn.addEventListener('click', function(){
        updateLS();
        showNotif("Save");
    });

    deleteBtn.addEventListener('click', function(){
        noteBox.remove();
        updateLS();
        showNotif("Delete");
    });


    textarea.addEventListener('input', ()=>{
        updateLS();
    })
    

    document.body.appendChild(noteBox);

}

const notification = document.querySelector('.notification');
const button = notification.querySelector('button');
const notifText = notification.querySelector('h1');

function showNotif(notif){
    notifText.innerHTML = `${notif} Success!`;

    notification.classList.add('show');

    button.addEventListener('click', function(){
        notification.classList.remove('show');
    })
}

function updateLS(){
    const noteBox = document.querySelectorAll('.note-box');

    const notes = [];

    noteBox.forEach(note => {
        notes.push({
            text: note.querySelector('textarea').value,
            date: note.firstElementChild.firstElementChild.textContent
        })
    });

    notes.filter(note => note.text === "" || note.text === undefined)
        .map(n => n.remove());

    localStorage.setItem('notes', JSON.stringify(notes))
}