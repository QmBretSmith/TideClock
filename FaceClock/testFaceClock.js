const lat = 41.31539571168505;
const lng = -73.37471490164708;
const today = new moment().subtract(13, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const endDate = new moment().add(5, 'days').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");


fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${today}&end=${endDate}`, {
  headers: {
    'Authorization': '367bea9c-7aa0-11eb-b399-0242ac130002-367beb64-7aa0-11eb-b399-0242ac130002'
  }
}).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.
  const results = jsonData.data.map(x => { return {...x, time: moment(x.time)} });
  const hightides = results.filter(results => results.type === "high");
  console.table(hightides);


setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()
});
