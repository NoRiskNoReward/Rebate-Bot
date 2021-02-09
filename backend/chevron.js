const puppeteer = require('puppeteer-extra');
const nodeHtmlToImage = require('node-html-to-image');
const { v4: uuidv4 } = require('uuid');
const cheerio = require('cheerio');
const request = require('request-promise-native');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fullPageScreenshot = require('puppeteer-full-page-screenshot');
var generator = require('generate-password');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const captchaSolver = require('2captcha-node').default;
const {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator');

const config1 = {
  dictionaries: [adjectives, colors],
  length: 1,
};
const config2 = {
  dictionaries: [animals],
  length: 1,
};

const captcha = captchaSolver('28e72152970789e583aa01e1ccef879c');
const axios = require('axios');

(async () => {
  var today = new Date('2020-07-01');

  today.setDate(today.getDate() + getRandomInt(0, 31));
  var installDate = new Date();
  installDate.setDate(today.getDate() + getRandomInt(10, 20));
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var todays = today;
  today = mm + '/' + dd + '/' + yyyy;

  console.log(today);
  var data = {
    email: 'a.s7.2.723.33.82.7ds.a@gmail.com',
    item: 's',
    date: 'ss s',
    subprice: 166,
    quantity: '4',
    seller: 'ss',
    address2: null,
    itemname: 'ssssss',
    image: 'true',
    fullName: 'ss ss',
    address1: '2121 armstrong dr',
    address2: 'bando 9',
    stateAbbr: 'CA',
    city: 'Pleasanton',
    zip: '94588',
  };
  var types = ['jpeg', 'jpg', 'jpg'];
  const ext = types[getRandomInt(0, 2)];

  var fullName = data['fullName'];
  var address = data['address1'];
  var address2 = data['address2'];
  var stateAbbr = data['stateAbbr'];
  var city = data['city'];
  var zip = data['zip'];
  var date = today;
  var email = data['email'];

  var subprice = 13.47;
  var quantity = 3;
  var itemname =
    'Delo 257004470 400 XLE SAE Synblend Synthetic Blend Oil 15W40';
  var imageurl =
    'https://i5.walmartimages.com/asr/e4250bd5-4397-4ff7-b497-b8b8ae0fbdcd_1.a0299ca2eddcd0fb79d159f7e12dd0c3.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
  var firstName = fullName.split(' ').slice(0, -1).join(' ');
  var lastName = fullName.split(' ').slice(-1).join(' ');

  var addresses = null;
  if (address2) {
    addresses = `${address} ${address2}`;
  } else {
    addresses = `${address}`;
  }

  //cash
  var date = today;
  var url = `http://localhost:8000/?email=${email}&seller=Amazon.com&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
  console.log(url);

  console.log(JSON.stringify(data));

  var id = uuidv4();
  puppeteer.use(StealthPlugin());

  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: '28e72152970789e583aa01e1ccef879c', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800 });
  // await page.authenticate({
  //     username: 'lff4fyij',
  //     password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  // });
  await page.setDefaultNavigationTimeout(0);

  var phoneNum = getAreaCode() + getRandomInt(1000000, 9999999).toString();
  await page.goto(url);
  var element = await page.$('body > center:nth-child(5) > b');
  var text = await page.evaluate((element) => element.textContent, element);
  await page.screenshot({
    path: `${__dirname}/images/${id}.${ext}`,
    fullPage: true,
  });
  await page.goto('https://chevronpromotions.com/Claim/Index/1337');
  await page.waitForSelector('#claimForm #FirstName');

  await page.type('#claimForm #FirstName', firstName);

  await page.type('#claimForm #LastName', lastName);
  await page.type('#Address_City', city);

  await page.select('#claimForm #Address_SelectedState', stateAbbr);

  await page.type('#Address_ZipCode', zip);
  if (address2 != null) {
    await page.waitFor(1300);

    await page.click('#Address_SuiteNum');

    await page.type('#Address_SuiteNum', address2);
  }

  await page.type('#claimForm #Address_Address1', address);

  await page.type('#claimForm #Email', email);
  await page.select('#claimForm #Promotion_SelectedChannel', '70');

  await page.type('.container #Store_Address_Address1', addresses);
  await page.type('#claimForm #Store_Address_City', city);

  await page.select('#claimForm #Store_Address_SelectedState', stateAbbr);
  await page.type('#claimForm #Store_Address_ZipCode', zip);

  await page.type('#claimForm #Receipt_Number', text.substr(25));

  await page.focus('#Receipt_PurchaseDate');
  await page.$eval('#Receipt_PurchaseDate', (e) =>
    e.removeAttribute('readonly')
  );
  await page.type('#Receipt_PurchaseDate', today);
  await page.click(
    '#products_validation > .row:nth-child(14) #Promotion_SelectedProduct'
  );

  const fileInput = await page.$('#Receipt_ProofPurchase');
  await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
  await page.waitFor(750);
  await page.click('#btn-submit');
  await page.waitFor(500);
  await page.waitForSelector(
    'body > div:nth-child(3) > div > div > div > p:nth-child(1) > strong'
  );
  element = await page.$(
    'body > div:nth-child(3) > div > div > div > p:nth-child(1) > strong'
  );
  text = await page.evaluate((element) => element.textContent, element);
  text = `Claim ID: ${text}`;
})();
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
Array.prototype.contains = function (v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};
Array.prototype.unique = function () {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
function genArray() {
  var arr = [];
  for (var y = 0; y < 11; y++) {
    arr.push(getRandomInt(0, 11));
  }
  arr = arr.unique();
  var lmao = [];
  lmao.push(arr[0]);
  lmao.push(arr[1]);
  lmao.push(arr[2]);
  return lmao;
}
async function getResp(imageurl) {
  solver.decodeUrl(
    imageurl,
    { pollingInterval: 10000 },
    function (err, result, invalid) {
      resolve(result.text);
    }
  );
}
function abbrState(input, to) {
  var states = [
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ];

  if (to == 'abbr') {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return states[i][1];
      }
    }
  } else if (to == 'name') {
    input = input.toUpperCase();
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
}
async function monitor(selector, page, phoneNum, callback, prevValue) {
  var newVal;
  try {
    newVal = await page.$(selector);
  } catch (e) {
    return phoneNum;
  }
  var text;
  if (newVal !== prevValue) {
    text = await page.evaluate((newVal) => newVal.textContent, newVal);
    while (text == 'Please enter a valid phone number.') {
      await callback(newVal, page, phoneNum);
      await page.waitFor(1000);
      const s = await page.waitForSelector(
        '#create-new-profile__phone > span',
        {
          visible: true,
        }
      );
      console.log(s);
      text = await page.evaluate((newVal) => newVal.textContent, newVal);
      if (text != 'Please enter a valid phone number.') {
        return phoneNum;
      }
    }
    return phoneNum;
  }
  /* add some delay */
  await new Promise((_) => setTimeout(_, 1000));
  /* call recursively */
  if (text == 'Please enter a valid phone number.') {
    monitor(selector, callback, newVal);
  }
}
async function phone(page, phoneNum) {
  try {
    const s = await page.waitForSelector('#create-new-profile__phone > span', {
      visible: true,
      timeout: 500,
    });
  } catch (e) {
    return phoneNum;
  }
  const input = await page.$('#phone');
  await page.focus('#phone');
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  phoneNum = getAreaCode() + getRandomInt(1000000, 9999999).toString();
  await page.keyboard.type(phoneNum);
  return phoneNum;
}
function getAreaCode() {
  var code = [650, 925, 408, 510];
  return code[~~(code.length * Math.random())].toString();
}
