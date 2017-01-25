var fs = require('fs'),
readline = require('readline'),
stream = require('stream');

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var util = require('util');
fs.writeFileSync('Question1.json','','utf-8');

var rl = readline.createInterface({
	input: instream,
	output: outstream,
	terminal: false
});

var lineCount=0;
var myHeader="";
var recordCount=0;
var finalCount=0;

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
		result.push(obj);
		//Writestream.write(obj);
		var util = require('util');
		recordCount++;
		fs.appendFile('Question1.json', JSON.stringify(obj)+"\n", function (err) 
		{

		});


		console.log("DONE Recoads Written : "+recordCount);
		finalCount = recordCount;

	}
});


