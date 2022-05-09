<template>
  <div>
    <game-board />
  </div>
</template>

<script>
import GameBoard from "./GameBoard.vue"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    GameBoard
  }
}
</script>
