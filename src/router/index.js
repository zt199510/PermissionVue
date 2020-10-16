import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/components/Login/Login.vue";
import Regisiter from "@/components/Login/register.vue";
import ChildIndex from "@/components/Pageinfo/ChildIndex.vue";
import About from "../views/About.vue";
import { Message} from 'element-ui';
import NavmenuSyte from "@/components/Pageinfo/NavmenuSyte.vue";
 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { path:'/Log', component: Login},
      { path:'/Regter', component: Regisiter}
    ],
  },
  {
    path: "/about",
    name: "About",
    component:About,
    children: [
      { path:'index',name: 'Index', component: ChildIndex},
      { path:'NavView',name:'NavmenuSyte',component:NavmenuSyte}
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
      
  }
 
];


const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {   
    Message.error('没有该页面')                      //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/log') 
  }//如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  if (to.path == '/'||to.path == '/log'||to.path == '/Regter') {
    next();
  }
  else {

    if (!localStorage.getItem("Authorization")) {
      Message.error('服务器响应超时，请刷新当前页')
      next('/log');
    } else {
      next();
    }
  }
});
export default router;
