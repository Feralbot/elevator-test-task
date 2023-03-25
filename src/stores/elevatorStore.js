import { defineStore } from "pinia";
import { useLiftingSystemLogicStore } from "./liftingSystemLogicStore";
import { useScaleStore } from "./scaleStore";

export const useElevatorStore = defineStore("elevatorStore", () => {
  const liftingSystemLogic = useLiftingSystemLogicStore();
  const scaleStore = useScaleStore();

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

  const startQueue = (elevator, queue) => {
    changeDestination(elevator, queue);
    console.log("Лифт " + elevator.id + "Едет на  " + queue + " этаж");
    changeSpeed(elevator);
    changeDirection(elevator);
    setInProgress(elevator);
    setTimeout(() => {
      if (elevator.position == elevator.destination) {
        setRest(elevator);
      }
    }, 100);
    document.getElementById(elevator.id).ontransitionend = () => {
      changePosition(elevator);
      setArrived(elevator);
      liftingSystemLogic.floorsQueueWithElevators.forEach((task) => {
        if (task.floor == queue && task.elevator == elevator.id) {
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
    console.log("page loaded");
    // scaleStore.elevators.forEach((elevator) => {
    //   console.log(elevator);
    //   //setRest(elevator);
    //   setTimeout(() => {
    //     startQueue(elevator, elevator.destination);
    //   }, 100);
    // });

    // scaleStore.elevators.forEach((elevator) => {
    //   setRest(elevator);
    //   console.log(
    //     "Лифт находится на позиции " +
    //       elevator.position +
    //       "И планирует ехать в " +
    //       elevator.destination
    //   );
    //   liftingSystemLogic.floorsQueue.shift();
    // });

    // liftingSystemLogic.floorsQueueWithElevators.forEach((task) => {
    //   // console.log(task.elevator);
    //   if (task.status == "inQueue" && task.elevator != "") {
    //     console.log(
    //       "но вообще лифт " +
    //         task.elevator +
    //         "Должен поехать на этаж " +
    //         task.floor
    //     );
    //     liftingSystemLogic.elevateDelivered(task.floor);
    //     // startQueue(
    //     //   scaleStore.elevators.find((elevator) => elevator.id == task.elevator),
    //     //   task.floor
    //     // );
    //   }
    // });

    // console.log("page loaded");
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
