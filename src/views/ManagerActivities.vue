<template>
  <div id="backgroundManagerUser">
    <b-container class="col-11 pt-4">
      <div
        class="col-12"
        :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }"
      >
        <h2>Gerir Atividades</h2>
      </div>

      <div class="col-12 mt-4">
        <b-form inline>
          <label class="mr-sm-2" for="filterTitle">Título: </label>
          <b-form-input
            id="filterTitle"
            class="mb-2 mr-sm-5 mb-sm-0 col-3"
            :style="{ 'background-color': '#fdfdf3' }"
            v-model="formFilter.title"
          ></b-form-input>

          <label class="mr-sm-2" for="filterLevel">Categoria: </label>
          <b-form-select
            id="filterLevel"
            class="mb-2 mr-sm-5 mb-sm-0 col-2"
            :style="{ 'background-color': '#fdfdf3' }"
            v-model="formFilter.category"
          >
            <b-form-select-option value="">Qualquer</b-form-select-option>
            <b-form-select-option value="Quiz">Quiz</b-form-select-option>
            <b-form-select-option value="Reconhecimento" disabled
              >Reconhecimento</b-form-select-option
            >
          </b-form-select>

          <label class="mr-sm-2" for="filterDifficulty">Dificuldade: </label>
          <b-form-select
            id="filterDifficulty"
            class="mb-2 mr-sm-0 mb-sm-0 col-2"
            :style="{ 'background-color': '#fdfdf3' }"
            v-model="formFilter.level"
          >
            <b-form-select-option value="">Qualquer</b-form-select-option>
            <b-form-select-option value="Fácil">Fácil</b-form-select-option>
            <b-form-select-option value="Médio">Médio</b-form-select-option>
            <b-form-select-option value="Dificil">Dificil</b-form-select-option>
          </b-form-select>
        </b-form>
      </div>

      <div class="col-12 d-flex flex-row justify-content-end mt-5">
        <b-button
          :style="{
            color: '#fdfdf3',
            'background-color': '#BFBFBF',
            border: 'none',
          }"
          class="mr-3"
          id="btnEmotions"
          v-b-modal.modalManagerActivity
          @click="openEditorEmotion()"
          >Gerir Emoções</b-button
        >
        <b-button
          :style="{
            color: '#fdfdf3',
            'background-color': '#e87461',
            border: 'none',
          }"
          id="btnActivities"
          v-b-modal.modalManagerActivity
          @click="modalActivityDo = 'addactivity'"
          >Adicionar</b-button
        >
      </div>

      <div class="col-12 mt-3">
        <table class="col-12 text-center">
          <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
            <th class="p-1">Título</th>
            <th>Grau de Dificuldade</th>
            <th>Imagem (Capa do Quiz)</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
          <tr
            :style="{ 'border-bottom': '2px solid #707070' }"
            v-for="(activity, index) in getActivities"
            :key="index"
          >
            <td class="p-4">{{ activity.title }}</td>
            <td>{{ activity.level }}</td>
            <td>{{ activity.caseIMG }}</td>
            <td>{{ activity.category }}</td>
            <td>
              <b-button
                style="border: none"
                variant="secondary"
                class="ml-2 mr-1"
                v-b-modal.modalManagerActivity
                @click="modalEditOpen(activity)"
                ><b-icon icon="pencil-fill"></b-icon></b-button
              ><b-button
                style="border: none"
                variant="danger"
                class="ml-2 mr-1"
                @click="removeActivity(activity.title)"
                ><b-icon icon="trash-fill"></b-icon
              ></b-button>
            </td>
          </tr>
        </table>
      </div>
    </b-container>

    <b-modal
      size="lg"
      id="modalManagerActivity"
      centered
      hide-footer
      header-border-variant="0"
      header-class="color"
      body-class="color"
    >
      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="modalActivityDo == 'addactivity'"
      >
        <h4 :style="{ color: '#e87461' }">Adicionar Atividade</h4>

        <b-form @submit.prevent="addActivity()">
          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Título:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              v-model="newActivity.title"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Dificuldade:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-select id="input-sm" v-model="newActivity.level" required>
              <b-form-select-option value="Fácil">Fácil</b-form-select-option>
              <b-form-select-option value="Médio">Médio</b-form-select-option>
              <b-form-select-option value="Dificil"
                >Dificil</b-form-select-option
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Categoria:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-select
              id="input-sm"
              v-model="newActivity.category"
              required
            >
              <b-form-select-option value="Quiz">Quiz</b-form-select-option>
              <b-form-select-option value="Reconhecimento" disabled
                >Reconhecimento</b-form-select-option
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Questão:"
            label-for="input-sm"
            class="mt-4 mb-4"
            v-for="(question, index) in newActivity.questions"
            :key="index"
          >
            <div class="row mt-2">
              <b-form-select
                id="input-sm"
                class="col-3 ml-3"
                v-model="question.correctAnswer"
                :disabled="index + 1 != newActivity.questions.length"
              >
                <b-form-select-option
                  v-for="(emotion, index) in getEmotions"
                  :key="index"
                  :value="emotion.name"
                  >{{ emotion.name }}</b-form-select-option
                >
              </b-form-select>
              <b-form-input
                id="input-sm"
                class="col-4 ml-2"
                placeholder="Imagem"
                v-model="question.img"
                :disabled="index + 1 != newActivity.questions.length"
              ></b-form-input>
              <b-form-input
                id="input-sm"
                type="number"
                class="col-2 ml-2"
                placeholder="Pontos"
                min="0"
                v-model.number="question.points"
                :disabled="index + 1 != newActivity.questions.length"
              ></b-form-input>
              <b-button
                class="col-1 ml-2"
                @click="addNewQuestion(index)"
                :disabled="index + 1 != newActivity.questions.length"
                ><b-icon icon="plus-circle-fill"></b-icon
              ></b-button>
            </div>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Capa (IMG):"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              type="url"
              id="input-sm"
              v-model="newActivity.caseIMG"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Descrição:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-textarea
              v-model="newActivity.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <div class="d-flex flex-row justify-content-end">
            <b-button
              type="submit"
              class="text-end"
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              >Adicionar</b-button
            >
          </div>
        </b-form>
      </div>

      <!--Editar Atividade-->

      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="modalActivityDo == 'editactivity'"
      >
        <h4 :style="{ color: '#e87461' }">Editar Atividade</h4>

        <b-form @submit.prevent="applyChangesActivity()">
          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Título:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              v-model="editActivity.title"
              disabled
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Dificuldade:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-select id="input-sm" v-model="editActivity.level" required>
              <b-form-select-option value="Fácil">Fácil</b-form-select-option>
              <b-form-select-option value="Médio">Médio</b-form-select-option>
              <b-form-select-option value="Dificil"
                >Dificil</b-form-select-option
              >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Categoria:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-select
              id="input-sm"
              v-model="editActivity.category"
              disabled
              required
            >
              <b-form-select-option value="Quiz">Quiz</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Questão:"
            label-for="input-sm"
            class="mt-4 mb-4"
            v-for="(question, index) in editActivity.questions"
            :key="index"
          >
            <div class="row">
              <b-form-select
                id="input-sm"
                class="col-3 ml-3"
                v-model="question.correctAnswer"
                disabled
              >
                <b-form-select-option :value="question.correctAnswer">{{
                  question.correctAnswer
                }}</b-form-select-option>
              </b-form-select>
              <b-form-input
                id="input-sm"
                class="col-4 ml-2"
                placeholder="Imagem"
                v-model="question.img"
              ></b-form-input>
              <b-form-input
                id="input-sm"
                type="number"
                class="col-2 ml-2"
                placeholder="Pontos"
                min="0"
                v-model.number="question.points"
              ></b-form-input>
            </div>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Capa (IMG):"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              type="url"
              id="input-sm"
              v-model="editActivity.caseIMG"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Descrição:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-textarea
              v-model="editActivity.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <div class="d-flex flex-row justify-content-end">
            <b-button
              type="submit"
              class="text-end"
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              >Editar</b-button
            >
          </div>
        </b-form>
      </div>

      <!--Gerir Emoções-->
      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="modalActivityDo == 'manageremotion'"
      >
        <h4 :style="{ color: '#e87461' }">Emoções</h4>

        <b-form @submit.prevent="addNewEmotion()">
          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Nome:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              v-model="newEmotion"
              required
            ></b-form-input>
          </b-form-group>

          <div class="d-flex flex-row justify-content-end">
            <b-button
              type="submit"
              class="text-end"
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              >Adicionar</b-button
            >
          </div>
        </b-form>

        <hr />

        <table class="col-12 text-center">
          <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
            <th class="p-1">Nome</th>
            <th>Ação</th>
          </tr>
          <tr
            :style="{ 'border-bottom': '2px solid #707070' }"
            v-for="(emotion, index) in getEmotions"
            :key="index"
          >
            <td class="p-4">{{ emotion.name }}</td>
            <td>
              <b-button
                style="border: none"
                variant="danger"
                class="ml-2 mr-1"
                @click="removeEmotion(emotion.name)"
                ><b-icon icon="trash-fill"></b-icon
              ></b-button>
            </td>
          </tr>
        </table>
      </div>
      <div
        v-if="warning != ''"
        :style="{
          'background-color': '#C82333',
          color: '#fdfdf3',
          'border-radius': '4px',
        }"
      >
        <p>{{ warning }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ManagerActivities",
  data() {
    return {
      warning: "",
      modalActivityDo: "",
      newEmotion: "",

      newActivity: {
        title: "",
        level: "",
        questions: [
          {
            img: "",
            correctAnswer: "",
            answers: [],
            points: 0,
          },
        ],
        caseIMG: "",
        description: "",
        category: "",
      },

      editActivity: {
        title: "",
        level: "",
        questions: [{}],
        caseIMG: "",
        description: "",
        category: "",
        author: "admin",
      },
      activitiesAdmin: "",
      formFilter: {
        title: "",
        category: "",
        level: "",
      },
    };
  },

  computed: {
    ...mapGetters(["getLoggedUser", "getEmotions", "getActivities"]),
  },

  methods: {
    ...mapActions([
      "findAllEmotions_ap",
      "createEmotion_ap",
      "find_ap",
      "deleteEmotion_ap",
      "findAtivities_ap",
      "createActivity_ap",
      "deleteActivity_ap",
      "editActivity_ap",
    ]),

    modalEditOpen(variable) {
      this.modalActivityDo = "editactivity";
      this.editActivity = variable;
    },

    openEditorEmotion() {
      this.modalActivityDo = "manageremotion";
      this.findAllEmotions_ap();
    },

    applyChangesActivity() {
      this.editActivity_ap([
        this.editActivity.title,
        {
          level: this.editActivity.level,
          description: this.editActivity.description,
          questions: this.editActivity.questions,
          caseIMG: this.editActivity.caseIMG,
        },
      ])
        .then(() => location.reload())
        .catch((err) => {
          alert(`${err}`);
        });
    },

    removeEmotion(emotion) {
      if (confirm("Deseja remover a emoção?")) {
        this.deleteEmotion_ap(emotion)
          .then(() => {
            this.findAllEmotions_ap();
          })
          .catch((err) => alert(err));
      }
    },

    addNewEmotion() {
      this.createEmotion_ap({ name: this.newEmotion })
        .then(() => {
          this.findAllEmotions_ap().then(() => (this.newEmotion = ""));
        })
        .catch((err) => alert(`${err}`));
    },

    addNewQuestion(index) {
      let wrongEmotions = [];
      let emotionId = "";
      let validation = false;
      let validation1 = false;

      for (let i = 0; i < 3; i++) {
        while (validation == false) {
          emotionId = Math.floor(Math.random() * this.getEmotions.length);
          validation1 = wrongEmotions.some(
            (wrong) => wrong == this.getEmotions[emotionId]
          );
          if (
            this.getEmotions[emotionId] !=
              this.newActivity.questions[index].correctAnswer &&
            validation1 == false
          ) {
            wrongEmotions.push(this.getEmotions[emotionId]);
            validation = true;
          }
        }
        validation = false;
      }

      wrongEmotions.push(this.newActivity.questions[index].correctAnswer);
      this.newActivity.questions[index].answers = wrongEmotions;
      wrongEmotions.sort(() => Math.random() - 0.5);

      this.newActivity.questions.push({
        img: "",
        correctAnswer: "",
        answers: [],
        points: 0,
      });
    },

    addActivity() {
      this.newActivity.title = this.newActivity.title.replace("?", "");
      this.createActivity_ap(this.newActivity)
        .then(() => location.reload())
        .catch((err) => {
          alert(`${err}`);
        });
    },

    removeActivity(variable) {
      if (confirm("Tem a certeza que pretende remover esta atividade?")) {
        this.deleteActivity_ap(variable)
          .then(() => location.reload())
          .catch((err) => {
            alert(`${err}`);
          });
      }
    },
  },
  created() {
    this.activitiesAdmin = this.getActivitiesAdmin;
    this.find_ap(this.getLoggedUser.username);
    this.findAtivities_ap("");
    this.findAllEmotions_ap();
  },

  watch: {
    "formFilter.title"() {
      if (this.formFilter.level != "" && this.formFilter.category != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&level=${this.formFilter.level}&category=${this.formFilter.category}`
        );
      } else if (this.formFilter.level != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&level=${this.formFilter.level}`
        );
      } else if (this.formFilter.category != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&category=${this.formFilter.category}`
        );
      } else {
        this.findAtivities_ap(`?title=${this.formFilter.title}`);
      }
    },

    "formFilter.level"() {
      if (this.formFilter.title != "" && this.formFilter.category != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&level=${this.formFilter.level}&category=${this.formFilter.category}`
        );
      } else if (this.formFilter.title != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&level=${this.formFilter.level}`
        );
      } else if (this.formFilter.category != "") {
        this.findAtivities_ap(
          `?level=${this.formFilter.level}&category=${this.formFilter.category}`
        );
      } else {
        this.findAtivities_ap(`?level=${this.formFilter.level}`);
      }
    },

    "formFilter.category"() {
      if (this.formFilter.level != "" && this.formFilter.title != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&level=${this.formFilter.level}&category=${this.formFilter.category}`
        );
      } else if (this.formFilter.level != "") {
        this.findAtivities_ap(
          `?category=${this.formFilter.category}&level=${this.formFilter.level}`
        );
      } else if (this.formFilter.title != "") {
        this.findAtivities_ap(
          `?title=${this.formFilter.title}&category=${this.formFilter.level}`
        );
      } else {
        this.findAtivities_ap(`?category=${this.formFilter.category}`);
      }
    },
  },
};
</script>

<style>
#backgroundManagerUser {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>
