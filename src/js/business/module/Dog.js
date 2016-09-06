/**
 *author: spq 
 */
Ext.define('business.module.Dog', {
	extend: 'core.Component',
	
	//url: 'json/dogData.json',
	data: {
		dogName: '大黄',
		children: [
			{dogName: 'a1'},
			{dogName: 'a2'},
			{dogName: 'a3'}
		]
	},
	template: [
		<div class="title">dog信息</div>
		<ul>
			<li>dog名称:{this.dogName == '大黄' ? '是大黄' : '不是大黄'}</li>
			<each this.children=c>
				<li class="a" style="">dog名称:{c.dogName}</li>
			</each>
			
		</ul>
		<button class=test>test</button>
	],
	constructor: function() {
		this.callParent(arguments);
		
		var data = {
			dogName: '小黄',
			children: [
				{dogName: 'a1'},
				{dogName: 'a2'}
			]
		}
		
		$(this.el).on('click', '.a', function() {
			console.log(this);
		});
		$('button', this.el).on('click', function() {
			this.el.innerHTML = bon.render(this.template, data);
		}.bind(this));
		
	}
});
