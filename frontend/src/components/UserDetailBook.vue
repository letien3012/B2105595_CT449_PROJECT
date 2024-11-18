<template>
  <div class="container mt-5">
 <div class="row">
   <!-- Cột ảnh bìa sách -->
   <div class="col-md-4 text-center">
     <img src="../assets//images/nha-gia-kim.png" alt="Book Cover" class="book-image mb-3">
     <div class="d-flex justify-content-between">
     </div>
   </div>

   <!-- Cột thông tin sách -->
   <div class="col-md-5">
     <h1 class="h4">Dầu và Máu</h1>
     <p class="price">199.200đ </p>
     <h6 class="mt-4">KHUYẾN MÃI & ƯU ĐÃI</h6>
     <ul>
       <li>Cơ hội để hiểu rõ hơn về những sức mạnh và mâu thuẫn địa chính trị đang định hình thế giới xung quanh.</li>
       <li>Văn phong dễ hiểu, lôi cuốn, phù hợp với mọi độc giả.</li>
       <li>Cẩm nang chứa đựng ý nghĩa địa chính trị, địa chiến lược và chính trị của Ả Rập.</li>
     </ul>
     <div class="d-flex align-items-center mt-4">
       <label class="me-2">Số lượng:</label>
       <button class="btn btn-outline-secondary">-</button>
       <input type="text" class="form-control w-25 text-center mx-2" value="1">
       <button class="btn btn-outline-secondary">+</button>
     </div>
     <button class="btn btn-buy w-100 mt-3">CHỌN MUA</button>
   </div>

   <!-- Cột chi tiết sách -->
   <div class="col-md-3">
     <table class="table">
       <tr>
         <th>Tác giả</th>
         <td>Bradley Hope, Justin Scheck</td>
       </tr>
       <tr>
         <th>Người Dịch</th>
         <td>Phương Anh, Kiên Lưu</td>
       </tr>
       <tr>
         <th>NXB</th>
         <td>NXB Thế Giới</td>
       </tr>
       <tr>
         <th>Kích Thước</th>
         <td>16 x 24 cm</td>
       </tr>
       <tr>
         <th>Số trang</th>
         <td>378</td>
       </tr>
       <tr>
         <th>Hình thức</th>
         <td>Bìa cứng áo ôm</td>
       </tr>
     </table>
   </div>
 </div>
</div>
</template>
<style scoped>
 .book-image {
   max-width: 100%;
   height: auto;
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
</style>