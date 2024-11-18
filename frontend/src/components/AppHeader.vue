<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-info">
        <div class="container">
            <div class="col-md-2 text-center">
                <a href="/admin"><img src="../assets/logo_page.jpg" alt="logo" class="rounded-circle" style="height: 70px; width: 70px;" ></a>
            </div>
            <div class="col text-center">
                <h2 class="text-white">TRANG QUẢN TRỊ VIÊN</h2>
                <div class="row text-center">
                    <div class="col">
                        <a href="/admin/publisher" class="nav-link">Quản lý nhà xuất bản</a>
                    </div>
                    <div class="col">
                        <a href="/admin/book" class="nav-link">Quản lý sách</a>
                    </div>
                    <div class="col">
                        <a href="/admin/reader" class="nav-link">Quản lý đọc giả</a>
                    </div>
                    <div class="col">
                        <a href="/admin/trackbookrent" class="nav-link">Theo dõi mượn sách</a>
                    </div>
                </div>
            </div>
            <div class="col-md-2 position-relative" style="height: 10vh;">
                <button @click="logout" class="btn btn-danger position-absolute bottom-0 end-0" style="bottom: 0px; right: 0px;">Đăng xuất</button> 
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        methods: {
            logout() {
                localStorage.removeItem('token');
                this.$router.push('/admin/login'); // Chuyển hướng về trang đăng nhập
            }
        }
    };
</script>
<style lang="css" scoped>
    .nav-link {
        text-align: center;
        text-decoration: none; /* Bỏ gạch chân */
        color: white; /* Màu chữ trắng */
        transition: color 0.3s, transform 0.3s; /* Thêm hiệu ứng chuyển màu và phóng to */
    }
    .nav-link:hover {
        color: #ffc107; /* Màu vàng khi hover */
        transform: scale(1.1); /* Phóng to một chút khi hover */
    }
    .navbar {
        padding: 1rem; /* Thêm padding cho navbar */
    }
    h2 {
        margin-bottom: 0.5rem; /* Giảm khoảng cách dưới tiêu đề */
    }
    .btn-danger {
        /* Thêm một số kiểu cho nút Đăng xuất nếu cần */
    }
</style>