<template>
<div>
    <div>
       <v-btn text to="/dashboard" ><v-icon  >mdi-arrow-left</v-icon></v-btn>
            <h1 class=" display-3 text-uppercase font-italic font-weight-bold blue--text text--lighten-2"  >{{user.data.department}}</h1>
         <h1 class=" display-1">UNIT TEST II</h1>
          
          
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
         Marks Added
         </v-alert>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Add More
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </div>
         <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
       lg="4"
       md="4"
       sm="12"
       class="mx-auto"
      >
        <v-card
          class="pa-2"
       
          tile
        >
    <v-select
      v-model="sem"
      :items="semesters"
      label="SEMESTER"
      required
    ></v-select>
    
    <v-select
      v-model="hop"
      :items="['honors','pass']"
      label="Honors/Pass"
      required
      @change="checkSubject"
    ></v-select>

  <v-select
      
      :items="listOfSubjects"
      label="List of Subjects"
      @change="selectedSubject"
      v-model="sub"
      required
    ></v-select>

      <v-text-field :disabled="disabled" v-model="numofstu" label="Enter The Number of students" 
    >

      </v-text-field>
      <v-btn text @click="addStudents">add students</v-btn>

        </v-card>
      </v-col>
    </v-row>
<v-row>
  <v-col lg="8" sm="12" md="6" class="mx-auto">
    <v-card >
       <v-simple-table>
    <template v-slot:default>
     
      <tbody>
        <tr  v-for="(row, index) in rows" :key="index">
          <td><v-text-field v-model="row.regNo" label="Enter Registration No./Roll no."></v-text-field></td>
          <td><v-text-field v-model="row.mark" label="Enter Unit Test  Mark 20/14"></v-text-field></td>
           <td><v-text-field v-model="row.AtMark" label="Enter Attendence mark 10/6"></v-text-field></td>
           <td><v-btn @click="removeElement(index)" text><v-icon>mdi-delete</v-icon> </v-btn></td>
        </tr>
      
      </tbody>
    </template>
  </v-simple-table>
    <v-btn color="success" text :hidden="hidden" @click="SaveInput">save</v-btn>
     <v-btn color="secondary" text :hidden="hidden">print</v-btn>
    </v-card>
    
  </v-col>
</v-row>
  </v-container>
</div>
    

</template>





<script>
import { mapGetters } from "vuex";
import firebase from "firebase"
import {app} from "../fb"
const db = firebase.firestore(app);
export default {
      data:()=>({
          sem:"",
          hidden:true,
          sub:'',
          hop:"",
           rows: [],
          listOfSubjects:[],
          semesters:[
              '1st semester',
              '2nd semester',
              '3rd semester',
              '4th semester',
              '5th semester',
              '6th semester'
          ],
          numofstu:'',
          disabled:true,
          dialog:false,
          err:'',
        
    }),

    methods:{
      SaveInput(){
        let data_1={}
          this.rows.forEach((data)=>{
              data_1={
                registrationNo:data.regNo,
                marks:data.mark,
                attendanceMar:data.AtMark,
                semester:this.sem,
                Hons_pass:this.hop,
                subject_name:this.sub
              }
            
             db.collection('unit_test_2').add(data_1).then(()=>{
                this.dialog=true
                  this.hidden=true
                  this.sem="",
                  this.sub="",
                  this.hop=""
                  this.disabled=true
             })
          })
      },
      addStudents(){
         for(let i=0;i<this.numofstu;i++){
           this.hidden=false
                     this.rows.push({
                        regNo: "",
                        mark:"",
                        AtMark: "",
                    });
                  }
      },
      removeElement(index) {
                    this.rows.splice(index, 1);
      },
      // numberOfStudents(){
      //   console.log(this.numofstu)
      // },

      selectedSubject(){
          this.disabled=false
      },
        checkSubject(){
                db.collection("subjects").where("type", "==", this.hop).where("semester","==",this.sem)
        .get()
        .then((querySnapshot)=> {
          
            querySnapshot.forEach((doc) =>{
                // console.log(doc.id, " => ", doc.data());
                  this.listOfSubjects.push(doc.data().subject_name);
                 //console.log(this.listOfSubjects);
            });
        })
        .catch((error)=> {
            //console.log("Error getting documents: ", error);
            this.err=error
        });
        // this.listOfSubjects.push(subjects);
         
        }
        
    },
    computed:{
    ...mapGetters({
      user: "user",
   
    }),
    
    }
    
}
</script>
