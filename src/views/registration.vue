<template>
  <v-container>
      <v-layout row wrap class="justify-center">
      <v-flex xs10 sm10 lg8>
        <h4>Register new account</h4>

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
         Registered
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
            Registered
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      </v-flex>
    </v-layout >

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="#F0F2F0">
          <v-card-text>
            <v-container>
           
               <!---admin form--->
              <form @submit.prevent="AdminSignUp" >
                   <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Name"
                      id="name"
                      v-model="name"
                      type="text"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                  <v-layout row>
                  <v-flex xs12>
                   <v-select
                   :items="stream"
                   v-model="dep"
                   label="Select Your department"
                   >

                   </v-select>
                  </v-flex>
                </v-layout>
                  <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="phone"
                      label="Phone"
                      id="phone"
                      v-model="phone"
                      type="number"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                 <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="college"
                      label="College Name"
                      id="college"
                      v-model="college"
                      type="text"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 >
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                      ></v-text-field>
                  </v-flex>
                </v-layout>
                   <v-layout row class="justify-center pb-2">
            <v-flex xs12 sm6 >
              <v-btn raised class="primary" @click="onPickFile" >Profile Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          
          </v-layout>
          <v-layout row>
               <v-col >
          <v-card >
            <v-img
              :src="this.show"
              height="125"
              class="grey darken-2"
              contain
              :hidden="hidden"
            ></v-img>
              </v-card>
             </v-col>
          </v-layout>
          
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" class="success" :disabled="disabled">
                      Sign up
                     
                    </v-btn>
                  </v-flex>
                </v-layout>
              
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import firebase from 'firebase'
const db = firebase.firestore();
  export default {
    
    data () {
      return {
        name:'',
        phone:'',
        randomKey:Math.random().toString(36).substr(2, 9),
        college:'',
        email: '',
        dep:'',
        password: '',
        confirmPassword: '',
         stream:['Arts','Commerce','Science'],
         imgurl:'',
         loading: false,
          dialog: false,
          show:'',
          hidden:true,
          disabled:true,
      }
    },
    computed: {
    
      comparePasswords () {
        //return this.password !== this.confirmPassword ? 'Passwords do not match' : 'Matched'
        if(this.password!==this.confirmPassword){
          return 'Passwords do not match'
        }else{
          return 'Password Matched'
          
        }
      },
      user () {
        return this.$store.getters.user
      },
    
    },
  methods:{
      
      AdminSignUp(){
    
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password).then(cred=>{
      db.collection('users').doc(cred.user.uid).set({
      name:this.name,
        phone:this.phone,
        email:this.email,
        department:this.dep,
        college:this.college,
        id:this.randomKey,
        imgurl:this.imgurl,
        password:this.password,
        
      })
     }).then(()=>{
       this.loading=true
       this.dialog=true
       this.email=""
       this.password=""
       this.confirmPassword=""
       this.phone=""
       this.name=""
        this.college=""
        this.dep=""
        this.show=true
        this.disabled=true
      })
      },
    


         onPickFile () {
        this.$refs.fileInput.click()
        
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        let actualFile = files[0]
       
       // console.log(filename,actualFile,this.category)
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
          const fileReader = new FileReader()
         fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
         fileReader.readAsDataURL(files[0])
        this.image = files[0]
        this.imgurl="https://firebasestorage.googleapis.com/v0/b/cachar-college.appspot.com/o/"+"undefined"+'%2F'+this.randomKey+"?alt=media"
        this.actualFile=actualFile
         var storage = firebase.storage();
          var storageRef=storage.ref()
         var metadata = {
        contentType: 'image/jpeg',
      }   
      var uploadTask = storageRef.child(this.category+'/'+this.randomKey).put(actualFile, metadata)

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
     (snapshot) =>{

    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.value=progress
         // console.log('Upload is ' + progress + '% done')

          switch (snapshot.state) {
         
            case firebase.storage.TaskState.PAUSED: // or 'paused'
             // console.log('Upload is paused')
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
             // console.log('Upload is running')
              break;
          }
        }, (error)=> {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, () =>{
        
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
           this.hidden=false
           this.disabled=false
          this.show=downloadURL
          console.log('File available at', downloadURL)
        })
      })    
      
      
      },
     
  }
   
    
  }
</script>

