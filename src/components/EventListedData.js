//import { data } from "../src/assets/sportData.js"

function EventListedData(data) {
  console.log(data);
  let processedData = [];
  Object.values(data).map((data, index) =>
    processedData.push({
      key: index,
      season: data.season,
      homeTeam: Object.values(data.homeTeam)[1],
      awayTeam: Object.values(data.awayTeam)[1],
      homeGoals: Object.values(data.results)[0],
      awayGoals: Object.values(data.results)[1],
      date: data.dateVenue,
      status: data.status
    })
  );

  console.log(processedData)
  return (
    processedData
  )
}

export default EventListedData;
