
// Fetch API and Display Upcoming movies
async function homePage(getMovie) {

  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1&query=${getMovie}`);
  const data = await response.json();
  console.log(data);

  header.innerHTML = `<h2 class="header-text">UPCOMING MOVIES...</h2>`;

  movieShowcase.innerHTML = data.results.map(movie => `
     <div class="movie-results">

     <img src= "https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt= "${movie.title}" />

     <div class="movie-info" data-movieID= "${movie.id}">
     <h6>${movie.title}</h6>
     </div>
     </div>
  `)
  .join('');
}

//Get Movie ID and display on the DOM
async function getMovieById(movieID) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`);
  const data = await response.json();
  console.log(data);

  const details = data.results[0];
  

  addInfoToDOM();
}

// Add movie info to DOM
function addInfoToDOM() {
   infoSection.innerHTML = data.results.map(movie => `
     <div class="info-section>
      <h1>${movie.title}</h1>
      <img src= "https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt= "${movie.title}" />

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

//Get new set of upcoming movies on page reload
function getUpcomingMovies() {

}


//Display movie details
movieShowcase.addEventListener('click', (e) => {
  const movieInfo = e.path.find(item => {
    if(item.classList) {
      return item.classList.contains("movie-info");
    } else {
      return false;
    }
  });
  if(movieInfo) {
    const movieID = movieInfo.getAttribute('data-movieID');

    getMovieById(movieID);
  }
});


//Add Event Listeners
refreshPage.addEventListener('click', getUpcomingMovies);
home.addEventListener('click', homePage);








