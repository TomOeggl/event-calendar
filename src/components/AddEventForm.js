import { useState } from "react";

const AddEventForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gameData, setGameData] = useState({});
  const [validations, setValidations] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    time: "",
    sport: "",
  });

  const validateAll = () => {
    const { homeTeam, awayTeam, date, time, sport } = gameData;
    const validations = {
      homeTeam: "",
      awayTeam: "",
      date: "",
      time: "",
      sport: "",
    };
    let isValid = true;
    const isValidDate =
      /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g;
    const isValidTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!homeTeam) {
      validations.homeTeam = "Home Team is required";

      setValidations((prevVal) => ({
        ...prevVal,
        homeTeam: validations.homeTeam,
      }));
      isValid = false;
    }
    if (!awayTeam) {
      validations.awayTeam = "Away Team is required";

      setValidations((prevVal) => ({
        ...prevVal,
        awayTeam: validations.awayTeam,
      }));
      isValid = false;
    }

    if (!date || date.match(isValidDate) === null) {
      validations.date = "Please enter a valid date";

      setValidations((prevVal) => ({ ...prevVal, date: validations.date }));
      isValid = false;
    }

    if (!time || time.match(isValidTime) === null) {
      validations.time = "Please enter a valid time";

      setValidations((prevVal) => ({ ...prevVal, time: validations.time }));
      isValid = false;
    }

    if (!sport) {
      validations.sport = "Please select a sport";

      setValidations((prevVal) => ({ ...prevVal, sport: validations.sport }));
      isValid = false;
    }

    if (isValid) {
      setValidations(validations);
    }

    return isValid;
  };

  const handleClick = () => {
    setIsOpen((prev) => {return !prev});
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setGameData((prevData) => ({ ...prevData, [name]: value }));
    console.log(gameData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();

    if (!isValid) {
      return false;
    }

    props.handleSave(gameData);
    setGameData((prevData) => ({
      ...prevData,
      homeTeam: "",
      awayTeam: "",
      date: "",
      time: "",
      venue: "",
      sport: "",
    }));
    setIsOpen((prev) => {return !prev});
  };

  const {
    homeTeam: homeTeamVal,
    awayTeam: awayTeamVal,
    date: dateVal,
    time: timeVal,
    sport: sportVal,
  } = validations;

  const domElements = Object.freeze({
    addEventButton: <button className=" custom-btn w-screen my-0 py-2 rounded-none" onClick={handleClick}>{isOpen ? "Close" : "Add Event +"}</button>,
    innerForm: (
      <form className=" lg:px-2 py-2 grid grid-cols-2 grid-flow-row justify-items-stretch gap-4 w-5/6 md:max-w-4xl mx-auto pt-6">
        <div className="">
          {/* <label htmlFor="homeTeam" className="pr-2">HomeTeam</label> */}

          <input
            className="custom-input-field"
            type="text"
            placeholder="Home Team"
            name="homeTeam"
            value={gameData.homeTeam}
            onChange={handleChange}
          />
          <span className="italic pl-1 text-red-600 text-sm">
            {homeTeamVal}
          </span>
        </div>

        <div className="">
          {/* <label htmlFor="homeTeam" className="pr-2">HomeTeam</label> */}
          <input
            className="custom-input-field"
            type="text"
            placeholder="Away Team"
            name="awayTeam"
            value={gameData.awayTeam}
            onChange={handleChange}
          />
          <span className="italic pl-1 text-red-600 text-sm">
            {awayTeamVal}
          </span>
        </div>
        <div className="">
          {/* <label htmlFor="homeTeam" className="pr-2">HomeTeam</label> */}
          <input
            className="custom-input-field"
            type="text"
            placeholder="DD.MM.YYYY"
            name="date"
            value={gameData.date}
            onChange={handleChange}
          />
          <span className="italic pl-1 text-red-600 text-sm">{dateVal}</span>
        </div>
        <div className="">
          {/* <label htmlFor="homeTeam" className="pr-2">HomeTeam</label> */}
          <input
            className="custom-input-field"
            type="text"
            placeholder="HH:MM"
            name="time"
            value={gameData.time}
            onChange={handleChange}
          />
          <span className="italic pl-1 text-red-600 text-sm">{timeVal}</span>
        </div>
        <div className="">
          {/* <label htmlFor="homeTeam" className="pr-2">HomeTeam</label> */}
          <input
            className="custom-input-field"
            type="text"
            placeholder="Venue"
            name="venue"
            value={gameData.venue}
            onChange={handleChange}
          />
        </div>
        <div>
          <select
            menuPlacement="bottom"
            className="custom-input-field pb-2"
            name="sport"
            onChange={handleChange}
            value={gameData.sport}
            defaultValue=""
          > 
            <option value="" disabled hidden>
              Choose a sport{" "}
            </option>
            <option key="soccer" value="soccer">
              Soccer
            </option>
            <option key="football" value="football">
              Football
            </option>
            <option key="hockey" value="hockey">
              Hockey
            </option>
            <option key="quidditch" value="quidditch">
              Quidditch
            </option>
          </select>
          <div className="italic pl-1 text-red-600 text-sm">{sportVal}</div>
        </div>

        <div className=" col-span-2 lg:mx-auto lg:w-10/12 lg:justify-items-center">
          <button className="custom-btn w-full lg:w-full" type="submit" onClick={handleSubmit}>
            Save Event
          </button>
        </div>
      </form>
    ),
    test: null,
  });
  return (
    <div className=" bg-gradient-to-tr from-green-700 to-green-600">
      <div>{domElements.addEventButton}</div>
      <div>{isOpen && domElements.innerForm}</div>
    </div>

    
  );
};
export default AddEventForm;
