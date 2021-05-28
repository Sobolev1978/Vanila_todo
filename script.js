const button = document.querySelector('#form_btn');
const infoList = document.querySelector('#info_list');
const formChoice = document.querySelector('#form_choice');
const item = formChoice.querySelectorAll('li');
const formInput = document.querySelector('#form_input');
const colorPicker = ['#0000ff', '#ffa400', '#008000', '#ff0000', '#00d669', '#530cff'];

randomColor = (arrColor) => {
    const mathRandom = Math.floor(Math.random() * colorPicker.length);
    let color;
    arrColor.map(function (elem, index) {
        if (index === mathRandom) {
            color = elem;
        }
    });
    return color;
}

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
    createTodo()
    if (selectedLi) {
        selectedLi.classList.remove('active');
        selectedLi = null;
    }
});

createTodo = function () {
    const infoItem = document.createElement('li');
    infoItem.textContent = '';
    infoItem.classList.add('info_item');
    infoItem.style.backgroundColor = selectedLi ? selectedLi.style.backgroundColor : randomColor(colorPicker)
    infoList.append(infoItem);


    const infoCheckbox = document.createElement('input');
    infoCheckbox.type = 'checkbox';
    infoItem.append(infoCheckbox);
    infoCheckbox.classList.add('info_check');

    infoCheckbox.onchange = function (e) {
        infoItem.classList.toggle('active');
    };

    const infoContent = document.createElement('div');
    infoContent.textContent = '';
    infoContent.classList.add('info_content');
    infoItem.append(infoContent);
    infoContent.textContent = formInput.value;
}