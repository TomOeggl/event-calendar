import Header from '../src/components/Header.js'
import EventListed from '../src/components/EventListed.js'
import { data } from '../src/assets/sportData.js'
//import sportData from '../src/assets/sportData.json'

function App() {
  const sportData = data;

  // const mockData = {
  //   name: 'Hockey Game',
  //   testProp: 'Ceck'
  // }
  // console.log(sportData)
  return (
    <div className="App">
      <Header />
      <ul>
        <EventListed  {...sportData} />
      </ul>
    </div>
  );
}

export default App;
