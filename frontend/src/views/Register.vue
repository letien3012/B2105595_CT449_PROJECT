<template>
    <UserInfo :formUserData="formUserData" @submit:form="submitForm" ></UserInfo>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import readerService from '@/services/reader.service';
export default{
    data() {
        return {
        formUserData: {
            HoLot: '',
            Ten: '',
            DienThoai: '',
            NgaySinh: '',
            Phai: '',
            DiaChi: '',
            Email: '',
            MatKhau: ''
        }
        };
    },
    components: {
        UserInfo
    },
    methods: {
        async submitForm() {
            await readerService.create(this.formUserData);
            this.$router.push("/login")
        }
    }
}
</script>