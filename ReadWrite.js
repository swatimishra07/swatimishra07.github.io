function WriteToDB(userInfo)
{
				
    		//var userInfo = {"lat": 41.23, "long": 2.23, "time": {"$date": new Date().toISOString()}};
    		var _apiKey = "N1eQIa_ozG8nn1WSGPDZ6sMB6YQejYXy";
    		var _QueryApiKey = "&apiKey=N1eQIa_ozG8nn1WSGPDZ6sMB6YQejYXy";
    		var _baseURL = "https://api.mlab.com/api/1/databases/illusionsdata/collections/UserData?apiKey=";
    		var _baseQueryURL = "https://api.mlab.com/api/1/databases/illusionsdata/collections/UserData?";


        $.ajax({
                url: _baseURL + _apiKey,
                data: JSON.stringify(userInfo),
                type: "POST",
                contentType: "application/json"
            }).done(function (data) {
                //userLogged = data;
                console.log("success");
            }).fail(function (error) {
                console.log("Error" + error);
            });
       
}