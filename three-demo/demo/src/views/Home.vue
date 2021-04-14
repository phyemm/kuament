<template>
  <div id="nav">
    <router-link to="/ground">科幻地面流光</router-link>
    <router-link to="/line">科幻数字线条</router-link>
    <router-link to="/earth">科幻地球</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
};
</script>
<style  scoped>
#nav {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  line-height: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>