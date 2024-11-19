<template>
    <div class="page not-found">
        <div class="container text-center">
            <h1 class="display-4">404</h1>
            <h2 class="mb-4">Oops! Không thể tìm thấy trang.</h2>
            <p class="lead">
                Có vẻ như trang bạn đang tìm kiếm không tồn tại.
            </p>
            <router-link to="/" class="btn btn-primary btn-lg">Trở về trang chủ</router-link>
        </div>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Chiều cao đầy đủ của viewport */
    background-color: #f8f9fa; /* Màu nền nhẹ nhàng */
    text-align: center;
}

.not-found .container {
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff; /* Nền trắng cho khung thông báo */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Đổ bóng cho khung */
}

.display-4 {
    font-size: 6rem; /* Kích thước chữ lớn cho mã lỗi */
    font-weight: bold;
    color: #dc3545; /* Màu đỏ cho mã lỗi */
}

h2 {
    font-size: 2rem; /* Kích thước chữ cho tiêu đề */
    color: #343a40; /* Màu chữ tối */
}

.lead {
    font-size: 1.25rem; /* Kích thước chữ cho mô tả */
    color: #6c757d; /* Màu chữ nhạt hơn */
}

.btn {
    margin-top: 20px; /* Khoảng cách trên nút */
    padding: 10px 20px; /* Padding cho nút */
    border-radius: 25px; /* Bo tròn cho nút */
}
</style>