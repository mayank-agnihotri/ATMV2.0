function validateField(){
   // var first=($("#S_text1").val()="")?0:$("#S_text1").val()
    /*if(($("#S_text1").val()=="")||($("#S_text1").val()=="")||($("#S_text1").val()==""))
        {
            alert("Enter field");
            location.reload();
        }*/
    var a=parseInt($("#S_text1").val())
    var b=parseInt($("#S_text2").val())
    var c=parseInt($("#S_text3").val())
    if($("#S_text1").val()=="")
     a=0
     if($("#S_text2").val()=="")
        b=0;
     if($("#S_text3").val()=="")
        c=0;
    
    
    console.log(a + " " + b + " " + c)
    if((a<0)||(a>1000)||(b<0)||(b>1000)||(c<0)||(c>1000))
       return false;
    else 
        return true;
    }

function validateAmount(){

    
    
    var amount=$("#amount").val();



    if(amount<0||(amount%100!=0)){
    alert("Please enter valid amount");
    }
    else{
      //document.getElementById('status').value = "Submit the amount";
        
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
      if(validateField()){
          var Notes_2000=$("#S_text1").val();
          var Notes_500 =$("#S_text2").val();
          var Notes_100 =$("#S_text3").val();
    //if(!((Notes_2000="")||(Notes_500="")||(Notes_100="")))
          var Amount=Notes_2000*2000+Notes_500*500+Notes_100*100;
          var bankers= new Banker(Notes_2000,Notes_500,Notes_100,Amount)
          var logs= new Logs(Amount,Notes_2000,Notes_500,Notes_100,Amount,"Credit")
          logs.appRow();
       document.getElementById("S_text4").value=Amount;
          $("#S_buttonAdd").attr("disabled",true)
        window.bank= bankers;
          window.logs=logs;
          console.log(window.bank)
            }
          
      else{
          alert("Enter Values Accordingly");
          location.reload();
      }
      }
      function maxLimit(){
          

          var max= $("#S_text5").val();
          console.log(max)
          window.bank.Max_limit=max;
          console.log(max)
          $("#maxLim").text(max);

      }
function common(bank,log){
    var banker=bank
    var log= log

}

function withdraw(){
    var bank= window.bank;
    var log= window.logs;
    var value=parseInt($("#amount").val());
    console.log(value)
    console.log(log.Left_amount)
    if((log.Notes_2000==0)&&(log.Notes_500==0)&&(log.Notes_100==0)){
          document.getElementById('status').value = "No Currency Available Sorry for inconvenience!!! ";
    
    } else
    if((value%100!=0)||(value<100)){
            document.getElementById('status').value = "Amount must be in multiple of 100 ";
    
    }   else
    if(value>log.Left_amount){
         document.getElementById('status').value = "Amount is greater than Left Amount ";
      
    }else
    if(value>bank.Max_limit){
        console.log(bank.Max_limit+" "+value)
         document.getElementById('status').value = "Amount is greater than Maximum Limit ";
        console.log(value>bank.Max_limit)
       
    } 
    else{
        
    console.log(value)
    var temp=parseInt(value / 2000);
   console.log(temp>log.Notes_2000)
        var Notes_2000Req= temp<log.Notes_2000?temp:log.Notes_2000;
         console.log(Notes_2000Req);
    var rem=value-Notes_2000Req*2000;
    console.log(rem)
    temp=parseInt(rem/500);
    var Notes_500Req=temp<log.Notes_500?temp:log.Notes_500;
    rem=rem-Notes_500Req*500;
        console.log(rem)
    var Notes_100req=parseInt(rem/100);
    console.log(Notes_2000Req+" "+Notes_500Req+" "+ Notes_100req)
        
    if(Notes_2000Req<=logs.Notes_2000&&Notes_500Req<=logs.Notes_500&&Notes_100req<=logs.Notes_100){
        
        console.log( window.logs.Left_amount)
      document.getElementById('status').value = "Withraw Amount Successfully";
    
    /*if(Notes_2000Req>logs.Notes_2000){
        if(logs.Notes_500*500>=Notes_2000Req*2000||logs.Notes_100*100>=Notes_2000Req*2000){
            document.getElementById('status').value = "Withraw Amount Successfully";
           
        }
    }*/
    
    var    leftAmount=log.Left_amount-value;
  var Notes2000=log.Notes_2000-Notes_2000Req;
   var Notes500=log.Notes_500-Notes_500Req;
   var Notes100=log.Notes_100-Notes_100req;
    window.logs.Left_amount=leftAmount
   var LOG=new Logs(value,Notes2000,Notes500,Notes100,leftAmount,"Debit")
 
   
LOG.appRow();
         document.getElementById("S_text4").value=LOG.Left_amount;
window.logs=LOG;
        console.log(LOG)
    

    console.log(window.bank)
       }/* else if(log.Notes_2000==0){
            if(log.Notes_500*500>Notes_2000Req*2000){
               Notes_2000Req=0;
                Notes_500Req= value/500;
                rem=value- Notes_500Req*500
                Notes_100req= rem/100;
             console.log(Notes_2000Req+" "+Notes_500Req+" "+ Notes_100req+"dfbj")
    
            } else
        if(log.Notes_100*100>Notes_2000Req*2000){
            Notes_2000Req=0;
            Notes
                
        }
    }*/
        else 
        document.getElementById('status').value = "Amount different than Currency notes Combination ";
    
        
        
    }
    
}



     
