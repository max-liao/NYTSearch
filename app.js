
var docsdisplayed = 5;

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

    if (HF == true){
       var HF = $("#HFinput").val().trim();
       url += '?' + HF;
    }

    if (minyear == true){
        var minyear = $("#startYear").val().trim();
        url += '?' + minyear;
    }
    if (maxyear == true){
        var maxyear = $("#endYear").val().trim();
        url += '?' + maxyear;
    }

   console.log(url);
   
    // url += '?' + $.param({
    //   'api-key': "928e9f1b82f8483585bbe7df0b793334",
    //   'q': HF,
    //   'begin_date': minyear,
    //   'end_date': maxyear
    // });
    
    // console.log(url);

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
        $("#top-articles").prepend(block);
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