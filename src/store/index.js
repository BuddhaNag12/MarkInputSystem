import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import {app} from "../fb"
import 'firebase/firestore';
const db = firebase.firestore(app);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  
    user: {
      loggedIn: false,
      data: null,
      loader:false
    },
    error:'',
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_LOADING(state,data){
      state.user.loader=data
    },
    SET_USER(state, payload) {
      state.user.data = payload;
    },
    SET_SUBJECTS(state,data){
      state.subjects=data
    },
    SET_ERROR(state,data){
      state.error=data
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
          
          commit("SET_USER", {
            id:user.uid,
            email:user.email,
            name:doc.data().name,
            phone:doc.data().phone,
            department:doc.data().department,
            imgurl:doc.data().imgurl
          });
          commit('SET_LOADING', false)
        });
     
      } else {
        commit("SET_USER", null);
       
      }
    },
  


    // signUserIn ({commit}, payload) {

    //   // firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
    //   //     this.$router.push('/dashboard')
       
    //   //       this.$router.replace('/dashboard')
    //   //   }).catch((err) => {
    //   //   //  console.log(err)
    //   //   commit('SET_ERROR',err)
         
    //   //   })

    // },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      
    },
  },
 
  getters:{
    user (state) {
      return state.user
    },
    loading (state) {
      return state.user.loader
    },
    
  }
})
