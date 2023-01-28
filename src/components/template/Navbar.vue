<template>
  <div class="nav">
    <div class="logo">Overfilm</div>
    <div class="menu">
      <ul class="menu-links">
        <router-link to="/">
          <li>Filmes</li>
        </router-link>
        <router-link to="/favoritos">
          <li>Favoritos</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #222b30;
}

.nav {
  display: flex;
  width: 100%;
  height: 70px;
  background-color: #ff4150;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.logo {
  margin-left: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e8eced;
  font-size: 2.25rem;
  font-family: "Bebas Neue", cursive;
}

.menu {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.menu-links {
  display: flex;
  margin-left: 30px;
}

.menu-links li {
  list-style: none;
  margin: 0 15px;
  color: #e8eced;
  font-size: 1.125rem;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
}

.menu-links li:hover {
  color: #faffff;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>