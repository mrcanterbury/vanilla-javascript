Movie search application using Axios, jQuery and the OMDb API: https://www.omdbapi.com/

Followed tutorial by Traversy Media: https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA , but the API now requires a key. Had to make minor modifications to get the requests to function.

Added a visual for the IMDb rating- the style width of the green or red is calculated on the percentage of the rating:
style="width:${(movie.imdbRating * 10)}%;" - Green
style="width:${(100 - movie.imdbRating * 10)}%;" - Red
