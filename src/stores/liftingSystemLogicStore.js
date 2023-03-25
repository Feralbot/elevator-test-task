import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useElevatorStore } from "./elevatorStore";
import { useScaleStore } from "./scaleStore";
export const useLiftingSystemLogicStore = defineStore(
  "liftingSystemLogic",
  () => {
    const elevatorStore = useElevatorStore();
    const scaleStore = useScaleStore();
    const floorsQueue = ref([]);
    const floorsQueueWithElevators = ref([]);

    const setQueueToLocalStorage = () => {
      localStorage.setItem("floorsQueue", JSON.stringify(floorsQueue.value));
    };
    const getQueueFromLocalStorage = () => {
      const queueData = localStorage.getItem("floorsQueue");
      if (queueData) {
        floorsQueue.value = JSON.parse(queueData);
      }
    };
    const addToQueue = (floor) => {
      if (!floorsQueue.value.includes(floor)) {
        floorsQueue.value.push(floor);
        floorsQueueWithElevators.value.push({ floor: floor, elevator: "" });
      }
    };
    const addToQueueWithElevators = (elevator) => {
      floorsQueueWithElevators.value.find((q) => {
        q.elevator == "";
        if (elevator.status == "rest" && q.elevator == "") {
          q.elevator = elevator.id;
        }
      });
    };
    const elevateDelivered = (queue) => {
      const executedQueue = floorsQueue.value.indexOf(queue);
      floorsQueue.value.splice(executedQueue, 1);
    };

    watch(
      floorsQueue.value,
      () => {
        for (let q = 0; q < floorsQueueWithElevators.value.length; q++) {
          let e = q;
          if (
            e < scaleStore.elevators.length &&
            floorsQueueWithElevators.value[q].elevator == ""
          ) {
            elevatorStore.startQueue(
              scaleStore.elevators[e],
              floorsQueue.value[q]
            );
          }
          e++;
        }

        floorsQueueWithElevators.value.forEach((queue) => {
          if (queue.elevator == "") {
            console.log("Не назначен лифт на " + queue.floor + " Этаж");
            if (
              scaleStore.elevators.find(
                (elevator) => elevator.status == "rest"
              ) == undefined
            ) {
              console.log("все лифты на текущий момент заняты");
            } else
              elevatorStore.startQueue(
                scaleStore.elevators.find(
                  (elevator) => elevator.status == "rest"
                ),
                queue.floor
              );
          }
        });

        //  console.log(
        //    floorsQueueWithElevators.value.find((queue) => queue.elevator == "")
        //  );
        // while (
        //   floorsQueueWithElevators.value.find(
        //     (queue) => queue.elevator == ""
        //   ) == false
        // ) {
        //   if (
        //     scaleStore.elevators.find(
        //       (elevator) => elevator.status == "rest"
        //     ) != undefined
        //   ) {
        //     let elevator = scaleStore.elevators.find(
        //       (elevator) => elevator.status == "rest"
        //     );
        //     elevatorStore.startQueue(
        //       elevator,
        //       floorsQueueWithElevators.value.find(
        //         (queue) => queue.elevator == ""
        //       )
        //     );
        //   }
        // }
      },
      { deep: true }
    );
    // watch(
    //   floorsQueueWithElevators.value,
    //   () => {
    //     // if (
    //     //   floorsQueueWithElevators.value.forEach((queue) => {
    //     //     if (queue.elevator == "") {
    //     //       let elevator = scaleStore.elevators.find(
    //     //         (elevator) => elevator.status == "rest"
    //     //       );
    //     //       console.log(elevator == undefined);
    //     //       //if (elevator.id) {
    //     //         // elevatorStore.startQueue(elevator, queue.floor);
    //     //     //  }
    //     //     }
    //     //   })
    //     // )
    //     //   console.log("123");
    //   },
    //   { deep: true }
    // );
    return {
      floorsQueue,
      setQueueToLocalStorage,
      getQueueFromLocalStorage,
      elevateDelivered,
      addToQueue,
      floorsQueueWithElevators,
      addToQueueWithElevators,
    };
  }
);
