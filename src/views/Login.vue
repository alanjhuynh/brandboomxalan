<template>

  
  <div class="container">

    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="testlogin" class="text-center">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email address..." v-model="email">
            <input type="password" class="form-control" placeholder="Password..." v-model="password">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <a href= /Register> Create account </a>
      </div>
    </div>

    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Continue as Guest</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Please enter your name..." name="name" v-model="name">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>  
          <button type="submit" class="btn btn-primary">Enter Chat</button>
        </form>
      </div>
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
      errorText: null
    }
  },
  methods: {
    testlogin() {
    firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        var user = userCredential.user;
        alert('Successfully logged in');
        this.$router.push({name: 'Chat', params: {name: user.displayName}});
      })
      .catch(error => {
        this.errorText = error.message
      });
  },
    login() {
      if (this.name) {
        this.$router.push({name: 'Chat', params: {name: this.name}})
      } else {
        this.errorText = "Please enter a name!"
      }
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
</style>