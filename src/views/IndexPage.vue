<script>


import {Position} from "@element-plus/icons-vue";
import router from "@/router/router";
import {ipcRenderer} from "electron";

export default ({
  name:"IndexPage",
  computed:{},
  setup(){
    //进程进行通信自动更新
    ipcRenderer.send("update");

  },
  data(){},
  components: {Position},
  methods:{
    ToAppHandler(){
      router.push('/App')
    }
  }
})
</script>

<template>
  <div class="index-layout">
    <el-container class="index-container1" style="height: 20vh">
      <el-header height="100px" style="font-size: 20px;background-color: lightskyblue;text-align: center;font-size: 70px;font-family: Helvetica;color: ivory ">桌面软件</el-header>
    </el-container >
    <el-container class="index-container2" style="height: 80vh">
      <el-main  style="font-size: 100px;text-align: center;align-items: stretch">
        应用选项
          <div style="display: flex;flex-direction: column;text-align: end">
            <el-button  class="index-main-plm-app1" style="height: 20vh;width:300px;display: flex;flex-direction: column;font-size: 30px" @click="ToAppHandler">
              <el-icon style="font-size:150px"><Position/></el-icon>
              app1
            </el-button>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<style scoped>
.index-layout{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}


</style>