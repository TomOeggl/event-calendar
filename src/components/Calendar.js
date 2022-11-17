import { useState } from "react";
import { data } from "../assets/sportData";

import soccerIcon from "../assets/customIcons/soccer-icon.png";
import yellowIcon from "../assets/customIcons/yellow.png";
import yellowRedIcon from "../assets/customIcons/yellow-red.png";
import redIcon from "../assets/customIcons/red.png";

import useMediaQuery from "../hooks/useMediaQuery";

const CalendarWrapper = () => {
  function convertData(rawData) {
    let convertedData = [];
    rawData.map((rawElement, i) => {
      let convertedElement = {
        key: i,
        status: rawElement.status,
        date: rawElement.dateVenue,
        time: rawElement.timeVenueUTC,
        stage: rawElement.stage.name,
        group: rawElement.stage.ordering,
        homeTeam: {
          name: rawElement.homeTeam.name,
          short: rawElement.homeTeam.abbreviation,
          logo: rawElement.homeTeam.slug,
          countryCode: rawElement.homeTeam.teamCountryCode,
        },
        awayTeam: {
          name: rawElement.awayTeam.name,
          short: rawElement.awayTeam.abbreviation,
          logo: rawElement.awayTeam.slug,
          countryCode: rawElement.awayTeam.teamCountryCode,
        },
        result: {
          winner: rawElement.result.winner,
          homeTeam: {
            goals: rawElement.result.homeGoals,
            detailedGoals: rawElement.result.goals.homeTeam,
            yellowCards: rawElement.result.yellowCards.homeTeam,
            yellowRedCards: rawElement.result.secondYellowCards.homeTeam,
            redCards: rawElement.result.directRedCards.homeTeam,
          },
          awayTeam: {
            goals: rawElement.result.awayGoals,
            detailedGoals: rawElement.result.goals.awayTeam,
            yellowCards: rawElement.result.yellowCards.awayTeam,
            yellowRedCards: rawElement.result.secondYellowCards.awayTeam,
            redCards: rawElement.result.directRedCards.awayTeam,
          },
        },
      };
      if (rawElement.status === "scheduled") {
        delete convertedElement.result;
      }
      if (rawElement.homeTeam === "-") {
        convertedElement.homeTeam.name = " ? ";
        convertedElement.homeTeam.logo = "placeholder";
      }
      if (rawElement.awayTeam === "-") {
        convertedElement.awayTeam.name = " ? ";
        convertedElement.awayTeam.logo = "placeholder";
      }
      convertedData.push(convertedElement);
    });
    return convertedData;
  }
  const [eventData, setEventData] = useState(convertData(data));

  return (
    <div className="md:grid-cols-2 grid-cols-1 grid  grid-flow-rows gap-4 mt-4">
      {eventData.map((game) => {
        return <RenderGameCard gameData={game} />;
      })}
    </div>
  );
};

const InfoBlock = ({ gameData }) => {
  const homeResults = gameData.result.homeTeam;
  const awayResults = gameData.result.awayTeam;

  const customSoccerIcon = (
    <span className=" text-center inline-block">
      <img
        src={soccerIcon}
        alt="Custom made soccer Icon"
        className="object-scale-down w-6 h-6"
      ></img>
    </span>
  );
  const customYellowCardIcon = (
    <span className=" text-center inline-block">
      <img
        src={yellowIcon}
        alt="Custom made yellow card Icon"
        className="object-scale-down w-6 h-6"
      ></img>
    </span>
  );
  const customYellowRedCardIcon = (
    <span className=" text-center inline-block">
      <img
        src={yellowRedIcon}
        alt="Custom made yellow card Icon"
        className="object-scale-down w-6 h-6"
      ></img>
    </span>
  );
  const customRedCardIcon = (
    <span className=" text-center inline-block">
      <img
        src={redIcon}
        alt="Custom made yellow card Icon"
        className="object-scale-down w-6 h-6"
      ></img>
    </span>
  );

  //row displaying centered divider

  function centeredRow(home, divider, away, styleModifier) {
    return styleModifier !== "outward" ? (
      <div className="grid grid-cols-12 py-2 border-b border-black">
        <p className=" col-span-5 text-right">{handleArray(home)}</p>
        <p className=" col-span-2 col-start-6 text-center"> {divider} </p>
        <p className=" col-span-5 text-left">{handleArray(away)}</p>
      </div>
    ) : (
      <div className="grid grid-cols-12 px-1">
        <p className=" col-span-5 text-left italic font-semibold">{handleArray(home)}</p>
        <p className=" col-span-2 col-start-6 text-center"> {divider} </p>
        <p className=" col-span-5 text-right italic font-semibold">{handleArray(away)}</p>
      </div>
    );
  }

  function handleArray(resultsArray) {
    if (resultsArray === undefined) {
      return "-";
    } else if (resultsArray.length == 0) {
      return "-";
    } else if (typeof resultsArray === "string") {
      return resultsArray;
    } else {
      let sumString = "";
      let connector = ", ";
      resultsArray.map((element, i) => {
        if (i == resultsArray.length - 1) {
          connector = "";
        }
        sumString += element + connector;
      });
      return sumString;
    }
  }

  return (
    <div className=" bg-gray-200 ">
      {centeredRow(
        homeResults.detailedGoals,
        customSoccerIcon,
        awayResults.detailedGoals
      )}
      {centeredRow(
        homeResults.yellowCards,
        customYellowCardIcon,
        awayResults.yellowCards
      )}
      {centeredRow(
        homeResults.yellowRedCards,
        customYellowRedCardIcon,
        awayResults.yellowRedCards
      )}
      {centeredRow(
        homeResults.redCards,
        customRedCardIcon,
        awayResults.redCards
      )}
      {centeredRow(gameData.stage, "", "2. Nov 2022", "outward")}
      {centeredRow("UEFA Champions League", "", gameData.time, "outward")}
    </div>
  );
};

const RenderGameCard = ({ gameData }) => {
  const isTablet = useMediaQuery("(min-width: 500px)");
  //when the game is still scheduled there can be no detailed result view
  const scheduled = gameData.result === undefined;
  //detail view toggle
  const [detailView, setView] = useState(false);
  //subcomponent code

  function getLogo(slug) {
    let path;
    return (path = "/logos/" + slug + "-logo.png");
  }

  //easy to access by const.key.etc or const[key][etc] => view = state
  const renderClub = Object.freeze({
    mini: {
      //always left, logo toward center in one line
      homeTeam: (
        <div className=" col-span-5 text-right ">
          {gameData.homeTeam.name}
          <img
            src={getLogo(gameData.homeTeam.logo)}
            alt={`${gameData.homeTeam.name} Logo`}
            className=" object-scale-down w-10 h-10 inline-block mx-1"
          ></img>
        </div>
      ),
      //always right, logo toward center in one line
      awayTeam: (
        <div className=" col-span-5 text-left ">
          <img
            src={getLogo(gameData.awayTeam.logo)}
            alt={`${gameData.awayTeam.name} Logo`}
            className=" object-scale-down w-10 h-10 inline-block mx-1"
          ></img>
          {gameData.awayTeam.name}
        </div>
      ),
    },
  });

  //in center display time if scheduled or result if played (homeTeam : awayTeam)
  const centralDisplay = scheduled ? (
    `${gameData.time}`
  ) : (
    <div className="grid grid-cols-12   px-1">
      <p className=" col-span-5 text-right pr-1">
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
      className=" shadow-md border-blue-600 bg-blue-200 hover:bg-blue-400 rounded-md px-4 py-1 my-2"
      onClick={() => setView(!detailView)}
    >
      {detailView ? "Hide" : "Details"}
    </button>
  );
  const saveToCalendarButton = (
    <button
      className=" shadow-md border-blue-600 bg-blue-200 hover:bg-blue-400 rounded-md px-4 py-1 my-2"
      onClick={() => alert("Saved to your Calender")}
    >
      Save to Calendar +
    </button>
  );

  return (
    <div
      className={`${
        isTablet && "w-10/12 m-auto "
      }  shadow-xl p-1 bg-gray-200 hover:bg-gray-300 rounded-lg `}
      key={gameData.key}
    >
      <div className=" text-center ">
        <div className="grid grid-cols-2 mx-1 mt-1 border-b-2 border-gray-400 mb-2">
          <span className="col-span-1 text-left"> {gameData.date} </span>{" "}
          <span className=" col-span-1 text-right">{gameData.stage}</span>
        </div>
        <div className="grid grid-cols-12 py-2 font-semibold">
          {renderClub.mini.homeTeam}
          <div className=" col-span-2 text-xl mx-2 mt-2">{centralDisplay} </div>
          {renderClub.mini.awayTeam}
        </div>
        {!scheduled ? detailsButton : saveToCalendarButton}
      </div>
      {detailView && <InfoBlock gameData={gameData} />}
    </div>
  );
};

const RenderDateElement = ({ date }) => {
  //implement format date function
  return <p className=" capitalize text-2xl underline my-1"> {date}</p>;
};

export { CalendarWrapper, RenderGameCard, RenderDateElement, InfoBlock };
