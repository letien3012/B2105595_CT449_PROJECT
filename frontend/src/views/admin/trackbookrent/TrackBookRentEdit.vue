<template>
    <div v-if="trackBook" class="page">
        <h4 class="row justify-content-center">Hiệu chỉnh thông tin giao dịch mượn sách</h4>
        <BookRentForm :trackBook="trackBook" @submit:trackbook="updateBookRent" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookRentForm from '@/components/trackbookrent/TrackBookRentForm.vue'; 
import BookRentService from '@/services/trackbookrent.service'; 

export default {
    components: {
        BookRentForm
    },
    props: { 
        id: { type: String, required: true }
    },
    data() {
        return {
            trackBook: null,
            message: ''
        };
    },
    methods: {
        async getBookRent(id) {
            try {
                this.trackBook = await BookRentService.get(id); 
                console.log(this.trackBook);
            } catch (e) {
                console.log(e);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split('/').slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash
                });
            }
        },
        async updateBookRent(data) {
            try {
                await BookRentService.update(this.trackBook._id, data); 
                alert("Cập nhật thông tin giao dịch mượn sách thành công");
                this.$router.push("/admin/trackbookrent"); 
            } catch (e) {
                console.log(e);
                alert("Có lỗi xảy ra khi cập nhật thông tin giao dịch mượn sách");
            }
        },
    },
    created() {
        this.getBookRent(this.id); 
        this.message = "";
    }
}
</script>

<style scoped>
.page {
    text-align: left;
}
</style>