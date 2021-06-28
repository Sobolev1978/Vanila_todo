const button = document.querySelector('#form_btn');
const infoList = document.querySelector('#info_list');
const formChoice = document.querySelector('#form_choice');
const formChildes  = formChoice.getElementsByTagName('li');
const formInput = document.querySelector('#form_input');
const colorPicker = ['blue', 'orange', 'green', 'red', 'light_green', 'violet'];
const TODO_ITEM = 'todoItem';
let selectedLiClass;
let selectedLi;

const saveAll = (key, data) => {
    todoArr.push(data);
    localStorage.setItem(key, JSON.stringify(todoArr));
}

const save = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const getAll = (key) => {
    const json = localStorage.getItem(key);
    let todoArr = JSON.parse(json);
    if (todoArr === null) {
        todoArr = [];
    }

    return todoArr;
}

const randomColor = (arrColor) => {
    const randomIndex = Math.floor(Math.random() * (colorPicker.length - 1));
    return arrColor[randomIndex];
}

const selectLi = (color) => {
    if (selectedLi) {
        selectedLi.classList.remove('active')
    }
    selectedLiClass = color;
    selectedLi = formChoice.querySelector(`.${color}`);
    selectedLi.classList.add('active');
}

const formChoiceHandler = (color) => () => {
    selectLi(color);
}

for (let i = 0; i < formChildes.length; i++) {
    formChildes[i].onclick = formChoiceHandler(colorPicker[i]);
}

selectLi(randomColor(colorPicker));

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (formInput.value.trim()) {
        const todoItem = {
            color: selectedLiClass,
            checked: false,
            text: formInput.value,
            id: String(Date.now())
        }
        saveAll(TODO_ITEM, todoItem);
        createTodo(todoItem)
        selectLi(randomColor(colorPicker));
        formInput.value = '';
    }
})

const createTodo = (todoItem) => {
    const infoItem = document.createElement('li');
    infoItem.classList.add('info_item');
    if (todoItem.checked) {
        infoItem.classList.add('active');
    }
    infoItem.classList.add(todoItem.color);
    infoList.append(infoItem);

    const infoCheckbox = document.createElement('input');
    infoCheckbox.type = 'checkbox';
    infoItem.append(infoCheckbox);
    infoCheckbox.classList.add('info_check');
    infoCheckbox.id = todoItem.id

    if (todoItem.checked) {
        infoCheckbox.checked = true
    }

    infoCheckbox.onchange = (e) => {
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

let todoArr = getAll(TODO_ITEM);

todoArr.forEach((currentValue) => {
    createTodo(currentValue)
})
