//NODEJS socket.io-client 客户端测试代码 JSON消息

var client = require('socket.io-client')('http://127.0.0.1:3000');
var tools = require('./tools');

client.on('connect', function() {
	console.log('连接服务器成功，向服务器发送登录消息！');

	client.emit(tools.cmd.login, { uid: tools.randInt(10000, 99999) }, function(r) {
		console.log('登录服务器成功！', r);
		setTimeout(bigdata, 2000);
	});
});

client.on(tools.cmd.laba, function(data) {
	console.log('接收到广播：', data);
});

client.on('disconnect', function(){
	console.log('断开连接');
});

//测试大数据
function bigdata() {
	for (var i = 0; i < 10; i++) {
		var str = i + '->' + tools.randString(100, 10000);
		console.log(str);
		client.emit(tools.cmd.bigdata, str);
	};
}
