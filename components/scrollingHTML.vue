<template>
	<view class="h-100 w-100 content">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="h-100 w-100" @scrolltolower="lower">
			<view id="demo1" class="scroll-view-item">
				<rich-text :nodes="html"></rich-text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop:0,
				timeoutID:'',
			};
		},
		props:{
			html:{
				type:String,
				default:''
			}
		},
		created() {
			this.setScrollTop();
		},
		methods:{
			lower(){
				clearInterval(this.timeoutID);
				setTimeout(()=>{
					this.scrollTop = 0
					this.setScrollTop();
				},5000)
			},
			setScrollTop(){
				this.timeoutID = setInterval(()=>{
					this.scrollTop += 1;
				},50)
			}
		}
	}
</script>

<style lang="scss">
	.scroll-Y {
		height: 300px;
	}
	.scroll-view-item {
		padding-bottom: 60px;
	}
	.content{
		background-color: rgb(151,217,253);
		border-radius: 20rpx;
	}
</style>
