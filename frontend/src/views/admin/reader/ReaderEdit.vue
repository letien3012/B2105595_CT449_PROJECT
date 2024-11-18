<template>
    <div v-if="reader" class="page" >
        <h4 class="row justify-content-center" >Thêm thông tin sách</h4>
        <ReaderForm :reader="reader" @submit:reader="updateReader"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import ReaderForm from '@/components/reader/ReaderForm.vue';
    import ReaderService from '@/services/reader.service';
    export default{
        components: {
            ReaderForm
        },
        props: { id: {type: String , require: true}},
        data() {
           return {
            reader: null,
            message: ''
           };
        },
        methods: {
            async getReader(id){
                try {
                    this.reader = await ReaderService.get(id);
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
            async updateReader(data){
                try{
                    await ReaderService.update(this.reader._id, data);
                    alert("Cập nhật thông tin độc giả thành công");
                    this.$router.push("/admin/reader")
                } catch (e){
                    console.log(e)
                }
            }
        },
        created(){
            this.getReader(this.id);
            this.message="";
        }
    }
</script>