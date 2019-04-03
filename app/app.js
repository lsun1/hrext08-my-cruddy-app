var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

var movieName;

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	loadLocalStorage();

	$('#btn-movie').on('click', function(e) {
		$('#searchResults').html('');
		movieName = $('#movieName').val();
		var searchObj = searchMovie(movieName);
		setTimeout(function() {
			searchObj["responseJSON"]["Search"].forEach(function(val) {
				var imdbID = String(val['imdbID']);
				$('#searchResults').append(`<div class="searchTitle ${imdbID}">${val['Title']} (${val['Year']})</div>`);				
				});
		},500);
	});

	$('#btn-movie2').on('click', function(e) {
		$('#searchResults2').html('');
		movieName = $('#movieName2').val();
		var searchObj = searchMovie(movieName);
		setTimeout(function() {
			searchObj["responseJSON"]["Search"].forEach(function(val) {
				var imdbID = String(val['imdbID']);
				$('#searchResults2').append(`<div class="searchTitle ${imdbID}">${val['Title']} (${val['Year']})</div>`);				
				});
		},500);
	});

	$('#searchResults, .searchTitle').on('click', function(e) {
		if ($(e.target)[0]["classList"][1] === undefined) {
			return;
		};
		$('#searchResults').html('').fadeOut();
		$imdbID = $(e.target)[0]["classList"][1];
		console.log($imdbID);
		var movieStats = getMovie($imdbID);
		return setTimeout(function() {
			console.log(movieStats["responseJSON"]);
			$('#searchResults').append(`<img src='https://img.omdbapi.com/?apikey=${apiKey}&i=${$imdbID}'><div class="movie1">imdb rating: ${movieStats["responseJSON"]["imdbRating"]}</div>`).fadeIn();
			$('#searchResults').removeClass('.searchTitle');
			return movieStats["responseJSON"]["imdbRating"];
		},500);
	});

	$('#searchResults2, .searchTitle').on('click', function(e) {
		if ($(e.target)[0]["classList"][1] === undefined) {
			return;
		};
		$('#searchResults2').html('').fadeOut();
		$imdbID = $(e.target)[0]["classList"][1];
		console.log($imdbID);
		var movieStats = getMovie($imdbID);
		return setTimeout(function() {
			console.log(movieStats["responseJSON"]);
			$('#searchResults2').append(`<img src='https://img.omdbapi.com/?apikey=${apiKey}&i=${$imdbID}'><div class="movie1">imdb rating: ${movieStats["responseJSON"]["imdbRating"]}</div>`).fadeIn();
			$('#searchResults2').removeClass('.searchTitle');
			return movieStats["responseJSON"]["imdbRating"];
		},500);
	});


	$('#btn-create').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			updateStatusLabel('key already exists, please use update button instead! :D');
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		}else {
			createEntry(key, value);
			updateStatusLabel('key created - ' + key);
		}

		loadLocalStorage();
	});

	$('#btn-update').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('key not updated - that value already exists silly! xD')
		} else if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('key updated - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
		}		
		
		loadLocalStorage();		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('key removed - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('key doesn\'t exist, nothing removed. :|');
		}

		loadLocalStorage();
	});

	$('#btn-show').on('click', function(e) {
		$('.movie1, .movie2').show();
	})	

	$('#btn-clear').on('click', function(e) {
		$('#searchResults').html('');
		$('#searchResults2').html('');
	})

});
/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var searchMovie = function(val) {
	return $.getJSON("https://www.omdbapi.com/?s="+val+"&apikey="+apiKey, function(data) {
		return data;
	});
}

var getMovie = function(val) {
	return $.getJSON("https://www.omdbapi.com/?i="+val+"&apikey="+apiKey, function(data) {
		return data;
	});
}

var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}
