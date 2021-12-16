$(function(){
    var results;
    var detail = [];
    var searchTerm = "Star Wars";
    
    function compareMovies(m1, m2){
        if(m1.Year < m2.Year){
            return -1;
        }else if (m1.Year > m2.Year){
            return 1
        }
        return 0;
    }
    
    $.get({
        url: "https://www.omdbapi.com/?s="+searchTerm+"&type=movie&apikey=7a47067",
        //http://www.omdbapi.com/?i=tt3896198&apikey=7a47067
        //url: "https://www.omdbapi.com/?i=tt3896198&apikey=7a47067",
        success: function(data, textStatus, jqXHR){
            if(textStatus === "success"){
                results = data["Search"];
                results.sort(compareMovies);
                var count = 0;
                detail = [];
                $("#status").html(data["totalResults"]+" results for '"+searchTerm+"', "+
                    "displaying the Top 10");
                for(var i=0; i<results.length; i++){
                    $("#brief-view > table > tbody").append("<tr>"+
                            "<td><img src='"+results[i]["Poster"]+"' title='"+results[i]["Title"]+"'</img></td>"+
                            "<td class='align-middle'>"+results[i]["Title"]+"</td>"+
                            "<td class='align-middle'>"+results[i]["Year"]+"</td>"+
                            "</tr>");
                    $.get({
                        url: "https://www.omdbapi.com/?i="+results[i]["imdbID"]+"&apikey=7a47067",
                        success: function(data, textStatus, jqXHR){
                            detail.push(data);
                            count++;
                            if (count == results.length){
                                detail.sort(compareMovies);
                                for(var i=0; i<detail.length; i++){
                                    $("#reception > table > tbody").append("<tr>"+
                                        "<td><img src='"+results[i]["Poster"]+"' title='"+results[i]["Title"]+"'</img></td>"+
                                        "<td class='align-middle'>"+detail[i]["Ratings"][0]["Value"]+"</td>"+
                                        "<td class='align-middle'>"+detail[i]["Ratings"][1]["Value"]+"</td>"+
                                        "<td class='align-middle'>"+detail[i]["Ratings"][2]["Value"]+"</td>"+
                                        "<td class='align-middle'>"+detail[i]["Awards"]+"</td>"+
                                        "</tr>");  
                                    $("#detail-view").append("<a data-toggle='collapse' href='#"+detail[i]["imdbID"]+"'>"+
                                        "<img src='"+detail[i]["Poster"]+"' title='"+detail[i]["Title"]+"'></img></a>");
                                }
                                for(var i=0; i<detail.length; i++){
                                    $("#detail-view").append("<div class='collapse' id='"+detail[i]["imdbID"]+"'>"+
                                        "<div class='card card-body'>"+
                                        "<h4>"+detail[i]["Title"]+
                                        " <span class='badge badge-dark'>"+detail[i]["Rated"]+"</span>"+
                                        " <span class='badge badge-secondary'>"+detail[i]["Runtime"]+"</span></h4>"+
                                        "<div class='container'><div class='row'>"+
                                        "<div class='col-lg-3 col-md-5 col-sm-6'>"+
                                        "<img src='"+detail[i]["Poster"]+"' title='"+detail[i]["Title"]+"'></img></div>"+
                                        "<div class='col-lg-9 col-md-7 col-sm-6'>"+
                                        "<p><b>Released: </b>"+detail[i]["Released"]+"</p>"+
                                        "<p><b>Directed By: </b>"+detail[i]["Director"]+"</p>"+
                                        "<p><b>Starring: </b>"+detail[i]["Actors"]+"</p>"+
                                        "<p><b>Summary: </b>"+detail[i]["Plot"]+"</p>"+
                                        "<p><b>IMDb link: </b><a href='https://www.imdb.com/title/"+detail[i]["imdbID"]+
                                        "'>imdb.com/title/"+detail[i]["imdbID"]+"</a></p>"+
                                        "</div></div></div></div></div>");
                                }
                                $("#detail-view > a").click(function(){
                                    $(".collapse").collapse("hide")
                                });
                            }
                        }
                    });
                }
                
            }
        }
    
    });
});
