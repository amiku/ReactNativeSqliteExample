import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';
import DB from './DB';

export default class App extends Component {
    constructor(props) {
        super(props);
        this._insertNewData = this._insertNewData.bind(this);
        this._queryRecordCount = this._queryRecordCount.bind(this);
    }

    _insertNewData = () => {
        let db = new DB();
        db.query("insert into article(title, content) values('article title','article content')", function (results) {
            console.log(results);
            alert("###Insert new record " + results.insertId + " successfully !");
        }, function (e) {
            console.log("### Error Message:" + e.message);
        });
    };

    _queryRecordCount = () => {
        let db = new DB();
        db.query("SELECT * from article", function (results) {
            console.log(results);
            alert("Total record count is " + results.rows.length);
        }, function (e) {
            console.log("### Error Message:" + e.message);
        });
    };

    render() {
        return (
            <View style={appStyle.container}>
                <Text style={appStyle.header}>React Native Sqlite Example</Text>
                <Button style={appStyle.btnStyle} onPress={this._insertNewData} title={"Insert new record"}/>
                <Button style={appStyle.btnStyle} onPress={this._queryRecordCount} title={"Query record count"}/>
            </View>
        );
    }
}

const appStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8ffc4'
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    btnStyle: {
        marginTop: 20,
        marginBottom: 20,
        width: '50%'
    }
});
