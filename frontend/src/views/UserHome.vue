<template>
    <UserHomeHeader></UserHomeHeader>
    <!-- <UserHomeBody v-if="showDashboard" :books="books"></UserHomeBody> -->
    <RouterView ></RouterView>
    <AppFooter></AppFooter>

</template>
<script>
    import AppFooter from '@/components/AppFooter.vue';
    import UserHomeHeader from '@/components/UserHomeHeader.vue';
    import UserHomeBody from '@/components/UserHomeBody.vue';
    export default{
        components: { AppFooter, UserHomeHeader, UserHomeBody },
        data(){
            return{
                books: [],
            }
        },
        // computed: {
        //     showDashboard() {
        //     return this.$route.path === '/'; 
        //     },
        // },
    }
</script>
