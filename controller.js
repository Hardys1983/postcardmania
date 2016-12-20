
<!--
	'name', 
	'model', 
	'manufacturer', 
	'cost_in_credits', 
	'length', 
	'max_atmosphering_speed', 
	'crew', 
	'passengers', 
	'cargo_capacity', 
	'consumables', 
	'hyperdrive_rating', 
	'MGLT', 
	'starship_class'
-->

var GetFileName = function(shipName){
	shipName = shipName.replace(/ /g, '-');
	return shipName;
}

var ShipsManager = function(){

	var data = null;
	this.SetData = function(result){
		data = result;
	}	

	GetCount = function(){
		return parseInt(data['count'], 10);
	}

	this.ShipsCount = function(){
		return GetCount();
	}

	this.GetShip = function(index){
		return data['results'][index];
	}

	this.GetShips = function(){
		var result = [];
		for(var i = 0; i < 10; ++i){
			if( data['results'][i] != null ){
				data['results'][i]['index'] = i;
				result.push(data['results'][i]); 
			}
		}	
		return result;
	}

	this.GetShipInformation = function(ship){
		
		imageName = GetFileName(ship['name']);
		
		child = "<div class='row' style='text-align: left'>" + 
		"<div class='col-md-2'></div>" +
		"<div class='col-md-6'>" +
		"<h3>" + " " + ship['name'] + "</h3>" +
		"<label>Length:  </label>" +
		"<caption>" +  " " + ship['length'] + "</caption><br/>" +
		"<label>Crew:  </label>" +
		"<caption>" + " " + ship['crew'] + "</caption><br/>" +
		"<label>Passengers:  </label>" +
		"<caption>" +  " " + ship['passengers'] + "</caption><br/><br/>" +
		"<a style='color: black' class='btn btn-default' onclick='ShowInformation(" + ship['index'] + ")'>" +
		"<span aria-hidden='true'>More info &raquo;</span>" +
		"</a>" +
  		"</div>" + 
		"<div class='col-md-2'>" + 
  		"<img style='width: 100%; height: 100%' src='img/starships/" + imageName + ".png' />" + 
  		"</div></div>";		

  		return child;
	}

	this.PagesCount = function(){
		return parseInt(GetCount() / 10 + 0.5, 10);
	}


	Process = function(index, callback){
		xmlHttp = new XMLHttpRequest(); 
		ProcessRequest = function(){
			if( xmlHttp.readyState == 4 && xmlHttp.status == 200){
				data  = JSON.parse(xmlHttp.responseText);
				callback(data);
			}
	    }
	    xmlHttp.onreadystatechange = ProcessRequest;
	    var url = 'http://swapi.co/api/starships/?format=json&page=' + index;
	    xmlHttp.open( 'GET', url, true );
	    xmlHttp.send();
	}

	this.GetPage = function(index, callback){
		Process(index, callback);		
	}
}