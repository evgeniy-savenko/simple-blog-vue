<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model:value="searchQuery" v-focus/>
        <div class="app__btns">
            <my-btn
                @click="showDialog"
            >
                Создать пост
            </my-btn>
            <my-select
            v-model="selectedSort"
            :options="sortOptions"
            >
                
            </my-select>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            />
        </my-dialog>

        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer">

        </div>
    </div>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import PostList from '../components/PostList';
import axios from 'axios';
import { Ref } from 'vue';

export default {
    components: {
    PostForm,
    PostList,
},  
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'},
            ],
            searchQuery: ''
        }
    },

    setup(props) {
        const {posts, totalPages, isPostLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostLoading,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
    }

}
</script>

<style>



.app__btns {
    margin: 15px;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
    margin-right: 5px;

}

.current-page {
    border: 2px solid green;
}

.observer {
    height: 30px;
    background: red;
}

</style>