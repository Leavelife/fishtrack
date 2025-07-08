import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import axios from "axios";

const IrrigTable = ({data, fetchData}) => {

    const { isLoggedIn, role } = useAuth();
    const token = localStorage.getItem("accessToken");
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItemData, setSelectedItemData] = useState(null);


    return (
        <div className="border border-white rounded">
        {data ? (
        <table className="w-5/6 border border-white text-sm ">
            <thead>
                <tr className="bg-white text-black">
                <th className="p-2 border-b border-blue-500">Tanggal Irigasi</th>
                <th className="p-2 border-b border-blue-500">Durasi (menit)</th>
                <th className="p-2 border-b border-blue-500">Catatan</th>
                {isLoggedIn && (role === 'owner' || role === 'karyawan') && (
                    <th className="p-2 border-b border-blue-500">Aksi</th>
                )}
                </tr>
            </thead>
            <tbody>
            {Object.entries(data).map(([key, item]) => (
                    <tr key={key} className="border-b border-blue-500 hover:bg-blue-500/10">
                        <td className="text-center p-3">{item.irrigation_date}</td>
                        <td className="text-center p-3">{item.duration_minutes}</td>
                        <td className="text-center p-3">{item.notes}</td>
                        {isLoggedIn && (role === 'owner' || role === 'karyawan') && (
                            <td className="text-center p-3">
                                <button onClick={() => {setSelectedItemData(item); setShowEditModal(true)}} className="bg-[#fafafa] hover:bg-[#173b71] border border-[#173b71] text-[#173b71] hover:text-white px-4 py-1 mx-1 rounded-md">Edit</button>
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
        {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md shadow-md">
            <p className="mb-4 p-2">Yakin ingin menghapus data ini?</p>
            <div className="flex justify-end gap-2">
                <button onClick={() => setShowDeleteModal(false)}>Batal</button>
                <button
                onClick={async () => {
                    try {
                    console.log('token:', token);
                    await axios.delete(`http://localhost:5000/api/irrigation/${selectedItemId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setShowDeleteModal(false);
                    await fetchData();
                    } catch (err) {
                    console.error(`Gagal hapus ${selectedItemId}:`, err);
                    }
                }}
                className="bg-white border  hover:bg-red-700 transition-all ease-in-out text-red-700 hover:text-white px-3 py-1 rounded"
                >
                Hapus
                </button>
            </div>
            </div>
        </div>
        )}

      </div>
    )
}

export default IrrigTable;