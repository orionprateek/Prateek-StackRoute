var fs = require('fs'),
readline = require('readline'),
stream = require('stream');

console.time("timecheck");

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

// var util = require('util');
// fs.writeFileSync('Answer3.json','','utf-8');

var rl = readline.createInterface({
	input: instream,
	output: outstream,
	terminal: false
});

var lineCount=0;
var myHeader="";
var recordCount=0;
var finalCount=0;



var index = 0;
var nonIndex = 0;
var violent =0;
var property = 0;
var answer = [];



rl.on('line', function(line) 
{
	var result = [];
	var headers = myHeader.split(",");//all headers

	var obj = {};

	var row = line,
	headCount = 0,
	startValue = 0,
	count = 0;

	while (count < row.length) //check all char 
	{
		// console.log("------------------------------"+row.length+"::::::"+count);

		var c = row[count];

		if (c == '"') //to check if this char is " or not......
		{
			do
			{
				c = row[++count]; 
				// console.log(count+":::::::::::::::::::::::"+c+"::::::::::::::::::::"+i);
			} 
			while(c !== '"' && count < row.length - 1);
		}

		if (c == ',' || count == row.length - 1) //to check each column with ,
		{
			// console.log(":::::::::::::::::::::::::::::::::::::"+count);
			var value = row.substr(startValue,count - startValue).trim();//one column

			/* skip first double quote */
			if (value[0] == '"') 
			{ 
				value = value.substr(1); 
			}
			/* skip last comma */
			if (value[value.length - 1] == ',') 
			{ 
				value = value.substr(0, value.length - 1); 
			}
			/* skip last double quote */
			if (value[value.length - 1] == '"') 
			{ 
				value = value.substr(0, value.length - 1); 
			}

			var key = headers[headCount++];
			obj[key] = value;
			startValue = count + 1;
		}
		++count;
	}
	if(lineCount==0)
	{
		lineCount++;
		myHeader=line;
		// console.log(":::::::::::::::::::::::::::::::;"+obj+"::::::::::::::::::::::::::::::::::::;;");
	}
	else
	{
		
		if(obj['Year'] == '2015'){

			if(obj['Primary Type'] == 'HOMICIDE'){
				index++;
				violent++;
			}
			else if(obj['Primary Type'] == 'CRIMINAL SEXUAL ASSAULT'){
				index++;
				violent++;
			}
			else if(obj['Primary Type'] == 'ROBBERY'){
				index++;
				violent++;
			}
			else if(obj['Primary Type'] == 'AGGRAVATED ASSAULT'){
				index++;
				violent++;
			}
			else if(obj['Primary Type'] == 'AGGRAVATED BATTERY'){
				index++;
				violent++;
			}
			else if(obj['Primary Type'] == 'BURGLARY'){
				index++;
				property++;
			}
			else if(obj['Primary Type'] == 'LARCENY'){
				index++;
				property++;
			}
			else if(obj['Primary Type'] == 'MOTOR VEHICLE THEFT'){
				index++;
				property++;
			}
			else if(obj['Primary Type'] == 'ARSON'){
				index++;
				property++;
			}



			else if(obj['Primary Type'] == 'INVOLUNTARY MANSLAUGHTER'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'SIMPLE ASSAULT'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'SIMPLE BATTERY'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'FORGERY & CONUTERFEITING'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'FRAUD'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'EMBEZZLEMENT'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'STOLEN PROPERTY'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'VANDALISM'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'WEAPONS VIOLATION'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'PROSTITUTION'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'CRIMINAL SEXUAL ABUSE'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'DRUG ABUSE'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'GAMBLING'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'OFFENSES AGAINST FAMILY'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'LIQUOR LICENSE'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'DISORDERLY CONDUCT'){
				nonIndex++;
			}
			else if(obj['Primary Type'] == 'MISC NON-INDEX OFFENSE'){
				nonIndex++;
			}


		}

	}
	
});

rl.on('close', function(){

	var finalRS1 = {};
	var finalRS2 = {};
	var finalRS3 = {};
	var finalRS4 = {};
	finalRS1['Crime'] = 'Index';
	finalRS2['Crime'] = 'Non_Index';
	finalRS3['Crime'] = 'Violent';
	finalRS4['Crime'] = 'Property';
	finalRS1['Count'] = index;
	finalRS2['Count'] = nonIndex;
	finalRS3['Count'] = violent;
	finalRS4['Count'] = property;
	answer.push(finalRS1);
	answer.push(finalRS2);
	answer.push(finalRS3);
	answer.push(finalRS4);
	fs.writeFileSync('Answer3.json',JSON.stringify(answer),'utf-8');
	console.timeEnd("timecheck");
	console.log("End");

});

