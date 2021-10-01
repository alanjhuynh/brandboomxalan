<template>

  <div class="container">

    <!-- Icon and Title -->
    <div class="container title">
      <i class="d-flex justify-content-center far fa-comment-alt fa-10x"></i>
      <h1 class=text-center> BRANDBOOM x ALAN </h1>
    </div>

    <!-- Register card START -->
    <div class="card login extra-padding">
      <div class="card-body">

        <!-- Card title -->
        <h2 class="card-title text-center">Register</h2>
        <h5 class="card-subtitle text-center">to continue to chat</h5>

        <!-- Card form start -->
        <form @submit.prevent="register" class="text-center extra-padding">

          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email address" v-model="email">
            <input type="text" class="form-control" placeholder="Username" v-model="username" required>
            <input type="password" class="form-control" placeholder="Password" v-model="password">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>

          <!-- Route back to login page -->
          <div class="d-flex justify-content-start extra-padding-top">
            <a href= / style="text-decoration: none;"> <b> Sign in instead </b> </a>      
          </div>    

          <!-- Register button -->
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Next</button>
          </div>

        </form>
        <!-- Card form end -->

      </div>
    </div>
    <!-- Register card END -->

  </div>

</template>

<script>
import { firebaseApp } from '@/firebase/init';

export default {
  data () {
    return {
      email: "",
      password: "",
      username: "",
      errorText: null
    }
  },
  methods: {
    // Called when "Next" button is clicked and form is submitted
    // Pass form parameters to firebase function
    // Redirect back to Login page if successful
    register() {
      firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
            var user = userCredential.user;
            user.updateProfile({
                displayName: this.username
            })
            alert('Successfully registered! Please login.');
            this.$router.push('/');
            
        })
        .catch((error) => {
            this.errorText = error.message;
        });
    }
  }
  
}
</script>

<style scoped>
.extra-padding{
  padding:1em;
}
</style>
