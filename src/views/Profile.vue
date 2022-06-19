<template>
  <div id="backgroundProfile">
    <b-container class="col-11 pt-4">
      <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
        Dados Pessoais
      </h2>

      <div class="row col-12">
        <div
          class="col-2 d-flex flex-row justify-content-center align-items-center"
        >
          <b-avatar
            v-if="getUser.imgProfile == ''"
            :style="{
              color: '#FDFDED',
              'background-color': '#BFBFBF',
              width: '230px',
              height: '190px',
            }"
          ></b-avatar>
          <img
            v-else
            :src="getUser.imgProfile"
            :style="{
              width: '220px',
              height: '220px',
              'border-radius': '100%',
            }"
            alt=""
            loading="lazy"
          />
          <b-button
            id="changePicture"
            style="
              position: absolute;
              z-index: 1;
              right: 5px;
              bottom: 50px;
              background-color: #e87461;
              border: none;
            "
            pill
            size="sm"
            v-b-modal.modal-profile
            @click="whatModalDo = 'changePicture'"
            ><span
              class="material-icons-round"
              style="display: flex; justify-content: center"
              >mode_edit</span
            ></b-button
          >
        </div>
        <div class="col-5">
          <b-form>
            <b-form-group
              label="Nome:"
              label-for="nested-street"
              label-cols-sm="4"
              label-align-sm="left"
            >
              <b-form-input
                id="nested-street"
                v-model="getUser.name"
                disabled
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Username:"
              label-for="nested-street"
              label-cols-sm="4"
              label-align-sm="left"
            >
              <b-form-input
                id="nested-street"
                disabled
                v-model="getUser.username"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Password:"
              label-for="nested-street"
              label-cols-sm="4"
              label-align-sm="left"
            >
              <b-form-input
                id="nested-street"
                disabled
                v-model="getUser.password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Email:"
              label-for="nested-street"
              label-cols-sm="4"
              label-align-sm="left"
            >
              <b-form-input
                id="nested-street"
                disabled
                v-model="getUser.email"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Tipo de Utilizador:"
              label-for="nested-street"
              label-cols-sm="4"
              label-align-sm="left"
            >
              <b-form-input
                id="nested-street"
                disabled
                v-model="getUser.typeUser"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <div class="col-7 d-flex flex-row justify-content-end">
          <b-button
            id="changePassword"
            :style="{
              color: '#fdfdf3',
              'background-color': '#e87461',
              border: 'none',
            }"
            v-b-modal.modal-profile
            @click="whatModalDo = 'changekey'"
            >Alterar Passsword</b-button
          >
        </div>
      </div>

      <b-modal
        id="modal-profile"
        centered
        hide-footer
        header-border-variant="0"
        header-class="color"
        body-class="color"
      >
        <!--Formulário para alterar password-->
        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center"
          v-if="whatModalDo == 'changekey'"
        >
          <h4 :style="{ color: '#e87461' }">Alterar Password</h4>

          <b-form @submit.prevent="changePassword()">
            <b-form-group
              label-cols="4"
              label-cols-lg="4"
              label-size="sm"
              label-align-sm="left"
              label="Password Atual:"
              label-for="input-sm"
              class="mt-4 mb-4"
            >
              <b-form-input
                type="password"
                id="input-sm"
                v-model="passForm.oldPass"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="4"
              label-size="sm"
              label-align-sm="left"
              label="Nova Password:"
              label-for="input-sm"
              class="mt-4 mb-4"
            >
              <b-form-input
                type="password"
                id="input-sm"
                v-model="passForm.newPass"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="4"
              label-size="sm"
              label-align-sm="left"
              label="Conf. Nova Password:"
              label-for="input-sm"
              class="mt-4 mb-4"
            >
              <b-form-input
                type="password"
                id="input-sm"
                v-model="passForm.confPass"
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
                >Alterar</b-button
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

        <!--Associar Criança-->
        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center"
          v-if="whatModalDo == 'addkid'"
        >
          <h4 :style="{ color: '#e87461' }">Associar Criança</h4>

          <b-form @submit.prevent="addChild()">
            <b-form-group
              label-cols="4"
              label-cols-lg="4"
              label-size="sm"
              label-align-sm="left"
              label="Username (Criança):"
              label-for="input-sm"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="input-sm"
                v-model="formAdd.childName"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="4"
              label-size="sm"
              label-align-sm="left"
              label="Password (Criança):"
              label-for="input-sm"
              class="mt-4 mb-4"
            >
              <b-form-input
                type="password"
                id="input-sm"
                v-model="formAdd.childPass"
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
                >Associar</b-button
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

        <!--Pedidos para associar-->
        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center d-flex flex-column align-items-center"
          v-if="whatModalDo == 'intoclass'"
        >
          <h4 :style="{ color: '#e87461' }">Pedidos para associar</h4>

          <table class="col-12 mt-3 ml-4 mr-4 mb-3 text-center">
            <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
              <th class="p-1">Turma</th>
              <th>Professor</th>
              <th>Ações</th>
            </tr>
            <tr
              :style="{ 'border-bottom': '2px solid #707070' }"
              v-for="(request, index) in getRequests"
              :key="index"
            >
              <td class="p-4">{{ request.name }}</td>
              <td>{{ request.teacher }}</td>
              <td>
                <b-button
                  size="sm"
                  style="background-color: #4da1a9; border: none"
                  class="ml-2 mr-1"
                  @click="
                    acceptRequest(
                      getChildInfo.username,
                      request.teacher,
                      request.name
                    )
                  "
                  ><span class="material-icons-round">done</span></b-button
                >
                <b-button
                  variant="danger"
                  size="sm"
                  style="border: none"
                  class="ml-1 mr-2"
                  @click="
                    removeRequest(
                      getChildInfo.username,
                      request.teacher,
                      request.name
                    )
                  "
                  ><span class="material-icons-round">close</span></b-button
                >
              </td>
            </tr>
          </table>
        </div>

        <!--Alterar imagem-->

        <div
          :style="{ fontFamily: 'EAmbit SemiBold' }"
          class="text-center"
          v-if="whatModalDo == 'changePicture'"
        >
          <h4 :style="{ color: '#e87461' }">Alterar Foto</h4>

          <b-form @submit="alterImg()">
            <b-form-group
              label-cols="4"
              label-cols-lg="4"
              label-size="sm"
              label-align-sm="left"
              label="Nova Imagem (URL):"
              label-for="newImage"
              class="mt-4 mb-4"
            >
              <b-form-input
                id="newImage"
                v-model="newImg"
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
                >Alterar</b-button
              >
            </div>
          </b-form>
        </div>
      </b-modal>

      <!--Parte vivível para os pais-->
      <div class="row col-12 mt-5" v-if="getUser.typeUser == 'Tutor'">
        <div class="col-6">
          <h2 :style="{ color: '#e87461', fontFamily: 'EAmbit SemiBold' }">
            Dados da Criança
          </h2>
        </div>
        <div
          class="col-6 d-flex flex-row justify-content-end"
          v-if="getChildInfo == ''"
        >
          <b-button
            class="h-75"
            :style="{
              'background-color': '#e87461',
              border: 'none',
              color: '#fdfdf3',
            }"
            @click="whatModalDo = 'addkid'"
            v-b-modal.modal-profile
            >Associar criança</b-button
          >
        </div>
        <div class="col-6 d-flex flex-row justify-content-end" v-else>
          <b-button
            class="h-75"
            :style="{
              'background-color': '#e87461',
              border: 'none',
              color: '#fdfdf3',
            }"
            @click="removeRelation()"
            >Desassociar criança</b-button
          >
        </div>

        <div v-if="getChildInfo != ''" class="col-12 row">
          <!-- Div if-->
          <div
            class="col-2 d-flex flex-row justify-content-center align-items-start mt-5"
          >
            <b-avatar
              v-if="getChildInfo.imgProfile == ''"
              :style="{
                color: '#FDFDED',
                'background-color': '#BFBFBF',
                width: '230px',
                height: '190px',
              }"
            ></b-avatar>
            <img
              v-else
              :src="getChildInfo.imgProfile"
              :style="{
                width: '220px',
                height: '220px',
                'border-radius': '100%',
              }"
              alt=""
              loading="lazy"
            />
          </div>
          <div class="col-5 mt-5">
            <b-form>
              <b-form-group
                label="Nome:"
                label-for="nested-street"
                label-cols-sm="4"
                label-align-sm="left"
              >
                <b-form-input
                  id="nested-street"
                  v-model="getChildInfo.name"
                  disabled
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Username:"
                label-for="nested-street"
                label-cols-sm="4"
                label-align-sm="left"
              >
                <b-form-input
                  id="nested-street"
                  disabled
                  v-model="getChildInfo.username"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Password:"
                label-for="nested-street"
                label-cols-sm="4"
                label-align-sm="left"
              >
                <b-form-input
                  id="nested-street"
                  disabled
                  v-model="getChildInfo.password"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Email:"
                label-for="nested-street"
                label-cols-sm="4"
                label-align-sm="left"
              >
                <b-form-input
                  id="nested-street"
                  disabled
                  v-model="getChildInfo.email"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Tipo de Utilizador:"
                label-for="nested-street"
                label-cols-sm="4"
                label-align-sm="left"
              >
                <b-form-input
                  id="nested-street"
                  disabled
                  v-model="getChildInfo.typeUser"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </div>
          <div class="col-5"></div>

          <div class="col-2"></div>

          <div class="col-10 d-flex flex-row justify-content-between">
            <label label-cols-sm="4" label-align-sm="left">Turmas: </label>

            <table class="col-10 ml-2 mr-2 text-center">
              <tr :style="{ 'background-color': '#e87461', color: '#fbfbf3' }">
                <th class="p-1">Turma</th>
                <th>Professor</th>
                <th>Ações</th>
              </tr>
              <tr
                :style="{ 'border-bottom': '2px solid #707070' }"
                v-for="(team, index) in getClassesKid"
                :key="index"
              >
                <td class="p-4">{{ team.name }}</td>
                <td>{{ team.teacher }}</td>
                <td>
                  <b-button variant="danger" @click="removeKidFromClass(team)"
                    ><b-icon icon="trash-fill"></b-icon> Anular</b-button
                  >
                </td>
              </tr>
            </table>
          </div>

          <div class="col-12 mt-4 pb-5 d-flex flex-row justify-content-end">
            <b-button
              :style="{
                color: '#fdfdf3',
                'background-color': '#e87461',
                border: 'none',
              }"
              v-b-modal.modal-profile
              @click="giveRequest(getChildInfo.username)"
              >Pedidos para Associar</b-button
            >
          </div>
        </div>

        <div
          class="mt-5 col-12 d-flex flex-row justify-content-center"
          v-if="getChildInfo == ''"
        >
          <!--Não associou a criança-->
          <p>Não existe criança associada, a este perfil</p>
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
      warning: "",
      whatModalDo: "",
      passForm: {
        oldPass: "",
        newPass: "",
        confPass: "",
      },
      formAdd: {
        childName: "",
        childPass: "",
      },
      newImg: "",
    };
  },

  computed: {
    ...mapGetters([
      "getLoggedUser",
      "getUser",
      "getChildInfo",
      "getRequests",
      "getClassesKid",
    ]),
  },

  methods: {
    ...mapActions([
      "find_ap",
      "updateUser_ap",
      "createRelation_ap",
      "findRelations_ap",
      "removeRelation_ap",
      "findRequests_ap",
      "acceptRequest_ap",
      "findClasses_ap",
      "deleteRequest_ap",
      "removeStudent_ap",
    ]),

    changePassword() {
      if (this.passForm.newPass != this.passForm.confPass) {
        this.warning =
          "A password que pretende colocar não corresponde a confirmação! Tente novamente.";
      } else {
        this.updateUser_ap([
          this.getLoggedUser.username,
          { password: this.passForm.newPass },
        ])
          .then(() => {
            location.reload();
          })
          .catch((err) => (this.warning = `${err}`));
      }
    },

    addChild() {
      this.createRelation_ap({
        usernameChild: this.formAdd.childName,
        password: this.formAdd.childPass,
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => (this.warning = `${err}`));
    },

    removeRelation() {
      if (confirm("Deseja mesmo desassociar esta criança?")) {
        this.removeRelation_ap({ usernameChild: this.getChildInfo.username })
          .then(() => {
            location.reload();
          })
          .catch((err) => alert(err));
      }
    },

    removeRequest(username, teacher, team) {
      if (confirm("Quer eliminar este pedido?")) {
        this.deleteRequest_ap([username, { teacher: teacher, className: team }])
          .then(() => this.findRequests_ap(username))
          .catch((err) => alert(err));
      }
    },

    acceptRequest(username, teacher, team) {
      this.acceptRequest_ap([username, { teacher: teacher, className: team }])
        .then(() => this.findRequests_ap(username))
        .catch((err) => alert(err));
    },

    removeKidFromClass(team) {
      if (confirm("Quer remover a criança desta turma?")) {
        this.removeStudent_ap([
          team.name,
          this.getChildInfo.username,
          { teacher: team.teacher },
        ]).then(() => location.reload());
      }
    },

    alterImg() {
      this.updateUser_ap({ imgProfile: this.newImg })
        .then(() => {
          location.reload();
        })
        .catch((err) => (this.warning = `${err}`));
    },

    giveRequest(username) {
      this.whatModalDo = "intoclass";
      this.findRequests_ap(username);
    },
  },

  created() {
    this.find_ap(this.getLoggedUser.username);
    if (this.getLoggedUser.type == "Tutor") {
      this.findRelations_ap().then(() => {
        this.findClasses_ap(this.getChildInfo.username);
      });
    }
  },
};
</script>

<style>
#backgroundProfile {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;
}
</style>
