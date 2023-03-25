import { defineStore } from "pinia";
import { useLiftingSystemLogicStore } from "./liftingSystemLogicStore";
import { useScaleStore } from "./scaleStore";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const liftingSystemLogic = useLiftingSystemLogicStore();
  const scaleStore = useScaleStore();

  //
  const moveElevator = (elevator) => {
    return `transform: translateY(${
      (-(elevator.destination - 1) * 800) / scaleStore.floors
    }px)`;
  };
  const smoothElevate = (elevator) => {
    return `transition: transform ${elevator.speed}s`;
  };
  const changeDestination = (elevator, queue) => {
    if (liftingSystemLogic.floorsQueue[0]) {
      liftingSystemLogic.addToQueueWithElevators(elevator);
      // liftingSystemLogic.floorsQueueWithElevators.push({ floor: liftingSystemLogic.floorsQueue.filter(q=>q=queue), elevator: elevator.id });
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
    setInProgress(elevator);
    //
    document.getElementById(elevator.id).ontransitionend = () => {
      changePosition(elevator);
      setArrived(elevator);
      liftingSystemLogic.floorsQueueWithElevators.forEach((task) => {
        if ((task.floor == queue && task.elevator == elevator.id)) {
          task.status = "done";
        }
      });
      changeDirection(elevator);
      setTimeout(() => {
        setRest(elevator);
        liftingSystemLogic.elevateDelivered(queue);
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
