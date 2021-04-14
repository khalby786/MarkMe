<template>
  <transition name="fade">
    <div class="overlay-blur" v-if="showOverlay === true">
      <div class="overlay">
        <div class="close-modal">
          <button
            class="close-modal-button accent"
            @click="showOverlay = false"
          >
            X
          </button>
        </div>
        <div>
          <h1 class="title">#markme</h1>
          <p class="description">
            A simple, lightweight and beautiful Markdown editor and viewer.
          </p>
          <button class="links" @click="showOverlay = false">Get Started</button>&nbsp;
          <NuxtLink to="/about"><button class="links">About</button></NuxtLink>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Overlay",
  data: function () {
    return {
      showOverlay: true,
    }
  },
}
</script>

<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  height: 200px;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  margin: 100px auto;
  max-width: 600px;
  border-radius: 5px;
  box-shadow: 0 0px 2.3px rgba(0, 0, 0, 0.132), 0 0px 5.5px rgba(0, 0, 0, 0.19),
    0 0px 10.3px rgba(0, 0, 0, 0.235), 0 0px 18.3px rgba(0, 0, 0, 0.28),
    0 0px 34.3px rgba(0, 0, 0, 0.338), 0 0px 82px rgba(0, 0, 0, 0.47);
  padding: 20px;
  z-index: 9;
  border: 1px solid var(--border);
  background-color: var(--background-dark);
}

.overlay-blur {
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
}

.close-modal-button {
  font-family: var(--monospace);
  padding: 3px;
  height: 40px;
  width: 40px;
  position: absolute;
  right: 30px;
  top: 30px;
  text-align: center;
  vertical-align: middle;
}

.title {
  font-family: "Fira Code", monospace;
  color: var(--border);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>