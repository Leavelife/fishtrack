import { useAuth } from "../utils/AuthContext";

const MortalTable = ({data}) => {

    const { isLoggedIn, role } = useAuth();

    return (
        <div className="border border-white rounded">
        {data ? (
        <table className="w-11/12 border border-white text-sm ">
            <thead>
                <tr className="bg-white text-black">
                    <th className="p-2 border-b border-blue-500">Tanggal</th>
                    <th className="p-2 border-b border-blue-500">Penyebab</th>
                    <th className="p-2 border-b border-blue-500">Jumlah</th>
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
                                <button className="bg-[#fafafa] hover:bg-[#173b71] border border-[#173b71] text-[#173b71] hover:text-white px-4 py-1 mx-1 rounded-md">Edit</button>
                                <button className="bg-[#fafafa] hover:bg-red-600 text-red-600 border border-red-600 hover:text-white px-4 py-1 mx-1 rounded-md">Hapus</button>
                            </td>
                        )}
                    </tr>
            ))}
            </tbody>
        </table>
        ) : (
            <p>Memuat data irigasi...</p>
        )}
      </div>
    )
}

export default MortalTable;