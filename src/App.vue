<template> <!-- /**Aqui dentro destas tags ficam tudo o que é visivel na pagina */ -->
  <!-- Aqui em template é onde incluiremos os outros componentes da aplicação -->
  <div>
    <ScoreBoard :winCount="this.winCount" :loseCount="this.loseCount"/>
  <template v-if="this.question">
      <h1 v-html="this.question"></h1>
        <template v-for="(answer, index) in this.answers" v-bind:key="index">
          <input :disabled="this.answerSubmited" type="radio" name="options" :value="answer" v-model="this.chosenAnswer">
          <label v-html="answer"></label><br>
        </template>
        <button v-if="!this.answerSubmited" class="send btn-btnprimary" @click="submitAnswer()" type="button">Send</button>
        <section v-if="this.answerSubmited" class="result">
          <h4 v-if="this.chosenAnswer == this.correctAnswer"
          v-html=" '&#9989; Yeahh, you picked the right answer ' + this.correctAnswer "> 
           
          </h4>
          <h4 v-else v-html="'&#10060; Im sorry, you picked the wrong answer. The correct is ' + this.correctAnswer + '.'">  
            
          </h4>
          <button class="send" type="button" @click="getNewQuestion()">Next Question</button>
        </section>
  </template>
  </div>
  
</template>

<!--Nessa tag de scrip é ecrita toda a logica do component -->

<script>
//aqui fica a logica e os registros de components que são usados na aplicação
import ScoreBoard from '@/components/ScoreBoard.vue';

const api = 'https://opentdb.com/api.php?amount=1&category=18';

export default {
  name: 'App',
  components:{ ScoreBoard},
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      chosenAnswer: undefined,
      answerSubmited: false,
      winCount: 0,
      loseCount: 0,
    }
  },
  computed: {
    answers() {
      var answers = [...this.incorrectAnswers];
      answers.splice(Math.random() * answers.length, 0, this.correctAnswer);
      return answers
    }
  },
  methods:{
    submitAnswer(){
      if(!this.chosenAnswer){
        console.log('Pick one of this options!')
      }else{
        this.answerSubmited = true;
        if(this.chosenAnswer == this.correctAnswer){
            this.winCount++;
        }else{
             this.loseCount++;
        }
      }
    },
    getNewQuestion(){
      this.answerSubmited = false;
      this.chosenAnswer = undefined;
      this.question = undefined;

      this.axios
      .get(api)
      .then((response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswer = response.data.results[0].correct_answer;
      });
    }
  },
  created() {
    this.getNewQuestion();
  }
}
</script>

<!-- Aqui nessa tag style fica todo o estilo do componet -->
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type=radio] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #FFFF;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}
</style>
