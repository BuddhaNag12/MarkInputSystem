<template>
  <v-img src="../assets/cc2.jpg" height="800px">
    <v-container class="page">
      <div class="text-center">
        <v-dialog v-model="subAdded" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Info</v-card-title>
            <v-card-text class="pa-3">
              <v-alert type="success">subject added</v-alert>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="subAdded = false">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div v-if="user.data">
        <v-row no-gutters>
          <v-col lg="4" sm="12" md="6">
            <v-card width="280" class="mx-auto deep-purple accent-2" tile>
              <v-list dense>
                <v-list-item two-line class="mx-2" link :to="'/profile/'+user.data.id">
                  <v-list-item-content>
                    <v-list-item-title class="text-uppercase">Name:{{user.data.name}}</v-list-item-title>
                    <v-list-item-subtitle class="text-uppercase">Dpt.{{user.data.department}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile>
                    <img :src="user.data.imgurl" alt="profile" />
                  </v-list-item-avatar>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-btn text to="/ut1">
                    <v-icon class="pr-2">fas fa-edit</v-icon>UNIT TEST I
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text to="/ut2">
                    <v-icon class="pr-2">fas fa-edit</v-icon>UNIT TEST II
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn text v-on="on">
                        <v-icon class="pr-2">mdi-account-edit</v-icon>add Subject
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Add Subject</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-layout row class="justify-center">
                            <v-flex xs8>
                              <form @submit.prevent="addSubject">
                                <v-select
                                  :items="['1st semester','2nd semester','3rd semester','4th semester','5th semester','6th semester']"
                                  v-model="sem"
                                  prepend-icon="mdi-asterisk"
                                  label="Semester"
                                ></v-select>
                                <v-select
                                  :items="['pass','honors']"
                                  prepend-icon="mdi-asterisk"
                                  v-model="type"
                                  label="type"
                                  @change="changeInput"
                                ></v-select>
                                <v-text-field
                                  prepend-icon="mdi-asterisk"
                                  :disabled="disabled"
                                  v-model="subject_name"
                                  label="Subject name"
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
                                <v-btn color="primary" text type="submit">Save</v-btn>
                              </form>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <h2>*indicates required field</h2>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-list-item>

                <v-list-item>
                  <v-btn :to="'/subject-data/'+user.data.department" text>
                    <v-icon class="pr-2">mdi-book</v-icon>Show Subjects
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn to="/ut1_marks" text>
                    <v-icon class="pr-2">mdi-counter</v-icon>Unit Test I Marks
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn to="/ut2_marks" text>
                    <v-icon class="pr-2">mdi-counter</v-icon>Unit Test II Marks
                  </v-btn>
                </v-list-item>
                <v-list-item></v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col class="pa-2">
            <v-card color="blue lighten-2 ">
              <v-card-text>
                <p
                  class="display-1 white--text font-italic text-uppercase pb-2"
                >Welcome to marks input system</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <loading isLoading="true" />
      </div>
    </v-container>
  </v-img>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import { app } from "../fb";
import loading from "../components/loading";
const db = firebase.firestore(app);

export default {
  components: {
    loading
  },
  data: () => ({
    dialog: false,
    adddata: [],
    sem: "",
    type: "",
    subject_name: "",
    disabled: true,
    dep: "",
    overlay: false,
    subAdded: false
  }),

  computed: {
    ...mapGetters({
      user: "user"
    }),

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("fetchUser", user);
    });
   
  },
  methods: {
    changeInput() {
      this.disabled = false;
    },
    reset() {
      this.type = "";
      this.sem = "";
      this.dialog = false;
      this.disabled = true;
    },
    addSubject() {
      this.dep = this.$store.getters.user.data.department;
      if (this.type == "") {
        return;
      } else {
        db.collection("subjects")
          .add({
            type: this.type,
            semester: this.sem,
            subject_name: this.subject_name,
            department: this.dep
          })
          .then(() => {
            this.subAdded = true;
            this.type = "";
            this.dialog = false;
            this.sem = "";
          });
      }
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/adminLogin");
        });
    }
  }
};
</script>