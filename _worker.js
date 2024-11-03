
// 部署完成后在网址后面加上这个，获取自建节点和机场聚合节点，/?token=auto或/auto或

let mytoken = 'auto'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken =''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID =''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99;//TB
let timestamp = 4102329600000;//2099-12-31

//节点链接 + 订阅链接
let MainData = `
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:90c5:f1b8:e1c8:9b24:affc:bfc3]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港1
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9c69:1d82:3a40:abb0:e49c:2782]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港2
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9ada:f5f2:e840:dc02:6ba7:bb18]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港3
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9ad8:6fc8:b147:fb0:45de:d08a]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港4
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9b0b:67de:9048:1205:ec0d:93ed]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9b08:6332:d600:64de:962d:7fa2]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港6
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9c67:9892:e26d:e7ec:47cf:12ee]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港7
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9b01:31a6:492:9434:1f13:911c]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9c60:5cdd:118a:a6c9:f95f:54cb]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港9
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:8ca7:8ca5:29b:6cfd:7aad:33e1]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#香港10
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:bd0a:3532:6610:daa8:f890]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞1
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:2f99:23f2:69cc:b3fe:b8ea]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞2
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:7f10:2a1f:a7bd:a8bc:8fbe]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞3
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:a7e:ff1:41de:7eed:2bf]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞4
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:cc62:c9a5:9e8b:f457:6abb]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:4b47:cc2c:b286:4dda:c4b2]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞6
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:2c05:1051:d37f:ce6d:f5c2]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞7
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:5c14:895a:946d:cbfb:8b9f]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:1b00:aac3:8d9e:37f3:374b]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞9
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:fc76:5bec:d075:725d:7ac8]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国圣何塞10
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3055:b86c:1fad:7919:7a2a:9a97]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶1
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2a06:98c1:3123:bdb7:e7d4:2c77:772c:89b4]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶2
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3110:bb98:78bb:7c2:56cd:98e0]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶3
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3021:1d72:7fa8:e207:7556:aaca]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶4
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3020:84c0:353f:a923:93ad:c6a1]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3022:9697:7fb4:645f:b3c7:46c6]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶6
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3029:bf4a:5e58:96a6:16da:219d]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶7
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:440b:4c7e:8083:8b64:44f5:a4fe]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:4408:63c6:286c:ef77:71ee:cfb4]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶9
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:4409:c8c9:95c2:b89a:1985:b340]:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国洛杉矶10
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@hugh.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山1
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@nina.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山2
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@kaiser.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山3
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@dan.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山4
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@dina.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@anton.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山6
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@elijah.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山7
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@erin.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@hadlee.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山9
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@ignacio.ns.cloudflare.com:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#美国旧金山10
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:3034:16d9:ce6b:c55a:21f2:af63:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图1
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:28:e6c4:92d7:e377:e24b:a8fa:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图2
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:3033:998:709b:bb6b:7d78:206c:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图3
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:2b:fe6f:204c:4d1c:a086:e0e6:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图4
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:25:1cc9:7983:7193:1c6:34a6:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:3037:9c8d:f2b4:550b:852b:61d2:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图6
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:3030:8a0:98f2:2b84:a1b4:531f:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图7
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:3036:80fc:1902:fa89:ff1:e0f9:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:2a:d5f4:b529:f390:4d07:76dd:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图9
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@2606:4700:3032:bc65:5821:a31e:1033:b690:443?encryption=none&security=tls&sni=vless1.durl.nyc.mn&type=ws&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560#西雅图10
`

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; //在线订阅转换后端，目前使用CM的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; //订阅配置文件
let subProtocol = 'https';

export default {
	async fetch (request,env) {
		const userAgentHeader = request.headers.get('User-Agent');
		const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
		const url = new URL(request.url);
		const token = url.searchParams.get('token');
		mytoken = env.TOKEN || mytoken;
		BotToken = env.TGTOKEN || BotToken;
		ChatID = env.TGID || ChatID; 
		TG =  env.TG || TG; 
		subconverter = env.SUBAPI || subconverter;
		if( subconverter.includes("http://") ){
			subconverter = subconverter.split("//")[1];
			subProtocol = 'http';
		} else {
			subconverter = subconverter.split("//")[1] || subconverter;
		}
		subconfig = env.SUBCONFIG || subconfig;
		FileName = env.SUBNAME || FileName;
		MainData = env.LINK || MainData;
		if(env.LINKSUB) urls = await ADD(env.LINKSUB);

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); 
		const timeTemp = Math.ceil(currentDate.getTime() / 1000);
		const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);
		//console.log(`${fakeUserID}\n${fakeHostName}`); // 打印fakeID

		let UD = Math.floor(((timestamp - Date.now())/timestamp * total * 1099511627776 )/2);
		total = total * 1099511627776 ;
		let expire= Math.floor(timestamp / 1000) ;
		SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;

		let 重新汇总所有链接 = await ADD(MainData + '\n' + urls.join('\n'));
		let 自建节点 ="";
		let 订阅链接 ="";
		for (let x of 重新汇总所有链接) {
			if (x.toLowerCase().startsWith('http')) {
				订阅链接 += x + '\n';
			} else {
				自建节点 += x + '\n';
			}
		}
		MainData = 自建节点;
		urls = await ADD(订阅链接);

		if ( !(token == mytoken || token == fakeToken || url.pathname == ("/"+ mytoken) || url.pathname.includes("/"+ mytoken + "?")) ) {
			if ( TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico" ) await sendMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgent}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			if (env.URL302) return Response.redirect(env.URL302, 302);
			else if (env.URL) return await proxyURL(env.URL, url);
			else return new Response(await nginx(), { 
				status: 200 ,
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
			});
		} else {
			await sendMessage(`#获取订阅 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			let 订阅格式 = 'base64';
			if (userAgent.includes('null') || userAgent.includes('subconverter') || userAgent.includes('nekobox') || userAgent.includes(('CF-Workers-SUB').toLowerCase())){
				订阅格式 = 'base64';
			} else if (userAgent.includes('clash') || ( url.searchParams.has('clash') && !userAgent.includes('subconverter'))){
				订阅格式 = 'clash';
			} else if (userAgent.includes('sing-box') || userAgent.includes('singbox') || ( (url.searchParams.has('sb') || url.searchParams.has('singbox')) && !userAgent.includes('subconverter'))){
				订阅格式 = 'singbox';
			} else if (userAgent.includes('surge') || ( url.searchParams.has('surge') && !userAgent.includes('subconverter'))){
				订阅格式 = 'surge';
			}

			let subconverterUrl ;
			let 订阅转换URL = `${url.origin}/${await MD5MD5(fakeToken)}?token=${fakeToken}`;
			//console.log(订阅转换URL);
			let req_data = MainData;

			let 追加UA = 'v2rayn';
			if (url.searchParams.has('clash')) 追加UA = 'clash';
			else if(url.searchParams.has('singbox')) 追加UA = 'singbox';
			else if(url.searchParams.has('surge')) 追加UA = 'surge';
			
			const 请求订阅响应内容 = await getSUB(urls, 追加UA, userAgentHeader);
			console.log(请求订阅响应内容);
			req_data += 请求订阅响应内容[0].join('\n');
			订阅转换URL += "|" + 请求订阅响应内容[1];

			if(env.WARP) 订阅转换URL += "|" + (await ADD(env.WARP)).join("|");
			//修复中文错误
			const utf8Encoder = new TextEncoder();
			const encodedData = utf8Encoder.encode(req_data);
			const text = String.fromCharCode.apply(null, encodedData);
			
			//去重
			const uniqueLines = new Set(text.split('\n'));
			const result = [...uniqueLines].join('\n');
			//console.log(result);
			
			const base64Data = btoa(result);

			if (订阅格式 == 'base64' || token == fakeToken){
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			} else if (订阅格式 == 'clash'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=clash&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'singbox'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=singbox&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'surge'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=surge&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			}
			//console.log(订阅转换URL);
			try {
				const subconverterResponse = await fetch(subconverterUrl);
				
				if (!subconverterResponse.ok) {
					return new Response(base64Data ,{
						headers: { 
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": `${SUBUpdateTime}`,
							"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
						}
					});
					//throw new Error(`Error fetching subconverterUrl: ${subconverterResponse.status} ${subconverterResponse.statusText}`);
				}
				let subconverterContent = await subconverterResponse.text();
				if (订阅格式 == 'clash') subconverterContent =await clashFix(subconverterContent);
				return new Response(subconverterContent, {
					headers: { 
						"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,

					},
				});
			} catch (error) {
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			}
		}
	}
};

async function ADD(envadd) {
	var addtext = envadd.replace(/[	"'|\r\n]+/g, ',').replace(/,+/g, ',');  // 将空格、双引号、单引号和换行符替换为逗号
	//console.log(addtext);
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length -1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	const add = addtext.split(',');
	//console.log(add);
	return add ;
}

async function nginx() {
	const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return text ;
}

async function sendMessage(type, ip, add_data = "") {
	if ( BotToken !== '' && ChatID !== ''){
		let msg = "";
		const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
		if (response.status == 200) {
			const ipInfo = await response.json();
			msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
		} else {
			msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
		}
	
		let url = "https://api.telegram.org/bot"+ BotToken +"/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
		return fetch(url, {
			method: 'get',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
			}
		});
	}
}

function base64Decode(str) {
	const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(bytes);
}

async function MD5MD5(text) {
	const encoder = new TextEncoder();
  
	const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
	const firstPassArray = Array.from(new Uint8Array(firstPass));
	const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

	const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
	const secondPassArray = Array.from(new Uint8Array(secondPass));
	const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
	return secondHex.toLowerCase();
}

function clashFix(content) {
	if(content.includes('wireguard') && !content.includes('remote-dns-resolve')){
		let lines;
		if (content.includes('\r\n')){
			lines = content.split('\r\n');
		} else {
			lines = content.split('\n');
		}
	
		let result = "";
		for (let line of lines) {
			if (line.includes('type: wireguard')) {
				const 备改内容 = `, mtu: 1280, udp: true`;
				const 正确内容 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
				result += line.replace(new RegExp(备改内容, 'g'), 正确内容) + '\n';
			} else {
				result += line + '\n';
			}
		}

		content = result;
	}
	return content;
}

async function proxyURL(proxyURL, url) {
	const URLs = await ADD(proxyURL);
	const fullURL = URLs[Math.floor(Math.random() * URLs.length)];

	// 解析目标 URL
	let parsedURL = new URL(fullURL);
	console.log(parsedURL);
	// 提取并可能修改 URL 组件
	let URLProtocol = parsedURL.protocol.slice(0, -1) || 'https';
	let URLHostname = parsedURL.hostname;
	let URLPathname = parsedURL.pathname;
	let URLSearch = parsedURL.search;

	// 处理 pathname
	if (URLPathname.charAt(URLPathname.length - 1) == '/') {
		URLPathname = URLPathname.slice(0, -1);
	}
	URLPathname += url.pathname;

	// 构建新的 URL
	let newURL = `${URLProtocol}://${URLHostname}${URLPathname}${URLSearch}`;

	// 反向代理请求
	let response = await fetch(newURL);

	// 创建新的响应
	let newResponse = new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});

	// 添加自定义头部，包含 URL 信息
	//newResponse.headers.set('X-Proxied-By', 'Cloudflare Worker');
	//newResponse.headers.set('X-Original-URL', fullURL);
	newResponse.headers.set('X-New-URL', newURL);

	return newResponse;
}

async function getSUB(api, 追加UA, userAgentHeader) {
	if (!api || api.length === 0) {
		return [];
	}

	let newapi = "";
	let 订阅转换URLs = "";
	const controller = new AbortController(); // 创建一个AbortController实例，用于取消请求

	const timeout = setTimeout(() => {
		controller.abort(); // 2秒后取消所有请求
	}, 2000);
	
	try {
		// 使用Promise.allSettled等待所有API请求完成，无论成功或失败
		const responses = await Promise.allSettled(api.map(apiUrl => fetch(apiUrl, {
			method: 'get', 
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'User-Agent': `${追加UA} cmliu/CF-Workers-SUB ${userAgentHeader}`
			},
			signal: controller.signal // 将AbortController的信号量添加到fetch请求中
		}).then(response => response.ok ? response.text() : Promise.reject())));
	
		// 遍历所有响应
		const modifiedResponses = responses.map((response, index) => {
			// 检查是否请求成功
			return {
				status: response.status,
				value: response.value,
				apiUrl: api[index] // 将原始的apiUrl添加到返回对象中
			};
		});
	
		console.log(modifiedResponses); // 输出修改后的响应数组
	
		for (const response of modifiedResponses) {
			// 检查响应状态是否为'fulfilled'
			if (response.status === 'fulfilled') {
				const content = await response.value || 'null'; // 获取响应的内容
				if (content.includes('proxies') && content.includes('proxy-groups')) {
					// Clash 配置
					订阅转换URLs += "|" + response.apiUrl;
				} else if (content.includes('outbounds') && content.includes('inbounds')){
					// Singbox 配置
					订阅转换URLs += "|" + response.apiUrl;
				} else {
					newapi += base64Decode(content) + '\n'; // 解码并追加内容
				}
			}
		}
	} catch (error) {
		console.error(error); // 捕获并输出错误信息
	} finally {
		clearTimeout(timeout); // 清除定时器
	}
	
	const 订阅内容 = await ADD(newapi);

	// 返回处理后的结果
	return [订阅内容,订阅转换URLs];
}
