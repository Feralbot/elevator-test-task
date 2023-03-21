<template>
  <main>
    <div class="elevator">
      <div
        class="elevator-cabine"
        :class="{ blink: elevatorStore.elevatorStatus == 'arrived' }"
        ref="elevatorCabine"
        :style="[elevatorStore.moveElevator, elevatorStore.smoothElevate]"
      >
        <div class="elevator-cabine-table">
          <div class="elevator-cabine-table-text"></div>
          {{ elevatorStore.elevationPath }} {{ elevatorStore.currentFloor }}
        </div>
      </div>
    </div>

    <div class="floors">
      <floor
        class="floor"
        v-for="floor in elevatorStore.floors"
        :key="floor"
        :floorsQueue="elevatorStore.floorsQueue"
        :floor="floor"
      />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";
import floor from "./components/floor.vue";

const elevatorStore = useElevatorStore();
const elevatorCabine = ref();
onMounted(() => {
  const floorData = localStorage.getItem("currentFloor");
  if (floorData) {
    elevatorStore.currentFloor = JSON.parse(floorData);
  }
});

function StartQueueElevating() {
  elevatorCabine.value.ontransitionend = () => {
    elevatorStore.elevatorStatus = "arrived";
    elevatorStore.elevationPath = "";
    setTimeout(() => {
      elevatorStore.elevatorStatus = "rest";
      elevatorStore.elevateDelivered();
      if (elevatorStore.floorsQueue.length != 0) {
        StartQueueElevating();
      }
    }, 3000);
  };
}

watch(
  () => elevatorStore.elevatorStatus,
  () => {
    if (elevatorStore.elevatorStatus == "inProgress") {
      StartQueueElevating();
    }
  }
);
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
