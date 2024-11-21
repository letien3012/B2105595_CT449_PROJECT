<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered shadow-sm">
            <thead class="thead-dark">
                <tr>
                    <th>Mã sách</th>
                    <th>Mã độc giả</th>
                    <th>Ngày mượn</th>
                    <th>Ngày trả</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(trackBook, index) in trackBooks" :key="trackBook._id" @click="updateActiveIndex(index)" class="table-row">
                    <td>{{ trackBook.MaSach }}</td>
                    <td>{{ trackBook.MaDocGia }}</td>
                    <td>{{ trackBook.NgayMuon }}</td>
                    <td>{{ trackBook.NgayTra }}</td>
                    <td>{{ trackBook.TrangThai }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink :to="{ name: 'trackbookrent.edit', params: { id: trackBook._id } }">
                                <button class="btn btn-sm btn-warning" title="Sửa">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="deleteTrackBook(trackBook._id)" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<!-- <script>
export default {
    props: {
        trackBooks: { type: Array, default: () => [] },
    },
    emits: ["delete:trackbook"],
    methods: {
        deleteTrackBook(trackBookId) {
            this.$emit("delete:trackbook", trackBookId);
        },
    }
};
</script> -->
<script>
import trackbookrentService from '@/services/trackbookrent.service';
export default {
    props: {
        trackBooks: { type: Array, default: () => [] },
    },
    emits: ["delete:trackbook"],
    methods: {
        async updateTrackBookStatus() {
            // Lấy danh sách sách cần cập nhật trạng thái
            const trackBooksToUpdate = this.trackBooks.filter((trackBook) => {
                if (trackBook.TrangThai == 'Trễ hạn'){
                    return false;
                }
                // Kiểm tra nếu sách đã trễ hạn
                const dueDate = new Date(trackBook.NgayTra);
                const currentDate = new Date();
                if (dueDate < currentDate ) {
                    return true;
                }
                return false;
            });

            // Cập nhật trạng thái sách đã trễ hạn
            for (const trackBook of trackBooksToUpdate) {
                try {
                    await trackbookrentService.update(trackBook._id, {TrangThai: 'Trễ hạn'});
                    console.log('keke')
                    console.log(`Cập nhật trạng thái sách ${trackBook.MaSach} thành đã trễ hạn`);
                } catch (error) {
                    console.error(`Lỗi cập nhật trạng thái sách ${trackBook.MaSach}: ${error}`);
                }
            }
        },
        deleteTrackBook(trackBookId) {
            this.$emit("delete:trackbook", trackBookId);
        },
    },
    mounted() {
        // Tự động cập nhật trạng thái sách mỗi 1 giờ
        setInterval(this.updateTrackBookStatus, 3600000); // 3600000 = 1 giờ
    },
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
