<template>
	<div id="numberbox" class="numbox"> 
	 	<button class="btn btn-minus" type="button" @click="changeNum(0)">-</button>
  		<input class="numbox-input" type="number" v-model="num"/>
  		<button class="btn btn-plus" type="button" @click="changeNum(1)">+</button>
	</div>
</template>
<script>
	export default({               
		name:'numberbox',
		data(){
			return{
				num: 1,
				item: {}
			}
		},
		props:['data','index'],
		created(){
			console.log(this.index)
		},
		watch:{
			num(val){
				if(val == 0){
					document.getElementsByClassName('btn-minus')[0].color = 'silver';
					document.getElementsByClassName('btn-minus')[0].disabled = true;	
					this.item = {};		
				} else{
					document.getElementsByClassName('btn-minus')[0].color = '#333';
					document.getElementsByClassName('btn-minus')[0].disabled = false;
					this.item = {
						skuLinkCode: this.data,
						lossNum: val,
						index: this.index
					}
				}
				this.$emit('onClick', this.item);
			}
		},
		methods:{
			changeNum(val){
				if(val == 0){
					--this.num;
				}else{
					++this.num;
				}
			}
		}
  
	})
</script>
<style scoped>
	.numbox{
		position: relative;
		display: inline-block;
		width: 100px;
		height: 32px;
		padding: 0 30px;
		overflow: hidden;
		background-color: #efeff4; 
		border: 1px solid #bbb;
		border-radius: 3px;
	}
	.btn{
		display: inline-block;
		width: 30px;
		height: 100%;
		padding: 0;
		position: absolute;
		top: 0;
		font-size: 18px;
		font-weight: 400;
		overflow: hidden;
		text-align: center;
		white-space: nowrap;
		vertical-align: top;
		background-color: #f9f9f9;
		border: none;
		background-clip: padding-box;
	}
	.btn-minus{
		left: 0;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}
	.numbox-input{
		display: inline-block;
		width: 100% !important;
		height: 100%;
		padding: 0 3px;
		color: #333;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
		word-break: normal;
		border: none;
		border-right: 1px solid #ccc !important;
		border-left: 1px solid #ccc !important;
		border-radius: 0;
	}
	.btn-plus{
		right: 0;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}
</style>