<template>
  <div>
    <h1 class="display-4 mb-4">My Reportees</h1>
    <div v-if="!isEmpty">
        <recursive-accordion-component :data="reportees"></recursive-accordion-component>
    </div>
    <div class="no-record-found" v-if="isEmpty">
      <img :src="nrfImg"/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REPORTEES_SERVICE } from '../../services/api/reportees/reportees'
import { RrCommonState } from '../../store'
import _ from 'lodash'
import RecursiveAccordionComponent from '../../components/recursive-accordion'

@Component({
  components: {
    RecursiveAccordionComponent
  }
})
export default class ReporteesView extends Vue {
    @LazyInject(REPORTEES_SERVICE) reporteesService
    @RrCommonState appImages;
    @RrCommonState userDetails

    reportees = []
    nrfImg = '';
    isEmpty = false;

    async created () {
      this.reportees = await this.reporteesService.fetchReportees(this.pid)
      this.nrfImg = this.appImages.nrf
      this.isEmpty = _.isEmpty(this.reportees)
      console.log(this.reportees)
    }

    get pid () {
      return this.userDetails.pid
    }
}
</script>
