import { data } from "../assets/sportData";

function EventListedUI(eventData) {
  var latestDate;

  function processData(eventData) {
    let processedData = [];
    Object.values(eventData).map((game, index) =>
      processedData.push({
        key: index,
        season: game.season,
        homeTeam: Object.values(game.homeTeam)[1],
        awayTeam: Object.values(game.awayTeam)[1],
        
        date: game.dateVenue,
        status: game.status,
        dateDisplayed: false,
      })
      
      // (game.status == "played")? {
      //   processedData.push({
      //   homeGoals: Object.values(game.results)[0],
      //   awayGoals: Object.values(game.results)[1], })
      // }  
    );

    console.log(processedData);
    return processedData;
  }

  return Object.values(processData(eventData)).map((data, i) =>
    htmlEventCard(data)
  );

  // contains the individual event 'cards' html code
  function htmlEventCard(data) {
    return (
      <div className="border-b-2 px-1 py-1" key={data.key}>
        <span className=" inline-block ">
          <p className=" w-56 font-bold">{data.homeTeam}</p>
          <p className=" w-56 font-bold">{data.awayTeam}</p>
        </span>
        <span className=" inline-block right ">
          <p>{data.date}</p>
          <label className=" bg-indigo-500 p-1">{data.status}</label>
        </span>
      </div>
    );
  }
}

export default EventListedUI;
