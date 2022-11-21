import { useState } from "react";
import { data } from "../assets/sportData";
import { EventCard } from "./EventCard";
import AddEventForm from "./AddEventForm";
import Nav from "./Nav";
import {
  convertData,
  getFormatedDate,
  getStandardDate,
} from "../utils/dataConversionFunctions";

const CalendarWrapper = () => {
  const [eventData, setEventData] = useState(convertData(data));

  const addNewEventData = (newEventData) => {
    let newEvent = {
      homeTeam: {
        name: newEventData.homeTeam,
        short: null,
        logo: "placeholder",
        countryCode: null,
      },
      awayTeam: {
        name: newEventData.awayTeam,
        short: null,
        logo: "placeholder",
        countryCode: null,
      },
      date: newEventData.date,
      time: newEventData.time,
      sport: newEventData.sport,
      status: "scheduled",
      group: "",
      stage: "",
      key: 12,
    };

    if (newEventData.venue !== undefined) {
      newEvent.stage = "@ " + newEventData.venue;
    }
    newEvent.standardDate = getStandardDate(
      newEventData.date,
      newEventData.time
    );
    newEvent.date = getFormatedDate(newEvent.standardDate);

    setEventData((prevData) => {
      let dummy = Array.from(prevData);
      dummy.push(newEvent);
      const sortedDummy = dummy.sort((a, b) => a.standardDate - b.standardDate);
      return sortedDummy;
    });
    console.log(eventData);
  };

  const handleSave = (newEventData) => {
    addNewEventData(newEventData);
  };

  return (
    <div className="">
      <Nav />
      <AddEventForm handleSave={handleSave} />
      <div className=" lg:grid-cols-2 grid-cols-1 grid  grid-flow-rows gap-8 mt-4 lg:max-w-screen-lg mx-auto">
        {eventData.map((game) => {
          return <EventCard gameData={game} />;
        })}
      </div>
    </div>
  );
};

export { CalendarWrapper };
