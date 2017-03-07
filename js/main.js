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




function validateAmount(){
   var amount=$("#amount").val();
      if(amount<0||(amount%100!=0)){
       $("#status").text("Please enter valid amount");
   }
   else{

        $("#status").text("Submit the amount");
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

     }
     function maxLimit(){

         var max= $("#S_text5").val();
         console.log(max)
         $("#maxLim").text(max);

     }
     
