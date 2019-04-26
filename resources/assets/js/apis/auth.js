export const Session = {
    
    validate(to, from, next) {
        let result={
            success: localStorage.getItem('access_token') != null
        }
        if (!result.success) {
            next({
              path: '/pages/login',
              query: { redirect: to.fullPath }
            });
          } else {
            next();
          }        
    },
    logedIn() {
        return JSON.parse(localStorage.getItem('user') != null ? localStorage.getItem('user') : {})
    }
}
export default {
    Session
};