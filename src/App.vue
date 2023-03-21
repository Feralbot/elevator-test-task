<template>
  <main>
    <div class="elevator">
      <div
        class="elevator-cabine"
        :style="[elevatorStore.moveElevator, elevatorStore.smoothElevate]"
      >
        <div class="elevator-cabine-table">
          <div class="elevator-cabine-table-text"></div>
          {{ elevationPath }} {{ elevatorStore.currentFlour }}
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
            @click="elevatorStore.currentFlour = flour"
          >
            {{ flour }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";

const elevatorStore = useElevatorStore();

onMounted(() => {
  const flourData = localStorage.getItem("currentFlour");
  if (flourData) {
    elevatorStore.currentFlour = JSON.parse(flourData);
  }
});

watch(elevatorStore.currentFlour, (newFlour) => {
  localStorage.setItem("currentFlour", JSON.stringify(newFlour));
  // elevateInProgress.value = true;
  // if (newFlour != oldFlour) {
  //   flourQueue.value.push({
  //     newFlour: newFlour,
  //     oldFlour: oldFlour,
  //     status: "inQueue",
  //   });
  // }
  // flourQueue.value.forEach(async (elevateOrder) => {
  //   if (elevateOrder.status != "done") {
  //     moveElevator(newFlour, oldFlour);
  //     elevateOrder.status = "done";
  //   }
  // });
  elevatorStore.moveElevator;
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
