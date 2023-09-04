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

$("#update-submit").on("click", async function () {
  const loopData = await getLoop();
  document.querySelector("#loops-body").innerHTML = "";
  const templateLoop = document.querySelector("#loop-body-template").innerHTML;
  const templateLoopFunc = Handlebars.compile(templateLoop);
  console.log(loopData);
  loopData?.forEach((data) => {
    const templateResult = templateLoopFunc(data);
    console.log(templateResult);
    $("#loops-body").append(templateResult);
  });
});
