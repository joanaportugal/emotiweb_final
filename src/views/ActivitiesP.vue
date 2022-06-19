<template>
  <div id="backgroundActivitiesP">
    <b-container class="col-11 pt-4">
      <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
        Atividades Personalizadas
      </h2>

      <div class="row col-12 pt-3">
        <div class="col-9 mt-4">
          <b-form inline>
            <label class="mr-sm-2" for="filterTitle">Título: </label>
            <b-form-input
              id="filterTitle"
              v-model="filter.title"
              class="mb-2 mr-sm-5 mb-sm-0 col-3"
              :style="{ 'background-color': '#fdfdf3' }"
            ></b-form-input>

            <label class="mr-sm-2" for="filterLevel"
              >Grau de Dificuldade:
            </label>
            <b-form-select
              id="filterLevel"
              v-model="filter.level"
              class="mb-2 mr-sm-0 mb-sm-0 col-3"
              :style="{ 'background-color': '#fdfdf3' }"
            >
              <b-form-select-option value="">Qualquer</b-form-select-option>
              <b-form-select-option value="Fácil">Fácil</b-form-select-option>
              <b-form-select-option value="Médio">Médio</b-form-select-option>
              <b-form-select-option value="Dificil"
                >Dificil</b-form-select-option
              >
            </b-form-select>
          </b-form>
        </div>

        <div class="col-3 mt-4 d-flex flex-row justify-content-end">
          <b-button
            :style="{
              color: '#fdfdf3',
              'background-color': '#e87461',
              border: 'none',
            }"
            v-b-modal.modal-myactivities
            @click="modalDo = 'addgame'"
            >Adicionar</b-button
          >
        </div>

        <div class="col-12 mt-5">
          <table class="col-12 text-center">
            <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
              <th class="p-1">Título</th>
              <th>Grau de Dificuldade</th>
              <th>Imagem (Capa)</th>
              <th>Ações</th>
            </tr>
            <tr
              :style="{ 'border-bottom': '2px solid #707070' }"
              v-for="(activity, index) in filterActivitiesPers"
              :key="index"
            >
              <td class="p-4">{{ activity.title }}</td>
              <td>{{ activity.level }}</td>
              <td>{{ activity.caseIMG }}</td>
              <td>
                <b-button
                  v-if="getLoggedUser.type == 'Professor'"
                  style="background-color: #4da1a9; border: none"
                  class="ml-2 mr-1"
                  @click="openModal(activity.title)"
                  v-b-modal.modal-myactivities
                  ><b-icon icon="eye-fill"></b-icon></b-button
                ><b-button
                  style="border: none"
                  variant="secondary"
                  class="ml-2 mr-1"
                  v-b-modal.modal-myactivities
                  @click="modalEditOpen(activity)"
                  ><b-icon icon="pencil-fill"></b-icon></b-button
                ><b-button
                  style="border: none"
                  variant="danger"
                  class="ml-2 mr-1"
                  ><b-icon
                    icon="trash-fill"
                    @click="removeActivity(activity.title)"
                  ></b-icon
                ></b-button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <b-modal
        id="modal-myactivities"
        size="lg"
        centered
        hide-footer
        header-border-variant="0"
        header-class="color"
        body-class="color"
        scrollable
      >
        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center"
          v-if="modalDo == 'addgame'"
        >
          <h4 :style="{ color: '#e87461' }">
            Adicionar Atividade Personalizada
          </h4>

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
              label="Questão:"
              label-for="input-sm"
              class="mt-4 mb-4"
              v-for="(question, index) in newActivity.questions"
              :key="index"
            >
              <div class="row">
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
                  @click="addNewQuestion()"
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
          </b-form>
        </div>

        <!--Editar Atividade-->

        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center"
          v-if="modalDo == 'editactivity'"
        >
          <h4 :style="{ color: '#e87461' }">Editar Atividade Personalizada</h4>

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
              <b-form-select
                id="input-sm"
                v-model="editActivity.level"
                required
              >
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

        <!--Visibilidade da Atividade-->
        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center"
          v-if="modalDo == 'viewgame'"
        >
          <h4 :style="{ color: '#e87461' }">Visibilidade</h4>

          <b-form @submit.prevent="defineVisibility()">
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
                v-model="activityName"
                required
                disabled
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="3"
              label-cols-lg="3"
              label-size="sm"
              label-align-sm="left"
              label="Atribuir a:"
              label-for="input-sm"
              class="mt-4 mb-4"
            >
              <div
                class="row"
                v-for="(teamView, index) in classesView"
                :key="index"
              >
                <b-form-select
                  id="input-sm"
                  class="col-8 ml-3"
                  :disabled="index + 1 != classesView.length"
                  v-model="classesView[index]"
                >
                  <b-form-select-option disabled value=""
                    >---Turmas---</b-form-select-option
                  >
                  <b-form-select-option
                    v-for="(team, index) in getTeacherClasses"
                    :key="index"
                    :value="team.name"
                    >{{ team.name }}</b-form-select-option
                  >
                </b-form-select>
                <b-button
                  class="col-1 ml-2"
                  @click="newClassView()"
                  :disabled="index + 1 != classesView.length"
                  ><b-icon icon="plus-circle-fill"></b-icon
                ></b-button>
              </div>
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
                >Definir</b-button
              >
            </div>
          </b-form>
        </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      warning: "",
      modalActivityDo: "",
      modalDo: "",
      activityName: "",
      classesView: [""],
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
        category: "Quiz",
        author: "",
      },
      editActivity: {
        title: "",
        level: "",
        questions: [{}],
        caseIMG: "",
        description: "",
        category: "",
        author: "",
      },
      data: {
        student1: "",
        activity: "",
      },
      filter: {
        title: "",
        level: "",
      },
      listActivitiesPers: [],
    };
  },

  computed: {
    ...mapGetters([
      "getLoggedUser",
      "getEmotions",
      "getActivitiesP",
      "getTeacherClasses",
      "getUser",
    ]),

    filterActivitiesPers() {
      return this.listActivitiesPers.filter(
        (activity) =>
          (activity.title == this.filter.title || this.filter.title == "") &&
          (activity.level == this.filter.level || this.filter.level == "")
      );
    },
  },
  created() {
    this.find_ap(this.getLoggedUser.username);
    this.findAtivities_ap("").then(() => {
      this.listActivitiesPers = this.getActivitiesP(
        this.getLoggedUser.username
      );
    });
    this.findAllEmotions_ap();
    if (this.getLoggedUser.type == "Professor") {
      this.findAllClasses_ap();
    }
  },

  methods: {
    ...mapActions([
      "findAtivities_ap",
      "find_ap",
      "createActivity_ap",
      "findAllEmotions_ap",
      "deleteActivity_ap",
      "editActivity_ap",
      "giveToKidPersonalActi_ap",
      "findAllClasses_ap",
    ]),

    addNewQuestion() {
      this.newActivity.questions.push({
        img: "",
        correctAnswer: "",
        answers: [],
        points: 0,
      });
    },

    addActivity() {
      this.newActivity.title = this.newActivity.title.replace("?", "");
      if (this.getLoggedUser.type == "Tutor") {
        this.newActivity.category = "Atividades Personalizadas (Tutor)";
      } else {
        this.newActivity.category = "Atividades Personalizadas (Professor)";
      }
      this.createActivity_ap(this.newActivity)
        .then(() => {
          if (this.getLoggedUser.type == "Tutor") {
            this.giveToKidPersonalActi_ap([
              this.newActivity.title,
              { list: this.getUser.children },
            ]).then(() => location.reload());
          }
        })
        .catch((err) => (this.warning = `${err}`));
    },

    removeActivity(variable) {
      if (confirm("Tem a certeza que pretende remover esta atividade?")) {
        this.deleteActivity_ap(variable)
          .then(() => location.reload())
          .catch((err) => alert(`${err}`));
      }
    },

    modalEditOpen(variable) {
      this.modalDo = "editactivity";
      this.editActivity = variable;
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
        .catch((err) => (this.warning = `${err}`));
    },

    openModal(variable) {
      this.modalDo = "viewgame";
      this.activityName = variable;
    },

    newClassView() {
      this.classesView.push("");
    },

    defineVisibility() {
      this.giveToKidPersonalActi_ap([
        this.activityName,
        { list: this.classesView },
      ])
        .then(() => location.reload())
        .catch((err) => {
          alert(`${err}`);
        });
    },
  },
};
</script>

<style>
#backgroundActivitiesP {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>
