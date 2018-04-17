<template>
  <!--顶部导航-->
  <div class="records">
    <div class="records-header">
      <mt-header title="考试记录">
        <router-link to="/user" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>

    <div class="page-popup">
      <div class="page-popup-wrapper">
        <mt-button @click.native="popupVisible3 = true" size="large" class="page-popup-wrapper-btn">试题1</mt-button>
      </div>
      <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
        <div class="records-list">
          <ul>
            <li>考试人名称：<span>李晓明</span></li>
            <li>试题名称：<span>前端工程师测试题</span></li>
            <li>考试类型：<span>笔试</span></li>
            <li>考试时间：<span>2018-03-04</span></li>
            <li>考试成绩：<span>95</span></li>
          </ul>
        </div>
        <mt-button @click.native="popupVisible3 = false" size="large" type="primary" class="close-btn">返回</mt-button>
      </mt-popup>
    </div>
  </div>

</template>

<script>
  import { Header } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
    export default {
        name: "records",
      components: {
        [Header.name]:Header,
        [Popup.name]:Popup,
        [InfiniteScroll]:InfiniteScroll
      },
      data() {
        return {
          popupVisible3: false,
          buttonBottom: 0,
        };
      },
      watch: {
        popupVisible2(val) {
          if (val) {
            setTimeout(() => {
              this.popupVisible2 = false;
            }, 2000);
          }
        }
      },

      methods: {
        onDateChange(picker, values) {
          if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
          }
          this.dateStart = values[0];
          this.dateEnd = values[1];
        }
      },

      mounted() {
        this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom;
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .records {
    .mint-header{
      background: #579fde !important;
    }
    .page-popup{
      width: 100%;
      background: #ebebeb;
      .page-popup-wrapper {
        position: absolute;
        width: 100%;
        padding-top: 50px;
        .page-popup-wrapper-btn{
          display: block;
          width: 90%;
          top: 50%;
          left: 5%;
        }
        button:not(:last-child) {
          margin-bottom: 20px;
        }
      }
      .close-btn{
        position: absolute;
        width: 50% !important;
        top: 70% !important;
        left: 25% !important;
        background: #ddd;
        color: #000;
      }
      .mint-popup-3 {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
      .mint-popup-3 .mint-button {
        position: absolute;
        width: 90%;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
      }
      .records-list{
        width: 90%;
        padding: 25% 6%;
        ul{
          font-size: 18px;
          li{
            height: 35px;
            line-height: 35px;
          }
        }
      }
    }

  }
</style>
