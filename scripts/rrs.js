'use strict';

//переменные
const date = document.querySelector('#date');
const fio = document.querySelector('#fio__input');
const birthday = document.querySelector('#birthday');
const perOblDop = document.querySelector('#perianalnaja_oblast_dop');
const perObl = document.querySelector('#perianalnaja_oblast');
const glubina = document.querySelector('#glubina__value');
const tonus = document.querySelector('#tonus');
const konecOsmotra = document.querySelector('#konec-osmotra');
const slizistajaDop = document.querySelector('#slizistaja__dop');
const skladki = document.querySelector('#skladki');
const sosudRis = document.querySelector('#sosudistiy_risunok');
const button = document.querySelector('#print');
const slizistaja = document.querySelector('#slizistaja');
const dopobrazovanija = document.querySelector('#dopobrazovanija');
const uzly = document.querySelector('#uzly');
const zakluchenie = document.querySelector('#zakluchenie__input');
const result = document.querySelector('#result-print');
const result2 = document.querySelector('#result-print2');
const cancel = document.querySelector('#cancel');
const biopsia = document.querySelector('#biopsia');

// установка даты
date.valueAsDate = new Date();


//функции
function hideElement(elem) {
    elem.style.display = 'none';
}

function showElement(elem) {
    elem.style.display = 'block';
}
//
// function clearElementIfOtherElement(elem, secondElem, uslovie) {
//     if (secondElem.value === uslovie) {
//         elem.style.display = 'none';
//     }
// }

function addResult(place) {
    place.innerHTML = `
    <h1>Ректороманоскопия.</h1>
    <h2><i>ул.Рахманинова д. 10. тел. 78-78-20, 78-20-20.</i></h2>
    <div>Ф.И.О. пациента: ${fio.value}   Дата рождения: ${birthday.value.split('-').reverse().join('.')}</div>
    <div>Дата осмотра: ${date.value.split('-').reverse().join('.')}</div>
    <div>Перианальная область: ${perObl.value}. ${perOblDop.value}</div>
    <div>Сфинктр в ${tonus.value}.</div>
    <div>Осмотр до ${glubina.value} см. ${konecOsmotra.value}</div>
    <div>Слизистая: ${slizistaja.value} ${slizistajaDop.value}</div>
    <div>Складки: ${skladki.value}</div>
    <div>Сосудистый рисунок: ${sosudRis.value}</div>
    <div>Дополнительные образования: ${dopobrazovanija.value}</div>
    <div>Геморроидальные узлы: ${uzly.value}</div>
    <div>Заключение: ${zakluchenie.value}</div>
    <div>${(biopsia.checked) ? 'Явка за результатми биопсии через 10 дней' : ''}</div>
    <br>
    <div><i>вр. Орлов В.И.</i></div>
    `;
}

function prepareAndPrint() {
    if (dopobrazovanija.value === '') {
        dopobrazovanija.value = 'нет';
    }
    hideElement(document.querySelector('main'));
    showElement(result2);
    showElement(result);
    addResult(result);
    addResult(result2);
    window.print();
}

// ADD Listener
button.addEventListener('click', () => {
    prepareAndPrint();
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP' && e.ctrlKey) {
        e.preventDefault();
        prepareAndPrint();
    }
});

cancel.addEventListener('click', () => {
    showElement(document.querySelector('main'));
    hideElement(result);
    hideElement(result2);
})