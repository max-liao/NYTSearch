// Number of articles to display
var docsdisplayed = 3;

// Function to be displayed on Test button click
// $("#test").on("click", function(event) {
//     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//     url += '?' + $.param({
//       'api-key': "928e9f1b82f8483585bbe7df0b793334",
//       'q': "trump",
//       'begin_date': "20170101",
//       'end_date': "20180101"
//     });
//     $.ajax({
//       url: url,
//       method: 'GET',
//     }).done(function(result) {
//       console.log(result);
//       print(result);
//     }).fail(function(err) {
//       throw err;
//     });;
//     console.log(url)
// });


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
   
    // if (minyear != ""){
    //     if (minyear.length == 8){
    //         url += '&begin_date=' + minyear;
    //     } else {
    //         alert ("Please enter a date in the YYYYMMDD format")
    //     }
    // }

    // if (maxyear != ""){
    //     if (maxyear.length == 8){
    //         // console.log("Correct");
    //         url += '&begin_date=' + maxyear;
    //     } else {
    //         alert ("Please enter a date in the YYYYMMDD format")
    //     }
    // }

    // console.log(url);

    // url += '?' + $.param({
    //   'api-key': "928e9f1b82f8483585bbe7df0b793334",
    //   'q': HF,
    //   'begin_date': minyear,
    //   'end_date': maxyear
    // });
    
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

$("#testfq").on("click", function(event) {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "928e9f1b82f8483585bbe7df0b793334",
      'fq': "title:'Patrick's' AND body: 'the'"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
    });
});