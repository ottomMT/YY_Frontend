const ROLES_LIST = {
  GROUP:{
    USER: {
      BASIC: '普通用户'
    },
    ADMIN: {
      BASIC: '后台管理员',
      SUPER: '超级管理员'
    },
    SELLER: {
      BASIC: '普通商户'
    }
  },
  MAMAPA:{
    BROWSE: '浏览妈妈PA',
    ADD: '创建妈妈PA',
    EDIT: '编辑妈妈PA',
    REMOVE: '删除妈妈PA'
  },
  USERMANAGE:{
    BROWSE: '浏览用户',
    ADD: '创建用户',
    EDIT: '编辑用户',
    REMOVE: '删除用户'
  }
};

if (!Roles.userIsInRole('zJWkQuKnKLLsP7KNy', ROLES_LIST.GROUP.ADMIN.SUPER)) {
  Roles.addUsersToRoles('zJWkQuKnKLLsP7KNy', ROLES_LIST.GROUP.ADMIN.SUPER);
}
