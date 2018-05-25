var firstPage = require("./data/firstPage.json");
var recommend1 = require("./data/recommend/recommend1.json");
var recommend2 = require("./data/recommend/recommend2.json");
var recommend3 = require("./data/recommend/recommend3.json");
var searchJson = require("./data/search-tian.json");
var searchZhu = require("./data/search-zhu.json");
var searchTian = require("./data/search-tian.json");
var detailData = require("./data/352876.json");
var detailData1 = require("./data/306643.json");
var detailData2 = require("./data/30047.json");
var detailData3 = require("./data/42318.json");
var detailData4 = require("./data/301342.json");
var detailData5 = require("./data/315972.json");
var charpset = require('./data/charpset.json');
var bookhot = require('./data/book_hot.json');
var artical_fir = require('./data/artical/datafir.json');
var artical_1 = require('./data/artical/data1.json');
var artical_2 = require('./data/artical/data2.json');
var artical_3 = require('./data/artical/data3.json');
var artical_4 = require('./data/artical/data4.json');

var jsonObj = {
    "/api/index": firstPage,
    "/api/recommend?pageNum=1&count=10": recommend1,
    "/api/recommend?pageNum=2&count=10": recommend3,
    "/api/recommend?pageNum=3&count=10": recommend3,
    "/api/search?key=诛仙": searchZhu,
    "/api/search?key=择天记": searchTian,
    "/api/detail?fiction_id=352876": detailData,
    "/api/detail?fiction_id=306643": detailData1,
    "/api/detail?fiction_id=30047": detailData2,
    "/api/detail?fiction_id=42318": detailData3,
    "/api/detail?fiction_id=301342": detailData4,
    "/api/detail?fiction_id=315972": detailData5,
    "/api/charpset?fiction_id=352876": charpset,
    "/api/bookhot": bookhot,
    "/api/artical?fiction_id=352876&pageNum=1": artical_fir,
    "/api/artical?fiction_id=352876&pageNum=2": artical_1,
    "/api/artical?fiction_id=352876&pageNum=3": artical_2,
    "/api/artical?fiction_id=352876&pageNum=4": artical_3,
    "/api/artical?fiction_id=352876&pageNum=5": artical_4

}
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }

}