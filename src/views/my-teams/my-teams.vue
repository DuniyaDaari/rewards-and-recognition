<template>
  <div>
    <div v-for="team in teamsDetails" :key="team.teamid">
    <div class="card teamCardMargin">
      <div class="card-header teamCardHeaderColor">{{team.name}}</div>
      <div class="card-body">
        <h6 class="card-title">{{team.lineManager.firstName}} {{team.lineManager.middleName}} {{team.lineManager.lastName}} </h6>
        <p class="card-text">
            Created by: {{team.lineManager.createdBy}} on {{team.lineManager.createdDate}} <br>
            {{team.lineManager.email}}
        </p>
            <router-link :to="{ name:'teamDetails', params: { pid, teamId:team.id } }" class="card-link">Details</router-link>

      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'
import { TEAMS_DETAILS_SERVICE } from '../../services/api/teams-api/teamsDetails'

@Component()
export default class MyTeamsView extends Vue {
  @LazyInject(USER_DETAILS_SERVICE) userDetailsService;
  @LazyInject(TEAMS_DETAILS_SERVICE) teamsDetailsService;

  rewardDetails = [];
pid = '';
teamsDetails = [];
async created () {
  this.pid = this.$router.currentRoute.params.pid
  this.userDetailsService.isUserAuthorized('teams')
  this.teamsDetails = await this.teamsDetailsService.fetchTeamsDetails(this.pid)
}
}
</script>

<style>
    .teamCardMargin{
        margin: 30px;
    }
    .teamCardHeaderColor {
        background: #f0f4fe;
        color: #1f2c6d;
    }
</style>
