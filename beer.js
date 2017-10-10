define(function(require, exports, module) {
module.exports = function () {
  var flags = require("flags.js");
  var config = require("config.js");
  $.ajax({
    "url": config.baseURL + "/beer?page=0" + (config.extraQueryStringSuffix != null ? "&" + config.extraQueryStringSuffix : ""),
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
    "headers": config.additionalHeaders != null ? config.additionalHeaders : {}
  });
};
});
