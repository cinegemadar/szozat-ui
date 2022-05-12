<template>
    <button :class="cssClass" @click="click">{{ value.toUpperCase() }}</button>
</template>

<script>
import store from '../store'
export default {
    props: {
        wordIdx: Number,
        letterIdx: Number
    },
    computed: {
        cssClass() {
            return store.state.words[this.wordIdx][this.letterIdx].color
        },
        value() {
            return store.state.words[this.wordIdx][this.letterIdx].value
        }
    },
    methods:
    {
        click() {
            store.dispatch("toggleColor", {wordIdx: this.wordIdx, letterIdx: this.letterIdx})
            console.log(this.value)
        }
    }
}

</script>

<style>
button.white {
    background-color: white;
}
button.grey {
    background-color: grey;
}
button.yellow {
    background-color: yellow; 
}
button.green {
    background-color: green;
}
button {
    margin-left: 1%;
    margin-top: 1%;
    height: 40%;
    width: 10%;
    max-width: 5%;

}
</style>