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
        <el-tab-pane label="动态参数" name="many">
          <!--添加属性的按钮-->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible =true">添加参数</el-button>
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行-->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i,scope.row)">{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <!--添加参数的按钮-->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible =true">添加属性</el-button>
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行-->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable  @close="handleClose(i,scope.row)">{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"  @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框-->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClose">
      <!--添加参数的对话框 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
    </el-dialog>

    <!--修改参数的对话框-->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="showDialogVisible"
      width="50%" @close="showDialogClose">
      <!--添加参数的对话框 -->
      <el-form ref="showFormRef" :model="showForm" :rules="showFormRules" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="showForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="showParams">确 定</el-button>
  </span>
    </el-dialog>
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
          activeName:'many', //被激活的页签的名称
          manyTableData:[], //静态参数的数据
          onlyTableData:[], // 动态参数的数据
//          inputVisible:false, //控制按钮和文本框的显示
//          inputValue:'',//文本框中的内容
          addDialogVisible:false, //控制添加对话框的显示与隐藏
          addForm:{
              attr_name:''
          }, //添加表单的验证
          addFormRules:{
              attr_name:[
                {
                  required:true,
                  message:'请输入参数名称',
                  trigger:'blur'
                }
              ]
          },
          showForm:{},
          showFormRules:{
            attr_name:[
              {
                required:true,
                message:'请输入参数名称',
                trigger:'blur'
              }
            ]
          },
          showDialogVisible:false, //控制修改对话框的显示与隐藏
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
      },
      //动态计算标题的文本
      titleText(){
          if(this.activeName === 'many'){
              return '动态参数'
          }else{
              return '静态属性'
          }
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
         if(this.selectedCateKeys.length !==3){
           this.selectedCateKeys =[];
           this.manyTableData =[];
           this.onlyTableData=[];
           return
         }
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
        res.data.forEach(item=>{
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' '): [];
          //控制文本框的显示与隐藏
          item.inputVisible = false
          item.inputValue =''
        });

        if(this.activeName === 'many'){
            this.manyTableData = res.data
        }else{
            this.onlyTableData = res.data
        }
        console.log(this.manyTableData)
      },
      addDialogClose(){
          //监听添加对话框的关闭事件
        this.$refs.addFormRef.resetFields()
      },
      showDialogClose(){
        this.$refs.showFormRef.resetFields()
      },
      //点击按钮，添加参数
      addParams(){
          this.$refs.addFormRef.validate(async valid=>{
              if(!valid) return;
         const {data:res} =await  this.$http.post(`categories/${this.cateId}/attributes`,{
                attr_name:this.addForm.attr_name,
                attr_sel:this.activeName
            });
            if(res.meta.status!== 201){
              return this.$message.error('添加参数失败')
            }
            this.$message.success('添加参数成功');
            this.addDialogVisible =false;
            this.getParamsData()
          })
      },
      //修改
     async showEditDialog(attr_id){
          console.log(attr_id)
          //查询当前参数的信息
         const{data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`,{
              params:{attr_sel:this.activeName }
          });
         if(res.meta.status!== 200){
             return this.$message.error('获取参数信息失败!')
         }
         this.showForm =res.data;
         this.showDialogVisible =true
      },
      //点击按钮，修改参数信息
      showParams(){
        this.$refs.showFormRef.validate(async valid=>{
          if(!valid) return;
          const {data:res} =await  this.$http.put(`categories/${this.cateId}/attributes/${this.showForm.attr_id}`,{
            attr_name:this.showForm.attr_name,
            attr_sel:this.activeName
          });
          if(res.meta.status!== 200){
            return this.$message.error('修改参数失败')
          }
          this.$message.success('修改参数成功');
          this.getParamsData();
          this.showDialogVisible =false;

        })
      },
      //根据Id删除对应的事项
     async removeParams(attr_id){
        const confirmResult = await this.$confirm('次操作将永久删除该参数，是否继续?','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
             type:'warning',
          }).catch(err=>err);
        //用户取消了删除的操作
        if(confirmResult !== 'confirm'){
            return this.$message.info('已取消删除!')
        }
        //删除
       const {data:res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`);
        if(res.meta.status !==200){
            return this.$message.error('删除参数失败！')
        }
        this.$message.success('删除参数成功!')
       this.getParamsData()
      },
      //文本框失去焦点，或按下enter都会触发
      handleInputConfirm(row){
         if(row.inputValue.trim().length ===0){
             row.inputValue ='';
             row.inputVisible =false;
           return
         }
         //如果没有return，则证明输入的呢日用，需要做后续处理
        row.attr_vals.push(row.inputValue.trim());
        row.inputValue ='';
        row.inputVisible = false;
        //需要发起请求，保存这次操作
         this.saveAttrVals(row)
      },
      async saveAttrVals(row){
        const{data:res} = await  this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,{
          attr_name:row.attr_name,
          attr_sel:row.attr_sel,
          attr_vals:row.attr_vals.join(' ')
        })
        if(res.meta.status!==200){
          return this.$message.error('修改参数项失败!')
        }
        this.$message.success('修改参数项成功!')
      },
      //点击按钮，展示文本输入框
      showInput(row){
        row.inputVisible = true;
        //让文本框自动获取焦点
        //$nextTick 方法的作用，就是当页面上的元素被重新渲染之后，才会指定回调函数中的代码
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //删除对应的参数可选项
      handleClose(i,row){
        row.attr_vals.splice(i,1);
        this.saveAttrVals(row);
      }
    }
  }
</script>
<style lang="less" scoped>
.cat_opt{
  margin:15px 0;
}
  .el-tag{
    margin:10px;
  }
.input-new-tag{
  width:120px;
}
</style>
