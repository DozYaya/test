<!--excel 导入组件-->
<template>
  <div>
    <button class="btn" @click="uploadFile">Excel导入</button>
    <input style="display: none" ref="fileRef" id="file" type="file" @change="fileChange"></input>
<!--    <div style="height: 20px"></div>-->
<!--    <button @click="AddTableCell()" v-if="excelData.fileName !== ''">添加一列</button>-->
<!--    <button id="addTable" @click="AddTableRow()" v-if="excelData.fileName !== ''">添加一行</button>-->
<!--    <div style="height: 20px"></div>-->
<!--    <div style="position: center">-->
<!--      <h3>{{fileName}}</h3>-->
<!--      <div style="height: 10px"></div>-->
<!--      <table border="1" id="result" contenteditable="true" style="margin: auto">-->
<!--        <tr v-for="(item,index) in dataSource" :key="index" v-if="index===0" >-->
<!--          <template v-for="(sub,subIndex) in item">-->
<!--            <th>{{(subIndex === 0 ?"":String.fromCharCode(65+subIndex-1))}}</th>-->
<!--          </template>-->
<!--        </tr>-->
<!--        <tr v-for="(item,index) in dataSource" :key="index + 'a'">-->
<!--          <template v-for="sub in item">-->
<!--            <th>{{sub}}</th>-->
<!--          </template>-->
<!--        </tr>-->
<!--      </table>-->
<!--    </div>-->
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  name: "importExcel",
  data() {
    return {
      excelData: {
        dataSource:[],
        fileName: '',
      }
    }
  },
  methods: {
    //返回父组件数据
    backData(){
      // console.log(this.excelData)
      this.$emit('backData',this.excelData)
    },
    //打开文件选择窗口
    uploadFile() {
      this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
    },
    //获取本地文件
    fileChange(){
      let files = document.getElementById("file").files
      // console.log(files)
      this.fileReader(files[0])
    },
    fileReader(file){
      // console.log(file)
      this.excelData.fileName = file.name
      let that = this;
      if (file.length === 0) {
        return
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
      this.excelData.dataSource = arr;
      this.backData()
      // console.log(arr)
    },
    // //动态添加行
    // AddTableRow() {
    //   const Table = document.getElementById("result"); //取得自定义的表对象
    //   const rows = Table.rows.length;
    //   let NewRow;
    //   NewRow = Table.insertRow(); //添加行
    //   const cellLength = Table.rows[0].cells.length;
    //   console.log(cellLength)
    //   for(let i=0; i<cellLength; i++){
    //     const NewCell = NewRow.insertCell();
    //     console.log('aaa')
    //     //NewCell.innerHTML="<input id='r"+(rows+1)+"t"+(i+1)+"' value='22' style='width:30px;'/>";
    //     NewCell.innerHTML="<input id='gradeR"+(rows+1)+"t"+(i+1)+"' " +
    //         "value='' style='width:30px;' type='text' class='input-large' " +
    //         "placeholder='等级'/>&nbsp;<input id='weightR"+(rows+1)+"t"+(i+1)+"' value='' " +
    //         "style='width:30px;' type='text' class='input-large' placeholder='权重'/>";
    //   }
    //   this.backData()
    // },
    //
    // //动态添加列
    // AddTableCell(){
    //   let NewCell;
    //   const Table = document.getElementById("result");  //取得自定义的表对象
    //   const rowLength = Table.rows.length;  //行數量
    //   const cellLength = Table.rows[0].cells.length; //查找單元格数量
    //   for(let i=0; i<rowLength; i++){
    //     //第一行添加一个输入框
    //     if(i===0){
    //       NewCell = Table.rows[i].insertCell(cellLength);
    //       NewCell.innerHTML="<input id='r"+(i+1)+"t"+(cellLength+1)+"' value='' style='width:60px;'  title='横向模拟等级'  type='text' class='input-large' placeholder='模拟等级'/>";
    //       // NewCell.innerHTML="<input id='r"+(i+1)+"t"+(cellLength+1)+"' " +
    //       //     "value='' style='width:60px;'  title='横向模拟等级'  " +
    //       //     "type='text' class='input-large' placeholder='模拟等级'/>";
    //     }else{
    //       //添加2个输入框
    //       NewCell = Table.rows[i].insertCell(cellLength);
    //       NewCell.innerHTML="<input id='gradeR"+(i+1)+"t"+(cellLength+1)+"' value=''  type='text' class='input-large' style='width:30px;' placeholder='等级'/>&nbsp;<input id='weightR"+(i+1)+"t"+(cellLength+1)+"' value='' style='width:30px;'  type='text' class='input-large' placeholder='权重'/>";
    //       // NewCell.innerHTML="<input id='gradeR"+(i+1)+"t"+(cellLength+1)+"' " +
    //       //     "value=''  type='text' class='input-large' style='width:30px;' " +
    //       //     "placeholder='等级'/>&nbsp;" +
    //       //     "<input id='weightR"+(i+1)+"t"+(cellLength+1)+"' value='' " +
    //       //     "style='width:30px;'  type='text' class='input-large' placeholder='权重'/>";
    //     }
    //   }
    //   this.backData()
    // },
    // //删除一行
    // DelTableRow(){
    //   const Table = document.getElementById("tableWeight");  //取得自定义的表对象
    //   const rowLength = Table.rows.length;  //行數量
    //   if(rowLength>2){
    //     Table.deleteRow(rowLength-1);
    //   }else{
    //     alert('不能全部删除！');
    //   }
    // },
    // //删除一列
    // DelTableCell(){
    //   const Table = document.getElementById("tableWeight");  //取得自定义的表对象
    //   const rowLength = Table.rows.length;  //行數量
    //   const cellLength = Table.rows[0].cells.length; //查找單元格数量
    //   if(cellLength>1){
    //     for(let i=0; i<rowLength; i++){
    //       Table.rows[i].deleteCell(cellLength-1);
    //     }
    //   }else{
    //     alert('不能全部删除！');
    //   }
    //   // if(rowLength>2){
    //   //Table.rows[0].deleteCell(2);
    //   //}else{
    //   // alert('不能全部删除！');
    //   //}
    // }
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
