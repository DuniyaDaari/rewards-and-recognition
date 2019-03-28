<template>
     <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img :src="imagePath" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ cardHeading }}</h3>
              <div>{{ cardText }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <router-link :to="buttonRoute"><v-btn flat color="orange">Know more</v-btn></router-link>
            <!-- <v-btn flat color="orange">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>
<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component()
export default class RrCard extends Vue {
    @Prop({ type: String }) imagePath
    @Prop({ type: String }) cardHeading;
    @Prop({ type: String }) cardText;
    @Prop({ type: Object }) buttonRoute;
}
</script>
