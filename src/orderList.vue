<template>
<div>
  <div class="title"> Order Summary</div>
  <div class="content">
    <div class="tab">Delivery Information</div>
    <div class="item">
      <img :src="vector">
      <div class="time">
        <div class="label">Delivery Time:</div>
        <div class="item-detail">6:30 PM - 7:00 PM on 2/14</div>
      </div>
      <div class="edit" @click="open">edit</div>
    </div>
  </div>

</div>
</template>
<script>
import vector from './Vector.png'
import communication from "./communication";
export default {
  name: "orderList",
  data() {
    return {
      vector: vector
    }
  },
  methods: {
    open() {
      communication.use('openTime')
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.title {
  background: #ffffff;
  height: 43px;
  text-align: center;
  line-height: 43px;
  margin-bottom: 25px;
}
.content {
  padding: 0px 15px;
  .tab {
    font-size: 16px;
    padding-left: 5px;
  }
  .item {
    height: 38px;
    background: #ffffff;
    border-radius: 5px;
    margin-top: 15px;
    padding: 15px 20px;
    img {
      vertical-align: super;
    }
    .time {
      display: inline-block;
      margin-left: 17px;
      .label {
        color: #7C7C7C;
        font-size: 14px;
      }
      .item-detail {
        font-size: 14px;
      }
    }
    .edit {
      display: inline-block;
      width: 60px;
      height: 26px;
      border: 1px solid #7C7C7C;
      background: #ffffff;
      border-radius: 22px;
      line-height: 26px;
      text-align: center;
      font-size: 14px;
      margin-top: 7px;
      margin-left: 14px;
      vertical-align: top;
    }
  }
}

</style>