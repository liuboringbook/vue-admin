<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/categories' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card >
      <!--提示区域-->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>

      <!--步骤条区域-->
      <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!--tab栏区域-->
      <el-form ref="addFormRef" :model="addForm" label-width="100px" :rules="addFormRules" label-position="top">
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
            <el-form-item label="商品价格" prop="goods_price" type="number">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" type="number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleChange" ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!--渲染表单的Item项-->
            <el-form-item :label="item.attr_name" v-for="item in manyTabData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals" >
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2" >
            <el-form-item v-for="item in onlyTabData" :key="item.attr_id" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!--图片上传  action 表示图片要上传的后台API地址(需要填写完整地址)-->
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>

          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default{
     data(){
       return{
         activeIndex:'0',
         addForm:{
           goods_name:'',
           goods_price:0,
           goods_weight:'',
           goods_number:0,
           goods_cat:[]
         }, //添加商品的表单数据对象
         addFormRules:{
             goods_name:[
               {
                 required: true,
                 message:'请输入商品名称',
                 trigger:'blur'
               }
             ],
           goods_price:[
             {
               required: true,
               message:'请输入商品价格',
               trigger:'blur'
             }
           ],
           goods_weight:[
             {
               required: true,
               message:'请输入商品重量',
               trigger:'blur'
             }
           ],
           goods_number:[
             {
               required: true,
               message:'请输入商品数量',
               trigger:'blur'
             }
           ],
           goods_cat:[
             {
               required: true,
               message:'请选择商品分类',
               trigger:'blur'
             }
           ]
         },
         cateList:[], //商品分类
         cateProps:{
           label:'cat_name',
           value:'cat_id',
           children:'children'
         },
         manyTabData:[], //动态参数列表
         onlyTabData:[],//静态参数列表
       }
     },
    created(){
      this.getCateList()
    },
    computed:{
      cateId(){
          if(this.addForm.goods_cat.length ===3){
              return this.addForm.goods_cat[2]
          }
          return null
      }
    },
    methods:{
      //获取所有商品分类数据
      async getCateList(){
          const {data:res} = await this.$http.get('categories')
        if(res.meta.status !==200){
              return this.$message.error('获取商品分类数据失败')
        }
        this.cateList =res.data;
      },
      //级联选择器选中项变化
      handleChange(){
         if(this.addForm.goods_cat.length !==3){
           this.addForm.goods_cat= [];
         }
      },
      beforeTabLeave(activeName,oldActiveName){
          if(oldActiveName === '0' && this.addForm.goods_cat.length !==3){
              this.$message.error('请先选择商品分类');
              return false
          }
      },
    async tabClicked(){
          //证明访问的是动态参数访问面板
          if(this.activeIndex === '1'){
    const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
                 params:{sel:'many'}
             });
            if(res.meta.status !==200){
              return this.$message.error('获取动态参数列表失败!')
            }
            res.data.forEach(item =>{
             item.attr_vals = item.attr_vals.length === 0 ?[]: item.attr_vals.split(' ')
            });
            this.manyTabData =res.data
          }else if(this.activeIndex === '2'){
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:'only'}})
            if(res.meta.status !==200){
              return this.$message.error('获取静态参数列表失败!')
            }
            this.onlyTabData =res.data
            console.log(this.onlyTabData);
          }
      },
      //处理图片预览效果
      handlePreview(){

      },
      //出库移除图片的操作
      handleRemove(){

      }
    }
  }
</script>
<style lang="less" scoped>
.el-checkbox{
  margin: 0 5px 0 0 !important;
}
</style>
