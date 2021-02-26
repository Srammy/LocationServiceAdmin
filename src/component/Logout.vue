<template>
    <div>
    </div>
</template>

<script>
export default {
    methods:{
        deleteTokenAndRoleAndUserId(){
            localStorage.removeItem('Authorization');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            this.$router.push('/login');
        }
    },
    mounted(){  /*生命周期函数*/
        this.deleteTokenAndRoleAndUserId();
    }
}
</script>