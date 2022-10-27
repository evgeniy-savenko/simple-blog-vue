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
        <!-- <div class="page__wrapper">
            <div class="page" 
            v-for="pageNumber in totalPages" 
            :key="pageNumber" 
            :class="{
                'current-page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
            > {{ pageNumber }} 
        </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import PostList from '../components/PostList';
import axios from 'axios';

export default {
    components: {
    PostForm,
    PostList,
},  
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'},
            ],
            searchQuery: ''
        }
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id) 
        },
        showDialog() {
            this.dialogVisible = true;
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber
        // },
        async fetcPosts() {
           try {
            this.isPostLoading = true;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: this.page,
                    _limit: this.limit
                }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data;
           } catch(e) {
            alert('Ошибка')
           } finally {
            this.isPostLoading = false;
           }
        },
        async loadMorePosts() {
           try {
            this.page += 1;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: this.page,
                    _limit: this.limit
                }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = [...this.posts, ...response.data];
           } catch(e) {
            alert('Ошибка')
           }
        }
    },
    
    mounted() {
        this.fetcPosts();
        console.log(this.$refs.observer);
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts()
        //    }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);

    },
    computed: {
        sortedPost() { 
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // page() {
        //     this.fetcPosts()
        // }
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