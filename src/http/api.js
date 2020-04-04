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
        return service.post('login', {
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
    getUserList({
        pagenum = 1,
        pagesize = 5,
        query
    }) {
        return service.get(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
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
        return service.post(`users`, {
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
        return service.put(`users/${uId}/state/${type}`)
    },
    /**
     * get 根据ID查询⽤用户信息
     * @param {*} uId ⽤用户ID
     */
    getUserInfo(uId) {
        return service.get(`users/${uId}`)
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
        return service.put(`users/${uId}`, {
            email,
            mobile
        })
    },
    /**
     * delete 删除单个⽤用户
     * @param {*} uId ⽤用户 id
     */
    delUser(uId) {
        return service.delete(`users/${uId}`)
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
        return service.put(`users/${uId}/role`, {
            rid
        })
    },
    //权限管理理
    /**
     * get 所有权限列列表
     * @param {*} type 类型 list 或 tree
     */
    getRightsList(type) {
        return service.get(`rights/${type}`)
    },
    // 左侧菜单权限
    getMenus() {
        return service.get('menus')
    },
    //角色列表
    getRoleList() {
        return service.get('roles')
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
        return service.post('roles', {
            roleName,
            roleDesc
        })
    },
    /**
     * get 根据 ID 查询⻆角⾊色
     * @param {*} rid ⻆角⾊色 ID
     */
    getRole(rid) {
        return service.get(`roles/${rid}`)
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
        return service.put(`roles/${rid}`, {
            roleName,
            roleDesc
        })
    },
    /**
     * delete ⻆角⾊色 ID
     * @param {*} rid
     */
    delRole(rid) {
        return service.delete(`roles/${rid}`)
    },
    /**
     * post ⻆角⾊色授权
     * @param {*} rid ⻆角⾊色 ID
     * @param {*} rids 权限 ID 列列表（字符串串） 以 , 分割
     */
    roleAuthorization({
        roleId,
        rids
    }) {
        return service.post(`roles/${roleId}/rights`, {
            rids
        })
    },
    /**
     * delete 删除⻆角⾊色指定权限
     * @param {*} roleId ⻆角⾊色 ID
     * @param {*} rightId 权限 ID
     */
    delRoleAuthorization({
        roleId,
        rightId
    }) {
        return service.delete(`roles/${roleId}/rights/${rightId}`)
    },
    //商品分类
    /**
     * get 商品分类数据列列表
     * @param {*} type [1,2,3]
     * @param {*} pagenum 当前⻚页码值
     * @param {*} pagesize 每⻚页显示多少条数据
     */
    getCategoriesList({
        type,
        pagenum = 1,
        pagesize = 5
    }) {
        return service.get(`cacategories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加分类
    // cat_pid	分类父 ID	不能为空，如果要添加1级分类，则父分类Id应该设置为 0
    // cat_name	分类名称	不能为空
    // cat_level	分类层级	不能为空，0表示一级分类；1表示二级分类；2表示三级分类
    addCategories({
        cat_pid,
        cat_name,
        cat_level
    }) {
        return service.post(`categories`, {
            cat_pid,
            cat_name,
            cat_level
        })
    },
    // 根据 id 查询分类
    getCategoriesById(id) {
        return service.get(`categories/${id}`)
    },
    /**
     * put 编辑提交分类
     * @param {*} id 分类 ID
     * @param {*} cat_name 分类名称
     */
    editCategories(id, cat_name) {
        return service.put(`categories/${id}`, {
            cat_name
        });
    },
    /**
     * delete 删除分类
     * @param {*} id 分类 ID
     */
    delCategories(id) {
        return service.delete(`categories/${id}`);
    },
    //分类参数管理理
    /**
     * get 参数列列表
     * @param {*} id 分类 ID
     * @param {*} sel [only,many]
     */
    getAttributes({
        id,
        sel
    }) {
        return service.get(`categories/${id}/attributes?sel=${sel}`);
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
        return service.post(`categories/${id}/attributes`, {
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
        return service.delete(`categories/${id}/attributes/${attrid}`);
    },
    /**
     * get 根据 ID 查询参数
     * @param {*} id 分类 ID
     * @param {*} attrid 属性 ID
     * @param {*} attr_sel [only,many]
     * @param {*} attr_vals 如果是 many 就需要填写值的选项，以逗号分隔 可选
     */
    findAttributes({
        id,
        attrid,
        attr_sel,
        attr_vals
    }) {
        return service.get(
            `categories/${id}/attributes/${attrid}?attr_sel=${attr_sel}&attr_vals=${attr_vals}`
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
        return service.put(`categories/${id}/attributes/${attrid}`, {
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
    getGoods({
        pagenum = 1,
        pagesize = 5,
        query
    }) {
        return service.get(
            `goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`
        );
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
    addGoods({
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        attrs
    }) {
        return service.post(`goods`, {
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        });
    },
    /**
     * get 根据 ID 查询商品
     * @param {*} gid 商品 ID
     */
    findGood(gid) {
        return service.get(`goods/${gid}`);
    },
    /**
     * put 编辑提交商品(只做效果,不不提交接⼝口)
     * @param {*} gid 商品 ID
     * @param {*} goods_name 商品名称
     * @param {*} goods_price 价格
     * @param {*} goods_number 数量量
     * @param {*} goods_weight 重量量
     * @param {*} goods_introduce 介绍 可选
     * @param {*} pics 上传的图⽚片临时路路径（对象） 可选
     * @param {*} attrs 商品的参数（数组） 可选
     */
    editGood({
        gid,
        goods_name,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        attrs
    }) {
        return service.put(`goods/${gid}`, {
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        });
    },
    /**
     * delete 删除商品
     * @param {*} gid 商品 ID
     */
    delGood(gid) {
        return service.delete(`goods/${gid}`);
    },
    /**
     * put 同步商品图⽚片
     * @param {*} gid 商品 ID
     * @param {*} pics 商品图⽚片集合
     */
    syncGoodPic({
        gid,
        pics
    }) {
        return service.put(`goods/${gid}/pics`, {
            pics
        });
    },
    /**
     * put 同步商品属性
     * @param {*} gid 商品 ID
     */
    syncGoodAttributes(gid) {
        return service.put(`goods/${gid}/attributes`);
    },
    //图⽚片上传
    /**
     * post 图⽚片上传
     * @param {*} file 上传⽂文件
     */
    upload({
        file
    }) {
        return service.post(`upload`, {
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
    getOrders({
        query,
        agenum = 1,
        pagesize = 5,
        user_id,
        pay_status,
        is_send,
        order_fapiao_title,
        order_fapiao_company,
        order_fapiao_content,
        consignee_addr
    }) {
        return service.get(`orders?agenum=${agenum}&pagesize=${pagesize}&query=${query}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`);
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
        return service.put(`orders/${oid}`, {
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
        return service.get(`orders/${oid}`);
    },
    /**
     * get 查看物流信息
     * @param {*} oid id
     * 供测试的物流单号：1106975712662 或者 804909574412544600
     */
    findExpress(oid) {
        return service.get(`/kuaidi/${oid}`);
    },
    //数据统计
    /**
     * get 基于时间统计的折线图
     */
    getChart() {
        return service.get(`reports/type/1`);
    }
}