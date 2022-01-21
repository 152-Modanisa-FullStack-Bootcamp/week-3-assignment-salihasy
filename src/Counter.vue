<template>
  <div class="counter-container">
    <button @click="decrease">Decrease</button>
    <span>{{ count }}k</span>
    <button @click="increase">Increase</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    decrease() {
      this.$store.dispatch('decrement')
    },
    increase() {
      this.$store.dispatch('increment')
    },
  },
};
</script>
<style scoped>
.counter-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}
</style>