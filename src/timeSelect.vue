<template>
  <div v-if="show">
    <div class="drawer" @click="close" ref="drawer">
      <div class="time-select" ref="timeSelect" @click="$event.stopPropagation();">
        <div class="line" ref="line">
          <div class="line-grey"></div>
        </div>
        <div class="time">
          <div class="title">Schedule a Delivery Time</div>
          <div class="time-details">
            <div class="time-date">
              <li @click="changeDate(item.key)" v-for="item in dates" :class="{active: item.key === selectedDate}">{{item.name}}</li>
            </div>
            <div class="time-hour">
              <div>
                <li @click="changeHours(item.key)" v-for="item in hours"><span class="checkbox" :class="{active: item.key === selectedHours}"><span class="check-color"></span></span>{{item.name}}</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import communication from "./communication";
import { addClass, removeClass } from "./dom";
import $ from 'jquery';
const hasTouchEvent = 'ontouchstart' in window;
const touchStart = hasTouchEvent ? 'touchstart' : 'mousedown';
const touchMove = hasTouchEvent ? 'touchmove' : 'mousemove';
const touchEnd = hasTouchEvent ? 'touchend' : 'mouseup';
export default {
  name: "timeSelect",
  data() {
    return {
      show: false,
      dates: [
        {
          key: 1, name: 'Today 2/12'
        },
        {
          key: 2, name: 'Tomorrow 2/13'
        },
        {
          key: 3, name: 'Wednesday 2/14'
        },
        {
          key: 4, name: 'Wednesday 2/14'
        },
        {
          key: 5, name: 'Wednesday 2/14'
        },
        {
          key: 6, name: 'Wednesday 2/14'
        },
        {
          key: 7, name: 'Tomorrow 2/13'
        },
        {
          key: 8, name: 'Wednesday 2/14'
        },
        {
          key: 9, name: 'Wednesday 2/14'
        },
        {
          key: 10, name: 'Wednesday 2/14'
        },
        {
          key: 11, name: 'Wednesday 2/14'
        }
      ],
      hours: [
        {
          key: 1, name: '11:30 AM – 12:00 PM'
        },
        {
          key: 2, name: '12:00 PM – 12:30 PM'
        },
        {
          key: 3, name: '12:30 PM – 1:30 PM'
        },
        {
          key: 4, name: '2:00 PM – 2:30 PM'
        },
        {
          key: 5, name: '3:00 PM – 3:30 PM'
        },
        {
          key: 6, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 7, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 8, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 9, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 10, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 11, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 12, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 13, name: '3:30 PM – 4:00 PM'
        },
        {
          key: 14, name: '3:30 PM – 4:00 PM'
        }
      ],
      selectedDate: 1,
      selectedHours: 1
    }
  },
  mounted() {
    communication.add('openTime',  this.open.bind(this));
    this.addMoveEvent()
  },
  methods: {
    changeDate(key) {
      this.selectedDate = key;
    },
    changeHours(key) {
      this.selectedHours = key;
    },
    close() {
      this.$refs.drawer.style.animation = ``;
      setTimeout(() => {
        removeClass(this.$refs.drawer, 'animActive')
        addClass(this.$refs.drawer, 'deActive');
      });
      this.$nextTick(() => {
        this.removeEvent();
      })
    },
    open() {
      this.show = true;
      if(this.$refs.drawer) {
        this.$refs.drawer.style.animation = ``;
        setTimeout(() => {
          removeClass(this.$refs.drawer, 'deActive')
          addClass(this.$refs.drawer, 'animActive')
        });
      }
      this.$nextTick(() => {
        this.addMoveEvent();
      })
    },
    addMoveEvent() {
      $(this.$refs.line).on(touchStart, (e) => {
        e = hasTouchEvent ? e.targetTouches[0] : e;
        let originY = e.pageY;
        let targetY = 0
        $(document).on(touchMove, (emv) => {
          emv = hasTouchEvent ? emv.targetTouches[0] : emv;
          targetY = emv.pageY;
          let disY = emv.pageY - originY;
          $(this.$refs.timeSelect).css({
            bottom: -disY
          })
        });
        $(document).on(touchEnd, (emU) => {
          let disY = targetY - originY;
          if(disY > 100) {
            this.close()
            setTimeout(() => {
              $(this.$refs.timeSelect).css({
                bottom: 0
              })
            }, 1100)
          } else {
            this.open()
            $(this.$refs.timeSelect).css({
              bottom: 0
            })
          }

          $(document).off(touchMove)
          $(document).off(touchEnd)
        })
      })
    },
    removeEvent() {
      $(this.$refs.line).off('mousedown')
    }
  }
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes opacityFadeInUp {
  0% {
    opacity: 1;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@-webkit-keyframes fadeOutDown {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}
.animActive {
  animation: 1s ease 0s 1 normal both running opacityFadeInUp !important;
}
.deActive {
  animation: 1s ease 0s 1 normal both running fadeOutDown !important;
}
.drawer {
  animation: 1s ease 0s 1 normal both running opacityFadeInUp;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .time-select {
    background: #F4F4F4;
    height: calc(100% - 34px);
    position: absolute;
    bottom: 0px;
    .line {
      height: 20px;
      background: #F4F4F4;
      border-radius: 6px 6px 0px 0px;
      .line-grey {
        width:88px;
        margin: auto;
        padding-top: 10px;
        border-bottom: 3px solid #989898;
      }
    }
    .time {
      height: calc(100% - 20px);
    }
    .title {
      height: 53px;
      line-height: 53px;
      text-align: center;
    }
    .time-details {
      height: calc(100% - 53px);
      .time-date {
        width: 140px;
        float: left;
        height: 100%;
        overflow: scroll;
        li {
          display: inline-block;
          height: 69px;
          width: 100%;
          line-height: 69px;
          padding-left: 15px;
        }
        .active {
          background: #ffffff;
        }
      }
      .time-hour {
        margin-left: 140px;
        background: #ffffff;
        height: 100%;
        overflow: scroll;
        li {
          display: inline-block;
          padding: 15px 0px 15px 25px;
          .checkbox {
            display: inline-block;
            width: 18px;
            height: 18px;
            background: #FFFFFF;
            border: 1px solid #1A1A1A;
            box-sizing: border-box;
            border-radius: 9px;
            vertical-align: bottom;
            margin-right: 15px;
            .check-color {
              width: 12px;
              height: 12px;
              display: inline-block;
              background: #ffffff;
              border-radius: 6px;
              margin:2px;
            }
          }
          .active {
            .check-color {
              background: #FFCA00;
            }
          }
        }
      }
    }
  }
}


</style>