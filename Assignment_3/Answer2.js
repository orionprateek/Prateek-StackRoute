var fs = require('fs'),
readline = require('readline'),
stream = require('stream');

console.time("timecheck");

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var util = require('util');
fs.writeFileSync('Answer2.json','','utf-8');

var rl = readline.createInterface({
	input: instream,
	output: outstream,
	terminal: false
});

var lineCount=0;
var myHeader="";
var recordCount=0;
var finalCount=0;



var arrested = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var notArrested = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];




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
		
		if(obj['Primary Type'] == 'ASSAULT'){

			if(obj['Arrest'] == 'true'){

				if(obj['Year'] == '2001'){
					arrested[0]++;
				}
				else if(obj['Year'] == '2002'){
					arrested[1]++;
				}
				else if(obj['Year'] == '2003'){
					arrested[2]++;
				}
				else if(obj['Year'] == '2004'){
					arrested[3]++;
				}
				else if(obj['Year'] == '2005'){
					arrested[4]++;
				}
				else if(obj['Year'] == '2006'){
					arrested[5]++;
				}
				else if(obj['Year'] == '2007'){
					arrested[6]++;
				}
				else if(obj['Year'] == '2008'){
					arrested[7]++;
				}
				else if(obj['Year'] == '2009'){
					arrested[8]++;
				}
				else if(obj['Year'] == '2010'){
					arrested[9]++;
				}
				else if(obj['Year'] == '2011'){
					arrested[10]++;
				}
				else if(obj['Year'] == '2012'){
					arrested[11]++;
				}
				else if(obj['Year'] == '2013'){
					arrested[12]++;
				}
				else if(obj['Year'] == '2014'){
					arrested[13]++;
				}
				else if(obj['Year'] == '2015'){
					arrested[14]++;
				}
				else if(obj['Year'] == '2016'){
					arrested[15]++;
				}

			}
			else if(obj['Arrest'] == 'false'){

				if(obj['Year'] == '2001'){
					notArrested[0]++;
				}
				else if(obj['Year'] == '2002'){
					notArrested[1]++;
				}
				else if(obj['Year'] == '2003'){
					notArrested[2]++;
				}
				else if(obj['Year'] == '2004'){
					notArrested[3]++;
				}
				else if(obj['Year'] == '2005'){
					notArrested[4]++;
				}
				else if(obj['Year'] == '2006'){
					notArrested[5]++;
				}
				else if(obj['Year'] == '2007'){
					notArrested[6]++;
				}
				else if(obj['Year'] == '2008'){
					notArrested[7]++;
				}
				else if(obj['Year'] == '2009'){
					notArrested[8]++;
				}
				else if(obj['Year'] == '2010'){
					notArrested[9]++;
				}
				else if(obj['Year'] == '2011'){
					notArrested[10]++;
				}
				else if(obj['Year'] == '2012'){
					notArrested[11]++;
				}
				else if(obj['Year'] == '2013'){
					notArrested[12]++;
				}
				else if(obj['Year'] == '2014'){
					notArrested[13]++;
				}
				else if(obj['Year'] == '2015'){
					notArrested[14]++;
				}
				else if(obj['Year'] == '2016'){
					notArrested[15]++;
				}

			}

		}

	}
	
});

rl.on('close', function(){

	var yr = 2001;
	var answer = [];
	for(i = 0 ; i < 16 ; i++){		
		var finalRS = {};
		finalRS['Year'] = yr;
		finalRS['Arrested'] = arrested[i];
		finalRS['Not_Arrested'] = notArrested[i];
		yr++;
		answer.push(finalRS);
	}
	
	fs.writeFileSync('Answer2.json',JSON.stringify(answer),'utf-8');
	console.timeEnd("timecheck");
	console.log("End");

});

