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
      localStorage.setItem(
        "floorsQueueWithElevators",
        JSON.stringify(floorsQueueWithElevators.value)
      );
    };
    const getQueueFromLocalStorage = () => {
      const queueData = localStorage.getItem("floorsQueue");
      if (queueData) {
        floorsQueue.value = JSON.parse(queueData);
      }
      const queueWithElevatorsData = localStorage.getItem(
        "floorsQueueWithElevators"
      );
      if (queueWithElevatorsData) {
        floorsQueueWithElevators.value = JSON.parse(queueWithElevatorsData);
      }
    };
    const addToQueue = (floor) => {
      if (!floorsQueue.value.includes(floor)) {
        floorsQueue.value.push(floor);
        floorsQueueWithElevators.value.push({
          floor: floor,
          elevator: "",
          status: "inQueue",
        });
      }
    };
    const addToQueueWithElevators = (elevator) => {
      floorsQueueWithElevators.value.find((q) => {
        q.elevator == "";
        if (elevator.status == "rest" && q.elevator == "") {
          // if (
          //   floorsQueueWithElevators.value.forEach((task) => {
          //     if (
          //       task.status == "inQueue" &&
          //       task.elevator == elevator.id &&
          //       floorsQueueWithElevators.value[0] == task
          //     ) {
          //       return (q.elevator = "");
          //     }
          //   })
          // )
          return (q.elevator = elevator.id);
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
        console.log("Очередь лифтов изменилась");
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

        floorsQueueWithElevators.value.find((queue) => {
          if (queue.elevator == "") {
            // console.log("Не назначен лифт на " + queue.floor + " Этаж");
            if (
              scaleStore.elevators.find(
                (elevator) => elevator.status == "rest"
              ) == undefined
            ) {
              //  console.log("все лифты на текущий момент заняты");
            } else {
              elevatorStore.startQueue(
                scaleStore.elevators.find(
                  (elevator) => elevator.status == "rest"
                ),
                queue.floor
              );
            }
          }
        });

        scaleStore.setScalingDatatoLocalStorage();
        setQueueToLocalStorage();
      },
      { deep: true }
    );
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
