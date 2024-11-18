<template>
  <AppHeader />
  <div class="dashboard">
    <router-view />
    <!-- <h1>Dashboard</h1>
    <div class="stats">
      <div class="stat-card">
        <h2>Total Users</h2>
        <p>{{ totalUsers }}</p>
      </div>
      <div class="stat-card">
        <h2>Total Books</h2>
        <p>{{ totalBooks }}</p>
      </div>
      <div class="stat-card">
        <h2>Total Rentals</h2>
        <p>{{ totalRentals }}</p>
      </div>
    </div>
    <div class="recent-activity">
      <h2>Recent Activity</h2>
      <ul>
        <li v-for="activity in recentActivities" :key="activity.id">
          {{ activity.message }} - {{ activity.date }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components:{
    AppHeader,
  },
  data() {
    return {
      totalUsers: 150,
      totalBooks: 300,
      totalRentals: 75,
      recentActivities: [
        { id: 1, message: "User  John Doe borrowed 'The Great Gatsby'", date: "2023-10-01" },
        { id: 2, message: "User  Jane Smith returned '1984'", date: "2023-10-02" },
        { id: 3, message: "User  Alice Johnson registered", date: "2023-10-03" },
      ],
    };
  },
};
</script>

<style scoped>
  .dashboard {
    padding: 20px;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .stat-card {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 5px;
    flex: 1;
    margin: 0 10px;
    text-align: center;
  }

  .recent-activity {
    margin-top: 20px;
  }

  .recent-activity ul {
    list-style-type: none;
    padding: 0;
  }

  .recent-activity li {
    background-color: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
    margin: 5px 0;
  }
</style>