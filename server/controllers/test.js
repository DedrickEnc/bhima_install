var db = require('./../lib/db');
var q = require('q');

exports.run = function run (eq, res, next){
	var checking_list = [
		{table : 'project', request : 'SELECT * FROM project;'},
		{table : 'cash_box_account_currency', request : 'SELECT * FROM cash_box_account_currency;'},
		{table : 'permission', request : 'SELECT * FROM permission;'},
		{table : 'project_permission', request : 'SELECT * FROM project_permission;'},
		{table : 'language', request : 'SELECT * FROM language;'}
	];

	// var deleting_string = [
	// 	{table : 'project', request : 'DELETE * FROM project;'},
	// 	{table : 'cash_box_account_currency', exist : 0, request : 'DELETE * FROM cash_box_account_currency;'},
	// 	{table : 'permission', exist : 0, request : 'DELETE * FROM permission;'},
	// 	{table : 'project_permission', exist : 0, request : 'DELETE * FROM project_permission;'},
	// 	{table : 'language', exist : 0, request : 'DELETE * FROM language;'}
	// ]

	q.all(checking_list.map(function (elmt) { return db.exec(elmt.request);}))
	.then(function (data){
		var result = data.every(function (res){
			return res.length > 0;
		});
		res.send(result)
	})
	.catch(next)
	.done()
}
