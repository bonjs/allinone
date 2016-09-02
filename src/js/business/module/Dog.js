/**
 *author: spq 
 */
Ext.define('business.module.Dog', {
	extend: 'core.Component2',
	renderTo: 'a',
	
	//url: 'json/dogData.json',
	data: {
		dogName: '大黄fdsafds',
		children: [
			{dogName: 'a1'},
			{dogName: 'a2'},
			{dogName: 'a3'},
		]
	},
	template: [
		<div class="title">dog信息</div>
		<ul>
			<li>dog名称:{this.dogName == '大黄' ? '是大黄' : '不是大黄'}</li>
			<each this.children=c>
				<li>dog名称:{c.dogName}</li>
			</each>
		</ul>
	],
	constructor: function() {
		this.callParent(arguments);
		console.log('init');
	}
});
