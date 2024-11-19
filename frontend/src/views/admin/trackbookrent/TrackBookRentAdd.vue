<template>
    <div v-if="trackBook" class="page">
        <h4 class="row justify-content-center">Thêm thông tin giao dịch mượn sách</h4>
        <BookRentForm :trackBook="trackBook" @submit:trackbook="addBookRent"/>
    </div>
</template>

<script>
import BookRentForm from '@/components/trackbookrent/TrackBookRentForm.vue'; 
import BookRentService from '@/services/trackbookrent.service'; 

export default {
    components: {
        BookRentForm,
    },
    data() {
        return {
            trackBook: {
                MaSach: '',
                MaDocGia: '',
                NgayMuon: '',
                NgayTra: '',
            }
        }
    },
    methods: {
        async addBookRent(data) {
            try {
                data.TrangThai = 'Đã xác nhận'
                await BookRentService.create(data); 
                alert("Thêm giao dịch mượn sách thành công");
                this.$router.push("/admin/trackbookrent"); // Redirect to the book rental list page
            } catch (e) {
                console.log(e);
                alert("Có lỗi xảy ra khi thêm giao dịch mượn sách");
            }
        }
    }
}
</script>

<style scoped>
.page {
    text-align: left;
}
</style>