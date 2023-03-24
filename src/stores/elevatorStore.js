import { defineStore } from "pinia";
import { ref, reactive, watch } from "vue";
import { useLiftingSystemLogicStore } from "./liftingSystemLogicStore";
import { useScaleStore } from "./scaleStore";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const liftingSystemLogic = useLiftingSystemLogicStore();
  const scaleStore = useScaleStore();

  //
  const moveElevator = (elevator) => {
    return `transform: translateY(${-(elevator.destination - 1) * 160}px)`;
  };
  const smoothElevate = (elevator) => {
    return `transition: transform ${elevator.speed}s`;
  };
  const changeDestination = (elevator) => {
    return (elevator.destination = liftingSystemLogic.floorsQueue[0]);
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
    elevator.position = liftingSystemLogic.floorsQueue[0];
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
        liftingSystemLogic.elevateDelivered();
        changePosition(elevator);
        changeDirection(elevator);
        setArrived(elevator);
        setTimeout(() => {
          setRest(elevator);

          if (liftingSystemLogic.floorsQueue.length) {
            startQueue(elevator);
          }
        }, 3000);
      };
    }
  };

  const resetAfterReloadPage = () => {
    liftingSystemLogic.getQueueFromLocalStorage();
    scaleStore.elevators.forEach((elevator) => {
      elevator.destination = elevator.position;
      moveElevator(elevator);
      if (liftingSystemLogic.floorsQueue[0]) {
        setTimeout(() => {
          startQueue(elevator);
        }, 1);
      }
    });
  };

  return {
    moveElevator,
    smoothElevate,
    resetAfterReloadPage,
    setRest,
    setInProgress,
    setArrived,
    startQueue,
    changeDestination,
    changePosition,
  };
});
