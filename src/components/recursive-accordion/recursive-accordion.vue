<template>
  <div v-if="renderComponent">
    <div v-show="showSuccessMessage " class="success my-4">Successfully given <b>{{modalData.reward.rewardName}}</b> reward to <b>{{modalData.employee.firstName}} {{modalData.employee.middleName}} {{modalData.employee.lastName}}</b> </div>
    <div v-show="showErrorMessage " class="error my-4">There has been an error while giving reward to <b>{{modalData.employee.firstName}} {{modalData.employee.middleName}} {{modalData.employee.lastName}}</b>. Please try again later</div>
    <ul class="accordion">
      <li class="card" v-for="reportee in reportees" :key="reportee.pid">
        <div class="card-header">
          <a
            href="#"
            @click.prevent="togglePanel(reportee.pid) && !reportee.reporteesList && getReportees(reportee)"
            aria-expanded="true"
            aria-controls="collapseOne"
            v-if="reportee.hasReportees"
          >
            <i class="fas" :class="isPanelOpen[reportee.pid] ? 'fa-minus' : 'fa-plus'">&nbsp;&nbsp;</i>
            {{reportee.firstName}} {{reportee.middleName}} {{reportee.lastName}}
          </a>
          <span v-else>
            <i class="fas fa-angle-right"></i>
            &nbsp;&nbsp;{{reportee.firstName}} {{reportee.middleName}} {{reportee.lastName}}
          </span>
          <!--  Reward buttons start -->
          <span
              v-for="reward in reportee.rewards"
              :key="reward.id"
              data-toggle="tooltip"
              class="float-right"
            >
              <button
                type="button"
                class="btn btn-primary reporteesRewardButton"
                data-toggle="modal"
                @click="modalData.reward = reward; modalData.employee = reportee; showSuccessMessage = false; showErrorMessage = false;"
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
            <!-- Reward buttons end -->
            <span class="float-right pr-4">
              <b>{{reportee.designation}}</b>
            </span>
        </div>
        <recursive-accordion
          :id="`collapse${reportee.pid}`"
          :class="isPanelOpen[reportee.pid] ? 'collapse show' : 'collapse'"
          v-if="reportee.reporteesList"
          :data="reportee.reporteesList"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REPORTEES_SERVICE } from '../../services/api/reportees/reportees'
import { TEAM_DATA_SERVICE } from '../../services/api/team-table-api/teamData'
import { RrCommonState } from '../../store'

import RecursiveAccordionComponent from './index'

@Component({
  components: {
    RecursiveAccordionComponent
  }
})
export default class RecursiveAccordion extends Vue {
  @Prop({ type: Array }) data
  @LazyInject(REPORTEES_SERVICE) reporteesService
  @LazyInject(TEAM_DATA_SERVICE) teamDataService;
  @RrCommonState userDetails;

  renderComponent = false
  isPanelOpen = []
  modalData = {
    reward: {},
    employee: {}
  };
  showSuccessMessage = false
  showErrorMessage = false

  created () {
    this.renderComponent = true
  }

  async reRenderComponent () {
    this.showSuccessMessage = false
    this.showErrorMessage = false
    this.renderComponent = false
    await Vue.nextTick()
    this.renderComponent = true
  }

  async togglePanel (pid) {
    this.isPanelOpen[pid] = !this.isPanelOpen[pid]
    await this.reRenderComponent()
    return true
  }

  async getReportees (reportee) {
    reportee.reporteesList = await this.reporteesService.fetchReportees(reportee.pid)
    await this.reRenderComponent()
  }

  get reportees () {
    return this.data
  }

  async nominateReward () {
    this.message = await this.teamDataService.assignRewardToEmployee(this.modalData.employee.pid, this.modalData.reward.id, this.teamId, this.pid, this.modalData.reward.comments)
    this.showSuccessMessage = this.message.statusCode === 201
    this.showErrorMessage = !this.showSuccessMessage
    if (this.showSuccessMessage) {
      this.modalData.employee.rewards.forEach((reward) => {
        if (reward.id === this.modalData.reward.id) {
          reward.eligible = false
        }
      })
    }
  }

  get pid () {
    return this.userDetails.pid
  }
}
</script>
