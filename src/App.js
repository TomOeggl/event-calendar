import Header from "./components/Header.js";
import { CalendarWrapper } from "./components/CalendarWrapper.js";

function App() {
  return (
    <div className="App h-full xl:h-screen pb-16 bg-gradient-to-b from-gray-100 to-gray-300">
      <Header />
      <CalendarWrapper />
    </div>
  );
}

export default App;
