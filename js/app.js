
// Fetch API and Display Upcoming movies
async function homePage(getMovie) {

  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1&query=${getMovie}`);
  const data = await response.json();
  console.log(data);

  header.innerHTML = `<h2 class="header-text">UPCOMING MOVIES...</h2>`;

  movieShowcase.innerHTML = data.results.map(movie => `
  <div class="movie-results">
  <img src= "https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt= "${movie.title}" class="img-responsive"/>
  <div class="movie-info">
  <h6>${movie.title}</h6>
  <a onclick="getMovieById('${movie.id}')" href="#" class="btn">Details</a>
  </div>
  </div> 
  `)
  .join('');
};


//Fetch Movie Details API, add session storage and add details to the DOM
function getMovieById(id) {
  sessionStorage.setItem('movieID', id);
  window.location = 'movie.html';
  return false;
}

async function getMovieDetails() {
  let movieID = sessionStorage.getItem('movieID');

  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/?api_key=${key}`);
  const dataResponse = await res.json();
  console.log(dataResponse);
  
  let movie = res.dataResponse;
  
  infoSection.innerHTML = `
  <div class="row">
  <div class="col-md-4">
  <img src= "https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt= "${movie.title}" class="img-responsive" />
  </div>
  <div class="col-md-8">
  <h4>${movie.title}</h4>
  ${movie.overview}
  ${movie.runtime}
  ${movie.genres}
  ${movie.status}
  ${movie.release_date}
  </div>
 </div>
  `
}


//Add Event Listeners To home search button
home.addEventListener('click', homePage);












