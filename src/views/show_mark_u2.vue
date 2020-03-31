<template>
    <div >
      <v-container>
        <v-row>
            <v-col sm="12" lg="8" class="mx-auto" md="12">
               <v-btn text to="/dashboard" ><v-icon  >mdi-arrow-left</v-icon></v-btn>
                   <v-card >
                     
    <v-card-title>
        Unit Test II Marks
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
      :items="marks"
      :search="search"
     
    >
    <template v-slot:item.Hons_pass="{ item }">
      <v-chip :color="getColor(item.Hons_pass)" class="white--text" label >{{ item.Hons_pass }}</v-chip>
    </template>
    <template v-slot:item.marks="{ item }">
      <v-chip :color="getColorMarks(item.marks)" class="white--text" label >{{ item.marks }}</v-chip>
    </template>
</v-data-table>
<v-btn @click="print"  text><v-icon>mdi-file-pdf</v-icon> print</v-btn>
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
        marks:[],
          search:"",
          headers: [
         
          { text: 'Type', value: 'Hons_pass' },
          { text: 'Attendance Mark', value: 'attendanceMar' },
          { text: 'Test Mark', value: 'marks' },
          { text: 'Registration No', value: 'registrationNo' },
          { text: 'Semester', value: 'semester' },
          { text: 'Subject', value: 'subject_name' },
        
        ],
    }),
    methods:{
         getColor (Hons_pass) {
        if (Hons_pass == "honors") return 'red'
        else return 'green'
      },
      getColorMarks(marks){
            if (marks >=10) return 'green'
        else return 'red'
      },
      print(){
          window.print()
      }
    },

     created(){

          db.collection("unit_test_2").get().then((querySnapshot) =>{
          querySnapshot.forEach((doc)=> {
           
              this.marks.push(
              doc.data()
              )  
          });   
        });
    },
}



</script>

<style >
.theme--light.v-data-table .v-data-table__empty-wrapper{
  color:red
  
}

</style>