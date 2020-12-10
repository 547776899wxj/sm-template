<template>
	<view class="container" @longpress="open" @click="open">
		<view class="top d-flex justify-content-between align-items-center">
			<image  src="../../static/img/logo.png" mode=""></image>
			<view class="date">
				<view>2020年10月30日</view>
				<view class="d-flex justify-content-between">
					<text>星期四</text>
					<text>10:10</text>
				</view>
			</view>
		</view>
		<view class="content w-100  pb-10">
			<tempVideo class="tempVideo " :listSrc="listSrc" v-if="contenType==1"></tempVideo>
			<tempImg class="w-100 h-100 " :info="info" v-else></tempImg>
		</view>
		<view class="bottom d-flex align-items-center">
			<tNoticeBar :list="text"></tNoticeBar>
		</view>
		<popupSet ref="popupSet"  @navTo="navBack"></popupSet>
	</view>
</template>

<script>
	import tempVideo from '../../components/temp-video.vue'
	import tempImg from '../../components/temp-img.vue'
	import tNoticeBar from '../../components/t-notice-bar.vue'
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components:{tempVideo,tNoticeBar,tempImg,popupSet},
		data() {
			return {
				text:['请注意运行模式下，因日志输出、sourcemap以及未压缩源码等原因，性能和包体积，均不及发行模式'],
				contenType:2,
				listSrc:[
					'../../static/test.mp4',
				],
				info: [{
						url: '../../static/img/1.jpg',
					},
					{
						url: '../../static/img/2.jpg',
					},
				],
			}
		},
		onLoad() {
			
		},
		methods: {
			// 打开设置
			open(){
				this.$refs.popupSet.open();
			},
			navBack(){
				uni.redirectTo({
					url:'index'
				})
			}
		}
	}
</script>

<style lang="scss">
.top{
	image{
		height: 65%;
		width: 300px;
	}
}
</style>
