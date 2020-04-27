<template>
  <v-app>
    <loading :isLoading="loading" />
    <div id="nav" class="blue lighten-2">
      <v-btn text to="/about" class="white--text">
        <v-icon>mdi-bulletin-board</v-icon>about
      </v-btn>
      <v-btn @click="logout" class="white--text" text v-if="userIsAuthenticated">
        <v-icon>mdi-logout</v-icon>logout
      </v-btn>
      <v-btn to="/" class="white--text" text v-else>
        <v-icon>mdi-home</v-icon>Home
      </v-btn>
    </div>
    <v-content>
      <transition
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutLeft"
      >
        <router-view class="text-center display-1 grey--text pa-4"></router-view>
      </transition>
    </v-content>

    <div>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Footer from "./components/Footer";
import loading from "./components/loading";
export default {
  data: () => ({
    logged: false,
    loading:false
  }),
  components: {
    Footer,
    loading
  },
  methods: {
    logout() {
      this.loading=true
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loading=false
          this.$router.push("/adminLogin");
        });
    }
  },
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.user.loggedIn;
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
