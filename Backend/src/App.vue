<template>
  <div id="app">
    <header>
      <h1>Welcome to My Vue App!</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}

header {
  background-color: #42b983;
  padding: 20px;
  border-radius: 8px;
  color: white;
}

h1 {
  font-size: 2.5em;
  margin: 0;
}

main {
  margin-top: 20px;
}
</style>
