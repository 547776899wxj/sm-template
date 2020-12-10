<template>
	<view class="h-100 w-100 ">
		<uni-swiper-dot :info="info" :current="current" :dots-styles="dotsStyles" mode="dot" field="content" class="w-100 h-100 chamfering" >
			<swiper class="swiper-box" @change="change" :current="timeCurrent">
				<swiper-item v-for="(item, index) in info" :key="index" >
					<view :class="item.colorClass" class="swiper-item w-100 h-100">
						<image class="image" :src="item.url" mode="aspectFill" v-if="item.type==1" />
						<video muted="muted" :id="'video'+index" class="h-100 w-100" v-else :src="item.url"
						   controls :autoplay="true"  @error="endVideo" :show-fullscreen-btn="false" object-fit="fill" @ended="endVideo"></video>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
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
				videoElem:{},
				interval:5000,
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
			if(this.info[0].type==1){
				setTimeout(()=>{
					this.timeCurrent++
				},this.interval)
			}
			this.info.forEach((item,index)=>{
				if(item.type!=1){
					let id = 'video'+index;
					this.videoElem[id] = document.querySelector('#'+id+' video')
				}
			})
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
					var video = this.videoElem['video'+this.current];
					video.play();
				}
				
			},
			//视频结束触发
			endVideo(){
				if(this.info.length-1>this.timeCurrent){
					this.timeCurrent ++;
				}else{
					this.timeCurrent = 0;
				}
			}
		}
	}
</script>

<style lang="scss">
.swiper-box{
	height: 100%;
	width: 100%;
	 position: relative; 
	.swiper-item{
		.image{
			width:100%;
			height: 100%;
		}
	}
	}
</style>
