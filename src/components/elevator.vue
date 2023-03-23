<template>
  <div class="elevator">
    <div
      class="elevator-cabine"
      :class="{ blink: elevatorStatusStore.elevatorStatus == 'arrived' }"
      ref="elevatorCabine"
      :style="[elevatorStore.moveElevator, elevatorStore.smoothElevate]"
    >
      <div class="elevator-cabine-table">
        <div class="elevator-cabine-table-text"></div>
        {{ elevatorStore.elevationPath }} {{ elevatorStore.currentFloor }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "../stores/elevatorStore";
import { useElevatorStatusStore } from "../stores/elevatorStatusStore";

const elevatorStore = useElevatorStore();
const elevatorStatusStore = useElevatorStatusStore();

const elevatorCabine = ref();
onMounted(() => {
  elevatorStore.getLocalStorage();
  elevatorStore.resetAfterReloadPage();
});

function StartQueueElevating() {
  elevatorCabine.value.ontransitionend = () => {
    elevatorStatusStore.setArrived();
    elevatorStore.elevationPath = "";
    setTimeout(() => {
      elevatorStatusStore.setRest();
      elevatorStore.elevateDelivered();
      if (elevatorStore.floorsQueue.length != 0) {
        StartQueueElevating();
      }
    }, 3000);
  };
}

watch(
  () => elevatorStatusStore.elevatorStatus,
  () => {
    // console.log(
    //   "elevator Status changed to " + elevatorStatusStore.elevatorStatus
    // );
    if (elevatorStatusStore.elevatorStatus == "inProgress") {
      StartQueueElevating();
    }
  },
  { deep: true }
);
</script>
