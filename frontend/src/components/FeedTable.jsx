import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import axios from "axios";

const FeedTable = ({data, fetchData, kolam}) => {

    const { isLoggedIn, role } = useAuth();
    const [errorMessage, setErrorMessage] = useState('')

    const [showAddModal, setShowAddModal] = useState(false);
    const [newData, setNewData] = useState({irrigation_date: '', duration_minutes: '', notes: ''});

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [editData, setEditData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const handleEditClick = (item) => {
        setEditData(item);
        setShowEditModal(true);
    };  

    const handleAddData = async () => {
        if (!newData.feed_date) {
            alert("Tanggal wajib diisi!");
            return;
        }
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `http://192.168.100.219:5000/api/feeds`,
                {
                    feed_type: newData.feed_type,
                    feed_date: newData.feed_date,
                    amount_kg: newData.amount_kg,
                    pond_id: kolam.id, 
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
                }   
            );
            setShowAddModal(false);
            setNewData({ feed_type: '', feed_date: '', amount_kg: '' });
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
            `http://192.168.100.219:5000/api/feeds/${editData.id}`, {
                pond_id: editData.pond_id,
                feed_type: editData.feed_type,
                feed_date: editData.feed_date,
                amount_kg: editData.amount_kg,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );
        
            setShowEditModal(false);
            await fetchData(); // refresh data kolam
        } catch (err) {
            console.error('Gagal update:', err);
        }
    }
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://192.168.100.219:5000/api/feeds/${selectedItemId}`, {
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
        <table className="w-5/6 border border-white text-sm ">
            <thead>
                <tr className="bg-white text-black">
                <th className="p-2 border-b border-blue-500">Jenis Pakan</th>
                <th className="p-2 border-b border-blue-500">Tanggal</th>
                <th className="p-2 border-b border-blue-500">Jumlah (kg)</th>
                {isLoggedIn && (role === 'owner' || role === 'karyawan') && (
                    <th className="p-2 border-b border-blue-500">Aksi</th>
                )}
                </tr>
            </thead>
            <tbody>
            {Object.entries(data).map(([key, item]) => (
                    <tr key={key} className="border-b border-blue-500 hover:bg-blue-500/10">
                        <td className="text-center p-3">{item.feed_type}</td>
                        <td className="text-center p-3">{item.feed_date}</td>
                        <td className="text-center p-3">{item.amount_kg} Kg</td>
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
                <h2 className="text-lg font-semibold mb-4">Tambah Data Pakan</h2>

                <label className="block mb-2 text-sm">Jenis Pakan</label>
                <input type="text" value={newData.feed_type} onChange={(e) => setNewData({ ...newData, feed_type: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                <label className="block mb-2 text-sm">Tanggal Memberi Pakan</label>
                <input type="date" value={newData.feed_date} onChange={(e) => setNewData({ ...newData, feed_date: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                <label className="block mb-2 text-sm">Jumlah (Kg)</label>
                <input type="number" value={newData.amount_kg} onChange={(e) => setNewData({ ...newData, amount_kg: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

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
                <h2 className="text-lg font-semibold mb-4">Edit Data Pakan</h2>

                <label className="block mb-2 text-sm">Jenis Pakan</label>
                <input type="text" value={editData.feed_type} onChange={(e) => setEditData({ ...editData, feed_type: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

                <label className="block mb-2 text-sm">Tanggal Memberi Pakan</label>
                <input type="date" value={editData.feed_date} onChange={(e) => setEditData({ ...editData, feed_date: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>
                
                <label className="block mb-2 text-sm">Jumlah (Kg)</label>
                <input type="number" value={editData.amount_kg} onChange={(e) => setEditData({ ...editData, amount_kg: e.target.value })} className="w-full border px-2 py-1 mb-3 rounded"/>

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
                </div>
                {errorMessage && (
                    <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
                )}
            </div>
        </div>
        )}
        </div>
    )
}

export default FeedTable;