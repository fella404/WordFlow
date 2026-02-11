# 📚 WordFlow - Learn English Through Stories

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**WordFlow** adalah aplikasi web interaktif yang dirancang untuk membantu pengguna belajar bahasa Inggris melalui cerita pendek. Aplikasi ini tidak hanya berfokus pada kemampuan **Reading** (membaca) dan **Vocabulary** (kosakata), tetapi juga menekankan pada kemampuan **Listening** (mendengar) melalui fitur integrasi Text-To-Speech.

## 📸 Screenshots

![App Screenshot](/frontend/public/wordflow.png)

## ✨ Fitur Utama

### 🟢 Public (User)
* **Story Reading:** Membaca berbagai cerita pendek bahasa Inggris yang menarik.
* **Key Vocabulary:** Setiap cerita dilengkapi dengan daftar kosakata penting untuk membantu pemahaman.
* **🎧 Text-To-Speech (TTS):** Fitur audio untuk mendengarkan narasi cerita, berguna untuk melatih pronunciation dan skill listening (menggunakan SpeechSynthesis API).

### 🔴 Admin
* **CMS / Dashboard:** Manajemen konten cerita.
* **CRUD Story:** Membuat, membaca, mengedit, dan menghapus cerita serta vocabulary terkait.

## 🚀 Tech Stack

Project ini dibangun menggunakan **MEVN Stack** dan teknologi modern lainnya:

**Frontend:**
* ![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=flat&logo=vuedotjs&logoColor=4FC08D) **Vue.js** (Framework)
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS** (Styling)
* **SpeechSynthesis API** (Browser Native API untuk TTS)

**Backend:**
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js** (Runtime)
* ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=flat) **Express.js** (Framework)

**Database:**
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB**

## 🔮 Roadmap & Future Features

Project ini masih dalam tahap pengembangan aktif. Berikut adalah fitur-fitur canggih yang akan segera hadir:

- [ ] **AI Auto Generate Story:** Admin dapat membuat cerita otomatis menggunakan AI (via n8n & Ollama).
- [ ] **AI Chatbot Study Partner:** User dapat berinteraksi/chatting dengan bot untuk melatih percakapan bahasa Inggris.
- [ ] **Integrasi n8n:** Workflow automation untuk pipeline AI.
- [ ] **Ollama LLM:** Menggunakan Local LLM untuk privasi dan kustomisasi konten.

## 🛠️ Cara Menjalankan Project (Installation)

Ikuti langkah-langkah di bawah ini untuk menjalankan project di komputer lokal Anda.

### Prasyarat
* Node.js & NPM terinstall
* MongoDB (Local atau Atlas) berjalan

### 1. Clone Repository
```bash
git clone https://github.com/your-username/WordFlow.git
cd nama-repo
```

### 2. Setup Backend
```bash
cd backend
npm install

# Buat file .env di dalam root folder dan isi konfigurasi berikut:

# APP PORT
APP_PORT=3000

# MongoDB URI
MONGO_URI=mongodb://localhost:27017/examples

# JWT Token
JWT_ACCESS_TOKEN_SECRET=your-secret-accessToken
JWT_REFRESH_TOKEN_SECRET=your-secret-refreshToken

# Node ENV
NODE_ENV=development

# CLIENT_URL 
CLIENT_URL=http://localhost:5173 # development frontend url
```

### 3. Setup Frontend (Client)
```bash
# Buka terminal baru, lalu masuk ke folder frontend:
cd client
npm install

# Jalankan frontend:
npm run dev