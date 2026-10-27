CREATE TYPE kategori_enum AS ENUM ('Peternakan', 'Perikanan', 'Wisata', 'Koperasi');

CREATE TABLE UMKM_Unggulan (
    id SERIAL PRIMARY KEY,
    nama_umkm VARCHAR (100) NOT NULL,
    nama_pemilik VARCHAR (100) NOT NULL,
    no_wahtsapp VARCHAR (20) NOT NULL,
    alamat TEXT NOT NULL,
    deskripsi_singkat TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Potensi_Desa (
    id SERIAL PRIMARY KEY,
    kategori kategori_enum NOT NULL,
    nama_potensi VARCHAR(100) NOT NULL,
    deskripsi TEXT NOT NULL,
    pengelola VARCHAR (100),
    lokasi VARCHAR (255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO UMKM_Unggulan (nama_umkm, nama_pemilik, no_wahtsapp, alamat, deskripsi_singkat) VALUES
('Toko Sembako Sejahtera', 'Budi Santoso', '081234567890', 'Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281', 'Toko sembako yang menyediakan berbagai kebutuhan pokok dengan harga terjangkau.'),
('Warung Makan Lezat', 'Siti Aminah', '081987654321', 'Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281', 'Warung makan yang menyajikan masakan tradisional dan modern dengan cita rasa lezat.'),
('Kerajinan Tangan Kreatif', 'Andi Wijaya', '081234567891', 'Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281', 'UMKM yang memproduksi kerajinan tangan unik dan kreatif dari bahan lokal.');

INSERT INTO Potensi_Desa (kategori, nama_potensi, deskripsi, pengelola, lokasi) VALUES
('Peternakan', 'Peternakan Domba', 'Peternakan domba yang menghasilkan daging dan wol berkualitas tinggi.', 'BUMDES', 'VC5H+F57, Jl. Raya, Pilanggadung, Tambakrigadung, Kec. Tikung, Kabupaten Lamongan, Jawa Timur 62281'),
('Perikanan', 'Tambak Ikan', 'Tambak ikan yang menghasilkan ikan segar untuk pasar lokal dan ekspor.', 'BUMDES', 'VC5H+F57, Jl. Raya, Pilanggadung, Tambakrigadung, Kec. Tikung, Kabupaten Lamongan, Jawa Timur 62281'),
('Wisata', 'Wisata Joyo Boyo', 'Tempat rekreasi dan liburan yang cocok untuk keluarga.', 'BUMDES', 'VC5H+F57, Jl. Raya, Pilanggadung, Tambakrigadung, Kec. Tikung, Kabupaten Lamongan, Jawa Timur 62281'),
('Koperasi', 'Koperasi Pertanian Sejahtera', 'Koperasi yang mendukung petani lokal dalam meningkatkan hasil pertanian dan kesejahteraan anggota.', 'BUMDES', 'VC9G+67Q, Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281'
);

