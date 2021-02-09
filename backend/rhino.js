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
  dd = String(installDate.getDate()).padStart(2, '0');
  mm = String(installDate.getMonth() - 1).padStart(2, '0'); //January is 0!
  yyyy = installDate.getFullYear();
  console.log(today);
  installDate = mm + '/' + dd + '/' + yyyy;
  console.log(installDate);

  var data = {
    email: 'a.s7.2.ssxdasdx.21.dasadssnjkds7ds.a@gmail.com',
    item: 's',
    date: 'ss s',
    subprice: 166,
    quantity: '4',
    seller: 'ss',
    address2: null,
    itemname: 'ssssss',
    image: 'true',
    fullName: 'ss ss',
    address1: '2145 armstrong dr',
    stateAbbr: 'CA',
    city: 'Pleasanton',
    zip: '94588',
  };
  var types = ['jpeg', 'jpeg', 'png'];
  const ext = types[getRandomInt(0, 2)];

  var fullName = data['fullName'];
  var address = data['address1'];
  var address2 = data['address2'];
  var stateAbbr = data['stateAbbr'];
  var city = data['city'];
  var zip = data['zip'];
  var date = today;
  var email = data['email'];

  var subprice = 1047.79;
  var quantity = 1;
  var itemname = 'Go Rhino SPORT BAR 2.0 MID SIZE';
  var firstName = fullName.split(' ').slice(0, -1).join(' ');
  var lastName = fullName.split(' ').slice(-1).join(' ');

  var addresses = null;
  if (address2) {
    addresses = `${address} ${address2}`;
  } else {
    addresses = `${address}`;
  }
  var passwords = generator.generateMultiple(3, {
    length: 15,
    uppercase: true,
    numbers: true,
    symbols: true,
    strict: true,
    lowercase: true,
  });

  //cash
  var date = today;
  var url = `http://localhost:8000/jegs2?email=${email}&seller=Amazon.com&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
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
  var element = await page.$(
    'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr:nth-child(1) > td > span'
  );
  var text = await page.evaluate((element) => element.textContent, element);

  await page.screenshot({
    path: `${__dirname}/images/${id}.${ext}`,
    fullPage: true,
  });

  await page.goto('https://gobigerewards.com/Claims/SubmitClaim.aspx?ptype=6');

  await page.waitForSelector(
    '.row #ctl00_DefaultContent_FindPromoControl_PurchaseDateRadDatePicker_dateInput'
  );
  await page.type(
    '.row #ctl00_DefaultContent_FindPromoControl_PurchaseDateRadDatePicker_dateInput',
    today
  );

  await page.waitForSelector(
    '.row #DefaultContent_FindPromoControl_FindPromotionLinkButton'
  );
  await page.click(
    '.row #DefaultContent_FindPromoControl_FindPromotionLinkButton'
  );
  await page.waitForSelector(
    '.row > #PromotionDiv #DefaultContent_FindPromoControl_ProgramRepeater_SelectProgramUserControl_0_SelectProgram_0'
  );
  await page.click(
    '.row > #PromotionDiv #DefaultContent_FindPromoControl_ProgramRepeater_SelectProgramUserControl_0_SelectProgram_0'
  );
  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactFirstNameRadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactFirstNameRadTextBox',
    firstName
  );

  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactLastNameRadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactLastNameRadTextBox',
    lastName
  );

  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationLine1RadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationLine1RadTextBox',
    address
  );

  if (address2 != null) {
    await page.type(
      '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationLine2RadTextBox'
    );
  }
  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationPostalCodeRadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationPostalCodeRadTextBox',
    zip
  );

  await page.waitForSelector(
    '.row #ctl00_DefaultContent_ContactInfoControl_LocationStateProvinceAbbreviationRadComboBox_Input'
  );
  await page.type(
    '.row #ctl00_DefaultContent_ContactInfoControl_LocationStateProvinceAbbreviationRadComboBox_Input',
    stateAbbr
  );
  await page.keyboard.press('Enter');
  await page.waitFor(1050);
  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_EmailAddressRadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_EmailAddressRadTextBox',
    email
  );

  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_PhoneNumberRadMaskedTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_PhoneNumberRadMaskedTextBox',
    phoneNum
  );
  await page.waitForSelector(
    '#DefaultContent_DealershipDropDownPanel > .row > #DealershipDropdownList_chosen > .chosen-single > span'
  );
  await page.click(
    '#DefaultContent_DealershipDropDownPanel > .row > #DealershipDropdownList_chosen > .chosen-single > span'
  );

  await page.waitForSelector(
    '.row > #DealershipDropdownList_chosen > .chosen-drop > .chosen-search > .chosen-search-input'
  );
  await page.type(
    '.row > #DealershipDropdownList_chosen > .chosen-drop > .chosen-search > .chosen-search-input',
    'jegs'
  );
  await page.keyboard.press('Enter');
  await page.waitFor(1050);
  await page.waitForSelector(
    'div #ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input'
  );
  await page.type(
    'div #ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input',
    '915000PS'
  );
  await page.waitFor(1050);

  await page.waitForSelector(
    '#ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li > table > tbody > tr > td:nth-child(1)'
  );
  await page.click(
    '#ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li > table > tbody > tr > td:nth-child(1)'
  );
  await page.waitFor(750);

  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox',
    '1'
  );

  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceNumberRadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceNumberRadTextBox',
    text
  );

  await page.waitForSelector(
    '.row #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceDateRadDatePicker_dateInput'
  );
  await page.type(
    '.row #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceDateRadDatePicker_dateInput',
    today
  );

  await page.waitForSelector(
    '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceCostRadTextBox'
  );
  await page.type(
    '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceCostRadTextBox',
    '1047.79'
  );
  await page.click(
    'div > #DefaultContent_ProductInformationControl_AddProductLinkButtonPanel #DefaultContent_ProductInformationControl_AddProductLinkButton'
  );

  const inputFile = await page.$(
    '#ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadfile0'
  );
  await inputFile.uploadFile(`${__dirname}/images/${id}.${ext}`);
  await page.click('#DefaultContent_GoToConfirmLinkButton');
  await page.waitForSelector('#DefaultContent_GoToSubmitLinkButton');
  await page.click('#DefaultContent_GoToSubmitLinkButton');
  await page.waitForSelector('#DefaultContent_ClaimSummary_ClaimIDValueLabel');
  element = await page.$('#DefaultContent_ClaimSummary_ClaimIDValueLabel');
  text = await page.evaluate((element) => element.textContent, element);
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
