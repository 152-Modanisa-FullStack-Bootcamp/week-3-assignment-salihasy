<template>
  <div>
    <div id="app">
      <h1>Daily Corona Cases in Turkey</h1>
      <div
          class="notificationArea"
          :class="{
          danger: getCount >= 10,
          normal: getCount >= 5 && getCount < 10,
          safe: getCount < 5,
        }"
      >
        {{ message }}
      </div>
    </div>
    <Counter />
  </div>
</template>

<script>
import Counter from "./Counter";
import {mapGetters} from "vuex";

export default {
  name: "App",
  components: {
    Counter,
  },
  computed: {
    ...mapGetters([
        'getCount'
    ]),
    message() {
      const count = this.$store.state.count
      if (count >= 10) {
        return `Danger!!! Case count is ${count}k`;
      } else if (count >= 5 && count < 10) {
        return `Life is normal. Case count is ${count}k`;
      } else {
        return `So safe. Case count is ${count}k`;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.danger {
  background-color: red;
}

.normal {
  background-color: grey;
}

.safe {
  background-color: green;
}

.notificationArea {
  height: 100px;
  padding-top: 60px;
}
</style>
