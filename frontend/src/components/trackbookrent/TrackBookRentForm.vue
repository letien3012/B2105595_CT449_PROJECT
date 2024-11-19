<template>
    <div class="row justify-content-center">
        <Form @submit="submitTrackBook" :validation-schema="trackBookFormSchema" class="form-trackbook">
            <div class="mb-2">
                <label for="MaSach" class="form-label">Chọn sách</label>
                <div class="custom-select-search">
                    <input 
                        type="text" 
                        class="search-box" 
                        v-model="searchBookTerm" 
                        placeholder="Tìm sách..." 
                        @focus="isBookDropdownOpen = true" 
                        @input="filterBooks"
                    />
                    <ul v-if="isBookDropdownOpen" class="options">
                        <li 
                        v-for="book in filteredBooks" 
                        :key="book.MaSach" 
                        @click="selectBook(book)"
                        class="option"
                        >
                        {{ book.TenSach }}
                        </li>
                        <li v-if="filteredBooks.length === 0" class="option disabled">
                        Không tìm thấy sách.
                        </li>
                    </ul>
                </div>
                <ErrorMessage name="MaSach" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="MaDocGia" class="form-label">Chọn độc giả</label>
                <div class="custom-select-search">
                    <input 
                        type="text" 
                        class="search-box" 
                        v-model="searchReaderTerm" 
                        placeholder="Tìm độc giả..." 
                        @focus="isReaderDropdownOpen = true" 
                        @input="filterReaders"
                    />
                    <ul v-if="isReaderDropdownOpen" class="options">
                        <li 
                        v-for="reader in filteredReaders" 
                        :key="reader.MaDocGia" 
                        @click="selectReader(reader)"
                        class="option"
                        >
                        {{ reader.MaDocGia }}
                        </li>
                        <li v-if="filteredReaders.length === 0" class="option disabled">
                        Không tìm thấy độc giả.
                        </li>
                    </ul>
                </div>
                <ErrorMessage name="MaDocGia" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="NgayMuon" class="form-label">Ngày mượn</label>
                <Field name="NgayMuon" type="date" class="form-control" v-model="trackBookLocal.NgayMuon" :min="currentDate" />
                <ErrorMessage name="NgayMuon" class="error-feedback" />
            </div>
            <div class="mb-2">
                <label for="NgayTra" class="form-label">Ngày trả</label>
                <Field name="NgayTra" type="date" class="form-control" v-model="trackBookLocal.NgayTra" :min="trackBookLocal.NgayMuon" :max="maxReturnDate" />
                <ErrorMessage name="NgayTra" class="error-feedback" />
            </div>
            <div class="mb-2" v-if="trackBookLocal.TrangThai">
                <label for="TrangThai" class="form-label">Trạng thái</label>
                <select name="TrangThai" class="form-select" v-model="trackBookLocal.TrangThai" >
                    <option value="Chờ xác nhận" 
                    :disabled="['Chờ xác nhận', 'Đã xác nhận', 'Đã mượn', 'Đã trả', 'Trễ hạn', 'Đã hủy'].includes(trackBookLocal.TrangThai)" >Chờ xác nhận</option>
                    <option value="Đã xác nhận" :disabled="['Đã xác nhận', 'Đã mượn', 'Đã trả','Trễ hạn', 'Đã hủy'].includes(trackBookLocal.TrangThai)" >Đã xác nhận</option>
                    <option value="Đã mượn" :disabled="['Đã mượn', 'Đã trả', 'Trễ hạn', 'Đã hủy'].includes(trackBookLocal.TrangThai)" >Đã mượn</option>
                    <option value="Đã trả" :disabled="['Đã trả','Trễ hạn', 'Đã hủy'].includes(trackBookLocal.TrangThai)" >Đã trả</option>
                    <!-- <option value="Trễ hạn"  >Trễ hạn</option> -->
                    <option value="Đã hủy" >Đã hủy</option>
                </select>
                <ErrorMessage name="TrangThai" class="error-feedback" />
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-info">Gửi</button>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import bookService from "@/services/book.service";
import readerService from "@/services/reader.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:trackbook"],
    props: {
        trackBook: { type: Object, required: true }
    },
    data() {
        const trackBookFormSchema = yup.object().shape({
            MaSach: yup.string(),
            MaDocGia: yup.string(),
            NgayMuon: yup.date().required("Ngày mượn không được để trống.").typeError("Vui lòng chọn ngày"),
 NgayTra: yup
                .date()
                .min(yup.ref("NgayMuon"), "Ngày trả không thể trước ngày mượn.")
                .required("Ngày trả không được để trống.")
                .typeError("Vui lòng chọn ngày"),
            TrangThai: yup
                .string(),
        });

        return {
            trackBookLocal: this.trackBook,
            trackBookFormSchema,
            books: [],
            readers: [],
            currentDate: new Date().toISOString().split('T')[0],
            maxReturnDate: '',
            searchBookTerm: "",
            isBookDropdownOpen: false,
            filteredBooks: [],
            searchReaderTerm: "",
            isReaderDropdownOpen: false,
            filteredReaders: [],
        };
    },
    watch: {
        "trackBookLocal.NgayMuon": function (newDate) {
            if (newDate) {
                const borrowDate = new Date(newDate);
                borrowDate.setDate(borrowDate.getDate() + 7);
                this.maxReturnDate = borrowDate.toISOString().split("T")[0];
            }
        },
        books: {
            handler() {
                this.filteredBooks = [...this.books];
            },
            immediate: true,
        },
        readers: {
            handler() {
                this.filteredReaders = [...this.readers];
            },
            immediate: true,
        },
    },
    created() {
        this.retrieveBooks();  
        this.retrieveReaders();
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await bookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveReaders() {
            try {
                this.readers = await readerService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        submitTrackBook() {
            this.$emit("submit:trackbook", this.trackBookLocal);
        },
        filterBooks() {
            const search = this.searchBookTerm.trim().toLowerCase();
            this.filteredBooks = search ? this.books.filter((book) =>
                book.TenSach.toLowerCase().includes(search)
            ) : [...this.books];
        },
        selectBook(book) {
            this.trackBookLocal.MaSach = book.MaSach;
            this.searchBookTerm = book.TenSach;
            this.isBookDropdownOpen = false;
        },
        filterReaders() {
            const search = this.searchReaderTerm.trim().toLowerCase();
            this.filteredReaders = search ? this.readers.filter((reader) =>
                reader.MaDocGia.toLowerCase().includes(search)
            ) : [...this.readers];
        },
        selectReader(reader) {
            this.trackBookLocal.MaDocGia = reader.MaDocGia;
            this.searchReaderTerm = reader.MaDocGia;
            this.isReaderDropdownOpen = false;
        },
    },
};
</script>

<style scoped>
    .form-trackbook {
        max-width: 600px;
    }
    .error-feedback {
        color: red;
    }
    label {
        font-weight: bold;
    }
    .custom-select-search {
    position: relative;
    width: 100%;
    max-width: 100%;
    }

    .search-box {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    }

    .options {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .option {
    padding: 10px;
    cursor: pointer;
    }

    .option:hover {
    background-color: #007BFF;
    color: #fff;
    }

    .option.disabled {
    color: #888;
    cursor: not-allowed;
    background-color: #f8f9fa;
    }
</style>