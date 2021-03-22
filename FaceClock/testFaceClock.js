const lat = 41.31539571168505;
const lng = -73.37471490164708;
const today = new moment().subtract(2, 'days').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const endDate = new moment().add(5, 'days').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${today}&end=${endDate}`, {
  headers: {
    'Authorization': '367bea9c-7aa0-11eb-b399-0242ac130002-367beb64-7aa0-11eb-b399-0242ac130002'
  }
}).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.
  const results = jsonData.data.map(x => { return {...x, time: moment(x.time)} });
  const hightides = results.filter(results => results.type === "high");
  const now = moment()
  const whereWouldNowBe = hightides.findIndex(elem => elem.time.isAfter(now));
  console.log(whereWouldNowBe)
  const prevHigh = moment(hightides[whereWouldNowBe - 1].time._d);
  const nextHigh = moment(hightides[whereWouldNowBe].time._d);
  console.log(prevHigh, nextHigh);


setInterval(setClock, 60000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')


function setClock() {
  const currentTide = nextHigh.diff(now, 'minutes');
  console.log(currentTide);
  const minutesRatio = (currentTide.minutes()) / 60
  const hoursRatio = (minutesRatio + currentTide.hours()) / 12
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()
});
