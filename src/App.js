import Header from "./components/Header.js";

import { data } from "./assets/sportData.js";

import { Nav } from "./components/Nav.js";
import { RenderDateElement, RenderGameCard } from "./components/Calendar.js";
import useMediaQuery from "./hooks/useMediaQuery.js";

//import sportData from '../src/assets/sportData.json'

function App() {
  const sportData = data;
  const landscapeView = useMediaQuery("(min-width: 600px)");
  console.log(landscapeView)

  const mockData = {
    key: 1,
    homeTeam: { name: "FC Abcdfgh", short: "FCA" },
    awayTeam: { name: "FC Bcd", short: "FCB" },
    status: "played",
    date: "202020",
    time: "20:00",
    result: {
      homeTeam: {
        goals: 2,
        detailedGoals: ["Hans '3", "Paul '71"],
        yellowCards: ["Pogba '42"],
        yellowRedCards: [],
        redCards: [],
      },
      awayTeam: {
        goals: 1,
        detailedGoals: ["Mausi '18", "Bambimatra '29"],
        yellowCards: [],
        yellowRedCards: [],
        redCards: ["Marcello '73"],
      },
    },
    stage: "Round of 16",
    group: 4,
  };
  console.log(mockData);
  return (
    <div className="App">
      <Header />
      <Nav />
      <RenderDateElement date="Tuesday, 2. November 2022" />
      <div className={`${landscapeView ? "grid-cols-2" : "grid-cols-1"} grid  grid-flow-rows gap-4`}>
        <RenderGameCard gameData={mockData} />
        <RenderGameCard gameData={mockData} />
      </div>
      {/* <div>
        <EventListedUI  {...sportData} />
      </div> */}
    </div>
  );
}

export default App;
