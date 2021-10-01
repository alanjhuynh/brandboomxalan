<template>

  <div class="container">

    <!-- Icon and Title -->
    <div class="container title">
      <i class="d-flex justify-content-center far fa-comment-alt fa-10x"></i>
      <h1 class=text-center> BRANDBOOM x ALAN </h1>
    </div>

    <!-- Forgot card START -->
    <div class="card login extra-padding">
      <div class="card-body">
        <h2 class="card-title text-center">Reset password</h2>
        <h5 class="card-subtitle text-center">Send a reset email</h5>

        <!-- Card form START -->
        <form @submit.prevent="forgot" class="text-center extra-padding">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email address" v-model="email">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>

          <!-- Route back to login page -->
          <div class="d-flex justify-content-start extra-padding-top">
            <a href= / style="text-decoration: none;"> <b> Sign in instead </b> </a>      
          </div>    

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Next</button>
          </div>

        </form>
        <!-- Card form END -->

      </div>
    </div>
    <!-- Forgot card END -->
  </div>

</template>

<script>
import { firebaseApp } from '@/firebase/init';

export default {
  data () {
    return {
      email: "",
      errorText: null
    }
  },
  methods: {
    // Called when "Next" button is clicked and form is submitted
    // Pass form parameters to firebase function
    // Redirect back to Login page if successful
    forgot() {
        firebaseApp.auth().sendPasswordResetEmail(this.email)
        .then(() => {
            // Password reset email sent!
            alert('Password reset email sent.');
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
