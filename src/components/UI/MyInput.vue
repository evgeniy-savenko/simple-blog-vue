<template>
    <input 
    :value="value"
    placeholder="Введите ключевое слово в названии поста..." 
    @input="updateInput" 
    class="input" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        value: [String, Number]
    },
    methods: {
        updateInput(e) {
            this.$emit('update:value', e.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 2px solid rgb(1, 155, 194);
    padding: 10px 15px;
    margin-top: 15px;
}
</style>