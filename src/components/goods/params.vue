<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!--警告区域-->
      <el-alert title="注意：只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon>
      </el-alert>
      <!--选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <!--选择商品级联选择器 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange" ></el-cascader>
        </el-col>
      </el-row>

      <!--tab页区域-->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="用户管理" name="many">
          <!--添加属性的按钮-->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="only">
          <!--添加参数的按钮-->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
  export default{
     data(){
        return{
          //商品分类列表
          cateList:[],
          //级联选择的配置对象
          cateProps:{
            value:'cat_id',
            label:'cat_name',
            children:'children'
          },
          //级联选择框双向绑定的数组
          selectedCateKeys:[],
          activeName:'many' //被激活的页签的名称
        }
     },
    computed:{
      // 如果按钮需要被禁用，则返回true，否则返回false
      isBtnDisabled(){
          if(this.selectedCateKeys.length!==3){
              return true
          }
          return false
      },
      //当前选中的三级分类的ID
      cateId(){
        if(this.selectedCateKeys.length ===3){
            return this.selectedCateKeys[2]
        }
        return null
      }
    },
    created(){
      //获取所有的商品分类列表
     this.getCateList();
    },
    methods:{
      async getCateList(){
        const {data:res} = await this.$http.get('categories')
        if(res.meta.status !==200){
            return this.$message.error('获取商品分类失败！')
        }
        this.cateList =res.data;
      },
      //级联选择框中项变化，会触发这个函数
       handleChange(){
          //证明选中的不是三级分类
        this.getParamsData();

      },
      //tab页签点击事件的处理函数
      handleTabClick(){
        this.getParamsData();
      },
      //获取参数的列表数据
      async getParamsData(){
        if(this.selectedCateKeys.length !==3){
          this.selectedCateKeys=[];
          return
        }
        //根据所选的ID，和当前所处的面板，获取对应的参数
        const {data:res} = await  this.$http.get(`categories/${this.cateId}/attributes`,{params: {sel:this.activeName}})

        if(res.meta.status !==200){
          return this.$message.error('获取参数失败')
        }
        console.log(res.data)
      }
    }
  }
</script>
<style lang="less" scoped>
.cat_opt{
  margin:15px 0;
}
</style>
