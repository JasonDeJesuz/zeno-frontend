// ** AXIOS EXAMPLE **

async function getLoop() {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://ill-tan-cockatoo-boot.cyclic.cloud/getLoop",
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
