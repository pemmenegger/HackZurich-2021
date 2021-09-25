
export const mapFirebaseUserToRigiUser = async (firebaseUser, rigiUser) => {
	const snapshot = await firebase.database().ref('users/' + firebaseUser.uid).once('value');
	let value = snapshot.val();
	rigiUser.uid = firebaseUser.uid;
	rigiUser.email = firebaseUser.email;
	rigiUser.firstname = value.firstname;
	rigiUser.lastname = value.lastname;
	rigiUser.isAdmin = value.isAdmin ? value.isAdmin : false;
	rigiUser.onlyRead = value.onlyRead ? value.onlyRead : false;
}

export const mapAllFirebaseUsersToAllRigiUsers = async (allRigiUsers) => {
	const snapshot = await firebase.database().ref('users').once('value');
	let value = snapshot.val();
	for (var key of Object.keys(value)) {
		allRigiUsers.push({
			value: key,
			label: value[key].firstname
		});
	}
}

export const handleAlreadyLoggedInFirebaseUser = async (onSuccessCallback, hasFinishedCallback) => {
	await firebase.auth().onAuthStateChanged(async (user) => {
		if (user) {
			await onSuccessCallback(user)
		}
		hasFinishedCallback()
    })
}

/**
 * returns the logged in user object OR the error upon failure
 */
export const login = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password)
		.then((firebaseOperation) => {
			return firebaseOperation.user
		}).catch((error) => {
			let firebaseError;
			switch (error.code) {
				case "auth/invalid-email":
					firebaseError = 'Bitte gib eine gültige E-Mail ein';
					break;
				case "auth/user-disabled":
					firebaseError = 'Benutzer ist deaktiviert'
					break;
				case "auth/user-not-found":
					firebaseError = 'Benutzer nicht gefunden'
					break;
				case "auth/wrong-password":
					firebaseError = 'Falsches Passwort'
					break;
				case "auth/too-many-requests":
					firebaseError = 'Zu viele falsche Eingaben auf einmal. Versuche es später nochmals'
					break;
				default:
					firebaseError = 'Ups, es ist ein Fehler aufgetreten'
			}
			return Error(firebaseError);
		});
}

export const logout = (onSuccessCallback) => {
	firebase.auth().signOut().then(() => {
		onSuccessCallback()
	}).catch((error) => {
		console.log(error);
		throw Error('Logout ist fehlgeschlagen')
	});
}

export const changePassword = (oldPassword, newPassword) => {
	let user = firebase.auth().currentUser;
	let credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
	
	return user.reauthenticateWithCredential(credentials).then(() => {
		user.updatePassword(newPassword).then(() => {
			// success, do nothing
		}).catch((error) => {
			let firebaseError;
			switch (error.code) {
				case 'auth/weak-password':
					firebaseError = 'Neues Passwort ist zu einfach';
					break;
				default:
					firebaseError = 'Passwort konnte nicht geändert werden'
			}
			return Error(firebaseError);
		});
	}).catch((error) => {
		let firebaseError;
		switch (error.code) {
			case 'auth/wrong-password':
				firebaseError = 'Falsches altes Passwort';
				break;
			default:
				firebaseError = 'Passwort konnte nicht geändert werden'
		}
		return Error(firebaseError);
	});
}

export const resetPassword = (email) => {
	return firebase.auth().sendPasswordResetEmail(email).then(() => {            
		// success, do nothing
	}).catch((error) => {
		let firebaseError;
		switch (error.code) {
			case 'auth/invalid-email':
				firebaseError = 'Bitte gib eine gültige E-Mail ein';
				break;
			case 'auth/user-disabled':
				firebaseError = 'Benutzer ist deaktiviert';
				break;
			case 'auth/user-not-found':
				firebaseError = 'Benutzer nicht gefunden';
				break;
			default:
				firebaseError = 'Passwort konnte nicht zurückgesetzt werden'
		}
		return Error(firebaseError);
	});
}