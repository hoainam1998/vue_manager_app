export default {
    data() {
        return {
            is_admin: false
        }
    },
    methods: {
        auth() {
            let user = JSON.parse(sessionStorage.getItem("user_authen"));
            if (user.admin) {
                this.is_admin = true;
            }
        }
    }
}