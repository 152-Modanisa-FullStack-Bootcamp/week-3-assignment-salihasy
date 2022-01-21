# Week 3 Assignment

In this assignment, we expect to see tests like

`Counter.vue`
```html
 <div class="counter-container">
    <button @click="decrease">Decrease</button>
    <span>{{ count }}k</span>
    <button @click="increase">Increase</button>
</div>
```

1. Component Exist Check
2. Increase button exist check
3. Decrease button exist check
4. Increase button functionality check
5. Decrease button functionality check
6. 2 increase + decrease functionality check together
7. Count text show check

`App.vue`
```html
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
```

1. h1 exists 
2. h1 text equals to `Daily Corona Cases in Turkey` check
3. notificationArea class check based on `getCount` value
4. notificationArea text message check

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```