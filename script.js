const button = document.querySelector('#form_btn');
const infoList = document.querySelector('#info_list');
const formChoice = document.querySelector('#form_choice');
const item = formChoice.querySelectorAll('li');
const formInput = document.querySelector('#form_input');
const colorPicker = ['#0000ff', '#ffa400', '#008000', '#ff0000', '#00d669', '#530cff'];
const TODO_ITEM = 'todoItem';
const todoArr = getAll(TODO_ITEM) || [];

function saveAll(key, data) {
    todoArr.push(data);
    localStorage.setItem(key, JSON.stringify(todoArr));
}

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getAll(key) {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}

randomColor = (arrColor) => {
    const mathRandom = Math.floor(Math.random() * colorPicker.length);
    return arrColor[mathRandom];
}

let selectedLi;
let defaultLi;
const formChoiceHandler = (e) => {
    defaultLi = formChoice.querySelector('.active');
    defaultLi.classList.remove('active')
    const target = e.target;

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
    createTodo(todoItem)

    if (selectedLi) {
        selectedLi.classList.remove('active');
        defaultLi.classList.add('active');
        selectedLi = null;
    }

    formInput.value = '';
})

createTodo = function (todoItem) {
    const infoItem = document.createElement('li');
    infoItem.classList.add('info_item');
    if (todoItem.checked) {
        infoItem.classList.add('active');
    }
    infoItem.style.backgroundColor = todoItem.color;
    infoList.append(infoItem);

    const infoCheckbox = document.createElement('input');
    infoCheckbox.type = 'checkbox';
    infoItem.append(infoCheckbox);
    infoCheckbox.classList.add('info_check');
    infoCheckbox.id = todoItem.id

    if (todoItem.checked) {
        infoCheckbox.checked = true
    }

    infoCheckbox.onchange = function (e) {
        infoItem.classList.toggle('active');
        const targetId = e.target.id;
        const store = todoArr.map(item => {
            if (item.id === targetId) {
                item.checked = !item.checked
            }
            return item
        })
        save(TODO_ITEM, store);
    }

    const infoContent = document.createElement('div');
    infoContent.classList.add('info_content');
    infoItem.append(infoContent);
    infoContent.textContent = todoItem.text;
}

    todoArr.forEach((currentValue) => {
        createTodo(currentValue)
    })
