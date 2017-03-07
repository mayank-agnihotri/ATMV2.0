function validateAmount(){

    var amount=$("#amount").val();



    if(amount<0||(amount%100!=0)){
      //alert(amount);
        // $("#status").innerHTML("Please enter valid amount");
        document.getElementById('status').value = "Please enter valid amount";
    }
    else{
      document.getElementById('status').value = "Submit the amount";
        //  $("#status").innerHTML("Submit the amount");
    }
}
