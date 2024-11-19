<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 50vh;">
    <div class="w-50">
      <h5 class="mb-4 text-center">Đăng nhập</h5>
      <form @submit.prevent="login" class="bg-light p-3 rounded shadow-sm">
        <div class="mb-2">
          <label for="phone" class="form-label">Số điện thoại</label>
          <input type="text" id="phone" v-model="formUserData.DienThoai" class="form-control form-control-sm" placeholder="Nhập số điện thoại" required>
        </div>
        <div class="mb-2">
          <label for="dob" class="form-label">Mật khẩu</label>
          <input type="pwd" id="dob" v-model="formUserData.MatKhau" class="form-control form-control-sm" placeholder="Nhập mật khẩu" required>
        </div>
        <button type="submit" class="btn btn-warning w-100 btn-sm">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>
<script>
import readerService from '@/services/reader.service';
export default {
    data() {
        return {
        formUserData: {}
        };
    },
    methods: {
        async login() {
            try {
                const response = await readerService.login(this.formUserData);
                if (response && response.success) { 
                    localStorage.setItem('userPhone', response.docgia.DienThoai)
                    localStorage.setItem('usertoken', response.token);
                    this.$router.push('/');
                    // window.location.reload();
                } 
            } catch (error) {
                this.errorMessage = 'Số điện thoại hoặc mật khẩu không đúng!';
                console.error(error); 
            }
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