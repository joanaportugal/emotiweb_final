<template>
  <div id="backgroundClass">
    <b-container class="col-11 pt-4">
      <div class="col-12 row">
        <div class="col-7" style="border-right: 2px solid #bfbfbf">
          <div
            class="col-12 d-flex flex-row justify-content-between align-items-center"
          >
            <h4 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
              Alunos
            </h4>
            <b-button
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              v-b-modal.modal-class
              @click="modalClassDo = 'addstudent'"
              >Adicionar</b-button
            >
          </div>

          <div class="col-12 mt-5">
            <b-form inline>
              <label class="mr-sm-2" for="filterTitle">Nome: </label>
              <b-form-input
                id="filterTitle"
                class="mb-2 mr-sm-5 mb-sm-0 col-5"
                :style="{ 'background-color': '#fdfdf3' }"
                disabled
              ></b-form-input>

              <label class="mr-sm-2" for="filterLevel">Turma: </label>
              <b-form-select
                id="filterLevel"
                class="mb-2 mr-sm-0 mb-sm-0 col-3"
                :style="{ 'background-color': '#fdfdf3' }"
                disabled
              ></b-form-select>
            </b-form>
          </div>

          <div class="col-12 mt-5">
            <table class="col-12 text-center">
              <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
                <th class="p-1">Username</th>
                <th>Nome</th>
                <th>Turma</th>
                <th>Ações</th>
              </tr>
              <tbody v-for="(team, index) in getStudents" :key="index">
                <tr
                  :style="{ 'border-bottom': '2px solid #707070' }"
                  v-for="(student, index) in team.students"
                  :key="index"
                >
                  <td class="p-4">{{ student.username }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ team.name }}</td>
                  <td>
                    <b-button
                      style="border: none"
                      class="ml-2 mr-1"
                      v-b-modal.modal-class
                      @click="openEditor(student, team.name)"
                      ><b-icon icon="pencil-fill"></b-icon></b-button
                    ><b-button
                      style="border: none"
                      variant="danger"
                      class="ml-2 mr-1"
                      @click="removeStudent(team.name, student.name)"
                      ><b-icon icon="trash-fill"></b-icon
                    ></b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-5">
          <div
            class="col-12 d-flex flex-row justify-content-between align-items-center"
          >
            <h4 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
              Turmas
            </h4>
            <b-button
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              v-b-modal.modal-class
              @click="modalClassDo = 'addclass'"
              >Adicionar</b-button
            >
          </div>

          <div class="col-12 mt-5">
            <table class="col-12 text-center">
              <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
                <th class="p-1">ID</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
              <tr
                :style="{ 'border-bottom': '2px solid #707070' }"
                v-for="(team, index) in getTeacherClasses"
                :key="index"
              >
                <td class="p-4">{{ index + 1 }}</td>
                <td>{{ team.name }}</td>
                <td>
                  <b-button
                    style="border: none"
                    variant="danger"
                    class="ml-2 mr-1"
                    @click="removeClass(team.name)"
                    ><b-icon icon="trash-fill"></b-icon
                  ></b-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </b-container>

    <b-modal
      id="modal-class"
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
        v-if="modalClassDo == 'addstudent'"
      >
        <h4 :style="{ color: '#e87461' }">Novo Aluno</h4>

        <b-form @submit.prevent="addStudent()">
          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Username:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              v-model="studentUsername"
              required
              @change="getStudentInfo()"
            ></b-form-input>
          </b-form-group>

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
              required
              disabled
              v-model="studentName"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Tutor:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              disabled
              v-model="studentTutor"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Turma:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-select id="input-sm" required v-model="teamToAdd">
              <b-form-select-option
                v-for="(team, index) in getTeacherClasses"
                :key="index"
                :value="team.name"
              >
                {{ team.name }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
          <div class="d-flex flex-row justify-content-end">
            <b-button
              type="submit"
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

      <!--Editar Aluno-->
      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="modalClassDo == 'editstudent'"
      >
        <h4 :style="{ color: '#e87461' }">Editar Aluno</h4>

        <b-form @submit.prevent="makeChanges()">
          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Username:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              required
              disabled
              v-model="studentInfo.usernameStudent"
            ></b-form-input>
          </b-form-group>

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
              required
              disabled
              v-model="studentInfo.nameStudent"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Tutor:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-input
              id="input-sm"
              required
              disabled
              v-model="studentInfo.tutorStudent"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="3"
            label-cols-lg="3"
            label-size="sm"
            label-align-sm="left"
            label="Turma:"
            label-for="input-sm"
            class="mt-4 mb-4"
          >
            <b-form-select id="input-sm" required v-model="studentInfo.team">
              <b-form-select-option
                v-for="(team, index) in getTeacherClasses"
                :key="index"
                :value="team.name"
              >
                {{ team.name }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>

          <div class="d-flex flex-row justify-content-end">
            <b-button
              type="submit"
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              >Alterar</b-button
            >
          </div>
        </b-form>
      </div>

      <!--Adicionar turma-->
      <div
        :style="{ fontFamily: 'EAmbit SemiBold' }"
        class="text-center"
        v-if="modalClassDo == 'addclass'"
      >
        <h4 :style="{ color: '#e87461' }">Adicionar Turma</h4>

        <b-form @submit.prevent="addClass()">
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
              v-model="className"
              required
            ></b-form-input>
          </b-form-group>

          <div class="d-flex flex-row justify-content-end">
            <b-button
              type="submit"
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
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      warning: "",
      modalClassDo: "",
      classForm: {},
      className: "",
      studentUsername: "",
      studentName: "",
      studentTutor: null,
      teamToAdd: "",
      student: {},
      studentInfo: {},
      oldTeam: "",
    };
  },

  computed: {
    ...mapGetters([
      "getLoggedUser",
      "getTeacherClasses",
      "getSearchkid",
      "getStudents",
    ]),
  },

  methods: {
    ...mapActions([
      "findAllClasses_ap",
      "createClass_ap",
      "findChildClasses_ap",
      "createRequest_ap",
      "removeClass_ap",
      "find_ap",
      "alterStudent_ap",
      "removeStudent_ap",
      "findAllStudents_ap",
    ]),

    addClass() {
      this.createClass_ap({ className: this.className })
        .then(location.reload())
        .catch((err) => (this.warning = `${err}`));
    },

    removeClass(teamName) {
      if (confirm("Deseja remover a turma?")) {
        this.removeClass_ap(teamName)
          .then(() => {
            location.reload();
          })
          .catch((err) => alert(err));
      }
    },

    getStudentInfo() {
      this.findChildClasses_ap(this.studentUsername)
        .then(() => {
          this.studentName = this.getSearchkid.name;
          this.studentTutor = this.getSearchkid.tutor;
        })
        .catch((err) => (this.warning = `${err}`));
    },

    addStudent() {
      this.createRequest_ap({
        usernameChild: this.studentUsername,
        className: this.teamToAdd,
      })
        .then(location.reload())
        .catch((err) => (this.warning = `${err}`));
    },

    openEditor(student, teamName) {
      this.modalClassDo = "editstudent";
      this.oldTeam = teamName;
      this.studentInfo = {
        usernameStudent: student.username,
        nameStudent: student.name,
        tutorStudent: student.tutor,
        team: teamName,
      };
    },

    makeChanges() {
      this.alterStudent_ap([
        this.oldTeam,
        this.studentInfo.usernameStudent,
        { newClass: this.studentInfo.team },
      ])
        .then(() => location.reload())
        .catch((err) => (this.warning = `${err}`));
    },

    removeStudent(team, username) {
      if (confirm("Deseja mesmo eliminar este aluno?")) {
        this.removeStudent_ap([team, username, {}])
          .then(() => location.reload())
          .catch((err) => alert(err));
      }
    },
  },

  created() {
    this.findAllClasses_ap();
    this.find_ap(this.getLoggedUser.username);
    this.findAllStudents_ap();
  },
};
</script>

<style>
#backgroundClass {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>
