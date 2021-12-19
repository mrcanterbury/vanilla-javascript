$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText)
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=f8c07b15')
        .then((response) => {
            console.log(response)
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-4">
                        <div class="well text-center">
                            <div class="item">
                                <img src="${movie.Poster}">
                                <h5 class="movieTitle">${movie.Title}</h5>
                                <a onclick="movieSelected('${movie.imdbID}')" style="text-decoration:none" class="btn-sm btn-warning" href="#">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err)
        });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'content.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=f8c07b15')
    .then((response) => {
        console.log(response)
        let movie = response.data;

        let output =`
        <div class="row">
            <div class="col-md-5">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-5">
                <div class="contentBox">
                    <h3 class="contentTitle">${movie.Title}</h2>
                </div>    
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre</strong>: ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Rated</strong>: ${movie.Rated}</li>
                    <li class="list-group-item"><strong>Released</strong>: ${movie.Year}</li>
                    <li class="list-group-item"><strong>Director</strong>: ${movie.Director}</li>
                    <li class="list-group-item"><strong>Starring</strong>: ${movie.Actors}</li>
                    <li class="list-group-item"><strong>IMDb Rating</strong>: ${movie.imdbRating}
                        <div class="ratingDivider"></div>
                        <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width:${(movie.imdbRating * 10)}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        <div class="progress-bar bg-danger" role="progressbar" style="width:${(100 - movie.imdbRating * 10)}%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </li>
                </ul>
                <br />
                    <div class="well">
                    <h5>Film Details:</h5>
                    ${movie.Plot}
                    <hr>
                    <div class ="mainButtons">
                        <a class="btn btn-warning" href="http://imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
                        <a class="btn btn-primary" href="index.html">Go Back</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err)
    });
}
