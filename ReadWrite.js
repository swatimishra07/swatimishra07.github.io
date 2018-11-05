function WriteToDB()
			{
				console.log("writting")
				
				{"myDate": {"$date": "2010-07-20T23:23:50Z"}}
				
				$.ajax( { url: "mongodb://DotDotDot:Test1234@ds145093.mlab.com:45093/illusionsdata",
		  			data: JSON.stringify( { "x" : 1 } ),
		  			type: "POST",
		  			contentType: "application/json" } );
		  			
		  			console.log("written");
			}