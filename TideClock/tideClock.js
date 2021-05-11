const lat = 41.31539571168505;
const lng = -73.37471490164708;
const startDate = new moment().subtract(2, 'days').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const endDate = new moment().add(5, 'days').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${startDate}&end=${endDate}`, {
  headers: {
    'Authorization': '367bea9c-7aa0-11eb-b399-0242ac130002-367beb64-7aa0-11eb-b399-0242ac130002'
  }
}).then((response) => response.json()).then((jsonData) => {
  const results = jsonData.data.map(x => { return {...x, time: moment(x.time)} });
  const hightides = results.filter(results => results.type === "high");
  //Above is a fetch request to an external API. 
  //The .then methods are manipulating the relevant data from that response to give the program what it needs.
  //Ideally this should be in a back-end server, or at least not public facing, to protect
  //information such as the clients exact position and the Authorization token for this API.
  //for the purposes of simplicity and readability, it is done here.

setInterval(setClock, 60000);

function setClock() {
  const now = moment();
  const whereNowWouldBe = hightides.findIndex(elem => elem.time.isAfter(now));
  console.log(whereNowWouldBe);
  const prevHigh = moment(hightides[whereNowWouldBe - 1].time._d);
  const nextHigh = moment(hightides[whereNowWouldBe].time._d);
  console.log(prevHigh, nextHigh);
  //Above is basically "injecting" the current time into the array of tide events and providing the two
  //elements of the array the current time would sit between

  const clockHand = document.querySelector('[data-clock-hand]');
  const tideDuration = nextHigh.diff(prevHigh, 'minutes');
  const currentTide =  now.diff(nextHigh, 'minutes');
  const tideRatio = (currentTide / tideDuration);
  //With all the information, these consts determine the distance in time both from one high tide to the next,
  //and the number of minutes the current time lies between those two events, while the Ratio returns a 
  //negative decimal to inform the needle's placement on the clockface.
  
  console.log(tideDuration);
  console.log(currentTide);
  console.log(tideRatio);
  // these logs here were for testing as the project was coming together,
  // they are being left in so its easy for someone to see whats being done, and when.
  setRotation(clockHand, tideRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()
});
