<template>
    <table class="table table-striped table-bordered shadow-sm">
        <thead class="thead-dark">
            <tr>
                <th>Mã độc giả</th>
                <th>Họ lót</th>
                <th>Tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Điện thoại</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(reader, index) in readers" :key="reader._id" @click="updateActiveIndex(index)" class="table-row">
                <td>{{ reader.MaDocGia }}</td>
                <td>{{ reader.HoLot }}</td>
                <td>{{ reader.Ten }}</td>
                <td>{{ reader.NgaySinh }}</td>
                <td>{{ reader.Phai }}</td>
                <td>{{ reader.DiaChi }}</td>
                <td>{{ reader.DienThoai }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="{ name: 'reader.edit', params: { id: reader._id } }">
                            <button class="btn btn-sm btn-warning" title="Sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" @click="deleteReader(reader._id)" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        readers: { type: Array, default: () => [] },
    },
    emits: ["delete:reader"],
    methods: {
        deleteReader(readerId) {
            this.$emit("delete:reader", readerId);
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
