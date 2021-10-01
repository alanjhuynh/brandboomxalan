<template>
    <div class="container text-center" style="margin-bottom: 30px">
        <button v-on:click="createChatroom" class="btn btn-primary">Create Chatroom</button>
    </div>
</template>

<script>
    import { db } from '@/firebase/init';

    export default {
        name: 'CreateChatroom',
        methods: {
            createChatroom () {
                let crName = prompt ("Please enter new chatroom name")
                
                if (crName) {
                    db.collection("chatrooms").doc(`${crName}`).set({
                      name: `${crName}`
                    });
               
                } else {
                    alert("A name must be entered!")
                }
            }
        }
    }
</script>

<style scoped>

</style>