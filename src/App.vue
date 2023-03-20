<template>
  <main>
    <div class="elevator"><div class="elevator-cabine"></div></div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in flours" :key="flour">
          <button>{{ flour }}</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const flours = ref([1, 2, 3, 4, 5]);
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
