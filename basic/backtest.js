// ** AXIOS EXAMPLE **

async function fetchBacktest(sessiondId) {
  const settings = {
    async: true,
    crossDomain: true,
       url: `https://ill-tan-cockatoo-boot.cyclic.cloud/fetchBacktest?id=${sessiondId}`,
    // url: `http://localhost:3000/fetchBacktest?id=${sessiondId}`,
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

$(document).ready(async function () {
  const backtestId = getUrlParameter("id");
  const backtestData = await fetchBacktest(backtestId);
  const trades = backtestData.trades;
  addLineChart(trades);
  addBankLineChart(trades);
  document.querySelector("#trades-body").innerHTML = "";
  const templateLoop = document.querySelector(
    "#trades-body-template"
  ).innerHTML;
  const templateLoopFunc = Handlebars.compile(templateLoop);
  trades?.forEach((data) => {
    const templateResult = templateLoopFunc(data);
    $("#trades-body").append(templateResult);
  });
});

function addLineChart(trades) {
  console.log({ trades });
  // Extracting dates and profits for the chart
  const dates = trades.map((trade) =>
    new Date(trade.date).toLocaleDateString()
  );
  const profits = trades.map((trade) => trade.proift);

  // Create a Chart.js instance
  const ctx = document.getElementById("profitLineChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Profit",
          data: profits,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Profit",
          },
        },
      },
    },
  });
}

function addBankLineChart(trades) {
  // Extracting dates and bank values for the chart
  const dates = trades.map((trade) =>
    moment(trade.date).format("YYYY-MM-DD")
  );
  const banks = trades.map((trade) => trade.bank);

  // Create a Chart.js instance for the bank chart
  const bankCtx = document.getElementById("bankChart").getContext("2d");
  const bankChart = new Chart(bankCtx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bank Value",
          data: banks,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Bank Value",
          },
        },
      },
    },
  });
}

function fillInfo(info) {
  $("#start-date-input").val(info.startDate);
  $("#end-date-input").val(info.endDate);
  $("#spreads-input").val(info.bankSpread);
  $("#deposits-input").val(info.deposit);
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

Handlebars.registerHelper("profitClass", function (profitNorm) {
  return profitNorm.charAt(0) === "-" ? "text-red-500" : "text-green-500";
});
