const mysql = require('mysql2/promise');

class MySQLConnector {
    constructor(config) {
        this.config = config;
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection(this.config);
            console.log('Connected to database success ');
        } catch (err) {
            console.error('Error connecting to database: ' + err.stack);
            throw err;
        }
    }

    async disconnect() {
        if (this.connection) {
            try {
                await this.connection.end();
                console.log('Disconnected from database');
            } catch (err) {
                console.error('Error disconnecting from database: ' + err.stack);
                throw err;
            }
        }
    }

    async query(sql, args = []) {
        if (!this.connection) {
            throw new Error('Database connection is not established');
        }

        try {
            const [rows] = await this.connection.execute(sql, args);
            return rows;
        } catch (err) {
            console.error('Error executing query: ' + err.stack);
            throw err;
        }
    }

    async insert(table, data) {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = new Array(values.length).fill('?').join(', ');

        const insertSQL = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
        return await this.query(insertSQL, values);
    }

    async update(table, data, condition) {
        const keys = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);

        const updateSQL = `UPDATE ${table} SET ${keys} WHERE ${condition}`;
        return await this.query(updateSQL, values);
    }

    async delete(table, condition) {
        const deleteSQL = `DELETE FROM ${table} WHERE ${condition}`;
        return await this.query(deleteSQL);
    }

    async search(table, condition) {
        const searchSQL = `SELECT * FROM ${table} WHERE ${condition}`;
        return await this.query(searchSQL);
    }
}

module.exports = MySQLConnector;
