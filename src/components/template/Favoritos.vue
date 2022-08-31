<template>
  <div>
    <div class="filmesFavoritos animate__animated animate__fadeInLeftBig">
      <ul v-if="movieList && movieList.length > 0">
        <li v-for="(movie, index) in movieList" :key="index">
          <img
            v-if="movie.poster"
            class="poster-fav"
            :src="`https://image.tmdb.org/t/p/original${movie.poster}`"
            alt=""
          />
          <img class="poster-fav" v-else src="@/assets/semposter.png" alt="" />
          <div class="titulo-button">
            <router-link :to="{ name: 'Filme', params: { id: movie.id } }">
              <p class="titulo-fav">{{ movie.title }}</p>
            </router-link>
            <button class="botao-remover" @click="remover(index)">
              Remover
            </button>
          </div>
        </li>
      </ul>

      <p class="vazio" v-else>Nada por aqui ainda :)</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieList: [],
    };
  },
  created() {
    const moviesAdd = localStorage.getItem("movie");
    if (moviesAdd == null) {
      this.movieList = [];
    } else {
      this.movieList = JSON.parse(moviesAdd);
    }
  },
  methods: {
    remover(index) {
      const confirm = window.confirm("Deseja Remover?");
      if (confirm == false) {
        return;
      }

      this.movieList.splice(index, 1);
      localStorage.setItem("movie", JSON.stringify(this.movieList));
    },
  },
};
</script>

<style>
.filmesFavoritos {
  margin-top: 50px;
}

.poster-fav {
  width: 150px;
  border-radius: 5px;
}

.vazio {
  font-size: 2.5rem;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 700; /* Bold */
  color: #fff;
}

li {
  list-style: none;
  display: flex;
  margin-bottom: 20px;
}

.titulo-fav {
  color: #fff;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 700; /* Bold */
  font-size: 2rem;
  margin-left: 10px;
}

.titulo-fav:hover {
  color: #ffffff88;
}

.botao-remover {
  align-items: columns;
  margin-top: 25px;
  margin-left: 10px;
  height: 50px;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1rem;
  padding: 0.6rem 2rem;
  border: none;
  background: #ff4150;
  border-radius: 4px;
  color: #fff;
}

.botao-remover:hover {
  cursor: pointer;
}

/* MEDIA QUERY */
/* 
@media only screen and (max-width: 1400px) {
  
}

@media only screen and (max-width: 1000px) {

}

@media only screen and (max-width: 780px) {

}

@media only screen and (max-width: 575px) {

} */
</style>