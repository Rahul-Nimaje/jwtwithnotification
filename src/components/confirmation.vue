<template>
  <div>
    <navbar />
    <div v-if="isverified">
      <v-card>
        <h3>Accout Verified Successfully</h3>
        <v-btn @click="$router.push('/')">Please Login</v-btn>
      </v-card>
    </div>
    <div v-else>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
    </div>
  </div>
</template>
<script>
import navbar from "../views/navigationBar.vue";
import user from "../services/userservice";
export default {
  components: { navbar },
  data() {
    return {
      isverified: false,
    };
  },
  mounted() {
    // console.log("enter - in ap", this.$route.query.email);
    // this.params = this.$route.query.email;
  },
  beforeMount() {
    console.log("enter - in ap", this.$route.query);
    this.params = this.$route.query.email;
    user
      .get("/api/auth/confirm?email" + "=" + this.$route.query.email)
      .then((response) => {
        console.log("respnse", response);
        if (response.data && response.data.isVerified == true) {
          this.isverified = true;
        }
      });
  },
};
</script>
