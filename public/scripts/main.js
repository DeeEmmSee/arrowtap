function MakeAPICall(url){
    $.ajax({url: url, success: function(result){
        return result;
    }});
}

function GenerateSeed(steps){
    var result = "";
    var taps = 0;

    for (var i = 1; i <= steps; i++) {
        taps += i
    }

    for (var i = 0; i < taps; i++) {
        var num = Math.floor(Math.random() * 8);  // between 0 and 7 - 0/4, 1/5, 2/6, 3/7
        result = result + num;
    }
    
    return result;
}