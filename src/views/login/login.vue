<template>
    <div>
        <!-- <button @click="login">Sign in with Okta.</button> -->
    </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { RrCommonAction, RrCommonState, RrCommonMutation } from '../../store'

@Component()
export default class LoginView extends Vue {
  @RrCommonAction getUserDetails
  @RrCommonState userDetails
  @RrCommonMutation setUserEmail

  async mounted () {
    let isAuthenticated = await this.$auth.isAuthenticated()

    if (isAuthenticated) {
      let user = await this.$auth.getUser()
      console.log(user)
      let email = user.email
      this.setUserEmail(email)
      await this.getUserDetails()
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
