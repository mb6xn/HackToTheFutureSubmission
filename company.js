$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/mb6xn/HackToTheFutureSubmission/master/hackathon.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});


function processData(allText) {
    // var record_num = 5;  // or however many elements there are in each row
    // var allTextLines = allText.split(/\r\n|\n/);
    // var entries = allTextLines[0].split(',');
    // var lines = [];

    // var headings = entries.splice(0,record_num);
    // while (entries.length>0) {
    //     var tarr = [];
    //     for (var j=0; j<record_num; j++) {
    //         tarr.push(headings[j]+":"+entries.shift());
    //     }
    //     lines.push(tarr);
    // }
    // alert(lines);
    //alert(allText);
    alert(csvJSON(allText));
    var JSONdata = JSON.parse(csvJSON(allText));
    alert(JSONdata[0]['women (%)']);
}

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}