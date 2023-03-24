import { defineStore } from "pinia";
import { ref, reactive, computed, watch } from "vue";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const elevator = reactive({
    id: 1,
    position: 1,
    destination: 1,
    speed: 0,
    status: "rest",
    direction: null,
  });

  const currentFloor = ref(1);
  const floorsQueue = ref([]);

  const setElevatorInfoToLocalStorage = () => {
    localStorage.setItem("currentFloor", JSON.stringify(currentFloor.value));
    localStorage.setItem("floorsQueue", JSON.stringify(floorsQueue.value));
  };
  const getElevatorInfoToLocalStorage = () => {
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
    if (!floorsQueue.value.includes(floor)) {
      floorsQueue.value.push(floor);
      // currentFloor.value = floorsQueue.value[0];
    }
  };

  const elevateDelivered = () => {
    floorsQueue.value.shift();
  };
  //
  //
  //
  //
  //
  const moveElevator = (elevator) => {
    return `transform: translateY(${-(elevator.destination - 1) * 160}px)`;
  };
  const smoothElevate = (elevator) => {
    return `transition: transform ${elevator.speed}s`;
  };
  const changeDestination = (elevator) => {
    return (elevator.destination = floorsQueue.value[0]);
  };
  const changeSpeed = (elevator) => {
    return (elevator.speed = Math.abs(
      elevator.destination - elevator.position
    ));
  };
  const changeDirection = (newFloor, oldFloor, elevator) => {
    if (oldFloor < newFloor) {
      elevator.direction = "↑ ";
    } else {
      elevator.direction = "↓ ";
    }
  };
  const setRest = (elevator) => {
    return (elevator.status = "rest");
  };
  const setInProgress = (elevator) => {
    return (elevator.status = "inProgress");
  };
  const setArrived = (elevator) => {
    return (elevator.status = "arrived");
  };
  //
  //
  //
  //
  //
  const startQueue = (elevator) => {
    changeDestination(elevator);
    changeSpeed(elevator);
    moveElevator(elevator);
    smoothElevate(elevator);
    setInProgress(elevator);
    document.getElementById(elevator.id).ontransitionend = () => {
      console.log("Вы приехали");
    };

    // elevatorStatusStore.setArrived();

    setTimeout(() => {
      // elevatorStatusStore.setRest();
      elevateDelivered();
      if (floorsQueue.length != 0) {
        //StartQueueElevating();
      }
    }, 3000);
  };

  const resetAfterReloadPage = () => {
    //elevationPath.value = "";
    if (floorsQueue.value[0]) {
      setTimeout(() => {
        //  elevatorStatusStore.setArrived();
        elevateDelivered();
      }, 1);
    }
  };

  watch(
    floorsQueue,
    () => {
      startQueue(elevator);
      setElevatorInfoToLocalStorage();
      if (floorsQueue.value[0]) {
        currentFloor.value = floorsQueue.value[0];
      }
    },
    { deep: true }
  );
  watch(currentFloor, (newFloor, oldFloor) => {
    changeSpeed(elevator);
    //elevatorStatusStore.setInProgress();
    changeDirection(newFloor, oldFloor, elevator);
  });

  return {
    currentFloor,
    floorsQueue,
    moveElevator,
    smoothElevate,
    addToQueue,
    elevateDelivered,
    setElevatorInfoToLocalStorage,
    getElevatorInfoToLocalStorage,
    resetAfterReloadPage,
    elevator,
    setRest,
    setInProgress,
    setArrived,
    startQueue,
    changeDestination,
  };
});
