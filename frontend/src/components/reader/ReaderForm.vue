<template>
    <div class="row justify-content-center">
        <Form @submit="submitReader" :validation-schema="readerFormSchema" class="form-reader">
            <div class="mb-2">
                <label for="HoLot" class="form-label">Họ lót</label>
                <Field name="HoLot" type="text" class="form-control" v-model="readerLocal.HoLot" />
                <ErrorMessage name="HoLot" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="Ten" class="form-label">Tên</label>
                <Field name="Ten" type="text" class="form-control" v-model="readerLocal.Ten" />
                <ErrorMessage name="Ten" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="NgaySinh" class="form-label">Ngày sinh</label>
                <Field name="NgaySinh" type="date" class="form-control" v-model="readerLocal.NgaySinh" :max="currentDate" />
                <ErrorMessage name="NgaySinh" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="Phai" class="form-label">Giới tính</label>
                <select name="Phai" class="form-select" v-model="readerLocal.Phai" >
                    <option value="None">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
                <ErrorMessage name="Phai" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="DiaChi" class="form-label">Địa chỉ</label>
                <Field name="DiaChi" type="text" class="form-control" v-model="readerLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="DienThoai" class="form-label">Điện thoại</label>
                <Field name="DienThoai" type="text" class="form-control" v-model="readerLocal.DienThoai" />
                <ErrorMessage name="DienThoai" class="error-feedback" />
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-info">Submit</button>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:reader"],
    props: {
        reader: { type: Object, required: true }
    },
    data() {
        const readerFormSchema = yup.object().shape({
            HoLot: yup.string().required("Họ lót phải có giá trị."),
            Ten: yup.string().required("Tên phải có giá trị."),
            NgaySinh: yup.date().required("Vui lòng chọn ngày sinh."),
            Phai: yup
                .string()
                .oneOf(["Nam", "Nữ"], "Giới tính phải là 'Nam' hoặc 'Nữ'."),
            DiaChi: yup.string().required("Địa chỉ không được để trống."),
            DienThoai: yup.string().required("Điện thoại không được để trống.")
                .matches(/^[0-9]+$/, "Điện thoại phải là số.")
                .min(10, "Điện thoại phải có ít nhất 10 số.")
                .max(15, "Điện thoại không thể dài hơn 15 số."),
        });

        return {
            readerLocal: this.reader,
            readerFormSchema,
            currentDate: new Date().toISOString().split('T')[0]
        };
    },
    methods: {
        submitReader() {
            this.$emit("submit:reader", this.readerLocal);
        }
    },
};
</script>

<style scoped>
.form-reader {
    max-width: 600px;
}
.error-feedback {
    color: red;
}
label {
    font-weight: bold;
}
</style>