<template>
<div>
    
        <i class="d-flex far fa-comment-alt fa-3x"></i>
        <h1> ALAN x BRANDBOOM </h1>
        <button v-on:click="logout" class="btn btn-primary">Logout</button>
 
    

    <div class="chat container">
        <h2 class="text-primary text-center">Real-Time Chat</h2>
        <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
        <div class="card">
            <div class="card-body">
                <p class="nomessages text-secondary" v-if="messages.length == 0">
                    [No messages yet!]
                </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="message in messages" :key="message.id">
                        <span class="text-info">[{{ message.name }}]: </span>
                        <span>{{message.message}}</span>
                        <span class="text-secondary time">{{message.timestamp}}</span>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <CreateMessage :name="name"/>
            </div>

            <button v-on:click="logout" class="btn btn-primary">Logout</button>
        </div>
    </div>
</div>
</template>

<script>
    import { firebaseApp } from '@/firebase/init';

    import CreateMessage from '@/components/CreateMessage';
    import { db } from '@/firebase/init';
    import moment from 'moment';

    export default {
        name: 'Chat',
        props: ['name'],
        components: {
            CreateMessage
        },
        data() {
            return{
                messages: []
            }
        },
        created() {
            let ref = db.collection('messages').orderBy('timestamp');

            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc;
                        this.messages.push({
                            id: doc.id,
                            name: doc.data().name,
                            message: doc.data().message,
                            timestamp: moment(doc.data().timestamp).format('LTS')
                        });
                    }
                });
            });
        },
        methods: {
            logout() {
                firebaseApp.auth().signOut()
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
      });
  },
},

    }
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
}

.chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
}

.chat span{
    font-size: 1.2em;
}

.chat .time{
    display: block;
    font-size: 0.7em;
}

.messages{
    max-height: 300px;
    overflow: auto;
}
</style>