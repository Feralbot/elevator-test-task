import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const flours = ref([1, 2, 3, 4, 5]);
  const currentFlour = ref(1);
  const elevatorSpeed = ref(1);
  const elevationPath = ref("");
  const floursQueue = ref([]);
  const elevatorStatus = ref("rest");

  const flourData = localStorage.getItem("currentFlour");
  if (flourData) {
    currentFlour.value = JSON.parse(flourData);
  }

  const moveElevator = computed(() => {
    return `transform: translateY(${(currentFlour.value - 1) * -160}px`;
  });
  const smoothElevate = computed(() => {
    return `transition: transform ${elevatorSpeed.value}s`;
  });

  const addToQueue = (flour) => {
    floursQueue.value.push(flour);
  };
  const elevateDelivered = () => {
    floursQueue.value.shift();
  };

  const ChangeStatus = () => {
    elevatorStatus.value = "inProgress";
  };

  watch(currentFlour, (newFlour, oldFlour) => {
    localStorage.setItem("currentFlour", JSON.stringify(newFlour));
    if (oldFlour < newFlour) {
      elevationPath.value = "UP ";
    } else {
      elevationPath.value = "D ";
    }
  });

  return {
    flours,
    currentFlour,
    elevatorSpeed,
    elevationPath,
    floursQueue,
    elevatorStatus,
    moveElevator,
    smoothElevate,
    addToQueue,
    ChangeStatus,
    elevateDelivered,
  };
});
