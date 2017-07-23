/*var request = require('request');
var cheerio = require('cheerio');
var site_url = "http://www.freemusicpublicdomain.com/";


var wrapper = {

	song_urls: [],

	check_duplicates: function(elem){
		return wrapper.song_urls.includes(elem) ? true : false;
	},

	filter_urls: function(){
		//filter out non-amazon hosted links
		var filter_url = "https://s3-us";
		console.log(wrapper.song_urls[0]);

		var filtered = wrapper.song_urls.filter(function(elem){
			var split_elem = elem.split("").splice(0,filter_url.length).join("");
			if(split_elem == filter_url){
				return elem;
			}
		});

		return filtered;

	},

	generate_song_urls: function(){

		request(site_url, function(error, request, body){
			if(!error){
				var $ = cheerio.load(body);

					var song_links = $("a");

					song_links.each(function(index, link){
						var attr = $(link).attr("href");
						var mp3 = attr.split("").splice(attr.length-4,4).join("");

						if(mp3 == ".mp3"){
							if(!wrapper.check_duplicates(attr)){
								wrapper.song_urls.push(attr);
							}
						}
					})

					//console.log(song_urls);
					wrapper.filter_urls();

			}
			else{
				console.log(error);
			}
});

	}
}

wrapper.generate_song_urls();
console.log(wrapper.song_urls)

*/

