import { ref, computed } from "vue"

export default function useSortedPost(posts) {
    const selectedSort = ref('')
    const sortedPost = computed(() => {
        return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
    })

    return {
        selectedSort, sortedPost
    }
}