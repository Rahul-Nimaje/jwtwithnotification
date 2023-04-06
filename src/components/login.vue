<template>
  <v-row justify="center" align="center">
    <v-col cols="14" xs="14" md="4">
      <v-container class="pa-2">
        <v-card class="elevation-6">
          <v-toolbar dark color="primary">
            <v-toolbar-title class="font-weight-bold">Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <p>{{ text }}</p>
          </v-card-text>

          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-text-field
              class="pa-1"
              outlined
              name="login"
              label="Email"
              v-model="email"
              :rules="loginEmailRules"
              type="text"
            ></v-text-field>

            <v-text-field
              outlined
              class="pa-1"
              v-model="password"
              :rules="[rules.required, rules.min]"
              name="password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-form>

          <v-card-actions class="pa-2">
            <v-spacer></v-spacer>
            <v-btn block :disabled="!valid" @click="login" color="primary"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
        <!-- <v-btn @click="facebook"  class="ml-10 mt-5" fab>
                        <v-icon  color="blue" >facebook</v-icon>
                        </v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-5 ml-10"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Registrartion
            </v-btn>
          </template>
          <v-form ref="valid">
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="firstname"
                        :rules="[rules.required]"
                        label="First Name*"
                        required
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="lastName"
                        :rules="[rules.required]"
                        label="last Name*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registeremail"
                        :rules="loginEmailRules"
                        label="Email*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerpassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        required
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        required
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                      <v-col cols="12">
                      <v-text-field
                        block
                        v-model="mobileNumber"
                        type="number"
                        min-length="10"
                        :rules="mobileRules"
                        max-length="10"
                        name="input-10"
                        label="Mobile Number"
                        counter
                        required
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12">
                      <v-combobox
                        block
                        v-model="department"
                        :items="Departments"
                         item-text="departmentname"
                        label="Departments"
                        required
                      ></v-combobox>
                    </v-col>
                     <v-col cols="12">
                      <v-combobox
                        block
                        v-model="usertype"
                        :items="userType"
                        label="Departments"
                        required
                      ></v-combobox>
                    </v-col>
                     <v-col cols="12">
                      <v-combobox
                        block
                        v-model="uerStatus"
                        :items="status"                        
                        label="Departments"
                        required
                      ></v-combobox>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import user from "../services/userservice";
export default {
  data() {
    return {
      show1: false,
      dialog: false,
      text: null,
      email: null,
      invalidemail: null,
      password: null,
      firstname: null,
      lastName:null,
      registeremail: null,
      registerpassword: null,
      mobileNumber: null,
      Departments: [],
      userType: ['user', 'admin', 'manager'],
      status:['Active','Deactive'],
      department: null,
      uerStatus: 'Active',
      usertype:'admin',
      verify: null,
      valid: null,
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) =>
          /.+@.+\..+/.test(v) || "E-mail must be valid" || this.invalidemail,
      ],
      mobileRules: [
        (v) => !!v || "Required",
        (v)=>v.length==10||"Mobile must be at least 10"
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () =>
        this.registerpassword === this.verify || "Password must match";
    },
  },
  mounted() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      let postoption = {
      status:"Active"
    }
      await user.post("/admin/getdepartment",postoption).then((response) => {
        console.log("getDepartment", response)
        if (response.data.length > 0) {
          this.Departments = response.data
          console.log("Departments",this.Departments)
        }
      })
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        await user
          .post("/login/signin", {
            username: this.firstname,
            email: this.email,
            password: this.password,
          })
          .then((Response) => {
            console.log("Responselogin", Response.data);
            let data = Response.data;
            this.$store.commit("User", data);
            this.$router.push("/user");
          });

        // console.log(this.email, this.password);
      }
    },

    async submit() {
      if (this.$refs.valid.validate()) {
        console.log("Submit",this.department)
        await user
          .post("/admin/signup", {
            email: this.registeremail,
            firstName: this.firstname,
            lastName:this.lastName,
            password: this.registerpassword,
            status: "Active",
            department: this.department._id,
            mobileNumber:this.mobileNumber
            
          })
          .then((Response) => {
            console.log(Response.data);
            this.dialog = false;
            this.registeremail = null;
            this.firstname = null;
            this.registerpassword = null;
            this.verify = null;
          });
        console.log(this.registeremail, this.firstname, this.registerpassword);
        // this.dialog = false;
      }
    },
  },
};
</script>
