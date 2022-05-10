'use strict';
//переменные

const patientName = document.querySelector('#patient-name');
const birthday = document.querySelector('#birthday');
const otherComplains = document.querySelector('#other');
const anamnez = document.querySelector('#hystory');
const perObl = document.querySelector('#per-obl');
const perOblAdd = document.querySelector('#per-obl-add');
const opisanieUzlov = document.querySelector('#opisanie-uzlov');
const obrazovania = document.querySelector('#obrazovania');
const anoskopia = document.querySelector('#anoskopia');
const diagnoz = document.querySelector('#diagnoz');
const diagnoz2 = document.querySelector('#diagnoz2');
const ln = document.querySelector('#trud');
const lnNachalo = document.querySelector('#ln-nachalo');
const lnKonec = document.querySelector('#ln-konec');
const datLn = document.querySelector('#dat-ln');
const date = document.querySelector('#date');
const prepareForPrintButton = document.querySelector('#before-print');
const forPatient = document.querySelector('.for-patient');
const forCart = document.querySelector('.for-cart');
const tonus = document.querySelector('#tonus');
const condition = document.querySelector('#condition');
const stul = document.querySelector('#stul');
const cancel = document.querySelector('#cancel');
const main = document.querySelector('main');


//установить дату приёма на сегодняшний день
date.valueAsDate = new Date();

// ! функции !
function hideElement(elem) {
    elem.style.display = 'none';
}

function showElement(elem) {
    elem.style.display = 'block';
}

// ! Блок для пациента.
function recomendationList() {
    let list = [];
    const recomendation = document.querySelectorAll('.recomendation');
    const recomendation2 = document.querySelectorAll('.recomendation2');
    for (let j = 0; j < recomendation2.length; j++) {
        if (recomendation2[j].value !== '') {
            list.push(recomendation2[j].value);
        }
    }
    for (let i = 0; i < recomendation.length; i++) {
        if (recomendation[i].checked) {
            list.push(recomendation[i].value);
        }
    }

    if (ln.value === 'Нетрудоспособен.') {
        list.push([`${ln.value} ${datLn.value} больничный лист
        c ${lnNachalo.value.split('-').reverse().join('.')} по ${lnKonec.value.split('-').reverse().join('')}.
        Контрольная явка на ${lnKonec.value.split('-').reverse().join('')}`]);
    }
    if (ln.value === 'Закрыть больничный лист.') {
        let lnClose = new Date(date.valueAsDate.setDate(date.valueAsDate.getDate() + 1)).toISOString();
        lnClose = lnClose.slice(0,10).split('-').reverse().join('.');
        list.push([`ЛН закрыт ${date.value.split('-').reverse().join('.')}. К труду с ${lnClose}`]);
    }
    return list.join('<br>');
}


function textForCart() {
    const complains = document.querySelectorAll('.complains'),
          uzly = document.querySelector('#uzly');
        let posleOperacii = (document.querySelector('#posle-operacii').checked) ?
                    document.querySelector('#posle-operacii').value : '';

        let listOfComplains = [];
        complains.forEach(function(item) {
            if (item.checked) {
                listOfComplains.push(item.value);
            }
        });
        listOfComplains.push(otherComplains.value);
        
    
    forCart.innerHTML = `
        <h2>Прием колопроктолога.</h2>
        <p><i>ул.Рахманинова д. 10. тел. 78-78-20, 78-20-20.</i></p>
        <p> Дата: ${date.value.split('-').reverse().join('.')}</p>
        <p>Пациент: ${patientName.value} Дата рождения: ${birthday.value.split('-').reverse().join('.')}</p>
        <div>Жалобы: ${listOfComplains. join(', ')}</div>
        <div>${anamnez.value}</div>
        <div>Состояние: ${condition.value}</div>
        <div>Стул: ${stul.value}</div>
        <div>
        Перианальная область: ${(perObl.value === '') ? 'не изменена.' : perObl.value + ' ' +  perOblAdd.value}
        </div>
        <div>Тонус сфинктера: ${tonus.value}</div>       
        <div>
        Геморроидальные узлы на 3, 7, 11 часах:
        ${opisanieUzlov.value === '' ? 'не выраженные внутренние геморроидальные узлы.' : opisanieUzlov.value}
        </div>
        <div>Выпадение геморроидальных узлов: ${uzly.value}</div>
        <div>Дополнительные образования: ${obrazovania.value}</label>
        <div>${(anoskopia.value === 'Аноскопия: ') ? anoskopia.value = '' : anoskopia.value}</div>
        <p><b>Диагноз: ${diagnoz.value + ' ' + diagnoz2.value + ' ' + posleOperacii}</b></p>
        <p>Рекомендации:</p>
        <div>${recomendationList()}</div>
        <p><i> врач: Орлов В.И. </i></p >
    `;
}

function addInfoForPatient() {
    let posleOperacii = (document.querySelector('#posle-operacii').checked) ?
        document.querySelector('#posle-operacii').value : '';
    forPatient.innerHTML =
        `
        <h2>Прием колопроктолога.</h2>
        <p><i>ул.Рахманинова д. 10. тел. 78-78-20, 78-20-20.</i></p>
        <p>Дата: ${date.value.split('-').reverse().join('.')}</p>
        <p>Пациент: ${patientName.value} Дата рождения: ${birthday.value.split('-').reverse().join('.')}</p>
        <p><b>Диагноз: ${diagnoz.value + ' ' + diagnoz2.value + ' ' + posleOperacii}</b></p>
        <p><b>Рекомендации:</b></p>
        <div><b>${recomendationList()}</b></div>
        <p><i> врач: Орлов В.И. </i></p >
        `;
}

function addCssForPrint() {
    if (obrazovania.value === '') {
        obrazovania.value = 'нет';
    }

    // * функция для рпазворота даты ЛН в формат дд.мм.гггг.
    lnNachalo.value = lnNachalo.value.split('-').reverse().join('.');
    lnKonec.value = lnKonec.value.split('-').reverse().join('.');
}


prepareForPrintButton.addEventListener('click', () => {
    addCssForPrint();
    textForCart();
    addInfoForPatient();
    hideElement(main);
    showElement(forPatient);
    showElement(forCart);
    window.print();
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP' && e.ctrlKey) {
        e.preventDefault();
        addCssForPrint();
        textForCart();
        addInfoForPatient();
        hideElement(main);
        showElement(forPatient);
        showElement(forCart);
        window.print();
    }
});

cancel.addEventListener('click', function () {
    showElement(main);
    hideElement(forCart);
    hideElement(forPatient)
})