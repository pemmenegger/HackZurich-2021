import React from 'react'
import AlertError from './components/context/foreground/AlertError'
import AlertSuccess from './components/context/foreground/AlertSuccess'


export function openSuccessAlert(foregroundContext, text) {
    foregroundContext.showAlert(<AlertSuccess text={text} />, 3000)
}

export function openErrorAlert(foregroundContext, text) {
    foregroundContext.showAlert(<AlertError text={text} />, 4000)
}

export function getFirstnameFromUserKey(allRigiUsers, userKey) {
    let user = allRigiUsers.filter(user => {
        return user.value === userKey
    });
    let userFirstname = "unbekannter User";
    if(user.length == 1) {
        userFirstname = user[0].label
    }
    return userFirstname;
}

export function switchDatesIfNeeded(startDateMoment, endDateMoment) {
    if (startDateMoment && endDateMoment && startDateMoment.isAfter(endDateMoment)) {
        let temp = startDateMoment;
        startDateMoment = endDateMoment;
        endDateMoment = temp;
    }

    return {
        startDateMoment: startDateMoment,
        endDateMoment: endDateMoment,
    };
}

export function generatePdfFromCalendarEntries(startDateMoment, endDateMoment, calendarEntries, allRigiUsers) {
    return new Promise(function(resolve, reject) {
        let body = [];
        let usersAndBookedDays = {};

        let occupiedDays = [];
        let occupiedDaysCounter = 0;
        let severalTimesOccupiedDaysCounter = 0;

        for (let i = 0; i < calendarEntries.length; i++) {
            let dateFrom = moment(calendarEntries[i].dateFrom, "YYYY-MM-DD");
            let dateTo = moment(calendarEntries[i].dateTo, "YYYY-MM-DD");
            let numberOfDays = dateTo.diff(dateFrom, "days") + 1;
            let user = allRigiUsers.find(user => user.value == calendarEntries[i].userKey);

            let firstColumnValue = dateFrom.format("DD.MM")
                + " - " +
                dateTo.format("DD.MM.YYYY")
                + "     (" +
                calendarEntries[i].person
                + ", " +
                calendarEntries[i].quantity
                + ") – gebucht von " +
                user.label

            body.push([firstColumnValue, numberOfDays + (numberOfDays == 1 ? ' Tag' : ' Tage')])
            
            if (usersAndBookedDays[user.value]) {
                usersAndBookedDays[user.value] += numberOfDays
            }
            else {
                usersAndBookedDays[user.value] = numberOfDays
            }

            // count occupied days during period
            while (dateFrom.isSameOrBefore(dateTo)) {
                let date = dateFrom.format("YYYY-MM-DD");
                if (!occupiedDays.includes(date)) {
                    occupiedDays.push(date);
                    occupiedDaysCounter++;
                } else {
                    severalTimesOccupiedDaysCounter++;
                }
                dateFrom.add(1, 'days');
            }
        }

        body.push(['', ''])   
        var sortedUsersAndBookedDays = [];
        for (var userKey in usersAndBookedDays) {
            sortedUsersAndBookedDays.push([userKey, usersAndBookedDays[userKey]]);
        }
        sortedUsersAndBookedDays.sort(function(a, b) {
            return b[1] - a[1];
        });
        for (var [userKey, numberOfBookedDays] of sortedUsersAndBookedDays) {
            let user = allRigiUsers.find(user => user.value == userKey);
            body.push([user.label, numberOfBookedDays + (numberOfBookedDays == 1 ? ' Tag' : ' Tage')])
        }

        let doc = new jsPDF('p', 'pt', 'a4');
        doc.setFontSize(20);
        doc.setTextColor(40);
        let title = "Hüttenbelegung";
        if (startDateMoment) {
            title += " ab " + startDateMoment.format("DD.MM.YYYY");
        }
        if (endDateMoment) {
            title += " bis " + endDateMoment.format("DD.MM.YYYY");
        }
        doc.text(title, 40, 70);
        doc.setFontSize(10); 
        doc.text("Gebuchte Tage: " + (occupiedDaysCounter + severalTimesOccupiedDaysCounter), 40, 90);
        doc.text("–– davon mehrfach belegt: " + severalTimesOccupiedDaysCounter, 40, 105);
        doc.autoTable({
            startY: 120,
            styles: { 
                theme: "striped"
            },
            columnStyles: { 
                0: { cellWidth: 'auto' }, 
                1: { cellWidth: 110 } 
            }, 
            margin: { top: 40 },
            head: [['Wer', 'Anzahl Tage']],
            body: body,
        })
        doc.save('Hüttenbelegung.pdf');

        resolve()
    });
}