<template>
    <div class="row justify-content-center" >
        <Form @submit="submitPublisher" :validation-schema="publisherFormSchema" class="form-publisher" >
        <div class="mb-2">
            <label for="tenNXB" class="form-label">Tên nhà xuất bản</label>
            <Field name="tenNXB" type="text" class="form-control" v-model="publisherLocal.tenNXB" ></Field>
            <ErrorMessage name="tenNXB" class="error-feedback" />
        </div>
        <div class="mb-2">
            <label for="diachiNXB" class="form-label">Địa chỉ</label>
            <Field name="diachiNXB" type="text" class="form-control" v-model="publisherLocal.diachiNXB" ></Field>
            <ErrorMessage name="diachiNXB" class="error-feedback" />
        </div>
        <div class="form-group text-center">
            <button type="submit" class="btn btn-info m-1">Gửi</button>
            <button type="button" class="btn btn-secondary m-1" @click="Cancel">Thoát</button>
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
        emits: ["submit:publisher", "delete:contact"],
        props: {
            publisher: { type: Object, required: true }
        },
        data() {
            const publisherFormSchema = yup.object().shape({
                tenNXB: yup
                    .string()
                    .required("Vui lòng nhập tên")
                    .min(5, "Tên phải ít nhất 5 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                diachiNXB: yup.string()
                    .required('Vui lòng nhập địa chỉ')
                    .min(6, "Địa chỉ phải ít nhất 6 ký tự.")
            });
            return {
                publisherLocal: this.publisher,
                publisherFormSchema,
            };
        },
        methods: {
            submitPublisher() {
                this.$emit("submit:publisher", this.publisherLocal);
            },
            Cancel(){
                const reply = window.confirm('Thông tin chưa được lưu. Bạn có chắc muốn thoát?')
                if (!reply) {
                    // stay on the page if
                    // user clicks 'Cancel'
                    return false
                } 
                else this.$router.push({ name: "publisher" });
            }
        },
    };
</script>

<style scoped>
    .form-publisher{
        max-width: 600px;
        min-height: 300px;
    }
    .error-feedback{
        color: red;
    }
    label{
        font-weight: bold;
    }
</style>