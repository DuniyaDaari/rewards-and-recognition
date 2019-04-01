<template>
    <div>
        <!-- <button @click="login">Sign in with Okta.</button> -->
    </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { RrCommonAction, RrCommonState } from '../../store'

@Component()
export default class LoginView extends Vue {
  @RrCommonAction getUserDetails
  @RrCommonState userDetails

  async mounted () {
    let isAuthenticated = await this.$auth.isAuthenticated()

    if (isAuthenticated) {
      let user = await this.$auth.getUser()
      let email = user.email
      await this.getUserDetails(email)
      this.$router.push({ name: 'home', params: { pid: this.userDetails.pid } })
    } else {
      this.$auth.loginRedirect('/')
    }
  }

//   login () {
//     this.$auth.loginRedirect('/1234')
//   }
}
</script>
