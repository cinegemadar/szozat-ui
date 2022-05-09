import axios from 'axios'
import { ssrContextKey } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    test_words: [
      [
        { value: "E", color: "white" },
        { value: "L", color: "grey" },
        { value: "S", color: "yellow" },
        { value: "O", color: "green" },
        { value: "O", color: "white" }
      ],
      [
        { value: "M", color: "white" },
        { value: "A", color: "grey" },
        { value: "S", color: "yellow" },
        { value: "O", color: "green" },
        { value: "D", color: "white" }
      ],
      [
        { value: "H", color: "white" },
        { value: "A", color: "grey" },
        { value: "R", color: "yellow" },
        { value: "M", color: "green" },
        { value: "A", color: "white" }
      ],
      [
        { value: "N", color: "white" },
        { value: "E", color: "grey" },
        { value: "GY", color: "yellow" },
        { value: "E", color: "green" },
        { value: "D", color: "white" }
      ]
    ],
    words: [[]],
    activeWord: 1
  },
  getters: {
  },
  mutations: {
    addWord(state, word) {
      state.words.push(word)
      state.activeWord++
    },
    changeColor(state, param) {
      state.words[param.wordIdx][param.letterIdx].color = param.color
    }
  },
  actions: {
    nextWord({ commit, state }, repr){
      function addColorInfo(word) { 
        // create [{letter0, white},{letter1, color}] from ["letter0", "letter2"]
        let result = []
        for(const [index, letter] of word.split(",").entries()) {
          // if(state.words.filter( 
          //   w => (w[index].value == letter && w[index].color=="green")).length){
          //   result.push({value: letter, color: "green"})
          // }
          // else {
          //   result.push({value: letter, color: "white"})
            
          // }
          result.push({value: letter, color: "white"})
        }
        return result
      }
      function processResponse(data){
        if(data.length < 0) { return }
        commit("addWord", addColorInfo(data[0]))
      }
    
      axios.post("https://szozat-wordle-solver.herokuapp.com/guess/", repr).then(
      // axios.post("http://127.0.0.1:8000/guess/", repr).then(
        response => processResponse(response.data))
    },
    toggleColor({ commit, state }, param) {
      const COLORS = ["white", "grey", "yellow", "green"]
      const currentIDX = COLORS.indexOf(state.words[param.wordIdx][param.letterIdx].color)
      const nextColor = COLORS[(currentIDX + 1 % COLORS.length) % COLORS.length]

      commit("changeColor", {
        wordIdx: param.wordIdx,
        letterIdx: param.letterIdx,
        color: nextColor
      })
    }
  },
  getters: {
    letterColor(state, wordIdx, letterIdx) {
      return state.words[wordIdx][letterIdx].color
    },
    words(state) {
      return state.words
    },
    length(state) {
      return state.words.length
    },
    getJSONRepresentationOfWords(state) {
      const COLORS = { white: 3, grey: 3, yellow: 2, green: 1 }
      function getWordAsList(idx) {
        const word = state.words[idx]
        var wordAsList = []
        for (const letter of word) {
          wordAsList.push(letter.value)
          wordAsList.push(COLORS[letter.color])
        }
        return wordAsList
      }
      let repr = []
      for (var i = 0; i < state.words.length; i++) {
        repr.push(getWordAsList(i))
      }
      return repr
    }
  },
  modules: {
  }
})
