<template>
<div>
    
        <i class="d-flex far fa-comment-alt fa-3x"></i>
        <h1> ALAN x BRANDBOOM </h1>
        <button v-on:click="logout" class="btn btn-primary">Logout</button>

        <div>
            {{ this.currentChatroom }}
        </div>

        <CreateChatroom />

        <div v-for="chatroom in chatrooms" :key="chatroom.id">
                        <button v-on:click="crSwitch(chatroom.name)" class="btn btn-primary">{{ chatroom.name }} </button>            
        </div>
 
    

    <div class="chat container">
        <h2 class="text-primary text-center">Real-Time Chat</h2>
        <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
        <div class="card">
            <div class="card-body">
                <p class="nomessages text-secondary" v-if="messages.length == 0">
                    <!-- [No messages yet!] -->
                    Welcome to "{{ this.currentChatroom }}"
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
                <CreateMessage :name="name" :currentChatroom="currentChatroom" />
            </div>

            <button v-on:click="logout" class="btn btn-primary">Logout</button>
        </div>
    </div>
</div>
</template>

<script>
    import { firebaseApp } from '@/firebase/init';

    import CreateMessage from '@/components/CreateMessage';
    import CreateChatroom from '@/components/CreateChatroom';
    import { db } from '@/firebase/init';
    import moment from 'moment';

    export default {
        name: 'Chat',
        props: ['name'],
        components: {
            CreateMessage,
            CreateChatroom
        },
        data() {
            return{
                messages: [],
                chatrooms: [],
                currentChatroom: 'messages',
                unsubscribe: ()=>{}
            }
        },
        created() {

            let crRef = db.collection('chatrooms');
            crRef.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc;
                        this.chatrooms.push({
                            id: doc.id,
                            name: doc.data().name,
                        });
                    }
                });
            });

            let ref = db.collection('messages').orderBy('timestamp');

            this.unsubscribe = ref.onSnapshot(snapshot => {
                //console.log(snapshot.docChanges())
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
            crSwitch(crName) {
                this.unsubscribe();

                this.currentChatroom = crName;
                this.messages = [];

                let ref = db.collection(this.currentChatroom).orderBy('timestamp');

                this.unsubscribe = ref.onSnapshot(snapshot => {
                   //console.log(snapshot.docChanges())
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
                })    
            },   
        }

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