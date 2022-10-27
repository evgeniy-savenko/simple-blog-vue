<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
    name: 'my-btn'
}
</script>

<style scoped>
.button {
    border: 2px solid rgb(1, 155, 194);
    padding: 10px 15px;
    background-color: transparent;
    color: rgb(1, 155, 194);
}
</style>