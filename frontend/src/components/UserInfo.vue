<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 110vh;">
    <div class="w-50">
      <h5 class="mb-4 text-center">Đăng ký</h5>
      <form @submit.prevent="OrderBook" class="bg-light p-3 rounded shadow-sm">
        <div class="mb-2">
          <label for="firstName" class="form-label">Họ lót</label>
          <input type="text" id="firstName" v-model="formUserData.HoLot" class="form-control form-control-sm" placeholder="Nhập họ lót" required>
        </div>
        <div class="mb-2">
          <label for="lastName" class="form-label">Tên</label>
          <input type="text" id="lastName" v-model="formUserData.Ten" class="form-control form-control-sm" placeholder="Nhập tên" required>
        </div>
        <div class="mb-2">
          <label for="phone" class="form-label">Số điện thoại</label>
          <input type="text" id="phone" v-model="formUserData.DienThoai" class="form-control form-control-sm" placeholder="Nhập số điện thoại" required>
        </div>
        <div class="mb-2">
          <label for="dob" class="form-label">Ngày sinh</label>
          <input type="date" id="dob" v-model="formUserData.NgaySinh" class="form-control form-control-sm" required>
        </div>
        <div class="mb-2">
          <label for="gender" class="form-label">Giới tính</label>
          <select id="gender" v-model="formUserData.Phai" class="form-select form-select-sm" required>
            <option value="" disabled selected>Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="address" class="form-label">Địa chỉ</label>
          <input type="text" id="address" v-model="formUserData.DiaChi" class="form-control form-control-sm" placeholder="Nhập địa chỉ" required>
        </div>
        <div class="mb-2">
          <label for="password" class="form-label">Mật khẩu</label>
          <input type="password" id="password" v-model="formUserData.MatKhau" class="form-control form-control-sm" placeholder="Nhập mật khẩu" required>
        </div>
        <button type="submit" class="btn btn-warning w-100 btn-sm">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formUserData: { type: Object, required: true }
  },
  methods: {
    OrderBook() {
      this.$emit('submit:form');
    }
  }
};
</script>

<style scoped>
/* Style cho container */
.d-flex {
  background-color: #f8f9fa; /* Màu nền cho container */
  padding: 20px; /* Thêm padding cho container */
  border-radius: 10px; /* Bo tròn góc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
}
</style>