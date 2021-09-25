

const NOTES = "notes";

export const createNote = async (noteText, rigiUser) => {
	let newPostKey = firebase.database().ref().child(NOTES).push().key;
	let data = {
		title: noteText,
		id: newPostKey,
		sendEmail: false,
		createdFromUid: rigiUser.uid,
		createdDate: moment().format(),
	}

	await firebase.database().ref(`/${NOTES}/` + newPostKey).set(data).then(() => {
		// success, do nothing here
	}).catch((error) => {
		throw Error(error)
	});
}

export const finishNote = async (postKey, rigiUser) => {
	let postData = {
		doneFromUid: rigiUser.uid,
		doneDate: moment().format()
	};
	await firebase.database().ref().child(`/${NOTES}/` + postKey).update(postData).then(() => {
		// success, do nothing here
	}).catch((error) => {
		throw Error(error)
	});;
}

export const fetchAndMapNotes = async () => {
	const snapshot = await firebase.database().ref(`/${NOTES}/`).once('value');
	let value = snapshot.val();
	let notes = Object.keys(value).map((key) => value[key]);
	return notes
}

export const filterOnlyActiveNotes = (notes) => {
	return notes.filter(function(element) {
		if (element.doneDate) {
			return false;
		} else {
			return true;
		}
	});
}