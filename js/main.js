function validateAmount(){
    var amount=$("#amount").val();
    alert(amount%100)

    if(amount<0||(amount%100!=0)){
        $("#status").text("Please enter valid amount");
    }
    else{

         $("#status").text("Submit the amount");
    }
}
