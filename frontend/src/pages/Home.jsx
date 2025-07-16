import React, { useState, useEffect } from "react";


const Home = () => {

  const backgroundImages = [
    '/homepage-1.jpg', 
    '/hompage-2.jpg',
    '/hompage-3.jpg',
  ];
  const products = [
    { name: 'IKAN LELE', image: '/ikan-lele.jpeg' },
    { name: 'IKAN NILA', image: '/ikan-nila.jpg' },
    { name: 'IKAN GURAME', image: '/ikan-gurame.jpeg' },
  ];
  
  const [featuresAnimated, setFeaturesAnimated] = useState(false);
  useEffect(() => {
    setFeaturesAnimated(true);
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="font-merri">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-end text-right px-10 lg:px-20 py-16 h-screen overflow-hidden">
        {/* Background Slider */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-screen bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Konten */}
        <div className="relative font-merri z-10 text-white">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ">
            USAHA PERIKANAN AIR TAWAR
          </h1>
          <p className="max-w-xl mb-6 m-1 font-semibold text-md lg:text-lg">
            Mitra Andal untuk Pasokan Ikan Lele, Nila, Gurame Berkualitas
            <br />
            Kesegaran Air Tawar dalam Genggaman
            <br />
            Modernisasi Perikanan, Hasil Terbaik untuk Anda
          </p>
          <button
            onClick={() => document.getElementById("product").scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-2 mt-5 border rounded border-blue-100 text-md lg:text-lg font-bold bg-blue-50 bg-opacity-80 hover:bg-[#283593] transition duration-500 ease-in-out hover:text-white hover:shadow-xl text-[#283593]">
            All Product
          </button>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="flex flex-col md:justify-center bg-[#f9fafb] text-[#121747] text-center h-auto md:h-screen py-12">
        <h2 className="text-2xl md:text-4xl justify-center font-semibold mb-8">PRODUK KAMI</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product, index) => ( 
            <div
              key={index}
              className="group relative w-60 h-40 border bg-white border-gray-200 rounded-lg p-4
                        transition duration-500 ease-in-out hover:shadow-xl hover:border-transparent">
              <div className="relative h-52 w-full overflow-hidden">
                  <img
                      src={product.image}
                      alt={product.name}
                      className="h-auto w-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400/70 to-transparent transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-50"
                  ></div>
              </div>

              <p className="text-lg font-semibold text-[#1d2568] mt-2 z-10 relative">{product.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Values Section */}
      <section className="bg-gray-100 text-[#121747] py-12 px-6 h-screen flex flex-col text-center">
        <div>
          <h3 className="text-4xl font-semibold mb-2">Lebih dari Sekadar Ikan</h3>
          <p className=" font-semibold mb-10 ">Kualitas yang Bisa Anda Percaya, Transparansi, <br/>dan Inovasi Merupakan Pilar Utama Perusahaan kami</p>
        </div>
        <div className="flex m-10 gap-16 text-left font-semibold justify-center">
          <div className={`flex flex-col items-center gap-5 w-1/3 p-6 border border-gray-200 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out ${featuresAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <img src="/inovasi.jpg" alt="Sistem Monitoring Inovatif" className="w-full h-48 object-cover rounded-md mb-2" />
            <p className="text-center font-body">
              Kualitas kami terjamin melalui sistem monitoring internal yang canggih.
              Setiap tahap budidaya dan distribusi diawasi ketat oleh karyawan kami.
            </p>
          </div>
          <div className={`flex flex-col items-center gap-5 w-1/3 p-6 border border-gray-200 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out ${featuresAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <img src="/kolam-tembok.jpg" alt="Kolam Budidaya Terawat" className="w-full h-48 object-cover rounded-md mb-2" />
            <p className="text-center font-body">
              Setiap ikan dibudidayakan di kolam kami di Sumbersuko dengan standar kebersihan dan pakan berkualitas.
              Kami menjamin proses budidaya yang ramah lingkungan dan bebas dari praktik yang merugikan.
            </p>
          </div>
          <div className={`flex flex-col items-center gap-5 w-1/3 p-6 border border-gray-200 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out ${featuresAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <img src="/laporan.jpg" alt="Laporan Keuangan Transparan" className="w-full h-48 object-cover rounded-md mb-2" />
            <p className="text-center font-body">
              Klien bisnis dapat mengakses laporan keuangan dan aktivitas operasional secara real-time melalui portal khusus.
              Kepercayaan Anda adalah prioritas kami.
            </p>
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="py-12 h-screen flex flex-col justify-center font-merri text-[#121747] text-center">
        <h3 className="text-4xl font-semibold mb-4">Testimoni & Keunggulan Tambahan</h3>
        <p className="mb-6">Apa Kata Mitra dan Pelanggan Kami?</p>
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-60 border p-4">
              <div className="h-24 bg-gray-200 mb-2"></div>
              <p className="text-sm">Testimoni {item}</p>
            </div>  
          ))}
        </div>
        <div className="mt-20 flex items-center justify-center gap-10">
          <div>
            <p>Hubungi Tim Kami</p>
            <button className="px-6 py-2 mt-5 border rounded border-blue-100 text-lg font-bold bg-blue-50 hover:bg-[#283593] transition duration-500 ease-in-out hover:text-white hover:shadow-xl text-[#283593]">contact</button>
          </div>
          <span>atau</span>
          <div>
            <p>Pesan Sekarang</p>
            <button className="px-6 py-2 mt-5 border rounded border-blue-100 text-lg font-bold bg-blue-50 hover:bg-[#283593] transition duration-500 ease-in-out hover:text-white hover:shadow-xl text-[#283593]">contact</button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h3 className="text-xl font-semibold mb-6">Blog Kami</h3>
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-60 border p-4">
              <div className="h-24 bg-gray-200 mb-2"></div>
              <p className="font-medium">Judul Blog {item}</p>
              <p className="text-sm">Deskripsi blog {item}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-6 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-2">Tentang perusahaan kami</h4>
          <p></p>
        </div>
        <div>
          <h4 className="font-bold mb-2">alamat</h4>
          <p>Dsn. Kedungsari, Kec. Kunir, Lumajang</p>
          <p>integrasi api google maps</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">jam kerja</h4>
          <p>Senin - Sabtu, 07.00 - 17.00</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
