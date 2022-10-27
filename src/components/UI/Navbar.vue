<template>
    <div class="navbar">
        <div class="logo" @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-btn class="btn__nav" @click="$router.push('/posts')">Посты</my-btn>
            <my-btn class="btn__nav" style="margin-left: 20px" @click="$router.push('/about')">О сайте</my-btn>
            <my-btn class="btn__nav" style="margin-left: 20px" @click="$router.push('/global')">Store</my-btn>
            <my-btn class="btn__nav" style="margin-left: 20px" @click="$router.push('/api')">Composition API</my-btn>

        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',

}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: grey;
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btns {
    margin-left: auto;
}

.btn__nav {
    color: white;
    border-color: white;
}

.logo {
    text-transform: uppercase;
    color: white;
    font-size: 36px;
}
</style>