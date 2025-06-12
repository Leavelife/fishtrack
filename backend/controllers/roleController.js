const db = require('../config/db');

exports.ubahRoleUser = async (req, res) => {
  const { userId, newRole } = req.body;

  const validRoles = ['pengguna', 'karyawan'];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({
      success: false,
      message: 'Role tidak valid',
    });
  }

  try {
    const [result] = await db.query('UPDATE users SET role = ? WHERE id = ?', [newRole, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.json({
      success: true,
      message: 'Role berhasil diubah',
    });
  } catch (err) {
    console.error('[UBAH ROLE ERROR]', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengubah role' });
  }
};
