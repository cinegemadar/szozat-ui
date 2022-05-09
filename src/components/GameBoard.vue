<template>
  <word-row v-for="(_, index) in words" :key="index" :wordIdx="index" />
  <button class="send" @click="click">Send</button>
</template>

<script>
import store from "../store"
import WordRow from "./WordRow.vue"
export default {
    computed: {
        words() {
            return store.getters.words
        }
    },
    methods: {
        click() {
            const jsonRepr = store.getters.getJSONRepresentationOfWords
            store.dispatch("nextWord", jsonRepr)
        }
    },
    components: {
        WordRow
    }
}
</script>

<style>
word-row {
    display: block;
}

</style>