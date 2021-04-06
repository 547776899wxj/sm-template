<template>
	<view class="container"  :style="{padding:containerPadding}">
		<view class="top d-flex justify-content-between align-items-center"  v-if="(isShowLogo || isShowData)">
			<image src="../../static/img/logo.png" mode="" @longpress="open" @click="open" v-if="isShowLogo" ></image>
			<view class="date" v-if="isShowData" >
				<view><text>{{ dateText.year }}年{{ dateText.month }}月{{ dateText.date }}日</text></view>
				<view class="d-flex justify-content-between">
					<text>{{ dateText.day }}</text>
					<text>{{ dateText.time }}</text>
				</view>
			</view>
		</view>
		<!-- 竖屏 -->
		<view class="content w-100 " v-if="isVertical && content.length>0" :style="{height:contentHeight}" :class="{'pb-20':isShowNoticeBar}">
			<view class="w-100 " :style="{height:content.length>1?content[0].modelProportion+'%':'100%'}" :class="content.length>1?'pb-20':''">
				<scrollingHtml :html='content[0].info' v-if="content[0].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[0].info" v-else></tempImg>
			</view>
			<view class="w-100 " :style="{height:content[1].modelProportion+'%'}" v-if="content.length>1">
				<scrollingHtml :html='content[1].info' v-if="content[1].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[1].info" v-else></tempImg>
			</view>
		</view>
		<!-- 横屏 -->
		<view class="content w-100 d-flex pb-10" v-else-if="content.length>0" :style="{height:contentHeight}" :class="{'pb-10':isShowNoticeBar}">
			<view class="h-100 " :style="{width:content.length>1?content[0].modelProportion+'%':'100%'}" :class="content.length>1?'pr-10':''">
				<scrollingHtml :html='content[0].info' v-if="content[0].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[0].info" v-else></tempImg>
			</view>
			<view class="h-100 " :style="{width:content[1].modelProportion+'%'}" v-if="content.length>1">
				<scrollingHtml :html='content[1].info' v-if="content[1].type==3"></scrollingHtml>
				<tempImg class="w-100 h-100" :info="content[1].info" v-else></tempImg>
			</view>
		</view>
		<view class="bottom d-flex align-items-center" v-if="isShowNoticeBar && text.length>0">
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
				text:[],
				content:[
					// {
					// 	type:2,
					// 	info: [
					// 		{
					// 			url: 'http://www.guanjinco.com/buildersystem/upload/image/11584944037577.jpg',
					// 			type:1,
					// 		},	{
					// 			url: 'http://www.guanjinco.com/buildersystem/upload/image/11584944325820.jpg',
					// 			type:1,
					// 		},
					// 		{
					// 			url: '../../static/test.mp4',
					// 			type:2,
					// 		},
					// 	],
					// 	modelProportion:35,
					// },
					// {
					// 	type:3,
					// 	info:'<div style="text-align:center; font-size:40px"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/><div>撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘作者：戴望舒 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘<div>结束</div><div>结束</div><div>结束1</div><div>结束2</div><div>结束3</div><div>结束4</div></div></div>',
					// 	modelProportion:65,
					// },
				],
				//横竖屏
				isVertical:false,
				//顶部信息
				isShowData:true,
				//底部滚动
				isShowNoticeBar:true,
				//logo
				isShowLogo:true,
				contentHeight:'80%',
				containerPadding:'',
				weekday:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
				dateText:{},
				date:null,
				intervalDataNum:null,
			}
		},
		onLoad() {
			this.init();
			this.countHeght();
		},
		watch: {
			isShowData: function (data){
				this.countHeght();
			},
			isShowNoticeBar: function (data){
				this.countHeght();
			},
			modelType: function(){
				this.countHeght();
			}
		},
		methods: {
			open(){
				// this.$refs.popupSet.open();
			},
			confirm(){
				this.isVertical = !this.isVertical;
			},
			//当前时间
			newDate(dataTime=new Date()) {
				this.date = new Date(dataTime);
				this.getDateText(this.date);
				this.intervalData();
			},
			getDateText(date){
				this.dateText = {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					date: date.getDate(),
					day: this.weekday[date.getDay()],
					time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				};
			},
			intervalData(){
				console.log(this.date);
				if(this.intervalDataNum){
					clearInterval(this.intervalDataNum);
				}
				this.intervalDataNum = setInterval(()=>{
					this.date.setMinutes(this.date.getMinutes()+1);
					this.getDateText(this.date);
					console.log(this.date);
				},60000);
			},
			init(){
				//c测试
				// setTimeout(() => {
				// 	this.content = [{type:2,info: [{url: 'http://www.guanjinco.com/buildersystem/upload/video/huzhouPartner.mp4',type:2,},{url: 'http://www.guanjinco.com/buildersystem/upload/image/11584944037577.jpg',type:1,},	{url: 'http://www.guanjinco.com/buildersystem/upload/image/11584944325820.jpg',type:1,},{url: 'http://www.guanjinco.com/buildersystem/upload/video/shanghaiPartner.mp4',type:2,},],modelProportion:35,},]
				// },) 
				// let res = {"msg": "成功","code": 1,"data": {"modelId": "28","modelName": "模板1","modelIsLogo": "true","modelIsTime": "true","modelIsSubtitle": "true","modelWindowNumber": "1","modelType": "1","modelProportion": "35","modelUrl": "http://localhost:8082/photo/d2b4ff97-7e93-4b04-b1b1-b648bfc77d02.png","modelTime": "2021-01-28 11:23:07","modelState": "1","modelFont": "35","windowsOneList": [{"sourceMaterialId": "20059","sourceMaterialName": null,"sourceMaterialURL": "../../static/test.mp4","sourceMaterialTime": "","sourceMaterialTypeId": "2","sourceMaterialState": "0"},{"sourceMaterialId": "20058","sourceMaterialName": null,"sourceMaterialURL": "../../static/img/1.jpg","sourceMaterialTime": "5","sourceMaterialTypeId": "1","sourceMaterialState": "0"}],"windowsTwoList": [{"sourceMaterialId": "20060","sourceMaterialName": null,"sourceMaterialURL": '<p style="text-align:center; font-size:40px"><b>我是</b></p><p><b><i>&nbsp; 傻逼</i></b><u> 我是傻逼&nbsp; </u><strike>我是傻逼。</strike></p><p style=\"text-align: right;\"><strike><b>傻逼</b>是我 傻逼是我&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <u>傻逼是我。</u></strike><div>撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘作者：戴望舒 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘<div></p>',"sourceMaterialTime": "0","sourceMaterialTypeId": "3","sourceMaterialState": "0"}]},"status": 1,"departmentMsg": '请注意运行模式下',"ServerTime": '2021-01-28 16:55:00'}
				// let res = {"msg":"成功","departmentMsg":"请保持安静,勿大声喧哗.","code":1,"data":{"modelId":"34","modelName":"竖屏单窗口","modelIsLogo":"true","modelIsTime":"true","modelIsSubtitle":"true","modelWindowNumber":"1","modelType":"1","modelProportion":"100","modelUrl":"http://localhost:8082/photo/ff222ae1-2f1c-414d-91da-6ec38c0886b0.png","modelTime":"2021-01-30 13:56:10","modelState":"1","modelFont":"35","windowsOneList":[{"sourceMaterialId":"20077","sourceMaterialName":null,"sourceMaterialURL":"http://192.168.100.111:8082/photos/402da228-8734-41da-9d8b-0ffcca5a6d8a.png","sourceMaterialTime":"5","sourceMaterialTypeId":"1","sourceMaterialState":"0"},{"sourceMaterialId":"20078","sourceMaterialName":null,"sourceMaterialURL":"http://192.168.100.111:8082/photos/41237ee4-db55-4372-ac1e-c062933692a1.png","sourceMaterialTime":"5","sourceMaterialTypeId":"1","sourceMaterialState":"0"},{"sourceMaterialId":"20079","sourceMaterialName":null,"sourceMaterialURL":"http://192.168.100.111:8082/photos/be25102d-8007-4a16-aa5c-4e3ac46b1cb1.png","sourceMaterialTime":"5","sourceMaterialTypeId":"1","sourceMaterialState":"0"},{"sourceMaterialId":"20080","sourceMaterialName":null,"sourceMaterialURL":"http://192.168.100.111:8082/photos/d202830b-5d2b-4917-89c7-787ff995e9c3.png","sourceMaterialTime":"5","sourceMaterialTypeId":"1","sourceMaterialState":"0"},{"sourceMaterialId":"20081","sourceMaterialName":null,"sourceMaterialURL":"http://192.168.100.111:8082/photos/ad885ad7-bd28-4ad7-9f8d-1e7c906b07a6.png","sourceMaterialTime":"5","sourceMaterialTypeId":"1","sourceMaterialState":"0"},{"sourceMaterialId":"20082","sourceMaterialName":null,"sourceMaterialURL":"http://192.168.100.111:8082/photos/3b737e52-d5d5-487c-a24d-056ec4ece119.png","sourceMaterialTime":"5","sourceMaterialTypeId":"1","sourceMaterialState":"1"}],"windowsTwoList":[]},"ServerTime":"2021-02-01 17:41:09","status":1}
				
				this.$request({
					url:'Equipment/getModel',
					success: res =>{
						setTimeout(() => {
							this.init();
						}, 600000);
						let data = res.data;
						this.isVertical = data.modelType == 1 ? true : false;
						this.isShowData = data.modelIsTime == "true" ? true :false;
						this.isShowLogo = data.modelIsLogo == "true" ? true :false;
						this.isShowNoticeBar = data.modelIsSubtitle == "true" ? true :false;
						this.text = [res.departmentMsg];
						this.newDate(res.ServerTime);
						let content = [];
						let infoOne = [];
						let infoTwo = [];
						data.windowsOneList.forEach((item) =>{
							if(item.sourceMaterialTypeId==3){
								content[0] = {
									type: item.sourceMaterialTypeId,
									info: item.sourceMaterialURL,
									modelProportion: +data.modelProportion,
								}
							}else{
								infoOne.push({
									url: item.sourceMaterialURL,
									type: item.sourceMaterialTypeId,
								})
							}
						})
						if(infoOne.length > 0){
							content[0] = {
								info: infoOne,
								modelProportion: +data.modelProportion,
								type: 2,
							}
						}
						data.windowsTwoList.forEach((item) =>{
							if(item.sourceMaterialTypeId==3){
								content[1] = {
									type: item.sourceMaterialTypeId,
									info: item.sourceMaterialURL,
									modelProportion: 100 - (+data.modelProportion),
								}
							}else{
								infoTwo.push({
									url: item.sourceMaterialURL,
									type: item.sourceMaterialTypeId,
								})
							}
						})
						if(infoTwo.length > 0){
							content[1] = {
								info: infoTwo,
								modelProportion: 100 - (+data.modelProportion),
								type: 2,
							}
						}
						this.content = content;
						console.log(content);
						
					},
					fail: err => {
						console.error(err);
						setTimeout(() => {
							this.init();
						}, 600000);
					}
				})
			},
			countHeght(){
				//计算内容高度
				uni.getSystemInfo({
				    success: (res)=> {
						let height  = 80;
						if((!this.isShowData && !this.isShowLogo) && !this.isShowNoticeBar){
							height = 100;
							this.containerPadding = '0px';
						}else if((!this.isShowData && !this.isShowLogo) || !this.isShowNoticeBar){
							height = 90;
						}
						if(res.windowWidth<=1200 && height!=100){
							if(height==80 || !this.isShowNoticeBar){
								height += 3;
							}else if((!this.isShowData && !this.isShowLogo)){
								height += 1;
							}
						}
						this.contentHeight = height+'%';
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.top{
		image{
			height: 75%;
			width:440px;
		}
	}
	@media screen and (max-width: 1200px) {
	    .top{
	    	height: 9%;
	    	image{
	    		height: 65%;
	    		width: 520px;
	    	}
	    	.date{
	    		font-size: 35px;
	    	}
	    }
	    .bottom{
	    	height: 7.3%;
	    }
	    .content{
	    	height: 83%;
	    }
	    .container{
	    	 padding: 0 30px 10px 30px;
	    }
	    view{
	    	box-sizing: border-box;
	    }
	}
	
</style>
