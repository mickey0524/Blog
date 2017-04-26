<template>
    <router-view></router-view>
</template>

<script>
// import Front from './front/Front.vue'
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
      }
    // },
    // components: {
    //     Front
    // }
}
</script>

<style>    @import url("../css/animate.css");
    html {
      height: 100%;
    }
    body {
      height: 100%;
    }
    * {
        margin: 0;
        padding: 0;
        font-family: 'Microsoft Yahei';
    }
    a {
        text-decoration:none;   
    }
    ul, ol {
        list-style-position: outside; 
        padding-left: 20px;
    }
    ::-webkit-scrollbar{ width: 0; }   
</style>
