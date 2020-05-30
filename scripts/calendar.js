let tableCell = document.getElementById("miniCalendar");
let currentDate = new Date();
let currentSelected = null;
setDate(currentDate);
tableCell.appendChild(getCalendar(currentDate));
const courseName = 'Програмиране 101 (Начинаещи)'

function addCourseHours(date) {
    let dayOfWeek = date.getDay();

    cleanHours();

    if (dayOfWeek === 1) {
        let input11 = document.getElementById("input-11");
        let input12 = document.getElementById("input-12");
        input11.value = courseName;
        input12.value = courseName;
        input11.className = 'input-calendar-with-course';
        input12.className = 'input-calendar-with-course';
        input11.onclick = redirectToCourse;
        input12.onclick = redirectToCourse;
    }
    if (dayOfWeek === 4) {
        let input14 = document.getElementById("input-14");
        let input15 = document.getElementById("input-15");
        input14.value = courseName;
        input15.value = courseName;
        input14.className = 'input-calendar-with-course';
        input15.className = 'input-calendar-with-course';
        input14.onclick = redirectToCourse;
        input15.onclick = redirectToCourse;
    }
}

function cleanHours(){
    let old = document.getElementsByClassName("input-calendar-with-course");
    while (old.length > 0) {
        old[0].value = '';
        old[0].className = 'input-calendar';
    }
}

addCourseHours(currentDate);

function redirectToCourse(){
    cleanHours();
    location.href = 'course-overview.html';
}

function getCalendar(date) {
    let monthArray = ['Януари', 'Февруари', 'Март', 'Април',
        'Май', 'Юни', 'Юли', 'Август',
        'Септември', 'Октомври', 'Ноември', 'Декември'];
    let daysArray = ['Пн ', 'Вт ', 'Ср ', 'Чет', 'Пет', 'Съб', 'Нед'];


    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDay();

    let month = date.getMonth();
    let year = date.getFullYear();

    let tbl = document.createElement("table");
    tbl.style.width = '100%';
    tbl.style.height = '100%';
    tbl.style.borderSpacing = '0px';


    let tbody = document.createElement("tbody");

    let fillerCell = document.createElement("td");
    fillerCell.style.height = '30px';
    fillerCell.style.width = '30px';

    let firstRow = document.createElement("tr");

    let monthCell = document.createElement("td");
    monthCell.colSpan = 4;
    monthCell.style.textAlign = 'center';
    monthCell.style.color = '#5f31ce';
    monthCell.style.fontWeight = 'bold';
    let monthDiv = document.createElement("div");
    monthDiv.innerHTML = monthArray[month];
    monthCell.appendChild(monthDiv);
    firstRow.appendChild(monthCell);


    let yearCell = document.createElement("td");
    yearCell.colSpan = 3;
    yearCell.style.textAlign = 'center';
    yearCell.style.color = '#5f31ce';
    yearCell.style.fontWeight = 'bold';
    let yearDiv = document.createElement("div");
    yearDiv.innerHTML = year + "";
    yearCell.appendChild(yearDiv);
    firstRow.appendChild(yearCell);


    tbody.appendChild(firstRow);

    let separator = document.createElement("td");
    separator.colSpan = 7;
    let line = document.createElement("div");
    line.style.width = '100%';
    line.style.borderBottom = 'solid #949494 2px';
    separator.appendChild(line);
    tbody.appendChild(document.createElement("tr").appendChild(separator));

    let monthRow = document.createElement("tr");
    for (let i = 0; i < daysArray.length; i++) {
        let td = document.createElement("td");
        td.style.textAlign = 'center';
        td.style.color = '#3399ff';
        td.innerHTML = daysArray[i];
        monthRow.appendChild(td);
    }
    tbody.appendChild(monthRow);

    let maxDaysInMonth = getMaxDayCount(date);

    for (let i = 0; i < 6; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            let num = i * 7 + j - firstDayOfMonth + 1;
            let td = document.createElement("td");
            td.style.textAlign = 'center';
            td.style.height = '30px';
            td.style.width = '30px';
            if (num > 0 && num <= maxDaysInMonth) {
                let innerA = document.createElement("a");
                innerA.className = 'inactive-day calendar-day';
                innerA.innerHTML = num;
                td.appendChild(innerA);
                td.onclick = function () {
                    currentSelected.childNodes[0].className = 'inactive-day calendar-day';
                    currentSelected = this;
                    currentSelected.childNodes[0].className = 'active-day calendar-day';
                    showForDate(this);
                };
            }
            if (num === date.getDate()) {
                currentSelected = td;
                currentSelected.childNodes[0].className = 'active-day';
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    let tr = document.createElement("tr");

    tr.appendChild(fillerCell.cloneNode());

    let td1 = document.createElement("td");
    td1.style.textAlign = 'center';
    td1.colSpan = 2;
    let buttonBack = document.createElement("button");
    buttonBack.style.background = 'url(assets/arrow-left.png)';
    buttonBack.style.height = '40px';
    buttonBack.style.width = '60px';
    buttonBack.style.border = 'none';
    buttonBack.style.backgroundSize = 'contain';
    buttonBack.style.backgroundRepeat = 'no-repeat';
    buttonBack.onclick = previousMonth;
    td1.appendChild(buttonBack);

    tr.appendChild(td1);


    tr.appendChild(fillerCell.cloneNode());

    let td2 = document.createElement("td");
    td2.style.textAlign = 'center';
    td2.colSpan = 2;
    let buttonForward = document.createElement("button");
    buttonForward.style.background = 'url(assets/arrow-right.png)';
    buttonForward.onclick = nextMonth;
    buttonForward.style.height = '40px';
    buttonForward.style.width = '60px';
    buttonForward.style.border = 'none';
    buttonForward.style.backgroundRepeat = 'no-repeat';
    buttonForward.style.backgroundSize = 'contain';
    td2.appendChild(buttonForward);


    tr.appendChild(td2);


    tr.appendChild(fillerCell.cloneNode());

    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    return tbl;
}

function nextMonth() {
    let month = currentDate.getMonth();
    if (month === 11) {
        currentDate = new Date(currentDate.getFullYear() + 1, 0, 1);
    } else {
        currentDate = new Date(currentDate.getFullYear(), month + 1, 1);
    }
    setDate(currentDate);
    tableCell.removeChild(tableCell.childNodes[0]);
    tableCell.appendChild(getCalendar(currentDate));
}

function previousMonth() {
    let month = currentDate.getMonth();
    if (month === 0) {
        currentDate = new Date(currentDate.getFullYear() - 1, 11, 1);
    } else {
        currentDate = new Date(currentDate.getFullYear(), month - 1, 1);
    }
    setDate(currentDate);
    tableCell.removeChild(tableCell.childNodes[0]);
    tableCell.appendChild(getCalendar(currentDate));
}

function getMaxDayCount(date) {
    let month = date.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    }
    if (month === 1) {
        let year = date.getFullYear();
        if (year % 4 === 0 && year % 400 !== 0) {
            return 29;
        }
        return 28;
    }
}

function formatDate(date) {
    let monthNumeric = date.getMonth() + 1;
    let dayNumeric = date.getDate();
    let yearNumeric = date.getFullYear();
    return dayNumeric + "." + monthNumeric + "." + yearNumeric;
}

function showForDate(tableCell) {
    let current = tableCell.childNodes[0].innerHTML;
    let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), current);
    addCourseHours(date);
    setDate(date);
}

function setDate(date) {
    document.getElementById("lblDate").innerText = formatDate(date);
}