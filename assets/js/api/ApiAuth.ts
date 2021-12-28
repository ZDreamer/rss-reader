const ApiAuth = {
    isAuthenticated: false,

    signIn(callback: VoidFunction) {
        ApiAuth.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },

    signOut(callback: VoidFunction) {
        ApiAuth.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

export default ApiAuth;
