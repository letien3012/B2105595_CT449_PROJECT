<template>
    <div v-if="reader" class="page">
        <h4 class="row justify-content-center">Thêm độc giả</h4>
        <ReaderForm :reader="reader" @submit:reader="addReader" />
    </div>
</template>

<script>
import ReaderForm from '@/components/reader/ReaderForm.vue';
import ReaderService from '@/services/reader.service';

export default {
    components: {
        ReaderForm,
    },
    data() {
        return {
            reader: {
                MaDocGia: '', // Thêm thuộc tính MaDocGia
                HoLot: '',
                Ten: '',
                NgaySinh: '',
                Phai: '',
                DiaChi: '',
                DienThoai: ''
            }
        };
    },
    methods: {
        async addReader(data) {
            try {
                await ReaderService.create(data);
                alert("Thêm độc giả thành công");
                this.$router.push("/admin/reader");
            } catch (e) {
                console.log(e);
                alert("Có lỗi xảy ra khi thêm độc giả");
            }
        }
    }
};
</script>

<style scoped>
.page {
    text-align: left;
}
</style>