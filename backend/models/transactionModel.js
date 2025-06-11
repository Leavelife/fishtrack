const db = require('../configs/db');

const Transaction = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM transactions');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query('INSERT INTO transactions SET ?', data);
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const [result] = await db.query('UPDATE transactions SET ? WHERE id = ?', [data, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...data };
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM transactions WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Transaction
