<template>
  <div id="app-list">
    <div v-for="item in items" class="col-sm-3">
      <div class="xe-widget xe-counter-block">
        <div class="xe-upper">
          <div class="xe-icon">
            <i class="fa fa-line-chart" aria-hidden="true"></i>
          </div>
          <div class="xe-label">
            <strong class="num">{{item.appName}}</strong>
            <span>创建时间： <br>{{item.timestamp | dateFormat}}</span>
          </div>
        </div>
        <div class="xe-lower">
          <div class="border"></div>
          <strong>描述：</strong>
          <span>{{item.appDesc}}</span>
        </div>
        <button type="button" class="modify close" @click="toModifyApp(item.appId, item.appName, item.appDesc)">
          <span class="glyphicon glyphicon-pencil"></span>
        </button>
        <button type="button" class="delete close" @click="toDeleteApp(item.appId)">
          <span class="glyphicon glyphicon-remove"></span>
        </button>
      </div>
    </div>

    <!--添加application-->
    <div class="col-sm-3" @click="toAddApp">
      <div id="plus-app" class="xe-widget xe-counter-block">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </div>
    </div>
    <!--end 添加application-->

    <!--modal组件-->

    <!--添加app-->
    <modal
        id="add-app"
        title="添加应用"
        :show.sync="showAddModal"
        effect="zoom"
        width="200"
        @closeModal="showAddModal=false"
        :callback="addApp">
      <div slot="modal-body" class="modal-body">
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label" for="appName">名称：</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="appName" placeholder="">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label" for="appDesc">描述：</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="appDesc" placeholder="">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <!--end 添加app-->

    <!--修改app-->
    <modal
        id="modify-app"
        title="编辑应用"
        :show.sync="showModifyModal"
        effect="zoom"
        width="200"
        @closeModal="showModifyModal=false"
        :callback="modifyApp">
      <div slot="modal-body" class="modal-body">
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label" for="appName">名称：</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="appName" placeholder="">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label" for="appDesc">描述：</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="appDesc" placeholder="">
            </div>
          </div>
        </div>
      </div>
    </modal>
    <!--end 修改app-->

    <!--删除app-->
    <modal id="delete-app"
           title="删除应用"
           :show.sync="showDeleteModal"
           effect="zoom"
           width="200"
           @closeModal="showDeleteModal=false"
           :callback="deleteApp">
      <div slot="modal-body" class="modal-body">您确定要删除此应用？</div>
    </modal>
    <!--end 删除app-->
  </div>
</template>
<script>
  import Modal from './ui/Modal.vue';

  export default {
    components: {Modal},

    data: function () {
      return {
        items:[],
        appId: '',
        appName: '',
        appDesc: '',
        showAddModal: false,
        showModifyModal: false,
        showDeleteModal: false
      };
    },
    methods: {
      /* 添加项目 */
      toAddApp() {
        this.$set(this.$data,'showAddModal',true);
      },
      addApp() {
        this.$http.put('/app', {appName:this.appName, appDesc:this.appDesc}).then((response)=>{
          this.$http.get('/app').then((response)=>{
            this.$set(this.$data, 'items', response.body);
          }, (response)=>{
            console.log(response);
          });
        }, (response)=>{
          console.log(response);
        });
        this.$set(this.$data,'showAddModal',false);
      },

      /* 修改项目 */
      toModifyApp(appId, appName, appDesc) {
        this.$set(this.$data,'appId',appId);
        this.$set(this.$data,'appName',appName);
        this.$set(this.$data,'appDesc',appDesc);
        this.$set(this.$data,'showModifyModal',true);
      },
      modifyApp(id) {
        this.$http.post('/app', {appId:this.appId, appName:this.appName, appDesc:this.appDesc}).then((response)=>{
          this.$http.get('/app').then((response)=>{
            this.$set(this.$data, 'items', response.body);
          }, (response)=>{
            console.log(response);
          });
        }, (response)=>{
          console.log(response);
        });
        this.$set(this.$data,'showModifyModal',false);
      },

      /* 删除项目 */
      toDeleteApp(id) {
        this.$set(this.$data,'showDeleteModal',true);
        this.$set(this.$data, 'appId', id);
      },
      deleteApp() {
        this.$http.delete('/app', {body:{appId:this.appId}}).then((response)=>{
          this.$http.get('/app').then((response)=>{
            this.$set(this.$data, 'items', response.body);
          }, (response)=>{
            console.log(response);
          })
        }, (response)=>{
          console.log(response);
        });

        this.$set(this.$data,'showDeleteModal',false);
      }
    },
    mounted() {
      this.$http.get('/app', {path:"1"}).then((response)=>{
          this.$set(this.$data, 'items', response.body);
          console.log(response.body)
      }, (response)=>{
        console.log(response);
      })
    }
  }
</script>
<style>
  .xe-widget {
    position: relative;
  }
  button.delete {
    position: absolute;
    top:4px;
    right: 5px;
    font-size: 14px;
  }
  button.modify {
    position: absolute;
    top:5px;
    right:24px;
    font-size: 12px;
  }
  #plus-app {
    padding: 12px;
    text-align: center;
    font-size: 100px;
  }
</style>