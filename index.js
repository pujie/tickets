const pouchdb = require('pouchdb');
const express = require('express');
var app = express();
pouchdb.plugin(require('pouchdb-find'));
var dbTicket = new pouchdb('tickets');
app.get('/',function(req,res){
	console.log("PadiNET");
	dbTicket.allDocs({include_docs:true})
	.then(res=>{
		res.rows.forEach(row=>{
			console.log(row.doc);
		});
	})
	.catch(err=>{
		console.log('Error get',err);
	});
});
app.get('/createTicket',function(req,res){
	dbTicket.put({
		_id:'ticket1',
		createDate:'2015-12-01',
		description:'Hello Ticket'
	})
	.then(res=>{
		console.log('SUCCESS CREATE TICKET',res);
	})
	.catch(err=>{
		console.log('ERROR CREATE TICKET',err);
	});
});
app.listen(process.env.PORT || 2000);

