<template>

  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Register</h2>
        <form @submit.prevent="register" class="text-center">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email address..." v-model="email">
            <input type="text" class="form-control" placeholder="Username" v-model="username" required>
            <input type="password" class="form-control" placeholder="Password..." v-model="password">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>

          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <a href= /> Sign in instead </a>
      </div>
    </div>
  </div>

</template>

<script>
import { firebaseApp } from '@/firebase/init';

export default {
//  name: 'login',
  data () {
    return {
      email: "",
      password: "",
      username: "",
      errorText: null
    }
  },
  methods: {
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
