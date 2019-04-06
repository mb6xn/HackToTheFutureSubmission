JSONobj = {'(37.3382, -121.8863)': 'rand_txt'};

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/mb6xn/HackToTheFutureSubmission/master/hackathon.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function plotPoints(JSONdata) {
	locations = [];
	for (i = 0; i < JSONdata.length-1; i++) {
		// alert(JSONdata[i]['Latitude']);
		locations.push([JSONdata[i]['Longitude'],-JSONdata[i]['Latitude']])
	}
	// alert(locations);
    // locations = [[42.123, -102.25], [38, -98]];
    // console.log(locations.length)
    for(i = 0; i < locations.length; i++){
        var myLatLong = new google.maps.LatLng(locations[i][0],locations[i][1]);
        var thisCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: myLatLong,
            radius: 20000
            });
        // alert(thisCircle.center);
        // alert(myLatLong);
        var c = JSONdata[i];
        JSONobj[thisCircle.center] = [c['Company'],c['white (%)'],c['non-white (%)'],c['men (%)'],c['women (%)'],c['Green Energy Source'],c['Sustainability Site'],c['City'],c['State']];
        google.maps.event.addListener(thisCircle, 'click', function() {
            // alert(thisCircle.center);
            // alert(JSONobj[thisCircle.center]);
            var info_box = document.getElementById('info');
            info_box.innerHTML = `
            <div class="card-header">
          <h4 class="my-0 font-weight-normal">`+JSONobj[thisCircle.center][0]+`</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">`+JSONobj[thisCircle.center][7]+`<small class="text-muted">, `+JSONobj[thisCircle.center][8]+`</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>White: `+JSONobj[thisCircle.center][1]+`%</li>
            <li>Non-white: `+JSONobj[thisCircle.center][2]+`%</li>
            <li>Men: `+JSONobj[thisCircle.center][3]+`%</li>
            <li>Women: `+JSONobj[thisCircle.center][4]+`%</li>
            <li>Green Energy Source: `+JSONobj[thisCircle.center][5]+`</li>
           </ul>
          <a href="`+JSONobj[thisCircle.center][6]+`" class="btn b6n-lg btn-block btn-primary" role="button">Go to Company Website</a>
        </div>
            `;
        });
    }
};
function processData(allText) {
    var JSONdata = JSON.parse(csvJSON(allText));
    plotPoints(JSONdata);
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