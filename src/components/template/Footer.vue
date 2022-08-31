<template>
  <div class="footer">
    <p class="info-footer">
      Projeto 3 - Overdrive &copy;
      <a href="https://github.com/Icaro-Vieira" target="_blank">
        Ícaro Vieira
      </a>
      |
      {{ new Date().getFullYear() }}
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap");

a {
  text-decoration: none;
  color: #e8eced;
}

.footer {
  background-color: #ff4150;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-footer {
  text-align: center;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  color: #fff;
  font-size: 20px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
}
</style>