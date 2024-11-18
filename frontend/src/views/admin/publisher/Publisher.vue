<template>
  <div class="page container-fluid">
    <div class="row justify-content-center">
      <InputSearch v-model="searchText" />
    </div>

    <div class="mt-4">
      <h4 class="text-center">Tất cả nhà xuất bản</h4>
      <PublisherList v-if="filteredPublisherCount > 0" :publishers="filteredPublisher" @delete:publisher="deletePublisher" />
      <p v-else class="text-center">Không có nhà xuất bản nào.</p>
      
      <div class="mt-3 d-flex justify-content-start align-items-center">
        <button class="btn btn-sm btn-primary me-2" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success me-2" @click="goToAddPublisher">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllPublishers">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PublisherList from "@/components/publisher/PublisherList.vue";
import InputSearch from "@/components/InputSearch.vue";
import PublisherService from "@/services/publisher.service";

export default {
  components: {
    InputSearch,
    PublisherList
  },
  data() {
    return {
      publishers: [],
      searchText: ""
    };
  },
  computed: {
    publisherStrings() {
      return this.publishers.map((publisher) => {
        const { maNXB, tenNXB, diachiNXB } = publisher;
        return [maNXB, tenNXB, diachiNXB].join("");
      });
    },
    filteredPublisher() {
      if (!this.searchText) return this.publishers;
      return this.publishers.filter((_publisher, index) => this.publisherStrings[index].includes(this.searchText));
    },
    filteredPublisherCount() {
      return this.filteredPublisher.length;
    }
  },
  methods: {
    async retrievePublishers() {
      try {
        this.publishers = await PublisherService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrievePublishers();
    },
    async removeAllPublishers() {
      if (confirm("Bạn muốn xóa tất cả nhà xuất bản?")) {
        try {
          await PublisherService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deletePublisher(publisherId) {
      if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          await PublisherService.delete(publisherId);
          this.refreshList();
          this.$router.push({ name: "publisher" });
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddPublisher() {
      this.$router.push({ name: "publisher.add" });
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
  padding: 20px; /* Tăng khoảng cách bên trong trang */
  background-color: #f8f9fa; /* Màu nền nhẹ */
  border-radius: 10px; /* Bo tròn góc cho trang */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng cho trang */
}

h4 {
  color: #343a40; /* Màu chữ tiêu đề */
  font-weight: bold; /* Đậm tiêu đề */
}

button {
  margin-right: 10px;
  transition: background-color 0.3s, transform 0.2s; /* Hiệu ứng chuyển động cho nút */
}

button:hover {
  transform: translateY(-2px); /* Nhấc lên nhẹ khi hover */
}

.text-center {
  margin: 20px 0; /* Khoảng cách cho các phần tử căn giữa */
}
</style>