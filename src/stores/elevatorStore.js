import { defineStore } from "pinia";
import { ref, reactive, computed, watch } from "vue";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const elevator = reactive({
    id: 1,
    position: 1,
    destination: 1,
    speed: 0,
    status: "rest",
    direction: "",
  });

  const floorsQueue = ref([]);

  const setElevatorInfoToLocalStorage = () => {
    localStorage.setItem("elevatorStats", JSON.stringify(elevator.position));
    localStorage.setItem("floorsQueue", JSON.stringify(floorsQueue.value));
  };
  const getElevatorInfoToLocalStorage = () => {
    const elevatorData = localStorage.getItem("elevatorStats");
    if (elevatorData) {
      elevator.position = JSON.parse(elevatorData);
      console.log(elevator.value);
    }
    const queueData = localStorage.getItem("floorsQueue");
    if (queueData) {
      floorsQueue.value = JSON.parse(queueData);
    }
  };

  const addToQueue = (floor) => {
    if (!floorsQueue.value.includes(floor)) {
      floorsQueue.value.push(floor);
    }
    startQueue(elevator);
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
  const changeDirection = (elevator) => {
    if (elevator.position < elevator.destination) {
      elevator.direction = "↑ ";
    } else {
      elevator.direction = "↓ ";
    }
    if (elevator.position == elevator.destination) {
      elevator.direction = "";
    }
  };
  const changePosition = (elevator) => {
    elevator.position = floorsQueue.value[0];
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

  const startQueue = (elevator) => {
    if (elevator.status == "rest") {
      changeDestination(elevator);
      changeSpeed(elevator);
      changeDirection(elevator);
      moveElevator(elevator);
      smoothElevate(elevator);
      setInProgress(elevator);
      document.getElementById(elevator.id).ontransitionend = () => {
        changePosition(elevator);
        changeDirection(elevator);
        setArrived(elevator);
        setTimeout(() => {
          setRest(elevator);
          elevateDelivered();
          if (floorsQueue.value.length) {
            startQueue(elevator);
          }
        }, 3000);
      };
    }
  };
  //

  const resetAfterReloadPage = () => {
    getElevatorInfoToLocalStorage();
    elevator.destination = elevator.position;
    moveElevator(elevator);
    if (floorsQueue.value[0]) {
      setTimeout(() => {
        startQueue(elevator);
      }, 1);
    }
  };

  watch(
    floorsQueue,
    () => {
      setElevatorInfoToLocalStorage();
    },
    { deep: true }
  );

  return {
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
    changePosition,
  };
});
