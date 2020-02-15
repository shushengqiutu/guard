<template>
  <div>
    <div class="titleSty">
      数据防护
    </div>
    <div class="text1 text1Margin">
      完整性目录（当前目录写保护不能写入，不推荐系统盘和网络共享目录）
    </div>
    <div class="text1 inputSty">
      <div>
        <el-input v-model="path1"></el-input>
      </div>
      <div class="buttonMargin">
        自定义
      </div>
    </div>
    <div class="text1 text2Margin">
      例外应用程序文件类型（保护目录下可以写入的文件类型，格式TXT/LOG/XML）
     </div>
    <div class="text1 inputSty">
      <div>
        <el-input v-model="path2"></el-input>
      </div>
      <div class="buttonMargin">
       自定义
      </div>
    </div>
    <div class="btn">
      <div class="okSty"
           @mouseover="mouseOverOk"
           @mouseleave="mouseLeaveOk"
           :style="okActive" @click="submitForm()">确定</div>
      <div class="okSty"
           @mouseover="mouseOverNo"
           @mouseleave="mouseLeaveNo"
           :style="noActive"
           @click="resetForm()">取消</div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'dataProtect',
  data () {
    return {
      okActive: ' background:rgba(255,255,255,0.2)',
      noActive: ' background:rgba(255,255,255,0.2)',
      path1: '',
      path2: ''
    }
  },
  methods: {
    submitForm () {

    },
    resetForm () {

    },
    mouseOverOk () {
      this.okActive = 'background:red;color: rgba(255,255,255,1)'
      this.noActive = ' background:rgba(255,255,255,0.2)'
    },
    mouseLeaveOk () {
      this.okActive = ' background:rgba(255,255,255,0.2)'
    },
    mouseOverNo () {
      this.noActive = 'background:red'
      this.okActive = ' background:rgba(255,255,255,0.2)'
    },
    mouseLeaveNo () {
      this.noActive = ' background:rgba(255,255,255,0.2)'
    }
  }
}
</script>
<style lang='scss'  scoped>
@import "./css/index.scss";
>>>.el-input__inner{
  width: 320px;
  height: 32px;
}
>>>.el-input--small .el-input__inner{
  padding: 8px;
}
  .titleSty{
    padding-top: 95px;
    margin-left: 42px;
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .text1{
    margin-left: 42px;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .text1Margin{
    margin-top: 20px;
  }
.btn{
  margin-top: 30px;
  display: flex;
}
.okSty{
  width: 125px;
  height: 30px;
  margin-left: 42px;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  border-radius:3px;
  background:rgba(255,255,255,0.2);
  border-radius:3px;
}
  .inputSty{
    display: flex;
    margin-top: 16px;
  }
  .buttonMargin{
    width:87px;
    height:30px;
    background:rgba(255,255,255,0.2);
    border-radius:3px;
    margin-left: 15px;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .text2Margin{
    margin-top: 20px;
  }
</style>
