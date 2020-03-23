<template>
  <v-img src="../assets/cc3.jpg" height="600px">

    <div>
  <v-row align="center">
      
    <v-col justify="space-around" lg="4" md="6" sm="12" class="mx-auto">
            <v-btn text to="/dashboard" ><v-icon  class=" white--text">mdi-arrow-left</v-icon></v-btn>
                <div class="text-center">
                        <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
      <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Info
        </v-card-title>
        <v-card-text>
          <v-alert type="success">
        Updated
         </v-alert>

        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
    <v-card>
        <v-card-text>
            <p>Update Your Profile</p>
            <h1 class=" text-uppercase">{{this.name}}</h1>
        </v-card-text>
        <v-list>
            <v-list-item >
                <v-list-item-avatar class="mx-auto">
              <img :src=this.imgurl >
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
          <v-text-field
             v-model="NewName"
            append-outer-icon="mdi-pen"
            prepend-icon="mdi-face"
            filled
            clearable
            label="New Name"
            @click:append-outer="updateName"

          >
          </v-text-field>
         
            </v-list-item>
            <v-list-item>
                  <v-text-field
             v-model="NewEmail"
            append-outer-icon="mdi-pen"
            prepend-icon="mdi-email"
            filled
            clearable
            label="New Email"
            @click:append-outer="updateEmail"

          >
          </v-text-field>   
            </v-list-item>

               <v-list-item>
                  <v-text-field
             v-model="NewPass"
            append-outer-icon="mdi-pen"
            prepend-icon="mdi-key"
            filled
            clearable
            type="password"
            label="New Password"
            @click:append-outer="updatePass"

          >
          </v-text-field>   
            </v-list-item>
              <v-list-item>
                  <v-text-field
             v-model="NewPhn"
            append-outer-icon="mdi-pen"
            prepend-icon="mdi-cellphone"
            filled
            clearable
            type="number"
            label="New Phone"
            @click:append-outer="updatePhone"

          >
          </v-text-field>   
            </v-list-item>
        </v-list>
    </v-card>
    </v-col>

  </v-row>

    </div>
      </v-img>
</template>


<script>
import firebase from "firebase"
import {app} from "../fb"
const db = firebase.firestore(app);
export default {
   data:()=>({
        NewName:'',
        NewEmail:'',
        NewPass:'',
        NewPhn:'',
        dialog:false,
        imgurl:'',
        err:'',
        name:'',
    }),

     props:['uid'],

        created(){
            let docRef= db.collection("users").doc(this.uid)
            docRef.get().then((doc) =>{
                if (doc.exists) {
                    this.imgurl=doc.data().imgurl,
                    this.name=doc.data().name
                } else {
                    // doc.data() will be undefined in this case
                    //console.log("No such document!");
                }
            }).catch(function(error) {
               // console.log("Error getting document:", error);
               this.err=error
            });
        },
     methods:{
             updateName(){
             db.collection("users").doc(this.uid).update({
                name: this.NewName,
                
            }).then(()=>{
                this.dialog=true
                })
            },
            updateEmail(){
            var user = firebase.auth().currentUser;

            user.updateEmail(this.NewEmail).then(()=> {
                 db.collection("users").doc(this.uid).update({
                email: this.NewEmail,
                
                   }).then(()=>{
                this.dialog=true
                })
            })
            },
            updatePass(){

                 var user = firebase.auth().currentUser;

            user.updatePassword(this.NewPass).then(()=> {
                 db.collection("users").doc(this.uid).update({
                password: this.NewPass,
                
            }).then(()=>{
                this.dialog=true
                })
            })
                 
            },
            updatePhone(){
                  db.collection("users").doc(this.uid).update({
                phone: this.NewPhn,
                
            }).then(()=>{

                this.dialog=true
                })

            }
     }
}
</script>