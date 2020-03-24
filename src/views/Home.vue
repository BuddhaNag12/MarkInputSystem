<template>
  <div class="home">
    
   <v-container >
     <span class="blue--text font-italic font-weight-bold text-uppercase">Welcome to MARK INPUT SYSTEM</span>
     <v-row >
       <v-col class="col-sm-12 col-md-6 col-12">
 <v-card
    class="mx-auto"
    max-width="400"
    outlined
  >

  <v-card-text>
<p class=" font-weight-bold text-uppercase">TEACHER LOGIN</p>
  </v-card-text>
      <v-card-actions >
      <v-btn  block :to="'/adminlogin'" color="success">Login</v-btn>
    </v-card-actions>
 
    </v-card>
       </v-col>
       <v-col class="col-sm-12 col-md-6 col-12">
         <v-card
    class="mx-auto"
    max-width="400"
    outlined
  >

  <v-card-text>
   <p class="font-weight-bold text-uppercase"> TEACHER REGISTRATION</p>
  </v-card-text>
      <v-card-actions>
        <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
            <v-btn  block   v-on="on" color="accent"> Register</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Enter Teacher Unique ID</span>
        </v-card-title>
       
          <span v-if="this.feed" class="primary">{{this.feed}}</span>

        <v-card-text>
          <v-container>
            <v-layout row class="justify-center">
              <v-flex xs8>
                <v-form @submit.prevent="checkTeacher">
                    <v-text-field  v-model="user_id" label="Unique ID"> </v-text-field>
                   <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
          <v-btn color="primary" text type="submit">Check</v-btn>
                </v-form>
                 
               </v-flex>
              </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-card-actions>
    </v-card>
       </v-col>
     </v-row>
  
   </v-container>
  </div>
</template>

<script>
import firebase from "firebase"
import {app} from "../fb"
const db = firebase.firestore(app)

export default {
  name: 'home',
  data:()=>({

       overlay: false,
       dialog:false,
       user_id:'',
       err:'',
       feed:'',
  }),
  methods:{
    reset(){
      
           this.dialog = false 
            this.user_id=""
            this.feed=""
         },
        
         checkTeacher(){
              db.collection("teacher_id").where("id","==",this.user_id).get().then((querySnapshot) =>{
            querySnapshot.forEach((doc)=> {
              if(doc.exists){
                this.$router.replace('/register')
              }
          })
          if(!querySnapshot.exists){
       
               
                this.feed="No teacher found"
          }    
        }).catch((error) =>{
        this.err=error
          });
         }
  },
  components: {

  }
}
</script>
