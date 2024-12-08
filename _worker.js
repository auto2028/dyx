let mytoken = 'auto'; // 自定义token，可用UUID生成工具生成：https://1024tools.com/uuid
let BotToken = ''; // Telegram机器人Token，可从@BotFather获取
let ChatID = ''; // Telegram用户ID，可从@userinfobot获取
let TG = 0; // 是否推送访问信息：1为开启，0为关闭
let FileName = 'CF-Workers-SUB'; // 文件名
let SUBUpdateTime = 6; // 订阅更新时间（小时）
let total = 99; // 总流量（TB）
let timestamp = 4102329600000; // 过期时间（2099-12-31）

// 节点和订阅链接
let MainData = `
vless://b7a392e2-4ef0-4496-90bc-1c37bb234904@cf.090227.xyz:443?encryption=none&security=tls&sni=edgetunnel-2z2.pages.dev&fp=random&type=ws&host=edgetunnel-2z2.pages.dev&path=%2F%3Fed%3D2048#Example
https://sub.xf.free.hr/auto
`;

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; // 订阅转换服务
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; // 配置文件
let subProtocol = 'https';

export default {
  async fetch(request, env) {
    // 获取和处理请求信息
    const userAgent = request.headers.get('User-Agent')?.toLowerCase() || "null";
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    // 使用环境变量替代默认值
    mytoken = env.TOKEN || mytoken;
    BotToken = env.TGTOKEN || BotToken;
    ChatID = env.TGID || ChatID;
    TG = env.TG || TG;
    subconverter = env.SUBAPI || subconverter;
    subconfig = env.SUBCONFIG || subconfig;
    FileName = env.SUBNAME || FileName;
    MainData = env.LINK || MainData;

    if (env.LINKSUB) urls = await parseLinks(env.LINKSUB);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timeTemp = Math.ceil(currentDate.getTime() / 1000);
    const fakeToken = await generateDoubleMD5(`${mytoken}${timeTemp}`);

    // 计算订阅用户信息
    let UD = Math.floor(((timestamp - Date.now()) / timestamp * total * 1099511627776) / 2);
    total = total * 1099511627776;
    let expire = Math.floor(timestamp / 1000);

    // 整合所有链接
    let combinedLinks = await parseLinks(MainData + '\n' + urls.join('\n'));
    let customNodes = "";
    let subscriptionLinks = "";
    for (let link of combinedLinks) {
      if (link.toLowerCase().startsWith('http')) {
        subscriptionLinks += link + '\n';
      } else {
        customNodes += link + '\n';
      }
    }
    MainData = customNodes;
    urls = await parseLinks(subscriptionLinks);

    // 校验Token
    if (!(token === mytoken || token === fakeToken || url.pathname === ("/" + mytoken) || url.pathname.includes("/" + mytoken + "?"))) {
      if (TG === 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico") {
        await sendMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgent}\n域名: ${url.hostname}\n入口: ${url.pathname + url.search}`);
      }
      return new Response(await renderNginxPage(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      });
    }

    // 确定订阅格式
    let subscriptionFormat = detectSubscriptionFormat(userAgent, url);

    // 请求订阅数据
    const requestData = await getSubscriptionData(urls, request, subscriptionFormat);
    const base64Data = encodeBase64(requestData);

    if (subscriptionFormat === 'base64' || token === fakeToken) {
      return new Response(base64Data, {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "Profile-Update-Interval": `${SUBUpdateTime}`,
          "Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
        }
      });
    }

    // 转换为其他格式
    const convertedData = await convertSubscription(base64Data, subscriptionFormat, url);
    return new Response(convertedData, {
      headers: {
        "Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
        "content-type": "text/plain; charset=utf-8",
        "Profile-Update-Interval": `${SUBUpdateTime}`,
        "Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
      }
    });
  }
};

// Helper functions
async function parseLinks(data) {
  return data.replace(/[\t"'|\r\n]+/g, ',').split(',').filter(link => link.trim());
}

async function renderNginxPage() {
  return `
    <!DOCTYPE html>
    <html>
    <head><title>Welcome to nginx!</title></head>
    <body>
      <h1>Welcome to nginx!</h1>
      <p>If you see this page, the nginx web server is successfully installed and working.</p>
    </body>
    </html>
  `;
}

async function sendMessage(type, ip, additionalData = "") {
  if (BotToken && ChatID) {
    let msg = `${type}\nIP: ${ip}\n${additionalData}`;
    let url = `https://api.telegram.org/bot${BotToken}/sendMessage?chat_id=${ChatID}&parse_mode=HTML&text=${encodeURIComponent(msg)}`;
    await fetch(url);
  }
}

async function generateDoubleMD5(text) {
  const encoder = new TextEncoder();
  const md5First = await crypto.subtle.digest('MD5', encoder.encode(text));
  const md5Second = await crypto.subtle.digest('MD5', encoder.encode(Array.from(new Uint8Array(md5First)).map(b => b.toString(16)).join('')));
  return Array.from(new Uint8Array(md5Second)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function detectSubscriptionFormat(userAgent, url) {
  if (url.searchParams.has('clash')) return 'clash';
  if (url.searchParams.has('singbox')) return 'singbox';
  if (url.searchParams.has('surge')) return 'surge';
  if (url.searchParams.has('quanx')) return 'quanx';
  if (url.searchParams.has('loon')) return 'loon';
  return 'base64';
}

async function getSubscriptionData(apiUrls, request, format) {
  const responses = await Promise.all(apiUrls.map(api => fetch(api, { headers: { 'User-Agent': format } }).then(r => r.ok ? r.text() : '')));
  return responses.join('\n');
}

function encodeBase64(data) {
  return btoa(unescape(encodeURIComponent(data)));
}

async function convertSubscription(data, format, url) {
  const subconverterUrl = `${subProtocol}://${subconverter}/sub?target=${format}&url=${encodeURIComponent(data)}&config=${encodeURIComponent(subconfig)}`;
  const response = await fetch(subconverterUrl);
  return response.ok ? response.text() : data;
}
