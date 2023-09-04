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
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    return response;
  });
}

$("#update-submit").on("click", async function () {
  const response = await getLoop();
  console.log(response);
});

// $('#refresh-loops').on('click', async function() {
//     const result = await doLoops();
//     document.querySelector("#loops-body").innerHTML = '';
//     const templateLoop = document.querySelector("#loop-body-template").innerHTML;
//     const templateLoopFunc = Handlebars.compile(templateLoop);
//     const loopData = result;
//     loopData.forEach(data => {
//       const templateResult = templateLoopFunc(data);
//       console.log(templateResult);
//       $('#loops-body').append(templateResult);
//     });
//   });
