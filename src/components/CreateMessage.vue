<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>

            <button class="btn btn-primary" type="submit" name="action">Submit</button>
            
            <emoji-picker @emoji="insert">
                <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">  
                    <i class="far fa-smile fa-lg text-primary"></i>     
                </div>
                <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                    <div class="emoji-picker">
                    
                    <div>
                        <div v-for="(emojiGroup, category) in emojis" :key="category">
                        <h5>{{ category }}</h5>
                        <div class="emojis">
                            <span
                            v-for="(emoji, emojiName) in emojiGroup"
                            :key="emojiName"
                            @click="insert(emoji)"
                            :title="emojiName"
                            >{{ emoji }}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </emoji-picker>

        </form>
     

    
    </div>
</template>

<script>
    import { db } from '@/firebase/init';
    import EmojiPicker from 'vue-emoji-picker';

    export default {
        name: 'CreateMessage',
        props: ['name', 'currentChatroom'],
        components: {
            EmojiPicker
        },
        data(){
            return {
                newMessage: '',
                errorText: null,
            }
        },
        methods: {
            createMessage () {
                //console.log(this.currentChatroom)
                if (this.newMessage) {
                    db.collection(`${this.currentChatroom}`).add({
                        message: this.newMessage,
                        name: this.name,
                        timestamp: Date.now()
                    }).catch(err => {
                        console.log(err);
                    });
                    this.newMessage = '';
                    this.errorText = null;
                } else {
                    this.errorText = "A message must be entered!"
                }
            },
            insert(emoji) {
                this.newMessage += emoji
                }

        }
    }
</script>

<style scoped>

@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css    ";

.wrapper {
  position: relative;
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}

.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-family: Avenir, Helvetica, Arial, sans-serif;    
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>