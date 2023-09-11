let favMovies = [
  {
    id: "1",
    title: "No-Way-Home",
    releasedate: "2017",
  },
  {
    id: "2",
    title: "Gardian of the galaxy",
    releasedate: "2019",
  },
  {
    id: "3",
    title: "Iron-man",
    releasedate: "2010",
  },
  {
    id: "4",
    title: "captain-america",
    releasedate: "2005",
  },
  {
    id: "5",
    title: "Hulk",
    releasedate: "2019",
  },
  {
    id: "6",
    title: "Doctor strange",
    releasedate: "2019",
  },
  {
    id: "7",
    title: "Multiverse",
    releasedate: "2019",
  },
  {
    id: "8",
    title: "Winter-soldier",
    releasedate: "2019",
  },
  {
    id: "9",
    title: "The End Game",
    releasedate: "2019",
  },
  {
    id: "10",
    title: "spider man",
    releasedate: "2019",
  },
];

function makeMovieDiv(movie) {
  const div = document.createElement("div");
  div.setAttribute("class", "movie-card");

  const id = `movie-${movie["id"]}`;
  div.setAttribute("id", id);

  const h2 = document.createElement("h2");
  h2.innerText = movie["title"];

  const h3 = document.createElement("h3");
  h3.innerText = movie["releasedate"];

  const button = document.createElement("button");
  button.innerText = "Delete";
  button.addEventListener('click', function(){
    div.remove();
})

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(button);

  return div;
}

function appendToApp(movieDiv) {
  const app = document.querySelector(".total-div");
  app.appendChild(movieDiv);
}

for (let i = 0; i < favMovies.length; i++) {
  const movieDiv = makeMovieDiv(favMovies[i]);
  appendToApp(movieDiv);
}
  