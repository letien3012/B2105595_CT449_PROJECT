<template>
    <div>
      <h2>Gửi Email</h2>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="to">Đến:</label>
          <input type="email" v-model="email.to" required />
        </div>
        <div>
          <label for="subject">Chủ đề:</label>
          <input type="text" v-model="email.subject" required />
        </div>
        <div>
          <label for="text">Nội dung:</label>
          <textarea v-model="email.text" required></textarea>
        </div>
        <button type="submit">Gửi Email</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: {
          to: '',
          subject: '',
          text: ''
        },
        message: ''
      };
    },
    methods: {
      async sendEmail() {
        try {
          const response = await axios.post('http://localhost:3005/send-email', this.email);
          this.message = response.data;
        } catch (error) {
          this.message = 'Có lỗi xảy ra: ' + error.response.data;
        }
      }
    }
  };
  </script>