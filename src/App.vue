<template>

  <v-app >
 <div id="nav" class="blue lighten-2" >
 <v-btn text to="/about" class="white--text">
    <v-icon  >mdi-bulletin-board </v-icon> about
   </v-btn>
     <v-btn @click="logout" class="white--text" text v-if="userIsAuthenticated"><v-icon>mdi-logout</v-icon> logout</v-btn>
      <v-btn to="/" class="white--text" text v-else ><v-icon>mdi-home</v-icon> Home</v-btn>
    
  

    </div>

    <v-content >
  <router-view class="text-center  display-1 grey--text pa-4">
    
  </router-view>

    </v-content>
    <div>
       <v-card
        flat
        tile
        width="100%"
       
        class="teal text-center"
      >
      <v-footer color="grey darken-2" padless>

  <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong >Cachar College <v-avatar tile><v-img src="./assets/logo.png"></v-img></v-avatar></strong>

          <v-divider></v-divider>
         
          <div class="pt-2">
           <v-icon color="blue">mdi-instagram</v-icon>
          <v-icon color="blue">mdi-facebook</v-icon>
          <v-icon color="blue">mdi-whatsapp</v-icon>
          </div>
   
        </v-card-text>

  </v-footer>
       </v-card>
    </div>
  </v-app>
</template>
<script>
import firebase from "firebase"
export default {
    data:()=>({
      logged:false
    }),
      methods:{

      logout(){
           firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/adminLogin')
        });   
         },
      },  
  computed:{
    userIsAuthenticated () {
      return this.$store.getters.user.loggedIn  
     
      }, 
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
