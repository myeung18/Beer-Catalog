var flags = { "Belgium": "🇧🇪", "Germany": "🇩🇪" };
var baseURL = "http://beer-catalog.staging.app.itix.fr/rest/Beer%20Catalog%20API/0.9"

function initBeerUI(baseURL, headers) {
  $.ajax({
    "url": baseURL + "/beer?page=0",
    "success": function (data, status, xhr) {
      try {
        var count = data.length;
        for (var i = 0; i < count; i++) {
          var flag = flags[data[i].country] ? flags[data[i].country] : "🏳️";
          var rating = "";
          var stop = data[i].rating;
          for (var r = 1; r < stop; r++) {
            rating += "🍺";
          }
          $("<li>").toggleClass("status_" + data[i].status)
                   .text(data[i].name)
                   .prepend($("<span>").text(flag).toggleClass("flag"))
                   .append($("<span>").text(rating).toggleClass("rating"))
                   .appendTo($(".catalog"));
        }
      } catch (e) {
        console.log(e);
      }
    },
    "headers": headers
  });
}
