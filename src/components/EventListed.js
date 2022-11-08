function EventListed(eventData) {
  return (
    <ul>
      {Object.values(eventData).map((data, i) =>
        data.homeTeam !== null ? (
          <li className=" bg-green-900" key={i}>
            {" "}
            {Object.values(data.homeTeam)[1]} vs{" "}
            {Object.values(data.awayTeam)[1]} Status: {data.status}{" "}
          </li>
        ) : (
          <li className=" bg-green-900" key={i}>
            {"  ? "} vs {Object.values(data.awayTeam)[1]} Status: {data.status}{" "}
          </li>
        )
      )}
    </ul>
  );
}

export default EventListed;
