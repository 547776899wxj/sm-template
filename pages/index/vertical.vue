<template>
	<view class="container" @longpress="open" @click="open">
		<tempVideo class="tempVideo" :listSrc="listSrc" v-if="contenType==1"></tempVideo>
		<tempImg class="w-100 h-100" :info="info" v-else></tempImg>
		<!-- <scrollingHtml></scrollingHtml> -->
		<popupSet ref="popupSet"  @navTo="navBack"></popupSet>
	</view>
	
</template>

<script>
	import tempVideo from '../../components/temp-video.vue'
	import tempImg from '../../components/temp-img.vue'
	import scrollingHtml from '../../components/scrollingHTML.vue'
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components:{tempVideo,tempImg,popupSet,scrollingHtml},
		data() {
			return {
				contenType:1,
				listSrc:[
					'../../static/test.mp4',
				],
				info: [{
						url: '../../static/img/1.jpg',
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
					}
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

<style>
	.container{
		padding: 0;
	}
</style>
