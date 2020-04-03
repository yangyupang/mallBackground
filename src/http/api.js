import service from './index'

export default {
 login(params) {
   return service.post('login', params)
 },
 // 根据id查询用户
 getUser(id) {
   return service.get(`users/${id}`)
 },
 // 获取菜单
 getMenus() {
   return service.get('menus')
 }
}