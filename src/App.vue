<template>
  <div class="app">
    <app-navbar />

    <router-view />

    <app-footer />
  </div>
</template>

<script>
import Navbar from "@/components/template/Navbar.vue";
import Footer from "@/components/template/Footer.vue";

export default {
  components: {
    "app-navbar": Navbar,
    "app-footer": Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@400;600;700&display=swap");

/* 
Fonte: Bebas Neue
- Regular 400

Fonte: Source Sans Pro
- Regular 400
- SemiBold 600
- Bold 700

Fonte: Inter
- Light 300
- Regular 400
- Medium 500
- SemiBold 600
- Bold 700

*/
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 100vh !important;
}
</style>
