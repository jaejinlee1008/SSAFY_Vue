<script setup>

import { RouterView } from 'vue-router';
import TripForMeHeader from './components/TripForMeHeader.vue';

</script>

<template>
  <v-layout class="rounded rounded-md">
    <TripForMeHeader></TripForMeHeader>
    <RouterView></RouterView>
  </v-layout>
</template>

<style scoped></style>

<style>
@font-face {
  font-family: 'PyeongChangPeace-Bold';
  src: url('/assets/fonts/PyeongChangPeace-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'Maplestory-Light';
  src: url('/assets/fonts/Maplestory-Light.ttf') format('truetype');
}

@font-face {
  font-family: 'Maplestory-Bold';
  src: url('/assets/fonts/Maplestory-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'TAEBAEK-milkyway';
  src: url('/assets/fonts/TAEBAEK-milkyway.ttf') format('truetype');
}

@font-face {
  font-family: 'NPSfont_bold';
  src: url('/assets/fonts/NPSfont_bold.ttf') format('truetype');
}

@font-face {
  font-family: 'WandohopeR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/WandohopeR.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'JalnanGothic';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>
