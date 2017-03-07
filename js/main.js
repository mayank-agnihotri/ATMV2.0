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

function Banker(Notes_2000,Notes_500,Notes_100,current_Amount,Max_limit ){
          this.Notes_2000=Notes_2000;
          this.Notes_500=Notes_500;
          this.Notes_100=Notes_100;
          this.currentAmount=current_Amount;
          this.Max_limit=Max_limit;
      }
      function Customer(Amount,Status){
          this.Amount=Amount;
          this.status= new Array();
          this.status.push(Status);
      }
      function Logs(Amount,Notes_2000,Notes_500,Notes_100,Left_Amount,Operation){
          this.Amount=Amount;
           this.Notes_2000=Notes_2000;
          this.Notes_500=Notes_500;
          this.Notes_100=Notes_100;
          this.Left_amount=Left_Amount;
          this.Operation=Operation;

 this.appRow=function appendRow() {
    var table = document.getElementById("logsTable");
    var row = table.insertRow(-1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
     var cell2 = row.insertCell(2);
    var cell3= row.insertCell(3);
     var cell4 = row.insertCell(4);
     var cell5 = row.insertCell(5);
        cell0.innerHTML=this.Amount;
        cell1.innerHTML=this.Notes_2000;
        cell2.innerHTML=this.Notes_500;
   cell3.innerHTML=this.Notes_100;
   cell4.innerHTML=this.Left_amount;
   cell5.innerHTML=this.Operation;
   cell5.bgColor = "green";


}
      }
      function Add(){
          var Notes_2000=$("#S_text1").val();
          var Notes_500 =$("#S_text2").val();
          var Notes_100 =$("#S_text3").val();
          var Amount=Notes_2000*2000+Notes_500*500+Notes_100*100;
          var bankers= new Banker(Notes_2000,Notes_500,Notes_100,Amount)
          var logs= new Logs(Amount,Notes_2000,Notes_500,Notes_500,Amount,"Credit")
        /*  console.log(bankers)
                    console.log(logs);*/

          logs.appRow();
       document.getElementById("S_text4").value=Amount;
          $("#S_buttonAdd").attr("disabled",true)
          window.bank= bankers;
                   window.logs=logs;
      }
      function maxLimit(){

          var max= $("#S_text5").val();
          console.log(max)
          $("#maxLim").text(max);

      }





// for withdraw

function withdraw(){
   var bank= window.bank;
   var log= window.logs;
   var value=$("#amount").val();
   console.log(value)
   if((value>log.Left_amount||value>bank.Max_limit)){
      console.log(value>log.Left_amount)
      console.log(value>bank.Max_limit)
         console.log(bank.Max_limit)
       alert(value)
     document.getElementById('status').value = "Amount is greater than Left Amount or Maximum Limit";
   }
   console.log(value)
   var Notes_2000Req=parseInt(value / 2000);
   console.log(Notes_2000Req);
   var rem=value-Notes_2000Req*2000;
   console.log(rem)
   var Notes_500Req=parseInt(rem/500);
   rem=rem-Notes_500Req*500;
       console.log(rem)
   var Notes_100req=parseInt(rem/100);
   console.log(Notes_2000Req+" "+Notes_500Req+" "+ Notes_100req)

   if(Notes_2000Req<=logs.Notes_2000&&Notes_500Req<=logs.Notes_500&&Notes_100req<=logs.Notes_100){
     document.getElementById('status').value = "Withraw Amount Successfully";
   }
   /*if(Notes_2000Req>logs.Notes_2000){
       if(logs.Notes_500*500>=Notes_2000Req*2000||logs.Notes_100*100>=Notes_2000Req*2000){
           document.getElementById('status').value = "Withraw Amount Successfully";
           Notes_2000Req=
       }
   }*/
   var    leftAmount=log.Left_amount-value;
 var Notes2000=log.Notes_2000-Notes_2000Req;
  var Notes500=log.Notes_500-Notes_500Req;
  var Notes100=log.Notes_100-Notes_100req;
  var LOG=new Logs(value,Notes2000,Notes500,Notes100,leftAmount,"Debit")
 // LOG.Amount=value;
LOG.appRow();
   console.log(LOG)

//if()
   console.log(window.bank)

}
