function convertData(rawData) {
  let convertedData = [];
  rawData.map((rawElement, i) => {
    let convertedElement = {
      key: i,
      sport: "",
      status: rawElement.status,
      date: rawElement.dateVenue,
      time: rawElement.timeVenueUTC,
      stage: rawElement.stage.name,
      group: rawElement.stage.ordering,
      tournament: rawElement.originCompetitionName,
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
    convertedElement.standardDate = getStandardDate(
      rawElement.dateVenue,
      rawElement.timeVenueUTC
    );
    if (rawElement.sport === "quidditch") {
      convertedElement.sport = "quidditch";
    } else {
      convertedElement.sport = "soccer";
    }
    convertedElement.date = getFormatedDate(convertedElement.standardDate);
    convertedData.push(convertedElement);
  });

  return convertedData;
}

function getStandardDate(rawDate, rawTime) {
  let dashDateArray = rawDate.split("-");
  let dotDateArray = rawDate.split(".");
  let timeArray = rawTime.split(":");
  let standardDate = "";

  if (dashDateArray.length > 1) {
    dashDateArray.map((e) => {
      if (e !== undefined) {
        standardDate += e;
      }
    });
  }
  if (dotDateArray.length > 1) {
    dotDateArray.map((e) => {
      if (e !== undefined) {
        standardDate = e + standardDate;
      }
    });
  }
  if (timeArray.length > 1) {
    timeArray.map((e) => {
      if (e !== undefined) {
        standardDate += e;
      }
    });
  }

  return standardDate;
}

function getFormatedDate(standardDate) {
  let dateOnly = standardDate.substring(0, 8);
  let day = dateOnly.substring(6, 8);
  let month = dateOnly.substring(4, 6);
  let year = dateOnly.substring(0, 4);

  let monthString = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return day + ". " + monthString[parseInt(month)] + " " + year;
}

export {convertData, getFormatedDate, getStandardDate}
