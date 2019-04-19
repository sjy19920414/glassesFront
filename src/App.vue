<template>
	<div id="app">
		<!-- <transition name="fade" mode="out-in"> -->
		<router-view v-if="!this.$route.meta.keepAlive"></router-view>
		<keep-alive>
			<router-view v-if="this.$route.meta.keepAlive"></router-view>
		</keep-alive>
		<!-- </transition> -->
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {},
		methods: {
			beforeRouteEnter(to, from, next) {
				if (!to.meta.keepAlive) { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
					to.meta.isCache = true;
				}
				next();
			},
			activated() {
				if (!this.$route.meta.isCache) {
					this.getData();
				}
				this.$route.meta.isCache = false
			},
		}
	}
</script>

<style lang="scss">
	body {
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
		// background: #1F2D3D;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
	}

	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.toolbar {
		background: #f2f2f2;
		padding: 10px;
		//border:1px solid #dfe6ec;
		margin: 10px 0px;

		.el-form-item {
			margin-bottom: 10px;
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all .2s ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
</style>