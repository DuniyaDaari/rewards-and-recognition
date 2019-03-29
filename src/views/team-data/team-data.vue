<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email id</th>
          <th scope="col">Date of Joining</th>
          <th scope="col">Eligible Rewards</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in teamData.employees" :key="employee.id">
          <th scope="row">{{employee.pid}}</th>
          <td>{{employee.firstName}} {{employee.middleName}} {{employee.lastName}}</td>
          <td>{{employee.email}}</td>
          <td>{{employee.dateOfJoining}}</td>
          <td>
            <span
              v-for="reward in employee.rewards"
              :key="reward.id"
              data-toggle="modal"
              data-target="#rewardModal"
            >
              <button
                type="button"
                class="btn btn-primary rewardButton"
                data-toggle="tooltip"
                data-placement="top"
                :title="reward.rewardName"
                :disabled="!reward.eligible"
              >{{reward.rewardName.substring(0, 1)}}</button>
              <div
                class="modal fade"
                id="rewardModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">...</div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'
import { TEAM_DATA_SERVICE } from '../../services/api/team-table-api/teamData'
import { RrCommonState } from '../../store'

@Component()
export default class TeamDataView extends Vue {
  @LazyInject(USER_DETAILS_SERVICE) userDetailsService;
  @LazyInject(TEAM_DATA_SERVICE) teamDataService;
  @RrCommonState appImages;
  rewardDetails = [];
  pid = '';
  teamData = [];
  teamId = '';
  async created () {
    this.pid = this.$router.currentRoute.params.pid
    this.userDetailsService.isUserAuthorized('teams')
    this.teamData = await this.teamDataService.fetchTeamsDetails(
      this.pid,
      this.teamId
    )
    this.patonback = this.appImages.patonback
    this.ycmd = this.appImages.ycmd
  }
}
</script>

<style>
</style>
