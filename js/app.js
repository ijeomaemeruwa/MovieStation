
// Fetch API and Display Upcoming movies
async function homePage(getMovie) {

  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1&query=${getMovie}`);
  const data = await response.json();
  console.log(data);

  header.innerHTML = `<h2 class="header-text">UPCOMING MOVIES...</h2>`;

  movieShowcase.innerHTML = data.results.map(movie => `
     <div class="movie-results">

     <img src= "https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt= "${movie.title}" class="img-responsive"/>

     <div class="movie-info" data-movieId= "${movie.id}">
     <h6>${movie.title}</h6>
     </div>
     </div>
  `)
  .join('');
}

//Get Movie details
movieShowcase.addEventListener('click', (e) => {
  const movieInfo = e.path.find(item => {
    if(item.classList) {
      return item.classList.contains("movie-info");
    } else {
      return false;
    }
  });
  
  if(movieInfo) {
    const movieData = movieInfo.getAttribute('data-movieId');

    getMovieById(movieData);
  }
});


//Get Movie ID from API and display on the DOM
async function getMovieById(movieData) {

  movieShowcase.innerHTML = '';

  const res = await fetch(`https://api.themoviedb.org/3/{movie_id}movie/?api_key=${key}&query=${movieData}`);
  const dataResponse = await res.json();
  console.log(dataResponse);

   const details = dataResponse.results[0];
  

  addInfoToDOM();
}

// Add movie details to the DOM
function addInfoToDOM() {
   infoSection.innerHTML = data.results.map(movie => `
     <div class="info-section>
      <h1>${movie.title}</h1>
      <img src= "https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt= "${movie.title}" class="img-responsive" />

      <div class="details">
      <h6>${movie.title}</h6>
      ${movie.overview}
      ${movie.genre_ids}
      ${movie.release_date}
      </div>
     </div>
   `
   );
}



//Add Event Listeners To home search button

home.addEventListener('click', homePage);









