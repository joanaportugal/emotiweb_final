<template>
  <div id="backgroundActivities">
    <b-container class="col-11 pt-4">
      <div class="col-12 d-flex flex-row justify-content-between">
        <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
          Catálogo
        </h2>
        <b-button
          :style="{
            height: '100%',
            'background-color': '#e87461',
            border: 'none',
            color: '#fbfbf3',
          }"
          v-b-toggle.sidebar-right
          ><b-icon icon="filter"></b-icon> Filtrar</b-button
        >
      </div>

      <b-sidebar
        id="sidebar-right"
        right
        shadow
        backdrop
        body-class="sideFilter"
        header-class="sideFilter"
      >
        <div class="px-3 py-2">
          <h4
            :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }"
            class="mt-3 mb-3 text-center"
          >
            Filtrar
          </h4>

          <b-form>
            <label for="" class="mt-3">Dificuldade: </label>
            <b-form-select v-model="formFilter.level" size="sm" class="mb-3">
              <b-form-select-option :value="null" disabled
                >Selecione uma opção</b-form-select-option
              >
              <b-form-select-option
                :value="level"
                v-for="(level, index) in levels"
                :key="index"
                >{{ level }}</b-form-select-option
              >
            </b-form-select>

            <label for="" class="mt-3">Categoria: </label>
            <b-form-select v-model="formFilter.category" size="sm" class="mb-3">
              <b-form-select-option :value="null" disabled
                >Selecione uma opção</b-form-select-option
              >
              <b-form-select-option
                :value="category"
                v-for="(category, index) in categories"
                :key="index"
                >{{ category }}</b-form-select-option
              >
            </b-form-select>

            <label for="" class="mt-3">Sugerido por: </label>
            <b-form-select
              v-model="formFilter.sugestFrom"
              size="sm"
              class="mb-3"
              disabled
            >
              <b-form-select-option :value="null" disabled
                >Selecione uma opção</b-form-select-option
              >
              <b-form-select-option
                :value="sugest"
                v-for="(sugest, index) in sugestions"
                :key="index"
                >{{ sugest }}</b-form-select-option
              >
            </b-form-select>

            <label for="" class="mt-3">Número de perguntas: </label>
            <b-form-select
              v-model="formFilter.nQuestions"
              size="sm"
              class="mb-3"
              disabled
            ></b-form-select>

            <div class="mt-4 d-flex flex-row justify-content-center">
              <b-button
                :style="{
                  'background-color': '#fbfbf3',
                  color: '#e87461',
                  border: '1px solid #e87461',
                  width: '40%',
                }"
                class="col-12"
                @click="resetForm()"
                >Repor</b-button
              >
            </div>
          </b-form>
        </div>
      </b-sidebar>

      <b-card-group class="row col-12" columns>
        <b-card
          tag="article"
          :style="{
            'max-width': '20vw',
            'background-color': '#fbfbf3',
            border: 'none',
            'padding-left': cardAffect == index ? '0px' : '10px',
          }"
          class="mb-2 mr-2"
          v-for="(activity, index) in getActivities"
          :key="index"
          @mouseover="cardAffect = index"
          @mouseleave="cardAffect = null"
        >
          <b-link
            ><img
              v-bind:src="activity.caseIMG"
              alt=""
              style="width: 17rem; height: 10rem; border-radius: 5px"
              loading="lazy"
              @click="
                $router.push({
                  name: 'Activity',
                  params: { name: activity.title },
                })
              "
          /></b-link>
          <div
            class="d-flex flex-row justify-content-between mt-3"
            style="width: 16.5rem"
          >
            <b-card-sub-title class="mb-2"
              ><span style="color: #e87461">{{
                activity.category
              }}</span></b-card-sub-title
            >
            <div>
              <b-card-sub-title class="mb-2"
                ><b-link
                  @click="activityTitle = activity.title"
                  :style="{
                    color: '#e87461',
                    fontFamily: 'EAmbit SemiBold',
                    fontSize: '20px',
                    'text-decoration': 'none',
                  }"
                  v-b-modal.modalCatalog
                  v-if="
                    getLoggedUser.type != 'Criança' &&
                    getLoggedUser.type != 'Administrador' &&
                    activity.author != getLoggedUser.username
                  "
                  ><span
                    class="material-icons-round"
                    :style="{ color: '#87461' }"
                    >edit</span
                  ></b-link
                ><span
                  class="material-icons-round"
                  v-if="
                    getLoggedUser.type == 'Criança' &&
                    getHistory.find((quiz) => quiz.title == activity.title)
                  "
                  >done</span
                ><span
                  class="material-icons-round"
                  v-if="
                    getLoggedUser.type == 'Criança' &&
                    getUser.activitiesSuggested.find(
                      (quiz) =>
                        quiz.title == activity.title && quiz.who == 'Professor'
                    )
                  "
                  >school</span
                ><span
                  class="material-icons-round"
                  style="margin-left: 5px"
                  v-if="
                    getLoggedUser.type == 'Criança' &&
                    getUser.activitiesSuggested.find(
                      (quiz) =>
                        quiz.title == activity.title && quiz.who == 'Tutor'
                    )
                  "
                  >family_restroom</span
                ></b-card-sub-title
              >
            </div>
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
                  params: { name: activity.title },
                })
              "
              >{{ activity.title }}</b-link
            ></b-card-title
          >
        </b-card>
      </b-card-group>
    </b-container>

    <b-modal
      id="modalCatalog"
      centered
      hide-footer
      header-border-variant="0"
      header-class="color"
      body-class="color"
    >
      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="getLoggedUser.type == 'Professor'"
      >
        <!--Falta v-if -->
        <h4 :style="{ color: '#e87461' }">Sugerir Atividade</h4>

        <b-form @submit.prevent="sugestToClasses()">
          <b-form-group
            label-cols="4"
            label-cols-lg="4"
            label-size="sm"
            label-align-sm="left"
            label="Atividade:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              type="text"
              id="input-sm"
              disabled
              required
              v-model="activityTitle"
              >{{ activityTitle }}</b-form-input
            >
          </b-form-group>

          <b-form-group
            label-cols="9"
            label-cols-lg="4"
            label-size="sm"
            label-align-sm="left"
            label="Atribuir a:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <div
              class="row mt-2"
              v-for="(teamView, index) in classesView"
              :key="index"
            >
              <b-form-select
                id="input-sm"
                class="col-8 ml-3"
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
                class="col-2 ml-2"
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
              >Sugerir</b-button
            >
          </div>
        </b-form>
      </div>

      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="getLoggedUser.type == 'Tutor'"
      >
        <!--Falta v-if -->
        <h4 :style="{ color: '#e87461' }">Sugerir Atividade</h4>

        <b-form @submit.prevent="sugestToKid()">
          <b-form-group
            label-cols="4"
            label-cols-lg="4"
            label-size="sm"
            label-align-sm="left"
            label="Atividade:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              type="text"
              id="input-sm"
              disabled
              required
              v-model="activityTitle"
              >{{ activityTitle }}</b-form-input
            >
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="4"
            label-size="sm"
            label-align-sm="left"
            label="Atribuir a:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              type="text"
              id="input-sm"
              disabled
              required
              v-model="getUser.children[0]"
              >{{ getUser.children[0] }}</b-form-input
            >
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
              >Sugerir</b-button
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
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      warning: "",
      formFilter: {
        level: "",
        category: "",
        sugestFrom: "",
        nQuestions: "",
      },
      levels: ["Fácil", "Médio", "Dificil"],
      categories: [
        "Quiz",
        "Reconhecimento",
        "Atividades Personalizadas (Tutor)",
        "Atividades Personalizadas (Professor)",
      ],
      sugestions: ["Tutor", "Professor", "Ambos"],
      cardAffect: null,
      activitiesCatalog: "",
      activityTitle: "",
      classesView: [""],
      user: [],
    };
  },
  methods: {
    ...mapActions([
      "find_ap",
      "findAtivities_ap",
      "getHistory_ap",
      "findAllClasses_ap",
      "setSuggest_ap",
    ]),

    sugestToKid() {
      this.setSuggest_ap([this.activityTitle, { list: this.getUser.children }])
        .then(() => location.reload())
        .catch((err) => {
          alert(`${err}`);
        });
    },

    sugestToClasses() {
      if (this.classesView.lenght > 1) {
        this.classesView.pop();
      }
      this.setSuggest_ap([this.activityTitle, { list: this.classesView }])
        .then(() => location.reload())
        .catch((err) => {
          alert(`${err}`);
        });
    },

    newClassView() {
      this.classesView.push("");
    },

    resetForm() {
      this.formFilter.level = "";
      this.formFilter.category = "";
    },
  },

  computed: {
    ...mapGetters([
      "getActivities",
      "getLoggedUser",
      "getTeacherClasses",
      "getUser",
      "getHistory",
    ]),
  },
  watch: {
    "formFilter.level"() {
      if (this.formFilter.category != "") {
        this.findAtivities_ap(
          `?level=${this.formFilter.level}&category=${this.formFilter.category}`
        );
      } else {
        this.findAtivities_ap(`?level=${this.formFilter.level}`);
      }
    },

    "formFilter.category"() {
      if (this.formFilter.level != "") {
        this.findAtivities_ap(
          `?category=${this.formFilter.category}&level=${this.formFilter.level}`
        );
      } else {
        this.findAtivities_ap(`?category=${this.formFilter.category}`);
      }
    },
  },
  created() {
    this.find_ap(this.getLoggedUser.username);
    this.findAtivities_ap("");
    if (this.getLoggedUser.type == "Criança") {
      this.getHistory_ap();
    } else if (this.getLoggedUser.type == "Professor") {
      this.findAllClasses_ap();
    }
  },
};
</script>

<style>
#backgroundActivities {
  width: 100%;
  height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;
}
.sideFilter {
  background-color: #fbfbf3;
}
</style>
