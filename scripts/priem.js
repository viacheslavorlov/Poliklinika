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
const lnNachalo = document.querySelector('#ln-nachalo');
const lnKonec = document.querySelector('#ln-konec');
const datLn = document.querySelector('#dat-ln');
const otherObsledovania = document.querySelector('#other-obsledovania');
const otherLechenie = document.querySelector('#other-lechenie');
const date = document.querySelector('#date');
const obrazovaniaConteiner = document.querySelector('#obrazovania-conteiner');
const prepareForPrintButton = document.querySelector('#before-print');
const forPatient = document.querySelector('.for-patient');
const forCart = document.querySelector('.for-cart');
const tonus = document.querySelector('#tonus');
const condition = document.querySelector('#condition');
const stul = document.querySelector('#stul');
const naPerchatke = document.querySelector('#na-perchatke');

//установить дату приёма на сегодняшний день
date.valueAsDate = new Date();

// ! Блок для пациента.
function recomendationList() {
    let list = [];
    const recomendation = document.querySelectorAll('.recomendation');
    const recomendation2 = document.querySelectorAll('.recomendation2');
    for (let j = 0; j < recomendation2.length; j++) {
        if (recomendation2[j].value != '') {
            list.push(recomendation2[j].value);
        }
    }
    for (let i = 0; i < recomendation.length; i++) {
        if (recomendation[i].checked) {
            list.push(recomendation[i].value);
        }
    }

    return list.join('<br>');
}

function addCssForPrint() {
    document.querySelector('main').style.display = 'none';
}

function textForCart() {
    const complains = document.querySelectorAll('.complains'),
          uzly = document.querySelector('#uzly');
        let listOfComplains = [];
        complains.forEach(function(item) {
            if (item.checked) {
                listOfComplains.push(item.value);
            }
        });
        listOfComplains.push(otherComplains.value);
        
    
    forCart.innerHTML = `
        <h2><b>Прием колопроктолога.</b></h2>
        <p><i>ул.Рахманинова д. 10. тел. 78-78-20, 78-20-20.</i></p>
        <p> Дата: ${date.value.split('-').reverse().join('.')}</p>
        <p>Пациент: ${patientName.value} Дата рождения: ${birthday.value.split('-').reverse().join('.')}</p>
        <div>Жалобы: ${listOfComplains. join(', ')}</div>
        <div>${anamnez.value}</div>
        <div>Состояние: ${condition.value}</div>
        <div>Стул: ${stul.value}</div>
        <div>
        Перианальная область: ${(perObl.value == '') ? 'не изменена.' : perObl.value + ' ' +  perOblAdd.value}
        </div>
        <div>Тонус сфинктера: ${tonus.value}</div>       
        <div>
        Геморроидальные узлы на 3, 7, 11 часах:
        ${opisanieUzlov.value == '' ? 'не выраженные внутренние геморроидальные узлы.' : opisanieUzlov.value}
        </div>
        <div>Выпадение геморроидальных узлов: ${uzly.value}</div>
        <div>Дополнительные образования: ${obrazovania.value}</label>
        <div>На перчатке: ${naPerchatke.value}</div>
        <p><b>Диагноз: ${(diagnoz.value == '') ? diagnoz2.value : diagnoz.value + ' ' + diagnoz2.value}</b></p>
        <p>Рекомендации:</p>
        <div>${recomendationList()}</div>
        <p><i> врач: Орлов В.И. </i></p >
    `;
}

function addInfoForPatient() {
    forPatient.innerHTML =
        `
        <h2><b>Прием колопроктолога.</b></h2>
        <p><i>ул.Рахманинова д. 10. тел. 78-78-20, 78-20-20.</i></p>
        <p>Дата: ${date.value.split('-').reverse().join('.')}</p>
        <p>Пациент: ${patientName.value} Дата рождения: ${birthday.value.split('-').reverse().join('.')}</p>
        <p><b>Диагноз: ${(diagnoz.value == '') ? diagnoz2.value : diagnoz.value + ' ' + diagnoz2.value}</b></p>
        <p><b>Рекомендации:</b></p>
        <div><b>${recomendationList()}</b></div>
        <p><i> врач: Орлов В.И. </i></p >
        `;
}




prepareForPrintButton.addEventListener('click', function (e) {
    addCssForPrint();
    textForCart();
    addInfoForPatient();
    window.print();
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP' && e.ctrlKey) {
        addCssForPrint();
        textForCart();
        addInfoForPatient();
    }
});