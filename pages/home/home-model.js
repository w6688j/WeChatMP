import {Base} from '../../utils/base.js';

class Home extends Base {

    constructor() {
        super();
    }

    /*首页Banner*/
    getBannerData(id, callback) {
        this.request({
            url: 'banner/' + id,
            sCallback: function (res) {
                callback && callback(res.items);
            }
        });
    }

    /*首页主题*/
    getThemeData(callback) {
        this.request({
            url: 'theme?ids=1,2,3',
            sCallback: function (data) {
                callback && callback(data);
            }
        });
    }

    /*首页产品*/
    getProductsData(callback) {
        this.request({
            url: 'product/recent',
            sCallback: function (data) {
                callback && callback(data);
            }
        });
    }
}

export {Home}