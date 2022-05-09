<template>
  <div class="row">
      <letter-input v-for="(letter, index) in word" :wordIdx="wordIdx" :letterIdx="index" :key="uniIndex(index)"/>
  </div>
</template>

<script>
import store from '../store'
import LetterInput from "./LetterInput.vue"
export default {
    components: {
        LetterInput
    },
    props: {
        wordIdx: Number
    },
    computed: {
        word() {
            return store.state.words[this.wordIdx]
        },
    },
    methods: {
        uniIndex(letterIdx) {
            return this.wordIdx*5+parseInt(letterIdx)
        }
    }
}
</script>

<style>
.row {
    display: flexbox;
    justify-content: space-between;
}
</style>