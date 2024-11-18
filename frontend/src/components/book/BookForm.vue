<template>
    <div class="row justify-content-center my-5">
        <div class="col-md-8 col-lg-6">
            <Form @submit="submitBook" :validation-schema="bookFormSchema" class="border rounded-3 p-4 shadow-sm bg-light">
                <h3 class="text-center mb-4">Thông Tin Sách</h3>
                
                <div class="mb-3">
                    <label for="TenSach" class="form-label">Tên sách</label>
                    <Field name="TenSach" type="text" class="form-control" v-model="bookLocal.TenSach"></Field>
                    <ErrorMessage name="TenSach" class="error-feedback" />
                </div>

                <div class="mb-3">
                    <label for="DonGia" class="form-label">Đơn giá</label>
                    <Field name="DonGia" type="number" class="form-control" v-model="bookLocal.DonGia"></Field>
                    <ErrorMessage name="DonGia" class="error-feedback" />
                </div>

                <div class="mb-3">
                    <label for="SoQuyen" class="form-label">Số quyển</label>
                    <Field name="SoQuyen" type="number" class="form-control" v-model="bookLocal.SoQuyen"></Field>
                    <ErrorMessage name="SoQuyen" class="error-feedback" />
                </div>

                <div class="mb-3">
                    <label for="NamXuatBan" class="form-label">Năm xuất bản</label>
                    <Field name="NamXuatBan" type="date" class="form-control" v-model="bookLocal.NamXuatBan" :max="currentDate"></Field>
                    <ErrorMessage name="NamXuatBan" class="error-feedback" />
                </div>

                <div class="mb-3">
                    <label for="nhaXuatBan" class="form-label">Nhà xuất bản</label>
                    <select
                        id="nhaXuatBan"
                        v-model="bookLocal.maNXB"
                        class="form-select"
                    >
                        <option value="" disabled>Chọn nhà xuất bản</option>
                        <option v-for="publisher in publishers" :key="publisher.maNXB" :value="publisher.maNXB">
                            {{ publisher.tenNXB }}
                        </option>
                    </select>
                    <ErrorMessage name="nhaXuatBan" class="error-feedback" />
                </div>

                <div class="mb-3">
                    <label for="tacGia" class="form-label">Nguồn gốc/ tác giả</label>
                    <Field name="tacGia" type="text" class="form-control" v-model="bookLocal.tacGia"></Field>
                    <ErrorMessage name="tacGia" class="error-feedback" />
                </div>
                <div class="mb-3">
                    <label for="image" name="image" class="form-label">Ảnh bìa</label>
                    <input type="file" class="form-control" id="image" @change="handleImageUpload" accept="image/*" required />
                    <ErrorMessage name="image" class="error-feedback" />
                    <p v-if="bookLocal.imagePath">
                        Hình ảnh đã chọn
                        <img :src="`http://localhost:3005/${bookLocal.imagePath}`" alt="Uploaded Image" style="height: 80px; width: 60px;"/>
                    </p>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-info me-2">Gửi</button>
                    <button type="button" class="btn btn-secondary" @click="Cancel">Thoát</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import PublisherService from "@/services/publisher.service";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:book"],
        props: {
            book: { type: Object, required: true }
        },
        data() {
            const bookFormSchema = yup.object().shape({
                MaSach: '',
                TenSach: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                DonGia: yup
                    .number()
                    .nullable()
                    .transform((value) => (value ? parseFloat(value) : null))
                    .required("Vui lòng nhập giá")
                    .min(10000, "Giá tối thiểu 10000")
                    .max(10000000, "Giá không thể vượt quá 10,000,000."),
                SoQuyen: yup
                    .number()
                    .nullable()
                    .transform((value) => (value ? parseFloat(value) : null))
                    .required("Vui lòng nhập số quyển")
                    .min(1, "Số lượng phải ít nhất là 1.")
                    .max(100, "Số lượng tối đa là 100.")
                    .typeError("Số lượng phải là một số hợp lệ."),
                // nhaXuatBan: yup.string()
                //     .required("Vui lòng chọn nhà xuất bản"),
                NamXuatBan: yup.string()
                    .required("Vui lòng chọn thời gian xuất bản"),
                tacGia: yup.string()
                    .required('Vui lòng nhập nguồn/ tác giả'),
                // image: yup.mixed().required("Vui lòng chọn ảnh bìa"),
            });
            return {
                bookLocal: this.book,
                publishers: [],
                bookFormSchema,
                currentDate: new Date().toISOString().split('T')[0],
                selectedImage: null,
                imageUrl: this.book.imagePath ? this.book.imagePath: '',
            };
        },
        created() {
            this.retrievePublishers();  
        },
        methods: {
            handleImageUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    this.selectedImage = file;
                } else {
                    this.selectedImage = null;
                }
            },
            
            async retrievePublishers() {
                try {
                    this.publishers = await PublisherService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            async submitBook() {
                const formData = new FormData();
                formData.append('image', this.selectedImage);
                formData.append('bookData', JSON.stringify(this.bookLocal));
                // for (const [key, value] of formData.entries()) {
                //     console.log(`${key}: ${value}`);
                // }
                try {
                    // Gửi formData đến server
                    const response = await this.$emit("submit:book", formData);
                    console.log(response); // Xử lý phản hồi từ server
                    // Có thể hiển thị thông báo thành công hoặc chuyển hướng
                } catch (error) {
                    console.log(error);
                    console.error("Error uploading book:", error);
                    // Xử lý lỗi (có thể thông báo cho người dùng)
                }
            },
            Cancel() {
                const reply = window.confirm('Thông tin chưa được lưu. Bạn có chắc muốn thoát?')
                if (!reply) return false;
                else this.$router.push({ name: "book" });
            }
        },
    };
</script>

<style scoped>
    .error-feedback {
        color: red;
        font-size: 0.875em;
    }
</style>
