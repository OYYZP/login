const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 映射接口返回的data里面的username
  name: state => state.user.getuserInfo.username
}
export default getters
