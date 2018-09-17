// pages/product/product.js
import {Product} from 'product-model.js';

var product = new Product();  //实例化 商品详情 对象
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        loadingHidden: false,
        hiddenSmallImg: true,
        countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        productCounts: 1,
        currentTabsIndex: 0,
        cartTotalCounts: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        this.data.id = id;
        this._loadData();
    },

    /*加载所有数据*/
    _loadData: function (callback) {
        var that = this;
        product.getDetailInfo(this.data.id, (data) => {
            that.setData({
                product: data,
                loadingHidden: true
            });
            callback && callback();
        });
    },

    //选择购买数目
    bindPickerChange: function (e) {
        this.setData({
            productCounts: this.data.countsArray[e.detail.value],
        })
    },

    //切换详情面板
    onTabsItemTap:function(event){
        var index=product.getDataSet(event,'index');
        this.setData({
            currentTabsIndex:index
        });
    },

    /*添加到购物车*/
    onAddingToCartTap: function (events) {
        //防止快速点击
        if (this.data.isFly) {
            return;
        }
        this._flyToCartEffect(events);
        this.addToCart();
    },
});