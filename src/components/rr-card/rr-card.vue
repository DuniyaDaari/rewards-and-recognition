<template>
    <div class="col-sm-3">
      <div class="mr-2 mb-2">
        <div class="card">
          <img class="card-img-top" :src="imagePath" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{cardHeading}}</h5>
            <p class="card-text">{{cardText}}</p>
            <router-link :to="buttonRoute">Get Started -></router-link>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component()
export default class RrCard extends Vue {
  @Prop({ type: String }) imagePath;
  @Prop({ type: String }) cardHeading;
  @Prop({ type: String }) cardText;
  @Prop({ type: Object }) buttonRoute;
}
</script>
