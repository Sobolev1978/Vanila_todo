const button = document.querySelector('#form_btn');
const infoList = document.querySelector('#info_list');
const formChoice = document.querySelector('#form_choice');
const item = formChoice.querySelectorAll('li');
const formInput = document.querySelector('#form_input');
const colorPicker = ['#0000ff', '#ffa400', '#008000', '#ff0000', '#00d669', '#530cff'];
const TODO_ITEM = 'todoItem';


function saveAll(key, data) {
    const todoArr = getAll(key) || [];
    todoArr.push(data);
    localStorage.setItem(key, JSON.stringify(todoArr));
}

function getAll(key) {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}

function get(id, key) {
    let obj = getAll(id);
}

function edit(id, key, newValue) {
    let obj = getAll(id);

    obj[key] = newValue;
    saveAll(obj);
}

randomColor = (arrColor) => {
    const mathRandom = Math.floor(Math.random() * colorPicker.length);
    let color;
    arrColor.map(function (elem, index) {
        if (index === mathRandom) {
            color = elem;
        }
    });
    return color;
};

// for (let i = 0; i < item.length; i++) {
//     item[i].classList.add('choice_item');
//     if (i === item.length - 1) {
//         item[i].classList.add('active');
//     }
// }


let selectedLi;
const formChoiceHandler = (e) => {
    let target = e.target;

    if (selectedLi) {
        selectedLi.classList.remove('active');
    }
    selectedLi = target;
    selectedLi.classList.add('active');
}

formChoice.onclick = (e) => formChoiceHandler(e)

button.addEventListener('click', (e) => {
    e.preventDefault();
    const todoItem = {
        color: selectedLi ? selectedLi.style.backgroundColor : randomColor(colorPicker),
        checked: false,
        text: formInput.value,
        id: String(Date.now())
    }
    saveAll(TODO_ITEM, todoItem);
    formInput.placeholder = '';
    createTodo(todoItem)

    if (selectedLi) {
        selectedLi.classList.remove('active');
        selectedLi = null;
    }

});



createTodo = function (todoItem) {
    const infoItem = document.createElement('li');
    infoItem.classList.add('info_item');
    infoItem.style.backgroundColor = todoItem.color;
    infoList.append(infoItem);


    let infoCheckbox = document.createElement('input');
    infoCheckbox.type = 'checkbox';
    infoItem.append(infoCheckbox);
    infoCheckbox.classList.add('info_check');
    infoCheckbox.id = todoItem.id

    infoCheckbox.onchange = function (e) {
        infoItem.classList.toggle('active');
        const targetId = e.target.id;
        const store = getAll(TODO_ITEM);
        const task = store.find(item => item.id === targetId);
    };

    const infoContent = document.createElement('div');
    infoContent.classList.add('info_content');
    infoItem.append(infoContent);
    infoContent.textContent = todoItem.text;
}

window.addEventListener('storage', (e) => {
    createTodo();
})