<template>
    <div v-if="book" class="page">
        <h4 class="row justify-content-center" >Thêm thông tin sách</h4>
        <BookForm :book="book" @submit:book="addBook"/>
    </div>
</template>
<script>
    import BookForm from '@/components/book/BookForm.vue';
    import BookService from '@/services/book.service';
    export default{
        components:{
            BookForm,
        },
        data(){
            return  {
                book:{
                    MaSach: '',
                    TenSach: '',
                    DonGia: '',
                    SoQuyen:'',
                    maNXB: '',
                    NamXuatBan: '',
                    tacGia: ''
                }
            }
        },
        methods: {
            async addBook(formData) {
                try {
                    // for (const [key, value] of formData.entries()) {
                    //     console.log(`${key}: ${value}`);
                    // }
                    await BookService.create(formData); // Gửi FormData đến server
                    alert("Thêm sách thành công");
                    this.$router.push("/admin/book");
                } catch (e) {
                    console.log("Error adding book:", e);
                    alert("Có lỗi xảy ra khi thêm sách. Vui lòng kiểm tra lại.");
                }
            }
        }
    }
</script>