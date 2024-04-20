export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/posts') {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo('/thoughts', { redirectCode: 301 })
  }
  // if child route is '/posts/:id', redirect to '/thoughts/:id'
  if (to.path.startsWith('/posts/')) {
    return navigateTo('/thoughts' + to.path.slice(6))
  }
})