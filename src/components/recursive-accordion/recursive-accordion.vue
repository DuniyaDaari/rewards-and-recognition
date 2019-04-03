<template>
  <div v-if="renderComponent">
    <ul class="accordion" id="accordionExample">
      <li class="card" v-for="reportee in reportees" :key="reportee.pid">
        <div class="card-header" :id="`headingOne${reportee.pid}`">
            <a
              href="#"
              data-toggle="collapse"
              @click.prevent="!reportee.reporteesList && getReportees(reportee)"
              :data-target="`#collapse${reportee.pid}`"
              aria-expanded="true"
              aria-controls="collapseOne"
              v-if="reportee.hasReportees"
            >{{reportee.pid}}----{{reportee.name}}</a>
            <span v-else>{{reportee.pid}}----{{reportee.name}}</span>
        </div>
        <recursive-accordion :id="`collapse${reportee.pid}`"
        class="collapse"
        v-if="reportee.reporteesList" :data="reportee.reporteesList"/>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REPORTEES_SERVICE } from '../../services/api/reportees/reportees'

import RecursiveAccordionComponent from './index'

@Component({
  components: {
    RecursiveAccordionComponent
  }
})
export default class RecursiveAccordion extends Vue {
  @Prop({ type: Array }) data
  @LazyInject(REPORTEES_SERVICE) reporteesService
  renderComponent = false
  collapsePanel = []

  created () {
    console.log(this.data)
    this.renderComponent = true
  }

  togglePanel (pid) {
    this.collapsePanel[pid] = !this.collapsePanel[pid]
  }

  async getReportees (reportee) {
    this.togglePanel(reportee.pid)
    this.renderComponent = false
    reportee.reporteesList = await this.reporteesService.fetchReportees(reportee.pid)
    await Vue.nextTick()
    this.renderComponent = true
  }

  get reportees () {
    return this.data
  }
}
</script>
