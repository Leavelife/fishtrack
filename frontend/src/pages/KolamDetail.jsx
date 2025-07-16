import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import IrrigTable from '../components/IrrigTable';
import FeedTable from '../components/feedTable';
import MortalTable from '../components/MortalTable';
import HarvestTable from '../components/HarvestTable';

const KolamDetail = ({ kolam }) => {
  const [activeTab, setActiveTab] = useState('irrigation');
  const [data, setData] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`http://192.168.100.219:22781/api/${activeTab}/${kolam.id}`);
      setData(res.data.data);
    } catch (err) {
      console.error(`Gagal fetch data ${activeTab}`, err);
      setData(null);
    }
  }, [kolam?.id, activeTab])

  useEffect(() => {
      fetchData();
  }, [fetchData]);

  const tabs = [
    { label: 'Data Irigasi', key: 'irrigation' },
    { label: 'Data Pakan', key: 'feeds' },
    { label: 'Data Kematian', key: 'mortalities' },
    { label: 'Data Panen', key: 'harvest' },
  ];

  const renderTable = () => {
    switch (activeTab) {
      case 'irrigation':
        return <IrrigTable data={data} kolam={kolam} fetchData={fetchData} />;
      case 'feeds':
        return <FeedTable data={data} kolam={kolam} fetchData={fetchData} />;
      case 'mortalities':
        return <MortalTable data={data} kolam={kolam} fetchData={fetchData} />;
      case 'harvest':
        return <HarvestTable data={data} kolam={kolam} fetchData={fetchData} />;
      default:
        return <p>Halaman tidak ada</p>
    }
  }

  return (
    <div className='h-full'>
      <p className="text-xl font-bold mb-4">Data Kolam {kolam.id}</p>
      <div>
        <p>Jenis Ikan: {kolam.fish_type}</p>
        <p>Status: {kolam.status}</p>
        <p>Ukuran Kolam : {kolam.length} x {kolam.width} </p>

      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mt-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm border border-blue-500 rounded transition ${
              activeTab === tab.key
                ? 'bg-[#173b71] text-white'
                : 'bg-[#f5f5f6] text-[#121747]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderTable()}
    </div>
  );
};

export default KolamDetail;
