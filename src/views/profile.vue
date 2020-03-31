<template>
    <div>
        <v-container>
             <v-btn text to="/dashboard" ><v-icon  >mdi-arrow-left</v-icon></v-btn>
            <v-row no-gutters justify="center">
                
                <v-col lg="6" sm="12" md="6">
                    <v-card class="mx-auto">
                        <p class="display-1 text-uppercase blue--text text--lighten-2">Profile</p>
                            <v-list>
                          <v-list-item >
                          <v-list-item-avatar class="mx-auto">
                       <img :src=this.profile.imgurl >
                     </v-list-item-avatar>
                     </v-list-item>
                   </v-list>
                     <v-card-text>
                   <h1 class=" text-uppercase font-weight-bold">{{this.profile.name}}</h1>
                    <h1 class=" text-uppercase font-weight-bold">{{this.profile.college}}</h1>
                     <h1 class=" text-uppercase font-weight-bold">{{this.profile.email}}</h1>
                   <h1 class=" text-uppercase font-weight-bold">{{this.profile.phone}}</h1>
                  </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import firebase from "firebase"
import {app} from "../fb"
const db = firebase.firestore(app);
export default {
    data(){
        return{
            profile:{name:'',imgurl:'',phone:'',college:'',email:'',dep:''}

        }
    },

    props:['id'],

       created(){
            let docRef= db.collection("users").doc(this.id)
            docRef.get().then((doc) =>{
                if (doc.exists) {
                    this.profile.imgurl=doc.data().imgurl,
                    this.profile.name=doc.data().name
                    this.profile.phone=doc.data().phone
                    this.profile.dep=doc.data().department
                    this.profile.college=doc.data().college
                     this.profile.email=doc.data().email
                } else {
                    // doc.data() will be undefined in this case
                    //console.log("No such document!");
                }
            }).catch(function(error) {
               // console.log("Error getting document:", error);
               this.err=error
            });
        },
}
</script>