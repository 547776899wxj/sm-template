<template>
	<view class="container" @longpress="open" @click="open" :style="{padding:containerPadding}">
		<view class="top d-flex justify-content-between align-items-center" v-if="isShowData">
			<image src="../../static/img/logo.png" mode=""></image>
			<view class="date">
				<view><text>{{ dateText.year }}年{{ dateText.month }}月{{ dateText.date }}日</text></view>
				<view class="d-flex justify-content-between">
					<text>{{ dateText.day }}</text>
					<text>{{ dateText.time }}</text>
				</view>
			</view>
		</view>
		<!-- 竖屏 -->
		<view class="content w-100 pb-20" v-if="isVertical" :style="{height:contentHeight}">
			<view class="w-100 " :style="{height:content.length>1?content[0].height+'%':'100%'}" :class="content.length>1?'pb-20':''">
				<scrollingHtml :html='content[0].info' v-if="content[0].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[0].info" v-else></tempImg>
			</view>
			<view class="w-100 " :style="{height:content[1].height+'%'}" v-if="content.length>1">
				<scrollingHtml :html='content[1].info' v-if="content[1].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[1].info" v-else></tempImg>
			</view>
		</view>
		<!-- 横屏 -->
		<view class="content w-100 d-flex pb-10" v-else :style="{height:contentHeight}">
			<view class="h-100 " :style="{width:content.length>1?content[0].width+'%':'100%'}" :class="content.length>1?'pr-10':''">
				<scrollingHtml :html='content[0].info' v-if="content[0].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[0].info" v-else></tempImg>
			</view>
			<view class="h-100 " :style="{width:content[1].width+'%'}" v-if="content.length>1">
				<scrollingHtml :html='content[1].info' v-if="content[1].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[1].info" v-else></tempImg>
			</view>
		</view>
		<view class="bottom d-flex align-items-center" v-if="isShowNoticeBar">
			<tNoticeBar :list="text"></tNoticeBar>
		</view>
		<popupSet ref="popupSet"  @confirm="confirm"></popupSet>
	</view>
</template>

<script>
	import tempVideo from '../../components/temp-video.vue'
	import tempImg from '../../components/temp-img.vue'
	import tNoticeBar from '../../components/t-notice-bar.vue'
	import scrollingHtml from '../../components/scrollingHTML.vue'
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components:{tempVideo,tNoticeBar,tempImg,popupSet,scrollingHtml},
		data() {
			return {
				text:['请注意运行模式下，因日志输出、sourcemap以及未压缩源码等原因，性能和包体积，均不及发行模式'],
				content:[
					// {
					// 	type:1,
					// 	listSrc:[
					// 		'../../static/test.mp4',
					// 	],
					// 	height:65,
					// 	width:65,
					// },
					{
						type:2,
						info: [{
								url: '../../static/img/1.jpg',
								type:1,
							},
							{
								url: '../../static/test.mp4',
								type:2,
							},
						],
						height:35,
						width:35,
					},
					{
						type:3,
						info:'<div style="text-align:center; font-size:40px"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/><div>撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘作者：戴望舒 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘<div>结束</div><div>结束</div><div>结束1</div><div>结束2</div><div>结束3</div><div>结束4</div></div></div>',
						height:65,
						width:65,
					},
				],
				isVertical:true,
				isShowData:true,
				isShowNoticeBar:true,
				contentHeight:'80%',
				containerPadding:'',
				weekday:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
				dateText:{}
			}
		},
		onLoad() {
			//计算内容高度
			uni.getSystemInfo({
			    success: (res)=> {
					let height  = 80;
					if(!this.isShowData && !this.isShowNoticeBar){
						height = 100;
						this.containerPadding = '0px';
					}else if(!this.isShowData || !this.isShowNoticeBar){
						height = 90;
					}
					if(res.windowWidth<=1200 && height!=100){
						if(height==80 || !this.isShowNoticeBar){
							height += 3;
						}else if(!this.isShowData){
							height += 1;
						}
					}
					this.contentHeight = height+'%';
					
			    }
			});
			this.newDate()
		},
		methods: {
			open(){
				this.$refs.popupSet.open();
			},
			confirm(){
				this.isVertical = !this.isVertical;
			},
			//当前时间
			newDate(dataTime=new Date()) {
				let date = new Date(dataTime);
				this.dateText = {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					date: date.getDate(),
					day: this.weekday[date.getDay()],
					time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				};
			},
		}
	}
</script>

<style lang="scss">
	.top{
		image{
			height: 65%;
			width: 600rpx;
		}
	}
	@media screen and (max-width: 1200px) {
	    .top{
	    	height: 8%;
	    	image{
	    		height: 57%;
	    		width: 370px;
	    	}
	    	.date{
	    		font-size: 35px;
	    	}
	    }
	    .bottom{
	    	height: 8.3%;
	    }
	    .content{
	    	height: 83%;
	    }
	    .container{
	    	 padding: 0 30px 30px 30px;
	    }
	    view{
	    	box-sizing: border-box;
	    }
	}
	
</style>
