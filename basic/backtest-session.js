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
    url: "https://ill-tan-cockatoo-boot.cyclic.cloud/getHistoricalLoopsAdvancedApp",
    //url: "http://localhost:3000/getHistoricalLoopsAdvancedApp",
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
      includeLoses: $("#loses-input").val() === "true",
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
    url: `https://ill-tan-cockatoo-boot.cyclic.cloud/fetchBacktestSession?id=${sessiondId}`,
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
  // Disable the button to prevent multiple clicks
  $("#backtest-btn").prop("disabled", true);

  // Add a loader to the button
  const originalButtonHTML = $("#backtest-btn").html();
  $("#backtest-btn").html(
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
  );

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

  // Restore the original button HTML and re-enable the button
  $("#backtest-btn").html(originalButtonHTML);
  $("#backtest-btn").prop("disabled", false);
});

$(document).ready(function () {
  $("#law").text(getRandomLaw);
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
