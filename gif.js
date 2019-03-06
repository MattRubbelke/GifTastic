$(document).ready(function (){

// Variables needed
var topics = ["WTF", "Cackling", "Giggling", "Hell Yeah", "Real Housewives", "RPDR" ]

// Button creation
function renderButtons(){
    $("#gifs-button").empty();
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var button = $("<button type='button' class='btn btn-secondary'>");
        // Adding a class
        button.addClass("gif");
        // Adding a data-attribute with a value of the movie at index i
        button.attr("data-name", topics[i]);
        // Providing the button's text with a value of the movie at index i
        button.text(topics[i]);
        // Adding the button to the HTML
        $("#gifs-button").append(button);
      }
}

// GIPHY API
function giphy(){
    $("#gifs-display").empty();
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=sWDh0EZ5ndonQug9fGltl8pE9KTZsTk2&limit=10";

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    var results = response.data;

    // Creates a div to hold the movie
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gif-image'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");

        gifImage.addClass("giphy");

        gifImage.attr("src", results[i].images.fixed_height_still.url);

        gifImage.attr("data-still", results[i].images.fixed_height_still.url);

        gifImage.attr("data-animate", results[i].images.fixed_height.url);

        gifImage.attr("data-state", "still");
        
        gifDiv.prepend(p);
        
        gifDiv.prepend(gifImage);

        $("#gifs-display").prepend(gifDiv);
    };
});
}

$("#add-gifs").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // Form input creates a button
    var newButton = $("#gif-input").val().trim();
    topics.push(newButton);
    renderButtons();
    $("#gif-input").val("");
});

// Runs the button function
renderButtons();

// Animates the gif. The gif has to be double-clicked.
function stillAnimate(){
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");
        console.log("this is the image's state: " + state);
        if (state === "still"){
            $(this).attr("data-state" , "animate");
            $(this).attr("src", animate);
        } 
        if (state === "animate"){
            $(this).attr("data-state", "still");
            $(this).attr("src", still);
        }
    };

// Runs the button clicks
$(document).on("click", ".gif", giphy);
$(document).on("click", ".giphy", stillAnimate); 
});