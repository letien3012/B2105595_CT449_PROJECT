<template>
    <div v-if="publisher" class="page" >
        <h4 class="row justify-content-center" >Thêm thông tin sách</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import PublisherForm from '@/components/publisher/PublisherForm.vue';
    import PublisherService from '@/services/publisher.service';
    export default{
        components: {
            PublisherForm
        },
        props: { id: {type: String , require: true}},
        data() {
           return {
            publisher: null,
            message: ''
           };
        },
        methods: {
            async getPublisher(id){
                try {
                    this.publisher = await PublisherService.get(id);
                } catch (e){
                    console.log(e);
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.split('/').slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash
                    })
                }
            },
            async updatePublisher(data){
                try{
                    await PublisherService.update(this.publisher._id, data);
                    alert("Cập nhật thông tin nhà xuất bản thành công");
                    this.$router.push("/admin/publisher")
                } catch (e){
                    console.log(e)
                }
            }
        },
        created(){
            this.getPublisher(this.id);
            this.message="";
        }
    }
</script>