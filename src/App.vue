<template>
  <main>
    <div class="elevator">
      <div
        class="elevator-cabine"
        :style="[elevatorStore.moveElevator, elevatorStore.smoothElevate]"
      >
        <div class="elevator-cabine-table">
          <div class="elevator-cabine-table-text"></div>
          {{ elevatorStore.elevationPath }} {{ elevatorStore.currentFlour }}
        </div>
      </div>
    </div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in elevatorStore.flours" :key="flour">
          <button
            class="flour-btn"
            :class="{
              'flour-waiting': elevatorStore.currentFlour == flour,
            }"
            @click="
              elevatorStore.currentFlour = flour;
              elevatorStore.addToQueue(flour);
            "
          >
            {{ flour }}
          </button>
          {{ elevatorStore.floursQueue }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";

const elevatorStore = useElevatorStore();

onMounted(() => {
  const flourData = localStorage.getItem("currentFlour");
  if (flourData) {
    elevatorStore.currentFlour = JSON.parse(flourData);
  }
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
