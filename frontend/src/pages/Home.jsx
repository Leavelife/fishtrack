import React, { useState, useEffect, useRef } from "react";
import MapFooter from "../components/MapFooter";

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  });

  const [animatedSection, setAnimatedSection] = useState({
    product: false,
    company: false,
  });
  const productsRef = useRef(null);
  const companyRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "product") {
              setAnimatedSection((prev) => ({ ...prev, product: true }));
            }
            if (entry.target.id === "company") {
              setAnimatedSection((prev) => ({ ...prev, company: true }));
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    if (productsRef.current) observer.observe(productsRef.current);
    if (companyRef.current) observer.observe(companyRef.current);
    return () => observer.disconnect();
  }, []);

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
      <section
        id="product"
        ref={productsRef}
        className="flex flex-col items-center bg-[#f9fafb] text-[#121747] text-center h-full lg:h-screen lg:justify-center min-h-[60vh] py-12 px-4"
      >
        <h2 className="text-2xl md:text-4xl font-semibold mb-8">PRODUK KAMI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group relative bg-white border border-gray-200 rounded-lg mx-5 md:mx-1 p-4 transition-all duration-700 ease-in-out flex flex-col items-center
                ${animatedSection.product ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400/70 to-transparent transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-50"></div>
              </div>
              <p className="text-lg font-semibold text-[#1d2568] mt-3 z-10 relative">{product.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Values Section */}
      <section id="company" ref={companyRef} className="bg-gray-100 text-[#121747] py-12 px-6 h-full flex flex-col text-center">
        <div>
          <h3 className="text-2xl lg:text-4xl font-semibold mb-2">Lebih dari Sekadar Ikan</h3>
          <p className=" font-semibold mb-10 ">Kualitas yang Bisa Anda Percaya, Transparansi, <br/>dan Inovasi Merupakan Pilar Utama Perusahaan kami</p>
        </div>
        <div className="flex flex-wrap m-3 md:m-10 gap-16 text-sm lg:text-base text-left font-semibold justify-center">
          <div className={`flex flex-col items-center gap-5 w-full md:w-1/3 lg:w-1/4 p-6 border border-gray-200 rounded-lg shadow-md transition-all duration-1000 ease-in-out ${animatedSection.company ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"}`} style={{ transitionDelay: `150ms` }}>
            <img src="/inovasi.jpg" alt="Sistem Monitoring Inovatif" className="w-full h-48 object-cover rounded-md mb-2" />
            <p className="text-center font-body">
              Kualitas kami terjamin melalui sistem monitoring internal yang canggih.
              Setiap tahap budidaya dan distribusi diawasi ketat oleh karyawan kami.
            </p>
          </div>
          <div className={`flex flex-col items-center gap-5 w-full md:w-1/3 lg:w-1/4 p-6 border border-gray-200 rounded-lg shadow-md transition-all duration-1000 ease-in-out ${animatedSection.company ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`} style={{ transitionDelay: `150ms`}}>
            <img src="/kolam-tembok.jpg" alt="Kolam Budidaya Terawat" className="w-full h-48 object-cover rounded-md mb-2" />
            <p className="text-center font-body">
              Setiap ikan dibudidayakan di kolam kami di Sumbersuko dengan standar kebersihan dan pakan berkualitas.
              Kami menjamin proses budidaya yang ramah lingkungan dan bebas dari praktik yang merugikan.
            </p>
          </div>
          <div className={`flex flex-col items-center gap-5 w-full md:w-1/3 lg:w-1/4 p-6 border border-gray-200 rounded-lg shadow-md transition-all duration-1000 ease-in-out ${animatedSection.company ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`} style={{ transitionDelay: `150ms` }}>
            <img src="/laporan.jpg" alt="Laporan Keuangan Transparan" className="w-full h-48 object-cover rounded-md mb-2" />
            <p className="text-center font-body">
              Klien bisnis dapat mengakses laporan keuangan dan aktivitas operasional secara real-time melalui portal khusus.
              Kepercayaan Anda adalah prioritas kami.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {/* <section className="bg-gray-100 py-12 text-center">
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
      </section> */}

      {/* Footer */}
      <footer className="bg-[#ebebeb] py-8 px-6 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-2">Tentang perusahaan kami</h4>
          <p>
            Email: support@fishtrack.id <br />
            WA: +62 812-3456-7891  <br />
            Telp: (0334) 567-123 <br />
          </p>
          <p className="text-sm font-bold mt-4">
            Follow kami di media sosial:
          </p>
            Instagram: @fishtrack.id <br />
            Facebook: FishTrack Indonesia <br />
        </div>
        <div>
          <h4 className="font-bold mb-2">alamat</h4>
          <p>Desa Kedungmoro, Kec. Kunir, Kab. Lumajang</p>
          <div className="w-full">
            <MapFooter/>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">jam kerja</h4>
          <p>
            Senin - Sabtu, 07.00 - 17.00 <br />
            Minggu & Libur Nasional: Tutup
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
