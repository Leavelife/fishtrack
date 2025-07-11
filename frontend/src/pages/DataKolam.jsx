import { useState, useEffect } from 'react';
import axios from 'axios';
import KolamDetail from './KolamDetail';
const DataKolam = () => {
    
    const [kolamList, setKolamList] = useState([]);
    const [selectedKolam, setSelectedKolam] = useState(null);

    useEffect(() => {
      axios.get('http://192.168.100.219:5000/api/ponds')
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
     <div className="flex w-full h-screen min-h-screen font-merri mt-16 text-[#121747]">
      <div className="overflow-y-auto w-1/6 border-r bg-[#f3f3f3] border-[#4c4c4c]">
        <div className="flex justify-between font-bold border-b border-1 border-[#4d4d4d] mb-4">
          <div className='mt-2 p-3'>Kolam</div>
        </div>

        {kolamList.map((kolam) => (
          <div
          key={kolam.id}
          onClick={() => setSelectedKolam(kolam)}
          className={`flex gap-4 cursor-pointer pl-4 p-2 mb-2 border-b border-white rounded ${
            selectedKolam?.id === kolam.id ? 'bg-[#173b71] text-white' : ''
          }`}
        >
          <div>{kolam.id}</div>
          <div>Ikan {kolam.fish_type}</div>
        </div>
        ))}
      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedKolam ? (
          <KolamDetail kolam={selectedKolam} />
        ) : (
          <div>Pilih salah satu kolam untuk melihat detail</div>
        )}
      </main>
    </div>
  </>
}

export default DataKolam