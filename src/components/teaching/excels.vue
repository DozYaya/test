<template>
  <div class="">
    <label for="file" class="btn">Excel导入</label>
<!--    <button class="btn" form="file">Excel导入</button>-->
    <input type="file" id="file" style="display:none" @change="fileChange" ref="excelinputers">
    <!-- excel显示-显示为表格（类似）
         contenteditable 把我们的其他标签变成可以输入的模式
     -->
    <el-button type="primary" @click="exportExcel">Excel导出</el-button>
    <div style="position: center">
      <h3>{{fileName}}</h3>
      <div style="height: 10px"></div>
      <table border="1" id="result" contenteditable="true" style="margin: auto">
        <tr v-for="(item,index) in dataSource" :key="index"  v-if="index===0">
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
import * as XLSX from "xlsx/xlsx.mjs"
import * as $ from "jquery"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'excels',
  components: {},
  data() {
    return {
      dataSource:[],
      fileName: '',
    }
  },
  props:["files"],
  mounted() {

  },
  methods:{
    //获取本地文件
    fileChange(){
      let files = document.getElementById("file").files
      // console.log(files)
      this.fileReader(files[0])
    },
    fileReader(file){
      // console.log(file)
      this.fileName = file.name
      let that = this;
      if (file.length === 0) {
return;
}
      if (!(/\.xlsx?$/g).test(file.name)){
        this.$message.warning("上传格式不正确，请上传xls或xlsx格式")
        return;
      }
      //调用本地读取excel的方法
      that.readWorkbookFromLocalFile(file,(workbook)=>{
        // console.log(workbook)
        //处理获取到的数据
        that.readWorkbook(workbook)
      })
    },
    //封装读取本地的excel文件
    readWorkbookFromLocalFile(file,callback){
      const reader = new FileReader();
      reader.onload = function (e){
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: "binary"});
        if (callback) {
callback(workbook)
}
      }
      reader.readAsBinaryString(file);
    },
    //封装处理数据的方法
    readWorkbook(workbook){
      const sheetNames = workbook.SheetNames; //工作表名称集合
      const worksheet = workbook.Sheets[sheetNames[0]];//这里我们只读取第一张sheet
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      //console.log(csv)
      //把拿到的数据转化为表格并输出
      const rows = csv.split("\n");
      //console.log(rows)
      const arr = [];
      rows.forEach((row,idx)=>{
        let columns = row.split(",");
        columns.unshift(String(idx + 1));
        arr.push(columns)
      })
      this.dataSource = arr;
      // console.log(arr)
    },
    //导出函数
    exportExcel(){
      let csv = this.tableToCsv($("#result")[0]);
      console.log('asd',csv)
      const sheet = this.csvToSheet(csv);
      // console.log(sheet)
      const blob = this.sheetToBlob(sheet);
      // console.log(blob)
      // this.openDownloadDialog(blob,'导出.xlsx')
      this.openDownloadDialog(blob,this.fileName)
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
    // tableToCsv(table){
    //   var csv = [];
    //   $(table).find("tr").each(function(){
    //     var temp = [];
    //     $(this).find("td").each(function(){
    //       temp.push($(this).html())
    //     })
    //     temp.shift()
    //     csv.push(temp.join(','))
    //   })
    //   csv.shift()
    //   //   console.log(csv)
    //   return csv.join("\n");
    // },
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
      const wopts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary"
      };
      const wbout = XLSX.write(workbook, wopts);

      //把字符串转化成 arrayBuffer(类型化数组)
      function sab(s){
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf
      }
      return new Blob([sab(wbout)], {type: "application/octet-stream"})
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
  },
 }
</script>

<style>
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
