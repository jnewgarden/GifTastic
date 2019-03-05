var gifsArray = [];

var topics = ["Doug", "Rick and Morty", "Family Guy", "Adventure Time", "Futurama", "Courage the Cowardly Dog", "The Simpsons", "Ducktales"];

function displayInitialButtons() {

    for (var i = 0; i < topics.length; i++) {

        var topicsDiv = $("<button>");
        var topicsBtnName = topicsDiv.text(topics[i]);

        topicsDiv.attr("data-name", topics[i])

        $(topicsBtnName).addClass("btn");

        $("#initial-buttons").append(topicsDiv)


        $("button").on("click", function () {
            displayGifs($(this).data("name"))

        });

    }

}

function displayGifs(gifSearch) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=K9dCzKDPAvhpKUrBsx8d6slx2asuezE0&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = $("<p>").text("Rating: " + results[i].rating)

            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height_still.url);

            gifImage.attr("data-still", results[i].images.fixed_height_still.url);

            gifImage.attr("data-animate", results[i].images.fixed_height.url);

            gifImage.attr("data-state", "still");

            gifImage.addClass("gif");

            gifDiv.append(rating);

            gifDiv.append(gifImage)

            gifDiv.addClass("col-md-3")

            $("#gifsDisplay").prepend(gifDiv);

            $(".gif").on("click", function () {

                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        };

    })

}


function createButtons() {

    $("gifsButtons").empty();

    $(document).on("click", "#gifSearch-input", function (event) {
        event.preventDefault();

        var addedGifs = $("#gifSearch").val().trim();

        gifsArray.push(addedGifs)

        var addedGifsButton = $("<button>");

        $(addedGifsButton).addClass("btn");

        addedGifsButton.append(addedGifs);
        
        $("#gifsButtons").prepend(addedGifsButton)

        addedGifsButton.addClass("gif")

        $("button").on("click", function () {

            displayGifs(addedGifs)

        })

    });

}
displayInitialButtons()

