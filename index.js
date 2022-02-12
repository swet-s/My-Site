// $("h1").text("Hue Hue!");
// $("h1").html("<em>Hue Hue!</em>");
// $(".display-image").attr("src", "res/myicon.png");
// $(document).keypress(function(evt) {
//   console.log(evt.key);
// });


$(".display-image").on("click", function() {

  if (!$(".display-image").hasClass("selected-image")) {
    $(".push-down").animate({
      height: "70px"
    }, 100, "swing", function() {
      $(".push-down").css("height", "0");
      $(".display-image").addClass("selected-image");
      $(".display-image").animate({
        width: "50%",
        marginTop: "50px",
        marginBottom: "20px",
        marginLeft: "25%",
        marginRight: "25%",
        borderRadius: "10%"
      }, 400);
    });

  } else {
    $(".display-image").animate({
      width: "40px",
      marginTop: "15px",
      marginBottom: "15px",
      marginLeft: "10px",
      marginRight: "10px",
      borderRadius: "100%"
    }, 600);

    $(".push-down").css("height", calculateHeight(".display-image"));
    $(".display-image").removeClass("selected-image");
    $(".push-down").animate({
      height: 0
    }, 600);
  }
});

function calculateHeight(imageClass) {
  // calculate final height after the first animation
  totalHeight = parseFloat($(imageClass).css("width"));
  totalHeight += parseFloat($(imageClass).css("margin-top"));
  totalHeight += parseFloat($(imageClass).css("margin-bottom"));
  toString(totalHeight);
  return totalHeight + "px";
}
