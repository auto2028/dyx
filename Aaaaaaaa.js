let mytoken = 'auto'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken = ''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID = ''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99; //TB
let timestamp = 4102329600000; //2099-12-31

// 添加变量 PROXYIP
let PROXYIP = '127.0.0.1'; // 自定义代理 IP 地址

// 节点链接 + 订阅链接
let MainData = `
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9b0b:67de:9048:1205:ec0d:93ed]:443/?type=ws&encryption=none&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560&security=tls&sni=vless1.durl.nyc.mn#%E9%A6%99%E6%B8%AF5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:9b01:31a6:492:9434:1f13:911c]:443/?type=ws&encryption=none&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560&security=tls&sni=vless1.durl.nyc.mn#%E9%A6%99%E6%B8%AF8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:cc62:c9a5:9e8b:f457:6abb]:443/?type=ws&encryption=none&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560&security=tls&sni=vless1.durl.nyc.mn#%E7%BE%8E%E5%9B%BD%E5%9C%A3%E4%BD%95%E5%A1%9E5
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:a9:5c14:895a:946d:cbfb:8b9f]:443/?type=ws&encryption=none&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560&security=tls&sni=vless1.durl.nyc.mn#%E7%BE%8E%E5%9B%BD%E5%9C%A3%E4%BD%95%E5%A1%9E8
vless://d87eaae1-fe70-46ad-a499-02d5cbe85181@[2606:4700:3020:84c0:353f:a923:93ad:c6a1]:443/?type=ws&encryption=none&host=vless1.durl.nyc.mn&path=%2F%3Fed%3D2560&security=tls&sni=vless1.durl.nyc.mn#%E7%BE%8E%E5%9B%BD%E6%B4%9B%E6%9D%89%E7%9F%B65
`;

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; //在线订阅转换后端，目前使用CM的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; //订阅配置文件
let subProtocol = 'https';

export default {
    async fetch(request, env) {
        const userAgentHeader = request.headers.get('User-Agent');
        const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
        const url = new URL(request.url);
        const token = url.searchParams.get('token');
        mytoken = env.TOKEN || mytoken;
        BotToken = env.TGTOKEN || BotToken;
        ChatID = env.TGID || ChatID;
        TG = env.TG || TG;
        subconverter = env.SUBAPI || subconverter;
        PROXYIP = env.PROXYIP || PROXYIP; // 从环境变量中获取 PROXYIP

        // 处理逻辑
        if (!token || token !== mytoken) {
            return new Response('Invalid token', { status: 403 });
        }

        // 输出日志或其他调试信息
        console.log(`User-Agent: ${userAgent}`);
        console.log(`Current Proxy IP: ${PROXYIP}`);
        
        // 其他代码逻辑
        // ...
        
        return new Response('Success', { status: 200 });
    }
};