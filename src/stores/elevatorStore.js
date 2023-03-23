import { defineStore } from "pinia";
import { useElevatorStatusStore } from "./elevatorStatusStore";
import { ref, computed, watch } from "vue";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const elevatorStatusStore = useElevatorStatusStore();
  const floors = ref([1, 2, 3, 4, 5]);
  const currentFloor = ref(1);
  const elevatorSpeed = ref("");
  const elevationPath = ref("");
  const floorsQueue = ref([]);

  const moveElevator = computed(() => {
    return `transform: translateY(${(currentFloor.value - 1) * -160}px`;
  });
  const smoothElevate = computed(() => {
    return `transition: transform ${elevatorSpeed.value}s`;
  });

  const setLocalStorage = () => {
    localStorage.setItem("currentFloor", JSON.stringify(currentFloor.value));
    localStorage.setItem("floorsQueue", JSON.stringify(floorsQueue.value));
  };
  const getLocalStorage = () => {
    const floorData = localStorage.getItem("currentFloor");
    if (floorData) {
      currentFloor.value = JSON.parse(floorData);
    }
    const queueData = localStorage.getItem("floorsQueue");
    if (queueData) {
      floorsQueue.value = JSON.parse(queueData);
    }
  };

  const addToQueue = (floor) => {
    if (!floorsQueue.value.includes(floor) && currentFloor.value != floor) {
      floorsQueue.value.push(floor);
      currentFloor.value = floorsQueue.value[0];
    }
  };
  const elevateDelivered = () => {
    floorsQueue.value.shift();
  };

  const changeSpeed = (newFloor, oldFloor) => {
    elevatorSpeed.value = Math.abs(newFloor - oldFloor);
  };
  const resetAfterReloadPage = () => {
    if (floorsQueue.value[0]) {
      elevationPath.value = "";
      setTimeout(() => {
        elevatorStatusStore.setArrived();
        elevateDelivered();
      }, 1);
    }
  };

  watch(
    floorsQueue,
    () => {
      setLocalStorage();
      if (floorsQueue.value[0]) {
        currentFloor.value = floorsQueue.value[0];
      }
    },
    { deep: true }
  );
  watch(currentFloor, (newFloor, oldFloor) => {
    changeSpeed(newFloor, oldFloor);
    elevatorStatusStore.setInProgress();
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
    moveElevator,
    smoothElevate,
    addToQueue,
    elevateDelivered,
    getLocalStorage,
    setLocalStorage,
    resetAfterReloadPage,
  };
});
