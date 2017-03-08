$( document ).ready(function() {
  $("#S_buttonSubmit").attr("disabled", true);
})

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function minmax(value, min, max)
{
    if(parseInt(value) < min || isNaN(parseInt(value)))
        return "";
    else if(parseInt(value) > max)
        return 1000;
    else return value;
}

function validateAmount() {
    var amount = $("#amount").val();
    if (amount < 0 || (amount % 100 != 0)) {
        document.getElementById('status').value = "Please enter valid amount";
    }
}

function validatemaxlimit() {
    var amount = $("#S_text5").val();
    if (amount < 0 || (amount % 100 != 0)) {
        document.getElementById('status').value = "Please enter valid amount";
    }
}

function Banker(Notes_2000, Notes_500, Notes_100,Notes_50, current_Amount, Max_limit) {
    this.Notes_2000 = Notes_2000;
    this.Notes_500 = Notes_500;
    this.Notes_100 = Notes_100;
    this.Notes_50 = Notes_50;
    this.currentAmount = current_Amount;
    this.Max_limit = Max_limit;
}

function Customer(Amount, Status) {
    this.Amount = Amount;
    this.status = new Array();
    this.status.push(Status);
}

function Logs(Amount, Notes_2000, Notes_500, Notes_100,Notes_50, Left_Amount, Operation) {
    this.Amount = Amount;
    this.Notes_2000 = Notes_2000;
    this.Notes_500 = Notes_500;
    this.Notes_100 = Notes_100;
    this.Notes_50 = Notes_50;
    this.Left_amount = Left_Amount;
    this.Operation = Operation;

    this.appRow = function appendRow() {
        var table = document.getElementById("logsTable");
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        cell0.innerHTML = this.Amount;
        cell1.innerHTML = this.Notes_2000;
        cell2.innerHTML = this.Notes_500;
        cell3.innerHTML = this.Notes_100;
        cell4.innerHTML = this.Notes_50;
        cell5.innerHTML = this.Left_amount;
        cell6.innerHTML = this.Operation;
          if(this.Operation == "Debit") {
              cell0.className = "col";
              cell1.className = "col";
              cell2.className = "col";
              cell3.className = "col";
              cell4.className = "col";
              cell5.className = "col";
              cell6.className = "col";
          }
          if(this.Operation == "Credit") {
              cell0.className = "col2";
              cell1.className = "col2";
              cell2.className = "col2";
              cell3.className = "col2";
              cell4.className = "col2";
              cell5.className = "col2";
              cell6.className = "col2";
         }

    }
    setTimeout(function() {
    window.scrollTo(0, document.body.scrollHeight);
    }, 0);
}

function Add() {
       var Notes_2000 = parseInt($("#S_text1").val());
       var Notes_500 = parseInt($("#S_text2").val());
       var Notes_100 = parseInt($("#S_text3").val());
       var Notes_50 = parseInt($("#S_text4").val());
         if(isNaN(Notes_2000)) {
             Notes_2000 = 0;
         }
        if(isNaN(Notes_500)) {
             Notes_500 = 0;
         }
        if(isNaN(Notes_100)) {
             Notes_100 = 0;
         }
         if(isNaN(Notes_50)) {
              Notes_50 = 0;
          }
        var Amount = Notes_2000 * 2000 + Notes_500 * 500 + Notes_100 * 100 + Notes_50*50;
        var bankers = new Banker(Notes_2000, Notes_500, Notes_100,Notes_50, Amount,1000)
        var logs = new Logs(Amount, Notes_2000, Notes_500, Notes_100,Notes_50, Amount, "Credit")
        logs.appRow();
        document.getElementById("S_text6").innerHTML = Amount;
        $("#S_buttonAdd").attr("disabled", true)
        $("#S_buttonSubmit").attr("disabled", false);
        window.bank = bankers;
        window.logs = logs;
      }

function maxLimit() {
    var max = $("#S_text5").val();
    window.bank.Max_limit = max
    $("#maxLim").text(max);
    Clear2();
}

function common(bank, log) {
    var banker = bank
    var log = log
}

function withdraw() {
    var bank = window.bank;
    var log = window.logs;
    var value = parseInt($("#amount").val());
    if ((log.Notes_2000 == 0) && (log.Notes_500 == 0) && (log.Notes_100 == 0) && (log.Notes_50 == 0)) {
        document.getElementById('status').value = "No Currency Available Sorry for inconvenience!!! ";
    } else
    if ((value % 50 != 0) || (value < 50)) {
        document.getElementById('status').value = "Amount must be in multiple of 50 ";
    } else
    if (value > log.Left_amount) {
        document.getElementById('status').value = "Amount is greater than Left Amount ";
    } else
    if (value > bank.Max_limit) {
        document.getElementById('status').value = "Amount is greater than Maximum Limit ";
    } else {
    var temp = parseInt(value / 2000);
    var Notes_2000Req = temp < log.Notes_2000 ? temp : log.Notes_2000;
    var rem = value - Notes_2000Req * 2000;
    temp = parseInt(rem / 500);
    var Notes_500Req = temp < log.Notes_500 ? temp : log.Notes_500;
    rem = rem - Notes_500Req * 500;
    temp = parseInt(rem / 100);
    var Notes_100req = temp < log.Notes_100 ? temp : log.Notes_100;
    rem = rem - Notes_100req * 100;
    var Notes_50req = parseInt(rem/50);
    if(Notes_2000Req <= logs.Notes_2000 && Notes_500Req <= logs.Notes_500 && Notes_100req <= logs.Notes_100 && Notes_50req <= logs.Notes_50) {
      document.getElementById('status').value = "Withraw Amount Successfully";
      var leftAmount = log.Left_amount - value;
      var Notes2000 = log.Notes_2000 - Notes_2000Req;
      var Notes500 = log.Notes_500 - Notes_500Req;
      var Notes100 = log.Notes_100 - Notes_100req;
      var Notes50 = log.Notes_50 - Notes_50req;
      window.logs.Left_amount = leftAmount
      var LOG = new Logs(value,Notes2000,Notes500,Notes100,Notes50,leftAmount,"Debit")
      LOG.appRow();
      document.getElementById("S_text6").innerHTML = LOG.Left_amount;
      window.logs = LOG;
    }
   else
   document.getElementById('status').value = "Amount different than Currency notes Combination ";
  }

}

function Clear1() {
   document.getElementById('amount').value = "";
}

function Clear2() {
   document.getElementById('S_text1').value = "";
   document.getElementById('S_text2').value = "";
   document.getElementById('S_text3').value = "";
   document.getElementById('S_text4').value = "";
}
