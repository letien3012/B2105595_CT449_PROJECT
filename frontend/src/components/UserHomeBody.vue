<template>
    <div class="container my-5">
        <div class="row d-flex justify-content-start" >
            <div class="col-md-2 mb-4" v-for="book in books" :key="book._id" @click="goToDetailBook(book.MaSach)">
                <div class="card shadow-sm border-light rounded">
                    <img :src="`http://localhost:3005/${book.imagePath}`" class="card-img-top rounded" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-center text-primary">{{book.TenSach}}</h5>
                        <a  class="btn btn-primary btn-block rounded-pill">Mượn ngay</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BookService from '@/services/book.service';

export default {
    data(){
        return{
            books: [],
        }
    },
    created() {
        this.retrieveBooks();  
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
                console.log(books);
                // const updatedBooks = await Promise.all(this.books.map(async (book) => {
                //     // const publisher = await PublisherService.get(book.maNXB);
                //     // return {
                //     //     ...book,
                //     //     tenNXB: publisher ? publisher.tenNXB : "Không rõ",  
                //     // };
                // }));
                // this.books = updatedBooks;
            } catch (error) {
                console.log(error);
            }
        },
        goToDetailBook(MaSach) {
            this.$router.push({ name: "detailbook", params: { bookId: MaSach } },);
        }
    }
}
</script>
<style scoped>
    /* Đặt kích thước cố định cho thẻ card */
    .card { 
        transition: transform 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    /* Đặt kích thước cố định cho hình ảnh bên trong card */
    .card-img-top {
        height: 200px; /* Chiều cao cố định */
        width: 100%;   /* Hình ảnh vừa với độ rộng của card */
        object-fit: cover; /* Cắt hình ảnh nếu cần để phù hợp */
    }

    /* Tiêu đề card - Kéo dài tối đa 2 dòng và giữ chiều cao cố định */
    .card-title {
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Giới hạn hiển thị 2 dòng */
        -webkit-box-orient: vertical;
        overflow: hidden; /* Ẩn phần nội dung vượt quá */
        height: 2.5rem; /* Chiều cao cố định để đảm bảo đồng đều */
    }

    /* Văn bản bên trong card */
    .card-text {
        font-size: 0.9rem;
        color: #6c757d;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Giới hạn hiển thị 2 dòng */
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Nút trong card */
    .btn-primary {
        font-weight: bold;
        padding: 10px;
        font-size: 0.9rem;
        display: block;
        text-align: center;
        margin-top: auto; /* Đẩy nút xuống cuối card */
    }

    /* Căn chỉnh card và khoảng cách giữa các card */
    .row .col-md-2 {
        display: flex;
        justify-content: center;
    }
</style>


