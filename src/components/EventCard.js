import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { DetailView } from "./DetailView";


const EventCard = ({ gameData }) => {
    const isTablet = useMediaQuery("(min-width: 640px)");
    const scheduled = gameData.result === undefined;
    const [showDetailView, setShowDetailView] = useState(false);
   
    function getLogo(slug) {
      let path;
      path = "./logos/" + slug + "-logo.png"
      return (path);
    }
  

    const renderClub = Object.freeze({
      horizontal: {
        homeTeam: (
          <div className="custom-club-name text-lg col-span-5 text-right ">
            {gameData.homeTeam.name}
            <img
              src={getLogo(gameData.homeTeam.logo)}
              alt={`${gameData.homeTeam.name} Logo`}
              className="custom-club-logo"
            ></img>
          </div>
        ),
        awayTeam: (
          <div className="custom-club-name text-lg col-span-5 text-left ">
            <img
              src={getLogo(gameData.awayTeam.logo)}
              alt={`${gameData.awayTeam.name} Logo`}
              className="custom-club-logo"
            ></img>
            {gameData.awayTeam.name}
          </div>
        ),
      },
      vertical: {
        homeTeam: (
          <div className="custom-club-name col-span-5 text-right grid grid-cols-1 justify-items-center">
            <img
              src={getLogo(gameData.homeTeam.logo)}
              alt={`${gameData.homeTeam.name} Logo`}
              className="custom-club-logo"
            ></img>
            <div className="text-xl font-semibold">{gameData.homeTeam.name}</div>
          </div>
        ),
        awayTeam: (
          <div className="custom-club-name col-span-5 text-left  grid grid-cols-1 justify-items-center">
            <img
              src={getLogo(gameData.awayTeam.logo)}
              alt={`${gameData.awayTeam.name} Logo`}
              className="custom-club-logo"
            ></img>
            <div className="text-xl font-semibold">{gameData.awayTeam.name}</div>
          </div>
        ),
      },
    });
  
    //in center display time if scheduled or result if played (homeTeam : awayTeam)
    const centralDisplay = scheduled ? (
      `${gameData.time}`
    ) : (
      <div className="grid grid-cols-12 px-1">
        <p className=" col-span-5 text-right pr-1 ">
          {gameData.result.homeTeam.goals}
        </p>
        <p className=" col-span-2 col-start-6 text-center"> - </p>
        <p className=" col-span-5 text-left pl-1">
          {gameData.result.awayTeam.goals}
        </p>
      </div>
    );

    const detailsButton = (
      <button
        className={`${
          showDetailView && !isTablet && "border-b-4 border-green-900 rounded-none"
        } custom-btn`}
        onClick={() => setShowDetailView(!showDetailView)}
      >
        {showDetailView ? "Hide" : "Details"}
      </button>
    );

    const saveToCalendarButton = (
      <button
        className="custom-btn"
        onClick={() => alert("Saved to your Calender")}
      >
        Save to Calendar +
      </button>
    );
  
    return (
      <div
        className={`${isTablet && " w-full m-auto "}  custom-event-card `}
        key={gameData.key}
      >
        <div className=" text-center ">
          <div className="grid grid-cols-3 mx-2 lg:mx-1 mt-1 px-1 mb-2 border-b-2 border-green-900 text-lg font-semibold">
            <span className="col-span-1 text-left"> {gameData.date} </span>
            <span className="col-span-1 italic uppercase text-green-900 ">
              {gameData.sport}
            </span>
            <span className=" col-span-1 text-right">{gameData.stage}</span>
          </div>
          <div className="grid grid-cols-12 font-semibold">
            {isTablet
              ? renderClub.horizontal.homeTeam
              : renderClub.vertical.homeTeam}
            <div className=" col-span-2 font-bold pt-4 md:pt-2 text-xl mx-0 mt-2">
              {centralDisplay}{" "}
            </div>
            {isTablet
              ? renderClub.horizontal.awayTeam
              : renderClub.vertical.awayTeam}
          </div>
          {!scheduled ? detailsButton : saveToCalendarButton}
        </div>
        {showDetailView && <DetailView gameData={gameData} />}
      </div>
    );
  };

  export {EventCard};