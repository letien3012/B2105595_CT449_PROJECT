<template>
    <div class="page container-fluid">
        <div class="row justify-content-center">
            <InputSearch v-model="searchText" />
        </div>
  
        <div class="mt-3 text-center"> <!-- Thêm text-center để căn giữa tiêu đề -->
            <h4>Tất cả độc giả</h4>
            <ReaderList v-if="filteredReaderCount > 0" :readers="filteredReader" @delete:reader="deleteReader"/>
            <p v-else>Không có độc giả nào.</p>
        </div>
  
        <div class="mt-3 d-flex"> <!-- Sử dụng d-flex để căn giữa các nút -->
            <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddReader">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button class="btn btn-sm btn-danger" @click="removeAllReaders">
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
    </div>
  </template>
  
  <script>
  import ReaderList from "@/components/reader/ReaderList.vue";
  import InputSearch from "@/components/InputSearch.vue";
  import ReaderService from "@/services/reader.service";
  
  export default {
    components: {
        InputSearch,
        ReaderList
    },
    data() {
        return {
            readers: [],
            searchText: ""
        };
    },
    computed: {
        readerStrings() {
            return this.readers.map((reader) => {
                const { MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = reader;
                return [MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai].join("");
            });
        },
        filteredReader() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) => this.readerStrings[index].includes(this.searchText));
        },
        filteredReaderCount() {
            return this.filteredReader.length;
        }
    },
    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveReaders();
        },
        async removeAllReaders() {
            if (confirm("Bạn muốn xóa tất cả độc giả?")) {
                try {
                    await ReaderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddReader() {
            this.$router.push({ name: "reader.add" });
        },
        async deleteReader(readerId) {
            if (confirm("Bạn muốn xóa độc giả này?")) {
                try {
                    await ReaderService.delete(readerId);
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
    text-align: center; /* Căn giữa tất cả nội dung */
  }
  button {
    margin-right: 10px; /* Khoảng cách giữa các nút */
  }
  </style>