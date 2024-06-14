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

    async prepareAndExecute(sql, params) {
        try {
            const [results, fields] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            return error.message;
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
        const set = Object.entries(data).map(([key, value]) => `\`${key}\` = ?`).join(', ');
        const where = Object.entries(condition).map(([key, value]) => `\`${key}\` = ?`).join(' AND ');

        const sql = `UPDATE \`${table}\` SET ${set} WHERE ${where}`;
        const params = [...Object.values(data), ...Object.values(condition)];

        return await this.prepareAndExecute(sql, params);
    }


    async delete(table, condition, params) {
        const sql = `DELETE FROM ${table} WHERE ${condition}`;
        return await this.prepareAndExecute(sql, params);
    }

    async search(table, condition) {
        const searchSQL = `SELECT * FROM ${table} WHERE ${condition}`;
        return await this.query(searchSQL);
    }
}

module.exports = MySQLConnector;


