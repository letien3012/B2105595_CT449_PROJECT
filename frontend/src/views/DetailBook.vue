<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Cột ảnh bìa sách -->
      <div class="col-md-4 text-center">
        <img :src="`http://localhost:3005/${book.imagePath}`" alt="Book Cover" class="book-image mb-3">
      </div>

      <!-- Cột thông tin sách -->
      <div class="col-md-5">
        <h1 class="h4">{{ book.TenSach }}</h1>
        <p class="price">Giá {{ book.DonGia }} vnđ </p>
        <div class="d-flex align-items-center mt-4">
          <label class="me-2">Số lượng:</label>
          <button class="btn btn-outline-secondary" @click="decreaseQuantity">-</button>
          <input type="number" class="form-control w-25 text-center mx-2" v-model.number="quantity" min="1"max="5">
          <button class="btn btn-outline-secondary" @click="increaseQuantity">+</button>
        </div>
        <!-- Ngày mượn và ngày trả -->
        <div class="mt-4">
          <label for="borrowDate">Ngày mượn:</label>
          <input id="borrowDate" type="date" v-model="borrowDate" :min="minDate" @change="setDateRestrictions" class="form-control">
          <label for="returnDate" class="mt-2">Ngày trả:</label>
          <input id="returnDate" type="date" v-model="returnDate" :min="borrowDate" :max="maxReturnDate"class="form-control">
        </div>
        <button class="btn btn-buy w-100 mt-3">Mượn sách</button>
      </div>
      <!-- Cột chi tiết sách -->
      <div class="col-md-3">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th colspan="2" class="text-center">Chi tiết sách</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Tác giả</th>
              <td>{{ book.tacGia }}</td>
            </tr>
            <tr>
              <th>Năm xuất bản</th>
              <td>{{ book.NamXuatBan }}</td>
            </tr>
            <tr>
              <th>NXB</th>
              <td>{{ book.tenNXB }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import bookService from '@/services/book.service';
import PublisherService from "@/services/publisher.service";

export default {
  data() {
    return {
      book: {},
      quantity: 1,
      borrowDate: '',  // Ngày mượn
      returnDate: '',  // Ngày trả
      minDate: '',     // Ngày mượn tối thiểu (ngày hiện tại)
      maxReturnDate: '', // Ngày trả tối đa (7 ngày sau ngày mượn)
    };
  },
  props: {
    bookId: { type: String, default: '' }
  },
  created() {
    this.getBookById();
    this.setDateRestrictions();
  },
  methods: {
    async getBookById() {
      try {
        this.book = await bookService.get(this.bookId);
        const publisher = await PublisherService.get(this.book.maNXB);
        this.book.tenNXB = publisher ? publisher.tenNXB : "Không rõ";
      } catch (e) {
        console.log(e);
      }
    },
    setDateRestrictions() {
      const today = new Date();

      // Đặt minDate là ngày hiện tại
      this.minDate = today.toISOString().split('T')[0];

      // Tính maxReturnDate là 7 ngày sau ngày mượn
      if (this.borrowDate) {
        const borrowDateObj = new Date(this.borrowDate);
        const maxReturn = new Date(borrowDateObj);
        maxReturn.setDate(borrowDateObj.getDate() + 7); // Cộng thêm 7 ngày

        this.maxReturnDate = maxReturn.toISOString().split('T')[0];
      }
    },
    increaseQuantity() {
      if (this.quantity<5) this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
  watch: {
    borrowDate(newValue) {
      this.setDateRestrictions();
    }
  }
}
</script>

<style scoped>
  .book-image {
    max-width: 100%;
    height: 400px;
    object-fit: cover;  
  }
  .price {
    font-size: 24px;
    font-weight: bold;
    color: orange;
  }
  .old-price {
    text-decoration: line-through;
    color: gray;
  }
  .discount {
    color: red;
    font-size: 14px;
    font-weight: bold;
  }
  .btn-buy {
    background-color: orange;
    color: white;
    font-weight: bold;
  }
  .btn-buy:hover {
    background-color: darkorange;
  }
  .table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }

  th, td {
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  td {
    background-color: #ffffff;
  }

  table thead th {
    border-top: 2px solid #dee2e6;
  }

  table tbody tr:nth-child(odd) td {
    background-color: #f2f2f2;
  }

  table tbody tr:nth-child(even) td {
    background-color: #fafafa;
  }

  table td, table th {
    border: 1px solid #dee2e6;
  }
</style>
