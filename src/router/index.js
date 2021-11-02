import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomePage/index.vue'),
  },
  {
    path: '/createVote',
    component: () => import('@/views/CreateVote/index.vue'),
  },
  {
    path: '/joinVote/:username/:id',
    component: () => import('@/views/JoinVote/index.vue'),
  },
  {
    path: '/manage',
    component: () => import('@/views/Manage/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
