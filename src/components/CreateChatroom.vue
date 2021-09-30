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
                    // db.collection(`${crName}`).add({
                    //     message: `Welcome to "${crName}" chatroom`,
                    //     name: "bot",
                    //     timestamp: Date.now()
                    // }).catch(err => {
                    //     console.log(err);
                    // });
                } else {
                    alert("A name must be entered!")
                    // this.errorText = "A message must be entered!"
                }
            }
        }
    }
</script>

<style scoped>

</style>