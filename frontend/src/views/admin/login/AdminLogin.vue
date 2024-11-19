<template>
    <div class="container w-50 mt-5">
        <form @submit.prevent="handleSubmit">
            <h2 class="text-center mb-4">Đăng Nhập Quản Trị</h2>
            <div class="mb-3">
                <label for="manv" class="form-label">Mã nhân viên</label>
                <input type="text" v-model="MSNV" class="form-control" id="manv" placeholder="Nhập mã nhân viên" required />
            </div>
            <div class="mb-3">
                <label for="pwd" class="form-label">Mật khẩu</label>
                <input type="password" v-model="Password" class="form-control" id="pwd" placeholder="Nhập mật khẩu" required />
            </div>
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
        </form>
    </div>
</template>

<script>
import adminloginService from '@/services/adminlogin.service';
export default {
    data() {
        return {
            MSNV: '',
            Password: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleSubmit() {
            const data = {
                MSNV: this.MSNV,
                Password: this.Password
            };
            try {
                const response = await adminloginService.login(data);
                
                // Kiểm tra nếu đăng nhập thành công
                if (response && response.success) { 
                    localStorage.setItem('token', response.token);
                    // alert(response.message);
                    this.$router.push("/admin");
                } 
            } catch (error) {
                this.errorMessage = 'Mã nhân viên hoặc mật khẩu không đúng!';
                console.error(error); // Ghi lại lỗi để kiểm tra
            }
        }
    }
}
</script>

<style scoped>
    .container {
        background-color: #f8f9fa; /* Màu nền nhẹ */
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h2 {
        color: #343a40; /* Màu tiêu đề */
    }

    .btn-primary {
        background-color: #007bff; /* Màu nút */
        border: none;
    }

    .btn-primary:hover {
        background-color: #0056b3; /* Màu nút khi hover */
    }

    .alert {
        margin-top: 10px;
    }
</style>