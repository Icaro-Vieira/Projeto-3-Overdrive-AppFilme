<template>
  <div>
    <div class="flex">
      <div class="imagem-detail animate__animated animate__backInDown">
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
          alt=""
        />
        <img v-else src="@/assets/semposter.png" alt="" />
      </div>

      <div class="info-detail">
        <p class="titulo animate__animated animate__backInDown">
          {{ movie.title }}
        </p>

        <p class="genero animate__animated animate__backInDown">
          <span v-for="(genre, i) in movie.genres" :key="i">
            {{ genre.name }}
            <span class="genero" v-if="movie.genres.length - 1 !== i">•</span>
          </span>
        </p>

        <p class="data animate__animated animate__backInDown">
          {{ movie.release_date | dateFormat }}
        </p>

        <p class="sinopse animate__animated animate__backInDown">Sinopse</p>
        <p class="overview animate__animated animate__backInDown">
          {{ movie.overview }}
        </p>

        <button
          class="botao animate__animated animate__backInDown"
          @click="addFavoritos"
        >
          Adicionar aos Favoritos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    const genres = await this.$http.get("/genre/movie/list", {
      params: { language: "pt-BR" },
    });
    this.allGenres = genres.data.genres;
  },
  data() {
    return {
      movie: {
        credits: {},
      },
      allGenres: [],
    };
  },
  mounted() {
    this.fetchMovie(this.$route.path.substring(7));
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.path.substring(7));
      },
      imediate: true,
    },
  },
  methods: {
    async fetchMovie(movieId) {
      const response = await this.$http.get(
        "/movie/" + movieId + "?append_to_response=credits,images",
        {
          params: { language: "pt-BR" },
        }
      );
      this.movie = response.data;
    },

    addFavoritos() {
      const moviesAdd = localStorage.getItem("movie");

      let movieList = [];

      if (moviesAdd == null) {
        localStorage.setItem("movie", JSON.stringify([]));
      } else {
        movieList = JSON.parse(moviesAdd);
      }

      const existe = movieList.find((e) => {
        return e.id == this.movie.id;
      });

      if (existe) {
        alert("Você já adicionou esse filme :)");
        return;
      }

      movieList.push({
        id: this.movie.id,
        poster: this.movie.poster_path,
        title: this.movie.title,
      });
      localStorage.setItem("movie", JSON.stringify(movieList));

      alert("Filme adicionado aos Favoritos");
    },
  },
  filters: {
    dateFormat(date) {
      if (date) {
        var release_date = date.split("-");
        return release_date[2] + "/" + release_date[1] + "/" + release_date[0];
      } else {
        return "Sem data...";
      }
    },
  },
};
</script>

<style>
.flex {
  display: flex;
  margin-left: 45px;
  margin-top: 45px;
}

.imagem-detail img {
  width: 300px;
  height: 450px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.titulo {
  font-size: 2.5rem;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 700; /* Bold */
  color: #fff;
}

.sinopse {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600; /* Semi Bold */
  color: #fff;
  font-size: 20px;
}

.genero {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400; /* Semi Bold */
  color: rgba(255, 255, 255, 0.685);
  font-size: 1.15rem;
}

.overview {
  color: #fff;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400; /* Regular */
}

.info-detail {
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  max-width: 500px;
}

.botao {
  display: block;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.5rem;
  padding: 0.6rem 2rem;
  border: none;
  background: #ff4150;
  border-radius: 4px;
  color: #fff;
  margin-top: 25px;
}

.botao:hover {
  cursor: pointer;
  background-color: #e73846;
  transition: 1.5s;
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