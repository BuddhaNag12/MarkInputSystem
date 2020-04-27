<template>
  <div>
    <loading :isLoading="loading"/>
    <v-container fluid>
      <p class="caption blue--text">{{this.error}}</p>
      <v-row justify="center">
        <v-col class="col-xs-12 col-lg-4">
          <v-card class="elevation-5">
            <v-toolbar color="blue lighten-2" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onSignin">
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  v-model="email"
                />

                <v-text-field
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="password"
                />
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import loading from "../components/loading";
export default {

  components:{
    loading
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading:false
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onSignin() {
      // this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.$router.replace("/dashboard");
        })
        .catch(err => {
          //  console.log(err)
          this.error = err;
          this.loading = false;
        });
    }
  }
};
</script>