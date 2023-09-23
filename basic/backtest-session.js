// ** AXIOS EXAMPLE **

async function getHistoricalLoopsAdvancedApp() {
  console.log({
    startDate: $("#start-date-input").val(),
    endDate: $("#end-date-input").val(),
    spreads: $("#spreads-input").val(),
    startingCapitals: $("#deposits-input").val(),
    includeLoses: true,
    returnTrades: true,
    loops: 1,
  });
  const settings = {
    async: true,
    crossDomain: true,
    //   url: "https://ill-tan-cockatoo-boot.cyclic.cloud/getHistoricalLoopsAdvancedApp",
    url: "http://localhost:3000/getHistoricalLoopsAdvancedApp",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      startDate: $("#start-date-input").val(),
      endDate: $("#end-date-input").val(),
      spreads: $("#spreads-input").val(),
      startingCapitals: $("#deposits-input").val(),
      includeLoses: $('#loses-input').val() === "true",
      returnTrades: true,
      loops: 1,
    }),
  };

  return $.ajax(settings).done(function (response) {
    return response;
  });
}

async function fetchBacktest(sessiondId) {
  const settings = {
    async: true,
    crossDomain: true,
      url: "https://ill-tan-cockatoo-boot.cyclic.cloud/fetchBacktestSession?id=${sessiondId}",
    // url: `http://localhost:3000/fetchBacktestSession?id=${sessiondId}`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  return $.ajax(settings).done(function (response) {
    return response;
  });
}

$("#backtest-btn").on("click", async function () {
  const sessionCreationData = await getHistoricalLoopsAdvancedApp();
  const sessionData = await fetchBacktest(sessionCreationData.sessionId);
  const backtests = sessionData.backtests;
  document.querySelector("#backtests-body").innerHTML = "";
  const templateLoop = document.querySelector(
    "#backtests-body-template"
  ).innerHTML;
  const templateLoopFunc = Handlebars.compile(templateLoop);
  backtests?.forEach((data) => {
    const templateResult = templateLoopFunc(data);
    $("#backtests-body").append(templateResult);
  });
});
