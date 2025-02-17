let mytoken = 'auto'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken =''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID =''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99;//TB
let timestamp = 4102329600000;//2099-12-31

//节点链接 + 订阅链接
let MainData = ``;  // 初始化为空字符串,后续从环境变量获取

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; 
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini";
let subProtocol = 'https';
let PROXYIP = ''; 

// 配置常量
const TIMEOUT_MS = 5000; // 请求超时时间设置为5秒
const DEFAULT_CHUNK_SIZE = 1024 * 1024; // 1MB chunks for large data processing

export default {
    async fetch(request, env) {
        try {
            const userAgentHeader = request.headers.get('User-Agent');
            const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
            const url = new URL(request.url);
            const token = url.searchParams.get('token');

            // 健康检查端点
            if (url.pathname === '/health') {
                return new Response('OK', {
                    status: 200,
                    headers: { 'Content-Type': 'text/plain' }
                });
            }

            // 从环境变量加载配置
            mytoken = env.TOKEN || mytoken;
            BotToken = env.TGTOKEN || BotToken;
            ChatID = env.TGID || ChatID;
            TG = env.TG || TG;
            subconverter = env.SUBAPI || subconverter;
            
            // 处理子转换器协议
            if (subconverter.includes("http://")) {
                subconverter = subconverter.split("//")[1];
                subProtocol = 'http';
            } else {
                subconverter = subconverter.split("//")[1] || subconverter;
            }

            // 加载其他环境变量
            subconfig = env.SUBCONFIG || subconfig;
            FileName = env.SUBNAME || FileName;
            MainData = env.LINK || MainData;
            if(env.LINKSUB) urls = await ADD(env.LINKSUB);
            PROXYIP = env.PROXYIP || PROXYIP;
            SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;

            // Debug logging
            if (PROXYIP) {
                console.log('Using PROXYIP:', PROXYIP);
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const timeTemp = Math.ceil(currentDate.getTime() / 1000);
            const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);

            let UD = Math.floor(((timestamp - Date.now())/timestamp * total * 1099511627776 )/2);
            total = total * 1099511627776;
            let expire = Math.floor(timestamp / 1000);

            // 重新汇总链接
            let 重新汇总所有链接 = await ADD(MainData + '\n' + urls.join('\n'));
            let 自建节点 = "";
            let 订阅链接 = "";
            for (let x of 重新汇总所有链接) {
                if (x.toLowerCase().startsWith('http')) {
                    订阅链接 += x + '\n';
                } else {
                    自建节点 += x + '\n';
                }
            }
            MainData = 自建节点;
            urls = await ADD(订阅链接);

            // 验证访问权限
            if (!(token == mytoken || token == fakeToken || url.pathname == ("/" + mytoken) || url.pathname.includes("/" + mytoken + "?"))) {
                if (TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico") {
                    await sendMessage(`#异常访问 ${FileName}`, 
                        request.headers.get('CF-Connecting-IP'),
                        `UA: ${userAgent}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
                }
                if (env.URL302) {
                    return Response.redirect(env.URL302, 302);
                } else if (env.URL) {
                    return await proxyURL(env.URL, url, PROXYIP);
                } else {
                    return new Response(await nginx(), {
                        status: 200,
                        headers: {
                            'Content-Type': 'text/html; charset=UTF-8',
                        },
                    });
                }
            }

            // 发送订阅获取通知
            await sendMessage(`#获取订阅 ${FileName}`, 
                request.headers.get('CF-Connecting-IP'), 
                `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}`);

            // 确定订阅格式
            let 订阅格式 = determineSubscriptionFormat(userAgent, url);

            let 订阅转换URL = `${url.origin}/${await MD5MD5(fakeToken)}?token=${fakeToken}`;
            let req_data = MainData;

            // 确定 UA
            let 追加UA = determineUserAgent(url);
            
            // 获取订阅内容
            const 请求订阅响应内容 = await getSUB(urls, request, 追加UA, userAgentHeader);
            console.log(请求订阅响应内容);
            req_data += 请求订阅响应内容[0].join('\n');
            订阅转换URL += "|" + 请求订阅响应内容[1];

            if(env.WARP) 订阅转换URL += "|" + (await ADD(env.WARP)).join("|");

            // 处理订阅内容
            const encodedData = new TextEncoder().encode(req_data);
            const text = new TextDecoder().decode(encodedData);

            // 去重处理
            const uniqueLines = new Set(text.split('\n'));
            const result = [...uniqueLines].join('\n');

            // Base64 编码处理
            let base64Data = await safeBase64Encode(result);

            // 根据订阅格式返回响应
            return await generateResponse(订阅格式, base64Data, token, fakeToken, 订阅转换URL, subProtocol, subconverter, subconfig, SUBUpdateTime, UD, total, expire, FileName);

        } catch (error) {
            console.error('Worker Error:', error);
            return new Response(`Worker Error: ${error.message}`, {
                status: 500,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
    }
};

// 辅助函数
async function safeBase64Encode(data) {
    try {
        return btoa(data);
    } catch (e) {
        return await streamingBase64Encode(data);
    }
}

async function streamingBase64Encode(data, chunkSize = DEFAULT_CHUNK_SIZE) {
    let result = '';
    for(let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        result += btoa(chunk);
    }
    return result;
}

function determineSubscriptionFormat(userAgent, url) {
    if (userAgent.includes('null') || userAgent.includes('subconverter') || 
        userAgent.includes('nekobox') || userAgent.includes(('CF-Workers-SUB').toLowerCase())) {
        return 'base64';
    } else if (userAgent.includes('clash') || (url.searchParams.has('clash') && !userAgent.includes('subconverter'))) {
        return 'clash';
    } else if (userAgent.includes('sing-box') || userAgent.includes('singbox') || 
               ((url.searchParams.has('sb') || url.searchParams.has('singbox')) && !userAgent.includes('subconverter'))) {
        return 'singbox';
    } else if (userAgent.includes('surge') || (url.searchParams.has('surge') && !userAgent.includes('subconverter'))) {
        return 'surge';
    } else if (userAgent.includes('quantumult%20x') || (url.searchParams.has('quanx') && !userAgent.includes('subconverter'))) {
        return 'quanx';
    } else if (userAgent.includes('loon') || (url.searchParams.has('loon') && !userAgent.includes('subconverter'))) {
        return 'loon';
    }
    return 'base64';
}

function determineUserAgent(url) {
    if (url.searchParams.has('clash')) return 'clash';
    if (url.searchParams.has('singbox')) return 'singbox';
    if (url.searchParams.has('surge')) return 'surge';
    if (url.searchParams.has('quanx')) return 'Quantumult%20X';
    if (url.searchParams.has('loon')) return 'Loon';
    return 'v2rayn';
}

async function generateResponse(format, base64Data, token, fakeToken, 订阅转换URL, subProtocol, subconverter, subconfig, SUBUpdateTime, UD, total, expire, FileName) {
    const headers = {
        "content-type": "text/plain; charset=utf-8",
        "Profile-Update-Interval": `${SUBUpdateTime}`,
        "Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`
    };

    if (format === 'base64' || token === fakeToken) {
        return new Response(base64Data, { headers });
    }

    let subconverterUrl;
    const baseUrl = `${subProtocol}://${subconverter}/sub?url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false`;

    switch(format) {
        case 'clash':
            subconverterUrl = `${baseUrl}&target=clash`;
            break;
        case 'singbox':
            subconverterUrl = `${baseUrl}&target=singbox`;
            break;
        case 'surge':
            subconverterUrl = `${baseUrl}&target=surge`;
            break;
        case 'quanx':
            subconverterUrl = `${baseUrl}&target=quanx`;
            break;
        case 'loon':
            subconverterUrl = `${baseUrl}&target=loon`;
            break;
        default:
            return new Response(base64Data, { headers });
    }

    try {
        const subconverterResponse = await fetch(subconverterUrl);
        if (!subconverterResponse.ok) {
            throw new Error(`Subconverter request failed: ${subconverterResponse.status}`);
        }
        let content = await subconverterResponse.text();
        if (format === 'clash') {
            content = await clashFix(content);
        }
        headers["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`;
        return new Response(content, { headers });
    } catch (error) {
        console.error('Subconverter Error:', error);
        return new Response(base64Data, { headers });
    }
}

async function ADD(envadd) {
    if (!envadd) return [];
    var addtext = envadd.replace(/[    "'|\r\n]+/g, ',').replace(/,+/g, ',');
    if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
    if (addtext.charAt(addtext.length - 1) == ',') addtext = addtext.slice(0, addtext.length - 1);
    return addtext ? addtext.split(',') : [];
}

async function nginx() {
    return `
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
    `;
}

async function sendMessage(type, ip, add_data = "") {
    if (BotToken !== '' && ChatID !== '') {
        try {
            let msg = "";
            const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
            if (response.ok) {
                const ipInfo = await response.json();
                msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
            } else {
                msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
            }

            const url = `https://api.telegram.org/bot${BotToken}/sendMessage?chat_id=${ChatID}&parse_mode=HTML&text=${encodeURIComponent(msg)}`;
            const tgResponse = await fetch(url, {
                method: 'get',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
                }
            });
            
            if (!tgResponse.ok) {
                console.error('Telegram API Error:', await tgResponse.text());
            }
        } catch (error) {
            console.error('Error sending Telegram message:', error);
        }
    }
}

function base64Decode(str) {
    try {
        const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
        return new TextDecoder('utf-8').decode(bytes);
    } catch (error) {
        console.error('Base64 decode error:', error);
        return '';
    }
}

async function MD5MD5(text) {
    try {
        const encoder = new TextEncoder();
        
        const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
        const firstPassArray = Array.from(new Uint8Array(firstPass));
        const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
        const secondPassArray = Array.from(new Uint8Array(secondPass));
        const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return secondHex.toLowerCase();
    } catch (error) {
        console.error('MD5MD5 error:', error);
        throw error;
    }
}

function clashFix(content) {
    if(!content.includes('wireguard') || !content) {
        return content;
    }

    const lines = content.includes('\r\n') ? content.split('\r\n') : content.split('\n');
    let result = '';
    
    for (let line of lines) {
        if (line.includes('type: wireguard')) {
            const 备改内容 = `, mtu: 1280, udp: true`;
            const 正确内容 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
            result += line.replace(new RegExp(备改内容, 'g'), 正确内容) + '\n';
        } else {
            result += line + '\n';
        }
    }

    return result;
}

async function proxyURL(proxyURL, url, PROXYIP) {
    try {
        const URLs = await ADD(proxyURL);
        if (!URLs.length) {
            throw new Error('No valid proxy URLs found');
        }
        
        const fullURL = URLs[Math.floor(Math.random() * URLs.length)];
        const parsedURL = new URL(fullURL);
        const newURL = new URL(url.pathname + url.search, `${parsedURL.protocol}//${parsedURL.hostname}`);
        
        console.log('Original URL:', fullURL);
        console.log('Proxy IP:', PROXYIP);
        console.log('New URL:', newURL.toString());

        const requestOptions = {
            method: 'GET',
            headers: {
                'Host': parsedURL.hostname,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            cf: PROXYIP ? { resolveOverride: PROXYIP } : {}
        };

        const response = await fetch(newURL.toString(), requestOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers(response.headers)
        });

        // 添加调试信息到响应头
        newResponse.headers.set('X-Original-URL', fullURL);
        newResponse.headers.set('X-Proxy-IP', PROXYIP || 'Not Used');
        newResponse.headers.set('X-Debug-Info', 'Proxied by CF Worker');

        return newResponse;
    } catch (error) {
        console.error('Proxy Error:', error);
        return new Response(`Proxy Error: ${error.message}`, { status: 500 });
    }
}

async function getSUB(api, request, 追加UA, userAgentHeader) {
    if (!api || api.length === 0) {
        return [[], ""];
    }

    let newapi = "";
    let 订阅转换URLs = "";
    let 异常订阅 = "";
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, TIMEOUT_MS);

    try {
        const responses = await Promise.allSettled(api.map(apiUrl => 
            getUrl(request, apiUrl, 追加UA, userAgentHeader, controller)
            .then(response => response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}`)))
        ));

        for (const response of responses) {
            if (response.status === 'fulfilled') {
                const content = response.value || 'null';
                if (content.includes('proxies') && content.includes('proxy-groups')) {
                    订阅转换URLs += "|" + response.apiUrl;
                } else if (content.includes('outbounds') && content.includes('inbounds')) {
                    订阅转换URLs += "|" + response.apiUrl;
                } else if (content.includes('://')) {
                    newapi += content + '\n';
                } else if (isValidBase64(content)) {
                    newapi += base64Decode(content) + '\n';
                } else {
                    const 异常订阅LINK = `trojan://CMLiussss@127.0.0.1:8888?security=tls&allowInsecure=1&type=tcp&headerType=none#异常订阅_${encodeURIComponent(response.apiUrl)}`;
                    console.log(异常订阅LINK);
                    异常订阅 += `${异常订阅LINK}\n`;
                }
            }
        }
    } catch (error) {
        console.error('GetSUB Error:', error);
    } finally {
        clearTimeout(timeout);
    }

    const 订阅内容 = await ADD(newapi + 异常订阅);
    return [订阅内容, 订阅转换URLs];
}

async function getUrl(request, targetUrl, 追加UA, userAgentHeader, controller) {
    const newHeaders = new Headers(request.headers);
    newHeaders.set("User-Agent", `v2rayN/${追加UA} cmliu/CF-Workers-SUB ${userAgentHeader}`);

    const modifiedRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.method === "GET" ? null : request.body,
        redirect: "follow",
        signal: controller.signal
    });

    console.log(`请求URL: ${targetUrl}`);
    console.log(`请求头: ${JSON.stringify([...newHeaders])}`);
    console.log(`请求方法: ${request.method}`);

    return fetch(modifiedRequest);
}

function isValidBase64(str) {
    if (typeof str !== 'string') return false;
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    return base64Regex.test(str.trim());
}
