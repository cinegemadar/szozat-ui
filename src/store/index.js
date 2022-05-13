import axios from 'axios'
import { ssrContextKey } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  state: {
    test_words: [
      [
        { value: "E", color: "grey" },
        { value: "L", color: "grey" },
        { value: "S", color: "yellow" },
        { value: "O", color: "green" },
        { value: "O", color: "grey" }
      ],
      [
        { value: "M", color: "grey" },
        { value: "A", color: "grey" },
        { value: "S", color: "yellow" },
        { value: "O", color: "green" },
        { value: "D", color: "grey" }
      ],
      [
        { value: "H", color: "grey" },
        { value: "A", color: "grey" },
        { value: "R", color: "yellow" },
        { value: "M", color: "green" },
        { value: "A", color: "grey" }
      ],
      [
        { value: "N", color: "grey" },
        { value: "E", color: "grey" },
        { value: "GY", color: "yellow" },
        { value: "E", color: "green" },
        { value: "D", color: "grey" }
      ]
    ],
    pattern: ["grey", "grey", "grey", "grey", "grey"],
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
    },
    changePattern(state, param) {
      state.pattern[param.idx] = param.color
    }
  },
  actions: {
    nextWord({ commit, state }, repr){
      function addColorInfo(word) { 
        // create [{letter0, white},{letter1, color}] from ["letter0", "letter2"]
        let result = []
        for(const [index, letter] of word.split(",").entries()) {
          console.log(state.pattern)
          if(state.pattern[index] == "green") {
            result.push({value: letter, color: "green"})
          }
          else {
            result.push({value: letter, color: "grey"})
          }
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
      const COLORS = ["grey", "yellow", "green"]
      const currentIDX = COLORS.indexOf(state.words[param.wordIdx][param.letterIdx].color)
      const nextColor = COLORS[(currentIDX + 1 % COLORS.length) % COLORS.length]

      commit("changeColor", {
        wordIdx: param.wordIdx,
        letterIdx: param.letterIdx,
        color: nextColor
      })
      commit("changePattern", {
        idx: param.letterIdx,
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
