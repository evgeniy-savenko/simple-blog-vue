<template>
  <div class="post">
    <div>
        <div class="post-id"><strong>{{ post.id }}</strong></div>
        <div><strong>Название:</strong> {{ post.title }} </div>
        <div><strong>Описание:</strong> {{ post.body }} </div>
    </div>
    <div class="post__btns">
        <my-btn
        @click="$router.push(`/posts/${post.id}`)"
        >
            Открыть
        </my-btn>
        <my-btn
         @click="$emit('remove', post)"
        >
            Удалить
        </my-btn>
    </div>
</div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>
.post {
    width: 100%;
    padding: 10px;
    border: 2px solid rgb(1, 155, 194);
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post-id {
    color: red;
}

.post__btns {
    display: flex;
}
</style>