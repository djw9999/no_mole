const puppeteer = require('puppeteer');

const { config } = require('./constants');
const { handleTimeChange } = require('./handleKkp');
const { target } = config;


const kkp = async () => {

  const browser = await puppeteer.launch(
{
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
}).catch(err => console.log('launch err', err));

  const page = await browser.newPage().catch(err => console.log('newPage err', err));;

  await page.goto(target, {
      timeout: 0
    }).catch(err => console.log('goto err', err));

  await page.waitForNavigation({
      timeout: 0
    }).catch(err => console.log('waitNavi err', err));
    
    await page.goto(target, {
      timeout: 0
    }).catch(err => console.log('goto err', err));

  const bodyHandle = await page.$$('.WB_from a[title]').catch(err => console.log('select err', err));;
  if(!bodyHandle) return;

  const time = await page.evaluate(body => {
    return body ? body.innerHTML : 'err';
  }, bodyHandle[1]).catch(err => console.log('evaluate err', err));;
  console.log('时间：',time);

  handleTimeChange(time);
  
  bodyHandle.forEach(item => item.dispose());


  await browser.close();
};
const run = () => kkp().then(() => setTimeout(() => run(), 2000));
run();