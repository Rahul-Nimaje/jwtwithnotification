<template>
  <div>
    <navbar />

    <v-container>
      <v-btn class="primary" @click="Download">Download User</v-btn>
      <v-card class="black loghten-3 mt-5">
        <v-row>
          <v-col cols="4">
            <span class="ma-5 font-weight-bold white--text">Id</span>
          </v-col>
          <v-col cols="4">
            <span class="ma-5 font-weight-bold white--text">User Name</span>
          </v-col>
          <v-col cols="4">
            <span class="ma-5 font-weight-bold white--text">Email</span>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mt-5" v-for="user in userData" :key="user.id">
        <v-card class="mt-2 grey lighten-3">
          <v-row>
            <v-col cols="4">
              <span>{{ user._id }}</span>
            </v-col>
            <v-col cols="4">
              <span>{{ user.username }}</span>
            </v-col>
            <v-col cols="4">
              <span>{{ user.email }}</span>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import user from "../services/userservice";
import { json2excel } from "js2excel";
import navbar from "../views/navigationBar.vue";
export default {
  components: { navbar },
  data() {
    return {
      userData: [],
    };
  },
  mounted() {
    console.log("mounted");
    this.getuser();
  },
  methods: {
    Download() {
      let data = this.userData;
      json2excel({
        data,
        name: "user-info-data",
        formateDate: "yyyy/mm/dd",
      });
    },
    async getuser() {
      let data = {};
      console.log("this.$store.state.User.token", this.$store.state.User.token);
      let token = this.$store.state.User.token;
      data["headers"] = {
        Authorization: token,
      };
      await user.get("/api/test/user", data).then((response) => {
        console.log("response", response);
        this.userData = response.data;
      });
    },
  },
};
</script>
