const AuthService = {
    isAuthenticated: false,

    signIn(callback: VoidFunction) {
        AuthService.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },

    signOut(callback: VoidFunction) {
        AuthService.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

export default AuthService;
