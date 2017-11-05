// SQLite Class
// 'use strict';
import React, {Component} from 'react';

let SQLite = require('react-native-sqlite-storage');

export default class DB extends Component {
    static conn = null;

    constructor(props) {
        super(props);
        DB.conn = SQLite.openDatabase({
            name: 'demodb.db'
            // createFromLocation: 1
        }, this._openCB, this._errorCB);

        // Initial Database
        DB.conn.transaction(function (tx) {
            // Create table
            tx.executeSql('CREATE TABLE IF NOT EXISTS article (id INTEGER PRIMARY KEY AUTOINCREMENT, title, content)', [], function () {
                // console.log("table article created");
            });
            // You can add or modify database structure below
            // ...
        });
    }

    /**
     * DB Query
     * @param sql
     * @param successCallback
     * @param failureCallback
     */
    query = (sql, successCallback, failureCallback) => {
        DB.conn.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, res) {
                if (successCallback && typeof(successCallback) === "function") {
                    successCallback(res);
                }

            }, function (e) {
                console.log("###ERROR: " + e.message);
                if (failureCallback && typeof(failureCallback) === "function") {
                    failureCallback(e);
                }

            });
        });
    };

    /**
     * close database
     */
    closeDatabase = () => {
        if (DB.conn) {
            console.log("Closing database ...");
            let promise = new Promise(function (resolve, reject) {
                resolve(DB.conn.close());
            });
            promise.then(() => {
                console.log("Database Closed");
            }).catch((error) => {
                this._errorCB(error);
            });
        } else {
        }
    };

    _errorCB = (err) => {
        console.log("SQL Error: " + err);
    };

    _openCB = () => {
        console.log("Database OPENED");
    };
}