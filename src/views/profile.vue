<template>
  <div>
    <v-container>
      <v-btn text to="/dashboard">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div v-if="loading">
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </div>
      <div v-else>
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-img :src="this.profile.imgurl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{this.profile.name}}</v-list-item-title>
              <v-list-item-subtitle>{{this.profile.dep}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{this.profile.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{this.profile.college}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>
          <v-card-text>You can update your profile by clicking update profile</v-card-text>

          <v-card-actions>
               <v-btn text :to="'/update_profile/'+this.id">
                    <v-icon dark class="pr-2">mdi-wrench</v-icon>UPDATE PROFILE
                  </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { app } from "../fb";
const db = firebase.firestore(app);
export default {
  data() {
    return {
      profile: {
        name: "",
        imgurl: "",
        phone: "",
        college: "",
        email: "",
        dep: ""
      },
      loading: false,
      err: ""
    };
  },

  props: ["id"],

  created() {
    this.loading = true;
    let docRef = db.collection("users").doc(this.id);
    docRef
      .get()
      .then(doc => {
          this.loading=false
        if (doc.exists) {
          (this.profile.imgurl = doc.data().imgurl),
            (this.profile.name = doc.data().name);
          this.profile.phone = doc.data().phone;
          this.profile.dep = doc.data().department;
          this.profile.college = doc.data().college;
          this.profile.email = doc.data().email;
        }
      })
      .catch(function(error) {
        this.err = error;
      });
  }
};
</script>