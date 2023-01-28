<template>
  <div>
    <div class="filmes animate__animated animate__fadeInDown">
      <div class="card-filme" v-for="(film, index) in fullMovies" :key="index">
        <div class="capa-filme">
          <router-link :to="{ name: 'Filme', params: { id: film.id } }">
            <img
              v-if="film.poster_path"
              :src="`https://image.tmdb.org/t/p/original${film.poster_path}`"
              alt=""
            />
            <img v-else src="@/assets/semposter.png" alt="" />
          </router-link>
        </div>
        <div class="informacoes">
          <p class="title-filme">
            {{ film.title }}
          </p>
          <p class="data">
            {{ film.release_date | dateFormat }}
          </p>

          <p class="genero">
            <span v-for="(genre, i) in film.genre_ids" :key="i">
              {{ getGeners(genre) }}
              <span class="genero" v-if="film.genre_ids.length - 1 !== i"
                >•</span
              >
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="text-center paginacao">
      <v-pagination
        :value="page"
        @input="atualizaPagina"
        :length="200"
        total-visible="6"
        class="mt-10 mb-4"
      ></v-pagination>
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

    try {
      this.listarFilme();
      this.getGenre();
    } catch (error) {
      //fecha TRY
      console.log(error);
    }
  },
  data() {
    return {
      totalPages: null,
      page: 1,
      fullMovies: [],
      allGenres: [],
    };
  },
  filters: {
    dateFormat(date) {
      if (date) {
        var release_date = date.split("-");
        return release_date[2] + "/" + release_date[1] + "/" + release_date[0];
      } else {
        return "Sem data";
      }
    },
  },
  methods: {
    getGeners(genre) {
      const genero = this.allGenres.find((g) => g.id == genre);
      if (genero) {
        return genero.name;
      } else {
        return "Sem genero";
      }
    },

    // Calculo da Páginação

    async listarFilme() {
      let n = 0;
      let pa = 0;
      if (this.page == 1) {
        pa = 1;
      } else if (this.page % 2 == 0) {
        n = this.page / 2;
        pa = 3 + (n - 1) * 5;
      } else {
        n = (this.page + 1) / 2;
        pa = 1 + (n - 1) * 5;
      }
      for (let page = pa; page <= pa + 2; page++) {
        const response = await this.$http.get("/discover/movie", {
          params: {
            page: page,
            sort_by: "primary_release_date.desc",
            language: "pt-BR",
          },
        });
        this.totalPages = response.data.total_pages;
        this.fullMovies.push(...response.data.results);
      }

      if (this.page % 2 == 0) {
        this.fullMovies.splice(0, 10);
      } else if (this.page % 2 == 1) {
        this.fullMovies.splice(50, 60);
      }
      console.log(this.fullMovies);
    },
    atualizaPagina(page) {
      this.page = page;
      this.fullMovies = [];
      this.listarFilme();
    },
  },
};
</script>

<style>
/* FILME */
.filmes {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  padding: 65px 80px;
  gap: 0.5rem;
}

.capa-filme img {
  width: 100%;
  height: 300px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.informacoes {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.card-filme {
  transition: 0.3s all;
  width: 200px;
  margin-bottom: 60px;
  margin-left: 15px;
  grid-column: span 1 / span 1;
  border: solid 1px #222;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 15px;
}

.card-filme:hover {
  transform: scale(1.1);
}

.title-filme {
  text-align: left;
  font-size: 1em;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  color: #e8eced;
}

.data {
  text-align: left;
  font-size: 1em;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #e8eced;
  margin-top: 5px;
}

.genero {
  font-size: 5px;
  font-weight: 100;
  color: #e8eced;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
}

.paginacao {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #222;
}

/* MEDIA QUERY */

@media only screen and (max-width: 1400px) {
  .filmes {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media only screen and (max-width: 1000px) {
  .filmes {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media only screen and (max-width: 780px) {
  .filmes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media only screen and (max-width: 575px) {
  .filmes {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>