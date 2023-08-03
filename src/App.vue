<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/hero.svg" width="125" height="125" />

    <div class="wrapper">
      <CustomMessage msg="Be Hero!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/add">Cadastrar</RouterLink>
        <RouterLink to="/list">Lista</RouterLink>
        <RouterLink to="/heroes">Herois</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import CustomMessage from '@/components/CustomMessage.vue'
</script>


<style>
header {
  width: 40vw;
  height: 100vh;
  background-color: rgb(160, 228, 205);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

header img {
  width: 300px;
  height: 300px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  width: 90%;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

nav a.router-link-exact-active {
  color: blueviolet;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;

  width: 120px;
  height: 40px;

  font-size: 1.2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
}

nav a:first-of-type {
  border: 0;
}

main {
  width: 60vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #7400e0;
}
</style>
