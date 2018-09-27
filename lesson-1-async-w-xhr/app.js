(function () {
	const form = document.querySelector('#search-form');
	const searchField = document.querySelector('#search-keyword');
	const responseContainer = document.querySelector('#response-container');
	let searchedForText = '';

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		responseContainer.innerHTML = '';
		searchedForText = searchField.value;
		const unsplashRequest = new XMLHttpRequest();
		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.onload = addImage;
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID 9672eb13d6c3122aa9e2a2987340e59adaa1535a69ceae02750f3bc9928a6554');
		unsplashRequest.send();

		function addImage() {

			let htmlContent = '';
			const data = JSON.parse(this.responseText);

			if (data && data.results && data.results[0]) {

				const firstImage = data.results[0];

				htmlContent = `<figure>
				<img src="${firstImage.urls.regular}" alt="${searchedForText}">
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				</figure>`;
			} else {
				htmlContent = `<div class="error-no-image">No images available</div>`;
			}

			responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		}

		function addArticles() {
			let htmlContent = '';
			const data = JSON.parse(this.responseText);

			if (data && data.response && data.response.docs && data.response.docs[0]) {
				htmlContent = `<ul>` + data.response.docs.map(article => `<li class="article">
					<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
					<p>${article.snippet}</p>
					</li>`
				).join('') + `</ul>`;
			} else {
				htmlContent = `<div class = "error-no-article">No articles available</div>`;
			}

			responseContainer.insertAdjacentHTML('beforeend', htmlContent);

		}
		const articleRequest = new XMLHttpRequest();
		articleRequest.onload = addArticles;
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=337837b17f3e42d18d5cc704af47bd14`);
		articleRequest.send();

	});
})();
