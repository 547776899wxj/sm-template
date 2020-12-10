<template>
	<view class="">
		
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="lower">
			<view id="demo1" class="scroll-view-item">作者：戴望舒
				<rich-text :nodes="strings"></rich-text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop:0,
				strings:'<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/><div>撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘作者：戴望舒 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望逢着 一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨 她彷徨在这寂寥的雨巷 撑着油纸伞 像我一样 像我一样地 默默彳亍着 冷漠、凄清，又惆怅 她静默地走近 走近，又投出 太息一般的眼光 她飘过 像梦一般地 像梦一般地凄婉迷茫 像梦中飘过 一枝丁香地 我身旁飘过这女郎 她静默地远了、远了 到了颓圮的篱墙 走尽这雨巷 在雨的哀曲里 消了她的颜色 散了她的芬芳 消散了，甚至她的 太息般的眼光 丁香般的惆怅 撑着油纸伞，独自 彷徨在悠长、悠长 又寂寥的雨巷 我希望飘过 一个丁香一样的 结着愁怨的姑娘</div></div>',
				timeoutID:'',
			};
		},
		onLoad() {
			this.setScrollTop();
		},
		methods:{
			lower(){
				console.log('lower');
				clearInterval(this.timeoutID)
				setTimeout(()=>{
					this.scrollTop = 0
					this.setScrollTop();
				},3000)
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
		height: 300px;
		text-align: center;
		font-size: 36px;
	}
</style>
