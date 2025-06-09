const db = require('../configs/db');
const Feed = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM feeds');
        return rows;
    },

    async getById(id) {
      const [rows] = await db.query('SELECT * FROM ponds WHERE id = ?', [id]);
      return rows[0];
    },

    async create(data) {
        const [result] = await db.query('INSERT INTO feeds SET ?', data);
        return { id: result.insertId, ...data };
    },

    async update(id, data) {
        const [result] = await db.query('UPDATE feeds SET ? WHERE id = ?', [data, id]);
        if (result.affectedRows === 0) return null;
        return { id, ...data };
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM feeds WHERE id = ?', [id]);
        if (result.affectedRows === 0) return null;
        return { id };
    }
};

module.exports = Feed;
