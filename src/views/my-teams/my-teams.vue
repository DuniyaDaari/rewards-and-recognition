<template>
    <div>
        Welcome to My Teams page!!
    </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'
import { RrCommonState } from '../../store'

@Component()
export default class MyTeamsView extends Vue {
    @LazyInject(USER_DETAILS_SERVICE) userDetailsService
    @RrCommonState userDetails

    async created () {
      let isUserAuthorized = await this.userDetailsService.isUserAuthorized('teams')
      console.log(isUserAuthorized)
      if (!isUserAuthorized) {
        console.log('user is not authorized!!')
        this.$router.push({ name: 'home', params: { pid: this.userDetails.pid } })
      }
    }
}
</script>
