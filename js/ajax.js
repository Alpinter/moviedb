$(document).ready(function() {
	
    var api_key = "api_key=d6567c81b3f90902e0886a226056f0d6";
    var base_url ="https://api.themoviedb.org/3";
	var popular = "/tv/popular?";
    var url_request = base_url + popular + api_key;
    
    
    $(".container").on("mouseenter",".posters img",function(){
        $(this).fadeTo(50,0.7);
    });
	
    $(".container").on("mouseleave",".posters img",function(){
        $(this).fadeTo(50,1);
    });
    
    
    $.getJSON(url_request, serije);
    
    function serije(data) {
        var $posters = $(".posters");
        $posters.empty();
        var $serije = data.results;
        var $divRow;
        $.each($serije, function(index, value) {
            if(index % 4 == 0) {
                var $br = $("<br>");
                $divRow = $("<div></div>");
                $divRow.addClass("row");
                $posters.append($br, $divRow);
            }
            var $div = $("<div></div>");
            $div.addClass("col-md-3");
            var $img = $("<img>");
            $img.addClass("img-thumbnail");
            $img.attr({
                src: "http://image.tmdb.org/t/p/w300" + value.poster_path,
                title: value.name,
                id: value.id
            });
            $div.append($img);
            $divRow.append($div);
        })
    }
    
    $(".posters").on("click", "img", function() {
        var $id = $(this).attr("id");
        var url_dodatak = "/tv/" + $id;
        var url_request = base_url + url_dodatak + "?" + api_key;
        $.getJSON(url_request, sezone);
        
        var $title = $(this).attr("title");
        
        function sezone(data) {
            var $select = $("#cbInput");
            $select.empty();
            var $option = $("<option></option>");
            $option.text("Izaberite sezonu");
            $select.append($option);
            var $naziv = data.name;
            var $sezone = data.seasons;
            $.each($sezone, function(index, value) {
                var $option = $("<option></option>");
                $option.attr("value", (value.season_number + 1));
                $option.text($naziv + " - Season " + (value.season_number + 1));
                $select.append($option);
            })
            var $movie = $(".movie");
            $movie.empty();
            var $divSlika = $("<div></div>");
            $divSlika.addClass("col-md-2");
            var $img = $("<img>");
            $img.addClass("img-thumbnail");
            $img.attr("src", "http://image.tmdb.org/t/p/w185" + data.poster_path);
            $divSlika.append($img);
            var $div = $("<div></div>");
            $div.addClass("col-md-10");
            var $h1 = $("<h1></h1>");
            var $p = $("<p></p>");
            $p.addClass("text-justify");
            $p.attr("id", "overview");
            $p.text(data.overview);
            var $date = $.format.date(new Date(data.first_air_date), 'MMMM d, yyyy');
            var $spanDate = $("<span></span>");
            $spanDate.attr("id", "first_air_date");
            $spanDate.text("First air date: " + $date);
            var $br = $("<br />");
            var $spanCreated = $("<span></span>");
            $spanCreated.attr("id", "created_by");
            var $created = data.created_by;
            var $text = "Created by: "
            for(var i=0; i<$created.length; i++) {
                if(i == $created.length - 1) {
                    $text += $created[i].name;
                    break;
                }
                $text += $created[i].name + ", ";
            }
            $spanCreated.text($text);
            $div.append($h1, $p, $spanDate, $br, $spanCreated);
            $movie.append($divSlika, $div);
        }
        
        var $imdb_id;
        
        var url_external = base_url + url_dodatak + "/external_ids?" + api_key;
        $.getJSON(url_external, function(data) {
            var $a = $("<a></a>");
            $imdb_id = data.imdb_id;
            $a.addClass("title");
            $a.attr("href", "http://www.imdb.com/title/" + data.imdb_id);
            $a.text($title);
            $("h1").append($a);
        })
        
        $("#btnImdb").on("click", function() {
            var $season = $("#cbInput").val();
            var $url = "http://www.imdb.com/title/" + $imdb_id + "/episodes?season=" + $season;
            if($imdb_id !== "") {
                openInNewTab($url);
            }
            $imdb_id = "";
        })
    })

});

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
