import { useState, useEffect } from 'react';
import axios from 'axios';
import KolamDetail from './KolamDetail';
const DataKolam = () => {
    
    const [kolamList, setKolamList] = useState([]);
    const [selectedKolam, setSelectedKolam] = useState(null);

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_URL_DOMAIN}/api/ponds`)
        .then(response => {
          setKolamList(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedKolam(response.data.data[0]);
          }
        })
        .catch(error => {
          console.error('Gagal mengambil data kolam:', error);
        });
    }, []);
    
    return <>
     <div className="md:flex w-full h-screen min-h-screen font-merri mt-16 text-[#121747]">
      <div className="overflow-y-auto w-full md:w-1/6 border-r bg-[#f3f3f3] border-[#4c4c4c]">
        <div className="hidden md:flex justify-between font-bold border-b border-1 border-[#4d4d4d] mb-4">
          <p className='mt-2 p-3'>Kolam</p>
        </div>
        <div className="flex md:flex-col gap-2">
          {kolamList.map((kolam) => (
            <div
            key={kolam.id}
            onClick={() => setSelectedKolam(kolam)}
            className={`flex justify-between md:justify-start md:w-full text-[12px] md:text-base cursor-pointer py-1 md:py-3 px-3 mb-2 border-b border-white rounded ${
              selectedKolam?.id === kolam.id ? 'bg-[#173b71] text-white' : ''
            }`}
            >
                <div>{kolam.id}</div>
                <div className='md:px-2'>Ikan {kolam.fish_type}</div>
            </div>
          ))}
        </div>
      </div>
      <main className=" flex-1 p-2 md:p-6 overflow-y-auto">
        {selectedKolam ? (
          <KolamDetail kolam={selectedKolam} />
        ) : (
          <div>Memuat Data Kolam....</div>
        )}
      </main>
    </div>
  </>
}

export default DataKolam