let mytoken = 'auto'; // 可自定义或使用 UUID 生成，https://1024tools.com/uuid
let BotToken = ''; // 可选，获取方式：通过 @BotFather 创建机器人
let ChatID = ''; // 可选，获取方式：通过 @userinfobot 获取
let TG = 0; // 开发者专用，1 表示推送访问信息，0 表示关闭推送
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; // 订阅更新时间，单位：小时
let total = 99; // 数据总量，单位：TB
let timestamp = 4102329600000; // 数据过期时间，默认 2099-12-31
let PROXYIP = '127.0.0.1'; // 自定义代理 IP 地址

// 节点与订阅链接
let MainData = `
vless://example1
vless://example2
`; 

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; // 订阅转换后端
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini";
let subProtocol = 'https';

// 主函数
export default {
    async fetch(request, env) {
        try {
            const url = new URL(request.url);
            const token = url.searchParams.get('token');
            const userAgent = request.headers.get('User-Agent')?.toLowerCase() || "null";
            const currentDate = new Date();

            // 获取环境变量配置
            Object.assign(env, {
                TOKEN: mytoken,
                TGTOKEN: BotToken,
                TGID: ChatID,
                SUBAPI: subconverter,
                SUBCONFIG: subconfig,
                SUBNAME: FileName,
                LINK: MainData,
                PROXYIP,
                SUBUPTIME: SUBUpdateTime,
            });

            // 校验 token
            const fakeToken = await generateFakeToken(mytoken, currentDate);
            if (![mytoken, fakeToken].includes(token)) {
                if (TG === 1) await sendTelegramMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), userAgent, url);
                return new Response(await nginxPage(), { status: 200, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
            }

            // 处理订阅链接
            let processedLinks = await processLinks(env.LINK + '\n' + urls.join('\n'));
            let subscriptionData = await fetchSubscription(processedLinks, url, userAgent);

            // 返回结果
            return new Response(subscriptionData, {
                headers: {
                    "content-type": "text/plain; charset=utf-8",
                    "Profile-Update-Interval": `${SUBUpdateTime}`,
                },
            });
        } catch (error) {
            console.error("Error occurred:", error);
            return new Response("An unexpected error occurred.", { status: 500 });
        }
    },
};

// 工具函数
async function processLinks(data) {
    let links = data.replace(/[	"'|\r\n]+/g, ',').replace(/,+/g, ',').split(',');
    return links.filter(link => link.trim().length > 0);
}

async function fetchSubscription(links, url, userAgent) {
    let format = determineFormat(url, userAgent);
    let proxyURL = buildProxyURL(links, url);
    let response = await fetch(proxyURL);
    if (!response.ok) throw new Error(`Failed to fetch subscription: ${response.statusText}`);
    let content = await response.text();

    if (format === 'clash') content = fixClashConfig(content);
    return format === 'base64' ? btoa(content) : content;
}

async function sendTelegramMessage(type, ip, userAgent, url) {
    if (BotToken && ChatID) {
        let location = await fetch(`http://ip-api.com/json/${ip}`).then(res => res.json());
        let message = `${type}\nIP: ${ip}\nLocation: ${location.country}, ${location.city}\nUA: ${userAgent}\nURL: ${url}`;
        let apiURL = `https://api.telegram.org/bot${BotToken}/sendMessage?chat_id=${ChatID}&parse_mode=HTML&text=${encodeURIComponent(message)}`;
        return fetch(apiURL, { method: 'GET' });
    }
}

async function generateFakeToken(token, date) {
    let timeTemp = Math.ceil(date.setHours(0, 0, 0, 0) / 1000);
    let firstHash = await crypto.subtle.digest('MD5', new TextEncoder().encode(`${token}${timeTemp}`));
    let secondHash = await crypto.subtle.digest('MD5', new TextEncoder().encode(Array.from(new Uint8Array(firstHash)).slice(7, 27).join('')));
    return Array.from(new Uint8Array(secondHash)).map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase();
}

function determineFormat(url, userAgent) {
    if (userAgent.includes('clash')) return 'clash';
    if (userAgent.includes('base64') || url.searchParams.has('base64')) return 'base64';
    return 'base64';
}

function buildProxyURL(links, url) {
    let proxyLink = links[Math.floor(Math.random() * links.length)];
    let proxyURL = new URL(proxyLink);
    return `${proxyURL.protocol}//${proxyURL.hostname}${proxyURL.pathname}${url.search}`;
}

function fixClashConfig(content) {
    return content.replace(/mtu: 1280, udp: true/g, 'mtu: 1280, remote-dns-resolve: true, udp: true');
}

async function nginxPage() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to nginx!</title>
        </head>
        <body>
            <h1>Welcome to nginx!</h1>
            <p>The web server is successfully installed and working. Further configuration is required.</p>
        </body>
        </html>
    `;
}
