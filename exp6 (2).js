$(document).ready(function(){

  // Clear results when typing or changing dropdown
  $("#amount").on("keyup", function(){ clearResults(); });
  $("#gst").on("change", function(){ clearResults(); });

  // Calculate GST
  $("#gstForm").on("submit", function(e){
    e.preventDefault();
    let amount = parseFloat($("#amount").val());
    let gst = parseFloat($("#gst").val());

    if(isNaN(amount) || isNaN(gst)){
      alert("⚠️ Please enter amount and select GST.");
      return;
    }

    let gstAmt = (gst/100) * amount;
    let totalAmt = amount + gstAmt;

    $("#amtBox .value").text("Rs." + amount.toFixed(2));
    $("#gstBox .value").text("Rs." + gstAmt.toFixed(2));
    $("#totalBox .value").text("Rs." + totalAmt.toFixed(2));
  });

  // Reset button
  $("#reset").click(function(){
    $("#amount").val("");
    $("#gst").val("");
    clearResults();
  });

  function clearResults(){
    $("#amtBox .value").text("Rs.0.00");
    $("#gstBox .value").text("Rs.0.00");
    $("#totalBox .value").text("Rs.0.00");
  }

});
