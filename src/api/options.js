export default {
    name: "{{cli}}",
    getToken: () => {
        if (typeof localStorage !== 'undefined' && localStorage !== null) {
            return localStorage.getItem('token') || '';
        }
        return "";
    },
};