<template>
    <div class="page container-fluid">
        <div class="row justify-content-center">
            <InputSearch v-model="searchText" />
        </div>
  
        <div class="mt-3">
            <h4>
                Tất cả giao dịch mượn sách
            </h4>
            <TrackBookRentList v-if="filteredBookRentCount > 0" :trackBooks="filteredBookRents" @delete:trackbook="deleteBookRent"/>
            <p v-else>Không có giao dịch mượn sách nào.</p>
            <div class="mt-3 justify-content-start align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddBookRent">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllBookRents">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
  </template>
  
  <script> 
  import InputSearch from "@/components/InputSearch.vue";
  import BookRentService from "@/services/trackbookrent.service"; 
  import TrackBookRentList from "@/components/trackbookrent/TrackBookRentList.vue";
  export default {
    components: {
        InputSearch,
        TrackBookRentList
    },
    data() {
        return {
            trackBooks: [],
            searchText: ""
        };
    },
    computed: {
        bookRentStrings() {
            return this.trackBooks.map((trackBook) => {
                const { MaSach, MaDocGia, NgayMuon, NgayTra, TrangThai } = trackBook;
                return [MaSach, MaDocGia, NgayMuon, NgayTra, TrangThai].join("");
            });
        },
        filteredBookRents() {
            if (!this.searchText) return this.trackBooks;
            return this.trackBooks.filter((_trackBook, index) => this.bookRentStrings[index].includes(this.searchText));
        },
        filteredBookRentCount() {
            return this.filteredBookRents.length;
        }
    },
    methods: {
        async retrieveBookRents() {
            try {
                this.trackBooks = await BookRentService.getAll(); 
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBookRents();
        },
        async removeAllBookRents() {
            if (confirm("Bạn muốn xóa tất cả giao dịch mượn sách?")) {
                try {
                    await BookRentService.deleteAll(); 
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddBookRent() {
            this.$router.push({ name: "trackbookrent.add" }); 
        },
        async deleteBookRent(bookRentId) {
            if (confirm("Bạn muốn xóa giao dịch mượn sách này?")) {
                try {
                    await BookRentService.delete(bookRentId); 
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    mounted() {
        this.refreshList(); 
    }
  };
  </script>
  
  <style scoped>
  .page {
    text-align: left;
  }
  button {
    margin-right: 10px;
  }
  </style>