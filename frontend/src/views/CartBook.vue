<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <CartList 
          :cartItems="cartItems" 
          @update-local-storage="updateLocalStorage" 
          @remove-item="removeItem" 
          @orderbook="OrderBook"
        />
      </div>
      <!-- <div class="col-md-6">
        <UserInfo 
          :formUserData="formUserData" 
          @orderbook="OrderBook" 
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import CartList from '@/components/CartList.vue';
import UserInfo from '@/components/UserInfo.vue';
import BookService from '@/services/book.service';
import readerService from '@/services/reader.service';
import trackbookrentService from '@/services/trackbookrent.service';
export default {
  components: {
    CartList,
    UserInfo
  },
  data() {
    return {
      cartItems: [],
      // formUserData: {
      //   HoLot: '',
      //   Ten: '',
      //   DienThoai: '',
      //   NgaySinh: '',
      //   Phai: '',
      //   DiaChi: '',
      //   Email: ''
      // }
    };
  },
  methods: {
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.updateLocalStorage();
    },
    // updateQuantity(index) {
    //   // Cập nhật số lượng và đảm bảo không vượt quá giới hạn
    //   if (this.cartItems[index].quantity < 1 || this.cartItems[index].quantity > 1) {
    //     this.cartItems[index].quantity = 1;
    //   } 
    //   this.updateLocalStorage();
    // },
    updateLocalStorage() {
      // Cập nhật giỏ hàng trong localStorage
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    loadCartItems() {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }
    },
    async OrderBook() {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }

      // Kiểm tra số lượng sách có đủ không
      // for (let i = 0; i < this.cartItems.length; i++) {
      //   let MaSach = this.cartItems[i].id;
      //   const bookCheck = await BookService.get(MaSach);
      //   if (bookCheck.SoQuyen < 1) {
      //     alert(`Số quyển ${this.cartItems[i].TenSach} không đủ`);
      //     return; 
      //   }
      // }
      console.log(localStorage.getItem('userPhone'))
      var reader = await readerService.get(localStorage.getItem('userPhone'));
      for (let i = 0; i < this.cartItems.length; i++) {
        let MaSach = this.cartItems[i].id;
        const bookCheck = await BookService.get(MaSach);
        bookCheck.SoQuyen --; 
        const formData = new FormData();
        formData.append('bookData', JSON.stringify(bookCheck));
        const bookrent = { MaSach: MaSach, NgayMuon: this.cartItems[i].borrowDate, NgayTra: this.cartItems[i].returnDate, MaDocGia: reader.MaDocGia, TrangThai: 'Chờ xác nhận', };
        try {
          await trackbookrentService.create(bookrent);
          await BookService.update(MaSach, formData);
        } catch (error) {
          console.error(`Cập nhật sách ${MaSach} thất bại:`, error);
          alert(`Có lỗi xảy ra khi cập nhật sách ${this.cartItems[i].TenSach}.`);
          return;
        }
      }
      localStorage.removeItem('cart');

      // Thông báo đặt hàng thành công
      alert("Đăng ký mượn sách thành công!");
      window.location.reload();
    }
  },
  created() {
    this.loadCartItems(); // Gọi hàm để tải giỏ hàng khi component được tạo
  }
};
</script>