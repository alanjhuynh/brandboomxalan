<template>

<div>
    <!-- Navbar at the top with logout button -->
    <nav class="navbar navbar-light bg-light p-4">
        <i class="d-flex far fa-comment-alt fa-3x"></i>
        <h1> BRANDBOOM x ALAN </h1>
        <button v-on:click="logout" class="btn btn-secondary">Logout</button>
    </nav>

    <!-- Greeting and what chatroom you are currently viewing -->
    <div class="chat container p-5">   
        <h2 class="text-primary text-center"><i class="fas fa-coffee "></i> Hello, {{ name }}. </h2>
        <h5 class="text-secondary text-center">You are currently in the "{{ this.currentChatroom }}" chatroom.</h5>
    </div>

    <!-- Container to put chatroom card and chat card side by side -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-2">
                <!-- chatroom card START-->
                <div class="chat container">
                    <div class="card">
                        <div class="card-body">
                            <!-- card title -->
                            <h2 class="text-center"> chatrooms </h2>
                            <hr>
                            <!-- list of chatrooms -->
                            <!-- if current chatroom, set as active/highlighted -->
                            <!-- if chatroom is clicked on, call crSwitch() -->
                            <div class="list-group">
                                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                                <div v-for="chatroom in chatrooms" :key="chatroom.id">
                                <button v-if="chatroom.name == currentChatroom" v-on:click="crSwitch(chatroom.name)" type="button" class="list-group-item list-group-item-action active">{{ chatroom.name }} </button> 
                                <button v-else v-on:click="crSwitch(chatroom.name)" type="button" class="list-group-item list-group-item-action">{{ chatroom.name }} </button>                 
                            </div>
                        </div>
                    </div>
                <!-- CreateChatroom component which is a button to create the chatroom -->
                </div>
                <CreateChatroom />
                </div>
                </div>
                <!-- chatroom card END -->
            </div>

            <div class="col-lg-8">
                <!-- chat card START -->
                <div class="chat container">
                    <div class="card">
                        <div class="card-body">
                            <!-- card title -->
                            <h2 class="text-center"> {{ this.currentChatroom }} </h2>
                            <hr>
                            <!-- If no messages in the chat, display "no message" message -->
                            <h5 class="nomessages text-secondary text-center" v-if="messages.length == 0">
                                <i class="fas fa-comment-slash"></i>
                                There are currently no messages in the "{{ this.currentChatroom }}" chatroom.
                            </h5>
                            <!-- list all chat messages for current chatroom -->
                            <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                                <div v-for="message in messages" :key="message.id">
                                    <span class="text-info">[{{ message.name }}]: </span>
                                    <span>{{message.message}}</span>
                                    <span class="text-secondary time">{{message.timestamp}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- CreateMessage component to create doc in firebase -->
                        <div class="card-action">
                            <CreateMessage :name="name" :currentChatroom="currentChatroom" />
                        </div>
                     </div>
                </div>
            </div>
            
            <!-- spacing -->
            <div class="col-lg-2"></div>
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
            // Grab all chatrooms from firestore and push them to "chatrooms" array. HTML portion will grab array and create a button list
            let crRef = db.collection('chatrooms');

            // Create a listener so that new chatrooms get pushed to the array
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

            // Grab all messages from "messages" chatroom
            let ref = db.collection('messages').orderBy('timestamp');

            // Create a listener so that new messages get pushed to the array
            // set listener to a function in order to unsubscribe to listener if chatroom is switched
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
            // When logout button is pressed, call firebase function and route to login page
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
            // When a chatroom button is clicked
            // 1. Unsubscribe from old listener
            // 2. Change this.currentChatroom to the selected chatroom
            // 3. clear messages
            // 4. Create listener for current chatroom
            crSwitch(crName) {
                // 1
                this.unsubscribe();
                
                // 2 & 3
                this.currentChatroom = crName;
                this.messages = [];

                // 4
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
    height: 300px;
    max-height: 300px;
    overflow: auto;
}

</style>