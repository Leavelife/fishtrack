const db = require('../configs/db');

const Irrigation = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM irrigations');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM irrigations WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query('INSERT INTO irrigations SET ?', data);
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const [result] = await db.query('UPDATE irrigations SET ? WHERE id = ?', [data, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...data };
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM irrigations WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Irrigation;
