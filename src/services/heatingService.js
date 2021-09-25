
const HEATING = "heating";

export const fetchAndMapHeating = async (reactWrites, myStromWrites) => {
    const snapshot = await firebase.database().ref(`/${HEATING}/`).once('value');
	let value = snapshot.val();

	reactWrites.minTempDay = value.reactWrites.minTempDay
    reactWrites.minTempNight = value.reactWrites.minTempNight
    reactWrites.changedByUserKey = value.reactWrites.changedByUserKey
    reactWrites.changedTimestamp = value.reactWrites.changedTimestamp

    myStromWrites.currentTemp = value.myStromWrites.currentTemp
    myStromWrites.isHeatingOn = value.myStromWrites.isHeatingOn
    myStromWrites.lastChanged = value.myStromWrites.lastChanged
}