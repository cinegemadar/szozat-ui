<template>
<div class="board">
  <div>
      <h1>Szózat megoldó</h1>
      <ul>
          <li>A megjelenő szót pötyögd be a szózat weboldalán</li>
          <li>A betűket nyomogatva színezd a megfelelő színre</li>
          <li>A send gomb megnyomásával kapod a következő tippet</li>
      </ul>

  </div>
  <word-row v-for="(_, index) in words" :key="index" :wordIdx="index" />
  <button class="send" @click="click" >Send</button>
</div>
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
    },
    created: () => {
        store.dispatch("nextWord", store.getters.getJSONRepresentationOfWords)
    }
}
</script>

<style>
word-row {
    display: block;
}
.send {
    background-color: darkgray;
    max-width: 100%;
    margin-top: 5%;
}
.board {
    background-color: azure;
    width: 75%;
}

</style>