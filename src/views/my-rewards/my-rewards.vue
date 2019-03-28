<template>
    <div>
        Welcome to My Rewards page!!
    </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'

@Component()
export default class MyRewardsView extends Vue {
    @LazyInject(USER_DETAILS_SERVICE) userDetailsService

    created () {
      this.userDetailsService.isUserAuthorized('rewards')
    }
}
</script>
