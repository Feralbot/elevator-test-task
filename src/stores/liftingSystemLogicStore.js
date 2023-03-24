import { defineStore } from "pinia";
import { ref, reactive, watch } from "vue";
import { useElevatorStore } from "./elevatorStore";
import { useScaleStore } from "./scaleStore";
export const useLiftingSystemLogicStore = defineStore(
  "liftingSystemLogic",
  () => {
    const elevatorStore = useElevatorStore();
    const scaleStore = useScaleStore();
    const floorsQueue = ref([]);

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
      floorsQueue.value.push(floor);
    };

    const elevateDelivered = () => {
      floorsQueue.value.shift();
    };

    watch(
      floorsQueue.value,
      (newValue, oldvalue) => {
        //console.log(newValue, oldvalue);
        //  console.log(floorsQueue.value[floorsQueue.value.length - 1]);
        //  console.log(newValue[newValue.length - 1]);
        // console.log(scaleStore.elevators[e]);
        // for (let e = 0; e < scaleStore.elevators.length; e++) {

        for (let q = 0; q < floorsQueue.value.length; q++) {
          let e = q;
          //console.log(floorsQueue.value[q]);
          if (e < scaleStore.elevators.length) {
            if (scaleStore.elevators[e].status != "InProgress")
              elevatorStore.startQueue(
                scaleStore.elevators[e],
                floorsQueue.value[q]
              );
            e++;
          }
          //   console.log(
          //     "лифт " +
          //       scaleStore.elevators[e].id +
          //       " Отправился выполнять запрос на " +
          //       floorsQueue.value[q] +
          //       " этаж"
          //   );
          // }
        }

        // scaleStore.elevators.forEach((e) => {
        //   if (e.status != "inProgress") {
        //     floorsQueue.value.forEach((queue) => {
        //       e.destination = queue + 1;

        //       elevatorStore.startQueue(scaleStore.elevators[e.id - 1]);
        //     });
        //   }
        // });

        // floorsQueue.value.forEach((e) => {
        //   elevatorStore.startQueue(e.elevator);
        // });

        // elevatorStore.startQueue(selectRestingElevator());
        // elevateDelivered();
        // setQueueToLocalStorage();
      },
      { deep: true }
    );

    return {
      floorsQueue,
      setQueueToLocalStorage,
      getQueueFromLocalStorage,
      elevateDelivered,
      addToQueue,
    };
  }
);
