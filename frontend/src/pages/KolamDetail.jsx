import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import IrrigTable from '../components/IrrigTable';
import FeedTable from '../components/feedTable';
import MortalTable from '../components/MortalTable';
import HarvestTable from '../components/HarvestTable';

const KolamDetail = ({ kolam }) => {
  const [activeTab, setActiveTab] = useState('irrigation');
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (tab) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/${tab}/${kolam.id}`);
      console.log('Fetched irrigation data:', res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.error(`Gagal fetch data ${tab}`, err);
      setData(null);
    }
  }, [kolam,activeTab])

  useEffect(() => {
    if (kolam) {
      fetchData(activeTab);
    }
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
        return <IrrigTable data={data} />;
      case 'feeds':
        return <FeedTable data={data} />;
      case 'mortalities':
        return <MortalTable data={data} />;
      case 'harvest':
        return <HarvestTable data={data} />;
      default:
        return <p>Halaman tidak ada</p>
    }
  }

  return (
    <div>
      <p className="text-xl font-bold mb-4">Data Kolam {kolam.id}</p>
      <div>
        <p><>Jenis Ikan: {kolam.fish_type} </></p>
        <p><>Status: {kolam.status} </></p>
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
