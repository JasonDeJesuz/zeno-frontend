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
  $('#backtestId').text(backtestId);
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
  const dates = trades.map((trade) => moment(trade.date).format("YYYY-MM-DD"));
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

$(document).ready(function () {
  const randomLaw = getRandomLaw();
  $("#law").text(randomLaw);
});

const lawsOfPower = [
  "Law 1: Never Outshine the Master",
  "Law 2: Never Put Too Much Trust in Friends; Learn How to Use Enemies",
  "Law 3: Conceal Your Intentions",
  "Law 4: Always Say Less Than Necessary",
  "Law 5: So Much Depends on Reputation — Guard It with Your Life",
  "Law 6: Court Attention at All Costs",
  "Law 7: Get Others to Do the Work for You, but Always Take the Credit",
  "Law 8: Make Other People Come to You — Use Bait if Necessary",
  "Law 9: Win Through Your Actions, Never Through Argument",
  "Law 10: Infection: Avoid the Unhappy and Unlucky",
  "Law 11: Learn to Keep People Dependent on You",
  "Law 12: Use Selective Honesty and Generosity to Disarm Your Victim",
  "Law 13: When Asking for Help, Appeal to People’s Self-Interest, Never to Their Mercy or Gratitude",
  "Law 14: Pose as a Friend, Work as a Spy",
  "Law 15: Crush Your Enemy Totally",
  "Law 16: Use Absence to Increase Respect and Honor",
  "Law 17: Keep Others in Suspended Terror: Cultivate an Air of Unpredictability",
  "Law 18: Do Not Build Fortresses to Protect Yourself — Isolation Is Dangerous",
  "Law 19: Know Who You’re Dealing With — Do Not Offend the Wrong Person",
  "Law 20: Do Not Commit to Anyone",
  "Law 21: Play a Sucker to Catch a Sucker — Seem Dumber Than Your Mark",
  "Law 22: Use the Surrender Tactic: Transform Weakness into Power",
  "Law 23: Concentrate Your Forces",
  "Law 24: Play the Perfect Courtier",
  "Law 25: Re-Create Yourself",
  "Law 26: Keep Your Hands Clean",
  "Law 27: Play on People’s Need to Believe to Create a Cultlike Following",
  "Law 28: Enter Action with Boldness",
  "Law 29: Plan All the Way to the End",
  "Law 30: Make Your Accomplishments Seem Effortless",
  "Law 31: Control the Options: Get Others to Play with the Cards You Deal",
  "Law 32: Play to People’s Fantasies",
  "Law 33: Discover Each Man’s Thumbscrew",
  "Law 34: Be Royal in Your Own Fashion: Act Like a King to Be Treated Like One",
  "Law 35: Master the Art of Timing",
  "Law 36: Disdain Things You Cannot Have: Ignoring Them Is the Best Revenge",
  "Law 37: Create Compelling Spectacles",
  "Law 38: Think as You Like but Behave Like Others",
  "Law 39: Stir Up Waters to Catch Fish",
  "Law 40: Despise the Free Lunch",
  "Law 41: Avoid Stepping into a Great Man’s Shoes",
  "Law 42: Strike the Shepherd and the Sheep Will Scatter",
  "Law 43: Work on the Hearts and Minds of Others",
  "Law 44: Disarm and Infuriate with the Mirror Effect",
  "Law 45: Preach the Need for Change, but Never Reform Too Much at Once",
  "Law 46: Never Appear Too Perfect",
  "Law 47: Do Not Go Past the Mark You Aimed For; In Victory, Know When to Stop",
  "Law 48: Assume Formlessness",
];

const getRandomLaw = () => {
  const randomIndex = Math.floor(Math.random() * lawsOfPower.length);
  return lawsOfPower[randomIndex];
};
