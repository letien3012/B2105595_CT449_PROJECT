<template>
    <div v-if="book" class="page" >
        <h4 class="row justify-content-center" >Hiệu chỉnh thông tin sách</h4>
        <BookForm :book="book" @submit:book="updateBook" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import BookForm from '@/components/book/BookForm.vue';
    import BookService from '@/services/book.service';
    export default{
        components: {
            BookForm
        },
        props: { id: {type: String , require: true}},
        data() {
           return {
            book: null,
            message: ''
           };
        },
        methods: {
            async getBook(id){
                try {
                    this.book = await BookService.get(id);
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
            async updateBook(data){
                try{
                    await BookService.update(this.book.MaSach, data);
                    alert("Cập nhật thông tin sách thành công");
                    this.$router.push("/admin/book")
                } catch (e){
                    console.log(e)
                }
            },
        },
        created(){
            this.getBook(this.id);
            this.message="";
        }
    }
</script>