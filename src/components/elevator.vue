<template>
  <div class="elevator">
    <div
      class="elevator-cabine"
      :id="elevatorStore.elevator.id"
      :class="{ blink: elevatorStore.elevator.status == 'arrived' }"
      ref="elevatorCabine"
      :style="[
        elevatorStore.moveElevator(elevatorStore.elevator),
        elevatorStore.smoothElevate(elevatorStore.elevator),
      ]"
    >
      <div class="elevator-cabine-table">
        <div class="elevator-cabine-table-text"></div>
        {{ elevatorStore.elevationPath }} {{ elevatorStore.currentFloor }}
      </div>
      <div>ID {{ elevatorStore.elevator.id }}</div>
      <div>pos {{ elevatorStore.elevator.position }}</div>
      <div>status {{ elevatorStore.elevator.status }}</div>
      <div>speed {{ elevatorStore.elevator.speed }}</div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "../stores/elevatorStore";

const elevatorStore = useElevatorStore();

onMounted(() => {
  elevatorStore.getElevatorInfoToLocalStorage();
  elevatorStore.resetAfterReloadPage();
});

// function StartQueueElevating() {
//   elevatorCabine.value.ontransitionend = () => {
//     // elevatorStatusStore.setArrived();
//     elevatorStore.elevationPath = "";
//     setTimeout(() => {
//       // elevatorStatusStore.setRest();
//       elevatorStore.elevateDelivered();
//       if (elevatorStore.floorsQueue.length != 0) {
//         StartQueueElevating();
//       }
//     }, 3000);
//   };
// }

// watch(
//   () => elevatorStore.elevator.status,
//   () => {
//     // console.log(
//     //   "elevator Status changed to " + elevatorStatusStore.elevatorStatus
//     // );
//     if (elevatorStore.elevator.status == "inProgress") {
//       StartQueueElevating();
//     }
//   },
//   { deep: true }
// );
</script>
