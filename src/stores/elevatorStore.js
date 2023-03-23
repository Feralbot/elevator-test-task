import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const floors = ref([1, 2, 3, 4, 5]);
  const currentFloor = ref(1);
  const elevatorSpeed = ref("");
  const elevationPath = ref("");
  const floorsQueue = ref([]);
  const elevatorStatus = ref("rest");

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

  const ChangeStatus = () => {
    elevatorStatus.value = "inProgress";
  };
  const changeSpeed = (newFloor, oldFloor) => {
    elevatorSpeed.value = Math.abs(newFloor - oldFloor);
  };
  const resetAfterReloadPage = () => {
    elevatorStatus.value = "arrived";
    elevationPath.value = "";
    setTimeout(() => {
      elevatorStatus.value = "rest";
      elevateDelivered();
    }, 3000);
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
    ChangeStatus();
    changeSpeed(newFloor, oldFloor);

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
    getLocalStorage,
    setLocalStorage,
    resetAfterReloadPage,
  };
});
