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
  const changeDestination = (elevator, queue) => {
    if (liftingSystemLogic.floorsQueue[0]) {
      return (elevator.destination = queue);
    } else return (elevator.destination = elevator.position);
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
    elevator.position = elevator.destination;
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

  const startQueue = (elevator, queue) => {
    changeDestination(elevator, queue);
    changeSpeed(elevator);
    changeDirection(elevator);
    // moveElevator(elevator);
    // smoothElevate(elevator);
    // elevator.status = "inProgress";
    setInProgress(elevator);
    //
    document.getElementById(elevator.id).ontransitionend = () => {
      changePosition(elevator);
      setArrived(elevator);
      changeDirection(elevator);
      setTimeout(() => {
        setRest(elevator);
        liftingSystemLogic.elevateDelivered();
      }, 3000);
    };
  };

  const resetAfterReloadPage = () => {
    // liftingSystemLogic.getQueueFromLocalStorage();
    // scaleStore.elevators.forEach((elevator) => {
    //   elevator.destination = elevator.position;
    //   moveElevator(elevator);
    //   if (liftingSystemLogic.floorsQueue[0]) {
    //     setTimeout(() => {
    //       startQueue(elevator);
    //     }, 1);
    //   }
    // });
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
