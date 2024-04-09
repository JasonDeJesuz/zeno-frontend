// ** AXIOS EXAMPLE **

async function getLoop() {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://zeno-arb-backend-production.up.railway.app/getLoop",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data: {
      deposit: parseFloat($("#deposit-input").val()),
      centsDiff: parseFloat($("#spread-input").val()),
    },
  };

  return $.ajax(settings).done(function (response) {
    return response;
  });
}
