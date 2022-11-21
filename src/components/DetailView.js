import CustomIcon from "./CustomIcon";

const DetailView = ({ gameData }) => {
    const homeResults = gameData.result.homeTeam;
    const awayResults = gameData.result.awayTeam;
  
    function centeredRow(home, divider, away, styleModifier) {
      return styleModifier !== "outward" ? (
        <div className="grid grid-cols-12 py-2 border-b border-black">
          <p className=" col-span-5 text-right">{handleArray(home)}</p>
          <p className=" col-span-2 col-start-6 text-center"> {divider} </p>
          <p className=" col-span-5 text-left">{handleArray(away)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 px-4">
          <p className=" col-span-5 text-left italic py-0 font-semibold uppercase">
            {handleArray(home)}
          </p>
          <p className=" col-span-2 col-start-6 text-center"> {divider} </p>
          <p className=" col-span-5 text-right italic font-semibold">
            {handleArray(away)}
          </p>
        </div>
      );
    }
  
    function handleArray(resultsArray) {
      if (resultsArray === undefined) {
        return "-";
      } else if (resultsArray.length === 0) {
        return "-";
      } else if (typeof resultsArray === "string") {
        return resultsArray;
      } else {
        let sumString = "";
        let connector = ", ";
        resultsArray.map((element, i) => {
          if (i === resultsArray.length - 1) {
            connector = "";
          }
          sumString += element + connector;
        });
        return sumString;
      }
    }
  
    return (
      <div className=" bg-green-700 text-white rounded-b-lg">
        {centeredRow(
          homeResults.detailedGoals,
          <CustomIcon selectedIcon={"soccer-ball"}/>,
          awayResults.detailedGoals
        )}
        {centeredRow(
          homeResults.yellowCards,
          <CustomIcon selectedIcon={"yellow-card"}/>,
          awayResults.yellowCards
        )}
        {centeredRow(
          homeResults.yellowRedCards,
          <CustomIcon selectedIcon={"yellow-red-card"}/>,
          awayResults.yellowRedCards
        )}
        {centeredRow(
          homeResults.redCards,
          <CustomIcon selectedIcon={"red-card"}/>,
          awayResults.redCards
        )}
        <div className="py-2">
          {centeredRow(gameData.stage, "", gameData.date, "outward")}
          {centeredRow(gameData.tournament, "", gameData.time, "outward")}
        </div>
      </div>
    );
  };

  export {DetailView};