import Vue from "vue";
import Vuex from "vuex";

import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: localStorage.loggedUser
      ? JSON.parse(localStorage.loggedUser)
      : {},

    user: {},

    childInfo: "",

    users: [],

    classes: [],

    searchKid: {},

    requests: [],

    classesKid: [],

    students: [],

    emotions: [],

    badges: [],

    activities: [],

    history: [],
  },

  getters: {
    //new
    getLoggedUser: (state) => state.loggedUser,

    getUser: (state) => state.user,

    getChildInfo: (state) => state.childInfo,

    getUsers: (state) => state.users,

    getTeacherClasses: (state) => state.classes,

    getSearchkid: (state) => state.searchKid,

    getRequests: (state) => state.requests,

    getClassesKid: (state) => state.classesKid,

    getStudents: (state) => state.students,

    getEmotions: (state) => state.emotions,

    getBagdes: (state) => state.badges,

    getActivities: (state) => state.activities,

    getActivitiesP: (state) => (variable) =>
      state.activities.filter((activity) => activity.author == variable),

    getHistory: (state) => state.history,
  },
  actions: {
    async login_ap(context, data) {
      const response = await fetch(
        "http://emotiapi.herokuapp.com/api/users/login",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        context.commit("SET_TOKEN", await response.json());
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async register_ap(context, data) {
      const response = await fetch("http://emotiapi.herokuapp.com/api/users", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data),
      });
      if (!response.status == 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async find_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/${data}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_USER_INFO", await response.json());
      }
    },

    async updateUser_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/${data[0]}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[1]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async createRelation_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/${this.state.loggedUser.username}/children`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PUT",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findRelations_ap(context) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/${this.state.loggedUser.username}/children`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_USERNAME_CHILD", await response.json());
      }
    },

    async removeRelation_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/${this.state.loggedUser.username}/children`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findAllUsers_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users` + data,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_USERS", await response.json());
      }
    },

    async createAdmin_ap(context, data) {
      const response = await fetch(
        "http://emotiapi.herokuapp.com/api/users/addAdmin",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.loggedUser.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        }
      );
      if (!response.status == 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async removeUser_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/${data.username}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findAllClasses_ap(context) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_CLASSES", await response.json());
      }
    },

    async createClass_ap(context, data) {
      const response = await fetch(
        "http://emotiapi.herokuapp.com/api/classes",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.loggedUser.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        }
      );
      if (!response.status == 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findChildClasses_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/requests?usernameChild=${data}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        context.commit("SET_SEARCH_KID", await response.json());
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async createRequest_ap(context, data) {
      const response = await fetch(
        "http://emotiapi.herokuapp.com/api/classes/requests",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.loggedUser.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        }
      );
      if (!response.status == 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async removeClass_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/${data}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async alterStudent_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/${data[0]}/children/${data[1]}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PUT",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[2]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async removeStudent_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/${data[0]}/children/${data[1]}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[2]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findRequests_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/requests/${data}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_REQUESTS", await response.json());
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async acceptRequest_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/requests/${data[0]}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PUT",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[1]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async deleteRequest_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/requests/${data[0]}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[1]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findClasses_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/children/${data}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_CLASSES_KID", await response.json());
      }
    },

    async findAllStudents_ap(context) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/classes/children`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        context.commit("SET_STUDENTS", await response.json());
      }
    },

    async findAllEmotions_ap(context) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/emotions`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        context.commit("SET_EMOTIONS", await response.json());
      }
    },

    async createEmotion_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/emotions`,
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.loggedUser.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        }
      );
      if (response.status != 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async deleteEmotion_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/emotions/${data}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async findBadges_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/badges${data}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_BADGES", await response.json());
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async createBadge_ap(context, data) {
      const response = await fetch(`http://emotiapi.herokuapp.com/api/badges`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.loggedUser.token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data),
      });
      if (response.status != 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },
    async deleteBadge_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/badges/${data}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },
    async findAtivities_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/activities${data}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_ACTIVITIES", await response.json());
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async createActivity_ap(context, data) {
      const response = await fetch(
        "http://emotiapi.herokuapp.com/api/activities",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.loggedUser.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        }
      );
      if (response.status != 201) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async deleteActivity_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/activities/${data}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async editActivity_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/activities/${data[0]}`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[1]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },
    async getHistory_ap(context) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/history`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + this.state.loggedUser.token },
        }
      );
      if (response.ok) {
        context.commit("SET_HISTORY", await response.json());
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async addHistory_ap(context, data) {
      const response = await fetch(
        "http://emotiapi.herokuapp.com/api/users/history",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.loggedUser.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data),
        }
      );
      if (response.status != 200) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async setSuggest_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/activities/${data[0]}/children`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[1]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async giveToKidPersonalActi_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/activities/${data[0]}/children`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "POST",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data[1]),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },

    async setBadgeToKid_ap(context, data) {
      const response = await fetch(
        `http://emotiapi.herokuapp.com/api/users/badges`,
        {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + this.state.loggedUser.token,
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }
    },
  },

  mutations: {
    //new
    SET_TOKEN(state, variable) {
      state.user = {};
      state.loggedUser.token = variable.authKey;
      state.loggedUser.type = variable.typeUser;
      state.loggedUser.username = variable.username;
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },

    SET_USER_INFO(state, variable) {
      state.user = variable.user;
    },

    SET_LOGOUT(state) {
      state.loggedUser = {};
      state.user = {};
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
      router.push({ name: "LandingPage" });
    },

    SET_USERNAME_CHILD(state, variable) {
      if (variable.children.length != 0) {
        state.childInfo = variable.children[0];
      }
    },

    SET_USERS(state, variable) {
      state.users = variable.users;
    },

    SET_CLASSES(state, variable) {
      state.classes = variable.classes;
    },

    SET_SEARCH_KID(state, variable) {
      state.searchKid = variable.child;
    },

    SET_REQUESTS(state, variable) {
      state.requests = variable.requests;
    },

    SET_CLASSES_KID(state, variable) {
      state.classesKid = variable.class;
    },

    SET_STUDENTS(state, variable) {
      state.students = variable.list;
    },

    SET_EMOTIONS(state, variable) {
      state.emotions = variable.emotions;
    },

    SET_BADGES(state, variable) {
      state.badges = variable.badges;
    },

    SET_ACTIVITIES(state, variable) {
      state.activities = variable.activities;
    },

    SET_HISTORY(state, variable) {
      state.history = variable.history;
    },
  },

  modules: {},
});
