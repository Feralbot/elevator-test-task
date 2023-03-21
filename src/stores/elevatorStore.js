import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const floors = ref([1, 2, 3, 4, 5]);
  const currentFloor = ref(1);
  const elevatorSpeed = ref(1);
  const elevationPath = ref("");
  const floorsQueue = ref([]);
  const elevatorStatus = ref("rest");

  const floorData = localStorage.getItem("currentFloor");
  if (floorData) {
    currentFloor.value = JSON.parse(floorData);
  }

  const moveElevator = computed(() => {
    return `transform: translateY(${(currentFloor.value - 1) * -160}px`;
  });
  const smoothElevate = computed(() => {
    return `transition: transform ${elevatorSpeed.value}s`;
  });

  const addToQueue = (floor) => {
    if (!floorsQueue.value.includes(floor) && currentFloor.value != floor) {
      floorsQueue.value.push(floor);
      currentFloor.value = floorsQueue.value[0];
    }
  };
  const elevateDelivered = () => {
    floorsQueue.value.shift();
  };

  const ChangeStatus = () => {
    elevatorStatus.value = "inProgress";
  };

  watch(
    floorsQueue,
    () => {
      if (floorsQueue.value[0]) {
        currentFloor.value = floorsQueue.value[0];
      }
    },
    { deep: true }
  );
  watch(currentFloor, (newFloor, oldFloor) => {
    ChangeStatus();
    localStorage.setItem("currentFloor", JSON.stringify(newFloor));
    if (oldFloor < newFloor) {
      elevationPath.value = "↑ ";
    } else {
      elevationPath.value = "↓ ";
    }
  });

  return {
    floors,
    currentFloor,
    elevatorSpeed,
    elevationPath,
    floorsQueue,
    elevatorStatus,
    moveElevator,
    smoothElevate,
    addToQueue,
    ChangeStatus,
    elevateDelivered,
  };
});
