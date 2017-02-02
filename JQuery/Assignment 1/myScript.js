$(function (){

	var $printTable = $('#printTable');
	var $movieName = $('#movieName');
	var $searchButton = $('#searchButton');
	var $results = $('#results');
	var $printPoster = $('#printPoster');
	var $posterDetails = $('#posterDetails');

	$('#searchButton').on('click', function() {
		console.log("Search Button");
		$.ajax({
			type: 'GET',
			url: 'http://www.omdbapi.com/?s=title',
			success: function(data) {
				var reqData = data.Search;
				var count = 0;
				$printTable.empty();
				$results.empty();
				// $expandDetails.empty();
				$printPoster.empty();

				console.log("Success");
				if(!$movieName.val().trim()){
					$results.append('Please enter full/partial movie name!');
				}
				else{
					$.each(reqData, function(i,  movie){
						if(movie.Title.toLowerCase().includes($movieName.val().toLowerCase())){
							count++;
							
							console.log("Working");
							$printTable.append(''+count+'.<br>');
							$printTable.append('<li class="lists"> Title : '+movie.Title+'</li>');
							$printTable.append('<li class="lists"> Year : '+movie.Year+'</li>');
							$printTable.append('<li class="lists"> Type : '+movie.Type+'</li>');
							$printTable.append('<li  class="imdbId lists">'+movie.imdbID+'</li>');	
							$printTable.append('<li class="lists"><img src="' + movie.Poster+ '" alt="Movie Poster Not Available" /></li>');
							$printTable.append('<br><br>');

						}	
					});

					if(count == 0){
						$printTable.append('No movies found.');
					}
					else{							
						$results.append(count+' results found.');
					}
				}
			}
		});
	});




});