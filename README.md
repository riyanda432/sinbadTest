# SinbadTest

Project ini dibuat dengan menggunakan angular framework sebagai frontend dan untuk backend menggunakan node.js, express.js, dan Sequelize untuk ORM
database yang digunakan adalah postgresql. Project Customer List Building dibuat untuk menghetaui daftar email customer, dimana agar kita mudah saat melakukan campaign pada email marketing. Pada halaman website akan menampilkan list customer beserta emailnya, user dapat melakukan CRUD pada setiap datanya. 

# SET UP DB 
  - pastikan sudah menginstall postgres, dan postgres CLI
  - kita akan menyesuaikan konfigurasi database sesuai dengan config.json pada folder sinbad backend
  - jalankan command "psql postgres postgres"(login menggunakan username default dari PostgreSQL) pada terminal 
  
  - Buat username baru dengan command berikut:

  postgres-# CREATE ROLE febri2 WITH LOGIN PASSWORD 'febri2';
  postgres-# ALTER ROLE febri2 CREATEDB;
  postgres-# \q

  - Coba login menggunakan username yang sudah dibuat tadi
    psql postgres febri2
  
  postgres=> CREATE DATABASE ;
  postgres=> GRANT ALL PRIVILEGES ON DATABASE sinbadx TO febri2;
  postgres=> \q
  
  # Cara menjalankan

  - npm i (untuk menginstall semua package)
  - untuk menjalankan server node.js+express.js buka folder sinbadbackend, lalu ketik nodemon pada terminal. Maka akan running pada port 3000
  - untuk menjalankan angular, buka terminal baru lalu ketik ng serve. Maka akan running pada port 4200

  # URL Endpoint 
  get all=>  http://localhost:3000/api/v1/customer-list 
  update =>  http://localhost:3000/api/v1/customer-update/{id}/{name}/{email}
  delete =>. http://localhost:3000/api/v1/customer-delete/{id}
  add.   =>. http://localhost:3000/api/v1/customer-create/{email}/{password}.  password akan terenskripsi pada db menggunakan bcrypt
  
  login  => http://localhost:3000/api/v1/customer-login/{email}/{password}    api login sudah dibuat namun belum diimplementasi pada frontend nya, dimana ketika                                                                                    proses auth menggunakan jwt 
                                                                                  
  



