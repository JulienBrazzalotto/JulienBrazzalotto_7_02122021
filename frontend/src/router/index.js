import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Numeros from '../views/Numeros.vue'
import Allposts from '../views/Allposts.vue'
import Profile from '../views/Profile.vue'
import Post from '../views/Post.vue'
import Createpost from '../views/Createpost.vue'
import Modifypost from '../views/Modifypost.vue'
import Adminusers from '../views/Adminusers.vue'
import Adminposts from '../views/Adminposts.vue'
import Admincomments from '../views/Admincomments.vue'
import Moderateposts from '../views/Moderateposts.vue'
import Moderatecomments from '../views/Moderatecomments.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/numeros',
    name: 'Numeros',
    component: Numeros
  },
  {
    path: '/allposts',
    name: 'Allposts',
    component: Allposts
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: Createpost
  },
  {
    path: '/modifypost/:id',
    name: 'ModifyPost',
    component: Modifypost
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: Adminusers
  },
  {
    path: '/admin/posts',
    name: 'AdminPosts',
    component: Adminposts
  },
  {
    path: '/admin/comments',
    name: 'Admincomments',
    component: Admincomments
  },
  {
    path: '/moderate/posts',
    name: 'ModeratePosts',
    component: Moderateposts
  },
  {
    path: '/moderate/comments',
    name: 'ModerateComments',
    component: Moderatecomments
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
