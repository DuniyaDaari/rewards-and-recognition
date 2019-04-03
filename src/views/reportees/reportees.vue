<template>
  <!-- <div class="accordion" id="accordionExample">
    <div class="card" v-for="reportee in reportees" :key="reportee.pid">
      <div class="card-header" :id="`headingOne${reportee.pid}`">
        <h2 class="mb-0">
          <button
            class="btn btn-link"
            type="button"
            data-toggle="collapse"
            :data-target="`#collapse${reportee.pid}`"
            aria-expanded="true"
            aria-controls="collapseOne"
          >{{reportee.pid}}----{{reportee.name}}</button>
        </h2>
      </div>
      <recursive-accordian />
    </div>
  </div> -->
  <div v-if="reportees.length > 0">
      <recursive-accordion-component :data="reportees"></recursive-accordion-component>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REPORTEES_SERVICE } from '../../services/api/reportees/reportees'
import { RrCommonState } from '../../store'

import RecursiveAccordionComponent from '../../components/recursive-accordion'

@Component({
  components: {
    RecursiveAccordionComponent
  }
})
export default class ReporteesView extends Vue {
    @LazyInject(REPORTEES_SERVICE) reporteesService

    @RrCommonState userDetails

    reportees = []

    async created () {
      this.reportees = await this.reporteesService.fetchReportees(this.pid)
      console.log(this.reportees)
    }

    get pid () {
      return this.userDetails.pid
    }
}
</script>
