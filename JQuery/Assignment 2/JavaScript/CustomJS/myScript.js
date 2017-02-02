$(function (){

	var $displayTable = $('#displayTable');
	var $displayArea = $('#displayArea');
	var $movieName = $('#movieName');
	var $addRow = $('#addRow');
	var $addMovie = $('#addMovie');
	var $pageNo = $('#pageNo');
	var $jumpButton = $('#jumpButton');
	var $jumpBox = $('#jumpBox');
	var $searchBar = $('#searchBar');
	var $searchButton = $('#searchButton');

	var records = 9;
	var min = 0;
	var max = records+min;




	////////////////////////////////////////////////////////////
	//														  //
	//														  //
	//						Display Movies					  //
	//														  //
	//														  //
	////////////////////////////////////////////////////////////

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/Search',
		success: function(data) {
			var pageNumber = (min / 10) + 1;
			var totalRecords = data.length;
			var totalPages = Math.ceil(totalRecords/10);
			var headings = $("<tr class='tableRow'><th class='tRow'> Title </th><th class='tRow'> Year </th><th class='tRow'> IMDBID </th><th class='tRow'> Type </th><th class='tRow'> Edit/Delete </th></tr>");
			$displayTable.append(headings);
			for(var i=min; i<=max; i++){
				var row = $("<tr class='tableRow'><td class='tableData'>"+data[i].Title+"</td><td class='tableData'>"+data[i].Year+"</td><td class='tableData'>"+data[i].id+"</td><td class='tableData'>"+data[i].Type+"</td><td class='tableData'>"+
								"<button class='editButton'><i class='fa fa-pencil-square-o' aria-hidden=true'></i></button>"+"<button class='deleteButton'> <i class='fa fa-trash-o' aria-hidden='true'></i> </button>"+"</td></tr>");
				$displayTable.append(row);
				$displayTable.append('<li class="id">'+data[i].id+'</li>');	
			}			
			$pageNo.empty();
			$pageNo.prepend('Showing records from '+(min+1)+' to '+(max+1)+'<br>');
			$pageNo.prepend('Page Number : '+pageNumber+'/'+totalPages+'<br>');			
		}
	});



	///////////////////////////////////
	//			Next Button 	     //	
	///////////////////////////////////


	$('#nextButton').on('click',function (){
		min = min+records+1;
		max = max+records+1;
		$('#div1').empty();
		$.ajax({
			type:'GET',
			url:' http://localhost:3000/Search',
			success:function(data) 	{
				var pageNumber = (min / 10) + 1;
				var totalRecords = data.length;
				totalPages = Math.ceil(totalRecords/10);
				if( pageNumber <= totalPages){
					$displayTable.empty();
					var headings = $("<tr class='tableRow'><th class='tRow'> Title </th><th class='tRow'> Year </th><th class='tRow'> IMDBID </th><th class='tRow'> Type </th><th class='tRow'> Edit/Delete </th></tr>");
					$displayTable.append(headings);
					for(var i=min; i<=max; i++){
						if(i == totalRecords){
							max = totalRecords - 1;
							break;
						}
						var row = $("<tr class='tableRow'><td class='tableData'>"+data[i].Title+"</td><td class='tableData'>"+data[i].Year+"</td><td class='tableData'>"+data[i].id+"</td><td class='tableData'>"+data[i].Type+"</td><td class='tableData'>"+
									"<button class='editButton'><i class='fa fa-pencil-square-o' aria-hidden=true'></i></button>"+"<button class='deleteButton'> <i class='fa fa-trash-o' aria-hidden='true'></i> </button>"+"</td></tr>");
						$displayTable.append(row);
						$displayTable.append('<li class="id">'+data[i].id+'</li>');	
					}
					$pageNo.empty();	
					$pageNo.prepend('Showing records from '+(min+1)+' to '+(max+1)+'<br>');
					$pageNo.prepend('Page Number : '+pageNumber+'/'+totalPages+'<br>');		
				}
				else{
					alert("You have reached the last page!");
				}
			}
		});
	});




	///////////////////////////////////
	// 		 Previous Button   	     //	
	///////////////////////////////////


	$('#prevButton').on('click',function (){			
		if(min>=9){
			min = min-10;
			max = min+10;
			$('#div1').empty();
			$.ajax({
				type:'GET',
				url:' http://localhost:3000/Search',
				success:function(data){
					var pageNumber = (min / 10) + 1;
					var totalRecords = data.length;
					var totalPages = Math.ceil(totalRecords/10);
					$("#displayTable td").remove();
					$displayTable.empty();					
					var headings = $("<tr class='tableRow'><th class='tRow'> Title </th><th class='tRow'> Year </th><th class='tRow'> IMDBID </th><th class='tRow'> Type </th><th class='tRow'> Edit/Delete </th></tr>");
					$displayTable.append(headings);
					for(var i=min; i<=max; i++){
						var row = $("<tr class='tableRow'><td class='tableData'>"+data[i].Title+"</td><td class='tableData'>"+data[i].Year+"</td><td class='tableData'>"+data[i].id+"</td><td class='tableData'>"+data[i].Type+"</td><td class='tableData'>"+
									"<button class='editButton'><i class='fa fa-pencil-square-o' aria-hidden=true'></i></button>"+"<button class='deleteButton'> <i class='fa fa-trash-o' aria-hidden='true'></i> </button>"+"</td></tr>");
						$displayTable.append(row);
						$displayTable.append('<li class="id">'+data[i].id+'</li>');	
					}					
					$pageNo.empty();
					$pageNo.prepend('Showing records from '+(min+1)+' to '+(max+1)+'<br>');
					$pageNo.prepend('Page Number : '+pageNumber+'/'+totalPages+'<br>');
				}

			});
		}
		else{
			alert("Start of the Table!");
		}
	});


	///////////////////////////////////
	// 		Jump To Page Button      //	
	///////////////////////////////////

	$('#jumpButton').on('click',function (){
		min = (($jumpBox.val())*10)-10;
		max = (($jumpBox.val())*10)-1;
		if( $jumpBox.val() > 0 ){
			$('#div1').empty();
			$.ajax({
				type:'GET',
				url:'http://localhost:3000/Search',
				success:function(data){
					var pageNumber = (min / 10) + 1;
					var totalRecords = data.length;
					var totalPages = Math.ceil(totalRecords/10);
					if(pageNumber <= totalPages){
						$("#displayTable td").remove();
						$displayTable.empty();					
						var headings = $("<tr class='tableRow'><th class='tRow'> Title </th><th class='tRow'> Year </th><th class='tRow'> IMDBID </th><th class='tRow'> Type </th><th class='tRow'> Edit/Delete </th></tr>");
						$displayTable.append(headings);

						for(var i=min; i<=max; i++){
							if(i == totalRecords){
								max = totalRecords - 1;
								break;
							}
							var row = $("<tr class='tableRow'><td class='tableData'>"+data[i].Title+"</td><td class='tableData'>"+data[i].Year+"</td><td class='tableData'>"+data[i].id+"</td><td class='tableData'>"+data[i].Type+"</td><td class='tableData'>"+
										"<button class='editButton'><i class='fa fa-pencil-square-o' aria-hidden=true'></i></button>"+"<button class='deleteButton'> <i class='fa fa-trash-o' aria-hidden='true'></i> </button>"+"</td></tr>");
							$displayTable.append(row);
							$displayTable.append('<li class="id">'+data[i].id+'</li>');	

						}					
						$pageNo.empty();						
						$pageNo.prepend('Showing records from '+(min+1)+' to '+(max+1)+'<br>');
						$pageNo.prepend('Page Number : '+pageNumber+'/'+totalPages+'<br>');

					}
					else{
						alert("Invalid Page Number");
						location.reload();
					}
				}

			});
		}
		else{
			alert("Invalid Page Number");
			location.reload();
		}
	});



	////////////////////////////////////////////////////////////
	//														  //
	//														  //
	//						Search Movies					  //
	//														  //
	//														  //
	////////////////////////////////////////////////////////////




	
	$('#searchButton').on('click',function (){
		console.log("Search Button Clicked");
		console.log($searchBar.val());
		var movieTitle = $searchBar.val();
		$.ajax({
			type: 'GET',
			url:'http://localhost:3000/Search',
			success: function(data){
				$displayTable.empty();
				$pageNo.empty();
				$displayArea.empty();
				$jumpBox.remove();
				$jumpButton.remove();
				var headings = $("<tr class='tableRow'><th class='tRow'> Title </th><th class='tRow'> Year </th><th class='tRow'> IMDBID </th><th class='tRow'> Type </th><th class='tRow'> Edit/Delete </th></tr>");
				$displayTable.append(headings);
				$.each(data, function(index, movie){
					if(movie.Title.toLowerCase() == movieTitle.toLowerCase()){
						var row = $("<tr class='tableRow'><td class='tableData'>"+movie.Title+"</td><td class='tableData'>"+movie.Year+"</td><td class='tableData'>"+movie.id+"</td><td class='tableData'>"+movie.Type+"</td><td class='tableData'>"+
									"<button class='editButton'><i class='fa fa-pencil-square-o' aria-hidden=true'></i></button>"+"<button class='deleteButton'> <i class='fa fa-trash-o' aria-hidden='true'></i> </button>"+"</td></tr>");
						$displayTable.append(row);
						$displayTable.append('<li class="id">'+movie.id+'</li>');	
					}
				});
			} 
		});
	});








	////////////////////////////////////////////////////////////
	//														  //
	//														  //
	//						Add Movies						  //
	//														  //
	//														  //
	////////////////////////////////////////////////////////////

	$addMovie.on('click', function()
	{
		var	movie =	{
						Title: $('#Title').val(),
						Year: $("#Year").val(),
						id: $("#id").val(),
						Type: $("#Type").val(),
						Poster: 'NA',
					};
		$.ajax({
			type:'POST',
			url:'http://localhost:3000/Search',
			data: movie,
			success:function(new_mv) 
			{
				alert("Movie Added Successfully");
			}
		});
	});





	////////////////////////////////////////////////////////////
	//														  //
	//														  //
	//					  Delete Movies 					  //
	//														  //
	//														  //
	////////////////////////////////////////////////////////////

    $displayTable.delegate('.deleteButton', 'click', function(){
    	if (confirm("Are you sure??")){ 
        	
	        var val = $(this).closest('tr');
	        var del = $(this).closest('td').prev('td').prev('td');
			$(this).closest('tr').remove();

			$.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: 'http://localhost:3000/Search/'+del.text(),
				success: function(data){
					alert("Deleted Successfully");				
				} 
			});


        }
        return false;
    });





	////////////////////////////////////////////////////////////
	//														  //
	//														  //
	//					Edit Movie Details 					  //
	//														  //
	//														  //
	////////////////////////////////////////////////////////////

	$displayTable.delegate('.editButton', 'click', function(){	

		$('.deleteButton').prop('disabled', true);
		$('.editButton').prop('disabled', true);
		var editRow = $(this).closest('td').prev('td').prev('td');
		var $td = $(this).closest('td').prev('td').text();
		var oldTitle = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
		var oldYear = $(this).closest('td').prev('td').prev('td').prev('td').text();	
		var oldImdb = $(this).closest('td').prev('td').prev('td').text();	
		var oldType = $(this).closest('td').prev('td').text();
		var oldPoster = 'NA';

		var newTitle ='';
		var newType ='';
		var newYear ='';
		var newIMDB =''; 
		var newTr =	$('<tr> <td class="tableData"> <input type="text" class="form-control" name="Title" placeholder="'+oldTitle+'" id="editTitle"/> </td>'+
							'<td class="tableData"> <input type="text" class="form-control" name="Year" placeholder="'+oldYear+'" id="editYear"/> </td>'+
						 	'<td class="tableData"> <input type="text"  class="form-control"name="imdbID" placeholder="'+oldImdb+'" id="editIMDBID"/> </td>'+
						 	'<td class="tableData"> <input type="text" class="form-control" name="Type" placeholder="'+oldType+'" id="editType"/> </td>'+
						 	'<td class="tableData"> <button id="saveBtn"> <i class="fa fa-floppy-o" aria-hidden="true"></i> </button> <button id="closeBtn"> <i class="fa fa-ban" aria-hidden="true"></i> </button> </td>'+
					'</tr>');


		var editMovie = {};
		
		$(this).parent().parent().replaceWith(newTr);
		$displayTable.delegate('#closeBtn','click',function () 
		{
			location.reload();
		});

		$displayTable.delegate('#saveBtn','click',function () 
		{

			newTitle = $('#editTitle').val();
			newYear = $('#editYear').val();
			newType = $('#editType').val();
			newIMDB = $('editIMDBID').val();
			if($('#editTitle').val() == '')
			{
				newTitle = oldTitle;
			}
			if($('#editYear').val() == '')
			{
				newYear = oldYear;
			}
			if($('#editIMDBID').val() == '')
			{
				newIMDB = oldImdb;
			}
			if($('#editTitle').val() == '')
			{
				newType = oldType;
			}

			editMovie =
			{
				Title : newTitle,
				Year : newYear,
				id : oldImdb,
				Type : newType,
				Poster : oldPoster,
			};

			$.ajax({
				type:'PUT',
				url:'http://localhost:3000/Search/'+oldImdb,
				data:editMovie,
				success:function(data) 
				{
					alert("Updated Record");
					location.reload();	
				}
			});
		});
	});

});









		