<!--<template>-->
<!--  <div>-->
<!--    <video-player-->
<!--        class="video-player vjs-custom-skin"-->
<!--        ref="videoPlayer"-->
<!--        name="videoPlayer"-->
<!--        id="video"-->
<!--        :playsinline="true"-->
<!--        :options="playerOptions"-->
<!--        @play="onPlayerPlay($event)"-->
<!--        @pause="onPlayerPause($event)"-->
<!--        @ended="onPlayerEnded($event)"-->
<!--        @waiting="onPlayerWaiting($event)"-->
<!--        @timeupdate="onPlayerTimeupdate($event)"-->
<!--        @statechanged="playerStateChanged($event)"-->
<!--        @canplaythrough="onPlayerCanplaythrough($event)"-->
<!--        @ready = "playerReadied"-->
<!--    ></video-player>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { videoPlayer } from "vue-video-player";-->
<!--import "video.js/dist/video-js.css";-->
<!--import "vue-video-player/src/custom-theme.css";-->
<!--export default {-->
<!--  name: "showVideo",-->
<!--  components: {-->
<!--    videoPlayer-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      playTime:'',-->
<!--      current:'',-->
<!--      playerOptions: {-->
<!--        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度-->
<!--        autoplay: false, // 如果为true,浏览器准备好时开始回放。-->
<!--        muted: false, // 默认情况下将会消除任何音频。-->
<!--        loop: false, // 是否视频一结束就重新开始。-->
<!--        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
<!--        language: "zh-CN",-->
<!--        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
<!--        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。-->
<!--        sources: [-->
<!--          {-->
<!--            type: "video/mp4", // 类型-->
<!--            src: '/api/files/download/196',-->
<!--                // require('@/assets/test.mp4')-->
<!--                // "../assets/test.mp4" // url地址-->
<!--          }-->
<!--        ],-->
<!--        poster: "", // 封面地址-->
<!--        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。-->
<!--        controlBar: {-->
<!--          timeDivider: true, // 当前时间和持续时间的分隔符-->
<!--          durationDisplay: true, // 显示持续时间-->
<!--          remainingTimeDisplay: false, // 是否显示剩余时间功能-->
<!--          fullscreenToggle: true,// 是否显示全屏按钮-->
<!--          currentTimeDisplay: false, // 当前时间&ndash;&gt;-->
<!--          volumeControl: false, // 声音控制键&ndash;&gt;-->
<!--          playToggle: false, // 暂停和播放键&ndash;&gt;-->
<!--          progressControl: true, // 进度条&ndash;&gt;-->
<!--        },-->
<!--      },-->
<!--    };-->
<!--  },-->
<!--  beforeRouteLeave(){-->
<!--    this.$refs.videoPlayer.player.pause()-->
<!--  },-->
<!--  methods: {-->
<!--    // 播放回调-->
<!--    onPlayerPlay(player) {-->
<!--      console.log("player play!", player);-->
<!--    },-->

<!--    // 暂停回调-->
<!--    onPlayerPause(player) {-->
<!--      console.log("player pause!", player);-->
<!--    },-->

<!--    // 视频播完回调-->
<!--    onPlayerEnded($event) {-->
<!--      console.log(player);-->
<!--    },-->
<!--    // DOM元素上的readyState更改导致播放停止-->
<!--    onPlayerWaiting(player) {-->
<!--      let time = localStorage.getItem("cacheTime")-->
<!--      if(player.cache_.currentTime - Number(time) > 0.1){-->
<!--        this.current = Number(time)-->
<!--        this.playerReadied(player)-->
<!--      }else{-->
<!--        this.current = player.cache_.currentTime-->
<!--      }-->
<!--    },-->

<!--    // 已开始播放回调-->
<!--    onPlayerPlaying($event) {-->
<!--      // console.log(player)-->
<!--    },-->

<!--    // 当播放器在当前播放位置下载数据时触发-->
<!--    onPlayerLoadeddata($event) {-->
<!--      // console.log(player)-->
<!--    },-->

<!--    // // 当前播放位置发生变化时触发。-->
<!--    onPlayerTimeupdate(player) {-->
<!--      this.playTime = player.cache_.currentTime-->
<!--      let playTime = player.cache_.currentTime-->
<!--      setTimeout(function () {-->
<!--        localStorage.setItem("cacheTime",playTime)-->
<!--      },500)-->


<!--      let time = localStorage.getItem("cacheTime")-->
<!--      if(player.cache_.currentTime - Number(time) > 2){-->
<!--        this.current = Number(time)-->
<!--        this.playerReadied(player)-->
<!--      }else{-->
<!--        this.current = player.cache_.currentTime-->
<!--      }-->
<!--    },-->

<!--    //媒体的readyState为HAVE_FUTURE_DATA或更高-->
<!--    onPlayerCanplay(player) {-->
<!--      // console.log('player Canplay!', player)-->
<!--    },-->

<!--    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。-->
<!--    onPlayerCanplaythrough(player) {-->
<!--      // console.log('player Canplaythrough!', player)-->
<!--    },-->

<!--    //播放状态改变回调-->
<!--    playerStateChanged(playerCurrentState) {-->
<!--      // console.log('player current update state', playerCurrentState)-->
<!--    },-->

<!--    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。-->
<!--    playerReadied(player) {-->
<!--      // console.log('example player 1 readied', player);-->
<!--      player.currentTime(this.current)-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style lang="less">-->
<!--.vjs-custom-skin > .video-js .vjs-big-play-button {-->
<!--  background-color: rgba(0,0,0,0.45);-->
<!--  font-size: 3.0em;-->
<!--  /* border-radius: 50%; */-->
<!--  height: 1.5em !important;-->
<!--  line-height:1.5em !important;-->
<!--  margin-top: -1em !important;-->
<!--}-->
<!--/*这里用了第三方vue-video-player插件，但这个插件有bug，设置globalSetting:{controls:true}隐藏进度条不生效，故可设置插件样式进行隐藏vjs-progress-contro*/-->
<!--.vjs-progress-control {-->
<!--  /*visibility:hidden;       // 隐藏进度条*/-->
<!--}-->

<!--</style>-->


<!--<template>-->
<!--  <div class='player-container'>-->
<!--    <video-player class="video-player vjs-custom-skin"-->
<!--                  ref="videoPlayer"-->
<!--                  name="videoPlayer"-->
<!--                  id="video"-->
<!--                  :playsinline="true"-->
<!--                  :options="playerOptions"-->
<!--                  @play="onPlayerPlay($event)"-->
<!--                  @pause="onPlayerPause($event)"-->
<!--                  @ended="onPlayerEnded($event)"-->
<!--                  @waiting="onPlayerWaiting($event)"-->
<!--                  @playing="onPlayerPlaying($event)"-->
<!--                  @loadeddata="onPlayerLoadeddata($event)"-->
<!--                  @timeupdate="onPlayerTimeupdate($event)"-->
<!--                  @canplay="onPlayerCanplay($event)"-->
<!--                  @canplaythrough="onPlayerCanplaythrough($event)"-->
<!--                  @statechanged="playerStateChanged($event)"-->
<!--                  @ready="playerReadied">-->
<!--    </video-player>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import { player } from-->
<!--// require(player)-->
<!--import { videoPlayer } from "vue-video-player";-->
<!--import 'video.js/dist/video-js.css'-->
<!--import 'vue-video-player/src/custom-theme.css'-->

<!--export default {-->
<!--  name: "videoMOCK",-->
<!--  components:{-->
<!--    videoPlayer-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      playerOptions: {-->
<!--        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度-->
<!--        autoplay: false, // 如果为true,浏览器准备好时开始回放。-->
<!--        muted: false, // 默认情况下将会消除任何音频。-->
<!--        loop: false, // 是否视频一结束就重新开始。-->
<!--        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
<!--        language: 'zh-CN',-->
<!--        aspectRatio: '16:9' ,// 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
<!--        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。-->
<!--        sources: [{-->
<!--          type: "video/mp4", // 类型-->
<!--          src: '/api/files/download/200'-->
<!--          // src: require('@/assets/test.mp4') // url地址-->
<!--        }],-->
<!--        poster: '', // 封面地址-->
<!--        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。-->
<!--        controlBar: {-->
<!--          timeDivider: true, // 当前时间和持续时间的分隔符-->
<!--          durationDisplay: true, // 显示持续时间-->
<!--          remainingTimeDisplay: false, // 是否显示剩余时间功能-->
<!--          currentTimeDisplay: false, // 当前时间-->
<!--          volumeControl: true, // 声音控制键-->
<!--          playToggle: true, // 暂停和播放键-->
<!--          progressControl: true, // 进度条-->
<!--          fullscreenToggle: true // 是否显示全屏按钮-->
<!--        }-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 播放回调-->
<!--    onPlayerPlay(player) {-->
<!--      console.log('player play!', player)-->
<!--    },-->

<!--    // 暂停回调-->
<!--    onPlayerPause(player) {-->
<!--      console.log('player pause!', player)-->
<!--    },-->

<!--    // 视频播完回调-->
<!--    onPlayerEnded($event) {-->
<!--      // console.log('0',player)-->
<!--      console.log('0',$event)-->
<!--    },-->

<!--    // DOM元素上的readyState更改导致播放停止-->
<!--    onPlayerWaiting($event) {-->
<!--      // console.log('1',player)-->
<!--      console.log('1',$event)-->
<!--    },-->

<!--    // 已开始播放回调-->
<!--    onPlayerPlaying($event) {-->
<!--      // console.log('2',player)-->
<!--      console.log('2',$event)-->
<!--    },-->

<!--    // 当播放器在当前播放位置下载数据时触发-->
<!--    onPlayerLoadeddata($event) {-->
<!--      // console.log('3',player)-->
<!--      console.log('3',$event)-->
<!--    },-->

<!--    // 当前播放位置发生变化时触发。-->
<!--    onPlayerTimeupdate($event) {-->
<!--      // console.log('4',player)-->
<!--      console.log('4',$event)-->
<!--    },-->

<!--    //媒体的readyState为HAVE_FUTURE_DATA或更高-->
<!--    onPlayerCanplay(player) {-->
<!--      console.log('player Canplay!', player)-->
<!--    },-->

<!--    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。-->
<!--    onPlayerCanplaythrough(player) {-->
<!--      console.log('player Canplaythrough!', player)-->
<!--    },-->

<!--    //播放状态改变回调-->
<!--    playerStateChanged(playerCurrentState) {-->
<!--      console.log('player current update state', playerCurrentState)-->
<!--    },-->

<!--    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。-->
<!--    playerReadied(player) {-->
<!--      console.log('example player 1 readied', player);-->
<!--    }-->

<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->


<!--<template>-->
<!--  <div>-->
<!--    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"-->
<!--                  :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"-->
<!--                  @ended="onPlayerEnded($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)"-->
<!--                  @loadeddata="onPlayerLoadeddata($event)" @timeupdate="onPlayerTimeupdate($event)"-->
<!--                  @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)"-->
<!--                  @statechanged="playerStateChanged($event)" @ready="playerReadied">-->
<!--    </video-player>-->
<!--    <div class="video-info-wrap">-->
<!--      <div>当前播放/总时长： {{currentTime}}s / {{duration}}s</div>-->
<!--      <div>播放起始时间： {{playtimes}}s</div>-->
<!--      <div>收看时长： {{watchTime}}s</div>-->
<!--      <div class="btn-wrap">-->
<!--        <van-button round block plain hairline type="warning" @click="playVideo">开始播放</van-button>-->
<!--        <van-button round block plain hairline type="info" @click="pauseVideo">暂停播放-->
<!--        </van-button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { videoPlayer } from "vue-video-player";-->
<!--import 'video.js/dist/video-js.css'-->
<!--import 'vue-video-player/src/custom-theme.css'-->
<!--export default {-->
<!--  components: {-->
<!--    videoPlayer-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      watchTime: 0,-->
<!--      timer: null,-->
<!--      currentTime: 0,//当前播放时长-->
<!--      playtimes: "", //视频观看起点-->
<!--      duration: 0,//总时长-->
<!--      playerOptions: {-->
<!--        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度-->
<!--        autoplay: false, //如果true,浏览器准备好时开始回放。-->
<!--        muted: false, // 默认情况下将会消除任何音频。-->
<!--        loop: false, // 导致视频一结束就重新开始。-->
<!--        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
<!--        language: "zh-CN",-->
<!--        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
<!--        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。-->
<!--        sources: [-->
<!--          {-->
<!--            type: "video/mp4",-->
<!--            src: '/api/files/download/200', //视频url地址-->
<!--          },-->
<!--        ],-->
<!--        poster: '', //你的封面地址-->
<!--        // width: document.documentElement.clientWidth,-->
<!--        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。-->
<!--        controlBar: {-->
<!--          timeDivider: true,-->
<!--          durationDisplay: true,-->
<!--          remainingTimeDisplay: false,-->
<!--          fullscreenToggle: true, //全屏按钮-->
<!--        },-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.fetchData();//获取的视频从何处播放的时间点-->
<!--    //   this.playerOptions.sources[0].src ='视频地址'//视频地址-->
<!--  },-->
<!--  mounted() { },-->
<!--  // computed: {-->
<!--  //     // 挂载视频组件（非必须）不写这一步也可以实现播放，添加这个是为了自定义按钮使用-->
<!--  //     player() {-->
<!--  //         return this.$refs.videoPlayer.player  // 自定义播放-->
<!--  //     }-->
<!--  // },-->
<!--  watch: {-->
<!--    playtimes(val) {//普通的watch监听-->
<!--      this.playerReadied(this.$refs.videoPlayer.player, val)-->
<!--    },-->
<!--    watchTime(val) {-->
<!--      if (val > 10) {-->
<!--        clearInterval(this.timer)-->
<!--        this.$toast.success('任务已完成')-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  destroyed() {-->
<!--    clearInterval(this.timer)-->
<!--  },-->
<!--  methods: {-->
<!--    //接口获取的视频观看起点-->
<!--    fetchData() {-->
<!--      setTimeout(() => {-->
<!--        this.playtimes = 98-->
<!--      }, 100)-->
<!--    },-->
<!--    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。-->
<!--    playerReadied(player, playtimes) {-->
<!--      player.currentTime(playtimes)-->
<!--    },-->
<!--    // 播放回调-->
<!--    onPlayerPlay(player) {-->
<!--      this.timer = setInterval(() => {-->
<!--        this.watchTime++-->
<!--      }, 1000)-->
<!--      console.log('player play!', player)-->
<!--    },-->
<!--    // 暂停回调-->
<!--    onPlayerPause(player) {-->
<!--      clearInterval(this.timer)-->
<!--      console.log('player pause!', player)-->
<!--    },-->
<!--    // 视频播完回调-->
<!--    onPlayerEnded($event) {-->
<!--      // console.log(player)-->
<!--    },-->
<!--    // DOM元素上的readyState更改导致播放停止-->
<!--    onPlayerWaiting($event) {-->
<!--      //console.log(player)-->
<!--    },-->
<!--    // 已开始播放回调-->
<!--    onPlayerPlaying($event) {-->
<!--      // console.log(player)-->
<!--    },-->
<!--    // 当播放器在当前播放位置下载数据时触发-->
<!--    onPlayerLoadeddata($event) {-->
<!--      // console.log(player)-->
<!--    },-->
<!--    // 当前播放位置发生变化时触发。-->
<!--    onPlayerTimeupdate(player) {-->
<!--      this.currentTime = Math.floor(player.cache_.currentTime)-->
<!--      // console.log(' onPlayerTimeupdate!', this.gklog)-->
<!--    },-->
<!--    //媒体的readyState为HAVE_FUTURE_DATA或更高-->
<!--    onPlayerCanplay(player) {-->
<!--      // console.log('player Canplay!', player)-->
<!--      this.duration = Math.floor(player.cache_.duration)-->
<!--    },-->
<!--    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。-->
<!--    onPlayerCanplaythrough(player) {-->
<!--      // console.log('player Canplaythrough!', player)-->
<!--    },-->
<!--    //播放状态改变回调-->
<!--    playerStateChanged(playerCurrentState) {-->
<!--      //console.log('player current update state', playerCurrentState)-->
<!--    },-->
<!--    playVideo() {-->
<!--      this.$refs.videoPlayer.player.play()-->
<!--    },-->
<!--    pauseVideo() {-->
<!--      this.$refs.videoPlayer.player.pause()-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style lang='less'>-->
<!--.video-info-wrap {-->
<!--  padding: 20px 15px;-->
<!--}-->
<!--</style>-->
<!--<style lang='less' scoped>-->
<!--.btn-wrap {-->
<!--  margin-top: 30px;-->
<!--  display: flex;-->
<!--  justify-content: space-around;-->

<!--  button {-->
<!--    width: 44% !important;-->
<!--  }-->
<!--}-->
<!--</style>-->




<!--<template>-->
<!--  <div class="my_video">-->
<!--    <video-player class="video-player vjs-custom-skin"-->
<!--                  ref="videoPlayer"-->
<!--                  :playsinline="true"-->
<!--                  :options="videoPlayerOptions"-->
<!--                  @play="onPlayerPlay($event)"-->
<!--                  @pause="onPlayerPause($event)"-->
<!--                  @ended="onPlayerEnded($event)"-->
<!--                  @waiting="onPlayerWaiting($event)"-->
<!--                  @playing="onPlayerPlaying($event)"-->
<!--                  @loadeddata="onPlayerLoadeddata($event)"-->
<!--                  @timeupdate="onPlayerTimeupdate($event)"-->
<!--                  @canplay="onPlayerCanplay($event)"-->
<!--                  @canplaythrough="onPlayerCanplaythrough($event)"-->
<!--                  @statechanged="playerStateChanged($event)"-->
<!--                  @ready="playerReadied">-->
<!--    </video-player>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// 导入组件-->
<!--import {videoPlayer} from 'vue-video-player'-->
<!--import 'video.js/dist/video-js.css'-->
<!--import 'vue-video-player/src/custom-theme.css'-->

<!--export default {-->
<!--  name: 'VideoPlayer',-->
<!--  props:{-->
<!--    videoStr:{default:""}-->
<!--  },-->
<!--  components: {-->
<!--    videoPlayer-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      video:'',         //具体视频-->
<!--      posterUrl:'',  //封面地址-->
<!--      headers:{-->
<!--        'Range':'bytes=0-1024'-->
<!--      },-->
<!--      currentTime: null,-->
<!--    }-->
<!--  },-->
<!--  mounted(){-->

<!--  },-->
<!--  methods:{-->
<!--    // 播放回调-->
<!--    onPlayerPlay(player) {-->
<!--      console.log('player play!', player)-->
<!--    },-->

<!--    // 暂停回调-->
<!--    onPlayerPause(player) {-->
<!--      console.log('player pause!', player)-->
<!--    },-->

<!--    // 视频播完回调-->
<!--    onPlayerEnded($event) {-->
<!--      // this.$refs.videoPlayer.player.src(this.fileUrl)-->
<!--      // $event-->
<!--    },-->

<!--    // DOM元素上的readyState更改导致播放停止-->
<!--    onPlayerWaiting($event) {-->
<!--      console.log($event)-->
<!--    },-->

<!--    // 已开始播放回调-->
<!--    onPlayerPlaying($event) {-->
<!--      console.log($event)-->
<!--    },-->

<!--    // 当播放器在当前播放位置下载数据时触发-->
<!--    onPlayerLoadeddata($event) {-->
<!--      console.log($event)-->
<!--    },-->

<!--    // 当前播放位置发生变化时触发。-->
<!--    onPlayerTimeupdate($event) {-->
<!--      this.currentTime = player.cache_.currentTime-->
<!--      console.log($event)-->
<!--    },-->

<!--    //媒体的readyState为HAVE_FUTURE_DATA或更高-->
<!--    onPlayerCanplay(player) {-->
<!--      console.log('player Canplay!', player)-->
<!--    },-->

<!--    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。-->
<!--    onPlayerCanplaythrough(player) {-->
<!--      console.log('player Canplaythrough!', player)-->
<!--    },-->

<!--    //播放状态改变回调-->
<!--    playerStateChanged(playerCurrentState) {-->
<!--      console.log('player current update state', playerCurrentState)-->
<!--    },-->

<!--    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。-->
<!--    playerReadied(player) {-->
<!--      console.log('example player 1 readied', player);-->
<!--      player.currentTime(this.currentTime)-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    videoPlayerOptions () {-->
<!--      return {-->
<!--        playbackRates: [0.75, 1.0, 1.25, 1.5, 2.0], //播放速度-->
<!--        autoplay: false, // 是否自动播放。-->
<!--        muted: false, // 是否静音播放，默认情况下将会消除任何音频。-->
<!--        loop: false, // 是否循环播放。-->
<!--        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
<!--        language: 'zh-CN',-->
<!--        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
<!--        fluid: true, // 是否流体从而按比例缩放以适应其容器。-->
<!--        flash: {hls: {withCreadentials: false}},//可以播放rtmp视频-->
<!--        html5: {hls: {withCreadentials: false}},//可以播放m3u8视频-->
<!--        sources: [{-->
<!--          type: 'video/mp4',-->
<!--          src: '/api/files/download/200', // 视频url地址-->

<!--        }],-->
<!--        poster: this.posterUrl, // 封面地址-->
<!--        width: '100%',-->
<!--        notSupportedMessage: '此视频暂无法播放...', // 当无法播放时允许覆盖Video.js，显示的默认信息。-->
<!--        controlBar: {-->
<!--          timeDivider: true,-->
<!--          durationDisplay: true,-->
<!--          remainingTimeDisplay: false,-->
<!--          fullscreenToggle: true-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->
<!--<style scoped >-->
<!--.my_video{-->
<!--  width: 100%;-->
<!--  height: 60%;-->

<!--}-->
<!--.video-js .vjs-big-play-button{-->
<!--  /*对播放按钮的样式进行设置*/-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  border-radius: 50%;-->
<!--}-->
<!--</style>-->


<template>
  <div class="player-container">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @statechanged="playerStateChanged($event)"
                  @ready="playerReadied">
    </video-player>
  </div>
</template>

<script>
import Vue from "vue";
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)

export default {
  name: "CourseNodeVideoPlayer",
  data(){
    return {
      watchTime: 0,
      timer: null,
      currentTime: null,//当前播放时长
      playtimes: "", //视频观看起点
      duration: 0,//总时长
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            // src: require('@/assets/test.mp4')
            // src: '/api/files/download/200', //视频url地址
            src: '/api/video/play/217'
          },
        ],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          currentTimeDisplay: false, // 当前时间
          volumeControl: true, // 声音控制键
          playToggle: true, // 暂停和播放键
          progressControl: true, // 进度条
          fullscreenToggle: true // 是否显示全屏按钮
        },
      }
    }
  },
  methods:{
    // 播放回调
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    // 暂停回调
    // onPlayerPause(player) {
    //   console.log('player pause!', player)
    // },
    onPlayerPause(player) {
      console.log('player pause currentTime!', player.cache_.currentTime);
      //TODO   存储player.currentTime 是当前暂停时间    用于下次断续播放
    },

    // 视频播完回调
    onPlayerEnded($event) {
      // this.$refs.videoPlayer.player.src(this.fileUrl)
      // $event
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting($event) {
      console.log($event)
    },

    // 已开始播放回调
    onPlayerPlaying($event) {
      console.log($event)
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
      console.log($event)
    },

    /* 获取视频播放进度 */
    onPlayerTimeupdate (player) {
      this.currentTime = player.cache_.currentTime
      // console.log(this.currentTime)
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      console.log('example player 1 readied', player);
      player.currentTime(this.currentTime)
    },
  },
}
</script>

<style scoped>
.course_node_video {
  width: 100%;
  height: auto;
  margin: 0 auto;
  text-align: center;
}
/*.course_node_video >>> .vjs-progress-control{*/
/*  pointer-events: none;*/
/*}*/
</style>
