<template>
    <div v-if="publisher" class="page container">
        <h4 class="text-center mb-4">Thêm nhà xuất bản</h4>
        <div class="card shadow border-0" style="max-width: 500px; margin: auto;"> <!-- Giới hạn chiều rộng của thẻ -->
            <div class="card-body">
                <PublisherForm :publisher="publisher" @submit:publisher="addPublisher" />
            </div>
        </div>
    </div>
</template>

<script>
import PublisherForm from '@/components/publisher/PublisherForm.vue';
import PublisherService from '@/services/publisher.service';

export default {
    components: {
        PublisherForm,
    },
    data() {
        return {
            publisher: {
                tenNXB: '',
                diachiNXB: '',
            }
        }
    },
    methods: {
        async addPublisher(data) {
            try {
                await PublisherService.create(data);
                alert("Thêm nhà xuất bản thành công");
                this.$router.push("/admin/publisher");
            } catch (e) {
                console.log(e);
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    }
}
</script>

<style scoped>
.page {
    padding: 40px 20px; /* Tăng padding cho trang */
    background-color: #f8f9fa; /* Màu nền nhẹ */
    min-height: 100vh; /* Đảm bảo chiều cao tối thiểu */
}

.card {
    border-radius: 10px; /* Bo tròn góc cho thẻ */
    transition: transform 0.3s; /* Hiệu ứng chuyển động */
}

.card:hover {
    transform: scale(1.02); /* Hiệu ứng phóng to khi hover */
}

.card-body {
    padding: 30px; /* Tăng khoảng cách bên trong thẻ */
}

h4 {
    font-weight: bold; /* Đậm tiêu đề */
    color: #343a40; /* Màu chữ tiêu đề */
}

.text-center {
    margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
}

button {
    margin-top: 10px; /* Khoảng cách giữa các nút */
    transition: background-color 0.3s, transform 0.2s; /* Hiệu ứng chuyển động cho nút */
}

button:hover {
    transform: translateY(-2px); /* Nhấc lên nhẹ khi hover */
}
</style>