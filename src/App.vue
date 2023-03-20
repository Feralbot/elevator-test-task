<template>
  <main>
    <div class="elevator">
      <div class="elevator-cabine"></div>
    </div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in flours" :key="flour">
          <button class="flour-btn" @click="currentFlour = flour">
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
import { ref, watch } from "vue";
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

async function moveElevator(newFlour, oldFlour) {
  if (newFlour > oldFlour) {
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
}

watch(currentFlour, (newFlour, oldFlour) => {
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
<style src="./styles/animations.css"></style>
