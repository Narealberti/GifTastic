$(document).ready(function(event){

	var animal = ["hamster", "hedgehog", "bird", "dog", "skunk"]; 
	 

	function search () {

		var limits = 10 ; 
		var key = "A7BAwcB8URKuegU5V3R4u1qk3VAjHPP7" ; 
		var search = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ search + "&api_key=" + key + "&limit=" + limits;

		$(".giph").empty(); 

		$.ajax({
			url: queryURL, 
			method: "GET"
		}).done(function(response){
			console.log(response); 
			for (var j = 0 ; j < limits ; j++) {
			
				var holder = $("<div>");
				holder.addClass("holders"); 
				console.log(holder)
				var stillImg = $("<img>").attr({
					"src": response.data[j].images.fixed_height_still.url, 
					"data-still": response.data[j].images.fixed_height_still.url, 
					"data-animate": response.data[j].images.fixed_height.url, 
					"data-state": "still", 
					"class": "pics"
				});
			
					console.log(stillImg); 

				var ratings = $("<p>").text("Ratings: " + response.data[j].rating);
					console.log(ratings)

				$(holder).append(stillImg); 
				$(holder).append(ratings); 

				$(".giph").append(holder); 

				loop(); 

			}; 

		}); 

	}; 



	function loop () {

		$(".category").empty();

		for (var i = 0 ; i < animal.length ; i++) {	

			var buttons = $("<button>");
			buttons.text(animal[i]); 
			buttons.addClass("tabs");
			buttons.attr("data-name", animal[i])
			$(".category").append(buttons);

		};
	};

		$("#add-animal").on("click", function (event) {

			event.preventDefault();
			var userAdd = $("#animal-input").val().trim()
			animal.push(userAdd);  

			
			loop (); 

		
		}); 

		function play () {
		 	var state = $(this).attr("data-state"); 
          		console.log("Initial State: " + state)
        	var dataAnimate = $(this).attr("data-animate");
        	var dataStill = $(this).attr("data-still"); 

        	if (state === "still") {
       			$(this).attr("src", dataAnimate); 
        		$(this).attr("data-state", "animate"); 
			 }

			else  { 
        		$(this).attr("src", dataStill); 
        		$(this).attr("data-state", "still");
      		}
      	}; 

		$(document).on("click", ".tabs", search); 
		$(document).on("click", ".pics", play); 
			
		loop(); 
		


}); 
