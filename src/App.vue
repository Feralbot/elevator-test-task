<template>
  <main>
    <div class="elevator">
      <div class="elevator-cabine">
        <div class="elevator-cabine-table">
          <div class="elevator-cabine-table-text"></div>
          {{ elevationPath }} {{ currentFlour }}
        </div>
      </div>
    </div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in flours" :key="flour">
          <button
            class="flour-btn"
            :class="{
              'flour-waiting': currentFlour == flour && elevateInProgress,
            }"
            @click="currentFlour = flour"
          >
            {{ flour }}
          </button>
          <div class="status" v-for="order in flourQueue" :key="order">
            {{ order.index }} {{ order.status }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  EaselPlugin,
  MotionPathPlugin,
  PixiPlugin,
  TextPlugin
);

const flours = ref([1, 2, 3, 4, 5]);
const currentFlour = ref(1);
const flourQueue = ref([]);
const elevationPath = ref("");
const elevateInProgress = ref(false);

onMounted(() => {
  const flourData = localStorage.getItem("currentFlour");
  if (flourData) {
    currentFlour.value = JSON.parse(flourData);
    console.log(currentFlour.value);
  }
});

async function moveElevator(newFlour, oldFlour) {
  elevateInProgress.value = true;
  if (newFlour > oldFlour) {
    elevationPath.value = "↑ ";
    await gsap
      .timeline()
      .to(".elevator-cabine", {
        y: -160 * (newFlour - 1),
        duration: newFlour - oldFlour,
      })
      .from(".elevator-cabine", {
        duration: 3,
        backgroundColor: "red",
      });
  } else {
    elevationPath.value = "↓ ";
    await gsap
      .timeline()
      .to(".elevator-cabine", {
        y: -160 * (newFlour - 1),
        duration: oldFlour - newFlour,
      })
      .from(".elevator-cabine", {
        duration: 3,
        backgroundColor: "red",
      });
  }
  elevationPath.value = "";
  elevateInProgress.value = false;
}

watch(currentFlour, (newFlour, oldFlour) => {
  localStorage.setItem("currentFlour", JSON.stringify(newFlour));

  if (newFlour != oldFlour) {
    flourQueue.value.push({
      newFlour: newFlour,
      oldFlour: oldFlour,
      status: "inQueue",
    });
  }
  flourQueue.value.forEach(async (elevateOrder) => {
    await moveElevator(newFlour, oldFlour);
    elevateOrder.status = "done";
  });
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
