
# Travel Api

Travel APi dalah sebuah projek yang bertujuan untuk menyediakan layanan backend untuk pengelolaan aplikasi travel. API ini memungkinkan pengguna untuk melakukan registrasi, autentikasi dan mengelola ketersedian mobil di setiap company.




## Features

- **Registrasi Pengguna:** API ini menyediakan endpoint untuk pengguna melakukan registrasi dengan menyediakan nama, email, kontak, alamat, role dan kata sandi. Registrasi ini akan membuat pengguna memiliki aku di aplikasi travel.

- **Autentikasi:** Setelah registrasi, pengguna dapat menggunakan endpoint autentikasi untuk mendapatkan token JSON Web Token (JWT). TOken ini digunakn untuk mengotentikasi pengguna dalam setiap permintaan yan gmemerlukan autentikasi. Pengguna harus menyertakan token di header 'x-access-token' dalm setiap permintaan yan gmemerlukan autentikasi.

- **Pengelolaan Mobil:** API ini memungkinkan pengguna untuk mengelola mobil yang berada didalam rental company yang dapat dilakukan untuk role user **'Admin'**. User dengan role **Admin** dapat melakukan operasi CRUD (Create, Read, Update, Delete) untuk pengelolaan mobil.

- **Logging:** API ini menggunakn Morgan dan Winston untuk loggin. MOrgan digunakan untuk mencatat log HTTP request, sementara Winston digunakan untuk logging yang fleksibel dan dapat dikostumisasi


## Tech Stack

**Express.js:** Framework yang digunakan untuk membangun API dengan NOde.js

**Node.js:** Runtime environment yang digunakan untuk menjalankan Javascript di sisi server.

**MySQL:** Database relasional yang digunakan untuk menyimpan data transkasi, informasi pengguna dan rental company.

**Sequelize:** ORM (Object-Relational Mapping) untuk NOde.js yang digunakan untuk berinteraksi dengan database MySQL.

**Morgan:** Middleware untuk loggin yang lebih fleksibel dan dapat dikustomisasi.

**Json Web Token:** Standar industri untuk autentikasi pengguna yang digunakan dalam API Ini.




## Installation

1. Clone Repositori

```bash
  git clone https://github.com/hikio-17/Authentications-and-Migrations.git
```

2. Pindah ke direktori travel-api

```bash
    cd travel-api
```

3. Instal Dependensi yang digunakan

```bash
    npm Install
```
 
4. Atur konfigurasi
- salin semua file yang beradi di .env.example ke dalam file .env seperti SECRET, PORT, TITLE, dan URL yang digunakan.

5. Jalankan Aplikasi

```bash
    npm run start
```

Secara default server akan berjalan http://localhost:8000
## Documentation

Untuk melihat Dokumentasi lengkap dari penggunaan API ini dapat dilihat menggunakan:
- Swagger : http://localhost:8000/api-docs
- Postman : https://documenter.getpostman.com/view/20149138/2s93sXbtzt

