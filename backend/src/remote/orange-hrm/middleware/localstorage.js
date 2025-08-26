
/**
 * A data structur to save access token
 */

module.exports = {
    token: '',
    getToken() {
        return this.token;
    },
    setToken(token) {
        this.token = token;
    }
}