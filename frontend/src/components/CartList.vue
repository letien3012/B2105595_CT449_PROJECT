<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-4">GIỎ HÀNG CỦA BẠN</h5>
      <!-- Danh sách sản phẩm -->
      <div v-for="(item, index) in cartItems" :key="index" class="d-flex align-items-center mb-3 border-bottom pb-3">
        <img :src="`http://localhost:3005/${item.imagePath}`" alt="Sách" class="me-3" style="width: 80px; height: auto; margin-right: 20px;">
        <div class="flex-grow-1">
          <h6 class="mb-1">{{ item.TenSach }}</h6>
          <div class="d-flex align-items-center mt-2">
            <label class="me-2">Số lượng:</label>
            <input
              type="number"
              v-model.number="item.quantity"
              class="form-control form-control-sm w-25 me-2"
              min="1"
              max="1"
              readonly
            />
            <button class="btn btn-danger btn-sm" @click="removeItem(index)">Xóa</button>
          </div>
          <div class="mt-2">
            <strong>Ngày mượn:</strong> {{ item.borrowDate }} <br>
            <strong>Ngày trả:</strong> {{ item.returnDate }}
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button class="btn btn-primary" @click="proceedToCheckout">Đăng ký mượn sách</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: Array
  },
  methods: {
    removeItem(index) {
      this.$emit('remove-item', index);
    },
    updateQuantity(index) {
      this.$emit('update-quantity', index);
    },
    proceedToCheckout() {
      this.$emit('orderbook'); // Phát ra sự kiện khi tiến hành thanh toán
    }
  },
  mounted() {
    // Đặt số lượng mặc định là 1 cho tất cả sản phẩm trong giỏ hàng
    this.cartItems.forEach(item => {
      item.quantity = 1;
    });
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
}
</style>