var fs = require('fs'),
readline = require('readline'),
stream = require('stream');

console.time("timecheck");

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;



var rl = readline.createInterface({
	input: instream,
	output: outstream,
	terminal: false
});

var lineCount=0;
var myHeader="";
var recordCount=0;
var finalCount=0;



var greater500 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var lesser500 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];




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
		// result.push(obj);
		// //Writestream.write(obj);
		// var util = require('util');
		// recordCount++;
		// fs.appendFile('data_crime_full.json', JSON.stringify(obj)+"\n", function (err) 
		// {

		// });


		// console.log("DONE Recoads Written : "+recordCount);
		//result.push(obj);

		var oneRow = [];
		oneRow.push(obj);


		if(obj['Year'] == '2001' || obj['Year'] == '2002' || obj['Year'] == '2003' || obj['Year'] == '2004' || 
			obj['Year'] == '2005' || obj['Year'] == '2006' || obj['Year'] == '2007' || obj['Year'] == '2008' || 
			obj['Year'] == '2009' || obj['Year'] == '2010' || obj['Year'] == '2011' || obj['Year'] == '2012' || 
			obj['Year'] == '2013' || obj['Year'] == '2014' || obj['Year'] == '2015' || obj['Year'] == '2016'){

			if(obj['Primary Type'] == 'THEFT'){
				
				if (obj['Description'] == 'OVER $500') {


					
					if(obj['Year'] == '2001'){
						greater500[0]++;
					}
					else if(obj['Year'] == '2002'){
						greater500[1]++;
					}
					else if(obj['Year'] == '2003'){
						greater500[2]++;
					}
					else if(obj['Year'] == '2004'){
						greater500[3]++;
					}
					else if(obj['Year'] == '2005'){
						greater500[4]++;
					}
					else if(obj['Year'] == '2006'){
						greater500[5]++;
					}
					else if(obj['Year'] == '2007'){
						greater500[6]++;
					}
					else if(obj['Year'] == '2008'){
						greater500[7]++;
					}
					else if(obj['Year'] == '2009'){
						greater500[8]++;
					}
					else if(obj['Year'] == '2010'){
						greater500[9]++;
					}
					else if(obj['Year'] == '2011'){
						greater500[10]++;
					}
					else if(obj['Year'] == '2012'){
						greater500[11]++;
					}
					else if(obj['Year'] == '2013'){
						greater500[12]++;
					}
					else if(obj['Year'] == '2014'){
						greater500[13]++;
					}
					else if(obj['Year'] == '2015'){
						greater500[14]++;
					}
					else if(obj['Year'] == '2016'){
						greater500[15]++;
					}
				}

				else if(obj['Description'] == '$500 AND UNDER'){
					
					if(obj['Year'] == '2001'){
						lesser500[0]++;
					}
					else if(obj['Year'] == '2002'){
						lesser500[1]++;
					}
					else if(obj['Year'] == '2003'){
						lesser500[2]++;
					}
					else if(obj['Year'] == '2004'){
						lesser500[3]++;
					}
					else if(obj['Year'] == '2005'){
						lesser500[4]++;
					}
					else if(obj['Year'] == '2006'){
						lesser500[5]++;
					}
					else if(obj['Year'] == '2007'){
						lesser500[6]++;
					}
					else if(obj['Year'] == '2008'){
						lesser500[7]++;
					}
					else if(obj['Year'] == '2009'){
						lesser500[8]++;
					}
					else if(obj['Year'] == '2010'){
						lesser500[9]++;
					}
					else if(obj['Year'] == '2011'){
						lesser500[10]++;
					}
					else if(obj['Year'] == '2012'){
						lesser500[11]++;
					}
					else if(obj['Year'] == '2013'){
						lesser500[12]++;
					}
					else if(obj['Year'] == '2014'){
						lesser500[13]++;
					}
					else if(obj['Year'] == '2015'){
						lesser500[14]++;
					}
					else if(obj['Year'] == '2016'){
						lesser500[15]++;
					}
				}
			}
		}

	}
	
});

rl.on('close', function(){

	//var yr = 2001;
	var answer = [];
	var finalAnswer = [];
	for(i = 2001; i < 2017 ; i++)
	{
		var finalRS = {};
		finalRS['Year'] = i;
		finalRS['OVER_$500'] = greater500[i-2001];
		finalRS['$500_AND_UNDER'] = lesser500[i-2001];
		
		answer.push(finalRS);
	}
	//finalAnswer.push(answer);
	fs.writeFileSync('Answer1.json',JSON.stringify(answer),'utf-8');
	console.timeEnd("timecheck");
	console.log("End");

});

