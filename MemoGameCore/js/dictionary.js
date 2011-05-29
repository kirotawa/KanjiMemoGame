/**
** In this file you can write your kanjis and the meaning it just doing use JSON.
** Todo this follow this pattern bellow  
**
**/

//base dictionary
var dictionary = [ { "kanji": "人", "meaning":"person","romanji":"hito"},
		   { "kanji": "家", "meaning":"house", "romanji":"ie"} ,
		   { "kanji": "学", "meaning":"school", "romanji":"gakou"},
		   { "kanji": "学生", "meaning": "student", "romanji":"gakusei"},
		   { "kanji": "犬", "meaning":"dog", "romanji":"inu"},
		   { "kanji": "雨", "meaning":"rain", "romanji":"ame"},
		   { "kanji": "悪い", "meaning":"bad", "romanji":"warui"},
		   { "kanji": "お金", "meaning":"money", "romanji":"okane"},
		   { "kanji": "父", "meaning":"father", "romanji":"chichi"},
		   { "kanji": "母", "meaning":"mother", "romanji":"haha"},
		   { "kanji": "愛", "meaning":"love", "romanji":"ai"},
	           { "kanji": "私", "meaning":"I", "romanji":"watashi"},
		   { "kanji": "彼", "meaning":"he", "romanji":"kare"},
		   { "kanji": "右", "meaning": "right", "romanji":"migui"},
		   { "kanji": "左", "meaning": "left", "romanji":"hidari"},
		   { "kanji": "頭", "meaning":"head", "romanji":"atama"},
		   { "kanji": "傘", "meaning": "umbrella", "romanji":"kasa"},
	           { "kanji": "上", "meaning":"up", "romanji":"ue"},
		   { "kanji": "下", "meaning":"down", "romanji":"shita"},
	           { "kanji": "男", "meaning":"men", "romanji":"otoko"},
		   { "kanji": "本", "meaning":"book", "romanji":"hon"},
		   { "kanji": "名前", "meaning":"name", "romanji":"namae"},
		   { "kanji": "木", "meaning":"tree", "romanji":"ki"},
		   { "kanji": "体", "meaning":"body", "romanji":"karada"},
	           { "kanji": "目", "meaning":"eye", "romanji":"me"},
 		   { "kanji": "口", "meaning":"mouth", "romanji":"kuchi"},
		   { "kanji": "耳", "meaning":"ear","romanji":"mimi"},
		   { "kanji": "火", "meaning":"fire", "romanji":"ka"},
		   { "kanji": "足", "meaning":"lag", "romanji":"ashi"},
		   { "kanji": "年", "meaning": "year", "romanji":"otoshi"},
		   { "kanji": "子", "meaning":"children", "romanji":"kodomo"},			
		   { "kanji": "山", "meaning": "mountain", "romanji":"yama"},
		   { "kanji": "音", "meaning": "sound", "romanji":"oto"}
		]

//user dictionary
var user_dictionary = new Array();
//DBManager class: open database or create one
function DBManager() {
		this.tx = openDatabaseSync("userkanjiMemoDictionary", "1.0", "The user dictionary", 1000000);
		this.initDatabase();
}		

DBManager.prototype = {

    initDatabase: function( callback ) {
        this.tx.transaction(
            function( tx ){
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS kanji (" + 
                        "kanji TEXT NOT NULL," +
                        "meaning TEXT NOT NULL," +
                        "romanji TEXT NOT NULL" +
                    ");",
                    [],
                    function(){
                        if (callback) {
                            callback();
                        }
                    }    
                );
            }

        );
    },
	insert: function(values) {

			this.tx.transaction (
				function( tx ){
					tx.executeSql('INSERT INTO kanji values (?,?,?)', [values]);
				}
            );
            	
	},
    select: function() {
        this.tx.transaction (
            function( tx ){
                var rs = tx.executeSql('SELECT * FROM kanji');
                for(var i = 0; i < rs.rows.length; i++) {
                    user_dictionary.push({"kanji":rs.rows.item(i).kanji,"meaning":rs.rows.item(i).meaning,"romanji":rs.rows.item(i).romanji});
                }
            }
        );
    },
	del: function(kanji) {
            this.tx.transaction (
                function( tx ){
                    tx.executeSql('DELETE FROM kanji where kanji = ?',[kanji]);

                }

            );
    },
	update: function(kanji,meaning, romanji) {
        this.tx.transaction (
            function( tx ){
                tx.executeSql('UPDATE kanji SET kanji = ?, meaning = ?, romanji = ?', [kanji, meaning, romanji]);
            }
        );
    }
}	

