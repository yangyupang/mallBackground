// 默认导出一个对象既一个模块
import api from '../../http/api'
import pinyin from "pinyin";
import {
    Message
} from 'element-ui'
import router from '../../router'

export default {
    // 需要命名空间
    namespaced: true,
    state: {
        menus: [],
        weather: {},
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        setWeather(state, data) {
            state.weather = data
        },
    },
    actions: {
        async getMenus({
            commit
        }, params) {
            try {
                let res = await api.getMenus()
                if (res.meta.status === 200) {
                    // Message.success(res.meta.msg)
                    // 如果组件需要用到action请求的结果 就返回出去  如果不用 就不返回
                    // return res
                    // console.log(res.data);
                    commit('setMenus', res.data)
                    return res.data
                }
            } catch (err) {
                console.log(err);
            }

        },
        // 获取天气
        async getWeather({
            commit
        }, city) {
            try {
                let res = await api.getWeather(city)
                if (res.wea) {
                    let a = pinyin(res.wea, {
                        style: pinyin.STYLE_NORMAL // 设置拼音风格
                    }).join("");
                    res.dayPictureUrl = `http://api.map.baidu.com/images/weather/day/${a}.png`;
                    res.nightPictureUrl = `http://api.map.baidu.com/images/weather/night/${a}.png`;
                    res.pictureUrl = res.dayPictureUrl;
                    let hour = new Date().getHours();
                    if (hour >= 18 || hour < 6) {
                        res.pictureUrl = res.nightPictureUrl;
                    }
                    commit("setWeather", res)
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
    getters: {

    }
}