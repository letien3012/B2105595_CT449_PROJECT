<template>
  <footer class="footer">
      <div class="container">
          <div class="row justify-content-center text-center">
              <div class="col-md-4">
                  <h5>Thông Tin</h5>
                  <p>© 2024 Your Company. All rights reserved.</p>
                  <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
                  <p>Email: <a href="mailto:contact@yourcompany.com" class="footer-link">contact@yourcompany.com</a></p>
              </div>
              <div class="col-md-4">
                  <h5>Theo Dõi Chúng Tôi</h5>
                  <div class="social-icons">
                      <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                      <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                      <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                      <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                  </div>
              </div>
              <div class="col-md-4">
                  <h5>Liên Kết Nhanh</h5>
                  <ul class="list-unstyled">
                      <li><a href="/about" class="footer-link">Giới thiệu</a></li>
                      <li><a href="/services" class="footer-link">Dịch vụ</a></li>
                      <li><a href="/contact" class="footer-link">Liên hệ</a></li>
                  </ul>
              </div>
          </div>
      </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #dee3e8; /* Màu nền xanh giống header */
  color: #000000; /* Màu chữ trắng */
  padding: 2em 0;
}

.footer h5 {
  margin-bottom: 1em;
  color: #58cbe8; /* Màu vàng cho tiêu đề */
}

.footer p {
  margin: 0.5em 0;
}

.footer .social-icons {
  margin-top: 1em;
}

.social-icon {
  margin: 0 10px;
  color: #000000;
  font-size: 1.5em;
  transition: color 0.3s;
}

.social-icon:hover {
  color: #ffffff; /* Màu vàng khi hover */
}

.footer-link {
  color: #000000;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #ffc107; /* Màu vàng khi hover */
}

.row {
  text-align: center; /* Căn giữa nội dung */
}

.col-md-4 {
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa các thành phần trong mỗi cột */
  justify-content: center;
}
</style>