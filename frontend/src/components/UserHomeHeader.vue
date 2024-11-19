<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm rounded">
    <a class="navbar-brand d-flex align-items-center justify-content-center" href="/">
      <img src="../assets/images/logo_user-home.jpg" alt="Logo" class="d-inline-block align-top rounded-circle" />
      Thư viện trực tuyến
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Trang Chủ <span class="sr-only"></span></a>
        </li>
        <!-- Thêm biểu tượng giỏ hàng -->
        <li class="nav-item">
          <a class="nav-link" href="/cartbook">
            <i class="fas fa-shopping-cart"></i> Giỏ sách
          </a>
        </li>
        <!-- Hiển thị nút Đăng ký và Đăng nhập nếu chưa đăng nhập -->
        <li class="nav-item" v-if="!isLoggedIn">
          <a class="nav-link" href="/register">Đăng Ký</a>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <a class="nav-link" href="/login">Đăng Nhập</a>
        </li>
        <!-- Hiển thị nút Đăng xuất nếu đã đăng nhập -->
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link" href="/historyrent" >Lịch sử mượn sách</a>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link" @click="logout">Đăng xuất</a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0 d-flex m-2">
        <input class="form-control flex-grow-1" type="search" placeholder="Tìm kiếm" aria-label="Search">
        <button class="btn btn-outline-primary my-2 my-sm-0 ms-2" type="submit">Tìm</button>
      </form> -->
    </div>
    <div class="column">
      <div class="d-flex align-items-center">
        <i class="fas fa-phone-alt me-2"></i>
        <span>Thông tin liên hệ: <strong>+1234567890</strong></span>
      </div>
      <div class="d-flex align-items-center">
        <i class="fas fa-envelope me-2"></i>
        <span>Email: <strong>info@ctu.edu.vn</strong></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false // Khởi tạo trạng thái đăng nhập
    };
  },
  created() {
    this.checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi component được tạo
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('usertoken');
    },
    logout() {
      localStorage.removeItem('usertoken');
      localStorage.removeItem('userPhone');
      this.isLoggedIn = false; 
      this.$router.push('/'); 
      window.location.reload();
    }
  }
};
</script>

<style scoped>
  /* Các style khác của bạn */
  .navbar {
    background-color: #ffffff; /* Màu nền của navbar */
    padding: 0.8rem 1.5rem; /* Thêm padding cho navbar */
    border-radius: 8px; /* Góc bo tròn */
    transition: background-color 0.3s ease; /* Hiệu ứng chuyển màu nền */
  }

  .navbar:hover {
    background-color: #f8f9fa; /* Màu nền khi di chuột qua navbar */
  }

  .navbar-brand img {
    margin-right: 15px;
    max-height: 80px; /* Tăng khoảng cách giữa logo và tiêu đề */
    max-width: 80px; /* Giới hạn kích thước logo */
  }

  .navbar-nav {
    font-weight: 500; /* Đậm một chút cho các liên kết điều hướng */
  }

  .nav-link {
    transition: color 0.3s ease, transform 0.3s ease; /* Hiệu ứng chuyển màu và phóng to */
  }

  .nav-link:hover {
    color: #007bff; /* Thay đổi màu liên kết khi di chuột qua */
    transform: scale(1.1); /* Hiệu ứng phóng to nhẹ */
  }

  .form-control {
    border-radius: 25px; /* Góc bo tròn cho ô tìm kiếm */
    padding-left: 20px; /* Thêm padding bên trái */
    border: 1px solid #ced4da; /* Đường viền cho ô tìm kiếm */
  }

  .btn-outline-primary {
    border-radius: 25px; /* Góc bo tròn cho nút */
    transition: background-color 0.3s ease, color 0.3s ease; /* Hiệu ứng chuyển màu nền và chữ */
  }

  .btn-outline-primary:hover {
    background-color: #007bff; /* Màu nền thay đổi */
    color: white; /* Màu chữ khi di chuột qua */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ khi di chuột qua */
  }

  .navbar-toggler {
    border: none; /* Xóa đường viền cho nút toggler */
  }

  .navbar-toggler-icon {
    background-color: #007bff; /* Thay đổi màu cho biểu tượng toggler */
    border-radius: 5px; /* Bo tròn cho biểu tượng toggler */
  }
</style>