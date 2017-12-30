let code = require('./code');
var http = require('http');
var express = require('express');

var application = express();
console.log('\nMorse API __ ___ ._. ... .    ._ .__. .. \n ');

application.get('/code', function(request, response){
	response.send(code);
});

application.get('/letter/:l', function(request, response){
	var letter=request.params.l;		
	letter=letter.toUpperCase();
	var symbol = code[letter];
	response.send({"letter": request.params.l, "symbol": symbol});
});

application.get('/symbol/:s', function(request, response){
	var letter=Object.keys(code).find(key => code[key] === request.params.s);
	response.send({"letter": letter, "symbol": request.params.s});
});

application.get('/message/:m', function(request, response){
	var morseArray=[];
	for(let i of request.params.m){
		var letter=i.toUpperCase();
		morseArray.push(code[letter]);
	}
	var morseResponse="";
	for(let symbol of morseArray){
		morseResponse=morseResponse+" "+symbol;
	}
	response.send({"message": request.params.m, "morse": morseResponse });
});

application.get('/random', function(request, response){
	var keys = Object.keys(code);
	var randomKey = keys[ keys.length * Math.random() << 0];
	response.send({"randomLetter": randomKey, "symbol": code[letter]});
});

application.listen(3000);

