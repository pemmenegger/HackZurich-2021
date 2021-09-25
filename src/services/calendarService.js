

const CALENDAR = "calendar";

const createOrUpdateCalendarEntry = async (postKey, startDateMoment, endDateMoment, who, howMuch, comment, rigiUser) => {
	let data = {
		dateFrom: startDateMoment.format('YYYY-MM-DD'),
		dateTo: endDateMoment.format('YYYY-MM-DD'),
		person: who,
		quantity: howMuch,
		id: postKey,
		userEmail: rigiUser.email,
		userKey: rigiUser.uid
	}

	if(comment != "") {
		data.comment = comment
	}

	await firebase.database().ref(`/${CALENDAR}/` + postKey).set(data).then(() => {
		// success, do nothing here
	}).catch((error) => {
		throw Error(error)
	});
}

export const createCalendarEntry = async (startDateMoment, endDateMoment, who, howMuch, comment, rigiUser) => {
	let newPostKey = firebase.database().ref().child(CALENDAR).push().key;
	await createOrUpdateCalendarEntry(newPostKey, startDateMoment, endDateMoment, who, howMuch, comment, rigiUser)
}

export const updateCalendarEntry = async (postKey, startDateMoment, endDateMoment, who, howMuch, comment, rigiUser) => {
	await createOrUpdateCalendarEntry(postKey, startDateMoment, endDateMoment, who, howMuch, comment, rigiUser)
}

export const fetchAndMapCalendarEntries = async () => {
	const snapshot = await firebase.database().ref(`/${CALENDAR}/`).once('value');
	let value = snapshot.val();
	let calendarEntries = Object.keys(value).map((key) => value[key]);
	return calendarEntries
}

export const sortOldestFirst = (calendarEntries) => {
	calendarEntries.sort(function(a,b){
		let aFrom = new Date(a.dateFrom);
		let bFrom = new Date(b.dateFrom);
		let aTo = new Date(a.dateTo);
		let bTo = new Date(b.dateTo);

		if(aFrom < bFrom){
			return -1;
		}
		else if(aFrom = bFrom){
			if(aTo < bTo){
				return -1;
			}
			else {
				return 1;
			}
		}
		else {
			return 1;
		}
	});
}

export const fetchAndMapCalendarEntry = async (calendarEntryId, data) => {
	await firebase.database().ref(`/${CALENDAR}/` + calendarEntryId).on('value', (snap) => {
		let dbEntry = snap.val();
		if(!dbEntry) {
			throw Error("No calendar entry found for calendarEntryId:" + calendarEntryId)
		}
		// same naming as in calendar entry form skeleton
		data.startDateMoment = moment(dbEntry.dateFrom, "YYYY-MM-DD")
		data.endDateMoment = moment(dbEntry.dateTo, "YYYY-MM-DD")
		data.who = dbEntry.person
		data.howMuch = dbEntry.quantity
		data.comment = dbEntry.comment ? dbEntry.comment : ""
	});
}

export const deleteCalendarEntry = async (calendarEntryId) => {
	await firebase.database().ref(`/${CALENDAR}/` + calendarEntryId).remove().then(() => {
		// success, do nothing
	}).catch((error) => {
		throw Error(error)
	});
}

