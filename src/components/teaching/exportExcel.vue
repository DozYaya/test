<!--excel 导出组件-->
<template>
  <div>
    <button class="btn" @click="exportExcel">excel导出</button>
    <div style="display: none">
<!--      style="display: none"-->
<!--通过表结构满足excel文件导出底层逻辑要求，但不显示-->
      <table  border="1" id="result" contenteditable="true" style="margin: auto">
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
import * as $ from "jquery";
import * as XLSX from "xlsx";

export default {
  name: "exportExcel",
  data() {
    return {
      keys: 1,
    }
  },
  props: {
    dataSource: [],
    // eslint-disable-next-line vue/require-prop-type-constructor
    fileName: '',
  },
  methods: {
    //导出函数
    exportExcel(){
      this.$confirm('是否导出该excel文件？','导出提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(()=>{
        // console.log(this.dataSource)
        const csv = this.tableToCsv($("#result")[0]);
        console.log(csv)
        const sheet = this.csvToSheet(csv);
        const blob = this.sheetToBlob(sheet);
        this.openDownloadDialog(blob,this.fileName)
      }).catch(()=>{})
    },
    //同学们写的时候基本上是在修改这个地方
    tableToCsv(table){
      const csv = [];
      $(table).find("tr").each(function (){
        const temp = [];
        $(this).find("td").each(function (){
          temp.push($(this).html())
        })
        temp.shift()
        csv.push(temp.join(','))
      })
      csv.shift()
      //   console.log(csv)
      return csv.join("\n");
    },
    //将csv格式转成 sheet对象
    csvToSheet(csv){
      const sheet = {};
      csv = csv.split("\n");
      csv.forEach(function (row,i){
        row = row.split(",");
        if (i === 0) {
sheet['!ref'] = "A1:" + String.fromCharCode(65 + row.length - 1) + (csv.length - 1);
}
        row.forEach(function (col,j){
          sheet[String.fromCharCode(65 + j) + (i + 1)] = {v:col};
        })
      })
      return sheet;
    },
    // 将一个sheet对象转成最终的excel文件的blob对象 然后下载
    sheetToBlob(sheet, sheetName){
      sheetName = sheetName || "sheet1"
      const workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      };
      workbook.Sheets[sheetName] = sheet;
      //生成excel的配置项
      const outOpts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary"
      };
      const outBout = XLSX.write(workbook, outOpts);
      //把字符串转化成 arrayBuffer(类型化数组)
      function sab(s){
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; i++) {
view[i] = s.charCodeAt(i) & 0xFF;
}
        return buf
      }
      return new Blob([sab(outBout)], {type: "application/octet-stream"})
    },
    //通用的打开下载对话框方法
    openDownloadDialog(url,saveName){
      if (typeof url == "object" && url instanceof Blob){
        url = URL.createObjectURL(url); //创建blob地址
      }
      const aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || "";
      // aLink.download = this.fileName || "";
      let event;
      if (window.MouseEvent) {
event = new MouseEvent("click");
} else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent("click",true,false,window,0,0,0,0,0,false,false,false,false,0,null);
      }
      //触发事件
      aLink.dispatchEvent(event)
    }
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
