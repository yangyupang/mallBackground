import service from './index'

export default {
    /**
     * post 登录
     * @param {*} username ⽤用户名
     * @param {*} password 密码
     */
    login({
        username,
        password
    }) {
        return service.post('/apis/login', {
            username,
            password
        })
    },
    //用户管理
    /**
     * get ⽤用户数据列列表
     * @param {*} pagenum 当前⻚页码
     * @param {*} pagesize 每⻚页显示条数
     * @param {*} query 查询参数 可选
     */
    getUserList(pagenum = 1, pagesize = 5, query) {
        return service.get(`/apis/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
    },
    /**
     * post 添加⽤用户
     * @param {*} username ⽤用户名称
     * @param {*} password ⽤用户密码
     * @param {*} email 邮箱 可选
     * @param {*} mobile ⼿手机号 可选
     */
    addUser({
        username,
        password,
        email,
        mobile
    }) {
        return service.post(`/apis/users`, {
            username,
            password,
            email,
            mobile
        })
    },
    /**
     * put 修改⽤用户状态
     * @param {*} uId ⽤用户ID
     * @param {*} type ⽤用户状态 true 或者 false
     */
    alterUserType({
        uId,
        type
    }) {
        return service.put(`/apis/users/${uId}/state/${type}`)
    },
    /**
     * get 根据ID查询⽤用户信息
     * @param {*} uId ⽤用户ID
     */
    getUserInfo(uId) {
        return service.get(`/apis/users/${uId}`)
    },
    /**
     * put 编辑⽤用户提交
     * @param {*} uId ⽤用户 id
     * @param {*} email 邮箱 可选
     * @param {*} mobile ⼿手机号 可选
     */
    editUser({
        uId,
        email,
        mobile
    }) {
        return service.put(`/apis/users/${uId}`, {
            email,
            mobile
        })
    },
    /**
     * delete 删除单个⽤用户
     * @param {*} uId ⽤用户 id
     */
    delUser(uId) {
        return service.delete(`/apis/users/${uId}`)
    },
    /**
     * put 分配⽤用户⻆角⾊色
     * @param {*} uId ⽤用户 ID
     * @param {*} rid ⻆角⾊色 id
     */
    assignRoles({
        uId,
        rid
    }) {
        return service.put(`/apis/users/${uId}/role`, {
            rid
        })
    },
    //权限管理理
    /**
     * get 所有权限列列表
     * @param {*} type 类型 list 或 tree
     */
    getRightsList(type) {
        return service.get(`/apis/rights/${type}`)
    },
    // 左侧菜单权限
    getMenus() {
        return service.get('/apis/menus')
    },
    //角色列表
    getRoleList() {
        return service.get('/apis/roles')
    },
    /**
     * post 添加⻆角⾊色
     * @param {*} roleName ⻆角⾊色名称
     * @param {*} roleDesc ⻆角⾊色描述 可选
     */
    addRole({
        roleName,
        roleDesc
    }) {
        return service.post('/apis/roles', {
            roleName,
            roleDesc
        })
    },
    /**
     * get 根据 ID 查询⻆角⾊色
     * @param {*} rid ⻆角⾊色 ID
     */
    getRole(rid) {
        return service.get(`/apis/roles/${rid}`)
    },
    /**
     * put 编辑提交⻆角⾊色
     * @param {*} rid ⻆角⾊色 ID
     * @param {*} roleName ⻆角⾊色名称
     * @param {*} roleDesc ⻆角⾊色描述 可选
     */
    editRole({
        rid,
        roleName,
        roleDesc
    }) {
        return service.put(`/apis/roles/${rid}`, {
            roleName,
            roleDesc
        })
    },
    /**
     * delete ⻆角⾊色 ID
     * @param {*} rid
     */
    delRole(rid) {
        return service.delete(`/apis/roles/${rid}`)
    },
    /**
     * post ⻆角⾊色授权
     * @param {*} rid ⻆色 ID
     * @param {*} rids 权限 ID 列表（字符串） 以 , 分割
     */
    roleAuthorization({
        rid,
        rids
    }) {
        return service.post(`/apis/roles/${rid}/rights`, {
            rids
        })
    },
    /**
     * delete 删除⻆角⾊色指定权限
     * @param {*} rid ⻆角⾊色 ID
     * @param {*} rightId 权限 ID
     */
    delRoleAuthorization({
        rid,
        rightId
    }) {
        return service.delete(`/apis/roles/${rid}/rights/${rightId}`)
    },
    //商品分类
    /**
     * get 商品分类数据列列表
     * @param {*} type [1,2,3]
     * @param {*} pagenum 当前⻚页码值
     * @param {*} pagesize 每⻚页显示多少条数据
     */
    getCategories(type, pagenum, pagesize) {
        if (pagenum && pagesize) {
            return service.get(`/apis/categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
        }
        return service.get(`/apis/categories?type=${type}`)
    },
    //添加分类
    // cat_pid	分类父 ID	不能为空，如果要添加1级分类，则父分类Id应该设置为 0
    // cat_name	分类名称	不能为空
    // cat_level	分类层级	不能为空，0表示一级分类；1表示二级分类；2表示三级分类
    addCategory(params) {
        return service.post(`/apis/categories `, params)
    },
    // 根据 id 查询分类
    getCategoriesById(id) {
        return service.get(`/apis/categories/${id}`)
    },
    /**
     * put 编辑提交分类
     * @param {*} id 分类 ID
     * @param {*} cat_name 分类名称
     */
    editCategory(id, cat_name) {
        return service.put(`/apis/categories/${id}`, {
            cat_name
        })
    },
    /**
     * delete 删除分类
     * @param {*} id 分类 ID
     */
    delCategories(id) {
        return service.delete(`/apis/categories/${id}`);
    },
    //分类参数管理理
    /**
     * get 参数列列表
     * @param {*} id 分类 ID
     * @param {*} sel [only,many]
     */
    getAttributes(id, sel) {
        return service.get(`/apis/categories/${id}/attributes?sel=${sel}`);
    },
    /**
     * post 添加动态参数或者静态属性
     * @param {*} id 分类 ID
     * @param {*} attr_name 参数名称
     * @param {*} attr_sel [only,many]
     * @param {*} attr_vals 如果是 many 就需要填写值的选项，以逗号分隔 可选
     */
    addAttributes({
        id,
        attr_name,
        attr_sel,
        attr_vals
    }) {
        return service.post(`/apis/categories/${id}/attributes`, {
            attr_name,
            attr_sel,
            attr_vals
        });
    },
    /**
     * delete 删除参数
     * @param {*} id 分类 ID
     * @param {*} attrid 参数 ID
     */
    delAttributes({
        id,
        attrid
    }) {
        return service.delete(`/apis/categories/${id}/attributes/${attrid}`);
    },
    /**
     * get 根据 ID 查询参数
     * @param {*} id 分类 ID
     * @param {*} attrid 属性 ID
     * @param {*} attr_sel [only,many]
     * @param {*} attr_vals 如果是 many 就需要填写值的选项，以逗号分隔 可选
     */
    findAttributes(id, attrid, attr_sel, attr_vals) {
        return service.get(
            `/apis/categories/${id}/attributes/${attrid}?attr_sel=${attr_sel}&attr_vals=${attr_vals}`
        );
    },
    /**
     * put 编辑提交参数
     * @param {*} id 分类 ID
     * @param {*} attrid 属性 ID
     * @param {*} attr_name 新属性的名字
     * @param {*} attr_sel 属性的类型[many或only]
     * @param {*} attr_vals 参数的属性值 可选
     */
    editAttributes({
        id,
        attrid,
        attr_name,
        attr_sel,
        attr_vals
    }) {
        return service.put(`/apis/categories/${id}/attributes/${attrid}`, {
            attr_name,
            attr_sel,
            attr_vals
        });
    },
    //商品列列表数据
    /**
     * get 商品列列表数据
     * @param {*} pagenum 当前⻚页码
     * @param {*} pagesize 每⻚页显示条数
     * @param {*} query 查询参数 可选
     */
    getGoods(query, pagenum = 1, pagesize = 10) {
        if (query) {
            return service.get(`/apis/goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
        }
        return service.get(`/apis/goods?pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    /**
    * post 添加商品
    * @param {*} goods_name 商品名称
    * @param {*} goods_cat 以为','分割的分类列列表
    * @param {*} goods_price 价格
    * @param {*} goods_number 数量量
    * @param {*} goods_weight 重量量
    * @param {*} goods_introduce 介绍 可选
    * @param {*} pics 上传的图⽚片临时路路径（对象） 可选
    * @param {*} attrs 商品的参数（数组），包含 动态参数 和 静态属性
    可选
    */
    addGoods(params) {
        return service.post(`/apis/goods`, params)
    },
    /**
     * get 根据 ID 查询商品
     * @param {*} id 商品 ID
     */
    findGoods(id) {
        return service.get(`/apis/goods/${id}`);
    },
    /**
     * put 编辑提交商品(只做效果,不不提交接⼝口)
     * @param {*} id 商品 ID
     * @param {*} goods_name 商品名称
     * @param {*} goods_price 价格
     * @param {*} goods_number 数量量
     * @param {*} goods_weight 重量量
     * @param {*} goods_introduce 介绍 可选
     * @param {*} pics 上传的图⽚片临时路路径（对象） 可选
     * @param {*} attrs 商品的参数（数组） 可选
     */
    editGoods(id, params) {
        return service.put(`/apis/goods/${id}`, params)
    },
    /**
     * delete 删除商品
     * @param {*} gid 商品 ID
     */
    delGoods(id) {
        return service.delete(`/apis/goods/${id}`);
    },
    /**
     * put 同步商品图⽚片
     * @param {*} id 商品 ID
     * @param {*} pics 商品图⽚片集合
     */
    syncGoodPic({
        id,
        pics
    }) {
        return service.put(`/apis/goods/${id}/pics`, {
            pics
        });
    },
    /**
     * put 同步商品属性
     * @param {*} gid 商品 ID
     */
    syncGoodAttributes(gid) {
        return service.put(`/apis/goods/${gid}/attributes`);
    },
    //图⽚片上传
    /**
     * post 图⽚片上传
     * @param {*} file 上传⽂文件
     */
    upload({
        file
    }) {
        return service.post(`/apis/upload`, {
            file
        });
    },
    //订单管理理
    /**
     * get订单数据列列表
     * @param {*} query	查询参数	可以为空
     * @param {*} agenum	当前页码	不能为空
     * @param {*} pagesize	每页显示条数	不能为空
     * @param {*} user_id	用户 ID	可以为空
     * @param {*} pay_status	支付状态	可以为空
     * @param {*} is_send	是否发货	可以为空
     * @param {*} order_fapiao_title	['个人','公司']	可以为空
     * @param {*} order_fapiao_company	公司名称	可以为空
     * @param {*} order_fapiao_content	发票内容	可以为空
     * @param {*} consignee_addr	发货地址	可以为空
     */
    getOrders(query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr) {
        if (query) {
            return service.get(`/apis/orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
        }
        return service.get(`/apis/orders?pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    /**
     * put 修改订单状态
     * @param {*} oid 订单 ID
     * @param {*} is_send 订单是否发货
     * @param {*} order_pay 订单⽀支付
     * @param {*} order_price 订单价格
     * @param {*} order_number 订单数量量
     * @param {*} pay_status ⽀支付状态
     */
    editOrders({
        oid,
        is_send,
        order_pay,
        order_price,
        order_number,
        pay_status
    }) {
        return service.put(`/apis/orders/${oid}`, {
            is_send,
            order_pay,
            order_price,
            order_number,
            pay_status
        });
    },
    /**
     * get 查看订单详情
     * @param {*} oid 订单 ID
     */
    getOrdersState(oid) {
        return service.get(`/apis/orders/${oid}`);
    },
    /**
     * get 查看物流信息
     * @param {*} oid id
     * 供测试的物流单号：1106975712662 或者 804909574412544600
     */
    findExpress(id) {
        return service.get(`/apis/kuaidi/${804909574412544600}`)
    },
    //数据统计
    /**
     * get 基于时间统计的折线图
     */
    getChart() {
        return service.get(`/apis/reports/type/1`);
    },
    // 天气api
    getWeather(city) {
        return service.get(`/map/api?version=v6&appid=56773599&appsecret=HVQliD8y&vue=1&city=${city}`)
    }
}