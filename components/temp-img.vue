<template>
	<view class="h-100 w-100 temp-container">
		<uni-swiper-dot :info="info" :current="current" :dots-styles="dotsStyles" mode="dot" field="content" class="w-100 h-100 chamfering" >
			<swiper class="swiper-box" @change="change" :current="timeCurrent" >
				<swiper-item v-for="(item, index) in info" :key="index" :vertical="true">
					<view :class="item.colorClass" class="swiper-item w-100 h-100">
						<image class="image" :src="item.url" mode="scaleToFill" v-if="item.type==1" />
						<view class="w-100 h-100" style="background-color: rgb(151,217,253);" v-else></view>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="h-100 w-100 video" v-show="url">
			<video class="w-100 h-100 "  :id="'video'"  :src="url"
			   controls @error="errorVideo"  :show-fullscreen-btn="false" object-fit="fill" :autoplay="true" :loop="true" @ended="endVideo"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				dotsStyles: {
					backgroundColor: '#C0BFBD',
					border: 'none',
					color: '#fff',
					selectedBackgroundColor: '#fff',
					selectedBorder: 'none',
					bottom: 35,
				},
				timeCurrent:0,
				videoElem:null,
				interval:10000,
				muted:true,
				url:'',
			};
		},
		props:{
			info:{
				type:Array,
				default(){
					return[];
				}
			}
		},
		mounted() {
			this.videoElem =  uni.createVideoContext('video');
			if(this.info[0].type==1){
				setTimeout(()=>{
					this.timeCurrent++
				},this.interval)
			}
			else{
				this.url = this.info[0].url;
				// var video = uni.createVideoContext('video');
				// video.play();
			}
		},
		methods:{
			//轮播
			change(e) {
				this.current = e.detail.current;
				if(this.info[this.current].type==1){
					setTimeout(()=>{
						if(this.info.length-1>this.timeCurrent){
							this.timeCurrent++;
						}else{
							this.timeCurrent = 0;
						}
					},this.interval)
				}else{
					this.videoElem.seek(0);
					this.url = "";
					this.url = this.info[this.current].url;
				}
			},
			//视频结束触发
			endVideo(){
				this.videoElem.pause();
				this.url = "";
				if(this.info.length-1>this.timeCurrent){
					this.timeCurrent ++;
				}else{
					this.timeCurrent = 0;
				}
			},
			errorVideo(e){
				if(this.info[this.timeCurrent].type == 2){
					this.endVideo();
				}
			}
		}
	}
</script>

<style lang="scss">
.temp-container{
	position: relative;
	.video{
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 10px;
	}
}
.swiper-box{
	height: 100%;
	width: 100%; 
	 position: relative; 
	.swiper-item{
		width:100%;
		height: 100%;
		position: relative;
		.image{
			width:100%;
			height: 100%;
		}
		
	}
}
</style>
