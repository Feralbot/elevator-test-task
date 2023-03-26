<template>
  <main>
    <elevatorComponent />
    <floorComponent />
    <commandPanel />
  </main>
</template>

<script setup>
import floorComponent from "./components/floor.vue";
import elevatorComponent from "./components/elevator.vue";
import commandPanel from "./components/commandPanel.vue";


</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
