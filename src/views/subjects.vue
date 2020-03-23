<template>
    <div >
      <v-container>
        <v-row>
            <v-col sm="12" lg="8" class="mx-auto" md="12">
               <v-btn text to="/dashboard" ><v-icon  >mdi-arrow-left</v-icon></v-btn>
                   <v-card >

    <v-card-title>
      SUBJECTS
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="adddata"
      :search="search"
      
    ></v-data-table>
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
  
    data:()=>({
             search:"",
             
           headers: [
          {
            text: 'DEPARTMENT',
            align: 'start',
            sortable: true,
            value: 'department',
          },
          { text: 'SUBJECT', value: 'subject_name' },
          { text: 'SEMESTER', value: 'semester' },
          { text: 'HONS/PASS', value: 'type' },
        
        ],
         adddata:[],


        
    }),
    props:['dep'],
     created(){

          db.collection("subjects").where("department","==",this.dep).get().then((querySnapshot) =>{
          querySnapshot.forEach((doc)=> {
              this.adddata.push(
              doc.data()
              )  
          });   
        });
  },
     

}
</script>
