<template>
  <div v-if="Object.keys(teamData).length > 0">
    <h1>{{teamData.name}}</h1>
    <h6>Line manager: {{teamData.lineManager.firstName}} {{teamData.lineManager.middleName}} {{teamData.lineManager.lastName}}</h6>
    <br/>
    <table class="table table-striped table-bordered table-hover table-responsive-xl">
      <thead>
        <tr class="table-primary">
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email id</th>
          <th scope="col">Designation</th>
          <th scope="col">Date of Joining</th>
          <th scope="col">Eligible Rewards</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in teamData.employees" :key="employee.id">
          <th scope="row">{{employee.pid}}</th>
          <td>{{employee.firstName}} {{employee.middleName}} {{employee.lastName}}</td>
          <td>{{employee.email}}</td>
          <td>{{employee.designation}}</td>
          <td>{{employee.dateOfJoining}}</td>
          <td>
            <span
              v-for="reward in employee.rewards"
              :key="reward.id"
              data-toggle="tooltip"
            >
              <button
                type="button"
                class="btn btn-primary rewardButton"
                data-toggle="modal"
                @click="modalData.reward = reward; modalData.employee = employee;"
                data-target="#rewardModal"
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
                      <h5 class="modal-title" id="exampleModalLongTitle">{{modalData.reward.rewardName}} Award</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-header">
                      <h6 class="modal-title">On submit, {{modalData.reward.rewardPoints}} reward points will be given to {{modalData.employee.firstName}} {{modalData.employee.middleName}} {{modalData.employee.lastName}}</h6>
                    </div>
                    <div class="modal-body">
                        <label for="comment">Please mention a reason for giving this award:</label>
                        <textarea class="form-control" rows="5" id="comment" v-model="modalData.reward.comments"></textarea>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" @click="nominateReward()" :disabled="!modalData.reward.comments || modalData.reward.comments.trim() == ''">Submit</button>
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
  @RrCommonState userDetails;

  rewardDetails = [];
  pid = '';
  teamData = [];
  teamId = '';
  showModal = false;
  message ='';
  modalData = {
    reward: {},
    employee: {}
  };

  async created () {
    this.teamId = this.$router.currentRoute.params.teamId
    this.teamData = await this.teamDataService.fetchTeamsDetails(this.teamId)
  }

  async nominateReward () {
    this.message = await this.teamDataService.assignRewardToEmployee(this.modalData.employee.pid, this.modalData.reward.id, this.teamId, this.pid, this.modalData.reward.comments)
  }
  get pid () {
    return this.userDetails.pid
  }
}
</script>
