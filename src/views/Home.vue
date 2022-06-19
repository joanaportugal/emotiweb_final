<template>
  <div id="backgroundHome">
    <b-container class="col-11 pt-4">
      <div>
        <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
          Novidades
        </h2>

        <b-card-group class="row col-12" columns>
          <b-card
            tag="article"
            :style="{
              'max-width': '20vw',
              'background-color': '#fbfbf3',
              border: 'none',
              'padding-left': cardAffectHome == index ? '0px' : '10px',
            }"
            class="mb-2 mr-2"
            v-for="(quiz, index) in lastQuizesInfo"
            :key="index"
            @mouseover="cardAffectHome = index"
            @mouseleave="cardAffectHome = null"
          >
            <b-link
              ><img
                v-bind:src="quiz.caseIMG"
                alt=""
                loading="lazy"
                style="width: 17rem; height: 10rem; border-radius: 5px"
                @click="
                  $router.push({
                    name: 'Activity',
                    params: { name: quiz.title },
                  })
                "
            /></b-link>
            <div
              class="d-flex flex-row justify-content-between mt-3"
              style="width: 16.5rem"
            >
              <b-card-sub-title class="mb-2"
                ><span style="color: #e87461">{{
                  quiz.category
                }}</span></b-card-sub-title
              >
            </div>
            <b-card-title
              ><b-link
                :style="{
                  color: '#2B4141',
                  fontFamily: 'EAmbit SemiBold',
                  fontSize: '20px',
                  'text-decoration': 'none',
                }"
                @click="
                  $router.push({
                    name: 'Activity',
                    params: { name: quiz.title },
                  })
                "
                >{{ quiz.title }}</b-link
              ></b-card-title
            >
          </b-card>
        </b-card-group>
        <!--Conteudo para a criança-->
        <div class="mt-4" v-if="getLoggedUser.type == 'Criança'">
          <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
            Os meus badges
          </h2>

          <div class="row mb-4 mt-2">
            <div
              class="text-center mt-3 ml-5 mr-5"
              v-for="(badge, index) in getBagdes"
              :key="index"
            >
              <img
                :src="badge.badgeIMG"
                alt=""
                loading="lazy"
                class="mb-1"
                :style="{
                  width: '150px',
                  filter:
                    checkBadge(badge.badgeName) == true
                      ? 'grayscale(0%)'
                      : 'grayscale(100%)',
                }"
              />
              <h5 :style="{ fontFamily: 'EAmbit SemiBold' }">
                {{ badge.badgeName }}
              </h5>
            </div>
          </div>
        </div>

        <!--Conteudo para o tutor-->
        <div class="mt-4" v-if="getLoggedUser.type == 'Tutor'">
          <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
            Evolução do meu filho
          </h2>

          <b-form inline class="mt-4">
            <label class="mr-sm-3" for="example-datepicker">De: </label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="dataStart"
              class="mb-2 mr-sm-4 mb-sm-0"
              :style="{ 'background-color': '#fbfbf3' }"
            ></b-form-datepicker>

            <label class="mr-sm-3" for="example-datepicker1">Até: </label>
            <b-form-datepicker
              id="example-datepicker1"
              v-model="dataEnd"
              class="mb-2 mr-sm-4 mb-sm-0"
              :style="{ 'background-color': '#fbfbf3' }"
            ></b-form-datepicker>
          </b-form>

          <table class="col-11 ml-2 mr-2 mt-5 text-center">
            <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
              <th class="p-2">Emoção</th>
              <th>Perguntas realizadas</th>
              <th>Perguntas Acertadas</th>
              <th>Perguntas Erradas</th>
              <th>Evolução</th>
            </tr>
            <tr
              :style="{ 'border-bottom': '2px solid #707070' }"
              v-for="(result, index) in childResults"
              :key="index"
            >
              <td class="p-4">{{ result.emotion }}</td>
              <td>{{ result.done }}</td>
              <td>{{ result.right }}</td>
              <td>{{ result.wrong }}</td>
              <td v-if="result.right >= result.wrong" style="color: green">
                Positivo
              </td>
              <td v-else style="color: red">Negativo</td>
            </tr>
          </table>
        </div>

        <!--Conteudo para o professor-->
        <div class="mt-4" v-if="getLoggedUser.type == 'Professor'">
          <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
            Evolução dos meus alunos
          </h2>

          <table class="col-11 ml-2 mr-2 mt-5 text-center">
            <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
              <th class="p-2">Username</th>
              <th>Nome</th>
              <th>Turma</th>
              <th>Pontuação obtida</th>
            </tr>

            <tr
              :style="{ 'border-bottom': '2px solid #707070' }"
              v-for="(student, index) in students"
              :key="index"
            >
              <td class="p-4">{{ student.student }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.teamStudent }}</td>
              <td>{{ student.pointsStudent }}</td>
            </tr>
          </table>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      students: [],
      lastQuizesInfo: [],
      childInfo: [],
      childResults: [],
      dataStart: "",
      dataEnd: "",
      cardAffectHome: null,
    };
  },

  computed: {
    ...mapGetters([
      "getLoggedUser",
      "getBagdes",
      "getActivities",
      "getEmotions",
      "getUser",
      "getStudents",
      "getHistory",
    ]),

    /*orderStudents() {
      return this.students.sort(this.compareStudents);
    },*/
  },

  methods: {
    ...mapActions([
      "find_ap",
      "findBadges_ap",
      "findRelations_ap",
      "findAllStudents_ap",
      "findAtivities_ap",
      "getHistory_ap",
      "findAllEmotions_ap",
    ]),

    compareStudents(studA, studB) {
      if (studA.pointsStudents > studB.pointsStudents) return 1;
      else if (studA.pointsStudents < studB.pointsStudents) return -1;
      else return 0;
    },

    checkBadge(badge) {
      let collection = this.getUser.badgesId;
      if (collection == undefined) {
        return false;
      } else {
        if (collection.find((b) => b == badge)) {
          return true;
        } else {
          return false;
        }
      }
    },

    setHistoryKid() {
      if (
        this.getUser.typeUser == "Tutor" &&
        this.getUser.children.length != 0
      ) {
        let resultsData = [];

        for (const emotion of this.getEmotions) {
          for (let i = 0; i < this.getHistory.length; i++) {
            for (let a = 0; a < this.getHistory[i].results.length; a++) {
              if (this.getHistory[i].results[a].emotion == emotion.name) {
                if (
                  !resultsData.find((result) => result.emotion == emotion.name)
                ) {
                  if (this.getHistory[i].results[a].points == 0) {
                    resultsData.push({
                      emotion: emotion.name,
                      right: 0,
                      wrong: 1,
                      done: 1,
                    });
                  } else {
                    resultsData.push({
                      emotion: emotion.name,
                      right: 1,
                      wrong: 0,
                      done: 1,
                    });
                  }
                } else {
                  if (this.getHistory[i].results[a].points == 0) {
                    resultsData.find((result) => result.emotion == emotion.name)
                      .wrong++;
                  } else {
                    resultsData.find((result) => result.emotion == emotion.name)
                      .right++;
                  }
                  resultsData.find((result) => result.emotion == emotion.name)
                    .done++;
                }
              }
            }
          }
        }
        this.childResults = resultsData;
      }
    },

    setRanking() {
      for (let i = 0; i < this.getStudents.length; i++) {
        let team = this.getStudents[i].name;
        for (let a = 0; a < this.getStudents[i].students.length; a++) {
          let student = this.getStudents[i].students[a];
          this.students.push({
            student: student.username,
            name: student.name,
            teamStudent: team,
            pointsStudent: student.points,
          });
        }
      }
      this.students.sort(this.compareStudents);
    },

    setQuizNews() {
      let arrayQuizzes = this.getActivities.filter(
        (activity) => activity.category == "Quiz"
      );
      for (let i = 0; i < 5; i++) {
        let quizInfo = arrayQuizzes[arrayQuizzes.length - i];
        if (quizInfo) {
          this.lastQuizesInfo.push(quizInfo);
        }
      }
    },
  },

  created() {
    this.find_ap(this.getLoggedUser.username).then(() => {
      if (this.getLoggedUser.type == "Professor") {
        this.findAllStudents_ap().then(() => {
          this.setRanking();
        });
      }
    });
    this.findAtivities_ap("").then(() => {
      this.setQuizNews();
    });
    if (this.getLoggedUser.type == "Criança") {
      this.findBadges_ap("");
    } else if (this.getLoggedUser.type == "Tutor") {
      this.findAllEmotions_ap().then(() =>
        this.getHistory_ap().then(this.setHistoryKid)
      );
    }
  },
};
</script>

<style>
#backgroundHome {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat-y;
}
</style>
