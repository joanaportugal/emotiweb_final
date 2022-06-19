<template>
  <div class="hello">
    <b-navbar
      style="background-color: #fdfded; box-shadow: 0px 3px #00000003"
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
      fixed
    >
      <b-navbar-nav
        href="#"
        class="d-flex align-items-center col-md-3 mb-2 mb-md-0"
      >
        <picture>
          <source
            type="image/webp"
            srcset="../assets/compressed/Logo_Emoti.webp"
          />
          <source type="image/png" srcset="../assets/Logo_Emoti.png" />
          <img src="../assets/Logo_Emoti.png" width="200" alt="" />
        </picture>
      </b-navbar-nav>

      <b-navbar-nav
        class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"
        :style="{ fontFamily: 'EAmbit SemiBold' }"
      >
        <b-nav-item
          class="ml-3 mr-3"
          @click="colorClick('Home')"
          @mouseover="colorHome = '#e87461'"
          @mouseleave="colorHome = '#bfbfbf'"
          ><router-link
            to="/home"
            class="d-flex flex-column align-items-center"
            :style="{
              color:
                colorAffect == 'Home' || colorAffect == 'LandingPage'
                  ? '#e87461'
                  : colorHome,
              'text-decoration': 'none',
            }"
            ><span class="material-icons-round" style="font-size: 30px"
              >home</span
            >Home</router-link
          ></b-nav-item
        >
        <b-nav-item
          class="ml-3 mr-3"
          id="navActivities"
          @click="colorClick('Activities')"
          @mouseover="colorActivities = '#e87461'"
          @mouseleave="colorActivities = '#bfbfbf'"
          ><router-link
            to="/activities"
            class="d-flex flex-column align-items-center"
            :style="{
              color: colorAffect == 'Activities' ? '#e87461' : colorActivities,
              'text-decoration': 'none',
            }"
            ><span class="material-icons-round" style="font-size: 30px"
              >videogame_asset</span
            >Atividades</router-link
          ></b-nav-item
        >
        <b-nav-item
          class="ml-3 mr-3"
          id="navProfile"
          @click="colorClick('Profile')"
          @mouseover="colorProfile = '#e87461'"
          @mouseleave="colorProfile = '#bfbfbf'"
          ><router-link
            to="/profile"
            class="d-flex flex-column align-items-center"
            :style="{
              color: colorAffect == 'Profile' ? '#e87461' : colorProfile,
              'text-decoration': 'none',
            }"
            ><span class="material-icons-round" style="font-size: 30px"
              >person</span
            >Perfil</router-link
          ></b-nav-item
        >
        <b-nav-item
          class="ml-3 mr-3"
          id="navActivitiesPersonalized"
          @click="colorClick('Activities P.')"
          @mouseover="colorActivitiesP = '#e87461'"
          @mouseleave="colorActivitiesP = '#bfbfbf'"
          ><router-link
            to="/myactivities"
            class="d-flex flex-column align-items-center"
            :style="{
              color:
                colorAffect == 'Activities P.' ? '#e87461' : colorActivitiesP,
              'text-decoration': 'none',
            }"
            v-if="
              $store.getters.getLoggedUser.type == 'Professor' ||
              $store.getters.getLoggedUser.type == 'Tutor'
            "
            ><span class="material-icons-round" style="font-size: 30px"
              >palette</span
            >Atividades P.</router-link
          ></b-nav-item
        >
        <b-nav-item
          class="ml-3 mr-3"
          id="navClass"
          @click="colorClick('Class')"
          @mouseover="colorTeams = '#e87461'"
          @mouseleave="colorTeams = '#bfbfbf'"
          ><router-link
            to="/class"
            class="d-flex flex-column align-items-center"
            :style="{
              color: colorAffect == 'Class' ? '#e87461' : colorTeams,
              'text-decoration': 'none',
            }"
            v-if="$store.getters.getLoggedUser.type == 'Professor'"
            ><span class="material-icons-round" style="font-size: 30px"
              >assignment</span
            >Turmas</router-link
          ></b-nav-item
        >
      </b-navbar-nav>

      <!--Right aligned nav items-->
      <b-navbar-nav
        class="col-md-3 md-0 pd-0 d-flex flex-row justify-content-end"
      >
        <b-nav-item-dropdown right :style="{ fontFamily: 'EAmbit SemiBold' }">
          <!--Using 'button-content' slot-->
          <template #button-content>
            <b-avatar
              v-if="$store.getters.getUser.imgProfile == ''"
              style="background-color: #bfbfbf; color: #fdfded"
            ></b-avatar>
            <img
              v-else
              :src="$store.getters.getUser.imgProfile"
              :style="{
                width: '50px',
                height: '50px',
                'border-radius': '100%',
              }"
              alt=""
            />
          </template>
          <b-dropdown-item-button
            variant="secondary"
            v-if="$store.getters.getLoggedUser.type == 'Administrador'"
            @click="colorClick('')"
          >
            <router-link
              to="/manageruser"
              id="manageUser"
              :style="{ color: '#2B4141', 'text-decoration': 'none' }"
              ><b-icon icon="person-lines-fill" aria-hidden="true"></b-icon>
              Gerir Utilizadores</router-link
            >
          </b-dropdown-item-button>
          <b-dropdown-item-button
            variant="secondary"
            v-if="$store.getters.getLoggedUser.type == 'Administrador'"
            @click="colorClick('')"
          >
            <router-link
              to="/manageractivities"
              id="manageActivities"
              :style="{ color: '#2B4141', 'text-decoration': 'none' }"
              ><b-icon icon="brush-fill" aria-hidden="true"></b-icon> Gerir
              Atividades</router-link
            >
          </b-dropdown-item-button>
          <b-dropdown-item-button
            variant="secondary"
            v-if="$store.getters.getLoggedUser.type == 'Administrador'"
            @click="colorClick('')"
          >
            <router-link
              to="/managerbadges"
              id="manageBadges"
              :style="{ color: '#2B4141', 'text-decoration': 'none' }"
              ><b-icon icon="award-fill" aria-hidden="true"></b-icon> Gerir
              Badges</router-link
            >
          </b-dropdown-item-button>
          <b-dropdown-divider
            v-if="$store.getters.getLoggedUser.type == 'Administrador'"
          ></b-dropdown-divider>
          <b-dropdown-item
            href="#"
            id="endSession"
            size="sm"
            class="mb-2"
            variant="danger"
            @click="logout()"
            ><b-icon icon="door-closed-fill" aria-hidden="true"></b-icon>
            Terminar Sessão</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorHome: "#bfbfbf",
      colorActivities: "#bfbfbf",
      colorProfile: "#bfbfbf",
      colorActivitiesP: "#bfbfbf",
      colorTeams: "#bfbfbf",
      colorAffect: this.$route.name,
    };
  },
  methods: {
    colorClick(page) {
      this.colorAffect = page;
    },
    logout() {
      this.$store.commit("SET_LOGOUT");
      this.colorAffect = "Home";
    },
  },
  created() {
    this.colorAffect = this.$route.name;
  },
};
</script>

<style></style>
