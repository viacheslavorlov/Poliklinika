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
const otherObsledovania = document.querySelector('#other-obsledovania');
const otherLechenie = document.querySelector('#other-lechenie');
const date = document.querySelector('#date');
const obrazovaniaConteiner = document.querySelector('#obrazovania-conteiner');
const prepareForPrintButton = document.querySelector('#before-print');
const forPatient = document.querySelector('.for-patient');

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

    if (ln.value === 'Нетрудоспособен.') {
        list.push([`${ln.value} ${datLn.value} больничный лист
        c ${lnNachalo.value.split('-').reverse().join('.')} по ${lnKonec.value.split('-').reverse().join('')}`]);

    }

    return list.join('<br>');
}


function addInfoForPatient() {

    forPatient.innerHTML =
        `<h2>Центр Репродуктивного Здоровья</h2>
        <p><b>Прием колопроктолога.</b></p>
        <p><i>ул.Рахманинова д. 10. тел. 78-78-20, 78-20-20.</i></p>
        <p> Дата: ${date.value.split('-').reverse().join('.')}</p>
        <p>Пациент: ${patientName.value} Дата рождения: ${birthday.value.split('-').reverse().join('.')}</p>
        <p>Диагноз: ${(diagnoz.value == '') ? diagnoz2.value : diagnoz.value + ' ' + diagnoz2.value}</p>
        <p>Рекомендации:</p>
        <div><b>${recomendationList()}</b></div>
        <p><i> врач: Орлов В.И. </i></p >
        `;
}


function addCssForPrint() {
    if (ln.value === 'Трудоспособен. ЛН не нужен.') {
        datLn.parentElement.style.display = 'none';
        ln.parentElement.style.display = 'none';
    }
    if (otherLechenie.value === '') {
        otherLechenie.parentElement.style.display = 'none';
    }
    if (otherObsledovania.value === '') {
        otherObsledovania.parentElement.style.display = 'none';
    }
    if (diagnoz2.value === '') {
        diagnoz2.parentElement.style.display = 'none';
    }
    if (otherObsledovania.value === '') {
        otherObsledovania.parentElement.style.display = 'none';
    }
    if (anoskopia.value === '') {
        anoskopia.parentElement.style.display = 'none';
    }
    if (obrazovania.value === '') {
        obrazovania.value = 'нет';
    }
    if (opisanieUzlov.value === '') {
        opisanieUzlov.innerHTML = 'Геморроидальные узлы на 3, 7, 11 часах: не выраженные геморроидальные узлы.';
    } else {
        opisanieUzlov.value = `Геморроидальные узлы на 3, 7, 11 часах:  ${opisanieUzlov.value}`;
    }
    if (perObl.value === 'norm') {
        perOblAdd.style.display = 'none';
    }
    if (obrazovania.value === '') {
        obrazovaniaConteiner.style.flexDirection = 'row';
    }
    if (otherComplains.value === '') {
        otherComplains.style.display = 'none';
    }

    // * функция для рпазворота даты ЛН в формат дд.мм.гггг.

    lnNachalo.value = lnNachalo.value.split('-').reverse().join('.');
    lnKonec.value = lnKonec.value.split('-').reverse().join('.');
}


prepareForPrintButton.addEventListener('click', function (e) {
    addCssForPrint();
    addInfoForPatient();
    window.print();
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyP' && e.ctrlKey) {
        addCssForPrint();
        addInfoForPatient();
    }
});