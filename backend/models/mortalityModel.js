const db = require('../configs/db');

const Mortality = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM mortalities');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM mortalities WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query('INSERT INTO mortalities SET ?', data);
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const [result] = await db.query('UPDATE mortalities SET ? WHERE id = ?', [data, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...data };
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM mortalities WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Mortality
