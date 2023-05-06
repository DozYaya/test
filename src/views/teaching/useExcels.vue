<!--excel导入导出组件测试-->
<template>
  <div>
<!--    <excels></excels>-->
    <import-excel v-on:backData = fromChildData($event)></import-excel>
    <div style="height: 20px"></div>
<!--    <button @click="AddTableCell()" v-if="fileName !== ''">添加一列</button>-->
    <button id="addTable" @click="AddTableRow()" v-if="fileName !== ''">添加一行</button>
    <div style="height: 20px"></div>
    <export-excel :data-source="dataSource" :file-name="fileName"></export-excel>
    <div style="position: center">
      <h3>{{fileName}}</h3>
      <div style="height: 10px"></div>
      <table border="1" id="result" contenteditable="true" style="margin: auto">
        <tr v-for="(item,index) in dataSource" :key="index" v-if="index===0">
            <template v-for="(sub,subIndex) in item">
              <th>{{(subIndex === 0 ?"":String.fromCharCode(65+subIndex-1))}}</th>
            </template>
        </tr>
        <tr v-for="(item,index) in dataSource" :key="index + 'a'">
          <template v-for="sub in item">
            <td>{{sub}}</td>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Excels from "@/components/teaching/excels";
import importExcel from "@/components/teaching/importExcel";
import exportExcel from "@/components/teaching/exportExcel";
export default {
  name: "useExcels",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Excels,
    importExcel,
    exportExcel
  },
  data() {
    return {
      dataSource: [],
      fileName: '',
    }
  },
  methods: {
    //获取来自子组件importExcel的数据
    fromChildData(data){
      console.log(data)
      this.dataSource = data.dataSource
      console.log(this.dataSource)
      this.fileName = data.fileName
    },
    //动态添加行
    AddTableRow() {
      const Table = document.getElementById("result"); //取得自定义的表对象
      const rows = Table.rows.length;
      // console.log(rows)
      const cellLength = Table.rows[0].cells.length;
      // console.log(cellLength)
      let addRow = []
      for (let arr = 0; arr < cellLength; arr++){
        console.log(arr)
        if (arr === 0) {
addRow[arr] = rows
} else {
          addRow[arr] = ''
        }
      }
      this.dataSource.push(addRow)
      console.log(this.dataSource)
      this.$forceUpdate()
    },

    //动态添加列
    AddTableCell(){
      let newCell;
      const Table = document.getElementById("result"); //取得自定义的表对象
      const rowLength = Table.rows.length; //行數量
      const cellLength = Table.rows[0].cells.length; //查找單元格数量
      newCell = String.fromCharCode(65 + cellLength - 1)
      let arr = ''
      for (let i = 0; i < rowLength; i++){
        this.$set(this.dataSource[i],cellLength,arr)
        // this.dataPush(this.dataSource[i],arr)
        // this.dataSource[i].push(arr)
        // this.dataSource[i].push(null)
      }
      console.log(this.dataSource)
      this.$forceUpdate()
    },
    dataPush(data,add){
      data.push(add)
    },
  }
}
</script>

<style scoped>
.btn{
  color: #fff;
  background-color: #409eff;
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  border: 1px solid #Dcdfe6;
  text-align: center;
  padding: 12px 20px;
  border-radius: 0.25rem;
  font-size: 14px;
}
h3{
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}
table{
  border-collapse: collapse;
  margin-top: 30px;
  position: center;
}
th,td{
  border: 1px solid #d6d6d6;
  padding: 5px 10px;
}
th{
  text-align: center !important;
}
</style>
