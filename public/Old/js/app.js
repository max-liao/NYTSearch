// Number of articles to display
var docsdisplayed = 3;

$("#submit").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "928e9f1b82f8483585bbe7df0b793334",
    });

    var HF = $("#HFinput").val().trim();
    var minyear = $("#startYear").val().trim();
    var maxyear = $("#endYear").val().trim();

    if (HF !== ""){
        url += '&q=' + HF;
    }

    if (minyear != ""){
        url += '&begin_date=' + minyear;
    }
    
    if (maxyear != ""){
        url += '&end_date=' + maxyear;
    }
   
    console.log(url)
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
      print(result);
    }).fail(function(err) {
      throw err;
    });;
});  

$("#clearresults").on("click", function(event) {
    $("#top-articles").empty("");
});

function print(result){
    // console.log(docsdisplayed);
    for (i=0; i< docsdisplayed; i++){
        var block = $("<div>");
        var a = $("<a>");
        var p = $("<p>");
        p.prepend("Title: ");
        p.append(result.response.docs[i].headline.main);
        p.append("<br>");
        p.append("Publication Date: ");
        p.append(result.response.docs[i].pub_date.substring(0,10));
        a.attr("href",result.response.docs[i].web_url);
        // var link = "<a href =" + result.response.docs[0].web_url + "link </a>"
        a.append(p);
        block.append(a);
        // console.log(block);
        $("#top-articles").append(block);
    }
}
