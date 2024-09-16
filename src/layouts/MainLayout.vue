<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="toolbar">
        <q-toolbar-title> Quasar App </q-toolbar-title>
        <div class="corner-tittle-buttons">
          <div
            v-bind:class="
              isHovering ? 'corner below minimize-hovering' : 'corner below'
            "
          />
          <div class="corner above" />
        </div>

        <div class="titlebar-buttons">
          <q-btn
            class="titlebar-button minimize"
            dense
            flat
            round
            icon="minimize"
            @mouseover="isHovering = true"
            @mouseleave="isHovering = false"
            @click="minimizeWindow"
          />

          <q-btn
            class="titlebar-button"
            dense
            flat
            round
            icon="crop_square"
            @click="maximizeWindow"
          />
          <q-btn
            class="titlebar-button close"
            dense
            flat
            round
            icon="close"
            @click="closeWindow"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-header {
  background-color: #2a2a2a;
  -webkit-app-region: drag;
}

.q-toolbar {
  padding-right: 0;
}

.titlebar-buttons {
  background-color: #f4f4f4;
  border-radius: 10px 10px 0 0;
  -webkit-app-region: no-drag;
}

.corner-tittle-buttons {
  height: 50px;
  position: relative;
}

.corner.below {
  background-color: #f4f4f4;
  border-radius: 0px;
}

.corner.above {
  background-color: #2a2a2a;
  border-radius: 0 0 10px 0;
}

.corner {
  height: 50px;
  width: 50px;
  position: absolute;
  right: 0;
  transition: 0.3s;
}

.titlebar-button {
  border-radius: 0;
  height: 50px;
  width: 50px;
  color: #505050;
}

.q-btn >>> .q-icon {
  font-size: 1em;
  font-weight: lighter;
}

.titlebar-button.minimize {
  border-radius: 10px 0 0 0;
}

.titlebar-button.close {
  border-radius: 0 10px 0 0;
}

.titlebar-button.close:hover {
  background-color: #f44336;
}

.minimize-hovering {
  background-color: rgba(255, 255, 255, 0.87) !important;
  border-radius: 0px;
  transition: 0.3s;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

function minimizeWindow() {
  window.api.minimizeWindow();
}

function maximizeWindow() {
  window.api.maximizeWindow();
}

function closeWindow() {
  window.api.closeWindow();
}

const isHovering = ref(false);
</script>
