import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'
const state = {
  token: getToken(),
  // 用户信息设置为空对象,以免后面读取getuserInfo(接口返回的对象)里面的数据报错
  getuserInfo: {}
}
const mutations = {
  setToken(state, token) {
    // 将拿到得tooken设置给state里面得token
    state.token = token
    // 将新得token进行缓存
    setToken(token)
  },
  removeToken() {
    // 将vuex的token制空
    state.token = null
    // 同步至缓存
    removeToken()
  },
  setuserInfo(state, userdata) {
    // 更新state.getuserInfo的共享数据
    state.getuserInfo = userdata
  },
  // 用户退出登录则将state.getuserInfo数据清空
  removeInfo(state) {
    state.getuserInfo = {}
  }
}
const actions = {
  // 发送请求
  async login(context, data) {
    // 调用接口
    const result = await login(data)
    // if为true则表示为登录成功
    // 将获取到的token(result.data.data)提交给mutations去修改然后mutations里面的setToken函数将最新的token赋值给state.token 再将token缓存至最新的历史数据
    context.commit('setToken', result)
  },
  async getInfo(context) {
    // 调用接口,调用结果为data,原因看请求拦截器
    const userdata = await getInfo()
    context.commit('setuserInfo', userdata)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

