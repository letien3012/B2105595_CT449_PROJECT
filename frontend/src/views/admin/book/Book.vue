<template>
  <div class="page container-fluid">
      <div class="row justify-content-center">
          <InputSearch v-model="searchText" />
      </div>

      <div class="mt-3 text-center"> <!-- Thêm text-center để căn giữa tiêu đề -->
          <h4>
              Tất cả sách
          </h4>
          <BookList v-if="filteredBookCount > 0" :books="filteredBook" @delete:book="deleteBook"/>
          <p v-else>Không có quyển sách nào.</p>
      </div>

      <div class="mt-3 d-flex align-items-center"> <!-- Sử dụng d-flex để căn giữa các nút -->
          <button class="btn btn-sm btn-primary" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
          </button>
          <button class="btn btn-sm btn-success" @click="goToAddBook">
              <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button class="btn btn-sm btn-danger" @click="removeAllBooks">
              <i class="fas fa-trash"></i> Xóa tất cả
          </button>
      </div>
  </div>
</template>

<script>
import BookList from "@/components/book/BookList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service.js";
import PublisherService from "@/services/publisher.service";
export default {
  components: {
      InputSearch,
      BookList
  },
  data() {
      return {
          books: [],
          searchText: ""
      };
  },
  computed: {
      bookStrings() {
          return this.books.map((book) => {
              const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, tenNXB, tacGia } = book;
              return [MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, tenNXB, tacGia].join("");
          });
      },
      filteredBook() {
          if (!this.searchText) return this.books;
          return this.books.filter((_book, index) => this.bookStrings[index].includes(this.searchText));
      },
      filteredBookCount() {
          return this.filteredBook.length;
      }
  },
  methods: {
      async retrieveBooks() {
          try {
                this.books = await BookService.getAll();
                const updatedBooks = await Promise.all(this.books.map(async (book) => {
                    const publisher = await PublisherService.get(book.maNXB);
                    return {
                        ...book,
                        tenNXB: publisher ? publisher.tenNXB : "Không rõ",  
                    };
                }));
                this.books = updatedBooks;

          } catch (error) {
              console.log(error);
          }
      },
      refreshList() {
          this.retrieveBooks();
      },
      async removeAllBooks() {
          if (confirm("Bạn muốn xóa tất cả sách?")) {
              try {
                  await BookService.deleteAll();
                  this.refreshList();
              } catch (error) {
                  console.log(error);
              }
          }
      },
      async deleteBook(bookId) {
          if (confirm("Bạn muốn xóa sách này?")) {
              try {
                  await BookService.delete(bookId);
                  this.refreshList();
                  this.$router.push({ name: "book" });
              } catch (error) {
                  console.log(error);
              }
          }
      },
      goToAddBook() {
          this.$router.push({ name: "book.add" });
      }
  },
  mounted() {
      this.refreshList();
  }
};
</script>

<style scoped>
.page {
  text-align: center; /* Căn giữa tất cả nội dung */
}

button {
  margin-right: 10px; /* Khoảng cách giữa các nút */
}
</style>