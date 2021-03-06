
var selection = ["Raccoon", "Panda", "Penguin", "Owl", "Dog", "Cat"];
setAnimals();

function gifRequest(animal) {
    var key = "V6qydC22ACu4zLq6xo6ZVjd8fIx9VZkG";
    var request = $.get("https://api.giphy.com/v1/gifs/search?q="+ animal +"&api_key=" + key);
    
    request.done(function(data) {
        response = data;
        console.log(data);
        fill(data);
    });
}
function setAnimals() {
    $('#buttons').html("");
    for (var i = 0; i < selection.length; i++) {
        var newDiv = $('<div>').text(selection[i]);
        newDiv.addClass("btna");
        newDiv.addClass("btn");
        $('#buttons').append(newDiv);
    }
}

function fill(data) {
    $('#gifs').html("");
    for (var i = 0; i < data.pagination.count; i++) {
        var img = $('<img>').attr("src", data.data[i].images.fixed_width_still.url);
        img.attr("static", data.data[i].images.fixed_width_still.url)
        img.attr("width", "240");
        img.attr("height", "200");
        img.attr("dynamic", data.data[i].images.downsized_medium.url);
        img.addClass("animate");
        $('#gifs').append(img);
    }
}

$(document).on("click",".animate", function() {
    var static = $(this).attr("static");
    var dynamic = $(this).attr("dynamic");
    if ($(this).attr("src") === $(this).attr("static")) {
        $(this).attr("src", dynamic);
    }
    else {
        $(this).attr("src", static);
    }

    
  });

$('#addAnimal').on("click", function(event) {
    event.preventDefault();
    var animal = $('#animalForm').val();
    selection.push(animal);
    setAnimals();
});

$(document).on("click",".btna", function(event){
    event.preventDefault();
    var response = gifRequest($(this).text());
});




