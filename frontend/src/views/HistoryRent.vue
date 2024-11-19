<template>
    <div class="container mt-4">
      <h2 class="mb-4 text-center">Lịch Sử Mượn Sách</h2>
      <div class="card">
        <div class="card-body">
          <div v-if="historyItems.length === 0" class="text-center">
            <p>Chưa có lịch sử mượn sách nào.</p>
          </div>
          <div v-else>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Hình Ảnh</th>
                  <th>Tên Sách</th>
                  <th>Số Lượng</th>
                  <th>Trạng Thái</th>
                  <th>Ngày Mượn</th>
                  <th>Ngày Trả</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in historyItems" :key="index">
                  <td>
                    <img :src="`http://localhost:3005/${item.imagePath}`" alt="Hình ảnh sách"  style="width: 80px; height: auto;">
                  </td>
                  <td>{{ item.TenSach }}</td>
                  <td>1</td>
                  <td>
                    <span :class="getStatusClass(item.TrangThai)">
                      {{ item.TrangThai }}
                    </span>
                  </td>
                  <td>{{ item.NgayMuon }}</td>
                  <td>{{ item.NgayTra }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
    import trackbookrentService from '@/services/trackbookrent.service';
    import readerService from '@/services/reader.service';
    import bookService from '@/services/book.service';
    export default {
        data() {
            return {
                historyItems: [
                    
                ]
            };
        },
        created(){
            this.retriveHistory();
        },
        methods: {
            async retriveHistory(){
                var reader = await readerService.get(localStorage.getItem('userPhone'));
                this.historyItems = await trackbookrentService.getByUser(reader.MaDocGia);
                for (let i=0; i<this.historyItems.length; i++){
                    const book = await bookService.get(this.historyItems[i].MaSach);
                    this.historyItems[i].TenSach = book.TenSach
                    this.historyItems[i].imagePath = book.imagePath
                }
            },
            getStatusClass(status) {
            return {
                'text-success': status === 'Đã trả',
                'text-danger': status === 'Chưa trả'
            };
            },
            formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
            }
        }
    };
</script>
  
<style scoped>
    .container {
    max-width: 900px;
    margin: auto;
    }
    .table {
    margin-top: 20px;
    }
    .text-success {
    color: green;
    }
    .text-danger {
    color: red;
    }
    .img-thumbnail {
    border: 1px solid #e0e0e0; /* Thêm viền cho hình ảnh */
}
</style>