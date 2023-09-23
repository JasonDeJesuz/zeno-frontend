// ** AXIOS EXAMPLE **

async function fetchBacktest(sessiondId) {
  const settings = {
    async: true,
    crossDomain: true,
      url: "https://ill-tan-cockatoo-boot.cyclic.cloud/fetchBacktest?id=${sessiondId}",
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
  return profitNorm.charAt(0) === '-' ? 'text-red-500' : 'text-green-500';
});
