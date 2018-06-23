//tools.js
//获取应用实例
const app = getApp();
let baseUrl = 'https://mp.w6688j.com/api/v1';
Page({
    getToken: event => {
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
    pay: event => {
        let token = wx.getStorageSync('token');
        let that = this;
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
            },
            fail: result => {
                console.log(result.data);
            }
        })
    }
});