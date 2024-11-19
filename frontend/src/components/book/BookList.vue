<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered shadow-sm">
            <thead class="thead-dark">
                <tr>
                    <th>Mã sách</th>
                    <th>Tên sách</th>
                    <th>Đơn giá</th>
                    <th>Số quyển</th>
                    <th>Năm xuất bản</th>
                    <th>Nhà xuất bản</th>
                    <th>Hình ảnh</th>
                    <th>Nguồn gốc/ Tác giả</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="book._id" @click="updateActiveIndex(index)" class="table-row">
                    <td>{{ book.MaSach }}</td>
                    <td>{{ book.TenSach }}</td>
                    <td>{{ book.DonGia }}</td>
                    <td>{{ book.SoQuyen }}</td>
                    <td>{{ book.NamXuatBan }}</td>
                    <td>{{ book.tenNXB }}</td>
                    <td class="d-flex justify-content-center"><img :src="`http://localhost:3005/${book.imagePath}`" alt="" style="height: 80px; width: 60px;"></td>
                    <td>{{ book.tacGia }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink :to="{ name: 'book.edit', params: { id: book.MaSach } }">
                                <button class="btn btn-sm btn-warning" title="Sửa">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="deleteBook(book.MaSach)" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        books: { type: Array, default: () => [] },
    },
    emits: ["delete:book"],
    methods: {
        deleteBook(bookId) {
            this.$emit("delete:book", bookId);
        },
        updateActiveIndex(index) {
            // Logic to update active index if needed
        }
    }
};
</script>

<style scoped>
.table-responsive {
    margin: 20px 0;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 15px;
    text-align: left;
}

.table-row {
    transition: background-color 0.3s, transform 0.2s;
}

.table-row:hover {
    background-color: #f8f9fa; /* Màu nền nhẹ khi hover */
    cursor: pointer;
    transform: scale(1.02); /* Hiệu ứng phóng to nhẹ */
}

.btn-group {
    display: flex;
    gap: 5px; /* Khoảng cách giữa các nút */
}

.btn {
    transition: background-color 0.3s, transform 0.2s;
}

.btn-warning:hover {
    background-color: #e0a800; /* Màu nền khi hover */
    transform: translateY(-2px); /* Hiệu ứng nhấc lên nhẹ */
}

.btn-danger:hover {
    background-color: #c82333; /* Màu nền khi hover */
    transform: translateY(-2px); /* Hiệu ứng nhấc lên nhẹ */
}

/* Định dạng cho tiêu đề bảng */
.thead-dark th {
    background-color: #343a40;
    color: white;
}
</style>