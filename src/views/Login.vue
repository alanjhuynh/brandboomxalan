<template>

  
  <div class="container">

    <div class="container title">
      <i class="d-flex justify-content-center far fa-comment-alt fa-10x"></i>
      <h1 class=text-center> BRANDBOOM x ALAN </h1>

    </div>

    <div class="container">

      <div class="card login extra-padding">
        <div class="card-body">
          <h2 class="card-title text-center">Sign in</h2>
          <h5 class="card-subtitle text-center">to continue to chat</h5>

          <form @submit.prevent="login" class="text-center extra-padding">
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email address" v-model="email">
              <input type="password" class="form-control" placeholder="Enter your password" v-model="password">
              <p v-if="errorText" class="text-danger">{{ errorText }}</p>
            </div>

            <div class="d-flex justify-content-start extra-padding-top">
              <a href= /Forgot style="text-decoration: none;"> Forgot password? </a>      
            </div> 
            
            <div class="d-flex justify-content-start">
              <a href= /Register style="text-decoration: none;"> <b> Create account </b> </a>      
            </div>    

            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary">Next</button>
            </div>

          </form>

           <div class="d-flex justify-content-end">
              <button class="asText text-primary" v-on:click="contGuest"> Continue as guest </button>      
            </div>   
        </div>
      </div>

      <transition name="fade">
      <div class="card login extra-padding" v-if="seen" id="guestLogin">
        <div class="card-body">
          <h2 class="card-title text-center">Continue as Guest</h2>
          <form @submit.prevent="guestLogin" class="text-center extra-padding">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter your name" name="name" v-model="name">
              <p v-if="guestErrorText" class="text-danger">{{ guestErrorText }}</p>
            </div>  
            <div class="d-flex justify-content-end extra-padding-top">
              <button type="submit" class="btn btn-primary">Next</button>
            </div>
          </form>
        </div>
      </div> 
      </transition>

    </div>

  </div>
  
</template>

<script>
import { firebaseApp } from '@/firebase/init';

export default {
  name: 'login',
  data () {
    return {
      name: "",
      email: "",
      password: "",
      errorText: null,
      guestErrorText: null,
      seen: false
    }
  },
  methods: {
    login() {
      firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          //alert('Successfully logged in');
          this.$router.push({name: 'Chat', params: {name: user.displayName}});
        })
        .catch(error => {
          this.errorText = error.message
        });
    },
    guestLogin() {
      if (this.name) {
        this.$router.push({name: 'Chat', params: {name: this.name + ' (guest)'}})
      } else {
        this.guestErrorText = "Please enter a name!"
      }
    },
    contGuest(){
      this.seen = true;
      setTimeout(() => document.getElementById( 'guestLogin' ).scrollIntoView(), 500);
    }
  }
}
</script>

<style>
.login{
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.title{
  padding-top: 3em;
}

.extra-padding{
  padding:1em;
}

.extra-padding-top {
  padding-top: 1em;
}

.asText {
  background: none;
  border: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
