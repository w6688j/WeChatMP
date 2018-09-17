// pages/home/home.js
import {Home} from 'home-model.js';

var home = new Home();

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    onLoad: function () {
        this._loadData();
    },

    _loadData: function () {
        var id = 1;
        home.getBannerData(id, res => {
            this.setData({
                bannerArr: res
            });
        });

        home.getThemeData(res => {
            this.setData({
                themeArr: res
            });
        });

        home.getProductsData(res => {
            this.setData({
                productsArr: res
            });
        });
    },

    onProductsItemTap: function (event) {
        let id = home.getDataSet(event, 'id');
        wx.navigateTo({
            'url': '../product/product?id=' + id
        });
    },

    onThemesItemTap: function (event) {
        let id = home.getDataSet(event, 'id');
        let name = home.getDataSet(event, 'name');
        wx.navigateTo({
            'url': '../theme/theme?id=' + id + '&name=' + name
        });
    }
});