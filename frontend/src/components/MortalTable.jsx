import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import axios from "axios";

const MortalTable = ({data, fetchData, kolam}) => {

    const { isLoggedIn, role } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [newData, setNewData] = useState({date: '', cause: '', amount: '', estimasi_mati: '', notes: ''});

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [editData, setEditData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const handleEditClick = (item) => {
        setEditData(item);
        setShowEditModal(true);
    };

    const handleAddData = async () => {
        if (!newData.date) {
            alert("Tanggal wajib diisi!");
            return;
        }
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `http://192.168.100.219:22781/api/mortalities`,
                {
                    date: newData.date,
                    cause: newData.cause,
                    amount: newData.amount || '',
                    estimasi_mati: newData.estimasi_mati, 
                    notes: newData.notes, 
                    pond_id: kolam.id
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
                }   
            );
            setShowAddModal(false);
            setNewData({ date: '', cause: '',amount: '', estimasi_mati: '', notes: '' });
            await fetchData(); // Refresh data
        } catch (err) {
            console.error('Gagal tambah data:', err);
            alert(err?.response?.data?.message || 'Gagal tambah data');
        }
    };
    const handleUpdate = async () => {
        try {
        const token = localStorage.getItem('accessToken');
      
          await axios.put(
            `http://192.168.100.219:22781/api/mortalities/${editData.id}`,
            {
                date: editData.date,
                cause: editData.cause,
                amount: editData.amount,
                estimasi_mati: editData.estimasi_mati, 
                notes: editData.notes,
                pond_id: kolam.id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
                }
            );
        
            setShowEditModal(false);
            await fetchData(); 
        } catch (err) {
            console.error('Gagal update:', err);
        }
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://192.168.100.219:22781/api/mortalities/${selectedItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setShowDeleteModal(false);
            await fetchData();
            setErrorMessage('');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Gagal menghapus data';
            console.error(`Gagal hapus ${selectedItemId}:`, err);
            setErrorMessage(msg)
        }
    }

    return (
        <div className="border border-white rounded">
        {data ? (
        <table className="w-11/12 border border-white text-sm ">
            <thead>
                <tr className="bg-white text-black">
                    <th className="p-2 border-b border-blue-500">Tanggal</th>
                    <th className="p-2 border-b border-blue-500">Penyebab</th>
                    <th className="p-2 border-b border-blue-500">Jumlah Kematian</th>
                    <th className="p-2 border-b border-blue-500">Estimasi kematian</th>
                    <th className="p-2 border-b border-blue-500">Catatan</th>
                    {isLoggedIn && (role === 'owner' || role === 'karyawan') && (
                        <th className="p-2 border-b border-blue-500">Aksi</th>
                    )}
                </tr>
            </thead>
            <tbody>
            {Object.entries(data).map(([key, item]) => (
                    <tr key={key} className="border-b border-blue-500 hover:bg-blue-500/10">
                        <td className="text-center p-3">{item.date}</td>
                        <td className="text-center p-3">{item.cause}</td>
                        <td className="text-center p-3">{item.amount ?? "tidak diisi"}</td>
                        <td className="text-center p-3">{item.estimasi_mati}</td>
                        <td className="text-center p-3">{item.notes}</td>
                        {isLoggedIn && (role === 'owner' || role === 'karyawan') && (
                            <td className="text-center p-3">
                                <button onClick={() => handleEditClick(item)} className="bg-[#fafafa] hover:bg-[#173b71] border border-[#173b71] text-[#173b71] hover:text-white px-4 py-1 mx-1 rounded-md">Edit</button>
                                <button onClick={() => {setSelectedItemId(item.id); setShowDeleteModal(true)}} className="bg-[#fafafa] hover:bg-red-600 text-red-600 border border-red-600 hover:text-white px-4 py-1 mx-1 rounded-md">Hapus</button>
                            </td>
                        )}
                    </tr>
            ))}
            </tbody>
        </table>
        ) : (
            <p>Memuat data irigasi...</p>
        )}
        {isLoggedIn && (role === 'owner' || role === 'karyawan') && (  
            <button onClick={() => setShowAddModal(true)} className="bg-[#fafafa] hover:bg-[#173b71] border border-[#173b71] text-[#173b71] hover:text-white px-4 py-1 mx-1 my-2 rounded-md">+ Tambah</button>
        )}

        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
                    <h2 className="text-lg font-semibold mb-4">Tambah Data Kematian</h2>

                    <label className="block mb-2 text-sm">Tanggal</label>
                    <input type="date" value={newData.date} onChange={(e) => setNewData({ ...newData, date: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                    <label className="block mb-2 text-sm">Penyebab</label>
                    <input type="text" value={newData.cause} onChange={(e) => setNewData({ ...newData, cause: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>
                    
                    <label className="block mb-2 text-sm">Jumlah</label>
                    <input type="number" value={newData.amount} onChange={(e) => setNewData({ ...newData, amount: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>
                    
                    <label className="block mb-2 text-sm">Estimasi Kematian</label>
                    <input type="text" value={newData.estimasi_mati} onChange={(e) => setNewData({ ...newData, estimasi_mati: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                    <label className="block mb-2 text-sm">Catatan</label>
                    <textarea value={newData.notes} onChange={(e) => setNewData({ ...newData, notes: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
                        <button onClick={handleAddData} className="px-4 py-2 bg-[#173b71] text-white rounded"> Simpan </button>
                    </div>
                </div>
            </div>
        )}
        {showEditModal && editData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Edit Data Kematian</h2>

                <label className="block mb-2 text-sm">Tanggal</label>
                    <input type="date" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                    <label className="block mb-2 text-sm">Penyebab</label>
                    <input type="text" value={editData.cause} onChange={(e) => setEditData({ ...editData, cause: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>
                    
                    <label className="block mb-2 text-sm">Jumlah</label>
                    <input type="number" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>
                    
                    <label className="block mb-2 text-sm">Estimasi Kematian</label>
                    <input type="text" value={editData.estimasi_mati} onChange={(e) => setEditData({ ...editData, estimasi_mati: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                    <label className="block mb-2 text-sm">Catatan</label>
                    <textarea value={editData.notes} onChange={(e) => setEditData({ ...editData, notes: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
                    <button onClick={handleUpdate} className="px-4 py-2 bg-[#173b71] text-white rounded">Simpan</button>
                </div>
                </div>
            </div>
        )}
        {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-md shadow-md">
                <p className="mb-4 p-2">Yakin ingin menghapus data ini?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowDeleteModal(false)}>Batal</button>
                    <button onClick={handleDelete} className="bg-white border  hover:bg-red-700 transition-all ease-in-out text-red-700 hover:text-white px-3 py-1 rounded">Hapus</button>
                    {errorMessage && (
                        <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
                    )}
                </div>
                </div>
            </div>
        )}
      </div>
    )
}

export default MortalTable;