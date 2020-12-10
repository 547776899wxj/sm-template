<template>
	<view>
		<video id="myVideo" :src="src"
		   controls :autoplay="true" @error="endVideo" :show-fullscreen-btn="false" object-fit="fill" @ended="endVideo"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'',
				
				index:0,
			};
		},
		props:{
			listSrc:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		mounted() {
			this.src = this.listSrc[0];
		},
		methods: {
			//视频结束触发
			endVideo(){
				this.index++;
				if(this.index >= this.listSrc.length){
					this.index = 0;
				}
				this.src = this.listSrc[this.index];
			}
		}
	}
</script>

<style lang="scss">
	#myVideo{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>
