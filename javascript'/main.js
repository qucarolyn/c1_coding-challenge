const searchFrom = document.querySelector('.search'); 
const input = document.querySelector('.input');
const category = document.getElementById("category");
const newsList = document.querySelector('.news-list');
				
searchFrom.addEventListener('submit', getNews);
				
function getNews(e){
	newsList.innerHTML = '';
	e.preventDefault(); 			
				
	const apiKey = '78b9d599c4f94f8fa3afb1a5458928d6';
	let searchedFor = input.value;
	
	let myCategory = category.value; 		
	if(myCategory == 'choose') {
		myCategory = 'sports';
	}
	console.log(searchedFor);
				
	var url = 'https://newsapi.org/v2/top-headlines?' +
	    'country=us&' + 
	    'category=' + myCategory + '&' + 
	    'q=' + searchedFor + '&' + 
	    'sortBy=popularity&' +
	    'apiKey=' + apiKey; 
	
	console.log(url); 
	var req = new Request(url);
	
	fetch(req).then(function(response) {
		response.json().then(data => {
			console.log(data);
			data.articles.forEach(article => {
				document.createElement('li');
				let li = document.createElement('li');
				if(article.title != 'null') {
					let a = document.createElement('a');
					a.setAttribute('href', article.url);
					a.setAttribute('target', '_blank');
					a.textContent = article.title;
					li.appendChild(a);
				}
				
				let img = document.createElement('img');
				img.alt = "Icon for article";
				if(article.img != 'null') {
					img.src = article.urlToImage; 
				} else {
					img.src = article.urlToImage; //need to fix later
				}
				li.appendChild(img);

				let src = ''; 
				if (article.source.name != 'null') {
					src = 'Source: ' + article.source.name; 
				}
				
				let auth = ''; 
				if (article.author != 'null') {
					' | Author: ' + article.author;
				}
								
				if(src + auth != '') {
					let info = document.createElement('p');
					info.textContent = src + auth;
					li.appendChild(info);
				}
								   
				newsList.appendChild(li);
								
			})						
		});
	});
}