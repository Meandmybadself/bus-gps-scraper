const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const FormData = require('form-data')
const jar = new tough.CookieJar();

const client = axios.create({
    baseURL: 'https://vtrans-web.hopkinsschools.org/',
    withCredentials: true,
    jar,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'vtrans-web.hopkinsschools.org',
        'Origin': 'https://vtrans-web.hopkinsschools.org',
        'Referer': 'https://vtrans-web.hopkinsschools.org',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    }
});

wrapper(client);

const getLoginPage = async () => {
    const response = await client.get('/onscreen/MyStop/LoginMobile.aspx');
    return getHiddenInputs(response.data);
}

const login = async (username, password, inputs) => {

    const data = new FormData()
    data.append('TxtBxUName', username)
    data.append('TxtBxPword', password)
    data.append('BtnLogin', 'Login')
    Object.entries(inputs).forEach(([key, value]) => {
        data.append(key, value)
    })

    const response = await client.post('/onscreen/MyStop/LoginMobile.aspx', data);
    const html = response.data;
    // Blowing up here.
    // console.log(html)
}

const getHiddenInputs = (html) => {
    const $ = cheerio.load(html);
    const inputs = $('input[type="hidden"]');
    return [...inputs].reduce((acc, input) => {
        const { name, value } = input.attribs;
        acc[name] = value;
        return acc;
    }, {})
}

(async () => {
    const loginPageInputs = await getLoginPage();
    const loginResponse = await login(process.env.USERNAME, process.env.PASSWORD, loginPageInputs);
})()