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
          {{ elevatorStore.elevationPath }} {{ elevatorStore.currentFlour }}
        </div>
      </div>
    </div>

    <div class="flours">
      <div class="flour" v-for="flour in elevatorStore.flours" :key="flour">
        <button
          class="flour-btn"
          :class="{
            'flour-waiting': elevatorStore.floursQueue.includes(flour),
          }"
          @click="elevatorStore.addToQueue(flour)"
        >
          {{ flour }}
        </button>
        {{ elevatorStore.floursQueue }}
        {{ elevatorStore.elevatorStatus }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";

const elevatorStore = useElevatorStore();
const elevatorCabine = ref();
onMounted(() => {
  const flourData = localStorage.getItem("currentFlour");
  if (flourData) {
    elevatorStore.currentFlour = JSON.parse(flourData);
  }
});

function StartQueueElevating() {
  elevatorCabine.value.ontransitionend = () => {
    elevatorStore.elevatorStatus = "arrived";
    setTimeout(() => {
      elevatorStore.elevatorStatus = "rest";
      elevatorStore.elevateDelivered();
      if (elevatorStore.floursQueue.length != 0) {
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
