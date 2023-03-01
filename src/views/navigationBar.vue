<template>
  <v-app-bar app color="black" dark>
    <h2>We Commerce</h2>
    <v-row justify="end">
      <v-col cols="2">
        <v-btn @click="logout">Log Out</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
<script>
import login from "../components/login.vue";
export default {
  components: { login },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser", "");
      this.$router.push("/");
    },
  },
};
</script>
