<script>
import * as XLSX from "xlsx";
import * as  FileSaver  from "file-saver";

export default ({
  name:"AppPage",
  computed:{},
  setup(){},
  data(){
    return {
      AppParameters:{
        parameter1: ''
      }
    }
  },
  components: {},
  methods:{
    inqueryhandler(){

    },
    exporthandler(){
      // 1.生成Excel工作簿对象
      var wb = XLSX.utils.table_to_book(document.querySelector('#inqueryresults'));
      // 获取二进制字符串作为输出
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        book: true,
        type: 'array',
      })
      try {
        FileSaver.saveAs(
            // Blob: 对象表示一个不可变 原始数据的类文件对象,不一定是JS原生格式的数据。
            // File: 基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。
            new Blob([wbout], { type: 'appliction/octet-stream' }),
            // 设置导出的文件名称可随意
            '查询结果.xlsx'
        )
      } catch (e) {
        if (typeof console != 'undefined') console.log(e, wbout);
      }
      // 返回一个新创建的Blob对象，其内容由参数中给定的数组串联组成。
      return wbout;
    },

  }
})
</script>

<template>
  <div class="App">
    <div class="app-layout">
      <el-container class="app-container1" style="height: 100vh">
        <el-header height="100px" style="font-size: 20px;background-color: lightskyblue;text-align: center;font-size: 70px;font-family: Helvetica;color: ivory ">
          app
        </el-header>
        <el-container>
          <el-main class="app-main">
            <div class="app-queryparameters">
              <el-row>
                <el-form-item label="参数1">
                  <el-col :span="24">
                    <el-input v-model="AppParameters.parameter1" placeholder="请输入订单号"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button color="#599E5E" style="margin-left: 50px;margin-right: 50px" @click="inqueryhandler">
                    搜索结果
                  </el-button>
                </el-form-item >
                <el-form-item>
                  <el-button color="#C94F4F" style="margin-left: 50px;margin-right: 50px" @click="exporthandler">
                    导出报表
                  </el-button>
                </el-form-item>
              </el-row>

            </div>
            <div class="app-queryresult">
              <el-table :data = "list" border height="770" id="inqueryresults"
                        :cell-style="{padding:'20px 0'}" @row-click="testhandler"
                        :cell-class-name="tableRowClassName">
                <el-table-column prop="orderId" label="result1" width="100" >
                </el-table-column>
                <el-table-column prop="lineNumber" label="result2" width="80">
                </el-table-column>
                <el-table-column prop="customerCode" label="result3" width="100">
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>

</style>