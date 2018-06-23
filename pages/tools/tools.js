//tools.js
//获取应用实例
const app = getApp();
let baseUrl = 'https://mp.w6688j.com/api/v1';
Page({
    getToken: function () {
        //调用微信登录接口
        wx.login({
            success: res => {
                let code = res.code;
                if (code) {
                    wx.request({
                        url: baseUrl + '/token/user',
                        data: {
                            code: code
                        },
                        method: 'POST',
                        success: result => {
                            console.log(result.data);
                            wx.showModal({
                                title: '申请令牌',
                                content: result.data.token
                            });
                            wx.setStorageSync('token', result.data.token);
                        },
                        fail: result => {
                            console.log(result.data);
                        }
                    });
                    console.log(code);
                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
    },
    pay: function () {
        let token = wx.getStorageSync('token');
        var that = this;
        wx.request({
            url: baseUrl + '/order',
            header: {
                token: token
            },
            data: {
                products: [
                    {
                        product_id: 1,
                        count: 2
                    },
                    {
                        product_id: 2,
                        count: 3
                    }
                ]
            },
            method: 'POST',
            success: result => {
                console.log(result.data);
                if (result.data.pass) {
                    wx.setStorageSync('order_id', result.data.order_id);
                    that.getPreOrder(token, result.data.order_id);
                } else {
                    console.log('订单未创建成功');
                }
            },
            fail: result => {
                console.log(result.data);
            }
        })
    },
    getPreOrder: function (token, orderID) {
        if (token) {
            wx.request({
                url: baseUrl + '/pay/pre_order',
                header: {
                    token: token
                },
                data: {
                    id: orderID
                },
                method: 'POST',
                success: result => {
                    let preData = result.data;
                    console.log(preData);
                    if (preData.error_code != 0) {
                        wx.showModal({
                            title: 'Error',
                            content: preData.msg
                        });
                    } else {
                        wx.requestPayment({
                            timeStamp: preData.timeStamp.toString(),
                            nonceStr: preData.nonceStr,
                            package: preData.package,
                            signType: preData.signType,
                            paySign: preData.paySign,
                            success: function (res) {
                                console.log(res.data);
                            },
                            fail: function (error) {
                                console.log(error);
                            }
                        });
                    }
                },
                fail: result => {
                    console.log(result.data);
                }
            })
        }
    }
});