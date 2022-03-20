/*
1. Дата автоматически меняющаяся на сегодняшний день.
2. Добавить дополнительно по перианальной области.
4. Удалять дополнительный блок по сизистой если он пустой или содержит "дополнительно по слизистой"
5. Дополнительные образования flex: baseline
6. AddEventListener на кнопку и на "Сtrl+P"
*/

//переменные
const date = document.querySelector('#date');
const perOblDop = document.querySelector('#perianalnaja_oblast_dop');
const slizistajaDop = document.querySelector('#slizistaja__dop');
const button = document.querySelector('button');
const oblastGiperemii = document.querySelector('#oblast_giperemii');
const slizistaja = document.querySelector('#slizistaja');
const dopobrazovanija = document.querySelector('#dopobrazovanija');
const sosudistiyRisunok = document.querySelector('#sosudistiy_risunok');
const sosudistiyRisunokParent = sosudistiyRisunok.parentElement;

//функции
function getTodayDate() {
    date.valueAsDate = new Date();
    date.type = 'text';
    date.value = date.value.split('-').reverse().join('.');
}
getTodayDate();

function clearElement(elem, falseValue) {
    if (elem.value === '' || elem.value === falseValue) {
        elem.style.display = 'none';
    }
}

function clearElementIfotherElement(elem, secondElem, uslovie) {
    if (secondElem.value === uslovie) {
        elem.style.display = 'none';
    }
}

// ADD Listener
button.addEventListener('click', (e) => {
    clearElement(slizistajaDop, 'Слизистая');
    clearElement(perOblDop, 'Дополнительно по перианальной области: ');
    clearElementIfotherElement(oblastGiperemii, slizistaja, 'розовая, блестящая.');
    clearElementIfotherElement(sosudistiyRisunokParent, sosudistiyRisunok, '');
    if (dopobrazovanija.value === '') {
        dopobrazovanija.value = 'нет';
    }
    window.print();
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP' && e.ctrlKey) {
        e.preventDefault();
        clearElement(slizistajaDop, 'Слизистая');
        clearElement(perOblDop, 'Дополнительно по перианальной области: ');
        clearElementIfotherElement(oblastGiperemii, slizistaja, 'розовая, блестящая.');
        clearElementIfotherElement(sosudistiyRisunok, sosudistiyRisunokParent, '');
        if (dopobrazovanija.value === '') {
            dopobrazovanija.value = 'нет';
        }
        window.print();
    }
});