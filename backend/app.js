const fses = require('fs').promises;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
var generator = require('generate-password');
const USPS = require('usps-webtools-promise').default;

const fs = require('fs');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const puppeteer = require('puppeteer-extra');
const puppeteerdevice = require('puppeteer');

const nodeHtmlToImage = require('node-html-to-image');
const { v4: uuidv4 } = require('uuid');
const request = require('request-promise-native');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const fullPageScreenshot = require('puppeteer-full-page-screenshot');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { Pool, Client } = require('pg');
const Jimp = require('jimp');
const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const captchaSolver = require('2captcha-node').default;
var remote = require('selenium-webdriver/remote');
const log = console.log;
const chalk = require('chalk');
const captcha = captchaSolver('fa246e3abd30c14532e78c90d14ad08a');
const axios = require('axios');
const FormData = require('form-data');
var humanNames = require('human-names');
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
const usps = new USPS({
  // This can be created by going to https://www.usps.com/business/web-tools-apis/ and registering for an id
  userId: '891REBAT1561',
  // USPS returns ALL CAPS, this boolean turns on Proper Caps for both Street lines and City. This is an optional item.
  properCase: true,
});
// use the express-static middleware
const pool = new Pool({
  user: 'aimzqyom',
  host: 'lallah.db.elephantsql.com',
  database: 'aimzqyom',
  password: 'SfK5ZmTeVfacmM8Tl5HDjdS7I7drlmet',
  port: 5432,
});
const adminKey = '5a5b6df3-8020-4147-8499-1e4feffc1a7b';
app.use(express.static('public'));
app.use(express.json());
const port = process.env.PORT || 8000;

app.post('/hancookrebate', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 1 && credits != null) {
      var today = randomTime(new Date('09/18/2020'), new Date('10/07/2020'));
      // var dd = String(today.getDate()).padStart(2, '0');
      // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      // var yyyy = today.getFullYear();
      // today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 184.0;
      var itemname = 'DYNAPRO AT2 RF11';
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var imageurl =
        'https://i5.walmartimages.com/asr/34dcd781-e8c3-4914-9d45-203fa41f2c17_1.c925078319ea186edc478b13aea68e59.png?odnWidth=612&odnHeight=612&odnBg=ffffff';
      var date = today;
      var email = data['email'];
      var addresses = null;
      if (address2 != null) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      var url = `http://localhost:8000/discounttirefullcustom?email=${email}&date=${date}&subprice=${subprice}&itemNum=40721&size=LT245 /75 R17 121S E1 OWL&quantity=${quantity}&company=HANKOOK&vehicle=2020 JEEP&vehicleInfo=WRANGLER JL BLACK AND TAN 2-DOOR&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;

      var tracking =
        '9400109205568' + getRandomInt(100000000, 999999999).toString();
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);

              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto(
                'https://hankookrebates.com/HankookRebate/Rebate.aspx?rebate_campaign_seq=wouUYKQxXWc%3d&strDate=SAg0U6bS8FBcma%2f0okIC1ybqDaYWGpwS&endDate=RZZQmFGZU%2fyNSvOWNVAEEYXPwCK2l3u5&code=DEzkob4V04o%3d'
              );
              await page.waitForSelector('#txtdate');

              await page.type('#txtdate', today);

              await page.click(
                '#ProductCheckbox > li:nth-child(3) > input[type=radio]'
              );
              const fileInput = await page.$('body > input');
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(500);
              await page.waitForSelector('#wizard #next');
              await page.click('#wizard #next');

              var str = 1110 + getRandomInt(0, 70);

              await page.select(
                '#SurveyQuestionDiv > div:nth-child(1) > select',
                str.toString()
              );
              str = 1228 + getRandomInt(0, 34);
              await page.select(
                '#SurveyQuestionDiv > div:nth-child(2) > select',
                str.toString()
              );

              await page.click(
                `#SurveyQuestionDiv > div:nth-child(4) > div > div > div:nth-child(${getRandomInt(
                  1,
                  4
                )}) > div > input`
              );
              str = 1185 + getRandomInt(0, 14);

              await page.select(
                '#SurveyQuestionDiv > div.form-group.fieldInline1 > div > div:nth-child(1) > select',
                str.toString()
              );
              await page.click(
                '#SurveyQuestionDiv > div:nth-child(7) > div > div > div:nth-child(1) > div > input'
              );
              // var nums = genArray();
              // for(var y =0;y<3;y++){
              //   await page.click(`.SurveyQues8 > .fieldBlock > .checkBoxALignRow > .collBlock3:nth-child(${nums[y]}) > .checkbox > .customRadio`)
              // }
              await page.click(
                '#wizard > div.actions.clearfix > ul > li:nth-child(2)'
              );

              await page.waitForSelector('#Step3 > #divPurchase #drpPurchase');
              await page.select(
                '#Step3 > #divPurchase #drpPurchase',
                'In Store'
              );

              await page.waitForSelector(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreName'
              );
              await page.type(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreName',
                'Discount Tire'
              );

              await page.waitForSelector(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreAddress'
              );
              await page.type(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreAddress',
                '3324 W Kimberly Rd'
              );

              await page.waitForSelector(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreCity'
              );
              await page.type(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreCity',
                'Davenport'
              );

              await page.select(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreState',
                '1'
              );

              await page.waitForSelector(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreZipCode'
              );
              await page.type(
                '#Step3 > #divPurchase > #divStoreInfo #txtStoreZipCode',
                '52806'
              );

              await page.type('#txtStorePhoneNumber', '5635496182');

              await page.type(
                '#fname',
                fullName.split(' ').slice(0, -1).join(' ')
              );
              await page.type(
                '#Lname',
                fullName.split(' ').slice(-1).join(' ')
              );
              await page.type('#Addresstxt', address);
              await page.type('#citytxt', city);
              const selectElem = await page.$('#txtstate');
              await selectElem.type(abbrState(stateAbbr, 'name'));
              await page.type('#ZipCode', zip);
              await page.type(
                '#Phoneno',
                getRandomInt(1000000000, 9999999999).toString()
              );
              await page.type('#emailtxt', email);
              await page.click('#wizard-p-2 > #Step3 #optionalchk');
              await page.click('#wizard #finish');
              console.log('solving captcha');
              await page.waitFor(2000);
              await page.solveRecaptchas();
              page.click('#btnSubmitRebate');

              await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
              ]);
              console.log('done');
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);
              await page.waitForXPath(
                '/html/body/div[3]/div/div[2]/div/div[2]/p[1]'
              );
              //assuming it's the first element
              let [pizza] = await page.$x(
                '/html/body/div[3]/div/div[2]/div/div[2]/p[1]'
              );
              let text = await page.evaluate(
                (pizza) => pizza.textContent,
                pizza
              );
              console.log(text);
              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `: ${text}`;

              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('error');
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

app.post('/tirebuyer', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-12-11');

      today.setDate(today.getDate() - getRandomInt(0, 10));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      if (address2 != null) {
        address = address + address2;
      }
      var stateAbbr = data['stateAbbr'];
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      console.log(JSON.stringify(data));
      var url = `http://localhost:8000/ebay?date=${date}&email=${email}&quantity=${quantity}&fullName=${fullName}&address1=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      //puppeteer.launch({
      puppeteer
        .launch({
          args: [
            '--proxy-server=http://34.195.20.123:31112',
            '--disable-web-security',
            '--window-size=1280,720',
            '--disable-features=IsolateOrigins,site-per-process',
          ],
          headless: true,

          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,900&headless=false',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto(
                'https://www.tirebuyerpromotions.com/Claims/SubmitClaim.aspx'
              );

              await page.type(
                '#ctl00_DefaultContent_FindPromoControl_PurchaseDateRadDatePicker_dateInput',
                today
              );
              await page.click(
                '#DefaultContent_FindPromoControl_FindPromotionLinkButton'
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
                fullName.split(' ').slice(0, -1).join(' ')
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactLastNameRadTextBox',
                fullName.split(' ').slice(-1).join(' ')
              );
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_LocationLine1RadTextBox',
                address
              );
              if (address2 != null) {
                await page.type(
                  '#ctl00_DefaultContent_ContactInfoControl_LocationLine2RadTextBox',
                  address2
                );
              }
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_LocationPostalCodeRadTextBox',
                zip
              );
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_EmailAddressRadTextBox',
                email
              );
              await page.waitForSelector(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input'
              );
              await page.click(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input'
              );

              await page.type(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input',
                'eBay'
              );
              await page.waitFor(500);
              var text = 'You must select a product.';
              while (text == 'You must select a product.') {
                await page.$eval(
                  '#DefaultContent_ProductInformationControl_ClearProductLinkButton',
                  (form) => form.click()
                );
                await page.waitFor(2000);
                elements = await page.$x(
                  "//input[@id='ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input']"
                );
                await elements[0].click();
                await elements[0].type("Nexen N'Priz AH8 215/55R17/4 94V");
                await page.waitFor(2000);

                await page.keyboard.press('Enter');

                await page.click(
                  '.col-sm-3 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox'
                );
                await page.type(
                  '.col-sm-3 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox',
                  '4'
                );

                await page.$eval(
                  '#DefaultContent_ProductInformationControl_AddProductLinkButton',
                  (form) => form.click()
                );
                await page.waitFor(1500);
                try {
                  await page.waitForSelector(
                    '#DefaultContent_ProductInformationControl_SelectedProductValidationSummary > ul > li',
                    {
                      timeout: 2500,
                    }
                  );

                  const element = await page.$(
                    '#DefaultContent_ProductInformationControl_SelectedProductValidationSummary > ul > li'
                  );
                  text = await page.evaluate(
                    (element) => element.textContent,
                    element
                  );
                  console.log(text);
                } catch (err) {
                  text = null;
                }
              }
              const fileInput = await page.$(
                '#ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUpload > #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadListContainer > #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadrow0 #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadfile0'
              );
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);

              var texts = 'Retailer  must be selected.';
              while (texts == 'Retailer  must be selected.') {
                await page.waitForSelector(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input'
                );

                await page.click(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input'
                );

                await page.type(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input',
                  'eBay'
                );
                await page.keyboard.press('Enter');
                await page.click('#DefaultContent_GoToConfirmLinkButton');
                try {
                  await page.waitForSelector(
                    '#DefaultContent_DealershipRequiredLabel',
                    {
                      timeout: 2500,
                    }
                  );
                  var el = await page.$(
                    '#DefaultContent_DealershipRequiredLabel'
                  );
                  texts = await page.evaluate((el) => el.textContent, el);
                  console.log(texts);
                } catch (err) {
                  texts = null;
                }
              }
              await page.waitForSelector(
                '#DefaultContent_GoToSubmitLinkButton',
                {
                  timeout: 7500,
                }
              );
              await page.$eval('#DefaultContent_GoToSubmitLinkButton', (form) =>
                form.click()
              );
              await page.waitForSelector(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel',
                {
                  timeout: 20000,
                }
              );
              var el = await page.$(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              texts = await page.evaluate((el) => el.textContent, el);

              // await page.keyboard.type("sss")
              // await page.type("#ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox", "4")
              // let text = await page.evaluate(element => element.textContent, element);
              console.log(texts);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Rebate Id: ${texts}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

app.post('/nexen', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits >= 1.5 && credits != null) {
      var today = new Date('2020-12-17');

      today.setDate(today.getDate() - getRandomInt(0, 7));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      if (address2 != null) {
        address = address + address2;
      }
      var stateAbbr = data['stateAbbr'];
      var quantity = '2';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      console.log(JSON.stringify(data));
      var url = `http://localhost:8000/ebay?date=${date}&itemName=2 New 245/35ZR20XL 95W Nexen N5000 Plus 245 35 20 Tires&img=https://i.ebayimg.com/images/g/6HcAAOSwFzZf1Iog/s-l1600.jpg&email=${email}&quantity=${quantity}&fullName=${fullName}&address1=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var id = uuidv4();
      address = data['address1'];
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      //puppeteer.launch({
      puppeteer
        .launch({
          args: [
            '--proxy-server=http://34.195.20.123:31112',
            '--disable-web-security',
            '--window-size=1280,720',
            '--disable-features=IsolateOrigins,site-per-process',
          ],
          headless: true,

          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,900&headless=false',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto(
                'https://www.tirebuyerpromotions.com/Claims/SubmitClaim.aspx'
              );

              await page.type(
                '#ctl00_DefaultContent_FindPromoControl_PurchaseDateRadDatePicker_dateInput',
                today
              );
              await page.click(
                '#DefaultContent_FindPromoControl_FindPromotionLinkButton'
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
                fullName.split(' ').slice(0, -1).join(' ')
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactLastNameRadTextBox',
                fullName.split(' ').slice(-1).join(' ')
              );
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_LocationLine1RadTextBox',
                address
              );
              if (address2 != null) {
                await page.type(
                  '#ctl00_DefaultContent_ContactInfoControl_LocationLine2RadTextBox',
                  address2
                );
              }
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_LocationPostalCodeRadTextBox',
                zip
              );
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_EmailAddressRadTextBox',
                email
              );
              await page.waitForSelector(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input'
              );
              await page.click(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input'
              );

              await page.type(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input',
                'eBay'
              );

              await page.waitFor(2000);

              var text = 'You must select a product.';
              while (text == 'You must select a product.') {
                await page.$eval(
                  '#DefaultContent_ProductInformationControl_ClearProductLinkButton',
                  (form) => form.click()
                );
                await page.waitFor(2000);
                elements = await page.$x(
                  "//input[@id='ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input']"
                );
                await elements[0].click();
                await elements[0].type('Nexen N5000 Plus 245/35ZR20XL');
                await page.waitFor(2000);
                await page.keyboard.press('ArrowDown');

                await page.keyboard.press('Enter');

                await page.click(
                  '.col-sm-3 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox'
                );
                await page.type(
                  '.col-sm-3 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox',
                  '4'
                );

                await page.$eval(
                  '#DefaultContent_ProductInformationControl_AddProductLinkButton',
                  (form) => form.click()
                );
                await page.waitFor(1500);
                try {
                  await page.waitForSelector(
                    '#DefaultContent_ProductInformationControl_SelectedProductValidationSummary > ul > li',
                    {
                      timeout: 2500,
                    }
                  );

                  const element = await page.$(
                    '#DefaultContent_ProductInformationControl_SelectedProductValidationSummary > ul > li'
                  );
                  text = await page.evaluate(
                    (element) => element.textContent,
                    element
                  );
                  console.log(text);
                } catch (err) {
                  text = null;
                }
              }
              const fileInput = await page.$(
                '#ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUpload > #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadListContainer > #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadrow0 #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadfile0'
              );
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);

              var texts = 'Retailer  must be selected.';
              while (texts == 'Retailer  must be selected.') {
                await page.waitForSelector(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input'
                );

                await page.click(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input'
                );

                await page.type(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input',
                  'eBay'
                );
                await page.waitFor(1000);
                await page.keyboard.press('ArrowDown');

                await page.keyboard.press('Enter');
                await page.click('#DefaultContent_GoToConfirmLinkButton');
                try {
                  await page.waitForSelector(
                    '#DefaultContent_DealershipRequiredLabel',
                    {
                      timeout: 2500,
                    }
                  );
                  var el = await page.$(
                    '#DefaultContent_DealershipRequiredLabel'
                  );
                  texts = await page.evaluate((el) => el.textContent, el);
                  console.log(texts);
                } catch (err) {
                  texts = null;
                }
              }
              await page.waitForSelector(
                '#DefaultContent_GoToSubmitLinkButton',
                {
                  timeout: 7500,
                }
              );
              await page.click('#DefaultContent_GoToSubmitLinkButton');
              await page.waitForSelector(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel',
                {
                  timeout: 20000,
                }
              );
              var el = await page.$(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              texts = await page.evaluate((el) => el.textContent, el);

              // await page.keyboard.type("sss")
              // await page.type("#ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox", "4")
              // let text = await page.evaluate(element => element.textContent, element);
              console.log(texts);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Rebate Id: ${texts}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

app.post('/kumho', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits >= 1.5 && credits != null) {
      var today = new Date('2020-12-17');

      today.setDate(today.getDate() - getRandomInt(0, 7));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      if (address2 != null) {
        address = address + address2;
      }
      var stateAbbr = data['stateAbbr'];
      var quantity = '1';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      console.log(JSON.stringify(data));
      var url = `http://localhost:8000/ebay?date=${date}&itemName=4 New LT295/70R18 E 10 ply Kumho Road Venture MT71 Mud Terrain 295 70 18 Tires&img=https://i.ebayimg.com/images/g/roIAAOSw6bVf1JDW/s-l1600.jpg&email=${email}&quantity=${quantity}&fullName=${fullName}&address1=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var id = uuidv4();
      address = data['address1'];
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      //puppeteer.launch({
      puppeteer
        .launch({
          args: [
            '--proxy-server=http://34.195.20.123:31112',
            '--disable-web-security',
            '--window-size=1280,720',
            '--disable-features=IsolateOrigins,site-per-process',
          ],
          headless: true,

          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,900&headless=false',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto(
                'https://www.tirebuyerpromotions.com/Claims/SubmitClaim.aspx'
              );

              await page.type(
                '#ctl00_DefaultContent_FindPromoControl_PurchaseDateRadDatePicker_dateInput',
                today
              );
              await page.click(
                '#DefaultContent_FindPromoControl_FindPromotionLinkButton'
              );
              await page.waitForSelector(
                '.row > #PromotionDiv #DefaultContent_FindPromoControl_ProgramRepeater_SelectProgramUserControl_1_SelectProgram_1'
              );
              await page.click(
                '.row > #PromotionDiv #DefaultContent_FindPromoControl_ProgramRepeater_SelectProgramUserControl_1_SelectProgram_1'
              );
              await page.waitForSelector(
                '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactFirstNameRadTextBox'
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactFirstNameRadTextBox',
                fullName.split(' ').slice(0, -1).join(' ')
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_ContactLastNameRadTextBox',
                fullName.split(' ').slice(-1).join(' ')
              );
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_LocationLine1RadTextBox',
                address
              );
              if (address2 != null) {
                await page.type(
                  '#ctl00_DefaultContent_ContactInfoControl_LocationLine2RadTextBox',
                  address2
                );
              }
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_LocationPostalCodeRadTextBox',
                zip
              );
              await page.type(
                '#ctl00_DefaultContent_ContactInfoControl_EmailAddressRadTextBox',
                email
              );
              await page.waitForSelector(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input'
              );
              await page.click(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input'
              );

              await page.type(
                '#ctl00_DefaultContent_DealershipRadComboBox_Input',
                'eBay'
              );

              await page.waitFor(2000);

              var text = 'You must select a product.';
              while (text == 'You must select a product.') {
                await page.$eval(
                  '#DefaultContent_ProductInformationControl_ClearProductLinkButton',
                  (form) => form.click()
                );
                await page.waitFor(2000);
                elements = await page.$x(
                  "//input[@id='ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input']"
                );
                await elements[0].click();
                await elements[0].type(
                  'Kumho Road Venture MT71 LT295/70R18/10'
                );
                await page.waitFor(2000);
                await page.keyboard.press('ArrowDown');

                await page.keyboard.press('Enter');

                await page.click(
                  '.col-sm-3 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox'
                );
                await page.type(
                  '.col-sm-3 #ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox',
                  '4'
                );

                await page.$eval(
                  '#DefaultContent_ProductInformationControl_AddProductLinkButton',
                  (form) => form.click()
                );
                await page.waitFor(1500);
                try {
                  await page.waitForSelector(
                    '#DefaultContent_ProductInformationControl_SelectedProductValidationSummary > ul > li',
                    {
                      timeout: 2500,
                    }
                  );

                  const element = await page.$(
                    '#DefaultContent_ProductInformationControl_SelectedProductValidationSummary > ul > li'
                  );
                  text = await page.evaluate(
                    (element) => element.textContent,
                    element
                  );
                  console.log(text);
                } catch (err) {
                  text = null;
                }
              }
              const fileInput = await page.$(
                '#ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUpload > #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadListContainer > #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadrow0 #ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadfile0'
              );
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);

              var texts = 'Retailer  must be selected.';
              while (texts == 'Retailer  must be selected.') {
                await page.waitForSelector(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input'
                );

                await page.click(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input'
                );

                await page.type(
                  '#ctl00_DefaultContent_DealershipRadComboBox_Input',
                  'eBay'
                );
                await page.waitFor(1000);
                await page.keyboard.press('ArrowDown');

                await page.keyboard.press('Enter');
                await page.click('#DefaultContent_GoToConfirmLinkButton');
                try {
                  await page.waitForSelector(
                    '#DefaultContent_DealershipRequiredLabel',
                    {
                      timeout: 2500,
                    }
                  );
                  var el = await page.$(
                    '#DefaultContent_DealershipRequiredLabel'
                  );
                  texts = await page.evaluate((el) => el.textContent, el);
                  console.log(texts);
                } catch (err) {
                  texts = null;
                }
              }
              await page.waitForSelector(
                '#DefaultContent_GoToSubmitLinkButton',
                {
                  timeout: 7500,
                }
              );
              await page.click('#DefaultContent_GoToSubmitLinkButton');
              await page.waitForSelector(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel',
                {
                  timeout: 20000,
                }
              );
              var el = await page.$(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              texts = await page.evaluate((el) => el.textContent, el);

              // await page.keyboard.type("sss")
              // await page.type("#ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox", "4")
              // let text = await page.evaluate(element => element.textContent, element);
              console.log(texts);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              await removeCreditz(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Rebate Id: ${texts}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/discountrebate', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 2 && credits != null) {
      var today = new Date();
      today.setDate(today.getDate() - getRandomInt(34, 52));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];

      var stateAbbr = data['stateAbbr'];
      var subprice = 166;
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      address.concat(address2);
      var itemname = '245/35ZR20 Nexen N5000 Plus 95W XL Tire';
      var quantity = '4';
      var seller = 'Autoplicity';

      var date = today;
      console.log(JSON.stringify(data));
      var url = `http://localhost:8000/discounttire?date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&itemName=${itemname}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto('https://www.continentaltire-rebates.com/#/home');
              await page.waitForSelector(
                '#concierge > #con-notification > .con-x > svg > polygon'
              );
              await page.click(
                '#concierge > #con-notification > .con-x > svg > polygon'
              );

              var elHandle = await page.$x("//input[@name='offerCode']");
              await elHandle[0].type('20-94562');
              elHandle = await page.$x("//input[@id='home-purchasedate']");
              await elHandle[0].type(today);
              await page.click('#home-purchasedate-continue2');
              await page.waitForSelector('#continueOrSubmitBtn');
              await page.click('#continueOrSubmitBtn');
              await page.waitForSelector(
                'body > div.content.container.fluid > div > div > div:nth-child(5) > div:nth-child(5) > div > div > div.col-md-9 > h2 > span.fa.fa-circle-thin'
              );
              await page.click(
                'body > div.content.container.fluid > div > div > div:nth-child(5) > div:nth-child(5) > div > div > div.col-md-9 > h2 > span.fa.fa-circle-thin'
              );
              await page.click('#productInfo-continueBtn > span');

              //   var confNum = value.substr(25)
              //   await page.waitForSelector('#txtdate')
              //
              //   await page.type("#txtdate", today)
              //
              //   await page.click("#ProductCheckbox > li:nth-child(1) > input[type=radio]")
              const fileInput = await page.$(
                '.ng-isolate-scope #ngf-addImage-proofOfPurchase'
              );
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(1000);
              elHandle = await page.$x('//div[2]/a');
              await elHandle[0].click();
              await page.waitFor(1000);

              elHandle = await page.$x("//input[@name='firstName']");
              await elHandle[0].type(
                fullName.split(' ').slice(0, -1).join(' ')
              );
              elHandle = await page.$x("//input[@name='lastName']");
              await elHandle[0].type(fullName.split(' ').slice(-1).join(' '));
              elHandle = await page.$x("//input[@name='phoneNumber']");
              await elHandle[0].type(
                getRandomInt(1000000000, 9999999999).toString()
              );
              elHandle = await page.$x("//input[@name='email']");
              await elHandle[0].type(data['email']);
              elHandle = await page.$x("//input[@name='confirmEmail']");
              await elHandle[0].type(data['email']);

              elHandle = await page.$x("//input[@name='address1']");
              await elHandle[0].type(data['address1']);
              if (data['address2'] != null) {
                elHandle = await page.$x("//input[@name='address2']");
                await elHandle[0].type(data['address2']);
              }
              elHandle = await page.$x("//input[@name='postalCode']");
              await elHandle[0].type(data['zip']);
              await page.waitFor(1000);
              await page.waitForSelector('.en_US');
              await page.click('.en_US');
              await page.waitFor(2500);
              await page.waitForSelector(
                'div > .ng-scope > #continueBtn > .btn > .ng-binding'
              );
              await page.click(
                'div > .ng-scope > #continueBtn > .btn > .ng-binding'
              );

              await page.waitForSelector('.ng-pristine #enteredAddressBtn');
              await page.click('.ng-pristine #enteredAddressBtn');
              // await page.waitForSelector('.col-md-6 > .col-md-6 > .ng-scope > #survey-continueBtn')
              // await page.click('.col-md-6 > .col-md-6 > .ng-scope > #survey-continueBtn')
              elHandle = await page.$x('//div/div/button/span');
              await elHandle[0].click();
              elHandle = await page.$x('//div/div/button/span');
              await elHandle[0].click();
              await page.waitForXPath('//*[@id="confirmation-trackingNumber"]');
              //assuming it's the first element
              let [element] = await page.$x(
                '//*[@id="confirmation-trackingNumber"]'
              );
              let text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

app.post('/chevron', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-09-01');

      today.setDate(today.getDate() + getRandomInt(0, 31));
      var installDate = new Date();
      installDate.setDate(today.getDate() + getRandomInt(10, 20));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todays = today;
      today = mm + '/' + dd + '/' + yyyy;

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];

      var stateAbbr = data['stateAbbr'];
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();

      var subprice = 21.38;
      var quantity = 2;
      var itemname = 'Delo 400 SDE SAE 15W-40 Motor Oil - 1 Gallon Jug';
      var imageurl =
        'https://i5.walmartimages.com/asr/5285df68-bc6f-470a-80f2-5f32c2d5af9a_1.153a5ea7e92c58c220eddae256707a82.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff';
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
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          headless: true,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              var element = await page.$('body > center:nth-child(5) > b');
              var text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto('https://chevronpromotions.com/Claim/Index/1367');
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
              await page.select('#claimForm #Promotion_SelectedChannel', '27');

              await page.waitForSelector('#claimForm #Store_RetailerName');
              await page.type('#claimForm #Store_RetailerName', 'Amazon');

              await page.type('.container #Store_Address_Address1', addresses);
              await page.type('#claimForm #Store_Address_City', city);

              await page.select(
                '#claimForm #Store_Address_SelectedState',
                stateAbbr
              );
              await page.type('#claimForm #Store_Address_ZipCode', zip);

              await page.type('#claimForm #Receipt_Number', text.substr(25));

              await page.focus('#Receipt_PurchaseDate');
              await page.$eval('#Receipt_PurchaseDate', (e) =>
                e.removeAttribute('readonly')
              );
              await page.type('#Receipt_PurchaseDate', today);
              await page.waitForSelector(
                '#products_validation > .row:nth-child(7) #Promotion_SelectedProduct'
              );
              await page.click(
                '#products_validation > .row:nth-child(7) #Promotion_SelectedProduct'
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
              text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              text = `Claim ID: ${text}`;
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

app.post('/gm', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 19 && credits != null) {
      var today = new Date('2020-07-09');

      today.setDate(today.getDate() + getRandomInt(0, 40));
      var installDate = today;
      installDate.setDate(installDate.getDate() + getRandomInt(10, 20));

      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;

      dd = String(installDate.getDate()).padStart(2, '0');
      mm = String(installDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = installDate.getFullYear();

      installDate = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 18811.3;
      var itemName =
        'Chevrolet Performance LT5 Supercharged 6.2L / 755 HP Crate Engine';
      var quantity = '1';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var url = `http://localhost:8000/jegs?itemName=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var url2 = `http://localhost:8000/repair?date=${installDate}`;
      console.log(url);

      var id = uuidv4();
      var id2 = uuidv4();

      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      var phoneNum = getAreaCode() + getRandomInt(1000000, 9999999).toString();
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);
              await page.waitForSelector(
                'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr:nth-child(1) > td > span'
              );

              var element = await page.$(
                'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr:nth-child(1) > td > span'
              );
              var text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              console.log(url2);
              await page.goto(url2);
              await page.screenshot({
                path: `${__dirname}/images/${id2}.${ext}`,
                fullPage: true,
              });

              await page.goto('https://www.gmpartsrebates.com/vehicles.asp');
              await page.waitForSelector(
                '#frmSubmit > div:nth-child(4) > div:nth-child(3) > p > input'
              );
              await page.click(
                '#frmSubmit > div:nth-child(4) > div:nth-child(3) > p > input'
              );

              await page.waitForSelector(
                '.row div:nth-child(5) > #prgSubmitBtn_2019080'
              );
              await page.click('.row div:nth-child(5) > #prgSubmitBtn_2019080');

              await page.waitForSelector('#rebate #txtFirstName');
              await page.type(
                '#rebate #txtFirstName',
                fullName.split(' ').slice(0, -1).join(' ')
              );

              await page.waitForSelector('#rebate #txtLastName');
              await page.type(
                '#rebate #txtLastName',
                fullName.split(' ').slice(-1).join(' ')
              );

              await page.waitForSelector('#rebate #txtAddress1');
              await page.type('#rebate #txtAddress1', address);
              if (address2 != null) {
                await page.waitForSelector('#rebate #txtAddress2');
                await page.type('#rebate #txtAddress2', address2);
              }
              await page.waitForSelector('#rebate #txtPostalCode');
              await page.type('#rebate #txtPostalCode', zip);

              await page.waitForSelector('#rebate #txtCity');
              await page.type('#rebate #txtCity', city);

              await page.select('#rebate #txtState', stateAbbr.toUpperCase());

              await page.waitForSelector('#rebate #txtPhone');
              await page.type('#rebate #txtPhone', phoneNum);

              await page.waitForSelector('#rebate #UserEmail');
              await page.type('#rebate #UserEmail', email);
              await page.click(
                '#ContactInformationContainer > input:nth-child(34)'
              );

              await page.waitForSelector('#txtRetailer');
              await page.type('#txtRetailer', 'jegs');
              await page.waitFor(1250);
              await page.waitForSelector(
                '#consumer-rebate > #ui-id-2 #ui-id-3'
              );
              await page.click('#consumer-rebate > #ui-id-2 #ui-id-3');
              await page.$eval('#datepicker', (e) => {
                e.removeAttribute('readonly');
              });
              await page.type('#datepicker', today);
              await page.click(
                '#MainContentContainer > div:nth-child(1) > div > h3'
              );
              await page.type('#txtInvoice', text);
              var fileInput = await page.$('#File1');
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(1000);
              fileInput = await page.$('#File2');
              await fileInput.uploadFile(`${__dirname}/images/${id2}.${ext}`);
              // await page.waitFor(100000)
              await page.click('#chkDisclaim');
              await page.click(
                '#SubmitOnlineContainer > div.row > div > input:nth-child(3)'
              );
              await page.waitForSelector('#frmSubmit > p:nth-child(8) > b');

              element = await page.$('#frmSubmit > p:nth-child(8) > b');
              text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              text = `Your claim confirmation number is ${text}.`;
              console.log(text);

              await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
              ]);
              console.log('done');
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              for (var ls = 0; ls < 20; ls++) {
                await removeCredit(req.body.key);
              }
              response.image = JSON.parse(s)['data']['link'];
              response.info = `${text}`;

              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('error');
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/goodyear', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  console.log(credits);

  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits >= 2 && credits != false) {
      var today = new Date();
      today.setDate(today.getDate() - getRandomInt(0, 15));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpg', 'jpg', 'jpg'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 209.0;
      var itemname = 'ASSURANCE WEATHERREADY';
      var quantity = '4';
      var seller = 'Acceleration Tire';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      var phone = data['phone'];

      var addresses = null;
      if (req.body.address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      //cash
      var date = today;
      var invoice = new Date().getTime().toString().substring(0, 7);
      var { receiptURL, chosen } = tireReceiptGenerator({
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: itemname,
        quantity: quantity,
        image:
          'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRG6lF2n1qOOtpG0pkoIdVvXiIu_pSxr5Ue99yxqHYkJNG8dhqlU0T0leHdWyBW1jHxvOKK1ahftrtzJT0SzryvLC7OKDlN',
        sku: '',
        price: subprice,
        size: '235 /45 R18 94V SL VSB',
      });
      var url = receiptURL;
      console.log(url);

      var tracking =
        '9400109205568' + getRandomInt(100000000, 999999999).toString();
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          args: [
            '--proxy-server=http://34.195.20.123:31112',
            '--disable-web-security',
            '--window-size=1280,720',

            '--disable-features=IsolateOrigins,site-per-process',
          ],

          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });
              await page._client.send('Emulation.clearDeviceMetricsOverride');

              await page.goto(url);
              var confNum = getRandomInt(10000000, 99999999).toString();
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto('https://www.goodyeartirerebates.com/');
              await page.waitForSelector('#masterContent_pageSelect_btnSubmit');
              await page.click('#masterContent_pageSelect_btnSubmit');
              await page.waitForSelector(
                '#masterContent_pageContent_currentoffers_txtPromoCode'
              );
              await page.type(
                '#masterContent_pageContent_currentoffers_txtPromoCode',
                '704706'
              );
              await page.click(
                '#masterContent_pageContent_currentoffers_btnHasPromo'
              );
              await page.waitFor(2500);
              await page.goto('https://www.goodyeartirerebates.com/AddRebate');
              await page.waitForSelector(
                '#masterContent_pageContent_RebateWizard_drpFormCode'
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_drpFormCode'
              );

              await page.type(
                '#masterContent_pageContent_RebateWizard_drpFormCode',
                'GYCOM_NPP4'
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtFirstName',
                fullName.split(' ').slice(0, -1).join(' ')
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtLastName',
                fullName.split(' ').slice(-1).join(' ')
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtAddress1',
                address
              );
              if (address2 != null) {
                await page.type(
                  '#masterContent_pageContent_RebateWizard_txtAddress2',
                  address2
                );
              }
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtCity',
                city
              );
              await page.select(
                '#masterContent_pageContent_RebateWizard_txtState',
                stateAbbr
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtZip',
                zip
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtEmail',
                email
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_txtEmailConfirm',
                email
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_StartNavigationTemplateContainerID_StartNextButton'
              );

              await page.waitForSelector(
                'table #masterContent_pageContent_RebateWizard_txtRetailerZip'
              );
              await page.type(
                'table #masterContent_pageContent_RebateWizard_txtRetailerZip',
                '52806'
              );
              await page.waitFor(5000);

              await page.waitForSelector(
                '#masterContent_pageContent_RebateWizard #masterContent_pageContent_RebateWizard_StepNavigationTemplateContainerID_btnNext'
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard #masterContent_pageContent_RebateWizard_StepNavigationTemplateContainerID_btnNext'
              );
              await page.waitForSelector(
                '#masterContent_pageContent_RebateWizard_yearddl'
              );
              var year = 2020;
              await page.select(
                '#masterContent_pageContent_RebateWizard_yearddl',
                year.toString()
              );
              await page.waitFor(1000);
              await page.select(
                '#masterContent_pageContent_RebateWizard_makeddl',
                'Toyota-' + year.toString()
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_StepNavigationTemplateContainerID_btnNext'
              );
              await page.waitForSelector(
                '#masterContent_pageContent_RebateWizard_tirelineddl'
              );
              await page.select(
                '#masterContent_pageContent_RebateWizard_tirelineddl',
                'Assurance WeatherReady'
              );
              await page.waitFor(750);
              await page.select(
                '.formtable #masterContent_pageContent_RebateWizard_tiresizeddl',
                '235/45R18'
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_quantitytextbox',
                '4'
              );
              await page.waitFor(600);
              await page.waitForSelector(
                '.formtable #masterContent_pageContent_RebateWizard_purchasedatetxtbox'
              );
              await page.click(
                '.formtable #masterContent_pageContent_RebateWizard_purchasedatetxtbox'
              );
              await page.evaluate(() =>
                document
                  .querySelector(
                    '#masterContent_pageContent_RebateWizard_purchasedatetxtbox'
                  )
                  .removeAttribute('readonly')
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_purchasedatetxtbox',
                today
              );
              await page.type(
                '#masterContent_pageContent_RebateWizard_invoicetxtbox',
                confNum
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_StepNavigationTemplateContainerID_btnNext'
              );
              await page.waitForSelector(
                '#masterContent_pageContent_RebateWizard_cbTermsAndConditions'
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_cbTermsAndConditions'
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_StepNavigationTemplateContainerID_btnNext'
              );
              await page.waitForSelector('#Radio1');
              await page.click('#Radio1');
              const fileInput = await page.$(
                '#masterContent_pageContent_RebateWizard_FileUpload1'
              );
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.click(
                '#masterContent_pageContent_RebateWizard_btnUpload'
              );
              await page.waitForSelector(
                '#choiceonline > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > a'
              );
              await page.click(
                '#masterContent_pageContent_RebateWizard_btnSelectOnline'
              );
              await page.waitForSelector('#step7_yourclaimnumberis');
              let pizza = await page.$('#step7_yourclaimnumberis');
              let text = await page.evaluate(
                (pizza) => pizza.textContent,
                pizza
              );
              await page.waitFor(1200);
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `: ${text}`;

              response.message = 'success';
              res.send(response);
            } catch (e) {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('error');
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/esab', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  console.log(credits);

  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 6 && credits != false) {
      var today = new Date('2020-07-01');

      today.setDate(today.getDate() + getRandomInt(0, 61));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      var data = req.body;

      var types = ['jpeg', 'png', 'jpg'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 2941.08;
      var itemName = 'ESAB EMP235IC-CAR 250A Rebel EMP 235ic System with Cart';
      var quantity = '1';
      var city = data['city'];
      var zip = data['zip'];
      var imageurl =
        'https://i5.walmartimages.com/asr/44c20d60-8388-4102-807a-dac9c471d7a6_1.c28ed3b614f4b5c866ff9f72bceed238.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff';
      var date = today;
      var email = data['email'];

      var url = `http://localhost:8000/walmart?itemname=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&imageurl=${imageurl}`;
      console.log(url);

      var addresses = null;
      if (req.body.address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      //cash
      var date = today;

      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          args: [
            '--proxy-server=http://34.195.20.123:31112',
            '--remote-debugging-port=9222',
          ],
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });
              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              console.log(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto('https://www.esabrebatesus.com/#/home');

              var el = await page.$x(
                '/html/body/div[4]/div/div[2]/div[1]/div/div/uib-accordion/div/div[1]/div[2]/div/ng-form/div[1]/div/input'
              );
              await el[0].type('ESO-RWD');

              await page.waitForSelector('#home-purchasedate');
              await page.type('#home-purchasedate', today);
              await page.waitForSelector('#home-purchasedate-continue2');
              await page.click('#home-purchasedate-continue2');
              await page.waitForSelector('#concierge');
              let div_selector_to_remove = '#concierge';
              await page.evaluate((sel) => {
                var elements = document.querySelectorAll(sel);
                for (var i = 0; i < elements.length; i++) {
                  elements[i].parentNode.removeChild(elements[i]);
                }
              }, div_selector_to_remove);
              await page.waitForSelector('#continueOrSubmitBtn');
              await page.click('#continueOrSubmitBtn');
              await page.evaluate((sel) => {
                var elements = document.querySelectorAll(sel);
                for (var i = 0; i < elements.length; i++) {
                  elements[i].parentNode.removeChild(elements[i]);
                }
              }, div_selector_to_remove);
              await page.waitForSelector(
                'body > div.content.container.fluid > div > div > div:nth-child(5) > div.panel.product-list-results.ng-scope.product-list-results-last > div > div > div.col-md-9 > h2 > span.fa.fa-circle-thin'
              );
              await page.click(
                'body > div.content.container.fluid > div > div > div:nth-child(5) > div.panel.product-list-results.ng-scope.product-list-results-last > div > div > div.col-md-9 > h2 > span.fa.fa-circle-thin'
              );
              await page.waitForSelector('#productInfo-continueBtn');
              await page.click('#productInfo-continueBtn');
              await page.evaluate((sel) => {
                var elements = document.querySelectorAll(sel);
                for (var i = 0; i < elements.length; i++) {
                  elements[i].parentNode.removeChild(elements[i]);
                }
              }, div_selector_to_remove);
              el = await page.$x(
                '/html/body/div[4]/div/div[1]/div/div[2]/div/form/div/div/input'
              );
              await el[0].type('636726' + getRandomInt(0000, 9999).toString());

              await page.waitForSelector(
                'body > div.content.container.fluid > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > p > span > span:nth-child(2) > a'
              );
              await page.click(
                'body > div.content.container.fluid > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > p > span > span:nth-child(2) > a'
              );
              await page.waitForSelector('#productInfo-continueBtn');
              await page.click('#productInfo-continueBtn');
              await page.evaluate((sel) => {
                var elements = document.querySelectorAll(sel);
                for (var i = 0; i < elements.length; i++) {
                  elements[i].parentNode.removeChild(elements[i]);
                }
              }, div_selector_to_remove);
              el = await page.$x(
                '/html/body/div[4]/div/div/form/div/div[2]/div/div/div/div/div[2]/div/div/input'
              );
              await el[0].type(today);

              await page.waitForSelector('#continueOrSubmitBtn');
              await page.click('#continueOrSubmitBtn');
              await page.evaluate((sel) => {
                var elements = document.querySelectorAll(sel);
                for (var i = 0; i < elements.length; i++) {
                  elements[i].parentNode.removeChild(elements[i]);
                }
              }, div_selector_to_remove);
              await page.waitFor(1500);
              await page.click('#addImage-proofOfPurchase');
              const fileInput = await page.$('#ngf-addImage-proofOfPurchase');
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(1500);

              while (
                (await page.$(
                  'body > div.content.container.fluid > div > div.col-md-12.ng-scope > div:nth-child(4) > div:nth-child(1) > div.row.pop-img-reqs-scan-upload.ng-scope > div > div > div.col-md-11 > div > div.col-md-10.ng-binding'
                )) == false
              ) {
                await page.click('#addImage-proofOfPurchase');

                await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
                await page.waitFor(250);
              }

              await page.waitFor(1800);
              await page.waitForSelector(
                'body > div.content.container.fluid > div > div.col-md-12.ng-scope > div.row.page-footer-nav > div > div.col-md-6.col-xs-12.no-pad.site-flow-nav > div:nth-child(2) > a'
              );
              await page.click(
                'body > div.content.container.fluid > div > div.col-md-12.ng-scope > div.row.page-footer-nav > div > div.col-md-6.col-xs-12.no-pad.site-flow-nav > div:nth-child(2) > a'
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox',
                fullName.split(' ').slice(0, -1).join(' ')
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox',
                fullName.split(' ').slice(-1).join(' ')
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(6) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(6) > .noBorderTextBox',
                `${getRandomInt(100, 999)}-${getRandomInt(
                  100,
                  999
                )}-${getRandomInt(1000, 9999)}`
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(8) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(8) > .noBorderTextBox',
                email
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(10) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(10) > .noBorderTextBox',
                email
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox',
                address
              );
              if (address2 != null) {
                await page.waitForSelector(
                  'body > div.content.container.fluid > div > div.col-md-12.demog.ng-scope > form > div > div:nth-child(2) > div:nth-child(3) > input'
                );
                await page.type(
                  'body > div.content.container.fluid > div > div.col-md-12.demog.ng-scope > form > div > div:nth-child(2) > div:nth-child(3) > input',
                  address2
                );
              }
              await page.waitForSelector(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(5) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(5) > .noBorderTextBox',
                zip
              );

              await page.click('#demog-header');
              await page.waitFor(750);
              await page.waitForSelector(
                '.col-md-6 > div > .ng-scope > #continueBtn > .btn'
              );
              await page.click(
                '.col-md-6 > div > .ng-scope > #continueBtn > .btn'
              );

              await page.waitForSelector(
                '.row > .col-md-6 > div > #enteredAddressBtn > .glyphicon'
              );
              await page.click(
                '.row > .col-md-6 > div > #enteredAddressBtn > .glyphicon'
              );

              await page.waitFor(800);
              el = await page.$x(
                '/html/body/div[4]/div/div[2]/form/div/div[2]/div[3]/div/div/label'
              );
              await el[0].click();
              await page.waitForSelector('#continueOrSubmitBtnBottom');
              await page.click('#continueOrSubmitBtnBottom');
              await page.waitForSelector('#confirmation-trackingNumber');
              await page.waitForXPath(
                '/html/body/div[4]/div/div[2]/div/form/div/div[1]/div[1]/h2/span'
              );

              var [element] = await page.$x(
                '/html/body/div[4]/div/div[2]/div/form/div/div[1]/div[1]/h2/span'
              );
              const text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              for (var ls = 0; ls < 7; ls++) {
                await removeCredit(req.body.key);
              }
              response.image = JSON.parse(s)['data']['link'];
              response.info = `: ${text}`;

              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('error');
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
//300
app.post('/aqua', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  console.log(credits);

  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 4 && credits != false) {
      var today = new Date('2020-04-01');

      today.setDate(today.getDate() + getRandomInt(0, 61));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      var data = req.body;

      var types = ['jpeg', 'png', 'jpg'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var subprice = 2029.99;
      var quantity = 1;
      var itemName =
        'Aquabot Breeze XLS In-Ground Auto Robotic Swimming Pool Vacuum Cleaner (2 Pack)';
      var imageurl =
        'https://i5.walmartimages.com/asr/1d2979e5-9a00-4b0b-a3de-23d90b70fbc5_1.3032043377a10114821abe5adb05b135.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
      var firstName = fullName.split(' ').slice(0, -1).join(' ');
      var lastName = fullName.split(' ').slice(-1).join(' ');
      var url = `http://localhost:8000/walmart?itemname=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&imageurl=${imageurl}`;

      var addresses = null;
      if (req.body.address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      //cash
      var date = today;

      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .connect({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });
              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto('https://rapid-rebates.com/aquaproducts');
              await page.waitForSelector(
                'body > div.pull-left.templateWrapper.ng-scope.templatePreview > div.templateBody.wrapper_ForResponsive > div > div > ul > li > div > div > div:nth-child(3) > button'
              );
              await page.click(
                'body > div.pull-left.templateWrapper.ng-scope.templatePreview > div.templateBody.wrapper_ForResponsive > div > div > ul > li > div > div > div:nth-child(3) > button'
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(1) > .rebateForm__field--medium'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(1) > .rebateForm__field--medium',
                firstName
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(2) > .rebateForm__field--medium'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(2) > .rebateForm__field--medium',
                lastName
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(3) > .rebateForm__field--large'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(3) > .rebateForm__field--large',
                address
              );
              if (address2 != null) {
                await page.waitForSelector(
                  '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(4) > .rebateForm__field--large'
                );
                await page.type(
                  '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(4) > .rebateForm__field--large',
                  address2
                );
              }

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(5) > .rebateForm__field--medium'
              );
              await page.select(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(5) > .rebateForm__field--medium',
                'string:USA'
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(6) > .rebateForm__field--medium'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(6) > .rebateForm__field--medium',
                zip
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field > .rebateForm__field--medium:nth-child(3)'
              );
              await page.select(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field > .rebateForm__field--medium:nth-child(3)',
                `string:${stateAbbr}`
              );

              await page.waitForSelector(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement'
              );
              await page.type(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement',
                email
              );
              await page.waitForSelector(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer > .templateFormElement > .formElement__container > .formElement--dropdownList'
              );
              await page.select(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer > .templateFormElement > .formElement__container > .formElement--dropdownList',
                'string:Internet'
              );

              await page.waitForSelector(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(1) > div > div > div > input'
              );
              await page.type(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(1) > div > div > div > input',
                'Breeze XLS'
              );

              await page.waitForSelector(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(2) > .templateFormElement > .formElement__container > .formElement'
              );
              await page.type(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(2) > .templateFormElement > .formElement__container > .formElement',
                `66SUFTD17${getRandomInt(100, 999)} 66SUFTD17${getRandomInt(
                  100,
                  999
                )}`
              );

              await page.waitForSelector(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement'
              );

              await page.select(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement',
                'string:$1,499 and Up ($200)'
              );

              await page.waitForSelector(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(4) > .templateFormElement > .formElement__container > .formElement'
              );
              await page.type(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(4) > .templateFormElement > .formElement__container > .formElement',
                '2029.99'
              );

              await page.waitFor(750);

              await page.select(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(5) > .templateFormElement > .formElement__container > .formElement',
                'string:WALMART'
              );

              await page.waitFor(750);
              await page.type(
                '.templateFormElement > .formElement__container > div > .ng-isolate-scope > .formElement',
                today
              );
              await page.click(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(6) > div > p'
              );
              const fileInput = await page.$(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(8) > div > div > div > div > div > input'
              );
              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.click(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(8) > div > div > div > div > div > button'
              );
              await page.waitFor(1500);
              await page.waitForSelector('.modal #btnAge');
              await page.click('.modal #btnAge');
              await page.waitFor(1350);
              await page.waitForSelector('.modal #btnAge');
              await page.click('.modal #btnAge');
              await page.waitFor(1200);
              await page.waitForSelector(
                '#summaryModalDiv > div > div.row.summaryModal__trackingNumberRow.ng-scope > div:nth-child(3) > label'
              );
              var element = await page.$(
                '#summaryModalDiv > div > div.row.summaryModal__trackingNumberRow.ng-scope > div:nth-child(3) > label'
              );
              var text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              for (var ls = 0; ls < 5; ls++) {
                await removeCredit(req.body.key);
              }
              response.image = JSON.parse(s)['data']['link'];
              response.info = `: ${text}`;

              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('error');
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
// app.post('/mickey', async (req, res) => {
//
//   const credits = await fetchCredits(req.body.key);
//   console.log(credits);
//
// var response = {};
// var isAddressValid=await validate(req.body)
// if(isAddressValid){
//   if(credits>2 && credits!=false){
//     var today = new Date('2020-09-01')
//
//     today.setDate(today.getDate() + getRandomInt(0,9));
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth()+1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//
//     today = mm + '/' + dd + '/' + yyyy;
//     console.log(today)
//
//
// var data = req.body;
// console.log(data)
// var types= ["jpeg","png","jpg"]
// const ext = types[getRandomInt(0,2)]
//
// var fullName=data["fullName"]
// var address=data["address1"]
// var address2=data["address2"]
// var stateAbbr=data["stateAbbr"]
// var city=data["city"]
// var zip=data["zip"]
// var date=today;
// var email=data["email"]
//
// var subprice=313.00
// var itemname ="BAJA ATZP3"
// var quantity="4"
//
//
//
// var addresses=null;
// if(address2){
// addresses=`${address} ${address2}`
// }else{
//   addresses=`${address}`
//
// }
// //cash
// var date=today;
// var url = `http://localhost:8000/discounttirefullcustom?email=${email}&date=${date}&subprice=${subprice}&itemNum=11173&size=LT275 /65 R20 126Q E1 RBL&quantity=${quantity}&company=MICKEY THOMPSON&vehicle=2020 JEEP&vehicleInfo=WRANGLER JL BLACK AND TAN 2-DOOR&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
// console.log(url)
//
//
// var date=today;
//
//
// var id = uuidv4();
//
//     puppeteer.use(StealthPlugin())
//
//     puppeteer.use(
//   RecaptchaPlugin({
//     provider: {
//       id: '2captcha',
//       token: 'fa246e3abd30c14532e78c90d14ad08a' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
//     },
//     visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
//   })
// )
// // const browser = await puppeteer.launch({headless:false});
//     puppeteer.connect({
//   browserWSEndpoint: 'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&headless=false&--proxy-server=https://34.195.20.123:31112:31112'}).then(async browser => {
//   (async () => {
//
//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//
//   await page.authenticate({
//   username: 'lff4fyij',
//     password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
// });
// var phoneNum =getAreaCode()+getRandomInt(1000000,9999999).toString()
//   await page.goto(url)
//   await page.screenshot({ path: `${__dirname}/images/${id}.${ext}`, fullPage: true });
//
// await page.goto("https://www.mickeythompsonrewards.com/#/home", {
//   waitUntil: 'networkidle0',
// });
// await page.waitForSelector('.panel-body #home-purchaseDateOnlyText')
//  await page.type('.panel-body #home-purchaseDateOnlyText',today)
//  let div_selector_to_remove= "#concierge";
//  await page.evaluate((sel) => {
//      var elements = document.querySelectorAll(sel);
//      for(var i=0; i< elements.length; i++){
//          elements[i].parentNode.removeChild(elements[i]);
//      }
//  }, div_selector_to_remove)
//  await page.waitForSelector('.panel-body #home-offercode-purchasedate-continue')
//  await page.click('.panel-body #home-offercode-purchasedate-continue')
//  await page.waitFor(2500)
//
//
//  example = await page.$x(`/html/body/div[4]/div/div[2]/div[5]/div/div/div/div[2]/div[2]/div[2]/div/div/div/a`);
// await example[0].click();
//
//  await page.waitFor(1250)
//
//   var fileInput = await page.$('#ngf-addImage-proofOfPurchase');
//
//   await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
//   await page.waitFor(750)
//   const [elementHandle] = await page.$x('/html/body/div[4]/div/div[2]/div[5]/div/div[2]/div[2]/a');
//    var propertyHandles = await elementHandle.getProperty('disabled');
//    var propertyHandle = await propertyHandles.jsonValue();
//
//    console.log(propertyHandle)
//   while(propertyHandle == true){
//     console.log("s")
//     await page.waitForSelector('.col-md-12 > .row > .col-md-6 > .row > .uploader')
// await page.click('.col-md-12 > .row > .col-md-6 > .row > .uploader')
//     fileInput = await page.$('#ngf-addImage-proofOfPurchase');
//     await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
//     await page.waitFor(1250)
//      propertyHandles = await elementHandle.getProperty('disabled');
//      propertyHandle = await propertyHandles.jsonValue();
//   }
//   await page.waitFor(900)
//   await page.click("body > div.content.container.fluid > div > div.col-md-12.ng-scope > div.row.page-footer-nav > div > div.col-md-6.col-xs-12.no-pad.site-flow-nav > div:nth-child(2) > a")
// await page.waitFor(2500)
//     await page.type('.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox', fullName.split(' ').slice(0, -1).join(' '))
//
//     await page.waitForSelector('.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox')
//     await page.type('.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox', fullName.split(' ').slice(-1).join(' '))
//
//     await page.waitForSelector('.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(5) > .noBorderTextBox')
//     await page.type('.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(5) > .noBorderTextBox', phoneNum)
//
//     await page.type('.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(7) > .noBorderTextBox', email)
//
//     await page.type('.demog-page > .row > .col-md-6 > .form-group:nth-child(9) > .noBorderTextBox', email)
//
//     await page.waitForSelector('.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox')
//     await page.type('.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox', address)
//     if(address2!=null){
//     await page.waitForSelector('.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(3) > .noBorderTextBox')
//     await page.type('.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(3) > .noBorderTextBox', address2)
//   }
//   await page.waitForSelector('.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(5) > .noBorderTextBox')
//    await page.type('.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(5) > .noBorderTextBox', zip)
//   await page.click("body > div.content.container.fluid > div > div.col-md-12.demog.ng-scope > form > div > div:nth-child(2) > div:nth-child(7) > input")
// await page.waitFor(3000)
//    example = await page.$x(`//*[@id="continueBtn"]/button`);
//   await example[0].click();
//     await page.waitForSelector('#enteredAddressBtn')
//     await page.click('#enteredAddressBtn')
//     await page.waitFor(750)
//     await page.waitForSelector("#survey-continueBtn")
//     await page.click("#survey-continueBtn")
//     await page.waitFor(750)
//
//     await page.waitForSelector("#continueOrSubmitBtn")
//     await page.click("#continueOrSubmitBtn")
// await page.waitFor(2750)
//     var [element] = await page.$x("/html/body/div[4]/div/div[2]/div/form/div/div/div[1]/h2/span");
//      const text = await page.evaluate(element => element.textContent, element);
//      console.log(text)
// var base64 = await page.screenshot({ encoding: "base64", fullPage: true })
// base64 = await watermark(base64)
// var options = {
//   'method': 'POST',
//   'url': 'https://api.imgur.com/3/image',
//   'headers': {
//     'Authorization': 'Client-ID 85d1b80290d4578',
//   },
//   formData: {
//     'type': 'base64',
//     'image': base64
//   }
// };
// const s = await request.post(options)
//
// console.log(JSON.parse(s)["data"]["link"]);
//
//   for(var ls=0;ls<3;ls++){
// await removeCredit(req.body.key)
// }
//   response.image = JSON.parse(s)["data"]["link"];
//   response.info = `: ${text}`;
//
//   response.message="success";
//   res.send(JSON.stringify(response));
//
//
// })();
// });
// }else{
//
// if(credits<1){
// const s = await deleteKey(req.body.key)
// if(!s){
//   response.message="Error";
//     response.image=`NA`;
//     response.info="Key not found";
// }if(s){
//   response.message="Insufficient credits";
//     response.image=`credits available: ${credits}`;
//     response.info="Key will be removed";
// }
// }
//
// res.send(response)
// }}else{
// response.message="error";
// response.image=null;
// response.info="Address invalid - Please verify with Google Maps the correct info and resubmit";
// res.send(response)
// }
//
// });
async function fetchCredit(clientKey, resp) {
  var res;
  try {
    res = await pool.query(`SELECT * FROM keys
    WHERE key= '${clientKey}';`);
  } catch (e) {
    resp.send('0');
    return false;
  }
  if (res == null) {
    resp.send('0');
    return '0';
  }
  if (res != null) {
    console.log(clientKey + ' ' + res['rows'][0]['uses']);
    resp.send(res['rows'][0]['uses']);
    return res['rows'][0]['uses'];
  }

  return false;
}
async function fetchCredits(clientKey) {
  var res;
  try {
    res = await pool.query(`SELECT * FROM keys
    WHERE key= '${clientKey}';`);
  } catch (e) {
    resp.send(null);
    return false;
  }

  if (res != null && res['rows'][0] != undefined) {
    return res['rows'][0]['uses'];
  }

  return false;
}
async function deleteKey(clientKey) {
  return true;
}

async function removeCredit(clientKey) {
  try {
    const currCredit = await fetchCredits(clientKey);
    var val = parseInt(currCredit) - 1;

    await pool.query(`UPDATE keys SET uses= ${val}
  WHERE key= '${clientKey}';`);
    return true;
  } catch (err) {
    return false;
  }
}
async function removeCreditz(clientKey) {
  try {
    const currCredit = await fetchCredits(clientKey);
    var val = parseFloat(currCredit) - 0.25;

    await pool.query(`UPDATE keys SET uses= ${val}
  WHERE key= '${clientKey}';`);
    return true;
  } catch (err) {
    return false;
  }
}

async function delCredits(clientKey) {
  try {
    const currCredit = await fetchCredits(clientKey);

    await pool.query(`UPDATE keys SET uses= 0
      WHERE key= '${clientKey}';`);
    return true;
  } catch (err) {
    return false;
  }
}
app.get('/addkey', function (req, res) {
  if (req.query.admin == adminKey) {
    var passwords = generator.generate({
      length: 50,
      uppercase: true,
      lowercase: false,
      excludeSimilarCharacters: true,
      numbers: true,
    });

    console.log(`Stacked Key: '${passwords}', '${req.query.uses}'`);
    pool.query(
      `INSERT INTO keys (key,uses)
VALUES ( '${passwords}', '${req.query.uses}')`,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    res.send(passwords);
  }
});

app.get('/credits', async (req, res) => {
  console.log(req.query);
  await fetchCredit(req.query.key, res);
});
app.get('/delcredits', async (req, res) => {
  console.log(req.query);
  await delCredits(req.query.key);
  res.send('success');
});
app.post('/bridgestonerewards', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 1 && credits != null) {
      var today = new Date('2020-08-06');

      today.setDate(today.getDate() + getRandomInt(0, 23));
      var dd = String(today.getDate());
      var mm = String(today.getMonth() + 1); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 208.0;
      var itemName = 'ECOPIA H/L 422 PLUS';
      var size = '235 /55 R19 101H SL BSW';
      var company = 'BRIDGESTONE';
      var itemNum = '43380';
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var url = `http://localhost:8000/discounttirecustom?itemNum=${itemNum}&itemName=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&company=${company}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&size=${size}&city=${city}&zip=${zip}`;
      console.log(url);
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.setDefaultNavigationTimeout(0);
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto('https://bridgestonerewards.com/SubmissionEntry');
              await page.waitForSelector('.row #PurchaseDate');
              await page.type('.row #PurchaseDate', today);
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(1) > div.panel-heading > h1'
              );
              await page.waitFor(1000);
              await page.waitForSelector(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(1) > div.row.controls-row > div > button'
              );
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(1) > div.row.controls-row > div > button'
              );
              await page.waitForSelector(
                '.panel-body > div > .row:nth-child(1) > label > input'
              );
              await page.click(
                '.panel-body > div > .row:nth-child(1) > label > input'
              );
              await page.waitFor(1000);
              await page.waitForSelector(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(2) > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(2) > div.row.controls-row > div > button:nth-child(2)'
              );

              await page.waitForSelector(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div:nth-child(1) > input[type=radio]'
              );
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div:nth-child(1) > input[type=radio]'
              );
              await page.waitFor(1500);
              await page.waitForSelector(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.row.controls-row > div > button:nth-child(2)'
              );

              await page.waitForSelector(
                '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
              );
              await page.click(
                '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
              );
              await page.waitForSelector(
                '.SubmissionEntryClaim > .panel > .panel-body > div:nth-child(2) > input'
              );
              await page.click(
                '.SubmissionEntryClaim > .panel > .panel-body > div:nth-child(2) > input'
              );

              await page.waitForSelector(
                'div > .col-md-6:nth-child(1) > div > div:nth-child(5) > input'
              );
              await page.click(
                'div > .col-md-6:nth-child(1) > div > div:nth-child(5) > input'
              );

              await page.waitForSelector(
                '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
              );
              await page.click(
                '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
              );
              await page.waitForSelector('#StoreCitySate');
              await page.type('#StoreCitySate', '52806-0000');
              await page.waitFor(1000);
              await page.waitForSelector(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(4) > div.panel-body > div:nth-child(1) > div.col-md-push-2.col-xs-12.left.pad-right.col-md-6.col-sm-9 > div > div > div > div > span'
              );
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(4) > div.panel-body > div:nth-child(1) > div.col-md-push-2.col-xs-12.left.pad-right.col-md-6.col-sm-9 > div > div > div > div > span'
              );
              await page.waitFor(2000);

              const elements = await page.$x(
                '//*[@id="0a4f69a0-3fc2-4af2-b7b9-368eab08ce66"]/div[4]/div[2]'
              );
              await elements[0].click();

              await page.waitForSelector(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-2.left.pad-right > div > div > select'
              );

              var selectElem = await page.$(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-2.left.pad-right > div > div > select'
              );
              await selectElem.type('CAR/LIGHT TRUCK/SUV');
              await page.waitFor(800);

              selectElem = await page.$(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-3.left.pad-right > div > div > select'
              );
              await selectElem.type('TIRE');
              await page.waitFor(800);

              selectElem = await page.$(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-4.left.pad-right > div > div > select'
              );
              await selectElem.type('ECOPIA H/L 422 PLUS');
              await page.waitFor(800);

              await page.type(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.control-label.col-xs-2 > div > input',
                '4'
              );
              const fileInput = await page.$('#mainInput0');
              await page.waitFor(1000);

              await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(500);
              await page.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.row.controls-row > div.controls.col-xs-12.pull-right > button:nth-child(2)'
              );
              await page.waitFor(1000);
              await page.waitForSelector('.row #FirstName');
              await page.type(
                '.row #FirstName',
                fullName.split(' ').slice(0, -1).join(' ')
              );

              await page.waitForSelector('.row #LastName');
              await page.type(
                '.row #LastName',
                fullName.split(' ').slice(-1).join(' ')
              );

              await page.waitForSelector('.row #EmailAddress');
              await page.type('.row #EmailAddress', email);

              await page.waitForSelector('.row #EmailAddressConfirm');
              await page.type('.row #EmailAddressConfirm', email);
              await page.waitForSelector('.row #AddressLine1');
              await page.type('.row #AddressLine1', address);
              if (address2 != null) {
                await page.waitForSelector('.row #AddressLine2');
                await page.type('.row #AddressLine2', address2);
              }
              await page.waitForSelector('.row #City');
              await page.type('.row #City', city);

              selectElem = await page.$('#State');
              await selectElem.type(abbrState(stateAbbr, 'name'));

              await page.waitForSelector('.row #Zip');
              await page.type('.row #Zip', zip);
              await page.click(
                '#CheckoutSection > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.waitFor(3500);

              if (
                (await page.$(
                  '#verifyModal > div > div > div.modal-footer > button'
                )) !== null
              ) {
                await page.click(
                  '#verifyModal > div > div > div.modal-footer > button'
                );
                await page.waitFor(1500);
              }

              await page.waitForSelector(
                '#submission > div:nth-child(6) > div.panel-body > div:nth-child(2) > div:nth-child(2) > input[type=radio]'
              );
              await page.click(
                '#submission > div:nth-child(6) > div.panel-body > div:nth-child(2) > div:nth-child(2) > input[type=radio]'
              );
              await page.waitFor(1000);

              await page.click(
                '#submission > div:nth-child(6) > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.waitFor(1000);

              await page.waitForSelector(
                '#RewardSection > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.click(
                '#RewardSection > div.row.controls-row > div > button:nth-child(2)'
              );

              await page.waitFor(1000);
              await page.waitForSelector(
                '#SurveyQuestions > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.click(
                '#SurveyQuestions > div.row.controls-row > div > button:nth-child(2)'
              );
              await page.waitFor(3000);
              let [element] = await page.$x(
                '//*[@id="submission"]/div[11]/div[2]/div[2]/div/h1'
              );
              let text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              text = `Your Claim ID Number is: ${text}`;
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/firestonerewards', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-09-15');

      today.setDate(today.getDate() + getRandomInt(0, 25));
      var dd = String(today.getDate());
      var mm = String(today.getMonth() + 1); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 181.0;
      var itemName = 'WEATHERGRIP';
      var size = '235 /55 R19 101H SL BSW';
      var company = 'FIRESTONE TIRE';
      var itemNum = '88749';
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var url = `http://localhost:8000/discounttirecustom?itemNum=${itemNum}&itemName=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&company=${company}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&size=${size}&city=${city}&zip=${zip}`;
      console.log(url);
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      const browser = await puppeteer.launch({ headless: true });
      //       puppeteer.launch({
      //   browserWSEndpoint: 'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720'
      // }).then(async browser => {
      (async () => {
        try {
          const page = await browser.newPage();
          await page.authenticate({
            username: 'lff4fyij',
            password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
          });

          await page.setDefaultNavigationTimeout(0);
          await page.goto(url);
          await page.screenshot({
            path: `${__dirname}/images/${id}.${ext}`,
            fullPage: true,
          });
          await page.goto('https://www.firestonerewards.com/SubmissionEntry');
          await page.waitForSelector('.row #PurchaseDate');
          await page.type('.row #PurchaseDate', today);
          await page.waitFor(1250);
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(1) > div.panel-heading > h1'
          );
          await page.waitFor(1000);
          await page.waitForSelector(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(1) > div.row.controls-row > div > button'
          );
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(1) > div.row.controls-row > div > button'
          );
          await page.waitFor(1250);

          await page.waitForSelector(
            '.panel-body > div > .row:nth-child(1) > label > input'
          );
          await page.click(
            '.panel-body > div > .row:nth-child(1) > label > input'
          );
          await page.waitFor(1000);
          await page.waitForSelector(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(2) > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(2) > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.waitFor(1250);

          await page.waitForSelector(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div:nth-child(1) > input[type=radio]'
          );
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div:nth-child(1) > input[type=radio]'
          );
          await page.waitFor(1500);
          await page.waitForSelector(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.row.controls-row > div > button:nth-child(2)'
          );

          await page.waitFor(1250);

          await page.waitForSelector(
            '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
          );
          await page.click(
            '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
          );
          await page.waitFor(1250);

          await page.waitForSelector(
            '.SubmissionEntryClaim > .panel > .panel-body > div:nth-child(2) > input'
          );
          await page.click(
            '.SubmissionEntryClaim > .panel > .panel-body > div:nth-child(2) > input'
          );

          await page.waitForSelector(
            'div > .col-md-6:nth-child(1) > div > div:nth-child(5) > input'
          );
          await page.click(
            'div > .col-md-6:nth-child(1) > div > div:nth-child(5) > input'
          );
          await page.waitFor(1250);

          await page.waitForSelector(
            '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
          );
          await page.click(
            '.SubmissionEntryClaim > .panel:nth-child(3) > .row > .controls > .btn:nth-child(2)'
          );
          await page.waitFor(1250);

          await page.waitForSelector('#StoreCitySate');
          await page.type('#StoreCitySate', '52806-0000');
          await page.waitFor(1000);
          await page.waitForSelector(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(4) > div.panel-body > div:nth-child(1) > div.col-md-push-2.col-xs-12.left.pad-right.col-md-6.col-sm-9 > div > div > div > div > span'
          );
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(4) > div.panel-body > div:nth-child(1) > div.col-md-push-2.col-xs-12.left.pad-right.col-md-6.col-sm-9 > div > div > div > div > span'
          );
          await page.waitFor(2000);

          const elements = await page.$x(
            '//*[@id="0a4f69a0-3fc2-4af2-b7b9-368eab08ce66"]/div[4]/div[2]'
          );
          await elements[0].click();

          await page.waitForSelector(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-2.left.pad-right > div > div > select'
          );

          var selectElem = await page.$(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-2.left.pad-right > div > div > select'
          );
          await selectElem.type('CAR/LIGHT TRUCK/SUV');
          await page.waitFor(800);

          selectElem = await page.$(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-3.left.pad-right > div > div > select'
          );
          await selectElem.type('TIRE');
          await page.waitFor(800);

          selectElem = await page.$(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-4.left.pad-right > div > div > select'
          );
          await selectElem.type('WEATHERGRIP');
          await page.waitFor(800);

          await page.type(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.control-label.col-xs-2 > div > input',
            '4'
          );
          const fileInput = await page.$('#mainInput0');
          await page.waitFor(1000);

          await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
          await page.waitFor(500);
          await page.click(
            '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.row.controls-row > div.controls.col-xs-12.pull-right > button:nth-child(2)'
          );
          await page.waitFor(1000);
          await page.waitForSelector('.row #FirstName');
          await page.type(
            '.row #FirstName',
            fullName.split(' ').slice(0, -1).join(' ')
          );

          await page.waitForSelector('.row #LastName');
          await page.type(
            '.row #LastName',
            fullName.split(' ').slice(-1).join(' ')
          );

          await page.waitForSelector('.row #EmailAddress');
          await page.type('.row #EmailAddress', email);

          await page.waitForSelector('.row #EmailAddressConfirm');
          await page.type('.row #EmailAddressConfirm', email);
          await page.waitForSelector('.row #AddressLine1');
          await page.type('.row #AddressLine1', address);
          if (address2 != null) {
            await page.waitForSelector('.row #AddressLine2');
            await page.type('.row #AddressLine2', address2);
          }
          await page.waitForSelector('.row #City');
          await page.type('.row #City', city);

          selectElem = await page.$('#State');
          await selectElem.type(abbrState(stateAbbr, 'name'));

          await page.waitForSelector('.row #Zip');
          await page.type('.row #Zip', zip);
          await page.click(
            '#CheckoutSection > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.waitFor(1800);

          await page.waitForSelector(
            '#submission > div:nth-child(6) > div.panel-body > div:nth-child(2) > div:nth-child(2) > input[type=radio]'
          );
          await page.click(
            '#submission > div:nth-child(6) > div.panel-body > div:nth-child(2) > div:nth-child(2) > input[type=radio]'
          );
          await page.click(
            '#submission > div:nth-child(6) > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.waitFor(1000);

          await page.waitForSelector(
            '#RewardSection > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.click(
            '#RewardSection > div.row.controls-row > div > button:nth-child(2)'
          );

          await page.waitFor(1000);
          await page.waitForSelector(
            '#SurveyQuestions > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.click(
            '#SurveyQuestions > div.row.controls-row > div > button:nth-child(2)'
          );
          await page.waitFor(3000);
          let [element] = await page.$x(
            '//*[@id="submission"]/div[11]/div[2]/div[2]/div/h1'
          );
          let text = await page.evaluate(
            (element) => element.textContent,
            element
          );
          text = `Your Claim ID Number is: ${text}`;
          console.log(text);
          var base64 = await page.screenshot({
            encoding: 'base64',
            fullPage: true,
          });
          base64 = await watermark(base64);
          var options = {
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
              Authorization: 'Client-ID 85d1b80290d4578',
            },
            formData: {
              type: 'base64',
              image: base64,
            },
          };
          const s = await request.post(options);

          console.log(JSON.parse(s)['data']['link']);

          await browser.close();
          await removeCredit(req.body.key);
          response.image = JSON.parse(s)['data']['link'];
          response.info = `Tracking: ${text}`;
          response.message = 'success';
          res.send(JSON.stringify(response));
        } catch (e) {
          console.error(e);
        } finally {
          response.message = 'error';
          response.image = null;
          response.info =
            'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
          res.send(JSON.stringify(response));
          console.log('We do cleanup here');
        }
      })();
      // });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
// app.post('/michelin', async (req, res) => {

//   const credits = await fetchCredits(req.body.key);
//   var response = {}
//   var isAddressValid = await validate(req.body)
//   if (isAddressValid) {
//     if (credits > 2 && credits != null) {
//       var today = new Date('2020-08-31')

//       today.setDate(today.getDate() - getRandomInt(0, 13));
//       var dd = String(today.getDate()).padStart(2, '0');
//       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//       var yyyy = today.getFullYear();

//       today = mm + '/' + dd + '/' + yyyy;
//       console.log(today)

//       //   var data = {
//       //     "email": "asdsda@gmail.com",
//       //   "item": "s",
//       //   "date": "ss s",
//       //   "subprice": 2222,
//       //   "quantity": "2",
//       //   "seller": "ss",
//       //   "itemname": "ssssss",
//       //   "image": "true",
//       //   "fullName": "ss ss",
//       //   "address": "2121 armstrong dr",
//       //   "stateAbbr": "CA",
//       //   "city": "Pleasanton",
//       //   "zip": "94588"
//       // };
//       var data = req.body;
//       console.log(data)
//       var types = ["jpeg", "jpg", "png"]
//       const ext = types[getRandomInt(0, 2)]

//       var fullName = data["fullName"]
//       var address = data["address1"]
//       var address2 = data["address2"]
//       var stateAbbr = data["stateAbbr"]
//       var subprice = 227.00
//       var itemName = "PILOT SPORT 4 SUV"
//       var size = "235 /55 R19 105Y XL BSW"
//       var company = "MICHELIN"
//       var itemNum = "42865"
//       var quantity = "4"
//       var city = data["city"]
//       var zip = data["zip"]
//       var date = today;
//       var email = data["email"]

//       var url = `http://localhost:8000/discounttirecustom?itemNum=${itemNum}&itemName=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&company=${company}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&size=${size}&city=${city}&zip=${zip}`;
//       console.log(url)
//       var id = uuidv4();

//       puppeteer.use(StealthPlugin())

//       // const browser = await puppeteer.launch({headless:false});
//       puppeteer.launch({
//         browserWSEndpoint: 'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720'
//       }).then(async browser => {
//         (async () => {
//           try {

//             const page = await browser.newPage();
//             await page.authenticate({
//               username: 'lff4fyij',
//               password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
//             });

//             await page.setDefaultNavigationTimeout(0);
//             await page.goto(url)
//             var password = generator.generate({
//               length: 15,
//               uppercase: true,
//               lowercase: true,
//               excludeSimilarCharacters: true,
//               strict: true,
//               numbers: true
//             });

//             var phoneNum = getAreaCode() + getRandomInt(1000000, 9999999).toString()
//             await page.goto(url)
//             await page.waitForSelector('#id1_1 > p.p2.ft2 > span')
//             var element = await page.$('#id1_1 > p.p2.ft2 > span')
//             value = await page.evaluate(el => el.textContent, element)
//             console.log(value)
//             await page.screenshot({ path: `${__dirname}/images/${id}.${ext}`, fullPage: true });
//             await page.goto('https://tirerewards.tirerewardcenter.com/Register/1');

//             await page.waitForSelector('.card-body #emailAddress')
//             await page.type('.card-body #emailAddress', email)

//             await page.waitForSelector('.row #password')
//             await page.type('.row #password', password)

//             await page.waitForSelector('.card-body #firstName')
//             await page.type('.card-body #firstName', fullName.split(' ').slice(0, -1).join(' '))

//             await page.waitForSelector('.card-body #lastName')
//             await page.type('.card-body #lastName', fullName.split(' ').slice(-1).join(' '))

//             await page.waitForSelector('.card-body #phone')
//             await page.type('.card-body #phone', phoneNum)

//             await page.waitForSelector('.card-body #country')
//             await page.select('.card-body #country', 'USA')

//             await page.waitForSelector('.card-body #address1')
//             await page.type('.card-body #address1', address)
//             if (address2 != null) {
//               await page.waitForSelector('.card-body #address2')
//               await page.type('.card-body #address2', address2)
//             }
//             await page.waitForSelector('.card-body #city')
//             await page.type('.card-body #city', city)

//             await page.waitForSelector('.card-body #state')
//             await page.select('.card-body #state', stateAbbr)

//             await page.waitForSelector('.card-body #zip')
//             await page.type('.card-body #zip', zip)
//             await page.waitForSelector('.card-body #preferredContactMethod')
//             await page.select('.card-body #preferredContactMethod', 'Email')
//             phoneNum = await phone(page, phoneNum);
//             await page.waitForSelector("#root > div > div.page__content > div > div > div > form > div.row > div:nth-child(2) > button")

//             await page.click("#root > div > div.page__content > div > div > div > form > div.row > div:nth-child(2) > button")
//             await page.waitForSelector("#address-validator__continue")
//             await page.click("#address-validator__continue")
//             await page.waitForSelector("#dashboard__submit-claim--select")
//             await page.select("#dashboard__submit-claim--select", "142")
//             await page.waitForSelector("#dashboard__submit-claim--trigger")
//             await page.click("#dashboard__submit-claim--trigger")
//             await page.waitForSelector("#question_cdb97a03-ac8b-4808-b565-ec6a3e0259a4")
//             await page.type("#question_cdb97a03-ac8b-4808-b565-ec6a3e0259a4", today)
//             await page.click("#create-new-claim__form > div.mb-3.card > div:nth-child(1) > h2")
//             await page.waitForSelector("#question_1921166b-d039-46c9-a536-928f65daab23")
//             await page.type("#question_1921166b-d039-46c9-a536-928f65daab23", "Discount Tire")
//             await page.waitForSelector("#question_c1a9f0ef-19bc-4846-bf14-57aaa2127d0e")
//             await page.type("#question_c1a9f0ef-19bc-4846-bf14-57aaa2127d0e", "Davenport")
//             await page.waitForSelector("#question_cd8420d7-a73d-4d60-ad10-f670e872afbf")
//             await page.type("#question_cd8420d7-a73d-4d60-ad10-f670e872afbf", "Iowa")
//             const fileInput = await page.$('#question_53144f72-dc6b-4a6b-a930-5f6703b3b0fe');
//             await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);
//             await page.waitForSelector("#question_92e5fd8c-2164-421f-887d-3b72bfd46f80")
//             await page.select("#question_92e5fd8c-2164-421f-887d-3b72bfd46f80", "NO")
//             await page.waitForSelector("#question_70f4bd2d-c79b-4cc4-8135-01b48e083eaa")
//             await page.type("#question_70f4bd2d-c79b-4cc4-8135-01b48e083eaa", value)
//             await page.waitForSelector("#question_0b6acd0c-d6f5-4378-a7d6-e1d8ad818ec9")
//             await page.select("#question_0b6acd0c-d6f5-4378-a7d6-e1d8ad818ec9", "MICHELIN")
//             await page.waitForSelector("#question_347e1945-d6d8-4744-acdf-6aeb9ab39464")
//             await page.type("#question_347e1945-d6d8-4744-acdf-6aeb9ab39464", itemName)
//             await page.waitForSelector("#question_7901e577-d0a7-4209-9cca-08c4f3666251")
//             await page.type("#question_7901e577-d0a7-4209-9cca-08c4f3666251", size)
//             await page.waitForSelector("#question_8cacab40-2277-4d3e-af31-b250384a7e64")
//             await page.select("#question_8cacab40-2277-4d3e-af31-b250384a7e64", "NO")
//             await page.waitForSelector("#question_333fd60c-5fb8-461f-8c22-47d102f3df31")
//             await page.type("#question_333fd60c-5fb8-461f-8c22-47d102f3df31", "4")

//             await page.waitForSelector("#question_630141a5-6ba3-46fe-9f9e-5d5cdd10edb0")
//             await page.type("#question_630141a5-6ba3-46fe-9f9e-5d5cdd10edb0", "908")

//             await page.waitForSelector("#question_6df900b1-c6e1-4381-ae59-9d13b85882ed")
//             await page.type("#question_6df900b1-c6e1-4381-ae59-9d13b85882ed", "2019")

//             await page.waitForSelector("#question_3b3002aa-e35e-4b9b-9336-54af5da6b342")
//             await page.type("#question_3b3002aa-e35e-4b9b-9336-54af5da6b342", "Acura")

//             await page.waitForSelector("#question_315abde1-eda6-4166-95c1-929eb34dd146")
//             await page.type("#question_315abde1-eda6-4166-95c1-929eb34dd146", "RDX")

//             await page.waitForSelector("#question_ea41aa51-fba8-4f17-9bec-c494f9be57e9")
//             await page.select("#question_ea41aa51-fba8-4f17-9bec-c494f9be57e9", "NO")

//             await page.waitForSelector("#question_8ff5f4a3-1d13-4df8-bb5b-4b3421c21d1d")
//             await page.select("#question_8ff5f4a3-1d13-4df8-bb5b-4b3421c21d1d", "NO")

//             await page.waitForSelector("#question_a0a526a7-b92f-4684-907e-f5db07eb85a6")
//             await page.select("#question_a0a526a7-b92f-4684-907e-f5db07eb85a6", "NO")

//             await page.waitForSelector("#create-new-claim__form > div.mb-3.card > div.pt-0.card-body > div > div:nth-child(2) > div.text-right.pt-2.form-check > label > input")
//             await page.click("#create-new-claim__form > div.mb-3.card > div.pt-0.card-body > div > div:nth-child(2) > div.text-right.pt-2.form-check > label > input")

//             await page.waitForSelector(`#create-new-claim__submit`)
//             await page.click(`#create-new-claim__submit`)
//             await page.waitFor(10000)
//             var text = `The Login for Michelin account is ${email}:${password}`
//             var base64 = await page.screenshot({ encoding: "base64", fullPage: true })
//             base64 = await watermark(base64)
//             var options = {
//               'method': 'POST',
//               'url': 'https://api.imgur.com/3/image',
//               'headers': {
//                 'Authorization': 'Client-ID 85d1b80290d4578',
//               },
//               formData: {
//                 'type': 'base64',
//                 'image': base64
//               }
//             };
//             const s = await request.post(options)

//             console.log(JSON.parse(s)["data"]["link"]);

//             await browser.close();
//             await removeCredit(req.body.key)
//             await removeCredit(req.body.key)
//             await removeCredit(req.body.key)
//             response.image = JSON.parse(s)["data"]["link"];
//             response.info = `${text}`;
//             response.message = "success";
//             res.send(JSON.stringify(response));
//           } catch (e) {
//             console.error(e);
//           } finally {
//             response.message = "error";
//             response.image = null;
//             response.info = "Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted";
//             res.send(JSON.stringify(response));
//             console.log('We do cleanup here');
//           }
//         })();
//       });
//     } else {
//       if (credits < 1) {
//         const s = await deleteKey(req.body.key)
//         if (!s) {
//           response.message = "Error";
//           response.image = `NA`;
//           response.info = "Key not found";
//         } if (s) {
//           response.message = "Insufficient credits";
//           response.image = `credits available: ${credits}`;
//           response.info = "Key will be removed";
//         }
//       }

//       res.send(response)
//     }
//   } else {
//     response.message = "error";
//     response.image = null;
//     response.info = "Address invalid - Please verify with Google Maps the correct info and resubmit";
//     res.send(response)
//   }

// });
app.post('/vogue', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-08-17');

      today.setDate(today.getDate() + getRandomInt(0, 11));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];

      var stateAbbr = data['stateAbbr'];
      var subprice = 166;
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      address.concat(address2);

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.goto('https://at.rebatepromotions.com/#/20-27006');
              await page.waitForSelector(
                '.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding'
              );
              await page.click(
                '.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding'
              );
              var example = await page.$x("//input[@id='Invoice Number']");
              await example[0].type(getRandomInt(1000000, 9999999).toString());
              example = await page.$x("//input[@id='Purchase Date']");
              await example[0].type(today);
              await page.waitFor(4000);
              await page.waitForSelector('#con-notification > button');
              await page.click('#con-notification > button');
              await page.waitFor(1000);
              example = await page.$x(`//*[@id="continueOrSubmitBtn"]`);
              await example[0].click();

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox',
                fullName.split(' ').slice(0, -1).join(' ')
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox',
                fullName.split(' ').slice(-1).join(' ')
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(5) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(5) > .noBorderTextBox',
                getRandomInt(1000000000, 9999999999).toString()
              );

              await page.waitForSelector('.demog-page > .row > .col-md-');
              await page.type('.demog-page > .row > .col-md-', email);

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(9) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(9) > .noBorderTextBox',
                email
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox',
                address
              );
              if (address2 != null) {
                await page.waitForSelector(
                  '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(3) > .noBorderTextBox'
                );
                await page.type(
                  '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(3) > .noBorderTextBox',
                  address2
                );
              }
              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(5) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(5) > .noBorderTextBox',
                zip
              );
              await page.click(
                'body > div.content.container.fluid > div > div.col-md-12.demog.ng-scope > form > div > div:nth-child(2) > div:nth-child(7) > input'
              );
              await page.waitFor(3000);
              example = await page.$x(`//*[@id="continueBtn"]/button`);
              await example[0].click();
              await page.waitForSelector('#enteredAddressBtn');
              await page.click('#enteredAddressBtn');

              await Promise.all([
                page.goto('https://at.rebatepromotions.com/#/review'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
              ]);
              await page.waitFor(3000);
              await page.click('#continueOrSubmitBtn');
              await page.waitForSelector('#confirmation-trackingNumber');
              element = await page.$('#confirmation-trackingNumber');
              const text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

app.post('/gbc', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 3 && credits != null) {
      var today = new Date('2020-07-01');

      today.setDate(today.getDate() + getRandomInt(0, 31));
      var installDate = new Date();
      installDate.setDate(today.getDate() + getRandomInt(10, 20));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todays = today;
      today = mm + '/' + dd + '/' + yyyy;

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

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

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();
      var subprice = 5429.41;
      var quantity = 1;
      var itemname = 'SWINGLINE 1758578 MICRO STACK-N-SHRED AUTO SHRED';
      var imageurl =
        'https://i5.walmartimages.com/asr/fa757d2b-68a7-45eb-ae9d-b48a77a5b13a_1.3c25db3bf600c16cb0ed4a9722da09f1.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff';
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
      var url = `http://localhost:8000/walmart?email=${email}&seller=Amazon.com&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              await page.pdf({
                path: `${__dirname}/images/${id}.pdf`,
                format: 'A4',
                printBackground: true,
              });

              await page.goto(
                'https://accorebates.karrotrewards.com/Claim/Promotion/2020-01-GBCLaminationBindingShredding/126bf555-dfa7-4538-bd55-20b5981cc704'
              );
              let div_selector_to_remove =
                'body > div.wpcc-container.wpcc-float.wpcc-corners-round.wpcc-corners-small.wpcc-border-thin.wpcc-bottom.wpcc-right.wpcc-color-custom--1063061609';

              await page.evaluate((sel) => {
                var elements = document.querySelectorAll(sel);
                for (var i = 0; i < elements.length; i++) {
                  elements[i].parentNode.removeChild(elements[i]);
                }
              }, div_selector_to_remove);
              await page.waitFor(2000);
              await page.type('.content #FirstName', firstName);

              await page.type('.content #LastName', lastName);

              await page.type('.content #Email', email);

              await page.type('.content #AddressLineOne', address);
              if (address2 != null) {
                await page.type('.content #AddressLineTwo', address2);
              }
              await page.type('.content #Locality', city);
              await page.type('.content #Phone', phoneNum);

              await page.select('.content #Region', stateAbbr);

              await page.type('.content #PostalCode', zip);

              await page.type('.content #PurchasedFrom', 'Walmart');

              await page.select(
                '.content #ProductsPurchased',
                'GBC1758578 750M'
              );
              await page.type('.content #DatePurchased', today);
              await page.waitFor(1250);
              const fileInput = await page.$('input[type=file]');
              await fileInput.uploadFile(`${__dirname}/images/${id}.pdf`);
              await page.waitFor(1500);

              await page.click(
                '.g1 > .sp5 > .form__inner > .form__buttons > .form__button'
              );
              await page.waitForSelector(
                '#wrapper > div > div:nth-child(3) > div > div > form > div > div > button'
              );
              await page.click(
                '#wrapper > div > div:nth-child(3) > div > div > form > div > div > button'
              );
              await page.waitFor(5000);
              await page.waitForSelector(
                '#wrapper > div > div:nth-child(3) > div > div > div'
              );
              const element = await page.$(
                '#wrapper > div > div:nth-child(3) > div > div > div'
              );

              const text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);

              response.image = JSON.parse(s)['data']['link'];
              response.info = `There is no success message or Screenshot for this rebate`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/kyb', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 1 && credits != null) {
      var today = new Date('2020-08-01');

      today.setDate(today.getDate() + getRandomInt(0, 41));
      var installDate = new Date();
      installDate.setDate(today.getDate() + getRandomInt(10, 20));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todays = today;
      today = mm + '/' + dd + '/' + yyyy;

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

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

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();

      var subprice = 130.9;
      var quantity = 4;
      var itemname = 'KYB Strut Plus';
      var imageurl =
        'https://i5.walmartimages.com/asr/b37ee95b-10c6-482a-9203-6addcecdfb79_1.22a2496f004e5de2a8139774f3184776.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
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
      var url = `http://localhost:8000/walmart?email=${email}&seller=Amazon.com&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto(
                'https://rapid-rebates.com/KYBFeelingisBelievingFall'
              );
              await page.click(
                '.divPromotionListItem > div > .templatePromotion > div > .templatePromoRebateButton'
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(1) > .rebateForm__field--medium'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(1) > .rebateForm__field--medium',
                firstName
              );

              await page.waitForSelector(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(2) > .rebateForm__field--medium'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(2) > .rebateForm__field--medium',
                lastName
              );

              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(3) > .rebateForm__field--large',
                address
              );
              if (address2 != null) {
                await page.type(
                  '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(4) > .rebateForm__field--large',
                  address2
                );
              }
              await page.select(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(5) > .rebateForm__field--medium',
                'string:USA'
              );
              await page.type(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field:nth-child(6) > .rebateForm__field--medium',
                zip
              );

              await page.select(
                '.rebateForm > .rebateForm__leftColumn > .rebateFormModal__formContainer > .rebateForm__field > .rebateForm__field--medium:nth-child(3)',
                `string:${stateAbbr}`
              );

              await page.waitForSelector(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(2) > .templateFormElement > .formElement__container > .formElement'
              );
              await page.type(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(2) > .templateFormElement > .formElement__container > .formElement',
                phoneNum
              );

              await page.waitForSelector(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement'
              );
              await page.type(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement',
                email
              );
              await page.type(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer:nth-child(5) > .templateFormElement > .formElement__container > .formElement',
                'Walmart'
              );

              await page.select(
                '.rebateForm__leftColumn > .rebateForm__formElementContainer > .templateFormElement > .formElement__container > .formElement--dropdownList',
                'string:Y'
              );
              await page.select(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(1) > .templateFormElement > .formElement__container > .formElement',
                'string:4 KYB Strut-Plus ($75)'
              );

              var x = ['SR4003', 'SR4233'];
              var rand = x[getRandomInt(0, 1)];

              await page.type(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(2) > .templateFormElement > .formElement__container > .formElement',
                'SR4083'
              );

              await page.type(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(3) > .templateFormElement > .formElement__container > .formElement',
                'SR4004'
              );

              await page.type(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(4) > .templateFormElement > .formElement__container > .formElement',
                'SR4196'
              );

              await page.type(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(5) > div > div > input',
                rand
              );
              var fileInput = await page.$(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(6) > div > div > div > div > div > input'
              );
              await fileInput.uploadFile(`${__dirname}\\SR4083.PNG`);
              await fileInput.uploadFile(`${__dirname}\\SR4004.PNG`);
              await fileInput.uploadFile(`${__dirname}\\SR4196.PNG`);
              await fileInput.uploadFile(`${__dirname}\\${rand}.PNG`);
              await page.select(
                '.rebateForm__rightColumn > .rebateForm__formElementContainer:nth-child(7) > .templateFormElement > .formElement__container > .formElement',
                'string:N'
              );
              fileInput = await page.$(
                'body > div.modal.fade.ng-isolate-scope.rebateFormModal.in > div > div > div > form > div.rebateForm__rightColumn > div:nth-child(8) > div > div > div > div > div > input'
              );
              await fileInput.uploadFile(`${__dirname}\\images\\${id}.${ext}`);
              await page.waitFor(1750);
              await page.click('.modal #btnAge');
              await page.waitFor(750);

              await page.waitForSelector('.modal #btnAge');
              await page.click('.modal #btnAge');
              await page.waitFor(10000);
              var text;
              try {
                var element = await page.$(
                  '#summaryModalDiv > div > div.row.summaryModal__trackingNumberRow.ng-scope > div:nth-child(3) > label'
                );
                text = await page.evaluate(
                  (element) => element.textContent,
                  element
                );
              } catch (err) {
                text = null;
              }
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);

              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/pluto', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 9 && credits != null) {
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

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

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

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();

      var subprice = 1208.37;
      var quantity = 1;
      var itemname =
        'Signature Premier 50-Gallon Tall 10-year Limited 4500-Watt Double Element Electric Water Heater with Hybrid Heat Pump';
      var imageurl =
        'http://mobileimages.lowes.com/product/converted/035505/035505003348.jpg?size=pdhi';
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
      var url = `http://localhost:8000/lowes2?email=${email}&seller=Amazon.com&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);

      puppeteer.use(StealthPlugin());

      const browser = await puppeteer.launch({ headless: true });
      //       puppeteer.launch({
      //   browserWSEndpoint: 'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800&headless=false'
      // }).then(async browser => {
      (async () => {
        try {
          const page = await browser.newPage();
          await page.authenticate({
            username: 'lff4fyij',
            password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
          });

          var phoneNum =
            getAreaCode() + getRandomInt(1000000, 9999999).toString();
          await page.goto(url);
          await page.goto(url);
          await page.screenshot({
            path: `${__dirname}/images/${id}.${ext}`,
            fullPage: true,
          });

          await page.goto('https://pluto.secure.force.com/pecocustomerportal');
          await page.click(
            '#loginScreen > div:nth-child(2) > div:nth-child(1) > div > h2 > a'
          );
          await page.waitForSelector(
            '.panel-body #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Amalfirstname'
          );

          await page.select(
            '.panel-body #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Apayee-type',
            'Account Holder'
          );
          await page.waitForSelector(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Aphone'
          );
          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Aphone',
            phoneNum
          );

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3A AccountNumber',
            '0' + getRandomInt(100000000, 999999999)
          );

          await page.type(
            '.panel-body #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Amalfirstname',
            firstName
          );

          await page.type(
            '.panel-body #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Amallastname',
            lastName
          );

          await page.type(
            '.panel-body #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Amailingphone',
            phoneNum
          );

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3A address_copy',
            addresses
          );

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3A city_copy',
            city
          );

          await page.select(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Astate_copy',
            stateAbbr
          );

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3AZipCode_copy',
            zip
          );

          await page.type(
            '.col-sm-6 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Areg_username',
            email
          );

          await page.type(
            '.col-sm-6 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Areg_password',
            passwords
          );

          await page.type(
            '.col-sm-6 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Areg_confirmpassword',
            passwords
          );

          await page.click('#regScreen #termsConditions');
          await page.click('#regScreen #termsConditions');

          await page.click(
            '#j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Aj_id84 > #regScreen > #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3AregisterActionPanel #accept-button-sLogin'
          );
          await page.click(
            '#j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3Aj_id84 > #regScreen > #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3Asigninform\\3AregisterActionPanel #accept-button-sLogin'
          );
          await page.waitFor(17000);
          await page.goto(
            'https://pecorebateportal.com/rebates/appliance/replacement-of-electric-storage-tank-water-heater-with-energy-star-natural-gas-storage-tank-water-heater.html'
          );
          await page.click(
            '#sk_atc_110 > div.addtocart-bar > span.addtocart-button > input'
          );
          await page.waitFor(2500);
          await page.waitForSelector(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 0\\3Aj_id298\\3A 0\\3Aj_id304'
          );

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 0\\3Aj_id298\\3A 0\\3Aj_id304',
            subprice.toString()
          );
          await page.$eval(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:rebateInfoForm\\:j_id296\\:0\\:j_id298\\:1\\:j_id304',
            (e) => {
              e.removeAttribute('readonly');
            }
          );
          await page.$eval(
            '.panel #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 0\\3Aj_id298\\3A 2\\3Aj_id304',
            (e) => {
              e.removeAttribute('readonly');
            }
          );
          await page.waitFor(1250);
          await page.type(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:rebateInfoForm\\:j_id296\\:0\\:j_id298\\:1\\:j_id304',
            today
          );
          await page.waitFor(800);
          await page.type(
            '.panel #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 0\\3Aj_id298\\3A 2\\3Aj_id304',
            installDate.toString()
          );
          await page.keyboard.press('Enter');

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 1\\3Aj_id298\\3A 0\\3Aj_id304',
            'Self-'
          );
          await page.waitForSelector('.ext-webkit > #ui-id-1 #ui-id-2');
          await page.click('.ext-webkit > #ui-id-1 #ui-id-2');
          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 2\\3Aj_id298\\3A 0\\3Aj_id304',
            'EG12-50R55DV'
          );

          await page.select(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 2\\3Aj_id298\\3A 1\\3Aj_id304',
            'Electric Water Heater'
          );

          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3Aj_id296\\3A 2\\3Aj_id298\\3A 2\\3Aj_id304',
            'A.O. Smith'
          );
          await page.select(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3AselectedMake',
            'A. O. Smith'
          );
          await page.waitFor(1500);
          await page.type(
            '.col-md-12 #j_id0\\3AtheHeaderTemp\\3AtheSiteTemp\\3ArebateInfoForm\\3AmodelNumberAutoComplete',
            'HP10-50H45DV 120'
          );

          await page.waitForSelector('.col-md-12 #addToCart');
          await page.click('.col-md-12 #addToCart');
          await page.waitForSelector('#checkoutFormSubmit');
          await page.click('#checkoutFormSubmit');

          await page.waitForSelector(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:resForm\\:j_id299\\:0\\:j_id333 > a',
            { timeout: 65000 }
          );
          await page.click(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:resForm\\:j_id299\\:0\\:j_id333 > a'
          );
          await page.waitForSelector('#h1UploadPageHeadeTex');

          await page.waitFor(750);
          await page.reload({
            waitUntil: ['networkidle0', 'domcontentloaded'],
          });

          await page.waitFor(2500);
          await page.waitForSelector(
            '.col-md-2:nth-child(5) > .box > .box-body > .fileTile > .fileIco > img',
            { timeout: 60000 }
          );
          await page.click(
            '.col-md-2:nth-child(5) > .box > .box-body > .fileTile > .fileIco > img'
          );
          var inputUploadHandle = await page.$('.top-space #flUpldNewBox1');
          inputUploadHandle.uploadFile(`${__dirname}\\images\\${id}.${ext}`);
          inputUploadHandle.uploadFile(`${__dirname}/images/${id}.${ext}`);
          inputUploadHandle.uploadFile(`./images/${id}.${ext}`);
          await page.waitFor(1200);
          await page.click('#lnkBtnUploadNewBox');
          await page.waitFor(5000);
          await page.waitForSelector(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:resForm\\:j_id405 > a',
            { timeout: 65000 }
          );

          await page.click(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:resForm\\:j_id405 > a'
          );
          await page.waitForSelector('#i_agree');
          console.log(await page.evaluate(() => enablecheckbox()));
          await page.click('#i_agree');
          await page.waitFor(750);
          await page.click(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:signAndSubmitForm\\:j_id207\\:j_id208\\:signaturePad_signature'
          );

          await page.waitForSelector('#btnConfirmAndSubmit');
          await page.click('#btnConfirmAndSubmit');
          await page.waitFor(25000);
          var element = await page.$(
            '#j_id0\\:theHeaderTemp\\:theSiteTemp\\:j_id81 > div > div > div > h3'
          );
          var text = await page.evaluate(
            (element) => element.textContent,
            element
          );
          var base64 = await page.screenshot({
            encoding: 'base64',
            fullPage: true,
          });
          base64 = await watermark(base64);
          var options = {
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            headers: {
              Authorization: 'Client-ID 85d1b80290d4578',
            },
            formData: {
              type: 'base64',
              image: base64,
            },
          };
          const s = await request.post(options);

          console.log(JSON.parse(s)['data']['link']);

          await browser.close();
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);
          await removeCredit(req.body.key);

          response.image = JSON.parse(s)['data']['link'];
          response.info = `Tracking: ${text} + Login:${email}:${passwords}`;
          response.message = 'success';
          res.send(JSON.stringify(response));
        } catch (e) {
          console.error(e);
        } finally {
          response.message = 'error';
          response.image = null;
          response.info =
            'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
          res.send(JSON.stringify(response));
          console.log('We do cleanup here');
        }
      })();
      // });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/bioadvanced', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-02-01');

      today.setDate(today.getDate() + getRandomInt(0, 100));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todays = today;
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'png', 'jpg'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var subprice = 12.11;
      var quantity = 4;
      var itemname =
        'BioAdvanced 704140 All-In-One Lawn Weed and Crabgrass Killer Garden Herbicide, 32-Ounce';
      var imageurl =
        'https://i5.walmartimages.com/asr/80ff3ec9-3ef0-4ceb-b57d-9abb2d299ea5_1.e2ed82d5959de651b7ecba995b4f8b59.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
      var seller = "Colorado's Choice Nursery";

      var addresses = null;
      if (address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      //cash
      var date = today;
      var url = `http://localhost:8000/?email=${email}&seller=${seller}&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);
      console.log(JSON.stringify(data));
      var id = uuidv4();

      puppeteer.use(StealthPlugin());
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });
              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto(
                'https://apfco.org/secure/W1519A/BioAdvanced/BlueBottle20WEB/Rebate'
              );
              await page.waitForSelector('.col-sm-4 #ship_fname');
              await page.type(
                '.col-sm-4 #ship_fname',
                fullName.split(' ').slice(0, -1).join(' ')
              );

              await page.waitForSelector('.col-sm-4 #ship_lname');
              await page.type(
                '.col-sm-4 #ship_lname',
                fullName.split(' ').slice(-1).join(' ')
              );

              await page.waitForSelector('.container-fluid #ship_address');
              await page.type('.container-fluid #ship_address', address);

              await page.waitForSelector('.col-sm-4 #ship_city');
              await page.type('.col-sm-4 #ship_city', city);

              await page.select('.col-sm-4 #ship_state', stateAbbr);

              await page.waitForSelector('.col-sm-4 #ship_zip');
              await page.type('.col-sm-4 #ship_zip', zip);

              await page.waitForSelector('.container-fluid #email');
              await page.type('.container-fluid #email', email);

              await page.waitForSelector('.container-fluid #ConfirmationEmail');
              await page.type('.container-fluid #ConfirmationEmail', email);
              await page.select('.container-fluid #StoreName', 'Amazon.com');
              var sss = todays.getMonth() + 1;

              await page.select(
                '.col-xs-12 #purchaseDate_month',
                sss.toString()
              );
              await page.select(
                '.col-xs-12 #purchaseDate_day',
                todays.getDate().toString()
              );
              await page.select('.col-xs-12 #purchaseDate_year', '2020');

              await page.select('.container-fluid #qtyProductsPurchased', '5');

              await page.waitForSelector('.container-fluid #UPC1');
              await page.type('.container-fluid #UPC1', '8707304140');

              await page.waitForSelector('.container-fluid #UPC2');
              await page.type('.container-fluid #UPC2', '8707304140');

              await page.waitForSelector('.container-fluid #UPC3');
              await page.type('.container-fluid #UPC3', '8707304140');

              await page.waitForSelector('.container-fluid #UPC4');
              await page.type('.container-fluid #UPC4', '8707304140');

              await page.waitForSelector('.container-fluid #UPC5');
              await page.type('.container-fluid #UPC5', '8707304140');

              await page.waitForSelector('.container-fluid #purchasePrice1');
              await page.type('.container-fluid #purchasePrice1', '12.11');

              await page.waitForSelector('.container-fluid #purchasePrice2');
              await page.type('.container-fluid #purchasePrice2', '12.11');

              await page.waitForSelector('.container-fluid #purchasePrice3');
              await page.type('.container-fluid #purchasePrice3', '12.11');

              await page.waitForSelector('.container-fluid #purchasePrice4');
              await page.type('.container-fluid #purchasePrice4', '12.11');

              await page.waitForSelector('.container-fluid #purchasePrice5');
              await page.type('.container-fluid #purchasePrice5', '12.11');

              await page.waitForSelector('.row #optin_communications');
              await page.click('.row #optin_communications');

              await page.waitForSelector('.row #agree_terms');
              await page.click('.row #agree_terms');

              await page.waitForSelector('.row #sendEcheck');
              await page.click('.row #sendEcheck');

              await page.waitForSelector(
                '.col-xs-11 > .row > .noPadLR #submission_type'
              );
              await page.click('.col-xs-11 > .row > .noPadLR #submission_type');
              const inputUploadHandle = await page.$('#receipt_image_upload');

              inputUploadHandle.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.solveRecaptchas();
              await page.click(
                'body > div.siteWrapper > div > div > div > div > form > div > div:nth-child(4) > div > div:nth-child(4) > div.utilTextCenter > button'
              );
              await page.waitForSelector(
                'body > div > div > div > div > div > form > div.buttonContainer.utilTextCenter > div:nth-child(1) > button'
              );
              await page.click(
                'body > div > div > div > div > div > form > div.buttonContainer.utilTextCenter > div:nth-child(1) > button'
              );
              var text = `We have just sent you an email with a link to verify your email address so we can send your iRCheck refund. Please open it and follow the instructions [email: ${email}]`;

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/nitto', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-08-30');

      today.setDate(today.getDate() - getRandomInt(0, 12));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];

      var stateAbbr = data['stateAbbr'];
      var subprice = 166;
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      address.concat(address2);

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });
              await page.goto('https://at.rebatepromotions.com/#/20-27005');
              monitor(
                '#con-notification > button',
                page,
                async (status, page) => {
                  await page.click('#con-notification > button');
                }
              );

              await page.waitForSelector(
                '.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding'
              );
              await page.click(
                '.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding'
              );
              var example = await page.$x("//input[@id='Invoice Number']");
              await example[0].type(getRandomInt(1000000, 9999999).toString());
              example = await page.$x("//input[@id='Purchase Date']");
              await example[0].type(today);

              await page.waitFor(1000);
              example = await page.$x(`//*[@id="continueOrSubmitBtn"]`);
              await example[0].click();

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(1) > .noBorderTextBox',
                fullName.split(' ').slice(0, -1).join(' ')
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(3) > .noBorderTextBox',
                fullName.split(' ').slice(-1).join(' ')
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(5) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(5) > .noBorderTextBox',
                getRandomInt(1000000000, 9999999999).toString()
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(7) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(1) > .form-group:nth-child(7) > .noBorderTextBox',
                email
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(9) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6 > .form-group:nth-child(9) > .noBorderTextBox',
                email
              );

              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(1) > .noBorderTextBox',
                address
              );
              if (address2 != null) {
                await page.waitForSelector(
                  '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(3) > .noBorderTextBox'
                );
                await page.type(
                  '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(3) > .noBorderTextBox',
                  address2
                );
              }
              await page.waitForSelector(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(5) > .noBorderTextBox'
              );
              await page.type(
                '.demog-page > .row > .col-md-6:nth-child(2) > .form-group:nth-child(5) > .noBorderTextBox',
                zip
              );
              await page.click(
                'body > div.content.container.fluid > div > div.col-md-12.demog.ng-scope > form > div > div:nth-child(2) > div:nth-child(7) > input'
              );
              await page.waitFor(1500);
              example = await page.$x(`//*[@id="continueBtn"]/button`);
              await example[0].click();
              await page.waitForSelector('#enteredAddressBtn');
              await page.click('#enteredAddressBtn');

              await Promise.all([
                page.goto('https://at.rebatepromotions.com/#/review'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
              ]);
              await page.waitFor(1500);
              await page.click('#continueOrSubmitBtn');
              await page.waitForSelector('#confirmation-trackingNumber');
              element = await page.$('#confirmation-trackingNumber');
              const text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              console.log(text);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/rhino', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 3 && credits != null) {
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

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

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

      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();

      var addresses = null;
      if (address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }

      //cash
      var date = today;
      var url = `http://localhost:8000/jegs2?email=${email}&seller=Amazon.com&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);
              var element = await page.$(
                'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr:nth-child(1) > td > span'
              );
              var text = await page.evaluate(
                (element) => element.textContent,
                element
              );

              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });

              await page.goto(
                'https://gobigerewards.com/Claims/SubmitClaim.aspx?ptype=6'
              );

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
                  '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationLine2RadTextBox',
                  address2
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
                '#DefaultContent_ProductInformationControl_AddProductLinkButton'
              );
              await page.waitFor(1250);
              const inputFile = await page.$(
                '#ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadfile0'
              );
              await inputFile.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(2250);

              await page.click('#DefaultContent_GoToConfirmLinkButton');
              await page.waitFor(2500);
              await page.waitForSelector(
                '#DefaultContent_GoToSubmitLinkButton'
              );
              await page.click('#DefaultContent_GoToSubmitLinkButton');

              await page.waitFor(4500);
              await page.waitForSelector(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              element = await page.$(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              text = await page.evaluate(
                (element) => element.textContent,
                element
              );
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/samsung', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);

  if (isAddressValid) {
    if (credits > 14 && credits != null) {
      var today = new Date('2020-07-09');

      today.setDate(today.getDate() + getRandomInt(0, 47));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);

      var data = req.body;

      var types = ['jpeg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 6079.56;
      var itemName =
        'ESAB Rebel EMP 235ic Multi-Process Dual-Voltage MIG, Stick, Tig Welder';
      var seller = 'Eastern Welding Supply';
      var quantity = '1';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var url = `http://localhost:8000/wdc?date=${today.toString()}&subprice=${subprice}&email=${email}&quantity=${quantity}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);
      var date = today;
      console.log(JSON.stringify(data));
      var id = uuidv4();
      var base64;
      puppeteer.use(StealthPlugin());
      var phoneNum;
      try {
        (async () => {
          phoneNum =
            getAreaCode().toString() +
            getRandomInt(1000000, 9999999).toString();

          // const browser = await puppeteer.launch({headless:false});
          puppeteer
            .launch({
              browserWSEndpoint:
                'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
            })
            .then(async (browser) => {
              (async () => {
                const page = await browser.newPage();
                await page.authenticate({
                  username: 'lff4fyij',
                  password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
                });
                await page.goto(url);
                await page.screenshot({
                  path: `${__dirname}/images/${id}.${ext}`,
                  fullPage: true,
                });

                await page.goto(
                  'https://www.samsung.com/us/shop/promotions/summer-home-appliance-package-promotion/'
                );
                await page.waitForSelector(
                  '.sg-g-promotions-promo-cards > .sg-g-promotions-promo-cards__card > .sg-g-promotions-promo-cards__card-info > .sg-g-promotions-promo-cards__card-ctas > .cta-button'
                );
                await page.click(
                  '.sg-g-promotions-promo-cards > .sg-g-promotions-promo-cards__card > .sg-g-promotions-promo-cards__card-info > .sg-g-promotions-promo-cards__card-ctas > .cta-button'
                );
                await page.waitForSelector(
                  '#ae-main-content > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div > div > section.sg-g-promotions-faq.section.aem-GridColumn.aem-GridColumn--default--12 > div > div:nth-child(1) > div > div.sg-g-promotions-promo-cards__iframe > div > span'
                );
                var frame;
                for (const nestedFrame of page.mainFrame().childFrames()) {
                  const tweetList = await nestedFrame.$('#PurchaseQuestion', {
                    timeout: 1000,
                  });
                  if (tweetList) {
                    frame = nestedFrame;
                  }
                }
                await frame.select(
                  '#PurchaseQuestion',
                  'Warehouse Discount Center'
                );
                await frame.click('#DateOfPurchase');
                await page.waitFor(1500);
                await page.keyboard.type(today);
                await page.keyboard.type('ENTER');
                await page.waitFor(750);

                var text = 'You must enter a purchase date.';

                await page.waitFor(1260);
                await frame.click(
                  '#enter > main > section > div.view-content.grid-container > div.main-header > h1'
                );
                await frame.type('#Email_Identifier', email);
                await frame.click('#emailForm > fieldset:nth-child(4) > input');
                var done;
                await page.waitFor(2000);
                try {
                  while (text == 'You must enter a purchase date.') {
                    try {
                      await page.waitForSelector(
                        '#retailer-question2 > span > span',
                        {
                          timeout: 1000,
                        }
                      );

                      var element = await page.$(
                        '#retailer-question2 > span > span'
                      );
                      if (element == null) {
                        text = null;
                      }
                      text = await page.evaluate(
                        (element) => element.textContent,
                        element
                      );

                      console.log(text);
                    } catch (err) {
                      text = null;
                    }

                    await frame.click('#DateOfPurchase');
                    await page.waitFor(1500);
                    await page.keyboard.type(today);
                    await page.keyboard.type('ENTER');
                    done = true;

                    await page.waitFor(1250);
                    await frame.click(
                      '#emailForm > fieldset:nth-child(4) > input'
                    );

                    try {
                      await page.waitForSelector(
                        '#retailer-question2 > span > span',
                        {
                          timeout: 2500,
                        }
                      );

                      var element = await page.$(
                        '#retailer-question2 > span > span'
                      );
                      text = await page.evaluate(
                        (element) => element.textContent,
                        element
                      );
                      console.log(text);
                    } catch (err) {
                      await page.keyboard.type('ENTER');
                      await frame.click(
                        '#emailForm > fieldset:nth-child(4) > input'
                      );

                      text = null;
                    }
                  }
                } catch (err) {}
                try {
                  if (done == true) {
                    await page.keyboard.type('ENTER');
                    await page.waitFor(750);
                    await frame.click(
                      '#emailForm > fieldset:nth-child(4) > input'
                    );
                    await page.waitFor(1800);
                  }
                } catch (err) {}

                await frame.waitForSelector('#User_FirstName');
                await frame.type(
                  '#User_FirstName',
                  fullName.split(' ').slice(0, -1).join(' ')
                );
                await frame.type(
                  '#User_LastName',
                  fullName.split(' ').slice(-1).join(' ')
                );
                await frame.type('#User_Address_Address1', address);
                if (address2 != null) {
                  await frame.type('#User_Address_Address2', address2);
                }
                await frame.type('#User_Address_City', city);
                await frame.select('#state', stateAbbr.toUpperCase());
                await frame.type('#User_Address_PostalCode', zip);
                await frame.type('#User_Phone', phoneNum);
                var example;
                await frame.evaluate(() => {
                  example = document.querySelector(
                    '#User_AgreeToRules_label > a:nth-child(1)'
                  );

                  example.parentNode.removeChild(example);
                });
                await frame.evaluate(() => {
                  example = document.querySelector(
                    '#User_AgreeToRules_label > a'
                  );

                  example.parentNode.removeChild(example);
                });
                await frame.click('#User_AgreeToRules_label');

                const imageurl = await frame.$eval(
                  '#captcha_images > div > img',
                  (img) => img.getAttribute('src')
                );
                var image = await axios.get(imageurl, {
                  responseType: 'arraybuffer',
                });
                var returnedB64 = Buffer.from(image.data).toString('base64');
                var options = {
                  image: returnedB64,
                  maxAttempts: 50, // Optional
                };

                var s = await captcha.solve(options);
                console.log(s);
                var solvedCaptcha = s.text;
                await frame.type('#Captcha_Value', solvedCaptcha);
                await frame.click('#registration > fieldset > input');

                await frame.waitForSelector('#Refrigerator > label');
                await frame.click('#Refrigerator > label');
                await page.waitFor(750);

                await frame.click('#OTRMicrowave > label');
                await page.waitFor(750);

                await frame.click('#Dryer > label');
                await page.waitFor(750);

                await frame.click('#Washer > label');
                await page.waitFor(1000);
                await frame.type(
                  '#Appliances_Refrigerator__0__Model',
                  'RH29H9000SR'
                );
                await frame.type('#Appliances_Dryer__0__Model', 'DVE52M8650W');
                await frame.type('#Appliances_Washer__0__Model', 'WV55M9600AW');
                await frame.type(
                  '#Appliances_OTRMicrowave__0__Model',
                  'ME21K7010DS'
                );

                await frame.type(
                  '#Appliances_Refrigerator__0__SerialNumber',
                  `069043AFA00${getRandomInt(100, 999)}Y`
                );
                await frame.type(
                  '#Appliances_Dryer__0__SerialNumber',
                  `0AS05BBJ300${getRandomInt(100, 999)}J`
                );
                await frame.type(
                  '#Appliances_Washer__0__SerialNumber',
                  `05955NAJ800${getRandomInt(100, 999)}F`
                );
                await frame.type(
                  '#Appliances_OTRMicrowave__0__SerialNumber',
                  `0B4H7WOJ800${getRandomInt(100, 999)}J`
                );

                const inputUploadHandle = await frame.$('#Upload_File');

                inputUploadHandle.uploadFile(
                  `${__dirname}/images/${id}.${ext}`
                );
                await frame.click(
                  '#UploadForm > section.bottom-content > fieldset > input'
                );
                await frame.waitForSelector(
                  '#ConfirmUpload > main > section > div > div:nth-child(4) > div.cell.small-12.medium-8.large-6 > div.submitBtnBox > form > fieldset:nth-child(2) > input'
                );
                await frame.click(
                  '#ConfirmUpload > main > section > div > div:nth-child(4) > div.cell.small-12.medium-8.large-6 > div.submitBtnBox > form > fieldset:nth-child(2) > input'
                );
                await frame.waitForSelector(
                  '#Uploaded > main > section > div > div.grid-x.align-center > div.cell.small-12.medium-8.large-6 > div > h2'
                );

                base64 = await page.screenshot({
                  encoding: 'base64',
                  fullPage: true,
                });
                base64 = await watermark(base64);
                var options = {
                  method: 'POST',
                  url: 'https://api.imgur.com/3/image',
                  headers: {
                    Authorization: 'Client-ID 85d1b80290d4578',
                  },
                  formData: {
                    type: 'base64',
                    image: base64,
                  },
                };
                const postImgur = await request.post(options);

                console.log(JSON.parse(postImgur)['data']['link']);

                for (var ls = 0; ls < 15; ls++) {
                  await removeCredit(req.body.key);
                }
                response.image = JSON.parse(postImgur)['data']['link'];
                response.info = `NA`;
                response.message = 'success';
                res.send(JSON.stringify(response));
                await browser.close();
              })();
            });
        })();
      } catch (e) {
        console.error(e);
      } finally {
      }
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }
      response.message = 'error';
      response.image = null;
      response.info =
        'Ensure that address hasnt been entered twice for this rebate or for use a new email for samsung or try again later - Credits have not been deducted';
      res.send(JSON.stringify(response));
      console.log('We do cleanup here');
      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/andy', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 0 && credits != null) {
      var today = new Date('2020-09-12');
      // today.setDate(today.getDate() + getRandomInt(0,31));
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

      //   var data = {
      //     "email": "asdsda@gmail.com",
      //   "item": "s",
      //   "date": "ss s",
      //   "subprice": 2222,
      //   "quantity": "2",
      //   "seller": "ss",
      //   "itemname": "ssssss",
      //   "image": "true",
      //   "fullName": "ss ss",
      //   "address": "2121 armstrong dr",
      //   "stateAbbr": "CA",
      //   "city": "Pleasanton",
      //   "zip": "94588"
      // };
      var data = req.body;

      var types = ['jpeg', 'jpeg', 'png'];
      const ext = types[getRandomInt(0, 2)];
      var id = uuidv4();
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
      var url = `http://localhost:8000/dicks?email=${email}&seller=Amazon.com&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);
      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              var phoneNum =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              await page.goto(url);

              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto(
                'http://promosubmissions.com/R10462W/Home/EntryForm'
              );
              await page.waitForSelector('.form > #entryForm #ship_fname');
              await page.type('.form > #entryForm #ship_fname', firstName);

              await page.waitForSelector('.form > #entryForm #ship_lname');
              await page.type('.form > #entryForm #ship_lname', lastName);

              await page.waitForSelector('.form > #entryForm #ship_address');
              await page.type('.form > #entryForm #ship_address', addresses);
              await page.waitForSelector('.form > #entryForm #ship_city');
              await page.type('.form > #entryForm #ship_city', city);

              await page.select('.form > #entryForm #ship_state', stateAbbr);

              await page.waitForSelector('.form > #entryForm #ship_zip');
              await page.type('.form > #entryForm #ship_zip', zip);

              await page.waitForSelector('.form > #entryForm #email');
              await page.type('.form > #entryForm #email', email);

              await page.select(
                '.form > #entryForm #store',
                'DICKS SPORTING GOODS'
              );
              await page.waitForSelector('#entryForm > #UPCs #upcList_0_');
              await page.type('#entryForm > #UPCs #upcList_0_', '036282353978');
              const inputUploadHandle = await page.$('#image');
              inputUploadHandle.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(2500);
              await page.waitForSelector(
                '.form > #entryForm #typeE > #checkType'
              );
              await page.click('.form > #entryForm #typeE > #checkType');

              await page.waitForSelector('#entryForm #terms');
              await page.click('#entryForm #terms');
              await page.solveRecaptchas();
              await page.waitForSelector('#EntryForm #submit');
              await page.click('#EntryForm #submit');

              await page.waitForSelector('#submit');
              await page.click('#submit');

              var text =
                'Please check your email as you should soon receive a link to verify and confirm your email address';
              await page.waitFor(1500);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
//2000
app.post('/hestan', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);

  if (isAddressValid) {
    if (credits > 29 && credits != null) {
      var today = new Date('2020-02-14');

      today.setDate(today.getDate() + getRandomInt(0, 120));
      var installDate = new Date(today);
      installDate.setDate(installDate.getDate() + getRandomInt(10, 20));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todays = today;
      today = mm + '/' + dd + '/' + yyyy;

      dd = String(installDate.getDate()).padStart(2, '0');
      mm = String(installDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = installDate.getFullYear();
      installDate = mm + '/' + dd + '/' + yyyy;
      var data = req.body;

      var types = ['jpg', 'jpg', 'png'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];

      var subprice = 2029.99;
      var quantity = 1;
      var itemname =
        'Aquabot Breeze XLS In-Ground Auto Robotic Swimming Pool Vacuum Cleaner (2 Pack)';
      var imageurl =
        'https://i5.walmartimages.com/asr/1d2979e5-9a00-4b0b-a3de-23d90b70fbc5_1.3032043377a10114821abe5adb05b135.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
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
      var url = `http://localhost:8000/wdc2?email=${email}&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var date = today;
      console.log(url);
      console.log(JSON.stringify(data));
      var id = uuidv4();
      var base64;
      puppeteer.use(StealthPlugin());
      var phoneNum;
      try {
        (async () => {
          phoneNum =
            getAreaCode().toString() +
            getRandomInt(1000000, 9999999).toString();
          puppeteer.use(
            RecaptchaPlugin({
              provider: {
                id: '2captcha',
                token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
              },
              visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
            })
          );
          // const browser = await puppeteer.launch({headless:false});
          puppeteer
            .launch({
              headless: true,
              slowMo: 10,
              browserWSEndpoint:
                'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
            })
            .then(async (browser) => {
              (async () => {
                const page = await browser.newPage();
                await page.authenticate({
                  username: 'lff4fyij',
                  password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
                });
                await page.goto(url);
                await page.screenshot({
                  path: `${__dirname}/images/${id}.${ext}`,
                  fullPage: true,
                });
                await page.goto(
                  'https://home.hestan.com/rebate-2020/#cash-rebate-rewards'
                );
                const datas = await page.evaluate(() => {
                  const tds = Array.from(
                    document.querySelectorAll(
                      '#gform_multifile_upload_5_17'
                    )[0]['children']
                  );
                  return tds.map((td) => td.id);
                });
                var uploadDiv = datas[1];

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_1 > #input_5_1 #input_5_1_3'
                );
                await page.type(
                  '#gform_fields_5 > #field_5_1 > #input_5_1 #input_5_1_3',
                  firstName
                );

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_1 > #input_5_1 #input_5_1_6'
                );
                await page.type(
                  '#gform_fields_5 > #field_5_1 > #input_5_1 #input_5_1_6',
                  lastName
                );

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_1'
                );
                await page.type(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_1',
                  addresses
                );

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_3'
                );
                await page.type(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_3',
                  city
                );

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_4'
                );
                await page.type(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_4',
                  abbrState(stateAbbr, 'name')
                );

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_5'
                );
                await page.type(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_5',
                  zip
                );

                await page.waitForSelector(
                  '.gform_body > #gform_fields_5 > #field_5_3 #input_5_3'
                );
                await page.type(
                  '.gform_body > #gform_fields_5 > #field_5_3 #input_5_3',
                  phoneNum
                );

                await page.waitForSelector(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_6'
                );
                await page.select(
                  '#gform_fields_5 > #field_5_2 > #input_5_2 #input_5_2_6',
                  'United States'
                );

                await page.waitForSelector('#input_5_3');

                await page.waitForSelector(
                  '.gform_body > #gform_fields_5 > #field_5_4 #input_5_4'
                );
                await page.type(
                  '.gform_body > #gform_fields_5 > #field_5_4 #input_5_4',
                  email
                );
                await page.waitForSelector('#field_5_27 #choice_5_27_1');
                await page.click('#field_5_27 #choice_5_27_1');

                await page.waitForSelector('#field_5_25 #choice_5_25_2');
                await page.click('#field_5_25 #choice_5_25_2');

                await page.waitForSelector('#field_5_28 #choice_5_28_1');
                await page.click('#field_5_28 #choice_5_28_1');

                await page.waitForSelector('#field_5_31 #choice_5_31_7');
                await page.click('#field_5_31 #choice_5_31_7');
                await page.waitForSelector(
                  '.gform_body > #gform_fields_5 > #field_5_11 #input_5_11'
                );
                await page.type(
                  '.gform_body > #gform_fields_5 > #field_5_11 #input_5_11',
                  today
                );

                await page.waitForSelector(
                  '.gform_body > #gform_fields_5 > #field_5_12 #input_5_12'
                );
                await page.type(
                  '.gform_body > #gform_fields_5 > #field_5_12 #input_5_12',
                  installDate
                );
                await page.waitForSelector(
                  '.gform_body > #gform_fields_5 > #field_5_13 #input_5_13'
                );
                await page.type(
                  '.gform_body > #gform_fields_5 > #field_5_13 #input_5_13',
                  'WDC Kitchen & Bath Agoura Hills'
                );

                await page.waitForSelector(
                  '.gform_body > #gform_fields_5 > #field_5_15 #input_5_15'
                );
                await page.type(
                  '.gform_body > #gform_fields_5 > #field_5_15 #input_5_15',
                  '30621 Canwood St, Agoura Hills, CA 91301'
                );

                const inputUploadHandle = await page.$(
                  '#' + uploadDiv.substr(0, uploadDiv.length - 10)
                );
                inputUploadHandle.uploadFile(
                  `${__dirname}/images/${id}.${ext}`
                );
                await page.solveRecaptchas();
                await page.waitFor(760);

                await page.click(
                  '.wpb_wrapper > #gform_wrapper_5 > #gform_5 #gform_submit_button_5'
                );
                await page.click(
                  '#gform_wrapper_5 > #gform_5 #gform_submit_button_5'
                );

                await page.waitFor(1250);
                await page.waitForSelector('#gform_confirmation_message_5');

                var element = await page.$('#gform_confirmation_message_5');
                const text = await page.evaluate(
                  (element) => element.textContent,
                  element
                );
                console.log(text);

                base64 = await page.screenshot({
                  encoding: 'base64',
                  fullPage: true,
                });
                base64 = await watermark(base64);
                var options = {
                  method: 'POST',
                  url: 'https://api.imgur.com/3/image',
                  headers: {
                    Authorization: 'Client-ID 85d1b80290d4578',
                  },
                  formData: {
                    type: 'base64',
                    image: base64,
                  },
                };
                const postImgur = await request.post(options);

                console.log(JSON.parse(postImgur)['data']['link']);

                for (var ls = 0; ls < 30; ls++) {
                  await removeCredit(req.body.key);
                }
                response.image = JSON.parse(postImgur)['data']['link'];
                response.info = `NA`;
                response.message = 'success';
                res.send(JSON.stringify(response));
                await browser.close();
              })();
            });
        })();
      } catch (e) {
        console.error(e);
      } finally {
      }
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }
      response.message = 'error';
      response.image = null;
      response.info =
        'Ensure that address hasnt been entered twice for this rebate or for use a new email for samsung or try again later - Credits have not been deducted';
      res.send(JSON.stringify(response));
      console.log('We do cleanup here');
      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/huber', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);

  if (isAddressValid) {
    if (credits > 49 && credits != null) {
      var today = new Date();

      today.setDate(today.getDate() - getRandomInt(0, 31));
      var installDate = new Date();
      installDate.setDate(today.getDate() + getRandomInt(10, 20));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todays = today;
      today = mm + '/' + dd + '/' + yyyy;
      var data = req.body;

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

      var subprice = 2029.99;
      var quantity = 1;
      var itemname =
        'Aquabot Breeze XLS In-Ground Auto Robotic Swimming Pool Vacuum Cleaner (2 Pack)';
      var imageurl =
        'https://i5.walmartimages.com/asr/1d2979e5-9a00-4b0b-a3de-23d90b70fbc5_1.3032043377a10114821abe5adb05b135.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
      var firstName = fullName.split(' ').slice(0, -1).join(' ');
      var lastName = fullName.split(' ').slice(-1).join(' ');

      var addresses = null;
      if (address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }

      var jsonArr = [
        { name: 'Sterling Construction Co Inc', taxId: '25-1655321' },
        { name: 'Construction Partners, Inc.', taxId: '26-0758017' },
        { name: 'Granite Construction Inc', taxId: '77-0239383' },
        { name: 'Lennar Arizona Construction, Inc.', taxId: '20-5335712' },
        { name: 'Vertical Construction Corp', taxId: '22-3216488' },
        { name: 'D.r. Horton Cruces Construction, Inc.', taxId: '65-1218942' },
        { name: 'S. Florida Construction, Llc', taxId: '71-0949799' },
        { name: 'S. Florida Construction Iii, Llc', taxId: '72-1567302' },
        { name: 'S. Florida Construction Ii, Llc', taxId: '72-1567303' },
        { name: 'U.s. Home Of Arizona Construction Co.', taxId: '74-2402824' },
        { name: 'Drh Southwest Construction Inc', taxId: '75-2589289' },
        { name: 'Drh Construction Inc', taxId: '75-2633738' },
        { name: 'Drh Tucson Construction Inc', taxId: '75-2709796' },
        {
          name: 'Lennar Homes Of Texas Land & Construction Ltd',
          taxId: '75-2792018',
        },
        { name: 'D.r. Horton Serenity Construction, Llc', taxId: '75-2926876' },
        { name: 'Stack Construction Technologies, Inc.', taxId: '82-3692025' },
        { name: 'Lake Charles Renal Construction Llc', taxId: '84-3460979' },
        { name: 'Meridian Renal Construction Llc', taxId: '84-4644691' },
        { name: 'Columbine Hills Construction Llc', taxId: '85-0701182' },
        { name: 'Anna Construction Lender, Llc', taxId: '85-0759313' },
        { name: 'Chi Construction Co', taxId: '86-0533370' },
        { name: 'Richmond American Construction Inc', taxId: '86-0540418' },
        { name: 'Greystone Construction Inc', taxId: '86-0864245' },
        { name: 'Lennar Construction Inc', taxId: '86-0972186' },
        { name: 'Sha Construction Llc', taxId: '86-1002579' },
        { name: 'Three Phase Line Construction, Inc.', taxId: '02-0486688' },
        { name: 'Cwg Construction Co Llc', taxId: '20-1104737' },
        {
          name: 'China Advanced Construction Materials Group, Inc',
          taxId: '20-8468508',
        },
        { name: 'Toll Brothers Az Construction Co', taxId: '23-2832024' },
        {
          name: 'Mastec Renewables Construction Company, Inc.',
          taxId: '27-2971344',
        },
      ];
      var companyInfo = jsonArr[getRandomInt(0, 29)];
      //cash
      var date = today;
      var url = `http://localhost:8000/lowes?email=${email}&imageurl=${imageurl}&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(JSON.stringify(data));
      var id = uuidv4();
      var base64;
      puppeteer.use(StealthPlugin());
      var phoneNum;
      try {
        (async () => {
          phoneNum =
            getAreaCode().toString() +
            getRandomInt(1000000, 9999999).toString();
          puppeteer.use(
            RecaptchaPlugin({
              provider: {
                id: '2captcha',
                token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
              },
              visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
            })
          );
          // const browser = await puppeteer.launch({headless:false});
          puppeteer
            .launch({
              headless: true,
              slowMo: 10,
              browserWSEndpoint:
                'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
            })
            .then(async (browser) => {
              (async () => {
                const page = await browser.newPage();
                await page.authenticate({
                  username: 'lff4fyij',
                  password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
                });
                await page.goto(url);
                await page.screenshot({
                  path: `${__dirname}/images/${id}.${ext}`,
                  fullPage: true,
                });

                var newPage = await browser.newPage();
                await newPage.goto(
                  'https://www.acbpromotions.com/huberrebate/submit.asp'
                );
                await newPage.waitForSelector(
                  'table > tbody > tr > td:nth-child(1) > .text'
                );
                await newPage.type(
                  'table > tbody > tr > td:nth-child(1) > .text',
                  today
                );

                newPage.on('dialog', async (dialog) => {
                  console.log(dialog.accept());
                });

                await newPage.select(
                  'table > tbody > tr > td:nth-child(4) > .text',
                  'LOWES'
                );
                await newPage.waitFor(1300);
                await newPage.waitForSelector(
                  'table:nth-child(5) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > a:nth-child(1) > img:nth-child(1)'
                );
                await newPage.click(
                  'table:nth-child(5) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > a:nth-child(1) > img:nth-child(1)'
                );

                await newPage.waitForSelector(
                  'table > tbody > tr > td > input:nth-child(34)'
                );
                await newPage.click(
                  'table > tbody > tr > td > input:nth-child(34)'
                );

                await newPage.waitForSelector(
                  'table > tbody > tr > td > input:nth-child(37)'
                );
                await newPage.click(
                  'table > tbody > tr > td > input:nth-child(37)'
                );
                await newPage.waitFor(1250);
                await newPage.waitForSelector(
                  'table:nth-child(7) > tbody > tr > td > .text'
                );
                await newPage.select(
                  'table:nth-child(7) > tbody > tr > td > .text',
                  '108'
                );
                await newPage.waitFor(1750);

                const inputUploadHandle = await newPage.$(
                  'body > center > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > form:nth-child(5) > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > input'
                );
                inputUploadHandle.uploadFile(
                  `${__dirname}/images/${id}.${ext}`
                );
                await newPage.click('#abtnuploadnow');
                await newPage.waitFor(1750);

                await newPage.click('#abtnnext');
                await newPage.waitForSelector(
                  'table > tbody > tr > td > .text:nth-child(3)'
                );
                await newPage.type(
                  'table > tbody > tr > td > .text:nth-child(3)',
                  firstName
                );

                await newPage.waitForSelector(
                  'table:nth-child(1) > tbody > tr > td:nth-child(2) > .text'
                );
                await newPage.type(
                  'table:nth-child(1) > tbody > tr > td:nth-child(2) > .text',
                  lastName
                );

                await newPage.waitForSelector(
                  'table:nth-child(6) > tbody > tr > td > table:nth-child(1) > tbody > tr > td:nth-child(3) > .text'
                );
                await newPage.type(
                  'table:nth-child(6) > tbody > tr > td > table:nth-child(1) > tbody > tr > td:nth-child(3) > .text',
                  companyInfo['name']
                );

                await newPage.waitForSelector(
                  'table > tbody > tr:nth-child(2) > td > .text'
                );
                await newPage.type(
                  'table > tbody > tr:nth-child(2) > td > .text',
                  companyInfo['taxId']
                );

                await newPage.waitForSelector(
                  'table:nth-child(2) > tbody > tr > td:nth-child(1) > .text'
                );
                await newPage.type(
                  'table:nth-child(2) > tbody > tr > td:nth-child(1) > .text',
                  addresses
                );

                await newPage.waitForSelector(
                  'table:nth-child(2) > tbody > tr > td:nth-child(2) > .text'
                );
                await newPage.type(
                  'table:nth-child(2) > tbody > tr > td:nth-child(2) > .text',
                  city
                );

                await newPage.waitForSelector(
                  'table > tbody > tr > td:nth-child(4) > .text'
                );
                await newPage.evaluate((stateAbbr) => {
                  document
                    .querySelectorAll(
                      'table > tbody > tr > td:nth-child(4) > .text option'
                    )
                    .forEach((option) => {
                      if (option.text.includes(stateAbbr)) {
                        document.querySelector(
                          'table > tbody > tr > td:nth-child(4) > .text'
                        ).value = option.value;
                      }
                    });
                }, stateAbbr);

                await newPage.waitForSelector(
                  'table > tbody > tr > td:nth-child(6) > .text'
                );
                await newPage.type(
                  'table > tbody > tr > td:nth-child(6) > .text',
                  zip
                );

                await newPage.waitForSelector(
                  'table:nth-child(3) > tbody > tr > td:nth-child(1) > .text'
                );
                await newPage.type(
                  'table:nth-child(3) > tbody > tr > td:nth-child(1) > .text',
                  phoneNum
                );

                await newPage.waitForSelector(
                  'table:nth-child(3) > tbody > tr > td:nth-child(3) > .text'
                );
                await newPage.type(
                  'table:nth-child(3) > tbody > tr > td:nth-child(3) > .text',
                  email
                );

                await newPage.click('#abtnnext');
                await newPage.waitForSelector('#txtQuantity_3_1');
                await newPage.type('#txtQuantity_3_1', '150');
                await newPage.keyboard.press('Enter');
                await newPage.waitForSelector('#selZipSys716');
                await newPage.select('#selZipSys716', 'Both');

                await newPage.type('#txtQuantity_4_1', '150');
                await newPage.keyboard.press('Enter');
                await newPage.waitForSelector('#selZipSys12');
                await newPage.select('#selZipSys12', 'Both');

                await newPage.type('#txtQuantity_5_1', '250');
                await newPage.keyboard.press('Enter');
                await newPage.waitForSelector('#selZipSys58');
                await newPage.select('#selZipSys58', 'Both');

                await newPage.click('#abtnnext');
                await newPage.waitFor(1200);
                await newPage.waitForSelector('#abtnfinish');
                await newPage.click('#abtnfinish');
                await newPage.waitFor(2500);
                var element = await newPage.$(
                  'body > form > center > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > u > font > b'
                );
                var text = await newPage.evaluate(
                  (element) => element.textContent,
                  element
                );
                text = `Your claim reference # is ${text}`;
                console.log(text);

                var base64 = await newPage.screenshot({
                  encoding: 'base64',
                  fullPage: true,
                });
                base64 = await watermark(base64);
                var options = {
                  method: 'POST',
                  url: 'https://api.imgur.com/3/image',
                  headers: {
                    Authorization: 'Client-ID 85d1b80290d4578',
                  },
                  formData: {
                    type: 'base64',
                    image: base64,
                  },
                };
                const postImgur = await request.post(options);

                console.log(JSON.parse(postImgur)['data']['link']);

                for (var ls = 0; ls < 50; ls++) {
                  await removeCredit(req.body.key);
                }
                response.image = JSON.parse(postImgur)['data']['link'];
                response.info = `NA`;
                response.message = 'success';
                res.send(JSON.stringify(response));
                await browser.close();
              })();
            });
        })();
      } catch (e) {
        console.error(e);
      } finally {
      }
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }
      response.message = 'error';
      response.image = null;
      response.info =
        'Ensure that address hasnt been entered twice for this rebate or for use a new email for samsung or try again later - Credits have not been deducted';
      res.send(JSON.stringify(response));
      console.log('We do cleanup here');
      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

//7
app.post('/hercules', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 1 && credits != null) {
      var data = req.body;
      data.virtual = 'false';
      const date = randomTime(new Date('8-15-2020'), new Date('9-30-2020'));
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();

      today = `${yyyy}-${mm}-${dd}`;
      const photoID = uuidv4();
      data.phone = getAreaCode() + getRandomInt(1000000, 9999999).toString();
      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 177.78;
      var itemName = 'Hercules Terra Trac M/T 265/70R17 121 Q Tire';
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var imageurl =
        'https://i5.walmartimages.com/asr/56c0aca0-5e99-45f6-8fd4-c5e80fa158c9_1.52852ad776742c69ababb5b4a140d04c.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
      var email = data['email'];
      var addresses = null;
      if (address2 != null) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      var url = `http://localhost:8000/walmart?itemname=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&imageurl=${imageurl}`;
      console.log(url);
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.goto(url, {
                waitUntil: 'networkidle0',
              });
              await page.waitForSelector(
                '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > center > b'
              );
              var element = await page.$(
                '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > center > b'
              );
              var value = await page.evaluate((el) => el.textContent, element);
              var invoiceNumber = value.substr(7);
              await page.screenshot({
                path: `images/${photoID}.png`,
                fullPage: true,
              });

              // Visit page + Click next
              await page.goto('https://www.herculestiresrewards.com/new', {
                waitUntil: 'networkidle0',
              });
              await clickNext(0, page);

              // Upload file + Click next
              let fileInput = await page.$('input[type=file]');
              await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
              await page.waitFor(1000);
              await clickNext(1, page);
              await page.waitFor(1000);

              // Purchase Details
              await page.type('input[id=dealer]', 'Walmart');
              await page.waitForSelector('.ta-suggestion');
              await page.click('.ta-suggestion');
              await page.waitFor(1250);
              await page.click('#dateOfPurchase');
              await clickCalendarDay(page, today);
              await page.type('#invoiceNumber', invoiceNumber);

              //Vehicle info + Click nexy
              await page.select('#automotiveMake', 'jeep');
              await page.waitForSelector('#automotiveModel');
              await page.select('#automotiveModel', 'wrangler');
              await page.waitForSelector('#automotiveYear');
              await page.select('#automotiveYear', '2019');
              await page.select('#modelNumber', 'Terra Trac M/T');
              await page.type('#automotiveTireSize', '265/70R17');
              await page.type('#purchasePrice', '177.78');
              await clickNext(2, page);

              // Choose reward + click next
              await page.waitForSelector('.btn-select');
              if (data.virtual == 'true') {
                await page.$$eval('.btn-select', (el) => el[1].click());
              } else {
                await page.$$eval('.btn-select', (el) => el[0].click());
              }
              await page.waitFor(1000);
              await clickNext(3, page);

              // Enter data info + click next
              await page.waitFor(1250);

              await page.waitForSelector('#firstName');
              await page.type('#city', data.city);
              //Zip code is not needed due to autofill
              await page.select('#province', data.stateAbbr);
              await page.type('#firstName', data.fullName.split(' ')[0]);
              await page.type('#lastName', data.fullName.split(' ')[1]);
              await page.type('#personalEmail', data.email);
              await page.type('#verifyEmail', data.email);
              await page.type('#phone', data.phone);
              await page.type('#address1', data.address1);
              await page.waitForSelector('.ta-suggestion');
              await page.click('.ta-suggestion');
              if (address2 != null) {
                await page.type('#address2', data.address2);
              }

              await clickNext(4, page);

              // click next
              await page.waitFor(1000);
              await clickNext(5, page);

              //click next skip survey
              await page.waitFor(1000);
              await clickNext(6, page);

              // Accept agreements
              await page.waitFor(1000);
              await page.waitForSelector("input[name='legalAgreement']");
              await page.click("input[name='legalAgreement']");
              await page.click("input[name='privacyAgreement']");

              // submit
              await page.waitFor(1000);
              await clickNext(7, page);
              await page.waitForSelector(
                '#main > section > div.container > div > div > div.bucket > span > span'
              );
              element = await page.$(
                '#main > section > div.container > div > div > div.bucket > span > span'
              );
              var text = await page.evaluate((el) => el.textContent, element);

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/herculesvir', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 1 && credits != null) {
      var data = req.body;
      data.virtual = 'true';

      const date = randomTime(new Date('8-15-2020'), new Date('9-30-2020'));
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();

      today = `${yyyy}-${mm}-${dd}`;
      console.log(today);
      const photoID = uuidv4();
      data.phone = getAreaCode() + getRandomInt(1000000, 9999999).toString();
      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 177.78;
      var itemName = 'Hercules Terra Trac M/T 265/70R17 121 Q Tire';
      var quantity = '4';
      var city = data['city'];
      var zip = data['zip'];
      var imageurl =
        'https://i5.walmartimages.com/asr/56c0aca0-5e99-45f6-8fd4-c5e80fa158c9_1.52852ad776742c69ababb5b4a140d04c.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff';
      var email = data['email'];
      var addresses = null;
      if (address2 != null) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      var url = `http://localhost:8000/walmart?itemname=${itemName}&date=${date}&subprice=${subprice}&email=${email}&quantity=${quantity}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&imageurl=${imageurl}`;
      console.log(url);
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.goto(url, {
                waitUntil: 'networkidle0',
              });
              await page.waitForSelector(
                '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > center > b'
              );
              var element = await page.$(
                '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > center > b'
              );
              var value = await page.evaluate((el) => el.textContent, element);
              var invoiceNumber = value.substr(7);
              await page.screenshot({
                path: `images/${photoID}.png`,
                fullPage: true,
              });

              // Visit page + Click next
              await page.goto('https://www.herculestiresrewards.com/new', {
                waitUntil: 'networkidle0',
              });
              await clickNext(0, page);

              // Upload file + Click next
              let fileInput = await page.$('input[type=file]');
              await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
              await page.waitFor(1000);
              await clickNext(1, page);
              await page.waitFor(1000);

              // Purchase Details
              await page.type('input[id=dealer]', 'Walmart');
              await page.waitForSelector('.ta-suggestion');
              await page.click('.ta-suggestion');
              await page.waitFor(1250);
              await page.click('#dateOfPurchase');
              await clickCalendarDay(page, today);
              await page.type('#invoiceNumber', invoiceNumber);

              //Vehicle info + Click nexy
              await page.select('#automotiveMake', 'jeep');
              await page.waitForSelector('#automotiveModel');
              await page.select('#automotiveModel', 'wrangler');
              await page.waitForSelector('#automotiveYear');
              await page.select('#automotiveYear', '2019');
              await page.select('#modelNumber', 'Terra Trac M/T');
              await page.type('#automotiveTireSize', '265/70R17');
              await page.type('#purchasePrice', '177.78');
              await clickNext(2, page);

              // Choose reward + click next
              await page.waitForSelector('.btn-select');
              if (data.virtual == 'true') {
                await page.$$eval('.btn-select', (el) => el[1].click());
              } else {
                await page.$$eval('.btn-select', (el) => el[0].click());
              }
              await page.waitFor(1000);
              await clickNext(3, page);

              // Enter data info + click next
              await page.waitFor(1250);

              await page.waitForSelector('#firstName');
              await page.type('#city', data.city);
              //Zip code is not needed due to autofill
              await page.select('#province', data.stateAbbr);
              await page.type('#firstName', data.fullName.split(' ')[0]);
              await page.type('#lastName', data.fullName.split(' ')[1]);
              await page.type('#personalEmail', data.email);
              await page.type('#verifyEmail', data.email);
              await page.type('#phone', data.phone);
              await page.type('#address1', data.address1);
              await page.waitForSelector('.ta-suggestion');
              await page.click('.ta-suggestion');
              if (address2 != null) {
                await page.type('#address2', data.address2);
              }

              await clickNext(4, page);

              // click next
              await page.waitFor(1000);
              await clickNext(5, page);

              //click next skip survey
              await page.waitFor(1000);
              await clickNext(6, page);

              // Accept agreements
              await page.waitFor(1000);
              await page.waitForSelector("input[name='legalAgreement']");
              await page.click("input[name='legalAgreement']");
              await page.click("input[name='privacyAgreement']");

              // submit
              await page.waitFor(1000);
              await clickNext(7, page);
              await page.waitForSelector(
                '#main > section > div.container > div > div > div.bucket > span > span'
              );
              element = await page.$(
                '#main > section > div.container > div > div > div.bucket > span > span'
              );
              var text = await page.evaluate((el) => el.textContent, element);

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});
app.post('/mickey', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 2 && credits != null) {
      var data = req.body;

      const products = [
        {
          itemName: 'BAJA ATZP3',
          brand: 'MICKEY THOMPSON',
          carDealer: 'KIA',
          carModel: 'SORENTO',
          caryear: '2020',
          retailer: 'DISCOUNT TIRE - 5051 LINCOLN AVE, CYPRESS CA 90630-2978',
          price: '264.99',
          quantity: '4',
          size: '225/75R16',
          itemNumber: '32515',
        },
      ];

      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              const product =
                products[Math.floor(Math.random() * products.length)];
              const date = randomTime(
                new Date('09/1/2020'),
                new Date('10/15/2020')
              );

              const photoID = uuidv4();
              data.phone =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();

              var addresses = null;
              if (data.address2 != null) {
                addresses = `${data.address1} ${data.address2}`;
              } else {
                addresses = `${data.address1}`;
              }

              await page.goto(
                `http://localhost:8000/discounttirefullcustom?email=${
                  data.email
                }&date=${date}&subprice=${product.price}&itemNum=${
                  product.itemNumber
                }&size=${product.size}&quantity=${product.quantity}&company=${
                  product.brand
                }&vehicle=${product.caryear} ${product.carDealer}&vehicleInfo=${
                  product.carDealer
                } ${product.carModel} ${product.caryear}&itemName=${
                  product.itemName
                }&fullName=${data.fullName}&address=${addresses.replace(
                  '#',
                  '%23'
                )}&stateAbbr=${data.stateAbbr}&city=${data.city}&zip=${
                  data.zip
                }`,
                {
                  waitUntil: 'networkidle0',
                }
              );
              await page.screenshot({
                path: `images/${photoID}.png`,
                fullPage: true,
              });
              log(
                chalk.whiteBright.bgBlue('Receipt:') +
                  ' ' +
                  `${__dirname}/images/${photoID}.png`
              );

              // Visit page + Click next
              log(chalk.black.bgGreen('Visiting Page'));
              await page.goto('https://www.mickeythompsonrewards.com/#/home', {
                waitUntil: 'networkidle0',
              });
              log(chalk.black.bgGreen('Entering Date'));
              await page.type('#home-purchaseDateOnlyText', date);
              await page.click('#home-offercode-purchasedate-continue');
              page.waitForNavigation({
                waitUntil: 'networkidle0',
              });

              // Continue
              await page.waitForSelector('#continueOrSubmitBtn');
              await removeBellIcon(page);
              await page.click('#continueOrSubmitBtn');

              // Upload file + continue
              log(chalk.black.bgGreen('Uploading Receipt'));
              await page.waitForSelector('input[type=file]');
              let fileInput = await page.$('input[type=file]');
              await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
              await page.waitFor(1250);
              await page.click('a.btn.cont');

              //Fill info
              log(chalk.black.bgGreen('Entering Profile Info'));
              await page.waitForSelector("input[name='firstName']");
              await page.type(
                "input[name='firstName']",
                data.fullName.split(' ')[0]
              );
              await page.type(
                "input[name='lastName']",
                data.fullName.split(' ')[1]
              );
              await page.type("input[name='email']", data.email);
              await page.type("input[name='confirmEmail']", data.email);
              await page.type(
                "input[name='phoneNumber']",
                data.phone.toString()
              );
              await page.type("input[name='address1']", data.address1);
              if (data.address2 != null) {
                await page.type("input[name='address2']", data.address2);
              }
              await page.type("input[name='city']", data.city);
              await page.type("input[name='postalCode']", data.zip);
              await page.waitFor(1000);
              await page.click("select[name='country']");
              await page.waitFor(1000);
              await page.click("button[ng-if='verifyAddress']");
              await page.waitFor(1000);

              try {
                await newPage.click('#recommendedAddressBtn');
              } catch (err) {
                await newPage.click('#enteredAddressBtn');
              }

              //Skip survey
              log(chalk.black.bgGreen('Skipping Survey'));
              await page.waitFor(1000);
              await page.waitForSelector('#survey-continueBtn');
              await page.click('#survey-continueBtn');

              //submit
              log(chalk.black.bgGreen('Submitting'));
              await page.waitFor(1000);
              await page.waitForSelector('#continueOrSubmitBtn');
              await page.click('#continueOrSubmitBtn');
              await page.waitForSelector('#confirmation-trackingNumber');
              element = await page.$('#confirmation-trackingNumber');
              var text = await page.evaluate((el) => el.textContent, element);
              text = `Tracking: ${text}`;

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

//500
app.post('/raymarine', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 14 && credits != null) {
      var data = req.body;
      var today = new Date();
      today.setDate(today.getDate() - getRandomInt(0, 7));
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

      var subprice = 3299.99;
      var quantity = 1;
      var itemname = 'Raymarine Pilot Ev-200 with P70 Type 1 Linear';
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
      var url = `http://localhost:8000/?email=${email}&seller=PrimeMarineTackle&Gun&date=${date}&subprice=${subprice}&quantity=${quantity}&itemname=${itemname}&fullName=${fullName}&address=${addresses}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      console.log(url);

      console.log(JSON.stringify(data));

      var id = uuidv4();
      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              await page.goto(url);
              await page.waitForSelector('body > center:nth-child(5) > b');
              var element = await page.$('body > center:nth-child(5) > b');
              let value = await page.evaluate((el) => el.textContent, element);
              var confNum = value.substr(25);
              console.log(confNum);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });
              await page.goto(
                'https://raymarine.acbrewards.com/Claims/SubmitClaim.aspx'
              );
              await page.type(
                '#ctl00_DefaultContent_FindPromoControl_PurchaseDateRadDatePicker_dateInput',
                today
              );
              await page.click(
                '#DefaultContent_FindPromoControl_FindPromoUpdatePanel > #DefaultContent_FindPromoControl_PromotionCodePanel > #FindPromoForm #DefaultContent_FindPromoControl_FindPromotionLinkButton'
              );
              await page.waitFor(2000);
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
                  '.col-sm-6 #ctl00_DefaultContent_ContactInfoControl_LocationLine2RadTextBox',
                  address2
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
                '.clearfix > #DefaultContent_DealershipUpdatePanel > #ctl00_DefaultContent_DealershipRadComboBox #ctl00_DefaultContent_DealershipRadComboBox_Input'
              );
              await page.waitFor(750);
              await page.click(
                '.clearfix > #DefaultContent_DealershipUpdatePanel > #ctl00_DefaultContent_DealershipRadComboBox #ctl00_DefaultContent_DealershipRadComboBox_Input'
              );
              // await page.keyboard.type('Amazon');

              await page.waitFor(750);
              // await page.keyboard.press("Enter")
              await page.waitForSelector(
                '#ctl00_DefaultContent_DealershipRadComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li:nth-child(7)'
              );
              await page.click(
                '#ctl00_DefaultContent_DealershipRadComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li:nth-child(7)'
              );

              await page.waitFor(750);

              await page.waitForSelector(
                'div > #DefaultContent_ProductInformationControl_SelectedProductUpdatePanel > #ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox #ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input'
              );
              await page.click(
                'div > #DefaultContent_ProductInformationControl_SelectedProductUpdatePanel > #ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox #ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_Input'
              );
              await page.keyboard.type('T70158');

              await page.waitFor(750);

              await page.click(
                '#ctl00_DefaultContent_ProductInformationControl_SelectedProductRadComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li > table > tbody > tr > td'
              );
              await page.waitFor(750);
              await page.waitForSelector(
                '#ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox'
              );

              await page.type(
                '#ctl00_DefaultContent_ProductInformationControl_ProductQuantityRadNumericTextBox',
                '1'
              );

              await page.waitForSelector(
                '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceNumberRadTextBox'
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceNumberRadTextBox',
                confNum
              );

              await page.waitForSelector(
                '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_UPCRadTextBox'
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_UPCRadTextBox',
                '723193774328'
              );
              await page.waitForSelector(
                '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceCostRadTextBox'
              );
              await page.type(
                '.col-sm-6 #ctl00_DefaultContent_ProductInformationControl_ProductInvoiceCostRadTextBox',
                subprice.toString()
              );

              await page.waitForSelector(
                '.formField #DefaultContent_ProductInformationControl_AddProductLinkButton'
              );
              await page.click(
                '.formField #DefaultContent_ProductInformationControl_AddProductLinkButton'
              );

              await page.waitFor(1250);
              const inputFile = await page.$(
                '#ctl00_DefaultContent_FileUploadControl_FileUploadRadAsyncUploadfile0'
              );
              await inputFile.uploadFile(`${__dirname}/images/${id}.${ext}`);
              await page.waitFor(2250);
              await page.waitForSelector(
                '#DefaultContent_ClaimInfoUpdatePanel > #DefaultContent_ClaimInfoPanel #DefaultContent_GoToConfirmLinkButton'
              );
              await page.click(
                '#DefaultContent_ClaimInfoUpdatePanel > #DefaultContent_ClaimInfoPanel #DefaultContent_GoToConfirmLinkButton'
              );
              await page.waitForSelector(
                '#DefaultContent_GoToSubmitLinkButton'
              );
              await page.click('#DefaultContent_GoToSubmitLinkButton');
              //
              // await page.solveRecaptchas()
              await page.waitFor(5000);
              await page.waitForSelector(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              element = await page.$(
                '#DefaultContent_ClaimSummary_ClaimIDValueLabel'
              );
              var text = await page.evaluate((el) => el.textContent, element);

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);

              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

//100
app.post('/tireseasy', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits > 2 && credits != null) {
      var data = req.body;

      const products = [
        {
          itemName: 'GRABBER AT2',
          carDealer: 'MAZDA',
          brand: 'GENERAL',
          carModel: 'BT-50',
          caryear: '2020',
          retailer: 'DISCOUNT TIRE - 5051 LINCOLN AVE, CYPRESS CA 90630-2978',
          price: '144.0',
          quantity: '4',
          size: '255/70R16',
          itemNumber: '09197',
        },
      ];
      puppeteer.use(StealthPlugin());

      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          headless: true,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
              await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              });

              const product =
                products[Math.floor(Math.random() * products.length)];
              const date = randomTime(
                new Date('09/1/2020'),
                new Date('10/31/20')
              );
              const photoID = uuidv4();
              data.phone =
                getAreaCode() + getRandomInt(1000000, 9999999).toString();
              var passDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              });
              var invoice = new Date().getTime().toString().substring(0, 8);
              var receiptURL = `http://localhost:8000/tirekingdom?email=${data.email}&date=${passDate}&price=${product.price}&quantity=${product.quantity}&company=${product.brand}&vehicleInfo=${product.carDealer} ${product.carModel} ${product.caryear}&itemName=${product.itemName}&fullName=${data.fullName}&address=${data.address}&stateAbbr=${data.stateAbbr}&city=${data.city}&zip=${data.zip}&phone=${data.phone}`;

              await page.goto(receiptURL, {
                waitUntil: 'networkidle0',
              });
              await page.screenshot({
                path: `images/${photoID}.png`,
                fullPage: true,
              });

              // Visit page + Click next
              await page.goto('https://www.generaltire-rebates.com//#/home', {
                waitUntil: 'networkidle0',
              });
              await page.type('#home-purchaseDateOnlyText', date);

              await page.click('#home-offercode-purchasedate-continue');
              page.waitForNavigation({
                waitUntil: 'networkidle0',
              });

              // Continue
              await page.waitForSelector('#continueOrSubmitBtn');
              await removeBellIcon(page);
              await page.click('#continueOrSubmitBtn');

              //Select product + conintue
              await page.waitForSelector("div[aria-label='GRABBER AT2']");
              await page.click("div[aria-label='GRABBER AT2']");
              await page.click('#productInfo-continueBtn');

              // Upload file + continue
              await page.waitForSelector('input[type=file]');
              let fileInput = await page.$('input[type=file]');
              await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
              await page.waitFor(1250);
              await page.click('a.btn.cont');

              //Fill info
              await page.waitForSelector("input[name='firstName']");
              await page.type(
                "input[name='firstName']",
                data.fullName.split(' ')[0]
              );
              await page.type(
                "input[name='lastName']",
                data.fullName.split(' ')[1]
              );
              await page.type("input[name='email']", data.email);
              await page.type("input[name='confirmEmail']", data.email);
              await page.type("input[name='phoneNumber']", data.phone);
              await page.type("input[name='address1']", data.address1);
              if (data.address2 != null) {
                await page.type("input[name='address2']", data.address2);
              }
              await page.type("input[name='city']", data.city);
              await page.type("input[name='postalCode']", data.zip);
              await page.waitFor(1000);
              await page.click("select[name='country']");
              await page.waitFor(1000);
              await page.click("button[ng-if='verifyAddress']");
              await page.waitFor(1000);
              try {
                await page.click('#recommendedAddressBtn');
              } catch (err) {
                await page.click('#enteredAddressBtn');
              }

              //Skip survey
              log(chalk.black.bgGreen('Skipping Survey'));
              await page.waitFor(1000);
              await page.waitForSelector('#survey-continueBtn');
              await page.click('#survey-continueBtn');

              //submit
              log(chalk.black.bgGreen('Submitting'));
              await page.waitFor(1000);
              await page.waitForSelector('#continueOrSubmitBtn');
              await page.click('#continueOrSubmitBtn');
              await page.waitForSelector('#confirmation-trackingNumber');
              element = await page.$('#confirmation-trackingNumber');
              var text = await page.evaluate((el) => el.textContent, element);
              text = `Tracking: ${text}`;

              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Tracking: ${text}`;
              response.message = 'success';
              res.send(JSON.stringify(response));
            } catch (e) {
              console.error(e);
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
});

// CARTIER WAS HERE
app.post('/fabfours', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 5,
    itemName:
      'Fab Fours GR3800-1 Grumper Front Winch Bumper; 2 Stage Black Powder Coated',
    imageUrl:
      'https://i5.walmartimages.com/asr/a663673f-47a0-4509-9d0f-8a1338e656a4_1.e7a1908797b36eb7b9529e1d48093ec5.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
    price: 2977.73,
    quantity: 1,
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('10/1/2020'), new Date('10/31/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var receiptURL = `http://localhost:8000/walmart?email=${email}&imageurl=${rebateInfo.imageUrl}&date=${date}&subprice=${rebateInfo.price}&quantity=${rebateInfo.quantity}&itemname=${rebateInfo.itemName}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var photoID = uuidv4();

      puppeteer
        .launch({
          headless: true,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto('https://fabfours.com/oct-rebate/', {
              waitUntil: 'networkidle0',
            });

            //Fill Info
            await newPage.type('#nf-field-348', fullName.split(' ')[0]);
            await newPage.type('#nf-field-349', fullName.split(' ')[1]);
            await newPage.type('#nf-field-350', address);
            await newPage.type('#nf-field-351', address2);
            await newPage.type('#nf-field-352', city);
            await newPage.select('#nf-field-353', stateAbbr);
            await newPage.type('#nf-field-354', zip);
            await newPage.type('#nf-field-356', phone);
            await newPage.type('#nf-field-357', email);

            //Upload Image
            let fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`./images/${photoID}.png`);
            await newPage.waitFor(2000);

            //Submit
            await newPage.click('#nf-field-358');
            await newPage.waitForNavigation({ waitUntil: 'networkidle0' });

            //Send Reponse
            var finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            finalImage = await watermark(finalImage);
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });

            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await browser.close();
          } catch (e) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credits Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.post('/rccsecure', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 1,
    itemName: 'Prevagen Regular Strength Memory Improvement Capsules, 30 Ct',
    imageUrl:
      'https://i5.walmartimages.com/asr/036e9eed-3374-46fa-b105-9e38c4f56395_1.e8136ffa5a7a7529bf6133080685e494.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
    retailor: 'Walmart',
    price: 69.99,
    quantity: 2,
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/1/2020'), new Date('7/1/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var receiptURL = `http://localhost:8000/walmart?email=${email}&imageurl=${rebateInfo.imageUrl}&date=${date}&subprice=${rebateInfo.price}&quantity=${rebateInfo.quantity}&itemname=${rebateInfo.itemName}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var photoID = uuidv4();
      console.log(date);
      // Captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto(
              'https://kccsecure.com/quincybiosciencesettlement/Claimant',
              {
                waitUntil: 'networkidle0',
              }
            );
            await newPage.click('input[value=Unknown]');
            await newPage.click('.btn.btn-primary');

            // Fill Info
            await newPage.waitForSelector('#FirstName');
            await newPage.type('#FirstName', fullName.split(' ')[0]);
            await newPage.type('#LastName', fullName.split(' ')[1]);
            await newPage.type('#Addr_Addr1', address);
            await newPage.type('#Addr_Addr2', address2);
            await newPage.type('#Addr_City', city);
            await newPage.select('#Addr_St', stateAbbr);
            await newPage.type('#Addr_Zip', zip);
            await newPage.type('#Email', email);
            await newPage.type('#PhoneHome', phone);

            // Fill Product Info
            await newPage.click('#PurchaseHistories_0__PurchasedOrNot');
            await newPage.waitForSelector('#PurchaseHistories_0__Count');
            await newPage.type(
              '#PurchaseHistories_0__Count',
              rebateInfo.quantity.toString()
            );
            await newPage.type('#PurchaseHistories_0__Date', date.toString());
            await newPage.type(
              '#PurchaseHistories_0__Location',
              rebateInfo.retailor
            );

            //Upload Image
            await newPage.click('#DocUpload');
            let fileInput = await newPage.$('input[type=file]');
            await newPage.waitFor(1000);
            await fileInput.uploadFile(`./images/${photoID}.png`);

            //Final
            await newPage.solveRecaptchas();
            await newPage.click('#IAgree');
            await newPage.click('#submit-button');
            await page.waitFor(4000);

            //Send Response
            var finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            finalImage = await watermark(finalImage);
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await browser.close();
          } catch (e) {
            console.log('Error Found Sending Response');
            browser.close();
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credits Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.post('/lpcorp', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 125,
    products: [
      {
        name: 'LP WeatherLogic',
        price: `${getRandomInt(36, 40)}`,
        qty: '200',
        img:
          'https://lpcorp.com/media/8151/lp-weatherlogic-board-design-v092020.png',
        company: 'LP',
        sku: '41499',
      },
      {
        name: 'LP Legacy Sub-Flooring',
        price: `${getRandomInt(33, 35)}`,
        qty: '200',
        img:
          'https://images.homedepot-static.com/productImages/b321aa25-6b35-410e-93d5-b983b5a23faa/svn/legacy-oriented-strand-board-osb-41499-64_1000.jpg',
        company: 'LP',
        sku: '41599',
      },
    ],
  };

  const companyInfo = [
    { name: 'Sterling Construction Co Inc', taxId: '25-1655321' },
    { name: 'Construction Partners, Inc.', taxId: '26-0758017' },
    { name: 'Granite Construction Inc', taxId: '77-0239383' },
    { name: 'Lennar Arizona Construction, Inc.', taxId: '20-5335712' },
    { name: 'Vertical Construction Corp', taxId: '22-3216488' },
    { name: 'D.r. Horton Cruces Construction, Inc.', taxId: '65-1218942' },
    { name: 'S. Florida Construction, Llc', taxId: '71-0949799' },
    { name: 'S. Florida Construction Iii, Llc', taxId: '72-1567302' },
    { name: 'S. Florida Construction Ii, Llc', taxId: '72-1567303' },
    { name: 'U.s. Home Of Arizona Construction Co.', taxId: '74-2402824' },
    { name: 'Drh Southwest Construction Inc', taxId: '75-2589289' },
    { name: 'Drh Construction Inc', taxId: '75-2633738' },
    { name: 'Drh Tucson Construction Inc', taxId: '75-2709796' },
    {
      name: 'Lennar Homes Of Texas Land & Construction Ltd',
      taxId: '75-2792018',
    },
    { name: 'D.r. Horton Serenity Construction, Llc', taxId: '75-2926876' },
    { name: 'Stack Construction Technologies, Inc.', taxId: '82-3692025' },
    { name: 'Lake Charles Renal Construction Llc', taxId: '84-3460979' },
    { name: 'Meridian Renal Construction Llc', taxId: '84-4644691' },
    { name: 'Columbine Hills Construction Llc', taxId: '85-0701182' },
    { name: 'Anna Construction Lender, Llc', taxId: '85-0759313' },
    { name: 'Chi Construction Co', taxId: '86-0533370' },
    { name: 'Richmond American Construction Inc', taxId: '86-0540418' },
    { name: 'Greystone Construction Inc', taxId: '86-0864245' },
    { name: 'Lennar Construction Inc', taxId: '86-0972186' },
    { name: 'Sha Construction Llc', taxId: '86-1002579' },
    { name: 'Three Phase Line Construction, Inc.', taxId: '02-0486688' },
    { name: 'Cwg Construction Co Llc', taxId: '20-1104737' },
    {
      name: 'China Advanced Construction Materials Group, Inc',
      taxId: '20-8468508',
    },
    { name: 'Toll Brothers Az Construction Co', taxId: '23-2832024' },
    {
      name: 'Mastec Renewables Construction Company, Inc.',
      taxId: '27-2971344',
    },
  ];

  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',
  });
  var newPage = await browser.newPage();
  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/31/2020'), new Date('11/1/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var receiptChoices = ['Parkers', 'Parr', 'Sutherlands'];
      var chosen = receiptChoices[getRandomInt(0, 2)];
      var receiptURL = `http://localhost:8000/${chosen.toLowerCase()}?fullName=${fullName}&address=${address}&address2=${address2}&email=${email}&phone=${phone}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&date=${date}&invoiceNum=${new Date()
        .getTime()
        .toString()
        .substring(0, 8)}&items=${encodeURIComponent(
        JSON.stringify(rebateInfo.products)
      )}`;
      var photoID = uuidv4();

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });

        await page._client.send('Emulation.clearDeviceMetricsOverride');
        await page.waitFor(1000);
        await page.screenshot({
          path: `images/${photoID}.jpg`,
          fullPage: true,
        });

        // TODO: Start Script
        await newPage.bringToFront();
        await newPage.goto(
          'https://lpcorp.com/weatherlogic-legacy-ftu-rebate-combo',
          {
            waitUntil: 'networkidle0',
          }
        );

        let frame = await newPage
          .frames()
          .find(
            (frame) =>
              frame.url() ===
              'https://services.cognitoforms.com/f/jRDENNtCQ0-j7LpH6hmweg?id=6'
          );

        //Fill info
        await frame.waitForSelector('#c-0-19');
        await frame.type(
          '#c-0-19',
          companyInfo[Math.floor(Math.random() * companyInfo.length)].name
        );
        await frame.type('#c-1-18', address);
        await frame.type('#c-2-18', city);
        await frame.select('#c-4-17', stateAbbr.toUpperCase().trim());
        await frame.click('#c-4-17');
        await frame.evaluate((zip) => {
          console.log(document.querySelectorAll('input'));
          document.querySelectorAll('input')[4].value = zip;
          document.querySelectorAll('input')[4].click();
        }, zip);
        await frame.type('#c-6-15', fullName);
        await frame.evaluate((phone) => {
          document.getElementById('c-7-14').value = phone;
        }, phone);
        await frame.click('#c-7-14');
        await frame.type('#c-8-13', email);
        await frame.type('#c-13-8', chosen);
        await frame.type(
          '#c-9-12',
          companyInfo[
            Math.floor(Math.random() * companyInfo.length)
          ].taxId.replace('-', '')
        );
        await frame.type('#c-10-11', date);
        await frame.type('#c-12-9', '3');

        //Fill Quantity
        await frame.type('#c-14-7', '200');
        await frame.type('#c-16-5', '200');

        //Upload Image
        let fileInput = await frame.$('input[type=file]');
        await fileInput.uploadFile(`./images/${photoID}.jpg`);
        await newPage.waitFor(1000);

        // Submit
        await frame.click('#c-submit-button');
        await newPage.waitFor(5000);

        //Send Reponse
        let finalImage = await newPage.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: 'No addition info',
          image: imgurPost.data.data.link,
        });

        for (let index = 0; index < rebateInfo.rebatePrice; index++) {
          await removeCredit(req.body.key);
        }

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.post('/sharpmicrowavelitigation', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 10,
    itemName: 'Sharp 1.2-cu ft Microwave Drawer (Stainless Steel) (30-in)',
    imageUrl:
      'http://mobileimages.lowes.com/product/converted/074000/074000619579.jpg?size=mthb',
    model: 'SMD3070ASY',
    price: 1445.99,
    quantity: 1,
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/1/2009'), new Date('8/5/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var receiptURL = `http://localhost:8000/lowes?email=${email}&imageurl=${rebateInfo.imageUrl}&date=${date}&subprice=${rebateInfo.price}&quantity=${rebateInfo.quantity}&itemname=${rebateInfo.itemName}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}`;
      var photoID = uuidv4();

      puppeteer
        .launch({
          headless: true,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto(
              'https://sharpmicrowavelitigation.com/Notice-and-Claim-Form/PageControl/InformationPage',
              {
                waitUntil: 'networkidle0',
              }
            );
            await newPage.waitFor(1400);

            await newPage.waitForSelector('#dnn_ctr462_View_ctl00_BtnNext');
            await newPage.click('#dnn_ctr462_View_ctl00_BtnNext');

            await newPage.waitFor(3000);
            // Fill info
            await newPage.waitForSelector(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm > #dnn_ctr462_View_ctl00_trFirstname #dnn_ctr462_View_ctl00_txtFirstName'
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm > #dnn_ctr462_View_ctl00_trFirstname #dnn_ctr462_View_ctl00_txtFirstName',
              fullName.split(' ')[0]
            );

            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm > #dnn_ctr462_View_ctl00_trLastName #dnn_ctr462_View_ctl00_txtLastName',
              fullName.split(' ')[1]
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #dnn_ctr462_View_ctl00_txtAddress1',
              address
            );
            if (address2 != null) {
              await newPage.type(
                '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #dnn_ctr462_View_ctl00_txtAddress2',
                address2
              );
            }
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #dnn_ctr462_View_ctl00_txtCity',
              city
            );
            await newPage.select(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm > #dnn_ctr462_View_ctl00_trState #dnn_ctr462_View_ctl00_drState',
              stateAbbr
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_pnlForm > #dnn_ctr462_View_ctl00_trZip #dnn_ctr462_View_ctl00_txtZipCode',
              zip
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm > #dnn_ctr462_View_ctl00_trEmailAddress #dnn_ctr462_View_ctl00_txtEmailAddress',
              email
            );
            await newPage.click(
              '#dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_PnlPage > #dnn_ctr462_View_ctl00_divContent #dnn_ctr462_View_ctl00_BtnNext'
            );
            await page.waitFor(2500);
            // Fill Product Info
            await newPage.waitForSelector(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #cmbModel'
            );
            await newPage.select(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #cmbModel',
              rebateInfo.model
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #txtDate\\ of\\ Purchase\\/Installation',
              date.toString()
            );
            await newPage.click(
              '#dnn_ctr462_ContentPane > #dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_divContent #dnn_ctr462_View_ctl00_BtnNext'
            );

            // Select Reward
            await newPage.waitForSelector(
              '#rdbsection\\ A\\ selections #rdbsection\\ A\\ selections_1'
            );
            await newPage.click(
              '#rdbsection\\ A\\ selections #rdbsection\\ A\\ selections_1'
            );

            await newPage.waitForSelector(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #txtsection\\ B\\ selection'
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #txtsection\\ B\\ selection',
              '150'
            );

            await newPage.waitForSelector(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #txtsection\\ C\\ selection'
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_pnlForm #txtsection\\ C\\ selection',
              '200'
            );

            await newPage.click(
              '#dnn_ctr462_ContentPane > #dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_divContent #dnn_ctr462_View_ctl00_BtnNext'
            );

            //Upload Image
            await newPage.waitForSelector('#dnn_ctr462_View_ctl00_FileUpload');
            let fileInput = await newPage.$(
              '#dnn_ctr462_View_ctl00_FileUpload'
            );
            await fileInput.uploadFile(`images/${photoID}.png`);
            await newPage.click('#dnn_ctr462_View_ctl00_BtnUpload');
            await newPage.waitFor(2000);
            await newPage.click(
              '#dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_PnlForm #dnn_ctr462_View_ctl00_BtnContinue'
            );

            await newPage.waitForSelector(
              '#dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_pnlPage > #dnn_ctr462_View_ctl00_divContent #dnn_ctr462_View_ctl00_BtnNext'
            );
            await newPage.click(
              '#dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_pnlPage > #dnn_ctr462_View_ctl00_divContent #dnn_ctr462_View_ctl00_BtnNext'
            );

            // Submit
            await newPage.waitForSelector(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_PnlElectronicSignature > #dnn_ctr462_View_ctl00_Div1 #dnn_ctr462_View_ctl00_txtElectronicSignature'
            );
            await newPage.type(
              '#dnn_ctr462_View_ctl00_divContent > #dnn_ctr462_View_ctl00_PnlElectronicSignature > #dnn_ctr462_View_ctl00_Div1 #dnn_ctr462_View_ctl00_txtElectronicSignature',
              fullName
            );

            // Captcha
            var imageurl = await newPage.$eval('img', (img) =>
              img.getAttribute('src')
            );
            console.log(imageurl);
            imageurl = 'https://sharpmicrowavelitigation.com' + imageurl;
            var image = await axios.get(imageurl, {
              responseType: 'arraybuffer',
            });
            var returnedB64 = Buffer.from(image.data).toString('base64');
            var options = {
              image: returnedB64,
              maxAttempts: 50,
            };
            var s = await captcha.solve(options);
            console.log(s.text);

            await newPage.type(
              'table #dnn_ctr462_View_ctl00_txtCaptchaInput',
              s.text.toUpperCase()
            );
            await newPage.click(
              '#dnn_ctr462_ModuleContent > #dnn_ctr462_View_ctl00_PnlForm > #dnn_ctr462_View_ctl00_divContent #dnn_ctr462_View_ctl00_BtnSubmit'
            );

            // Send Response
            await newPage.waitFor(5000);

            var base64 = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            base64 = await watermark(base64);
            var options = {
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              formData: {
                type: 'base64',
                image: base64,
              },
            };
            var ss = await request.post(options);

            console.log(JSON.parse(ss)['data']['link']);
            res.send({
              message: 'Success',
              info: `NA`,
              image: JSON.parse(ss)['data']['link'],
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }
            browser.close();

            await browser.close();
          } catch (e) {
            browser.close();
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credits Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.post('/michelin', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 5,
    itemName: 'Michelin 4X4 Diamaris 111V',
    price: 0,
    quantity: 4,
    invoiceNum: '294035',
    itemNum: '520226',
    size: '275/55R19',
    quantity: '4',
    vehicle: '2020 Lexus LC500h',
    torque: '105',
    airPressure: '32',
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      rebateInfo.invoiceNum = randomIntFromInterval(294035, 987532);
      var date = randomTime(new Date(), new Date(), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var date2 = randomTime(new Date(), new Date(), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      var receiptURL = `http://localhost:8000/costco?fullName=${fullName}&itemNum=${rebateInfo.itemNum}&address=${address}&address2=${address2}&city=${city}&stateAbbr=${stateAbbr}&zip=${zip}&date=${date}&invoiceNum=${rebateInfo.invoiceNum}&itemName=${rebateInfo.itemName}&size=${rebateInfo.size}&quantity=${rebateInfo.quantity}&vehicle=${rebateInfo.vehicle}&torque=${rebateInfo.torque}&airPressure=${rebateInfo.airPressure}`;
      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 200,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.jpg`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto(
              'https://www.tirerewardcenter.com/Michelin/Step1.aspx',
              {
                waitUntil: 'networkidle0',
              }
            );
            await newPage.type(
              '#ContentPlaceHolder1_txtfirstName',
              fullName.split(' ')[0]
            );
            await newPage.type(
              '#ContentPlaceHolder1_txtLastName',
              fullName.split(' ')[1]
            );
            await newPage.type('#ContentPlaceHolder1_txtEmail', email);
            await newPage.type('#ContentPlaceHolder1_txtConfirmEmail', email);
            await newPage.type(
              '#ContentPlaceHolder1_txtPassword',
              generator.generate({
                length: 10,
                numbers: true,
              })
            );
            await newPage.select('#ContentPlaceHolder1_ddlRetailers', '20');
            await newPage.waitFor(3000);
            await newPage.select('#ContentPlaceHolder1_ddlPromotion', '733');
            await newPage.waitFor(10000);
            await newPage.type('#ContentPlaceHolder1_txtCity', city);
            await newPage.waitFor(1500);
            await newPage.select('#ContentPlaceHolder1_ddlStates', stateAbbr);
            await newPage.waitFor(1500);
            await newPage.type('#ContentPlaceHolder1_txtZip', zip);
            await newPage.waitFor(1500);
            await newPage.type(
              '#ContentPlaceHolder1_area',
              phone.substring(0, 15)
            );
            await newPage.waitFor(10000);
            await newPage.type('#ContentPlaceHolder1_txtAddress', address);
            await newPage.type('#ContentPlaceHolder1_txtAddress2', address2);
            await newPage.waitFor(1500);
            await newPage.click('#ContentPlaceHolder1_btnNext');

            // Vehicle Info
            await newPage.waitForSelector('#ContentPlaceHolder1_btnCalander');
            await newPage.click('#ContentPlaceHolder1_btnCalander');

            console.log(date);
            await newPage.waitForSelector(`div[title="${date2}"]`);
            await newPage.waitFor(1000);
            await newPage.click(`div[title="${date2}"]`);

            await newPage.waitFor(3000);
            await newPage.select(
              '#ContentPlaceHolder1_ddlDealerState',
              stateAbbr
            );
            await newPage.waitFor(1000);
            await newPage.select(
              '#ContentPlaceHolder1_ddlCity',
              city.toUpperCase()
            );
            await newPage.waitFor(1000);
            await newPage.select('#ContentPlaceHolder1_ddlDealerName', 'Other');
            await newPage.waitFor(1000);
            await newPage.type(
              '#ContentPlaceHolder1_txtInvoiceNum',
              rebateInfo.invoiceNum.toString()
            );
            await newPage.waitFor(1000);
            await newPage.select(
              '#ContentPlaceHolder1_ddlTireModel',
              '4x4 Diamaris'
            );
            await newPage.waitFor(1000);
            await newPage.select('#ContentPlaceHolder1_ddlTireSize', '3175');
            await newPage.waitFor(1000);
            await newPage.select('#ContentPlaceHolder1_ddlYear', '1');
            await newPage.waitFor(1000);
            await newPage.select('#ContentPlaceHolder1_ddlCarMake', '68');
            await newPage.waitFor(1000);
            await newPage.select('#ContentPlaceHolder1_ddlCarModel', '20257');
            await newPage.waitFor(1000);
            await newPage.click('#ContentPlaceHolder1_btnNext');

            //Select Reward
            await newPage.waitFor('input[value="46"]');
            await newPage.click('input[value="46"]');
            await newPage.click('#ContentPlaceHolder1_btnNext');

            //Agree
            await newPage.waitFor('#ContentPlaceHolder1_btnNext');
            await newPage.click('#ContentPlaceHolder1_btnNext');

            //Upload File
            await newPage.waitForSelector('#ContentPlaceHolder1_CheckBox1');
            await newPage.click('#ContentPlaceHolder1_CheckBox1');
            await newPage.waitFor(1000);
            let fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.jpg`);
            await newPage.waitFor(1000);
            await newPage.click('#ContentPlaceHolder1_btnUpload');
            await newPage.waitFor(1000);

            //submit
            await newPage.click('#ContentPlaceHolder1_ck_Accept');
            await newPage.waitFor(500);
            await newPage.click('#ContentPlaceHolder1_btnSubmit');
            await newPage.waitFor(5000);

            // Send Reponse
            var finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            finalImage = await watermark(finalImage);
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            console.log(imgurPost.data.data.link);
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await browser.close();
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.post('/firestone', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 2,
    itemName: 'Firestone Champion Fuel Fighter 205/70R15 96T BSW',
    img:
      'https://www.giga-tires.com/medias/sys_master/images/images/h50/hc3/9123505897502/firestone-champion-fuel-fighter-009-tiresDetailsFormat.jpg',
    itemNum: '600AB',
    company: 'None',
    price: 69.82,
    quantity: 4,
    size: '205/70R15',
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('9/15/2020'), new Date('10/27/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });

      var { receiptURL, chosen } = tireReceiptGenerator({
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: rebateInfo.itemName,
        quantity: rebateInfo.quantity,
        image: rebateInfo.img,
        sku: rebateInfo.itemNum,
        price: rebateInfo.price,
        size: rebateInfo.size,
      });
      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto(
              'https://www.firestonerewards.com/SubmissionEntry',
              {
                waitUntil: 'networkidle0',
              }
            );
            await newPage.type('#PurchaseDate', date);
            await newPage.waitFor(1000);
            await newPage.keyboard.press('Enter');
            await newPage.waitFor(2000);
            await newPage.click(
              'button[class="btn btn-primary btn-xs-full-width"]'
            );

            // Select Country
            await newPage.waitForSelector('input[name="ko_unique_1"]');
            await newPage.click('input[name="ko_unique_1"]');
            await newPage.waitFor(2000);
            await newPage.click(
              'button[data-bind*="NextClicked(countrySection)"]'
            );

            // How purchased?

            await newPage.waitFor(2000);
            await newPage.click(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div:nth-child(1) > input[type=radio]'
            );
            await newPage.waitFor(2000);

            if (chosen == 'simpletire') {
              await newPage.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div.row > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > input[type=radio]'
              );
            } else if (chosen == 'tirerack') {
              await newPage.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div.row > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(9) > input[type=radio]'
              );
            } else {
              await newPage.click(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div.row > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(13) > input[type=radio]'
              );
              await newPage.waitFor(1000);
              await newPage.type(
                '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.panel-body > div.row > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(14) > input',
                `${chosen}.com`
              );
              await newPage.keyboard.press('Enter');
            }

            await newPage.waitFor(1000);
            await newPage.click(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(3) > div.row.controls-row > div > button:nth-child(2)'
            );

            // Select products
            await newPage.waitForSelector(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-2.left.pad-right > div > div > select'
            );
            var selectElem = await newPage.$(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-2.left.pad-right > div > div > select'
            );
            await selectElem.type('CAR/LIGHT TRUCK/SUV');
            await newPage.waitFor(1000);

            selectElem = await newPage.$(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-3.left.pad-right > div > div > select'
            );
            await selectElem.type('TIRE');
            await newPage.waitFor(1000);

            selectElem = await newPage.$(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.col-xs-4.left.pad-right > div > div > select'
            );
            await selectElem.type('CHAMPION FUEL FIGHTER');
            await newPage.waitFor(1000);
            await newPage.type(
              '#submission > div:nth-child(4) > div.SubmissionEntryClaim > div:nth-child(5) > div.panel-body > div.hidden-xs > div:nth-child(2) > div:nth-child(1) > div > div.control-label.col-xs-2 > div > input',
              '4'
            );

            // Upload Image
            const fileInput = await newPage.$('#mainInput0');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
            await newPage.waitFor(2000);
            await newPage.click(
              'button[data-bind*="NextClicked(productsSection)"]'
            );

            //Fill Info
            await newPage.waitFor(2000);
            await newPage.waitForSelector('.row #FirstName');
            await newPage.type('.row #FirstName', fullName.split(' ')[0]);
            await newPage.waitForSelector('.row #LastName');
            await newPage.type('.row #LastName', fullName.split(' ')[1]);
            await newPage.waitForSelector('.row #EmailAddress');
            await newPage.type('.row #EmailAddress', email);
            await newPage.waitForSelector('.row #EmailAddressConfirm');
            await newPage.type('.row #EmailAddressConfirm', email);
            await newPage.waitForSelector('.row #AddressLine1');
            await newPage.type('.row #AddressLine1', address);
            await newPage.waitForSelector('.row #AddressLine2');
            if (address2 != null) {
              await newPage.type('.row #AddressLine2', address2);
            }
            await newPage.waitForSelector('.row #City');
            await newPage.type('.row #City', city);
            selectElem = await newPage.$('#State');
            await selectElem.type(abbrState(stateAbbr, 'name'));
            await newPage.waitForSelector('.row #Zip');
            await newPage.type('.row #Zip', zip);
            await newPage.waitFor(1000);
            await newPage.click(
              'button[data-bind*="NextClicked(checkOutSection)"]'
            );
            await newPage.waitFor(2200);

            try {
              await newPage.click(
                '#verifyModal > div > div > div.modal-body > div > div:nth-child(4) > span > button'
              );
            } catch (err) {
              await newPage.click(
                '#verifyModal > div > div > div.modal-footer > button'
              );
            }
            // CNFA Card
            await newPage.waitFor(2200);
            await newPage.waitForSelector(
              '.panel > .panel-body > .row > .col-md-push-5:nth-child(2) > input'
            );
            await newPage.click(
              '.panel > .panel-body > .row > .col-md-push-5:nth-child(2) > input'
            );

            await newPage.waitForSelector(
              '#submission > .panel:nth-child(6) > .row > .controls > .btn:nth-child(2)'
            );
            await newPage.click(
              '#submission > .panel:nth-child(6) > .row > .controls > .btn:nth-child(2)'
            );
            await newPage.waitFor(2200);

            await newPage.waitForSelector(
              '#submission > #RewardSection > .row > .controls > .btn:nth-child(2)'
            );
            await newPage.click(
              '#submission > #RewardSection > .row > .controls > .btn:nth-child(2)'
            );

            await newPage.waitFor(2200);
            //Skip Survey Submit
            await newPage.click(
              'button[data-bind="click: function() { Submit(); }"]'
            );
            await newPage.waitFor(5000);

            // Send Reponse
            var finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            finalImage = await watermark(finalImage);
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await browser.close();
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.post('/coopertire', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 2,
    itemName: 'Cooper Discoverer EnduraMax 215/65R16 98H BSW',
    itemNum: '640AA',
    invoiceNumber: '640134615',
    company: 'None',
    price: 111.99,
    quantity: 4,
    size: '215/65R16',
    total: '461.76',
  };

  async function clickNext(index, page) {
    let nextButtons = await page.$$(
      'button[class="btn-next btn btn-primary btn-lg"]'
    );
    await nextButtons[index].click();
  }

  async function clickCalendarDay(page, date) {
    let parsedDate = `${date
      .split(',')[1]
      .replace(/[0-9]/g, '')
      .trim()} ${date.split(',')[2].trim()}`;
    console.log(parsedDate);
    while (
      (await page.$$eval('#CalendarMonth__caption', (el) => el[1].innerText)) !=
      parsedDate
    ) {
      await page.click(
        "button[aria-label='Move backward to switch to the previous month']"
      );
      break;
    }
    await page.waitForSelector(`.CalendarDay__button[aria-label='${date}']`);
    await page.waitFor(2000);
    await page.click(`.CalendarDay__button[aria-label='${date}']`);
  }
  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('10-15-2020'), new Date(), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      var receiptURL = `http://localhost:8000/discounttirecustom?itemNum=${rebateInfo.itemNum}&itemName=${rebateInfo.itemName}&date=${date}&subprice=${rebateInfo.price}&email=${email}&quantity=${rebateInfo.quantity}&company=${rebateInfo.company}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&size=${rebateInfo.size}&city=${city}&zip=${zip}`;
      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto(`https://www.coopertirespromos.com/new`, {
              waitUntil: 'networkidle0',
            });
            await clickNext(0, newPage);

            // Upload file + Click next
            let fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
            await newPage.waitFor(1000);
            await clickNext(1, newPage);
            await newPage.waitFor(1000);

            await newPage.waitForSelector('#dealer');
            await newPage.type(
              '#dealer',
              'Tires-easy.com - Online- 3908 12th Ave, Brooklkyn NY 11201'
            );
            await newPage.waitForSelector('.ta-suggestion');
            await newPage.click('.ta-suggestion');
            await newPage.click('#dateOfPurchase');
            console.log(date);
            await clickCalendarDay(newPage, date);
            await newPage.type('#invoiceNumber', rebateInfo.invoiceNumber);

            //Vehicle info + Click nexy
            await newPage.select('#automotiveMake', 'volvo');
            await newPage.waitForSelector('#automotiveModel');
            await newPage.select('#automotiveModel', 'v60');
            await newPage.waitForSelector('#automotiveYear');
            await newPage.select('#automotiveYear', '2019');
            await newPage.type(
              "input[name='modelNumber-1']",
              'Discoverer ENDURAMAX'
            );
            await newPage.waitForSelector('.ta-suggestion');
            await newPage.click('.ta-suggestion');
            await newPage.type('#automotiveTireSize', rebateInfo.size);
            await newPage.type('#purchasePrice', rebateInfo.total);
            await clickNext(2, newPage);

            // Choose reward + click next
            await newPage.waitForSelector('.btn-select');
            await newPage.$$eval('.btn-select', (el) => el[0].click());
            await newPage.waitFor(1000);
            await clickNext(3, newPage);

            // Enter data info + click next
            await newPage.waitFor(1250);
            await newPage.waitForSelector('#firstName');
            await newPage.type('#firstName', fullName.split(' ')[0]);
            await newPage.type('#lastName', fullName.split(' ')[1]);
            await newPage.type('#personalEmail', email);
            await newPage.type('#verifyEmail', email);
            await newPage.type('#phone', phone);
            await newPage.type('#address1', address);
            await newPage.waitForSelector('.ta-suggestion');
            await newPage.click('.ta-suggestion');
            await newPage.type('#address2', address2);
            await newPage.type('#city', city);
            //Zip code is not needed due to autofill
            await newPage.select('#province', stateAbbr);
            await clickNext(4, newPage);

            // click next
            await newPage.waitFor(1000);
            await clickNext(5, newPage);

            //click next skip survey
            await newPage.waitFor(1000);
            await clickNext(6, newPage);

            // Accept agreements
            await newPage.waitFor(1000);
            await newPage.waitForSelector("input[name='legalAgreement']");
            await newPage.click("input[name='legalAgreement']");
            await newPage.click("input[name='privacyAgreement']");

            // submit
            await newPage.waitFor(1000);
            await newPage.click(
              'button[class="btn-next btn btn-success btn-lg"]'
            );
            await newPage.waitFor(10000);

            //Send Reponse
            var finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            finalImage = await watermark(finalImage);
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            await browser.close();

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.get('/costco', async (req, res) => {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var {
    fullName,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemNum,
    itemName,
    size,
    quantity,
    vehicle,
    torque,
    airPressure,
  } = req.query;

  var rawHtml = fs.readFileSync(`${__dirname}/TIRE_RECEIPT_1.html`).toString();
  var $ = cheerio.load(rawHtml);
  $("td[class='tr5 td28'] p").text(fullName.toUpperCase());
  $("td[class='tr8 td33'] p").text(
    `${address.toUpperCase()}, ${address2.toUpperCase()}`
  );
  $("td[class='tr5 td33'] p").text(
    `${city.toUpperCase()}, ${stateAbbr.toUpperCase()}, USA ${zip}`
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(2) > td.tr1.td3 > p > span').text(
    `${randomIntFromInterval(1, 12)}:${randomIntFromInterval(
      10,
      59
    )}:${randomIntFromInterval(10, 59)}`
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(7) > td.tr5.td30 > p').text(
    vehicle
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(9) > td.tr5.td34 > p').text(
    randomIntFromInterval(25739, 204733)
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(10) > td.tr8.td34 > p').text(
    torque
  );
  $(
    '#id1_1 > table.t0 > tbody > tr:nth-child(11) > td.tr8.td22 > p > span'
  ).text(airPressure);
  $('#id1_1 > table.t0 > tbody > tr:nth-child(11) > td.tr8.td23 > p').text(
    airPressure
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(18) > td.tr4.td0 > p').text(
    itemNum
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(18) > td.tr4.td1 > p').text(
    itemName
  );
  $('#id1_1 > table.t0 > tbody > tr:nth-child(19) > td.tr9.td1 > p').text(size);
  $('#id1_1 > table.t0 > tbody > tr:nth-child(18) > td.tr4.td34 > p').text(
    quantity
  );

  $('#id1_1 > table.t0 > tbody > tr:nth-child(20) > td.tr12.td0 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(21) > td.tr13.td0 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(22) > td.tr14.td0 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(20) > td.tr12.td1 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(21) > td.tr13.td1 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(22) > td.tr14.td1 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(20) > td.tr12.td34 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(21) > td.tr13.td34 > p').remove();
  $('#id1_1 > table.t0 > tbody > tr:nth-child(22) > td.tr14.td34 > p').remove();

  res.send($.html().replace('05/16/2020', date).replace('548421', invoiceNum));
});

app.get('/napa', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    img,
    price,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemNum,
    itemName,
    quantity,
  } = req.query;
  var tax = parseFloat(gettax(abbrState(stateAbbr, 'name')) * price).toFixed(2);
  var rawHtml = fs.readFileSync(`${__dirname}/napa_1.html`).toString();
  var $ = cheerio.load(rawHtml);

  $(
    '#leftRail > div.big-text.pad-lgv-lg.pad-xsv-md.marg-xsv-md.marg-lgv-none.marg-lgv-bot-md.nol-border > div.callout-text > span'
  ).text(fullName.split(' ')[0]);
  $(
    '#leftRail > div.big-text.pad-lgv-lg.pad-xsv-md.marg-xsv-md.marg-lgv-none.marg-lgv-bot-md.nol-border > div.small-text'
  ).text(`
 An order confirmation email has been sent to ${email}.`);
  $('#pickUpInfo > div:nth-child(3) > div').text(
    `${fullName}\n${email}\n${phone}`
  );
  $(
    '#orderInfo > div.nol-row.product-details.marg-xsv-none.marg-xsv-bot-lg > div.ncol-xs-3.flex.center-contents.pad-lgv-xs > img'
  ).attr('src', img);
  $(
    '#orderInfo > div.nol-row.product-details.marg-xsv-none.marg-xsv-bot-lg > div.ncol-xs-9.grouped-spread.normal-text.text-sm.flex.flex-direction-col.align-space-eve.align-space-evenly > div > div:nth-child(1) > div.prod-name.text-bold'
  ).text(itemName);
  $(
    '#orderInfo > div.nol-row.product-details.marg-xsv-none.marg-xsv-bot-lg > div.ncol-xs-9.grouped-spread.normal-text.text-sm.flex.flex-direction-col.align-space-eve.align-space-evenly > div > div:nth-child(1) > div.prod-no'
  ).text(itemNum);
  $(
    '#orderInfo > div.nol-row.product-details.marg-xsv-none.marg-xsv-bot-lg > div.ncol-xs-9.grouped-spread.normal-text.text-sm.flex.flex-direction-col.align-space-eve.align-space-evenly > div > div.ncol-md-6.end-md.ncol-xs-12 > div'
  ).text(`$${price}`);
  $(
    '#orderInfo > div.nol-row.product-details.marg-xsv-none.marg-xsv-bot-lg > div.ncol-xs-9.grouped-spread.normal-text.text-sm.flex.flex-direction-col.align-space-eve.align-space-evenly > div > div:nth-child(1) > div.prod-Qty'
  ).text(`Qty: ${quantity}`);
  $(
    '#right-rail-summary > div > div.mobile-fullWidth.pad-xsv-md.bg-lgv-white.pad-smv-top-none.pad-smv-bot-md.pad-xsv-top-none.pad-xsv-bot-md.normal-text.text-sm > div > div:nth-child(1) > div.pad-xsv-none.ncol-xs-9 > span:nth-child(2)'
  ).text(`(${quantity} Items)`);
  $(
    '#right-rail-summary > div > div.mobile-fullWidth.pad-xsv-md.bg-lgv-white.pad-smv-top-none.pad-smv-bot-md.pad-xsv-top-none.pad-xsv-bot-md.normal-text.text-sm > div > div:nth-child(1) > div.callout-text.ncol-xs-3.pad-xsv-none.end-xs'
  ).text(`$${price * quantity}`);
  $('#ROLTax').text(`$${tax}`);
  $('#ROLTotal').text(`$${price * quantity + parseFloat(tax)}`);
  $('#orderTotal').text(`$${price * quantity + parseFloat(tax)}`);
  $(
    '#rightRail > div.payment-details.marg-xsv-top-md > div.ncol-xs-12.ncol-md-12.pad-xsv-none.nol-border.rounded-box > div > div.due-in-store-msg.marg-xsv-top-md > b'
  ).text(`$${price * quantity + parseFloat(tax)}`);
  res.send($.html().replace('Order# 25233087', `Order# ${invoiceNum}`));
});

app.post('/ntb', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 5,
    itemName: 'Monroe Quick-Strut Strut and Coil Spring Assembly',
    brand: 'Monroe',
    carDealer: 'Toyota',
    carModel: 'RAV4',
    caryear: '2012',
    retailer: '',
    price: '109.99',
    quantity: '4',
    size: '',
    itemNumber: '',
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date(), new Date(), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var passDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      var invoice = new Date().getTime().toString().substring(0, 8);
      var receiptURL = `http://localhost:8000/tirekingdom?email=${email}&date=${passDate}&price=${rebateInfo.price}&quantity=${rebateInfo.quantity}&company=${rebateInfo.brand}&vehicleInfo=${rebateInfo.carDealer} ${rebateInfo.carModel} ${rebateInfo.caryear}&itemName=${rebateInfo.itemName}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&phone=${phone}`;
      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 10,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto(
              'https://tkntb-rebates.com/Rebate/?rebate_campaign_seq=5MaRRT5ammU%3d',
              {
                waitUntil: 'networkidle0',
              }
            );
            await newPage.type('#txtPurchaseDate', date);
            await newPage.type('#txtInvoiceNumber', invoice);
            await newPage.click('input[value="135597"]');

            //Upload file
            const fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
            await newPage.waitFor(2000);
            await newPage.click('#btnnext');

            //Enter Info
            await newPage.waitForSelector('#drpPurchase');
            await newPage.select('#drpPurchase', '293');
            await newPage.type(
              '#txtStoreName',
              'NAPA AutoCare Center JD Tire Kingdom'
            );
            await newPage.type('#txtStoreAddress', '2040 Central Ave');
            await newPage.type('#txtStoreCity', 'Albany');
            await newPage.select('#txtStoreState', '31');
            await newPage.type('#txtStoreZipCode', '12205');
            await newPage.type('#txtStorePhoneNumber', '5184568473');

            await newPage.type('#fname', fullName.split(' ')[0]);
            await newPage.type('#Lname', fullName.split(' ')[1]);
            await newPage.type('#Addresstxt', address);
            await newPage.type('#Addresstxt2', address2);
            await newPage.type('#citytxt', city);
            await newPage.focus('#txtstate');

            await newPage.keyboard.type(abbrState(stateAbbr, 'name'));
            await newPage.type('#ZipCode', zip);
            await newPage.type('#Phoneno', phone);
            await newPage.type('#emailtxt', email);
            await newPage.click('#finish');
            await newPage.waitFor(5000);
            await newPage.solveRecaptchas();
            await page.waitFor(800);
            await newPage.click('#btnSubmitRebate');
            await newPage.waitFor(5000);

            //Send Reponse
            var finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            finalImage = await watermark(finalImage);
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }
            await newPage.close();
            await page.close();
            await browser.close();
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin | ' + error,
              image: 'Unavaliable',
            });

            await newPage.close();
            await page.close();
            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.post('/dickcepek', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 1,
    itemName: 'Dick Cepek Fun Country 31X10.50R15 C/6PR BSW',
    brand: 'DICK CEPEK',
    carDealer: 'Chevrolet',
    carModel: 'Blazer',
    caryear: '2003',
    retailer: 'DISCOUNT TIRE - 5051 LINCOLN AVE, CYPRESS CA 90630-2978',
    price: '177.00',
    quantity: '4',
    size: '31X10.50R15',
    itemNumber: '90000001950',
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('9/1/2020'), new Date('10/15/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var passDate = date.replace('/', '-').replace('/', '-');
      var invoice = new Date().getTime().toString().substring(0, 7);
      var receiptURL = `http://localhost:8000/discounttirefullcustom?email=${email}&date=${passDate}&subprice=${rebateInfo.price}&itemNum=${rebateInfo.itemNumber}&size=${rebateInfo.size}&quantity=${rebateInfo.quantity}&company=${rebateInfo.brand}&vehicle=${rebateInfo.caryear} ${rebateInfo.carDealer}&vehicleInfo=${rebateInfo.carDealer} ${rebateInfo.carModel} ${rebateInfo.caryear}&itemName=${rebateInfo.itemName}&fullName=${fullName}&address=${address}&stateAbbr=${stateAbbr}&city=${city}&zip=${zip}&phone=${phone}&orderNum=${invoice}`;
      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 50,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto('https://www.dickcepekrewards.com/#/home', {
              waitUntil: 'networkidle0',
            });
            await newPage.waitFor(1250);
            try {
              await removeBellIcon(newPage);
            } catch (error) {
              console.log('Passing');
            }
            await newPage.type('#home-purchaseDateOnlyText', date);
            await newPage.click('#home-offercode-purchasedate-continue');
            newPage.waitForNavigation({
              waitUntil: 'networkidle0',
            });

            // Continue
            await newPage.waitForSelector('#continueOrSubmitBtn');
            try {
              await removeBellIcon(newPage);
            } catch (error) {
              console.log('Passing');
            }
            await newPage.click('#continueOrSubmitBtn');

            // Upload file + continue

            await newPage.waitForSelector('input[type=file]');
            let fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
            await newPage.waitFor(2550);
            await newPage.click('a.btn.cont');

            //Fill info

            await newPage.waitForSelector("input[name='firstName']");
            await newPage.type(
              "input[name='firstName']",
              fullName.split(' ')[0]
            );
            await newPage.type(
              "input[name='lastName']",
              fullName.split(' ')[1]
            );
            await newPage.type("input[name='email']", email);
            await newPage.type("input[name='confirmEmail']", email);
            await newPage.type("input[name='phoneNumber']", phone.toString());
            await newPage.type("input[name='address1']", address);
            if (address2 != null) {
              await newPage.type("input[name='address2']", address2);
            }
            await newPage.type("input[name='city']", city);
            await newPage.type("input[name='postalCode']", zip);
            await newPage.waitFor(1000);
            await newPage.click("select[name='country']");
            await newPage.waitFor(1000);
            await newPage.click("button[ng-if='verifyAddress']");
            await newPage.waitFor(1000);
            await newPage.waitForSelector('#enteredAddressBtn');

            try {
              await newPage.click('#recommendedAddressBtn');
            } catch (err) {
              await newPage.click('#enteredAddressBtn');
            }

            //Skip survey

            await newPage.waitFor(1000);
            await newPage.waitForSelector('#survey-continueBtn');
            await newPage.click('#survey-continueBtn');

            //submit

            await newPage.waitFor(1000);
            await newPage.waitForSelector('#continueOrSubmitBtn');
            await newPage.click('#continueOrSubmitBtn');
            await newPage.waitForSelector('#confirmation-trackingNumber');
            element = await newPage.$('#confirmation-trackingNumber');
            var text = await newPage.evaluate((el) => el.textContent, element);
            text = `Tracking: ${text}`;

            // Send Reponse
            let finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            console.log(imgurPost.data.data.link);
            res.send({
              message: 'Success',
              info: text,
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await browser.close();
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin |' + error,
              image: 'Unavaliable',
            });

            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });

      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });

    await browser.close();
  }
});

app.post('/addressVerification', async (req, res) => {
  var response = await addressValidator(req.body);
  if (response == true) {
    res.send({
      message: 'Success',
      info: 'Your address is valid and can be used with the rebate bot',
    });
  } else {
    res.send({
      message: 'error',
      info: response['0']['Description'],
    });
  }
});

app.get('/walmartmulti', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    array,
  } = req.query;
  array = JSON.parse(array);
  var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
  var lastFour = getRandomInt(1000, 9999).toString();
  var products = '';
  var totalPrice = 0.0;
  var qty = 0.0;
  array.forEach((product) => {
    totalPrice = totalPrice + product.price * product.qty;
    qty = qty + product.qty;
    products += `<li class="l-margin-top"><div class="order-info-v2"><div class="order-item-left"><div class="product-image"><a href="#" orderproduct="[object Object]"><img src="${product.img}" alt=""></a></div><div class="order-item-info"><div><a href="#" class="product-name font-normal" aria-hidden="true" tabindex="-1">${product.name}</a></div> Sold by Walmart <p class="copy-base-ny copy-type-accent copy-small"> </p><div class="order-info-price-v2 discounted-unit-price"><span class="price price-tag-light copy-mini"><span class="price-group" role="text" aria-label="$0.99"><span class="price-currency">$${product.price}</span></span></span></div><div class="easy-reorder-v2 xs-margin-top"><div class="easy-reorder easy-reorder-add"><button class="button button--small button--ghost" data-automation-id="button" data-tl-id="button" aria-label="Reorder  Netis WF-2120 Netis WF2120 IEEE 802.11n - Wi-Fi Adapter for Desktop Computer/Notebook - USB - 150 Mbit/s - 2.48 GHz ISM - External" aria-hidden="false" tabindex="0" type="button"><span class="button-wrapper">Reorder</span></button></div></div></div></div><div class="order-item-right"><div><div><button class="button copy-small button--link" data-automation-id="contact-seller-link-button" data-tl-id="button" type="button"><span class="button-wrapper">Contact seller</span></button></div><div></div></div></div></div></li>`;
  });
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);
  totalPrice = totalPrice.toFixed(2);
  var rawHtml = fs.readFileSync(`${__dirname}/walmart.html`).toString();
  var shipDate = new Date(
    new Date(date).getTime() + getRandomInt(4320, 14400) * 60000
  ).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  var $ = cheerio.load(rawHtml);

  $(
    '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > center > b'
  )['0']['children'][0]['data'] = 'Order #' + invoiceNum;
  $(
    '#main-content > div > div.m-margin-top.hide-content-max-m.order-details-breadcrumbs.clearfix > div > nav > ol > class'
  )['0']['children'][0]['data'] = 'Order placed on ' + date;
  $(
    '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > b > h2'
  )['0']['children'][0]['data'] = date;
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-right > p.copy-base-ny.copy-small.no-margin'
  )['0']['children'][0]['data'] = 'Shipping to ' + fullName;
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-right > div:nth-child(2)'
  )['0']['children'][0]['data'] = address;
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-right > div:nth-child(3)'
  )['0']['children'][0]['data'] = `${city}, ${stateAbbr} ${zip}`;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > div > div > span'
  )['0']['children'][0]['data'] = fullName;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > div > div > div > span:nth-child(1)'
  )['0']['children'][0]['data'] = address;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > div > div > div > span:nth-child(3)'
  )['0']['children'][0]['data'] = `${city}, ${stateAbbr} ${zip}`;
  $(
    '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div.order-head-split.second > p'
  )['0']['children'][0]['data'] = qty.toString() + ' Items';
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(1)'
  )['0']['children'][0]['data'] = `Subtotal (${qty.toString()})`;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)'
  )['0']['children'][0]['data'] = '$' + totalPrice;
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul > li > div > div.order-item-left > div.order-item-info > div.order-info-price-v2.discounted-unit-price > span > span'
  )['0']['children'][0]['data'] = '$' + totalPrice;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)'
  )['0']['children'][0]['data'] = '$' + tax;
  $(
    '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div.order-head-split.second > h2'
  )['0']['children'][0]['data'] = '$' + totalPrice;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table.order-total > tbody > tr > td:nth-child(2) > h2'
  )['0']['children'][0]['data'] = '$' + taxPrice;
  $(
    '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > ul > li > div'
  )['0']['children'][0]['data'] = `${
    cards[Math.floor(Math.random() * cards.length)]
  } ending in ${lastFour}`;
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-status > div:nth-child(1) > div:nth-child(1) > div > div.order-status > div > h2 > span.font-bold'
  )['0']['children'][0]['data'] = shipDate;
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul > li'
  ).remove();
  $(
    '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul'
  ).append(products);

  res.send($.html());
});

app.post('/bic', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 2,
    business: [
      'None',
      'No business',
      'Personal use',
      'Classroom',
      'Home',
      'School',
      'Freelance writing',
      'Freelance designer',
      'copywriter',
      'event planner',
      'ghostwriting',
    ],
    products: [
      {
        name: 'BIC Brite Liner Highlighter, Chisel Tip, Yellow, 1-Dozen',
        price: 8.81,
        img:
          'https://i5.walmartimages.com/asr/37916bbc-aab3-49b3-8e79-af2e2ebd116c_1.b39d3834ebf5c8bb64ccc15ccdb1e264.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Brite Liner Pocket Highlighter, Chisel Tip, Orange, 12-Count',
        price: 7.68,
        img:
          'https://i5.walmartimages.com/asr/84554f0d-e0de-4959-8954-2abf36115f74_1.9279f5808870ef7a72403948b1827e3f.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Brite Liner Highlighter, Chisel Tip, Fluorescent Green, 12-Count',
        price: 10.29,
        img:
          'https://i5.walmartimages.com/asr/36f7d4a2-4ae7-4061-b857-ab3f6b3414d3_1.e2e5a67d0a7271ecc7f472eebde19fb0.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name: 'BIC Brite Liner Pocket Highlighter, Chisel Tip, Pink, 12-Count',
        price: 8.48,
        img:
          'https://i5.walmartimages.com/asr/28c6b8dd-05b8-4fc1-8d85-eb6d8a751588_1.9f505811cef289273e74913a343a55a7.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name: 'BIC Brite Liner Highlighter, Chisel Tip, Yellow, 24 Count',
        price: 10.43,
        img:
          'https://i5.walmartimages.com/asr/6d48ee1b-ac99-4901-a7fe-3bf6f2d91a47_1.29c626bb48ab2356475d5b9209de48eb.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Brite Liner Highlighter, Chisel Tip, Assorted Colors, 5-Count, For Broad Highlighting or Fine Underlining',
        price: 1.97,
        img:
          'https://i5.walmartimages.com/asr/637cb144-1ca4-4639-910a-1d37bb3d35ac.985551f2bad5d3b4f880ec5d0f8cf869.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Brite Liner Retractable Highlighter, Chisel Tip, Yellow, 12-Count',
        price: 14.11,
        img:
          'https://i5.walmartimages.com/asr/44a5c8b3-2019-4f83-b998-2fe9ede128b8_1.c98f84f7ddd5519f2b08198370706c9d.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Brite Liner Retractable Highlighter, Chisel Tip, Assorted Colors, 5-Count',
        price: 10.37,
        img:
          'https://i5.walmartimages.com/asr/4183b88b-b2dc-49df-ab82-c93921698196_1.2c911fb1ce5678ac4dcba52c09c23609.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Intensity Bold Dry Erase Pocket Marker, Fine Point, Black, 12 Count',
        price: 11.06,
        img:
          'https://i5.walmartimages.com/asr/54e2cb38-8cec-49d5-81f8-a15fdd4ef651_1.f3f3bc66412fab46dbe6eb5b69323dbf.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Intensity Low Odor Dry Erase Marker, Fine Bullet Tip, Blue, Dozen -BICGDE11BE',
        price: 12.92,
        img:
          'https://i5.walmartimages.com/asr/052952ce-2cec-4010-890f-de7681c057e1_1.5a94a537f369eb4f5e0900d449ca3fec.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Intensity Low Odor Dry Erase Marker, Tank Style, Chisel Tip, Black, 12-Count, Versatile Chisel Tip for Fine and Broad Lines',
        price: 7.88,
        img:
          'https://i5.walmartimages.com/asr/172daf44-ad9c-4735-b1ac-2ad0f4f3221f.3d32908c6ae0f856e1c6cf9d7696380f.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'Bic Xtra-Sparkle Mechanical Pencil, Medium Point (0.7mm), #2 HB, 24-Count, For Sharp and Accurate Writing',
        price: 5.97,
        img:
          'https://i5.walmartimages.com/asr/8b53e7fd-a516-4525-a953-33207ffff7c5.a4cf664d54f363c3d32d16f277d2167e.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Xtra-Precision Mechanical Pencil, Metallic Barrels, Fine Point (0.5mm), 24 Count',
        price: 5.47,
        img:
          'https://i5.walmartimages.com/asr/e4250bd5-4397-4ff7-b497-b8b8ae0fbdcd_1.a0299ca2eddcd0fb79d159f7e12dd0c3.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Xtra-Strong Mechanical Pencil, Thick Point (0.9mm), #2 HB, 24-Count, For Sharp and Accurate Writing',
        price: 5.97,
        img:
          'https://i5.walmartimages.com/asr/61b5ff04-f66d-4cef-b11f-e844e38fdbb3.f70b3b6f63f4bbc04905e9d5e0fb27ab.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Intensity Metal Pro Permanent Marker, Fine Point, Wood, Glass, Metal, Plastic Surfaces, Black, 12 Count',
        price: 10.8,
        img:
          'https://i5.walmartimages.com/asr/7e4b099f-0632-48e5-8736-cd36a3092a7e.362ee96a4a65e05f748d7f54872487a7.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Gelocity Quick Dry Retractable Gel Pen, Medium Point (0.7 mm), Blue, 12-Count',
        price: 15.88,
        img:
          'https://i5.walmartimages.com/asr/bacc1a9a-76fa-4796-b683-594db3219af0_1.9e54577134128a0f826e680150395f29.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
      {
        name:
          'BIC Gelocity Quick Dry Retractable Gel Pen, Medium Point (0.7 mm), Black, 12-Count',
        price: 10.66,
        img:
          'https://i5.walmartimages.com/asr/dce6ada5-e438-43df-8731-17ec48e4f061_1.d10530e8d16491d4a8601c10dad05cea.jpeg?odnWidth=100&odnHeight=100&odnBg=ffffff',
      },
    ],
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var totalPrice = 0;
      var purchased = [];
      do {
        var item =
          rebateInfo.products[
            Math.floor(Math.random() * rebateInfo.products.length)
          ];
        item.qty = getRandomInt(4, 6) + 1;
        purchased.push(item);
        totalPrice = totalPrice + item.price * item.qty;
        rebateInfo.products.splice(rebateInfo.products.indexOf(item), 1);
      } while (totalPrice <= getRandomInt(150, 220));

      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('7/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      var invoice = `${new Date()
        .getTime()
        .toString()
        .substring(0, 7)}-${new Date().getTime().toString().substring(7, 13)}`;
      var receiptURL = `http://localhost:8000/walmartmulti?fullName=${fullName}&address=${address}&city=${city}&stateAbbr=${stateAbbr}&zip=${zip}&date=${date}&invoiceNum=${invoice}&array=${encodeURIComponent(
        JSON.stringify(purchased)
      )}`;
      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          slowMo: 100,
          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&headless=false&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            const page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            var newPage = await browser.newPage();
            await newPage.goto('https://bicdealer2020.dja.com/?w=spr', {
              waitUntil: 'networkidle0',
            });
            await newPage.click("button[class='new_btn to_step2 step1']");

            //Upload File
            await newPage.waitForSelector('input[name=claim]');
            await newPage.type('input[name=claim]', invoice.replace('-', ''));
            let fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
            await newPage.waitFor(2000);
            await newPage.click('button[class="new_btn to_step3"]');

            //Upload Info
            await newPage.waitForSelector("input[name='first_name']");
            await newPage.type(
              "input[name='first_name']",
              fullName.split(' ')[0]
            );
            await newPage.type(
              "input[name='last_name']",
              fullName.split(' ')[1]
            );
            await newPage.type(
              "input[name='business_name']",
              rebateInfo.business[
                Math.floor(Math.random() * rebateInfo.business.length)
              ]
            );
            await newPage.type("input[name='address_1']", address);
            await newPage.type("input[name='address_2']", address2);
            await newPage.type("input[name='city']", city);
            await newPage.select("select[id='state']", stateAbbr);
            await newPage.type("input[name='zip']", zip);
            await newPage.type("input[name='email']", email);
            await newPage.type("input[name='seller_name']", 'Walmart');

            //Accept agreements
            await newPage.click('input[type=radio]');
            await newPage.click('#optin_contact');
            await newPage.click('#optin_rules');

            //Submit
            await newPage.click('input[class="new_btn"]');
            await newPage.waitFor(5000);

            //Send Reponse
            let finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            console.log(imgurPost.data.data.link);
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await newPage.close();
            await page.close();
            await browser.close();
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin |' + error,
              image: 'Unavaliable',
            });
            await newPage.close();
            await page.close();
            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.get('/besybuydetails', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
  } = req.query;
  var rawHtml = fs
    .readFileSync(`${__dirname}/Best_Buy_Order_Details.html`)
    .toString();
  var $ = cheerio.load(rawHtml);
  price = parseFloat(req.query.price);
  quantity = parseInt(quantity);
  var totalPrice = price * quantity;
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-9.od-item__summary > div:nth-child(1) > div > img'
  ).attr('src', image);
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-9.od-item__summary > div:nth-child(1) > div > div > span > a'
  )['0']['children'][0]['data'] = itemName;
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-9.od-item__summary > div:nth-child(1) > div > div > ul > li:nth-child(1)'
  ).replaceWith(`<li><span>SKU:</span>\n${sku}</li>`);
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-9.od-item__summary > div:nth-child(1) > div > div > ul > li.od-item-summary__quantity'
  ).replaceWith(`<li><span>Quantity:</span>\n${quantity}</li>`);
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-9.od-item__summary > div:nth-child(2) > div > div'
  ).replaceWith(
    `<div class="od-item-shipping__address">${fullName}<br>${address},${
      address2 || ''
    }<br>${city}, ${stateAbbr} ${zip} US </div>`
  );
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-8.od-summary-details > div.od-payment-method > div > div > div.col-xs-10 > div.col-xs-5.od-payment-method__billing-address'
  ).replaceWith(
    `<div class="col-xs-5 od-payment-method__billing-address"><span>${fullName}<br></span>${address},${
      address2 || ''
    }<br>${city}, ${stateAbbr} ${zip} US </div>`
  );
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-8.od-summary-details'
  ).replaceWith(
    `<div class="od-summary-details__abstract"><div class="od-summary-details__order-number"><span>Order Number:</span> ${invoiceNum}</div><div class="od-summary-details__order-status od-summary-details__order-status--completed"><span>Order Status:</span> Shipped</div><span>Products &amp; Services:</span> ${quantity} </div>`
  );
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-4.od-summary-totals > div > ul:nth-child(2) > li:nth-child(1) > span'
  )['0']['children'][0]['data'] = '$' + totalPrice;
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-4.od-summary-totals > div > ul:nth-child(3) > li > div.col-xs-4 > span'
  )['0']['children'][0]['data'] = '$' + tax;
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-4.od-summary-totals > div > ul:nth-child(4) > li > span'
  )['0']['children'][0]['data'] = '$' + taxPrice;
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-4.od-item__totals > div > h3 > span'
  )['0']['children'][0]['data'] = '$' + taxPrice;
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-4.od-item__totals > div > ul:nth-child(2) > li:nth-child(1) > span'
  )['0']['children'][0]['data'] = '$' + totalPrice;
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-content.container-fluid > div > div.od-item-list__content > div > div.col-xs-4.od-item__totals > div > ul.od-item-total__list > li > div.col-xs-4 > span'
  )['0']['children'][0]['data'] = '$' + tax;
var monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
    return this.getMonthName().substr(0, 3);
};

  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-1.od-order-date > div.od-order-date__month'
  )['0']['children'][0]['data'] = monthNames[date.split('/')[0]].substring(0,3);
  console.log(date)
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-1.od-order-date > div.od-order-date__day'
  )['0']['children'][0]['data'] = date.split('/')[1];
  $(
    'body > div.notifications-enabled--size-l > div.od-container.container > div.od-header > div > div > div.col-xs-1.od-order-date > div.od-order-date__year'
  )['0']['children'][0]['data'] = date.split('/')[2];

  res.send($.html());
});

app.get('/tirekingdom', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    vehicleInfo,
    itemName,
    quantity,
    price,
    size,
  } = req.query;
  var rawHtml = fs
    .readFileSync(`${__dirname}/TireKingdomAppointment.html`)
    .toString();
  var $ = cheerio.load(rawHtml);
  date = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  var totalPrice = price * quantity;
  totalPrice = totalPrice.toFixed(2);
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td > strong:nth-child(4)'
  ).text(vehicleInfo);
  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1)'
  ).replaceWith(
    `<td width="50%" valign="top" style="text-align:left;font-size:16px;line-height:1.2;font-family:Gotham,'Helvetica Neue',Helvetica,Arial,'sans-serif';padding-right:15px"><b>Appointment Date:</b><br><strong>Date:</strong> ${date
      .split(' ')[0]
      .replace(',', '')}<br>${
      date.split(' ')[1] + ' ' + date.split(' ')[2] + ' ' + date.split(' ')[3]
    }<br><strong>Time: </strong>01:30 pm - 02:30 pm</td>`
  );
  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > span'
  ).text(size ? 'Tire Installation' : 'Shocks & Struts');
  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > span'
  ).text(`${itemName} ${size || ''}`);
  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)'
  ).text(quantity);
  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(3)'
  ).text('$' + price);
  $(
    'div:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)'
  ).replaceWith(
    `<td align="right" valign="top" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:14px;font-family:Gotham,'Helvetica Neue',Helvetica,Arial,'sans-serif'">$2.00<br>$${totalPrice}<br>$${tax}<br>--------<br><strong>$${
      taxPrice + 2.0
    }</strong></td>`
  );

  res.send($.html());
});

app.post('/continental', async (req, res) => {
  const rebateInfo = {
    rebatePrice: 2,
    itemName: 'ExtremeContact DW',
    brand: 'Continental',
    carDealer: 'Toyota',
    carModel: 'RAV4',
    caryear: '2012',
    retailer: '',
    price: '259.99',
    quantity: '4',
    size: '245/35ZR21',
    itemNumber: 'CG09724351YX',
    img:
      'https://static.tirerack.com/content/dam/tires/continental/co_extremecontact_dws_06_full.jpg?imwidth=440&impolicy=tow-pdp-main',
  };

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('11/01/2020'), new Date('11/21/2020'), {
        month: 'numeric',
        day: '2-digit',
        year: 'numeric',
      });
      var passDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      console.log(passDate);

      var { receiptURL, chosen } = tireReceiptGenerator({
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: rebateInfo.itemName,
        quantity: rebateInfo.quantity,
        image: rebateInfo.img,
        sku: rebateInfo.itemNumber,
        price: rebateInfo.price,
        size: rebateInfo.size,
      });

      var photoID = uuidv4();

      //captcha
      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );

      puppeteer
        .launch({
          headless: true,
          args: ['--proxy-server=http://34.195.20.123:31112'],

          browserWSEndpoint:
            'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=http://34.195.20.123:31112&--window-size=1000,800',
        })
        .then(async (browser) => {
          try {
            var newPage = await browser.newPage();
            await newPage.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            var page = await browser.newPage();
            await page.authenticate({
              username: 'lff4fyij',
              password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
            });

            // TODO: Get Receipt
            await page.goto(receiptURL, {
              waitUntil: 'networkidle0',
            });
            await page.screenshot({
              path: `images/${photoID}.png`,
              fullPage: true,
            });

            // TODO: Start Script
            await newPage.goto('https://continentaltire-rebates.com/', {
              waitUntil: 'networkidle0',
            });
            await newPage.type('input[name=offerCode]', '20-94563');
            await newPage.type('#home-purchasedate', date);
            try {
              await removeBellIcon(newPage);
            } catch (error) {}
            await newPage.click('#home-purchasedate-continue2');
            newPage.waitForNavigation({
              waitUntil: 'networkidle0',
            });

            // Continue
            await newPage.waitForSelector('#continueOrSubmitBtn');
            try {
              await removeBellIcon(newPage);
            } catch (error) {}
            await newPage.click('#continueOrSubmitBtn');

            // Click Product
            await newPage.waitFor(1250);
            await newPage.waitForSelector(
              'body > div.content.container.fluid > div > div > div:nth-child(5) > div:nth-child(14) > div'
            );
            await newPage.click(
              'body > div.content.container.fluid > div > div > div:nth-child(5) > div:nth-child(14) > div'
            );
            await newPage.waitFor(1250);
            await newPage.click('#productInfo-continueBtn');

            // Upload file + continue

            await newPage.waitForSelector('input[type=file]');
            let fileInput = await newPage.$('input[type=file]');
            await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
            await newPage.waitFor(1250);
            await newPage.click('a.btn.cont');

            //Fill info

            await newPage.waitForSelector("input[name='firstName']");
            await newPage.type(
              "input[name='firstName']",
              fullName.split(' ')[0]
            );
            await newPage.type(
              "input[name='lastName']",
              fullName.split(' ')[1]
            );
            await newPage.type("input[name='email']", email);
            await newPage.type("input[name='confirmEmail']", email);
            await newPage.type("input[name='phoneNumber']", phone.toString());
            await newPage.type("input[name='address1']", address);

            await newPage.type("input[name='address2']", address2);

            await newPage.type("input[name='city']", city);
            await newPage.type("input[name='postalCode']", zip);
            await newPage.waitFor(1000);
            await newPage.click("select[name='country']");
            await newPage.waitFor(1000);
            await newPage.click("button[ng-if='verifyAddress']");
            await newPage.waitFor(1000);
            await newPage.waitForSelector('#enteredAddressBtn');
            await newPage.click('#enteredAddressBtn');

            //Skip survey

            await newPage.waitFor(1000);
            await newPage.waitForSelector('#survey-continueBtn');
            await newPage.click('#survey-continueBtn');

            //submit

            await newPage.waitFor(1000);
            await newPage.waitForSelector('#continueOrSubmitBtn');
            await newPage.click('#continueOrSubmitBtn');
            await newPage.waitForSelector('#confirmation-trackingNumber');
            element = await newPage.$('#confirmation-trackingNumber');
            var text = await newPage.evaluate((el) => el.textContent, element);
            text = `Tracking: ${text}`;

            // Send Reponse
            let finalImage = await newPage.screenshot({
              encoding: 'base64',
              fullPage: true,
            });
            let imgurPost = await axios({
              method: 'POST',
              url: 'https://api.imgur.com/3/image',
              headers: {
                Authorization: 'Client-ID 85d1b80290d4578',
              },
              data: {
                type: 'base64',
                image: finalImage,
              },
            });
            console.log(imgurPost.data.data.link);
            res.send({
              message: 'Success',
              info: 'No addition info',
              image: imgurPost.data.data.link,
            });

            for (let index = 0; index < rebateInfo.rebatePrice; index++) {
              await removeCredit(req.body.key);
            }

            await newPage.close();
            await page.close();
            await browser.close();
          } catch (error) {
            res.send({
              message: 'error',
              info: 'Script Error | Contact Admin',
              image: 'Unavaliable',
            });
            await newPage.close();
            await page.close();
            await browser.close();
          }
        });
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.get('/simpletire', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/SimpleTire.html`).toString();
  var $ = cheerio.load(rawHtml);

  var totalPrice = price * quantity;
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax) + 1.5).toFixed(2);
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(5) > td > strong'
  ).text(`Order Date: ${date}`);
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(5) > td > p.m_3500823869363679816orderID'
  ).text(`Order ID # ${invoiceNum}`);
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(5) > td > p:nth-child(4)'
  ).replaceWith(
    `<p class="m_3500823869363679816orderItems"><span>Items (${quantity})</span>$${totalPrice}</p>`
  );
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(5) > td > p:nth-child(6)'
  ).replaceWith(
    `<p class="m_3500823869363679816orderItems"><span>Tax</span>$${tax}</p>`
  );
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(5) > td > p.m_3500823869363679816orderItems.m_3500823869363679816Total'
  ).replaceWith(
    `<p class="m_3500823869363679816orderItems m_3500823869363679816Total"><span>Total</span>$${taxPrice}</p>`
  );
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > p.m_3500823869363679816product-line'
  ).replaceWith(
    `<p class="m_3500823869363679816product-line">${itemName} ${size}<br>${size}</p>`
  );
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > p:nth-child(4) > span.m_3500823869363679816quantity'
  ).text(`${quantity} tires`);
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > p:nth-child(4) > span.m_3500823869363679816price'
  ).text(`$${price}/tire`);
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(3) > td > div:nth-child(1) > div > table > tbody > tr > td > p.m_3500823869363679816product-line'
  ).replaceWith(
    `<p class="m_3500823869363679816product-line" style="margin-bottom:1em">${address}, ${address2} <br>${city}, ${stateAbbr} ${zip}</p>`
  );
  $(
    'div.m_3500823869363679816email-container > table:nth-child(1) > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(3) > td > div.m_3500823869363679816feature-1.m_3500823869363679816marginTop30 > div > table > tbody > tr > td > p.m_3500823869363679816product-line'
  ).replaceWith(
    `<p class="m_3500823869363679816product-line" style="margin-bottom:1em">${fullName}<br>${address}, ${address2} <br>${city}, ${stateAbbr} ${zip}</p>`
  );
  res.send($.html());
});

app.get('/tirerack', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/TireRack.html`).toString();
  var $ = cheerio.load(rawHtml);

  var totalPrice = price * quantity;
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax) + 10.16).toFixed(2);

  $(
    'div > div.gs > div.gE.iv.gt > table > tbody > tr.acZ.xD > td > table > tbody > tr > td > div.iw.ajw > span > span'
  ).text(fullName.replace(' ', ''));
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > span'
  ).text(`FG${invoiceNum}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > span'
  ).text(date);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > span'
  ).text(parseInt(invoiceNum) + 9035464);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(4) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td > span > strong'
  ).text(itemName);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(4) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)'
  ).text(quantity);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(4) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(4)'
  ).text(`$${price}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(4) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(5) > strong'
  ).text(`$${totalPrice}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td'
  ).text(fullName);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td'
  ).text(address);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(4) > td'
  ).text(`${city},\n${stateAbbr} ${zip}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(5) > td'
  ).text(phone);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td'
  ).text(fullName);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td'
  ).text(address);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td'
  ).text(`${city},\n${stateAbbr}\n${zip}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td'
  ).text(phone);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(4) > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > span'
  ).text(`$${totalPrice}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(4) > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > span'
  ).text(`$${tax}`);
  $(
    'div > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(5) > td > table:nth-child(2) > tbody > tr > td:nth-child(4) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > strong'
  ).text(`Order Total: $${taxPrice}`);

  res.send($.html());
});

function tireReceiptGenerator(data, not = []) {
  var receipts = ['simpletire', 'tirerack', 'tirekingdom'];

  // Remove all included in not
  not.forEach((entry) => {
    receipts.splice(receipts.indexOf(entry.toLowerCase()), 1);
  });

  var chosen = receipts[Math.floor(Math.random() * receipts.length)];
  var receiptURL = `http://localhost:8000/${chosen}?`;

  for (let index = 0; index < Object.entries(data).length; index++) {
    receiptURL += `${Object.entries(data)[index][0]}=${
      Object.entries(data)[index][1]
    }&`;
  }

  return {
    chosen: chosen,
    receiptURL: encodeURI(receiptURL),
    invoice: data.invoiceNum,
  };
}

function tireReceiptGeneratorGoodyear(data, not = []) {
  var receipts = ['discounttire'];

  // Remove all included in not
  not.forEach((entry) => {
    receipts.splice(receipts.indexOf(entry.toLowerCase()), 1);
  });

  var chosen = receipts[Math.floor(Math.random() * receipts.length)];
  var receiptURL = `http://localhost:8000/${chosen}?`;

  for (let index = 0; index < Object.entries(data).length; index++) {
    receiptURL += `${Object.entries(data)[index][0]}=${
      Object.entries(data)[index][1]
    }&`;
  }

  return {
    chosen: chosen,
    receiptURL: encodeURI(receiptURL),
    invoice: data.invoiceNum,
  };
}

function tireReceiptGenerator2(data, not = []) {
  var receipts = ['tirekingdom'];

  // Remove all included in not
  not.forEach((entry) => {
    receipts.splice(receipts.indexOf(entry.toLowerCase()), 1);
  });

  var chosen = receipts[Math.floor(Math.random() * receipts.length)];
  var receiptURL = `http://localhost:8000/${chosen}?`;

  for (let index = 0; index < Object.entries(data).length; index++) {
    receiptURL += `${Object.entries(data)[index][0]}=${
      Object.entries(data)[index][1]
    }&`;
  }

  return {
    chosen: chosen,
    receiptURL: encodeURI(receiptURL),
    invoice: data.invoiceNum,
  };
}

app.post('/hankook', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 2,
    itemName: 'Hankook Kinergy 4S2 H750',
    price: 83.49,
    quantity: 4,
    size: '195/60R15 88V BSW',
    sku: '500AA',
    image:
      'https://www.tires-easy.com/medias/sys_master/images/images/h03/hec/9124572332062/hankook-kinergy-4s2-h750.jpg',
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    slowMo: 10,
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1000,800',
  });
  var newPage = await browser.newPage();
  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var tracking =
        '9400109205568' + getRandomInt(100000000, 999999999).toString();
      var date = randomTime(new Date('11/10/2020'), new Date('11/13/2020'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var { receiptURL, chosen, invoice } = tireReceiptGenerator({
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: rebateInfo.itemName,
        quantity: rebateInfo.quantity,
        image: rebateInfo.img,
        sku: rebateInfo.itemNum,
        price: rebateInfo.price,
        size: rebateInfo.size,
      });
      var photoID = uuidv4();
      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script
        await newPage.bringToFront();
        await newPage.goto(
          'https://hankookrebates.com/HankookRebate/Rebate.aspx?rebate_campaign_seq=vKD4LWUL0Wk%3d&strDate=aCZx%2bAWaC4i9c9q2sTn1kgIMLMV%2fHcVa&endDate=RZZQmFGZU%2fyNSvOWNVAEEYXPwCK2l3u5&code=n4iybVVl2Ns%3d',
          {
            waitUntil: 'networkidle0',
          }
        );
        await newPage.type('#txtdate', date);
        await newPage.click(
          '#ProductCheckbox > li:nth-child(1) > input[type=radio]'
        );

        // Upload img
        let fileInput = await newPage.$('input[type=file]');
        await newPage.waitFor(1000);
        await fileInput.uploadFile(`images/${photoID}.png`);
        await newPage.waitFor(1000);
        await newPage.click('#next');

        // Skip survey
        await newPage.waitFor(1000);
        await newPage.click('#next');

        //Enter info
        await newPage.waitFor(1000);
        await newPage.waitForSelector('#drpPurchase');
        await newPage.select('#drpPurchase', 'Online');

        await newPage.type('#txtWebName', chosen + '.com');
        await newPage.type('#txtConfirmationNumber', invoice);
        await newPage.type('#txtTrackingNumber', tracking);
        await newPage.type('#fname', fullName.split(' ')[0]);
        await newPage.type('#Lname', fullName.split(' ')[1]);
        await newPage.type('#Addresstxt', address);
        await newPage.type('#Addresstxt2', address2);
        await newPage.type('#citytxt', city);

        //#txtstate
        var fullState = abbrState(stateAbbr, 'name');
        var stateValue = await newPage.evaluate((fullState) => {
          return Array.from(document.querySelector('#txtstate').options).filter(
            (option) => option.innerText == fullState
          )[0].value;
        }, fullState);
        await newPage.select('#txtstate', stateValue);

        await newPage.type('#ZipCode', zip);
        await newPage.type('#Phoneno', phone);
        await newPage.type('#emailtxt', email);
        await newPage.click('#optionalchk');
        await newPage.click('#finish');

        // Captcha
        await newPage.waitFor(2000);
        await newPage.solveRecaptchas();

        // Submit
        await newPage.click('#btnSubmitRebate');
        await newPage.waitFor(5000);

        // Send Reponse
        let finalImage = await newPage.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: 'No addition info',
          image: imgurPost.data.data.link,
        });

        for (let index = 0; index < rebateInfo.rebatePrice; index++) {
          await removeCredit(req.body.key);
        }

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.get('/grainger', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
    company,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/grainger.html`).toString();
  var $ = cheerio.load(rawHtml);

  price = parseFloat(req.query.price);
  quantity = parseInt(quantity);
  var lastFour = getRandomInt(1000, 9999).toString();
  var totalPrice = price * quantity;
  var totalPrice = totalPrice.toFixed(2);
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $("span[id=':su']").text(
    `${new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })}, 3:36 PM (1 day ago)`
  );
  $("h2[id=':tg']").text(
    `Grainger Online Order Confirmation #${invoiceNum} / P.O. #WEB${
      invoiceNum + 564738
    }`
  );
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td > div:nth-child(3) > strong:nth-child(1)'
  ).text(`Hello ${fullName},`);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > td:nth-child(1) > div:nth-child(1) > span'
  ).text(invoiceNum);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > td:nth-child(1) > div:nth-child(3) > span'
  ).text(`${invoiceNum + 564738}`);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > td:nth-child(1) > div:nth-child(4) > span'
  ).text(fullName.toUpperCase());
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(10) > tbody > tr > th:nth-child(9) > table:nth-child(3) > tbody > tr > td:nth-child(1) > div'
  ).replaceWith(
    `<divstyle="font-family:Arial,Helvetica,sans-serif;color:#29333b;font-size:12px;line-height:12px;text-align:left;font-weight:normal"><strong>VISA</strong> ****${lastFour}</div>`
  );
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(10) > tbody > tr > th:nth-child(1) > div:nth-child(3) > strong'
  ).text('$' + totalPrice);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(10) > tbody > tr > th:nth-child(1) > div:nth-child(5) > strong'
  ).text('$' + tax);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(10) > tbody > tr > th:nth-child(1) > table:nth-child(7) > tbody > tr > td:nth-child(2) > div > strong'
  ).text('$' + taxPrice);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(1) > table > tbody > tr > td:nth-child(1) > a > img'
  ).attr('src', image);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(1) > table > tbody > tr > td:nth-child(2) > div:nth-child(1)'
  ).text(company.toUpperCase() || '');
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(1) > table > tbody > tr > td:nth-child(2) > div:nth-child(3) > a'
  ).text(itemName);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(1) > table > tbody > tr > td:nth-child(2) > div:nth-child(5) > a > strong'
  ).text(sku);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(1) > table > tbody > tr > td:nth-child(2) > div:nth-child(7) > strong'
  ).text('$' + price);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(5) > div:nth-child(1) > strong'
  ).text('$' + totalPrice);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > th:nth-child(5) > div:nth-child(3) > strong'
  ).text(quantity);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > td:nth-child(1) > div:nth-child(5) > span'
  ).text(date.toString());
  res.send($.html());
});

app.get('/oreilly', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
    company,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/oreilly.html`).toString();
  var $ = cheerio.load(rawHtml);
  price = parseFloat(req.query.price);
  quantity = parseInt(quantity);
  var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
  var lastFour = getRandomInt(1000, 9999).toString();
  var totalPrice = price * quantity;
  totalPrice = totalPrice.toFixed(2);
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $("span[id=':yu']").text(
    `${new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })}, 3:36 PM (1 day ago)`
  );
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(3) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td'
  ).replaceWith(
    `<td align="left" style="color:rgb(48,48,48);line-height:19px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;text-decoration:none" valign="top">Order# K${invoiceNum} is processing, placed on<strong> ${new Date(
      date
    ).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })}</strong>.</td>`
  );
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > th:nth-child(2) > span:nth-child(1)'
  ).text(company);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > th:nth-child(2) > span:nth-child(3)'
  ).text(itemName);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > th:nth-child(2) > span:nth-child(4)'
  ).text(sku);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > th:nth-child(3) > table > tbody > tr > th > table > tbody > tr > td:nth-child(1)'
  ).text(`Qty: ${quantity}`);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > th:nth-child(3) > table > tbody > tr > th > table > tbody > tr > td:nth-child(3) > strong'
  ).text('$' + totalPrice);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(3)'
  ).text('$' + totalPrice);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(6) > td > table > tbody > tr > td:nth-child(3)'
  ).text('$' + tax);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td:nth-child(3) > strong'
  ).text('$' + taxPrice);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td'
  ).text(fullName);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td'
  ).text(`${address}, ${address2}`);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td'
  ).text(`${city}, ${stateAbbr} ${zip}`);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > span > a'
  ).text(phone);
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr > th:nth-child(3) > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > span'
  ).text(
    `${cards[
      Math.floor(Math.random() * cards.length)
    ].toUpperCase()} - ${lastFour}`
  );
  $(
    'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(11) > td > table > tbody > tr > td:nth-child(1) > a > img'
  ).attr('src', image);

  await res.send($.html());
});

app.get('/staples', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/Staples.html`).toString();
  var $ = cheerio.load(rawHtml);
  price = parseFloat(req.query.price);
  quantity = parseInt(quantity);
  var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
  var lastFour = getRandomInt(1000, 9999).toString();
  var shipDate = new Date(
    new Date(date).getTime() + getRandomInt(4320, 14400) * 60000
  ).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  var totalPrice = price * quantity;
  totalPrice = totalPrice.toFixed(2);
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $("h2[id=':10d']").text(`Confirmation of Staples Order: #${invoiceNum}`);
  $(
    'div > div.nH.aBy > div > div:nth-child(3) > div.nH.aHU > div > div:nth-child(2) > div > div > div.t0 > div.t1'
  ).text(itemName);
  $(
    'div > div.nH.aBy > div > div:nth-child(3) > div.nH.aHU > div > div:nth-child(2) > div > div > div.t0 > div.yv > div'
  ).text(`Expected by: ${shipDate}`);
  $(
    'div > div.nH.aBy > div > div:nth-child(3) > div.nH.aHU > div > div:nth-child(2) > div > div > div.tZ > div.y7 > div:nth-child(3) > div.tg > div.vU'
  ).text(`$${totalPrice}`);
  $(
    'div > div.nH.aBy > div > div:nth-child(3) > div.nH.aHU > div > div:nth-child(2) > div > div > div.tZ > div.y7 > div:nth-child(2) > div.tg > div.vU'
  ).text(shipDate);
  $(
    'div > div.nH.aBy > div > div:nth-child(3) > div.nH.aHU > div > div:nth-child(2) > div > div > div.tZ > div.y7 > div:nth-child(4) > div.tg > div.vU'
  ).text(itemName);
  $("span[id=':10z']").text(
    `${new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })}, 3:36 PM (1 day ago)`
  );
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > span:nth-child(4)'
  ).text(
    `Date: ${new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })} | 02:36 PM`
  );
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > span:nth-child(6)'
  ).text(`Order#: ${invoiceNum}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > span:nth-child(8)'
  ).replaceWith(
    `<span style="padding:12px">Rewards<span style="font-size:.6em;line-height:0;vertical-align:6px">®</span>#: ${
      invoiceNum + 86493
    }</span>`
  );
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(4) > span:nth-child(4)'
  ).text(fullName);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(4) > span:nth-child(6)'
  ).text(`${address}, ${address2}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(4) > span:nth-child(8)'
  ).text(`${city}, ${stateAbbr} ${zip}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td:nth-child(2) > span > span'
  ).text(
    `Expected Delivery: ${new Date(shipDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })} (1 item)`
  );
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > img'
  ).attr('src', image);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > span:nth-child(1) > a:nth-child(2) > u'
  ).text(itemName);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > span:nth-child(3)'
  ).text(`Item: ${sku}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(1)'
  ).text(`${quantity}@ $${price} each`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2)'
  ).text(`$${totalPrice}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2)'
  ).text(`$${totalPrice}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > span'
  ).text(fullName);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > span'
  ).text(`${address}, ${address2}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td > span'
  ).text(`${city}, ${stateAbbr} ${zip}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(4) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > span'
  ).text(`$${totalPrice}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(4) > table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(2) > span'
  ).text(`$${tax}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(4) > table:nth-child(1) > tbody > tr:nth-child(5) > td:nth-child(2) > span'
  ).text(`$${taxPrice}`);
  $(
    'div:nth-child(2) > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > span'
  ).text(
    `${cards[
      Math.floor(Math.random() * cards.length)
    ].toUpperCase()} ending in ${lastFour}: $${taxPrice}`
  );
  res.send($.html());
});

app.post('/energizer', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.25,
    products: [
      {
        name:
          'Energizer - Recharge Power Plus Rechargeable AA Batteries (4-Pack)',
        sku: '3702620',
        price: 11.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3702/3702620_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name:
          'Energizer - Recharge Power Plus Rechargeable AA Batteries (8-Pack)',
        sku: '6621658',
        price: 26.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6621/6621658_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name:
          'Energizer - Recharge Power Plus Rechargeable AAA Batteries (4-Pack)',
        sku: '4534917',
        price: 14.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4534/4534917_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name: 'Energizer - MAX AAA Batteries (24-Pack)',
        sku: '2129095',
        price: 19.49,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/2129/2129095_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name: 'Energizer - MAX C Batteries (8-Pack)',
        sku: '7943489',
        price: 12.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/7943/7943489_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name: 'Energizer - MAX D Batteries (8-Pack)',
        sku: '7943498',
        price: 13.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/7943/7943498_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name: 'Energizer - MAX AA Batteries (16-Pack)',
        sku: '2088486',
        price: 13.94,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/2088/2088486_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name: 'Energizer - Ultimate Lithium AA Batteries (12-Pack)',
        sku: '5900935',
        price: 16.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5900/5900935_sd.jpg;maxHeight=300;maxWidth=450',
      },
      {
        name: 'Energizer - 123 Batteries (12-Pack)',
        sku: '5598901',
        price: 30.99,
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5598/5598901_sd.jpg;maxHeight=300;maxWidth=450',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('10/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      //      var receiptChoices = ["besybuydetails"]
      var receiptChoices = ['besybuydetails'];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var amount = getRandomInt(4, 8) + 1;
      console.log(amount);
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: 'Energizer',
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script

        await newPage.bringToFront();
        await newPage.goto('https://holiday5.energizer.com/', {
          waitUntil: 'networkidle0',
        });
        await newPage.type('#Email_Identifier', email);
        await newPage.waitFor(500);
        await newPage.$eval('input[value="Register Now"]', (el) =>
          el.scrollIntoView()
        );
        await newPage.click('input[value="Register Now"]');
        await newPage.waitFor(1500);
        //Fill Info
        await newPage.waitForSelector('#User_FirstName');
        await newPage.type('#User_FirstName', fullName.split(' ')[0]);
        await newPage.type('#User_LastName', fullName.split(' ')[1]);
        await newPage.type('#User_Address_Address1', address);
        await newPage.type('#User_Address_City', city);
        await newPage.select('#state', stateAbbr);
        await newPage.type('#User_Address_PostalCode', zip);
        await newPage.type('#User_Phone', phone);
        await newPage.select(
          '#PL_User_Birthdate_month',
          birthday.split('/', 3)[0]
        );
        await newPage.select(
          '#PL_User_Birthdate_day',
          birthday.split('/', 3)[1]
        );
        await newPage.select(
          '#PL_User_Birthdate_year',
          birthday.split('/', 3)[2]
        );
        await newPage.click('#user-agree-to-rules-label');

        //Captcha
        var imgs = await newPage.$eval('img[pl-tag="refreshCaptcha"]', (imgs) =>
          imgs.getAttribute('src')
        );
        var img = await axios.get(imgs, { responseType: 'arraybuffer' });
        var baseImg = Buffer.from(img.data, 'binary').toString('base64');
        var response = await captcha.solve({
          image: baseImg,
          maxAttempts: 60,
        });
        await newPage.type('#captcha-value', response.text);
        await newPage.$eval('#btn-submit', (el) => el.scrollIntoView());
        await newPage.click('#btn-submit');
        await newPage.waitFor(4500);

        //Continue
        await newPage.waitForSelector(`a[href="/en-us/Upload"]`);
        await newPage.$eval(`a[href="/en-us/Upload"]`, (el) =>
          el.scrollIntoView()
        );
        await newPage.click(`a[href="/en-us/Upload"]`);

        // Upload file
        await newPage.waitForSelector('input[type=file]');
        let fileInput = await newPage.$('input[type=file]');
        await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
        await newPage.waitFor(10500);

        await newPage.select('#Retailer', 'Other');
        await newPage.$eval('#btn-preview', (el) => el.scrollIntoView());
        await newPage.click('#btn-preview');

        //Submit
        await newPage.waitForSelector('#btn-submit');
        await newPage.evaluate(() => {
          document.querySelector('#CertifyOwner_label').click();
          document.querySelector('#gift-1').click();
          document.querySelector('#btn-submit').click();
        });
        await newPage.waitFor(9500);
        //Send Reponse
        let finalImage = await newPage.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Use ${email} on https://holiday5.energizer.com/ to check rebate status`,
          image: imgurPost.data.data.link,
        });

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.get('/parkers', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
    items,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/Parkers.html`).toString();
  var $ = cheerio.load(rawHtml);

  var shipDate = new Date(
    new Date(date).getTime() + getRandomInt(4320, 14400) * 60000
  ).toLocaleDateString('en-US', {
    month: 'numeric',
    day: '2-digit',
    year: 'numeric',
  });
  var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
  var lastFour = getRandomInt(1000, 9999).toString();
  var totalPrice = price * quantity;
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > span'
  ).text(invoiceNum);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td:nth-child(1) > span:nth-child(3)'
  ).text(invoiceNum);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td:nth-child(1) > span:nth-child(5)'
  ).text(date);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td:nth-child(2) > span:nth-child(12)'
  ).text(shipDate);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(1) > span:nth-child(1)'
  ).text(fullName);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(1) > span:nth-child(3) > span:nth-child(1)'
  ).text(`${address}, ${address2}`);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(1) > span:nth-child(3) > span:nth-child(3)'
  ).text(`${city.toUpperCase()}, ${stateAbbr} ${zip} US`);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(1) > a:nth-child(5)'
  ).text(phone);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(1) > a:nth-child(7)'
  ).text(email);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(2) > span'
  ).text(`XXXXXXXXXXXX${lastFour}`);
  $(
    'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(9) > tbody > tr > td:nth-child(2) > span:nth-child(2)'
  ).text(cards[Math.floor(Math.random() * cards.length)].toUpperCase());

  if (items) {
    var products = '';
    var subTotal = 0;
    var totalQty = 0;
    parsedItems = JSON.parse(items);
    parsedItems.forEach((product) => {
      subTotal = subTotal + product.price * product.qty;
      totalQty = totalQty + product.qty;
      productTotal = product.price * product.qty;
      products += `<tr><td width="65%" valign="top" class="m_6186390161206442583MobileBlock m_6186390161206442583MobileFullWidth" style="padding:20px 20px 20px 20px"><table width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="width:84px;padding-top:5px"><img src="${product.img}" width="84" height="84" style="display:block;width:100%;height:auto" class="CToWUd"></td><td style="padding-left:26px" valign="top"> <b>SKU:</b><a href="" target="_blank" data-saferedirecturl="">${product.sku}</a><br><span>${product.name}</span><br><br>FREE SHIP TO STORE<br><br></td></tr></tbody></table></td><td width="35%" valign="top" class="m_6186390161206442583MobileBlock m_6186390161206442583MobileFullWidth" style="padding:20px 20px 20px 20px"><table width="100%" cellpadding="0" cellspacing="0"> <tbody> <tr> <td valign="top"> Price: </td> <td align="right"> <strong> $${product.price} </strong> </td> </tr> <tr> <td valign="top"> Qty: </td> <td align="right"> ${product.qty} </td> </tr> <tr> <td valign="top"> <b>Total:</b> </td> <td align="right"> <b>$${productTotal}</b> </td> </tr> </tbody> </table> </td> </tr>`;
    });
    var tax = parseFloat(
      gettax(abbrState(stateAbbr, 'name')) * subTotal
    ).toFixed(2);
    var taxPrice = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr'
    ).remove();
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody'
    ).append(products);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(16) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)'
    ).text('$' + subTotal);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(16) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)'
    ).text('$' + tax);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(16) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)'
    ).text('$' + taxPrice);
  } else {
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > img'
    ).attr('src', image);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > a'
    ).text(sku);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > span'
    ).text(itemName);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > strong'
    ).text('$' + price);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)'
    ).text(quantity);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(14) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > b'
    ).text('$' + totalPrice);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(16) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)'
    ).text('$' + totalPrice);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(16) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)'
    ).text('$' + tax);
    $(
      'div:nth-child(2) > table:nth-child(2) > tbody > tr > td > div > table > tbody > tr > td > table:nth-child(16) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)'
    ).text('$' + taxPrice);
  }

  res.send($.html());
});

app.get('/sutherlands', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
    items,
    company,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/Sutherlands.html`).toString();
  var $ = cheerio.load(rawHtml);

  var totalPrice = price * quantity;
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $('#dropdown-account > span:nth-child(2)').text(fullName);
  $(
    '#app > div > main > div.row > div.col-md-9 > div.card > div.card-body > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2) > b'
  ).text(invoiceNum);
  $(
    '#app > div > main > div.row > div.col-md-9 > div.card > div.card-body > div > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2)'
  ).text(
    `${new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })} ${new Date().getHours()}:${new Date().getMinutes()} pm`
  );

  if (items) {
    var products = '';
    var subTotal = 0;
    var totalQty = 0;
    parsedItems = JSON.parse(items);
    parsedItems.forEach((product) => {
      subTotal = subTotal + product.price * product.qty;
      totalQty = totalQty + product.qty;
      productTotal = product.price * product.qty;
      products += `<li class="list-group-item align-items-start"> <div class="row w-100"> <div class="col-12 col-md-8"> <div class="row w-100 m-0 product-row"> <div class="col-md-6 col-sm-12"> <a href="https://sutherlands.com/products/item/6596225/yard-misc-black-molded-air-channel-suspenders"> <img src="${
        product.img
      }" alt="Black Molded Air-Channel Suspenders " title="Black Molded Air-Channel Suspenders " class="img-fluid"> </a> </div> <div class="col-md-6 col-sm-12 text-sm-left text-center"> <span>${
        product.company || ''
      }</span> <a href="https://sutherlands.com/products/item/6596225/yard-misc-black-molded-air-channel-suspenders"> <h4 class="card-title">${
        product.name
      }</h4> </a> </div> <div class="col-md-6"> <dl class="list-inline"> <dt class="list-inline-item">Mfg.# </dt> <dd class="list-inline-item">${invoiceNum
        .toString()
        .substring(
          0,
          3
        )}</dd> </dl> </div> <div class="col-6"> <dl class="list-inline"> <dt class="list-inline-item">Sku# </dt> <dd class="list-inline-item">${
        product.sku
      }</dd> </dl> </div> <div class="col-6 offset-6 text-right"> <span>${
        product.qty
      } @ </span> <span class="results_pricing">$${
        product.price
      }</span> <span class="fineprint"> /EA</span> </div> </div> </div> <div class="col-12 col-md-4 text-center"> </div> </div> </li>`;
    });
    var tax = parseFloat(
      gettax(abbrState(stateAbbr, 'name')) * subTotal
    ).toFixed(2);
    var taxPrice = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
    $('#app > div > main > div.row > div.col-md-9 > ul > li').remove();
    $('#app > div > main > div.row > div.col-md-9 > ul').append(products);
    $(
      '#app > div > main > div.row > div.col-md-9 > div.card-footer > dl > dd:nth-child(2)'
    ).text('$' + subTotal);
    $(
      '#app > div > main > div.row > div.col-md-9 > div.card-footer > dl > dd:nth-child(6)'
    ).text('$' + tax);
    $(
      '#app > div > main > div.row > div.col-md-9 > div.card-footer > dl > dd:nth-child(8)'
    ).text('$' + taxPrice);
  } else {
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div:nth-child(1) > a > img'
    ).attr('src', image);
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div.col-md-6.col-sm-12.text-sm-left.text-center > span'
    ).text(company);
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div.col-md-6.col-sm-12.text-sm-left.text-center > a > h4'
    ).text(itemName);
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div:nth-child(4) > dl > dd'
    ).text(sku);
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div:nth-child(3) > dl > dd'
    ).text(invoiceNum.toString().substring(0, 3));
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div.col-6.offset-6.text-right > span:nth-child(1)'
    ).text(`${quantity} @`);
    $(
      '#app > div > main > div.row > div.col-md-9 > ul > li > div > div.col-12.col-md-8 > div > div.col-6.offset-6.text-right > span.results_pricing'
    ).text('$' + price);
    $(
      '#app > div > main > div.row > div.col-md-9 > div.card-footer > dl > dd:nth-child(2)'
    ).text('$' + totalPrice);
    $(
      '#app > div > main > div.row > div.col-md-9 > div.card-footer > dl > dd:nth-child(6)'
    ).text('$' + tax);
    $(
      '#app > div > main > div.row > div.col-md-9 > div.card-footer > dl > dd:nth-child(8)'
    ).text('$' + taxPrice);
  }

  res.send($.html());
});

app.get('/parr', async (req, res) => {
  var {
    fullName,
    email,
    phone,
    address,
    address2,
    city,
    stateAbbr,
    zip,
    date,
    invoiceNum,
    itemName,
    quantity,
    image,
    sku,
    price,
    size,
    items,
  } = req.query;
  var rawHtml = fs.readFileSync(`${__dirname}/Parr.html`).toString();
  var $ = cheerio.load(rawHtml);

  var totalPrice = price * quantity;
  var tax = parseFloat(
    gettax(abbrState(stateAbbr, 'name')) * totalPrice
  ).toFixed(2);
  var taxPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  $('#m_-8016512442858349917body_content_inner > p:nth-child(1)').text(
    `Hey ${fullName}`
  );
  $('#m_-8016512442858349917body_content_inner > p:nth-child(2) > span').text(
    invoiceNum
  );
  $('#m_-8016512442858349917body_content_inner > h2 > span:nth-child(1)').text(
    invoiceNum
  );
  $('#m_-8016512442858349917body_content_inner > h2 > span:nth-child(2)').text(
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })
  );
  $(
    '#m_-8016512442858349917addresses > tbody > tr > td > address > span:nth-child(1)'
  ).text(fullName);
  $(
    '#m_-8016512442858349917addresses > tbody > tr > td > address > span:nth-child(3)'
  ).text(`${address}, ${address2}`);
  $(
    '#m_-8016512442858349917addresses > tbody > tr > td > address > span:nth-child(5)'
  ).text(`${city.toUpperCase()}, ${stateAbbr} ${zip}`);
  $(
    '#m_-8016512442858349917addresses > tbody > tr > td > address > span:nth-child(7)'
  ).text(phone);
  $('#m_-8016512442858349917addresses > tbody > tr > td > address > a').text(
    email
  );

  if (items) {
    var products = '';
    var subTotal = 0;
    var totalQty = 0;
    parsedItems = JSON.parse(items);
    parsedItems.forEach((product) => {
      subTotal = subTotal + product.price * product.qty;
      totalQty = totalQty + product.qty;
      productTotal = product.price * product.qty;
      products += `<tr><td style="color:#737373;border:1px solid #e4e4e4;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;word-wrap:break-word">${product.name}</td> <td style="color:#737373;border:1px solid #e4e4e4;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">${product.qty}</td><td style="color:#737373;border:1px solid #e4e4e4;padding:12px;text-align:left;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif"><span><span>$</span><span>${productTotal}</span></span></td></tr>`;
    });
    $('#removeME').remove();
    $('#m_-8016512442858349917body_content_inner > div > table > tbody').append(
      products
    );
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tfoot > tr:nth-child(1) > td > span > span:nth-child(2)'
    ).text(subTotal);
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tfoot > tr:nth-child(3) > td > span > span:nth-child(2)'
    ).text(subTotal);
  } else {
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tbody > tr > td:nth-child(1)'
    ).text(itemName);
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tbody > tr > td:nth-child(2)'
    ).text(quantity);
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tbody > tr > td:nth-child(3) > span > span:nth-child(2)'
    ).text(totalPrice);
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tfoot > tr:nth-child(1) > td > span > span:nth-child(2)'
    ).text(totalPrice);
    $(
      '#m_-8016512442858349917body_content_inner > div > table > tfoot > tr:nth-child(3) > td > span > span:nth-child(2)'
    ).text(totalPrice);
  }

  res.send($.html());
});

app.post('/johnson', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.25,
  };
  puppeteer.use(StealthPlugin());

  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );

  var browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    args: [
      '--window-size=1280,720',
      '--proxy-server=http://34.195.20.123:31112',
    ],

    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&headless=false&--proxy-server=http://5.79.66.2.1:13010&--window-size=1000,800',
  });
  var newPage = await browser.newPage();

  var page = await browser.newPage();
  await newPage.setRequestInterception(true);

  newPage.on('request', (req) => {
    if (
      req.resourceType() == 'stylesheet' ||
      req.resourceType() == 'font' ||
      req.resourceType() == 'image'
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  //await newPage.emulate(iPhonex);
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      const products = JSON.parse(fs.readFileSync('bandaids.json')).products;
      var totalPrice = 0;
      var purchased = [];
      do {
        var item = products[Math.floor(Math.random() * products.length)];
        item.qty = Math.floor(Math.random() * getRandomInt(1, 3)) + 1;
        purchased.push(item);
        totalPrice = totalPrice + item.price * item.qty;
        products.splice(products.indexOf(item), 1);
      } while (totalPrice <= getRandomInt(30, 50));

      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('10/18/20'), new Date(), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var receiptURL = `http://localhost:8000/besybuydetails?fullName=${fullName}&address=${address}&city=${city}&stateAbbr=${stateAbbr}&zip=${zip}&date=${date}&invoiceNum=${new Date()
        .getTime()
        .toString()
        .substring(0, 8)}&array=${encodeURIComponent(
        JSON.stringify(purchased)
      )}`;
      var photoID = uuidv4();
      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });

        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: 'No addition info',
          image: imgurPost.data.data.link,
        });

        await removeCreditz(req.body.key);
        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

app.post('/neutrogena', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.5,
    itemName: '',
    price: 0,
    quantity: 0,
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    args: ['--proxy-server=http://34.195.20.123:31112'],

    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&headless=false&--proxy-server=http://34.195.20.123:31112&--window-size=1000,800',
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      const products = JSON.parse(fs.readFileSync('neutrogena.json')).products;
      var totalPrice = 0;
      var purchased = [];
      do {
        var item = products[Math.floor(Math.random() * products.length)];
        item.qty = getRandomInt(1, 3) + 1;
        purchased.push(item);
        totalPrice = totalPrice + item.price * item.qty;
        products.splice(products.indexOf(item), 1);
      } while (totalPrice <= getRandomInt(30, 50));

      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date(), new Date(), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var receiptURL = `http://localhost:8000/walmartmulti?fullName=${fullName}&address=${address}&city=${city}&stateAbbr=${stateAbbr}&zip=${zip}&date=${date}&invoiceNum=${new Date()
        .getTime()
        .toString()
        .substring(0, 8)}&array=${encodeURIComponent(
        JSON.stringify(purchased)
      )}`;
      var photoID = uuidv4();
      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script
        await newPage.bringToFront();
        await newPage.goto(
          'https://www2.activaterewards.com/neutrogena/activate?receipt_type=online',
          {
            waitUntil: 'networkidle0',
          }
        );

        // Fill info
        await newPage.waitForSelector(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataFirstName'
        );
        await newPage.click(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataFirstName'
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataFirstName',
          fullName.split(' ')[0]
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataLastName',
          fullName.split(' ')[1]
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataAddress1',
          address
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataCity',
          city
        );
        await newPage.select(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataState',
          stateAbbr
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataPostal',
          zip
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataEmail',
          email
        );
        await newPage.type(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataEmail2',
          email
        );
        await newPage.click(
          '#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataTos'
        );

        //captcha + next
        await newPage.solveRecaptchas();
        await newPage.click(
          '#wrapper > #main > #activationFormWrapper > #ActivationDataActivateForm > .btn'
        );
        await newPage.waitFor(7500);

        // upload file + next
        let fileInput = await newPage.$('input[type=file]');
        await fileInput.uploadFile(`./images/${photoID}.png`);
        await newPage.waitFor(1000);
        await newPage.click('#ActivationDataUploadForm > button');
        await newPage.waitFor(5000);

        //Send Reponse
        let finalImage = await newPage.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: 'No addition info',
          image: imgurPost.data.data.link,
        });

        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});

// END CARTIER WAS HERE

// define the first route
app.get('/', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "July 10, 2020";
    // var subprice = 900;
    // var quantity = 1;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA";
    // var city="Hawthorne";
    // var zip ="90210"
    // var address2 = `${city}, ${state} ${zip}`

    // var item =req.body["item"];
    // var stringDate = req.body["date"];
    // var subprice = req.body["subprice"];
    // var quantity = req.body["quantity"];
    // var sellerName=req.body['seller']
    // var itemName= req.body["itemname"]
    // var fullName= req.body["fullName"]
    // var address = req.body["address"];
    // var state = req.body["stateAbbr"];
    // var city=req.body["city"];
    // var zip =req.body["zip"]
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var quantity = parseInt(req.query.quantity);
    var sellerName = req.query.seller;
    var itemName = req.query.itemname;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var state = req.query.stateAbbr;
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = req.query.subprice;
    subprice = parseFloat(subprice) * quantity;
    subprice = subprice.toFixed(2);
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/invoice3.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();

    var fullState = abbrState(state, 'name');
    var tax = gettax(fullState) * subprice;
    tax = parseFloat(tax).toFixed(2);

    var totalPrice = parseFloat(subprice) + parseFloat(tax);
    totalPrice = totalPrice.toFixed(2);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum =
      getRandomInt(100, 999).toString() +
      '-' +
      getRandomInt(1000000, 9999999).toString() +
      '-' +
      getRandomInt(1000000, 9999999).toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td'
    )['0']['children'][0]['next']['next']['data'] = ' ' + orderNum;
    $('body > center:nth-child(5) > b')['0']['children'][0]['data'] =
      'Final Details for Order #' + orderNum;
    $(
      'body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(1) > td'
    )['0']['children'][0]['next']['next']['data'] = ' ' + stringDate;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > b > center'
    )['0']['children'][0]['data'] = 'Shipped on ' + stringDate;
    $(
      'body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(3) > td > b'
    )['0']['children'][0]['data'] = 'Order Total: $' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(3)'
    )['0']['children']['0']['data'] = '$' + subprice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > i'
    )['0']['children']['0']['data'] = itemName;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > i'
    )['0']['prev']['data'] = quantity + ' of: ';
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > span'
    )['0']['children']['0']['data'] = 'Sold by: ' + sellerName + ' (';
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > div > ul > li.displayAddressLI.displayAddressFullName'
    )['0']['children']['0']['data'] = fullName;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > div > ul > li.displayAddressLI.displayAddressAddressLine1'
    )['0']['children']['0']['data'] = address;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > div > ul > li.displayAddressLI.displayAddressCityStateOrRegionPostalCode'
    )['0']['children']['0']['data'] = address2;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul > li.displayAddressLI.displayAddressFullName'
    )['0']['children']['0']['data'] = fullName;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul > li.displayAddressLI.displayAddressAddressLine1'
    )['0']['children']['0']['data'] = address;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul > li.displayAddressLI.displayAddressCityStateOrRegionPostalCode'
    )['0']['children']['0']['data'] = address2;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + subprice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + subprice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + tax.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(7) > td:nth-child(2) > b'
    )['0']['children']['0']['data'] = '$' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > br:nth-child(3)'
    )[0]['next']['data'] = cardType;

    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > nobr'
    )['0']['children']['0']['data'] = '| Last digits: ' + lastFour;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2)'
    ).remove();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1)'
    )['0']['children']['0']['data'] =
      `${cardType} ending in ${lastFour}: $` + totalPrice.toString();

    res.send($.html());
  })();
});
app.get('/fishing', function (req, res) {
  (async () => {
    console.log(req.query);

    var stringDate = 'July 10, 2020';
    var quantity = 1;
    var sellerName = 'jim smith';
    var itemName = 'poop shit';
    var fullName = 'jake paul';
    var address = '3501 jack ave';
    var state = 'CA';
    var city = 'Hawthorne';
    var zip = '90210';
    var address2 = `${city}, ${state} ${zip}`;

    // var item =req.body["item"];
    // var stringDate = req.body["date"];
    // var subprice = req.body["subprice"];
    // var quantity = req.body["quantity"];
    // var sellerName=req.body['seller']
    // var itemName= req.body["itemname"]
    // var fullName= req.body["fullName"]
    // var address = req.body["address"];
    // var state = req.body["stateAbbr"];
    // var city=req.body["city"];
    // var zip =req.body["zip"]
    // var address2 = `${city}, ${state} ${zip}`

    // var stringDate = req.query.date;
    // var sellerName=req.query.seller
    // var itemName= req.query.itemname
    // var fullName= req.query.fullName
    // var address = req.query.address;
    // var state = req.query.stateAbbr;
    // var city=req.query.city;
    // var zip =req.query.zip
    // var address2 = `${city}, ${state} ${zip}`
    var subprice = 709.94;
    subprice = parseFloat(subprice) * quantity;
    subprice = subprice.toFixed(2);
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/invoice4.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();

    var fullState = abbrState(state, 'name');
    var tax = gettax(fullState) * subprice;
    tax = parseFloat(tax).toFixed(2);

    var totalPrice = parseFloat(subprice) + parseFloat(tax);
    totalPrice = totalPrice.toFixed(2);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum =
      getRandomInt(100, 999).toString() +
      '-' +
      getRandomInt(1000000, 9999999).toString() +
      '-' +
      getRandomInt(1000000, 9999999).toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td'
    )['0']['children'][0]['next']['next']['data'] = ' ' + orderNum;
    $('body > center:nth-child(5) > b')['0']['children'][0]['data'] =
      'Final Details for Order #' + orderNum;
    $(
      'body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(1) > td'
    )['0']['children'][0]['next']['next']['data'] = ' ' + stringDate;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > b > center'
    )['0']['children'][0]['data'] = 'Shipped on ' + stringDate;
    $(
      'body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(3) > td > b'
    )['0']['children'][0]['data'] = 'Order Total: $' + totalPrice.toString();

    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > div > ul > li.displayAddressLI.displayAddressFullName'
    )['0']['children']['0']['data'] = fullName;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > div > ul > li.displayAddressLI.displayAddressAddressLine1'
    )['0']['children']['0']['data'] = address;
    $(
      'body > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > div > ul > li.displayAddressLI.displayAddressCityStateOrRegionPostalCode'
    )['0']['children']['0']['data'] = address2;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul > li.displayAddressLI.displayAddressFullName'
    )['0']['children']['0']['data'] = fullName;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul > li.displayAddressLI.displayAddressAddressLine1'
    )['0']['children']['0']['data'] = address;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul > li.displayAddressLI.displayAddressCityStateOrRegionPostalCode'
    )['0']['children']['0']['data'] = address2;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + subprice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + subprice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + tax.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(7) > td:nth-child(2) > b'
    )['0']['children']['0']['data'] = '$' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > br:nth-child(3)'
    )[0]['next']['data'] = cardType;

    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > nobr'
    )['0']['children']['0']['data'] = '| Last digits: ' + lastFour;
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2)'
    )['0']['children']['0']['data'] = '$' + totalPrice.toString();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2)'
    ).remove();
    $(
      'body > table > tbody > tr > td > table:nth-child(5) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(1)'
    )['0']['children']['0']['data'] =
      `${cardType} ending in ${lastFour}: $` + totalPrice.toString();

    res.send($.html());
  })();
});
app.get('/walmart', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "July 10, 2020";
    // var subprice = 900;
    // var quantity = 1;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA";
    // var city="Hawthorne";
    // var zip ="90210"
    // var address2 = `${city}, ${state} ${zip}`

    // var item =req.body["item"];
    // var stringDate = req.body["date"];
    // var subprice = req.body["subprice"];
    // var quantity = req.body["quantity"];
    // var sellerName=req.body['seller']
    // var itemName= req.body["itemname"]
    // var fullName= req.body["fullName"]
    // var address = req.body["address"];
    // var state = req.body["stateAbbr"];
    // var city=req.body["city"];
    // var zip =req.body["zip"]
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var quantity = parseInt(req.query.quantity);
    var sellerName = req.query.seller;
    var itemName = req.query.itemname;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var state = req.query.stateAbbr;
    var city = req.query.city;
    var zip = req.query.zip;
    var imageurl = req.query.imageurl;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = parseFloat(req.query.subprice);
    var image = await axios.get(imageurl, { responseType: 'arraybuffer' });
    var returnedB64 = Buffer.from(image.data).toString('base64');
    subprice = subprice * quantity;
    subprice = subprice.toFixed(2);
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/walmart.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var unitPrice = subprice;

    var fullState = abbrState(state, 'name');
    var tax = gettax(fullState) * subprice;
    tax = parseFloat(tax).toFixed(2);
    stringDate = new Date(stringDate);
    var totalPrice = parseFloat(subprice) + parseFloat(tax);
    totalPrice = totalPrice.toFixed(2);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = `Order #${getRandomInt(1000000, 9999999)}-${getRandomInt(
      100000,
      999999
    )}`;
    var quantityString;
    var currDate = `${stringDate.toLocaleString('default', {
      month: 'long',
    })} ${stringDate.getDate()}, ${stringDate.getFullYear()}`;
    if (quantity > 1) {
      quantityString = `${quantity} items`;
    } else {
      quantityString = `${quantity} item`;
    }
    var shipDate = new Date(stringDate);
    shipDate.setDate(stringDate.getDate() + getRandomInt(3, 6));
    var monthShortNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    $(
      '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > center > b'
    )['0']['children'][0]['data'] = orderNum;
    $(
      '#main-content > div > div.m-margin-top.hide-content-max-m.order-details-breadcrumbs.clearfix > div > nav > ol > class'
    )['0']['children'][0]['data'] = currDate;
    $(
      '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div:nth-child(1) > clear > b > h2'
    )['0']['children'][0]['data'] = currDate;
    $(
      '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div.order-head-split.second > p'
    )['0']['children'][0]['data'] = quantityString;
    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(1)'
    )['0']['children'][0]['data'] = `Subtotal (${quantityString})`;
    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + subprice;
    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul > li > div > div.order-item-left > div.order-item-info > div:nth-child(1) > a'
    )['0']['children'][0]['data'] = itemName;
    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul > li > div > div.order-item-left > div.order-item-info > div.order-info-price-v2.discounted-unit-price > span > span'
    )['0']['children'][0]['data'] = '$' + subprice;
    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + tax;
    $(
      '#main-content > div > div.order-details > div.order-head-v2.flex-action-box.bottom-separator > div.flex-grow-online > div.order-head-split.second > h2'
    )['0']['children'][0]['data'] = '$' + subprice;
    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-left.m-margin-bottom > div > table.order-total > tbody > tr > td:nth-child(2) > h2'
    )['0']['children'][0]['data'] = '$' + totalPrice;
    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul > li > div > div.order-item-left > div.order-item-info > div.order-info-price-v2.discounted-unit-price > span > span > span'
    )['0']['children'][0]['data'] = '$' + unitPrice.toString();

    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-right > p.copy-base-ny.copy-small.no-margin'
    )['0']['children'][0]['data'] = 'Shipping to ' + fullName;
    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-right > div:nth-child(2)'
    )['0']['children'][0]['data'] = address;
    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-right > div:nth-child(3)'
    )['0']['children'][0]['data'] = address2;

    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > div > div > span'
    )['0']['children'][0]['data'] = fullName;
    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > div > div > div > span:nth-child(1)'
    )['0']['children'][0]['data'] = address;
    $(
      '#main-content > div > div.order-details > div.order-summary-v2 > div.summary-right.m-margin-bottom > div > div > div > div > span:nth-child(3)'
    )['0']['children'][0]['data'] = address2;

    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > div > div.shipment-status-status > div:nth-child(1) > div:nth-child(1) > div > div.order-status > div > h2 > span.font-bold'
    )['0']['children'][0]['data'] = `${shipDate
      .toLocaleString('en-us', { weekday: 'long' })
      .substr(0, 3)}, ${
      monthShortNames[shipDate.getMonth()]
    } ${shipDate.getDate()}`;
    $(
      '#main-content > div > div.order-details > div:nth-child(2) > div > ul > li > ul > li > div > div.order-item-left > div.product-image > a > img'
    )['0']['attribs']['src'] = 'data:image/jpeg;base64,' + returnedB64;

    res.send($.html());
  })();
});
app.get('/lowes', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "July 10, 2020";
    // var subprice = 900;
    // var quantity = 1;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA";
    // var city="Hawthorne";
    // var zip ="90210"
    // var address2 = `${city}, ${state} ${zip}`

    // var item =req.body["item"];
    // var stringDate = req.body["date"];
    // var subprice = req.body["subprice"];
    // var quantity = req.body["quantity"];
    // var sellerName=req.body['seller']
    // var itemName= req.body["itemname"]
    // var fullName= req.body["fullName"]
    // var address = req.body["address"];
    // var state = req.body["stateAbbr"];
    // var city=req.body["city"];
    // var zip =req.body["zip"]
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var state = req.query.stateAbbr;
    var city = req.query.city;
    var email = req.query.email;
    var zip = req.query.zip;
    var company = req.query.company;
    var stringDate = req.query.date;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = 18064;
    subprice = subprice;
    subprice = subprice.toFixed(2);
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/lowes.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var unitPrice = subprice;

    var fullState = abbrState(state, 'name');
    var tax = gettax(fullState) * subprice;
    tax = parseFloat(tax).toFixed(2);
    stringDate = new Date(stringDate);
    var totalPrice = parseFloat(subprice) + parseFloat(tax);
    totalPrice = totalPrice.toFixed(2);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = ` 85030${getRandomInt(1000, 9999)}`;
    var invoiceNum = ` 73${getRandomInt(100, 999)}`;
    var quantityString;
    var currDate = `${stringDate.toLocaleString('default', {
      month: 'long',
    })} ${stringDate.getDate()}, ${stringDate.getFullYear()}`;

    var dd = String(stringDate.getDate()).padStart(2, '0');
    var mm = String(stringDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = stringDate.getFullYear();

    stringDate = mm + '/' + dd + '/' + yyyy;

    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > p:nth-child(5) > span'
    )['0']['children'][0]['data'] = invoiceNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > p:nth-child(4) > span'
    )['0']['children'][0]['data'] = orderNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > span:nth-child(1)'
    )['0']['children'][0]['data'] = company;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > span:nth-child(3)'
    )['0']['children'][0]['data'] = fullName;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > span:nth-child(5)'
    )['0']['children'][0]['data'] = `(${getRandomInt(
      100,
      999
    ).toString()}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > a'
    )['0']['children'][0]['data'] = email;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(1) > th:nth-child(2)'
    )['0']['children'][0]['data'] = orderNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(2) > th:nth-child(2)'
    )['0']['children'][0]['data'] = invoiceNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(3) > th:nth-child(2)'
    )['0']['children'][0]['data'] = stringDate;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(5) > th:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + subprice;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(7) > th:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + tax;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(8) > th:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + totalPrice;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(9) > th:nth-child(2) > span'
    )['0']['children'][0][
      'data'
    ] = `${cardType} ending in ${lastFour} $${totalPrice}`;

    res.send($.html());
  })();
});
app.get('/dicks', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "July 10, 2020";
    // var subprice = 900;
    // var quantity = 1;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA";
    // var city="Hawthorne";
    // var zip ="90210"
    // var address2 = `${city}, ${state} ${zip}`

    // var item =req.body["item"];
    // var stringDate = req.body["date"];
    // var subprice = req.body["subprice"];
    // var quantity = req.body["quantity"];
    // var sellerName=req.body['seller']
    // var itemName= req.body["itemname"]
    // var fullName= req.body["fullName"]
    // var address = req.body["address"];
    // var state = req.body["stateAbbr"];
    // var city=req.body["city"];
    // var zip =req.body["zip"]
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var state = req.query.stateAbbr;
    var city = req.query.city;
    var email = req.query.email;
    var zip = req.query.zip;
    var company = req.query.company;
    var stringDate = req.query.date;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = 79.99;
    subprice = subprice;
    subprice = subprice.toFixed(2);
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/dicks.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var unitPrice = subprice;
    var firstName = fullName.split(' ').slice(0, -1).join(' ');
    var lastName = fullName.split(' ').slice(-1).join(' ');
    var fullState = abbrState(state, 'name');
    var tax = gettax(fullState) * subprice;
    tax = parseFloat(tax).toFixed(2);
    stringDate = new Date(stringDate);
    var totalPrice = parseFloat(subprice) + parseFloat(tax);
    totalPrice = totalPrice.toFixed(2);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = ` 826482${getRandomInt(10000, 99999)}`;
    var invoiceNum = ` 73${getRandomInt(100, 999)}`;
    var quantityString;
    var currDate = `${stringDate.toLocaleString('default', {
      month: 'long',
    })} ${stringDate.getDate()}, ${stringDate.getFullYear()}`;

    var dd = String(stringDate.getDate()).padStart(2, '0');
    var mm = String(stringDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = stringDate.getFullYear();

    stringDate = mm + '/' + dd + '/' + yyyy;

    $(
      '#app-container > app-confirmation > div > div > div > div:nth-child(1) > div > app-confirmation-message > p.message-text.message-text--order-num'
    )['0']['children'][0]['data'] = `Order Number: ${orderNum}`;
    $(
      '#app-container > app-confirmation > div > div > div > div:nth-child(1) > div > app-confirmation-message > h4'
    )['0']['children'][0]['data'] = `Thank you for your order, ${firstName}`;
    $(
      '#app-container > app-confirmation > div > div > div > div:nth-child(1) > div > app-confirmation-message > p.message-text.my-4 > b'
    )['0']['children'][0]['data'] = `${email}`;
    $('#contactDetails > p:nth-child(2)')['0']['children'][0][
      'data'
    ] = `${fullName}`;
    $('#contactDetails > p:nth-child(3)')['0']['children'][0][
      'data'
    ] = `(${getAreaCode()}) ${getRandomInt(100, 999)}-${getRandomInt(
      1000,
      9999
    )}`;
    $('#billingAddress > p.mb-0.contact-details-text')['0']['children'][0][
      'data'
    ] = `${address} ${address2}`;
    $(
      '#shippingDeliveryMethods > div > div:nth-child(1) > p.mb-0.contact-details-text.ng-star-inserted'
    )['0']['children'][0]['data'] = `${address} ${address2}`;
    $(
      '#app-container > app-confirmation > div > div > div > div:nth-child(2) > div > div > div > app-order-pricing-summary > div > app-line-item:nth-child(6) > div > p.line-item-text.offset-1.col-2.ml-auto > span'
    )['0']['children'][0]['data'] = `$${tax}`;
    $(
      '#app-container > app-confirmation > div > div > div > div:nth-child(2) > div > div > div > app-order-pricing-summary > div > app-line-item:nth-child(10) > div > p.line-item-text.offset-1.col-2.ml-auto.line-item-text--total.line-item-text--bold > span'
    )['0']['children'][0]['data'] = `$${totalPrice}`;

    res.send($.html());
  })();
});
app.get('/repair', function (req, res) {
  (async () => {
    console.log(req.query);

    var stringDate = req.query.date;
    // var stringDate = "July 10, 2020";

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/repair.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    stringDate = new Date(stringDate);

    var quantityString;
    var currDate = `${stringDate.toLocaleString('default', {
      month: 'long',
    })} ${stringDate.getDate()}, ${stringDate.getFullYear()}`;

    var dd = String(stringDate.getDate()).padStart(2, '0');
    var mm = String(stringDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = stringDate.getFullYear();
    stringDate = mm + '/' + dd + '/' + yyyy;
    var dates = `${stringDate} ${String(getRandomInt(0, 11)).padStart(
      2,
      '0'
    )}:${String(getRandomInt(0, 59)).padStart(2, '0')} PM`;
    var estimate = `1${getRandomInt(1000, 9999)}`;
    var estimate = `${estimate}`;
    const epa = `CAL0004${getRandomInt(10000, 99999)}`;
    $('body > div > div.text-center > h5:nth-child(6)')['0']['children'][0][
      'data'
    ] = `ARD # 28${getRandomInt(
      1000,
      9999
    )} EPA # ${epa} FAX # 925-757-7276 CELL # 925-529-5946`;
    $('body > div > div.text-center > h5:nth-child(6)')['0']['children'][0][
      'data'
    ] = ` ESTIMATE #${estimate}`;
    $('body > div > div:nth-child(6) > span:nth-child(5)')['0']['children'][0][
      'data'
    ] = ` ESTIMATE #${estimate}`;
    $('body > div > div:nth-child(7) > div')['0']['children'][0]['data'] = `
            A CHARGE HAS BEEN ADDED TO YOUR INVOICE AS PER THE LOCAL HAZARDOUS WASTE REMOVAL ORDIANCE. SECTION 1.1.02A EPA#${epa}      `;
    $('body > div > div:nth-child(3) > p:nth-child(1)')['0']['children'][0][
      'data'
    ] = ` ${dates} PM `;
    $('body > div > div:nth-child(6) > span:nth-child(4)')['0']['children'][0][
      'data'
    ] = ` ${dates} PM `;

    res.send($.html());
  })();
});

app.get('/lowes2', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "July 10, 2020";
    // var subprice = 900;
    // var quantity = 1;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA";
    // var city="Hawthorne";
    // var zip ="90210"
    // var address2 = `${city}, ${state} ${zip}`

    // var item =req.body["item"];
    // var stringDate = req.body["date"];
    // var subprice = req.body["subprice"];
    // var quantity = req.body["quantity"];
    // var sellerName=req.body['seller']
    // var itemName= req.body["itemname"]
    // var fullName= req.body["fullName"]
    // var address = req.body["address"];
    // var state = req.body["stateAbbr"];
    // var city=req.body["city"];
    // var zip =req.body["zip"]
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var state = req.query.stateAbbr;
    var city = req.query.city;
    var email = req.query.email;
    var zip = req.query.zip;
    var company = req.query.company;
    var stringDate = req.query.date;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = 1208.37;
    subprice = subprice;
    subprice = subprice.toFixed(2);
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/lowes2.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var unitPrice = subprice;

    var fullState = abbrState(state, 'name');
    var tax = gettax(fullState) * subprice;
    tax = parseFloat(tax).toFixed(2);
    stringDate = new Date(stringDate);
    var totalPrice = parseFloat(subprice) + parseFloat(tax);
    totalPrice = totalPrice.toFixed(2);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = ` 85030${getRandomInt(1000, 9999)}`;
    var invoiceNum = ` 73${getRandomInt(100, 999)}`;
    var quantityString;
    var currDate = `${stringDate.toLocaleString('default', {
      month: 'long',
    })} ${stringDate.getDate()}, ${stringDate.getFullYear()}`;

    var dd = String(stringDate.getDate()).padStart(2, '0');
    var mm = String(stringDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = stringDate.getFullYear();

    stringDate = mm + '/' + dd + '/' + yyyy;

    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > p:nth-child(5) > span'
    )['0']['children'][0]['data'] = invoiceNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > p:nth-child(4) > span'
    )['0']['children'][0]['data'] = orderNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > span:nth-child(1)'
    )['0']['children'][0]['data'] = company;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > span:nth-child(3)'
    )['0']['children'][0]['data'] = fullName;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > span:nth-child(5)'
    )['0']['children'][0]['data'] = `(${getRandomInt(
      100,
      999
    ).toString()}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(14) > tbody > tr > td > p > a'
    )['0']['children'][0]['data'] = email;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(1) > th:nth-child(2)'
    )['0']['children'][0]['data'] = orderNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(2) > th:nth-child(2)'
    )['0']['children'][0]['data'] = invoiceNum;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(3) > th:nth-child(2)'
    )['0']['children'][0]['data'] = stringDate;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(5) > th:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + subprice;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(7) > th:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + tax;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(8) > th:nth-child(2)'
    )['0']['children'][0]['data'] = '$' + totalPrice;
    $(
      'body > div > div > table.message > tbody > tr > td > table > tbody > tr > td > div > font > div > div > div > table > tbody > tr > td > center > table > tbody > tr > td > table:nth-child(3) > tbody > tr > th:nth-child(1) > table:nth-child(15) > tbody:nth-child(2) > tr:nth-child(9) > th:nth-child(2) > span'
    )['0']['children'][0][
      'data'
    ] = `${cardType} ending in ${lastFour} $${totalPrice}`;

    res.send($.html());
  })();
});
app.get('/discounttire', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "2020-08-15";
    // var subprice = 166.00;
    // var quantity = 4;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState(state, "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var quantity = 4;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = parseInt(req.query.subprice);

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/Discount_Tire.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    console.log(tax);
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = '6' + getRandomInt(10000000, 99999999).toString();
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + 7);
    var phone = getRandomInt(1000000000, 9999999999).toString();
    var days = [
      'Sunday',
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    Date.shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var randYr = 2020 + getRandomInt(1, 5);
    randYr = randYr.toString();
    console.log(tax);
    // $("body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td")["0"]["children"][0]["next"]["next"]["data"]=" "+orderNum;
    $('#id1_1 > p.p2.ft2 > span')['0']['children'][0]['data'] = orderNum;
    $('#id1_1 > p.p3.ft2 > span')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t0 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id2_1 > table.t3 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id3_1 > p')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td2 > p')['0'][
      'children'
    ][0]['data'] = `${days[seven_date.getDay()]}, ${
      Date.shortMonths[seven_date.getMonth()]
    } ${seven_date.getDate()} - 8:00 AM`;
    // $("#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p")["children"][0]["data"]=`jj`
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${fullName}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(3) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(4) > td.tr3.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address2}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p')['0'][
      'children'
    ][0]['data'] = `${email}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(8) > td.tr1.td3 > p > nobr')[
      '0'
    ]['children'][0]['data'] = `${addDashes(phone)}`;
    $('#id1_1 > p.p13.ft14')['0']['children'][0][
      'data'
    ] = `${address} ${city}, ${abbrState(state, 'abbr')} ${zip}`;
    $('#id1_1 > p.p10.ft1')['0']['children'][0]['data'] = `${cardType}`;
    $('#id1_1 > p.p11.ft14 > span.ft12')['0']['children'][0][
      'data'
    ] = `xxxx xxxx ${getRandomInt(1000, 9999).toString()} Exp: ${getRandomInt(
      01,
      12
    ).toString()}/${randYr} `;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0]['data'] = `$`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td11 > p')['0']['children'][0][
      'data'
    ] = `$${subprice}.00`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td12 > p')['0']['children'][0][
      'data'
    ] = `Qty: ${quantity}`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td13 > p')['0']['children'][0][
      'data'
    ] = `Price: $${quantity * subprice}.00`;
    $('#id2_1 > p.p37.ft2 > span')['0']['children'][0]['data'] = `$${
      quantity * subprice
    }.00`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(3) > td.tr11.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${tax}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(6) > td.tr14.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${totalPrice}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(1) > td.tr9.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${subprice * quantity}.00`;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0][
      'data'
    ] = `$${totalPrice}`;
    $('#id1_1 > p.p5.ft4')['0']['children'][2][
      'data'
    ] = ` will be required when you arrive to install your items. An order conformation has been sent to ${email}.`;

    res.send($.html());
  })();
});
app.get('/discounttire2', function (req, res) {
  (async () => {
    console.log(req.query);

    // var item ="Hankook Ventus V12 evo 2 Summer Radial Tire - 225/40R18 Y";
    // var stringDate = "2020-08-15";
    // var subprice = 166.00;
    // var quantity = 4;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState(state, "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city}, ${state} ${zip}`

    var stringDate = req.query.date;
    var quantity = 4;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = parseInt(req.query.subprice);

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/Discount_Tire2.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    console.log(tax);
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = '6' + getRandomInt(10000000, 99999999).toString();
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + 7);
    var phone = getRandomInt(1000000000, 9999999999).toString();
    var days = [
      'Sunday',
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    Date.shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var randYr = 2020 + getRandomInt(1, 5);
    randYr = randYr.toString();
    console.log(tax);
    // $("body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td")["0"]["children"][0]["next"]["next"]["data"]=" "+orderNum;
    $('#id1_1 > p.p2.ft2 > span')['0']['children'][0]['data'] = orderNum;
    $('#id1_1 > p.p3.ft2 > span')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t0 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id2_1 > table.t3 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id3_1 > p')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td2 > p')['0'][
      'children'
    ][0]['data'] = `${days[seven_date.getDay()]}, ${
      Date.shortMonths[seven_date.getMonth()]
    } ${seven_date.getDate()} - 8:00 AM`;
    // $("#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p")["children"][0]["data"]=`jj`
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${fullName}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(3) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(4) > td.tr3.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address2}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p')['0'][
      'children'
    ][0]['data'] = `${email}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(8) > td.tr1.td3 > p > nobr')[
      '0'
    ]['children'][0]['data'] = `${addDashes(phone)}`;
    $('#id1_1 > p.p13.ft14')['0']['children'][0][
      'data'
    ] = `${address} ${city}, ${abbrState(state, 'abbr')} ${zip}`;
    $('#id1_1 > p.p10.ft1')['0']['children'][0]['data'] = `${cardType}`;
    $('#id1_1 > p.p11.ft14 > span.ft12')['0']['children'][0][
      'data'
    ] = `xxxx xxxx ${getRandomInt(1000, 9999).toString()} Exp: ${getRandomInt(
      01,
      12
    ).toString()}/${randYr} `;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0]['data'] = `$`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td11 > p')['0']['children'][0][
      'data'
    ] = `$${subprice}.00`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td12 > p')['0']['children'][0][
      'data'
    ] = `Qty: ${quantity}`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td13 > p')['0']['children'][0][
      'data'
    ] = `Price: $${quantity * subprice}.00`;
    $('#id2_1 > p.p37.ft2 > span')['0']['children'][0]['data'] = `$${
      quantity * subprice
    }.00`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(3) > td.tr11.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${tax}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(6) > td.tr14.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${totalPrice}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(1) > td.tr9.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${subprice * quantity}.00`;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0][
      'data'
    ] = `$${totalPrice}`;
    $('#id1_1 > p.p5.ft4')['0']['children'][2][
      'data'
    ] = ` will be required when you arrive to install your items. An order conformation has been sent to ${email}.`;

    res.send($.html());
  })();
});
app.get('/discounttirecustom', function (req, res) {
  (async () => {
    console.log(req.query);

    // var stringDate = "2020-08-15";
    // var subprice = 166.00;
    // var quantity = 4;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA"
    //  state = abbrState(state, "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city}, ${state} ${zip}`
    // var company="ss"
    // var itemName ="tire shit"
    // var size ="tire shit size"
    // var itemNum ="5"

    var stringDate = req.query.date;
    var quantity = 4;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var city = req.query.city;
    var zip = req.query.zip;
    var itemName = req.query.itemName;
    var company = req.query.company;
    var itemNum = req.query.itemNum;
    var size = req.query.size;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = parseInt(req.query.subprice);

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/Discount_Tire3.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    console.log(tax);
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = '6' + getRandomInt(10000000, 99999999).toString();
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + 7);
    var phone = getRandomInt(1000000000, 9999999999).toString();
    var days = [
      'Sunday',
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    Date.shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var randYr = 2020 + getRandomInt(1, 5);
    randYr = randYr.toString();
    console.log(tax);
    // $("body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td")["0"]["children"][0]["next"]["next"]["data"]=" "+orderNum;
    $('#id1_1 > p.p2.ft2 > span')['0']['children'][0]['data'] = orderNum;
    $('#id2_1 > p.p27.ft21')['0']['children'][0]['data'] = company;
    $('#id2_1 > p.p28.ft22')['0']['children'][0]['data'] = itemName;
    $('#id2_1 > p.p29.ft23 > nobr')['0']['children'][0]['data'] = size;
    $('#id2_1 > p.p30.ft24')['0']['children'][0]['data'] = `Item #${itemNum}`;

    $('#id1_1 > p.p3.ft2 > span')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t0 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id2_1 > table.t3 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id3_1 > p')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td2 > p')['0'][
      'children'
    ][0]['data'] = `${days[seven_date.getDay()]}, ${
      Date.shortMonths[seven_date.getMonth()]
    } ${seven_date.getDate()} - 8:00 AM`;
    // $("#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p")["children"][0]["data"]=`jj`
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${fullName}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(3) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(4) > td.tr3.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address2}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p')['0'][
      'children'
    ][0]['data'] = `${email}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(8) > td.tr1.td3 > p > nobr')[
      '0'
    ]['children'][0]['data'] = `${addDashes(phone)}`;
    $('#id1_1 > p.p13.ft14')['0']['children'][0][
      'data'
    ] = `${address} ${city}, ${abbrState(state, 'abbr')} ${zip}`;
    $('#id1_1 > p.p10.ft1')['0']['children'][0]['data'] = `${cardType}`;
    $('#id1_1 > p.p11.ft14 > span.ft12')['0']['children'][0][
      'data'
    ] = `xxxx xxxx ${getRandomInt(1000, 9999).toString()} Exp: ${getRandomInt(
      01,
      12
    ).toString()}/${randYr} `;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0]['data'] = `$`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td11 > p')['0']['children'][0][
      'data'
    ] = `$${subprice}.00`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td12 > p')['0']['children'][0][
      'data'
    ] = `Qty: ${quantity}`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td13 > p')['0']['children'][0][
      'data'
    ] = `Price: $${quantity * subprice}.00`;
    $('#id2_1 > p.p37.ft2 > span')['0']['children'][0]['data'] = `$${
      quantity * subprice
    }.00`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(3) > td.tr11.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${tax}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(6) > td.tr14.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${totalPrice}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(1) > td.tr9.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${subprice * quantity}.00`;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0][
      'data'
    ] = `$${totalPrice}`;
    $('#id1_1 > p.p5.ft4')['0']['children'][2][
      'data'
    ] = ` will be required when you arrive to install your items. An order conformation has been sent to ${email}.`;

    res.send($.html());
  })();
});
app.get('/discounttirefullcustom', function (req, res) {
  (async () => {
    console.log(req.query);

    // var stringDate = "2020-08-15";
    // var subprice = 166.00;
    // var quantity = 4;
    // var sellerName="jim smith"
    // var itemName= "poop shit"
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = "CA"
    //  state = abbrState(state, "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city}, ${state} ${zip}`
    // var company="ss"
    // var itemName ="tire shit"
    // var size ="tire shit size"
    // var itemNum ="5"

    var stringDate = req.query.date;
    var quantity = 4;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var city = req.query.city;
    var zip = req.query.zip;
    var itemName = req.query.itemName;
    var company = req.query.company;
    var itemNum = req.query.itemNum;
    var vehicle = req.query.vehicle;
    var vehicleInfo = req.query.vehicleInfo;
    var size = req.query.size;
    var address2 = `${city}, ${state} ${zip}`;
    var subprice = parseInt(req.query.subprice);
    var phone =
      getAreaCode().toString() + getRandomInt(1000000, 9999999).toString();
    var orderNum = '16' + getRandomInt(10000, 99999).toString();

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];
    var x = await fses.readFile(`${__dirname}/Discount_Tire4.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    console.log(tax);
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + 7);
    var days = [
      'Sunday',
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    Date.shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var randYr = 2020 + getRandomInt(1, 5);
    randYr = randYr.toString();
    console.log(tax);
    // $("body > table > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td")["0"]["children"][0]["next"]["next"]["data"]=" "+orderNum;
    $('#id1_1 > p.p2.ft2 > span')['0']['children'][0]['data'] = orderNum;
    $('#id2_1 > p.p27.ft21')['0']['children'][0]['data'] = company;
    $('#id2_1 > p.p28.ft22')['0']['children'][0]['data'] = itemName;
    $('#id2_1 > p.p29.ft23 > nobr')['0']['children'][0]['data'] = size;
    $('#id2_1 > p.p30.ft24')['0']['children'][0]['data'] = `Item #${itemNum}`;

    $('#id1_1 > p.p3.ft2 > span')['0']['children'][0]['data'] = fullDate;
    $('#id1_1 > table.t0 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id2_1 > table.t3 > tbody > tr > td.tr0.td0 > p')['0']['children'][0][
      'data'
    ] = fullDate;
    $('#id3_1 > p')['0']['children'][0]['data'] = fullDate;
    $('#id2_1 > p.p24.ft20 > span.ft19')['0']['children'][0]['data'] = vehicle;
    $('#id2_1 > p.p25.ft2')['0']['children'][0]['data'] = vehicleInfo;

    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td2 > p')['0'][
      'children'
    ][0]['data'] = `${days[seven_date.getDay()]}, ${
      Date.shortMonths[seven_date.getMonth()]
    } ${seven_date.getDate()} - 8:00 AM`;
    // $("#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p")["children"][0]["data"]=`jj`
    $('#id1_1 > table.t1 > tbody > tr:nth-child(2) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${fullName}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(3) > td.tr2.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(4) > td.tr3.td3 > p')['0'][
      'children'
    ][0]['data'] = `${address2}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(7) > td.tr6.td3 > p')['0'][
      'children'
    ][0]['data'] = `${email}`;
    $('#id1_1 > table.t1 > tbody > tr:nth-child(8) > td.tr1.td3 > p > nobr')[
      '0'
    ]['children'][0]['data'] = `${phone}`;
    $('#id1_1 > p.p13.ft14')['0']['children'][0][
      'data'
    ] = `${address} ${city}, ${req.query.stateAbbr} ${zip}`;
    $('#id1_1 > p.p10.ft1')['0']['children'][0]['data'] = `${cardType}`;
    $('#id1_1 > p.p11.ft14 > span.ft12')['0']['children'][0][
      'data'
    ] = `xxxx xxxx ${getRandomInt(1000, 9999).toString()} Exp: ${getRandomInt(
      01,
      12
    ).toString()}/${randYr} `;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0]['data'] = `$`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td11 > p')['0']['children'][0][
      'data'
    ] = `$${subprice}.00`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td12 > p')['0']['children'][0][
      'data'
    ] = `Qty: ${quantity}`;
    $('#id2_1 > table.t4 > tbody > tr > td.tr8.td13 > p')['0']['children'][0][
      'data'
    ] = `Price: $${quantity * subprice}.00`;
    $('#id2_1 > p.p37.ft2 > span')['0']['children'][0]['data'] = `$${
      quantity * subprice
    }.00`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(3) > td.tr11.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${tax}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(6) > td.tr14.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${totalPrice}`;
    $('#id3_1 > table.t6 > tbody > tr:nth-child(1) > td.tr9.td16 > p')['0'][
      'children'
    ][0]['data'] = `$${subprice * quantity}.00`;
    $('#id1_1 > p.p11.ft14 > span.ft13')['0']['children'][0][
      'data'
    ] = `$${totalPrice}`;
    $('#id1_1 > p.p5.ft4')['0']['children'][2][
      'data'
    ] = ` will be required when you arrive to install your items. An order conformation has been sent to ${email}.`;

    res.send($.html());
  })();
});
app.get('/ebay', function (req, res) {
  (async () => {
    var x = await fses.readFile(`${__dirname}/ebay.html`);
    var x = x.toString();
    const $ = cheerio.load(x);
    var quantity = req.query.quantity;
    var subprice = req.query.price;
    subprice = subprice * quantity;
    var itemName = req.query.itemName;

    // var stringDate = "2020-08-15";
    //
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState("CA", "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city} ${abbrState(state, "abbr")} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    if (address == null) {
      var address = req.query.address1;
    }
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city} ${abbrState(state, 'abbr')} ${zip}`;

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];

    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    console.log(tax);
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = '6' + getRandomInt(10000000, 99999999).toString();
    var seven_date = new Date();
    seven_date.setDate(today.getDate());
    var phone = getRandomInt(1000000000, 9999999999).toString();
    var days = [
      'Sunday',
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    Date.shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    console.log(req.query);
    $('#13764538618_itemImage').attr('src', req.query.img);

    $('#113764538618_ItemDetails > h4 > a')['0']['children'][0][
      'data'
    ] = itemName;
    $('#orderPlacedOnDate')['0']['children'][0]['data'] = `${
      days[seven_date.getDay()]
    }, ${
      Date.shortMonths[seven_date.getMonth()]
    } ${seven_date.getDate()}, ${yyyy}`;
    $('#orderPaymentDate')['0']['children'][0]['data'] = `${
      days[seven_date.getDay()]
    }, ${
      Date.shortMonths[seven_date.getMonth()]
    } ${seven_date.getDate()}, ${yyyy}`;
    $('#shippingAddressName')['0']['children'][0]['data'] = fullName;
    $('#shippingAddressLine1')['0']['children'][0]['data'] = address;
    $('#shippingAddressCityStateZip')['0']['children'][0]['data'] = address2;
    $('#113764538618_Price')['0']['children'][0]['data'] = `$${
      subprice / quantity
    }`;
    $('#orderCostItemSubTotal')['0']['children'][0]['data'] = `$${subprice}`;
    $('#orderCostSalesTaxBuyer')['0']['children'][0]['data'] = '$' + tax;
    $('#orderTotalCost')['0']['children'][0]['data'] = '$' + totalPrice;
    $('#gh-ug > b:nth-child(1)')['0']['children'][0]['data'] = fullName
      .split(' ')
      .slice(0, -1)
      .join(' ');
    $('#113764538618_Quantity')['0']['children'][0][
      'data'
    ] = quantity.toString();

    res.send($.html());
  })();
});
app.get('/bh', function (req, res) {
  (async () => {
    var x = await fses.readFile(`${__dirname}/bandh.html`);
    var x = x.toString();
    const $ = cheerio.load(x);

    // var stringDate = "2020-08-15";
    //
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState("CA", "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city} ${abbrState(state, "abbr")} ${zip}`
    var subprice = parseFloat(req.query.subprice);
    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    console.log(state);
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city} ${abbrState(state, 'abbr')} ${zip}`;
    var firstName = fullName.split(' ').slice(0, -1).join(' ');
    var lastName = fullName.split(' ').slice(-1).join(' ');
    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];

    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    console.log(tax);
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    console.log(totalPrice);
    var cardType = cards[getRandomInt(0, 3)];
    var orderNum = '6' + getRandomInt(10000000, 99999999).toString();
    var seven_date = new Date();
    seven_date.setDate(today.getDate());
    var phone = `${getAreaCode()}-${getRandomInt(
      100,
      999
    ).toString()}-${getRandomInt(1000, 9999).toString()}`;
    var days = [
      'Sunday',
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    Date.shortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    console.log(req.query);

    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(1) > div.orderHist-date-num > div.orderHist-detail-date.fs22.ng-binding.rec-order-date'
    )['0']['children'][0]['data'] = `${
      Date.shortMonths[seven_date.getMonth() - 1]
    } ${seven_date.getDate()}, ${yyyy}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-order.ng-scope > div.orderHist-detail-order-progress.clearfix.hide-on-print > div > div > div:nth-child(1) > div.step-text.relative > div.orderHist-order-bar-date.fs13.ng-binding.recres-order-date-2'
    )['0']['children'][0]['data'] = `${
      Date.shortMonths[seven_date.getMonth() - 1]
    } ${seven_date.getDate()}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-order.ng-scope > div.orderHist-detail-order-progress.clearfix.hide-on-print > div > div > div:nth-child(3) > div.step-text.step-text-shipped.relative.text-right > div.orderHist-order-bar-date.fs13.ng-binding.rec-delivery-date'
    )['0']['children'][0]['data'] = `${
      Date.shortMonths[seven_date.getMonth() - 1]
    } ${seven_date.getDate() + getRandomInt(5, 9)}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-order.ng-scope > div.orderHist-detail-order-header.table > div.table-cell.fs18 > div:nth-child(2) > span > a'
    )['0']['children'][0]['data'] = `940011089947101${getRandomInt(
      1000000,
      9999999
    )}`;
    $('#js-loginname')['0']['children'][0]['data'] = `${firstName}`;
    $(
      '#freeShippingWrapper > div.freeShippingContainer.new-page-width > div > div.shipEst > span.shipDest.underline-on-hover > span'
    )['0']['children'][0]['data'] = `${city}`;

    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div.ng-binding.rec-ship-to-full-name'
    )['0']['children'][0]['data'] = `${firstName}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div.ng-binding.rec-ship-to-company'
    )['0']['children'][0]['data'] = `${lastName}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div.ng-binding.rec-ship-to-address-line-1'
    )['0']['children'][0]['data'] = `${address}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div:nth-child(6) > span.rec-ship-to-city'
    )['0']['children'][0]['data'] = `${city}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div:nth-child(6) > span.rec-ship-to-state'
    )['0']['children'][0]['data'] = `${state}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div:nth-child(6) > span.rec-ship-to-zip'
    )['0']['children'][0]['data'] = `${zip}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-detail-shipping-info.fs15.capitalize.ng-scope > div:nth-child(7)'
    )['0']['children'][0]['data'] = `${phone}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div.orderHist-detail-order-info.orderHist-detail-totals.table-cell > div.table.orderHist-summary > div:nth-child(3) > span.table-cell.ng-binding > span'
    )['0']['children'][0]['data'] = `${tax}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div.orderHist-detail-order-info.orderHist-detail-totals.table-cell > div.table.orderHist-summary > div.orderHist-detail-total.table-row.bold > span.table-cell.ng-binding > span'
    )['0']['children'][0]['data'] = `${totalPrice}`;
    $(
      'body > div > div.t-main.full-width.clearfix > div.orderHist-views > div.new-page-width.ng-scope > div.orderHist-detail-details.table.ng-scope > div:nth-child(2) > div.orderHist-payment-info > div.orderHist-detail-payment.clearfix.ng-scope > span.right.ng-binding > span'
    )['0']['children'][0]['data'] = `${totalPrice}`;

    res.send($.html());
  })();
});
app.get('/wdc', function (req, res) {
  (async () => {
    var x = await fses.readFile(`${__dirname}/wh.html`);
    var x = x.toString();
    const $ = cheerio.load(x);

    // var stringDate = "2020-08-15";
    //
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState("CA", "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city} ${abbrState(state, "abbr")} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var stateAbbr = req.query.stateAbbr;
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city} ${abbrState(state, 'abbr')} ${zip}`;
    var itemName = req.query.itemName;
    var itemNum = req.query.itemNum;
    var subprice = req.query.subprice;
    var quantity = req.query.quantity;

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];

    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate(req.query.date);
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + getRandomInt(7, 14));

    dd = String(seven_date.getDate()).padStart(2, '0');
    mm = String(seven_date.getMonth()).padStart(2, '0'); //January is 0!
    yyyy = seven_date.getFullYear();
    var shipDate = mm + '/' + dd + '/' + yyyy;

    var phone = `${getRandomInt(100, 999)}-${getRandomInt(
      100,
      999
    )}-${getRandomInt(1000, 9999)}`;

    const recieptNo = `15${getRandomInt(100, 999)}`;
    console.log(req.query);
    console.log(tax);
    console.log(
      $('#id1_1 > table > tbody > tr:nth-child(5) > td.tr4.td6 > p')['0'][
        'children'
      ][0]['data']
    );
    // =recieptNo+" - "+getRandomInt(1000,9999).toString()
    $('#id1_1 > table > tbody > tr:nth-child(6) > td.tr4.td6 > p')['0'][
      'children'
    ][0]['data'] = 'ROB00000' + getRandomInt(1000, 9999).toString();
    $('#id1_1 > table > tbody > tr:nth-child(8) > td.tr5.td6 > p')['0'][
      'children'
    ][0]['data'] = '52' + getRandomInt(1000, 9999).toString();
    $('#id1_3 > table.t1 > tbody > tr:nth-child(3) > td.tr4.td18 > p')['0'][
      'children'
    ][0]['data'] = recieptNo;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(3) > td.tr4.td20 > p')['0'][
      'children'
    ][0][
      'data'
    ] = `${humanNames
      .maleRandom()
      .toUpperCase()} ${randLetter().toUpperCase()}`;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(3) > td.tr4.td28 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(10) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(11) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(12) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(9) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_1 > table > tbody > tr:nth-child(5) > td.tr4.td5 > p')['0'][
      'children'
    ][0]['data'] = slashdate;
    $('#id1_3 > table.t2 > tbody > tr:nth-child(1) > td.tr7.td57 > p')['0'][
      'children'
    ][0]['data'] = numberWithCommas(subprice * quantity);
    $('#id1_3 > table.t2 > tbody > tr:nth-child(5) > td.tr7.td60 > p')['0'][
      'children'
    ][0]['data'] = numberWithCommas(subprice * quantity + tax);
    $('#id1_3 > table.t2 > tbody > tr:nth-child(3) > td.tr13.td57 > p')['0'][
      'children'
    ][0]['data'] = numberWithCommas(tax);
    $('#id1_3 > table.t2 > tbody > tr:nth-child(8) > td.tr6.td57 > p')['0'][
      'children'
    ][0]['data'] = `$${subprice * quantity + tax}`;
    $('#id1_2_1 > p.p11.ft11 > nobr:nth-child(1)')['0']['children'][0][
      'data'
    ] = fullName.toUpperCase();
    $('#id1_2_1 > p.p11.ft11 > nobr:nth-child(3)')['0']['children'][0][
      'data'
    ] = address.toUpperCase();
    $('#id1_2_2 > p.p14.ft11 > nobr:nth-child(1)')['0']['children'][0][
      'data'
    ] = fullName.toUpperCase();
    $('#id1_2_2 > p.p14.ft11 > nobr:nth-child(3)')['0']['children'][0][
      'data'
    ] = address.toUpperCase();
    $('#id1_2_1 > p.p12.ft11')['0']['children'][0][
      'data'
    ] = `${city.toUpperCase()}, ${stateAbbr.toUpperCase()}. ${zip}`;
    $('#id1_2_1 > p.p13.ft11 > nobr')['0']['children'][0]['data'] = phone;
    $('#id1_2_2 > p.p15.ft11')['0']['children'][0][
      'data'
    ] = `${city.toUpperCase()}, ${stateAbbr.toUpperCase()}. ${zip}`;
    $('#id1_2_2 > p.p16.ft11 > nobr')['0']['children'][0]['data'] = phone;

    res.send($.html());
  })();
});
app.get('/wdc2', function (req, res) {
  (async () => {
    var x = await fses.readFile(`${__dirname}/wh2.html`);
    var x = x.toString();
    const $ = cheerio.load(x);

    // var stringDate = "2020-08-15";
    //
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState("CA", "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city} ${abbrState(state, "abbr")} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var stateAbbr = req.query.stateAbbr;
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city} ${abbrState(state, 'abbr')} ${zip}`;
    var itemName = req.query.itemName;
    var itemNum = req.query.itemNum;
    var subprice = 20347;
    var quantity = req.query.quantity;

    var cards = ['VISA', 'MC', 'DS', 'AMEX'];

    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate(req.query.date);
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + getRandomInt(7, 14));

    dd = String(seven_date.getDate()).padStart(2, '0');
    mm = String(seven_date.getMonth()).padStart(2, '0'); //January is 0!
    yyyy = seven_date.getFullYear();
    var shipDate = mm + '/' + dd + '/' + yyyy;

    var phone = `${getRandomInt(100, 999)}-${getRandomInt(
      100,
      999
    )}-${getRandomInt(1000, 9999)}`;

    const recieptNo = `15${getRandomInt(100, 999)}`;
    console.log(req.query);
    console.log(tax);
    console.log(
      $('#id1_1 > table > tbody > tr:nth-child(5) > td.tr4.td6 > p')['0'][
        'children'
      ][0]['data']
    );
    // =recieptNo+" - "+getRandomInt(1000,9999).toString()
    $('#id1_1 > table > tbody > tr:nth-child(6) > td.tr4.td6 > p')['0'][
      'children'
    ][0]['data'] = 'ROB00000' + getRandomInt(1000, 9999).toString();
    $('#id1_1 > table > tbody > tr:nth-child(8) > td.tr5.td6 > p')['0'][
      'children'
    ][0]['data'] = '52' + getRandomInt(1000, 9999).toString();
    $('#id1_3 > table.t1 > tbody > tr:nth-child(3) > td.tr4.td18 > p')['0'][
      'children'
    ][0]['data'] = recieptNo;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(3) > td.tr4.td20 > p')['0'][
      'children'
    ][0][
      'data'
    ] = `${humanNames
      .maleRandom()
      .toUpperCase()} ${randLetter().toUpperCase()}`;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(3) > td.tr4.td28 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(10) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(11) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_3 > table.t1 > tbody > tr:nth-child(9) > td.tr13.td43 > p')['0'][
      'children'
    ][0]['data'] = shipDate;
    $('#id1_1 > table > tbody > tr:nth-child(5) > td.tr4.td5 > p')['0'][
      'children'
    ][0]['data'] = slashdate;
    $('#id1_3 > table.t2 > tbody > tr:nth-child(1) > td.tr7.td57 > p')['0'][
      'children'
    ][0]['data'] = numberWithCommas(subprice * quantity);
    $('#id1_3 > table.t2 > tbody > tr:nth-child(5) > td.tr7.td60 > p')['0'][
      'children'
    ][0]['data'] = numberWithCommas(subprice * quantity + tax);
    $('#id1_3 > table.t2 > tbody > tr:nth-child(3) > td.tr13.td57 > p')['0'][
      'children'
    ][0]['data'] = numberWithCommas(tax);
    $('#id1_3 > table.t2 > tbody > tr:nth-child(6) > td.tr17.td57 > p')['0'][
      'children'
    ][0]['data'] = `${cardType} - $${subprice * quantity + tax}`;
    $('#id1_2_1 > p.p11.ft11 > nobr:nth-child(1)')['0']['children'][0][
      'data'
    ] = fullName.toUpperCase();
    $('#id1_2_1 > p.p11.ft11 > nobr:nth-child(3)')['0']['children'][0][
      'data'
    ] = address.toUpperCase();
    $('#id1_2_2 > p.p14.ft11 > nobr:nth-child(1)')['0']['children'][0][
      'data'
    ] = fullName.toUpperCase();
    $('#id1_2_2 > p.p14.ft11 > nobr:nth-child(3)')['0']['children'][0][
      'data'
    ] = address.toUpperCase();
    $('#id1_2_1 > p.p12.ft11')['0']['children'][0][
      'data'
    ] = `${city.toUpperCase()}, ${stateAbbr.toUpperCase()}. ${zip}`;
    $('#id1_2_1 > p.p13.ft11 > nobr')['0']['children'][0]['data'] = phone;
    $('#id1_2_2 > p.p15.ft11')['0']['children'][0][
      'data'
    ] = `${city.toUpperCase()}, ${stateAbbr.toUpperCase()}. ${zip}`;
    $('#id1_2_2 > p.p16.ft11 > nobr')['0']['children'][0]['data'] = phone;

    res.send($.html());
  })();
});
app.get('/jegs', function (req, res) {
  (async () => {
    var x = await fses.readFile(`${__dirname}/jegs.html`);
    var x = x.toString();
    const $ = cheerio.load(x);

    // var stringDate = "2020-08-15";
    //
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState("CA", "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city} ${abbrState(state, "abbr")} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var stateAbbr = req.query.stateAbbr;
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city.toUpperCase()}, ${stateAbbr.toUpperCase()} ${zip}`;
    var itemName = req.query.itemName;
    var subprice = req.query.subprice;
    var quantity = req.query.quantity;

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];

    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate(req.query.date);
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + getRandomInt(5, 10));

    dd = String(seven_date.getDate()).padStart(2, '0');
    mm = String(seven_date.getMonth()).padStart(2, '0'); //January is 0!
    yyyy = seven_date.getFullYear();
    var shipDate = mm + '/' + dd + '/' + yyyy;

    var phone = `${getRandomInt(100, 999)}-${getRandomInt(
      100,
      999
    )}-${getRandomInt(1000, 9999)}`;

    const recieptNo = `15${getRandomInt(100, 999)}`;
    console.log(req.query);
    console.log(tax);
    // =recieptNo+" - "+getRandomInt(1000,9999).toString()
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr:nth-child(1) > td > span'
    )['0']['children'][0]['data'] =
      '8247' + getRandomInt(1000, 9999).toString();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > nobr'
    )['0']['children'][0]['data'] = fullName.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(2) > table > tbody > tr:nth-child(2) > td > nobr'
    )['0']['children'][0]['data'] = fullName.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > a'
    )['0']['children'][0]['data'] = address.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(2) > table > tbody > tr:nth-child(2) > td > a'
    )['0']['children'][0]['data'] = address.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > nobr:nth-child(5)'
    )['0']['children'][0]['data'] = address2;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(2) > table > tbody > tr:nth-child(2) > td > nobr:nth-child(5)'
    )['0']['children'][0]['data'] = address2;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td > a > strong'
    )['0']['children'][0]['data'] = itemName;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1)'
    )['0']['children'][0]['data'] = `Price: $${subprice}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2)'
    )['0']['children'][0]['data'] = `Qty: ${quantity}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(3)'
    )['0']['children'][0]['data'] = `Cost: $${quantity * subprice}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(3)'
    )['0']['children'][0]['data'] = `ESTIMATED DELIVERY:  ${shipDate}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td'
    )['0']['children'][0]['data'] = `ESTIMATED DELIVERY:  ${shipDate}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(12) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > nobr:nth-child(1)'
    )['0']['children'][0]['data'] = `$${quantity * subprice}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(12) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > nobr:nth-child(5)'
    )['0']['children'][0]['data'] = `$${tax}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(12) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > nobr:nth-child(8)'
    )['0']['children'][0]['data'] = `$${totalPrice + 10}`;

    res.send($.html());
  })();
});
app.get('/jegs2', function (req, res) {
  (async () => {
    var x = await fses.readFile(`${__dirname}/jegs0.html`);
    var x = x.toString();
    const $ = cheerio.load(x);

    // var stringDate = "2020-08-15";
    //
    // var fullName= "jake paul"
    // var address = "3501 jack ave";
    // var state = abbrState("CA", "name");
    // var city="Hawthorne";
    // var zip ="90210"
    // var email="asdsad@gmail.com"
    // var address2 = `${city} ${abbrState(state, "abbr")} ${zip}`

    var stringDate = req.query.date;
    var fullName = req.query.fullName;
    var address = req.query.address;
    var email = req.query.email;
    var state = req.query.stateAbbr;
    state = abbrState(state, 'name');
    var stateAbbr = req.query.stateAbbr;
    var city = req.query.city;
    var zip = req.query.zip;
    var address2 = `${city.toUpperCase()}, ${stateAbbr.toUpperCase()} ${zip}`;
    var itemName = req.query.itemName;
    var subprice = req.query.subprice;
    var quantity = req.query.quantity;

    var cards = ['Visa', 'MasterCard', 'Discover', 'American Express'];

    var lastFour = getRandomInt(1000, 9999).toString();
    var totalPrice = subprice * quantity;
    var tax = gettax(state) * totalPrice;
    tax = Number(tax.toFixed(2));
    var today = new Date(stringDate);
    var currMonth = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate(req.query.date);
    var year = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var slashdate = mm + '/' + dd + '/' + yyyy;
    var fullDate = `${currMonth} ${day}, ${year}`;
    var totalPrice = totalPrice + tax;
    var cardType = cards[getRandomInt(0, 3)];
    var seven_date = new Date();
    seven_date.setDate(today.getDate() + getRandomInt(5, 10));

    dd = String(seven_date.getDate()).padStart(2, '0');
    mm = String(seven_date.getMonth()).padStart(2, '0'); //January is 0!
    yyyy = seven_date.getFullYear();
    var shipDate = mm + '/' + dd + '/' + yyyy;

    var phone = `${getRandomInt(100, 999)}-${getRandomInt(
      100,
      999
    )}-${getRandomInt(1000, 9999)}`;

    const recieptNo = `15${getRandomInt(100, 999)}`;
    console.log(req.query);
    console.log(tax);
    // =recieptNo+" - "+getRandomInt(1000,9999).toString()
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr:nth-child(1) > td > span'
    )['0']['children'][0]['data'] =
      '8247' + getRandomInt(1000, 9999).toString();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > nobr'
    )['0']['children'][0]['data'] = fullName.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(2) > table > tbody > tr:nth-child(2) > td > nobr'
    )['0']['children'][0]['data'] = fullName.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > a'
    )['0']['children'][0]['data'] = address.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(2) > table > tbody > tr:nth-child(2) > td > a'
    )['0']['children'][0]['data'] = address.toUpperCase();
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(1) > table > tbody > tr:nth-child(2) > td > nobr:nth-child(5)'
    )['0']['children'][0]['data'] = address2;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(1) > tbody > tr > th:nth-child(2) > table > tbody > tr:nth-child(2) > td > nobr:nth-child(5)'
    )['0']['children'][0]['data'] = address2;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td > a > strong'
    )['0']['children'][0]['data'] = itemName;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1)'
    )['0']['children'][0]['data'] = `Price: $${subprice}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(2)'
    )['0']['children'][0]['data'] = `Qty: ${quantity}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(3)'
    )['0']['children'][0]['data'] = `Cost: $${quantity * subprice}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(3)'
    )['0']['children'][0]['data'] = `ESTIMATED DELIVERY:  ${shipDate}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(11) > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td'
    )['0']['children'][0]['data'] = `ESTIMATED DELIVERY:  ${shipDate}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(12) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > nobr:nth-child(1)'
    )['0']['children'][0]['data'] = `$${quantity * subprice}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(12) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > nobr:nth-child(5)'
    )['0']['children'][0]['data'] = `$${tax}`;
    $(
      'body > div > div > table > tbody > tr > td > table > tbody > tr > td > div > font > div > blockquote:nth-child(3) > div > blockquote:nth-child(2) > div > table:nth-child(3) > tbody > tr > td > table > tbody > tr > td > table:nth-child(12) > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > nobr:nth-child(8)'
    )['0']['children'][0]['data'] = `$${totalPrice + 10}`;

    res.send($.html());
  })();
});
app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));

function randomTime(start, end, options) {
  var diff = end.getTime() - start.getTime();
  var new_diff = diff * Math.random();
  var date = new Date(start.getTime() + new_diff);
  return date.toLocaleDateString('en-US', options);
}

function randomTimeUpdated(start, end, options) {
  var diff = end.getTime() - start.getTime();
  var new_diff = diff * Math.random();
  var date = new Date(start.getTime() + new_diff);
  return date.toLocaleDateString('en-US', options);
}
function randomTimeUpdated(
  start,
  end,
  options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  },
  format = '/'
) {
  var diff = end.getTime() - start.getTime();
  var new_diff = diff * Math.random();
  var date = new Date(start.getTime() + new_diff);

  var ye = new Intl.DateTimeFormat('en', { year: options.year }).format(date);
  var mo = new Intl.DateTimeFormat('en', { month: options.month }).format(date);
  var da = new Intl.DateTimeFormat('en', { day: options.day }).format(date);
  var toReturn = '';
  Object.keys(options).forEach((key) => {
    console.log(toReturn.split(format));
    if (toReturn.split(format).length - 1 == 2) {
      if (key.toLowerCase() === 'month') {
        toReturn += `${mo}`;
      } else if (key.toLowerCase() === 'day') {
        toReturn += `${da}`;
      } else if (key.toLowerCase() === 'year') {
        toReturn += `${ye}`;
      }
    } else {
      if (key.toLowerCase() === 'month') {
        toReturn += `${mo}${format}`;
      } else if (key.toLowerCase() === 'day') {
        toReturn += `${da}${format}`;
      } else if (key.toLowerCase() === 'year') {
        toReturn += `${ye}${format}`;
      }
    }
  });
  return toReturn;
}

async function removeBellIcon(page) {
  await page.waitForSelector('#concierge');
  let div_selector_to_remove = '#concierge';
  await page.evaluate((sel) => {
    var elements = document.querySelectorAll(sel);
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }
  }, div_selector_to_remove);
}

async function clickNext(index, page) {
  let nextButtons = await page.$$('.btn-next');
  await nextButtons[index].click();
}

async function clickCalendarDay(page, siteDate) {
  await page.evaluate(() =>
    document.querySelector('#dateOfPurchase').removeAttribute('readonly')
  );
  await page.waitFor(500);

  await page.waitForSelector('.SingleDatePicker #dateOfPurchase');
  await page.type('.SingleDatePicker #dateOfPurchase', siteDate);
}

function addDashes(value) {
  const afterIndices = [3, 6, 10];
  const length = value.length;
  let newValue = '';
  for (let i = 0; i < length; i++) {
    if (afterIndices.includes(i)) newValue += '-';
    newValue += value[i];
  }
  return newValue;
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
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
}

function short_months(dt) {
  Date.shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return Date.shortMonths[dt.getMonth()];
}
function getAreaCode() {
  var code = [650, 925, 408, 510];
  return code[~~(code.length * Math.random())].toString();
}
function gettax(state) {
  var jsons = `[
    {
      "State": "California",
      "stateTaxRate": "7.2500",
      "avgLocalTaxRate": "1.3100",
      "combinedRate": "8.5600",
      "Pop": 39937500
    },
    {
      "State": "Tennessee",
      "stateTaxRate": 7,
      "avgLocalTaxRate": "2.4700",
      "combinedRate": "9.4700",
      "Pop": 6897580
    },
    {
      "State": "Rhode Island",
      "stateTaxRate": 7,
      "avgLocalTaxRate": 0,
      "combinedRate": 7,
      "Pop": 1056160
    },
    {
      "State": "Mississippi",
      "stateTaxRate": 7,
      "avgLocalTaxRate": "0.0700",
      "combinedRate": "7.0700",
      "Pop": 2989260
    },
    {
      "State": "Indiana",
      "stateTaxRate": 7,
      "avgLocalTaxRate": 0,
      "combinedRate": 7,
      "Pop": 6745350
    },
    {
      "State": "Minnesota",
      "stateTaxRate": "6.8800",
      "avgLocalTaxRate": "0.5500",
      "combinedRate": "7.4300",
      "Pop": 5700670
    },
    {
      "State": "Nevada",
      "stateTaxRate": "6.8500",
      "avgLocalTaxRate": "1.2900",
      "combinedRate": "8.1400",
      "Pop": 3139660
    },
    {
      "State": "New Jersey",
      "stateTaxRate": "6.6300",
      "avgLocalTaxRate": "-0.0300",
      "combinedRate": "6.6000",
      "Pop": 8936570
    },
    {
      "State": "Washington",
      "stateTaxRate": "6.5000",
      "avgLocalTaxRate": "2.6700",
      "combinedRate": "9.1700",
      "Pop": 7797100
    },
    {
      "State": "Kansas",
      "stateTaxRate": "6.5000",
      "avgLocalTaxRate": "2.1700",
      "combinedRate": "8.6700",
      "Pop": 2910360
    },
    {
      "State": "Arkansas",
      "stateTaxRate": "6.5000",
      "avgLocalTaxRate": "2.9300",
      "combinedRate": "9.4300",
      "Pop": 3039000
    },
    {
      "State": "Connecticut",
      "stateTaxRate": "6.3500",
      "avgLocalTaxRate": 0,
      "combinedRate": "6.3500",
      "Pop": 3563080
    },
    {
      "State": "Texas",
      "stateTaxRate": "6.2500",
      "avgLocalTaxRate": "1.9400",
      "combinedRate": "8.1900",
      "Pop": 29472300
    },
    {
      "State": "Massachusetts",
      "stateTaxRate": "6.2500",
      "avgLocalTaxRate": 0,
      "combinedRate": "6.2500",
      "Pop": 6976600
    },
    {
      "State": "Illinois",
      "stateTaxRate": "6.2500",
      "avgLocalTaxRate": "2.4900",
      "combinedRate": "8.7400",
      "Pop": 12659700
    },
    {
      "State": "West Virginia",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "0.3900",
      "combinedRate": "6.3900",
      "Pop": 1778070
    },
    {
      "State": "Vermont",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "0.1800",
      "combinedRate": "6.1800",
      "Pop": 628061
    },
    {
      "State": "South Carolina",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "1.4300",
      "combinedRate": "7.4300",
      "Pop": 5210100
    },
    {
      "State": "Pennsylvania",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "0.3400",
      "combinedRate": "6.3400",
      "Pop": 12820900
    },
    {
      "State": "Michigan",
      "stateTaxRate": 6,
      "avgLocalTaxRate": 0,
      "combinedRate": 6,
      "Pop": 10045000
    },
    {
      "State": "Maryland",
      "stateTaxRate": 6,
      "avgLocalTaxRate": 0,
      "combinedRate": 6,
      "Pop": 6083120
    },
    {
      "State": "Kentucky",
      "stateTaxRate": 6,
      "avgLocalTaxRate": 0,
      "combinedRate": 6,
      "Pop": 4499690
    },
    {
      "State": "Iowa",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "0.8200",
      "combinedRate": "6.8200",
      "Pop": 3179850
    },
    {
      "State": "Idaho",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "0.0300",
      "combinedRate": "6.0300",
      "Pop": 1826160
    },
    {
      "State": "Florida",
      "stateTaxRate": 6,
      "avgLocalTaxRate": "1.0500",
      "combinedRate": "7.0500",
      "Pop": 21993000
    },
    {
      "State": "Utah",
      "stateTaxRate": "5.9500",
      "avgLocalTaxRate": "0.9900",
      "combinedRate": "6.9400",
      "Pop": 3282120
    },
    {
      "State": "Ohio",
      "stateTaxRate": "5.7500",
      "avgLocalTaxRate": "1.4200",
      "combinedRate": "7.1700",
      "Pop": 11747700
    },
    {
      "State": "Arizona",
      "stateTaxRate": "5.6000",
      "avgLocalTaxRate": "2.7700",
      "combinedRate": "8.3700",
      "Pop": 7378490
    },
    {
      "State": "Nebraska",
      "stateTaxRate": "5.5000",
      "avgLocalTaxRate": "1.3500",
      "combinedRate": "6.8500",
      "Pop": 1952570
    },
    {
      "State": "Maine",
      "stateTaxRate": "5.5000",
      "avgLocalTaxRate": 0,
      "combinedRate": "5.5000",
      "Pop": 1345790
    },
    {
      "State": "Virginia",
      "stateTaxRate": "5.3000",
      "avgLocalTaxRate": "0.3500",
      "combinedRate": "5.6500",
      "Pop": 8626210
    },
    {
      "State": "New Mexico",
      "stateTaxRate": "5.1300",
      "avgLocalTaxRate": "2.6900",
      "combinedRate": "7.8200",
      "Pop": 2096640
    },
    {
      "State": "Wisconsin",
      "stateTaxRate": 5,
      "avgLocalTaxRate": "0.4400",
      "combinedRate": "5.4400",
      "Pop": 5851750
    },
    {
      "State": "North Dakota",
      "stateTaxRate": 5,
      "avgLocalTaxRate": "1.8500",
      "combinedRate": "6.8500",
      "Pop": 761723
    },
    {
      "State": "North Carolina",
      "stateTaxRate": "4.7500",
      "avgLocalTaxRate": "2.2200",
      "combinedRate": "6.9700",
      "Pop": 10611900
    },
    {
      "State": "South Dakota",
      "stateTaxRate": "4.5000",
      "avgLocalTaxRate": "1.9000",
      "combinedRate": "6.4000",
      "Pop": 903027
    },
    {
      "State": "Oklahoma",
      "stateTaxRate": "4.5000",
      "avgLocalTaxRate": "4.4200",
      "combinedRate": "8.9200",
      "Pop": 3954820
    },
    {
      "State": "Louisiana",
      "stateTaxRate": "4.4500",
      "avgLocalTaxRate": 5,
      "combinedRate": "9.4500",
      "Pop": 4645180
    },
    {
      "State": "Missouri",
      "stateTaxRate": "4.2300",
      "avgLocalTaxRate": "3.9000",
      "combinedRate": "8.1300",
      "Pop": 6169270
    },
    {
      "State": "Wyoming",
      "stateTaxRate": 4,
      "avgLocalTaxRate": "1.3600",
      "combinedRate": "5.3600",
      "Pop": 567025
    },
    {
      "State": "New York",
      "stateTaxRate": 4,
      "avgLocalTaxRate": "4.4900",
      "combinedRate": "8.4900",
      "Pop": 19440500
    },
    {
      "State": "Hawaii",
      "stateTaxRate": 4,
      "avgLocalTaxRate": "0.4100",
      "combinedRate": "4.4100",
      "Pop": 1412690
    },
    {
      "State": "Georgia",
      "stateTaxRate": 4,
      "avgLocalTaxRate": "3.2900",
      "combinedRate": "7.2900",
      "Pop": 10736100
    },
    {
      "State": "Alabama",
      "stateTaxRate": 4,
      "avgLocalTaxRate": "5.1400",
      "combinedRate": "9.1400",
      "Pop": 4908620
    },
    {
      "State": "Colorado",
      "stateTaxRate": "2.9000",
      "avgLocalTaxRate": "4.7300",
      "combinedRate": "7.6300",
      "Pop": 5845530
    },
    {
      "State": "Oregon",
      "stateTaxRate": 0,
      "avgLocalTaxRate": 0,
      "combinedRate": 0,
      "Pop": 4301090
    },
    {
      "State": "New Hampshire",
      "stateTaxRate": 0,
      "avgLocalTaxRate": 0,
      "combinedRate": 0,
      "Pop": 1371250
    },
    {
      "State": "Montana",
      "stateTaxRate": 0,
      "avgLocalTaxRate": 0,
      "combinedRate": 0,
      "Pop": 1086760
    },
    {
      "State": "Delaware",
      "stateTaxRate": 0,
      "avgLocalTaxRate": 0,
      "combinedRate": 0,
      "Pop": 982895
    },
    {
      "State": "Alaska",
      "stateTaxRate": 0,
      "avgLocalTaxRate": "1.4300",
      "combinedRate": "1.4300",
      "Pop": 734002
    }
  ]`;
  jsons = JSON.parse(jsons);
  for (var x = 0; x < jsons.length; x++) {
    if (jsons[x]['State'] == state) {
      return Number(jsons[x]['stateTaxRate']) * 0.01;
    }
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
async function watermark(ORIGINAL_IMAGE) {
  const LOGO = 'https://i.imgur.com/IAtOQop.png';

  const LOGO_MARGIN_PERCENTAGE = 1;

  const main = async () => {
    var [image, logo] = await Promise.all([
      Jimp.read(Buffer.from(ORIGINAL_IMAGE, 'base64')),
      Jimp.read(LOGO),
    ]);
    image = await image.resize(logo.bitmap.width, logo.bitmap.height);

    logo.resize(image.bitmap.width, Jimp.AUTO);

    const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;

    return image.composite(logo, X, Y, [
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 0.2,
        opacityDest: 1,
      },
    ]);
  };
  var s;
  await main().then((img) => {
    img.getBase64(Jimp.AUTO, (err, res) => {
      s = res;
    });
  });
  s = s.substr(22);
  return s;
}
async function validate(data) {
  const r = await usps.verify({
    street1: data['address1'],
    street2: data['address2'],
    city: data['city'],
    state: data['stateAbbr'],
    zip: data['zip'],
  });
  console.log(r);
  if (
    r['dpv_confirmation'] == 'Y' ||
    r['dpv_confirmation'] == 'D' ||
    r['dpv_confirmation'] == 'S'
  ) {
    console.log('good');
    return true;
  }
  return false;
}

async function addressValidator(data) {
  var verify = await usps.verify({
    street1: data['address1'],
    street2: data['address2'],
    city: data['city'],
    state: data['stateAbbr'],
    zip: data['zip'],
  });
  if (
    verify['dpv_confirmation'] == 'Y' ||
    verify['dpv_confirmation'] == 'D' ||
    verify['dpv_confirmation'] == 'S'
  ) {
    return true;
  }
  return verify;
}

function randLetter() {
  var letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  var letter = letters[Math.floor(Math.random() * letters.length)];
  return letter;
}
function numberWithCommas(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/////////////////////////////////////
/////// - - - - - - - - - - - ///////
/////// - BPR BEER REBATE   - ///////
/////// - CONTACT Risk#6029 - ///////
/////// - - - - - - - - - - - ///////
/////////////////////////////////////
///////  REBATE VALUE: 10$    ///////
/////////////////////////////////////

app.post('/bpr', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.5,
    products: [
      // Golden Road Products
      {
        name: 'Golden Road Mango Cart Wheat Ale Beer - 6pk/12 fl oz Cans',
        sku: '422832821',
        price: 11.99,
        path: `bpr_files/1.png`,
        company: 'Golden Road',
        img:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3702/3702620_sd.jpg;maxHeight=300;maxWidth=450',
      },
      // Devils Backbone Products
      {
        name: 'Devils Backbone Vienna Lager Beer - 12pk/12 fl oz Bottles',
        sku: '856655003107',
        path: `bpr_files/2.png`,
        price: 17.99,
        company: 'Devils Backbone',
        img:
          'https://i5.walmartimages.com/asr/dbb1ce4c-86d3-4b02-8682-b15fb2eb4a67_1.3f7b15d51aa6ee83add23a88986c27b6.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF;maxHeight=300;maxWidth=450',
      },
      {
        name:
          "Devil's Backbone Brewing Company Gold Leaf Lager, 6 pack, 12 fl oz",
        sku: '856655003893',
        price: 12.99,
        path: `bpr_files/3.png`,
        company: 'Devils Backbone',
        img:
          'https://i5.walmartimages.com/asr/4a9d37f8-fcef-4f94-9899-38ec013e7500_1.da3b67422962994209f9d0cb82e8a2d2.jpeg',
      },
      {
        name: 'Devils Backbone Vienna Lager Beer - 6pk/12 fl oz Bottles',
        sku: '856655003015',
        path: `bpr_files/4.png`,
        price: 12.99,
        company: 'Devils Backbone',
        img:
          'https://i5.walmartimages.com/asr/bebd86fe-9b80-43d9-a9c8-0a3d387c0259_1.06fa20af288ff2e837066af514eaf271.jpeg',
      },
      // Breckenridge
      {
        name: 'Breckenridge Brewery Autumn Ale, 6-Pack, 12 fl. oz',
        sku: '745432161003',
        path: `bpr_files/5.png`,
        price: 14.99,
        company: 'Breckenridge Brewery',
        img:
          'https://i5.walmartimages.com/asr/d774c2ba-8af7-4ea4-9c49-2546d07061af_3.9864ec79875568b33622eacf9c3041c5.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff',
      },
      // Four Peaks
      {
        name: 'Four Peaks Kilt Lifter, 6-Pack Can Carton, 12 oz., 6% ABV',
        sku: '815351001046',
        path: `bpr_files/6.png`,
        price: 12.99,
        company: 'FourPeaks Brewing',
        img:
          'https://i5.walmartimages.com/asr/04714940-66b8-4203-b599-c825d9d32b4d.23cad3cc9df9e22714c89ca478a406e0.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff',
      },
    ],
  };
  // SUBCOMP - Recaptcha Functionality
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      // '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--start-maximized',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    // browserWSEndpoint:
    //   'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  // Configure the navigation timeout
  // MAINCOMP - Intiailize Script
  // var newPage = await browser.newPage();
  //  await newPage.authenticate({
  // username: 'lff4fyij',
  // password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  // });

  var page = await browser.newPage();
  /*  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });  */

  // SUBCOMP - Finance Credits Work
  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(
        new Date('12/1/2020'),
        new Date('12/18/2020'),
        new Date(),
        {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }
      );
      //  Temporarily trying to use best buy details even though none beside
      // walmart and target actually sell these products lol


      var receiptChoices = ['staples', 'ebay', 'walmart'];
      var photoID = uuidv4();

      // SUBCOMP - Information Generation
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      // Rebate amount is 3+
      var amount = getRandomInt(3, 8) + 1;
      console.log(amount);
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        // Changed company to be grabbed from object instead for different brand rebates.
        company: item.company,
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      //await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // SUBCOMP - Grab Reciept
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        await page.waitFor(1500);
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
          timeout: 0,
        });
        await page.waitFor(5000);

        // MAINCOMP - Begin Script
        // The rebate begins in 3...2....1.... GOOOO

        // NEW SCRIPT
        const mainpage = await browser.newPage();
        let element, formElement, tabs;

        await mainpage.setViewport({
          width: 1280,
          height: 720,
        });

        await mainpage.setRequestInterception(true);
        mainpage.on('request', (request) => {
          if (
            ['image', 'stylesheet', 'font', 'other'].includes(
              request.resourceType()
            )
          ) {
            request.abort();
          } else {
            request.continue();
          }
        });

        await mainpage.goto(`https://www.mybeerrebate.com/`, {
          timeout: 0,
        });

        await mainpage.setViewport({
          width: 1280,
          height: 720,
        });
        await mainpage.waitFor(5000);

        element = await mainpage.$x(`//*[@name="dateOfBirthText"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="dateOfBirthText"]`);
        await element[0].type(`01/01/1990`);

        element = await mainpage.$x(`//div[3]/div/div`);
        await element[0].click();

        element = await mainpage.$x(`//div/button`);
        await element[0].click();
        await mainpage.waitFor(2000);

        console.log('1. we finished up the birth date verification');

        //element = await mainmainpage.$x(`//div/button`);
        //await element[0].click();

        element = await mainpage.$x(`//*[@name="CampaignCode"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="CampaignCode"]`);
        await element[0].type(`AB-1897`);

        element = await mainpage.$x(`//*[@id="home-PurchaseDate-text"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@id="home-PurchaseDate-text"]`);
        await element[0].type(date);

        // Need to add a break click here

        element = await mainpage.$x(`//*[@name="Email"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="Email"]`);
        await element[0].type(email);
        console.log('1. we finished up the email form');

        element = await mainpage.$x(`//div[2]/div/div/div`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="Zipcode"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="Zipcode"]`);
        await element[0].type(zip);
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        await mainpage.keyboard.press('ArrowDown');
        console.log('1. we finished up the zip code');
        // await page.waitForSelector('.panel > #accordiongroup-104-1825-panel > .panel-body > .ng-scope > .row:nth-child(3)')
        await mainpage.waitForSelector(
          '.ng-isolate-scope > .ng-valid-date > .form-group:nth-child(4) > .input-group > .noBorderTextBox'
        );
        await mainpage.click(
          '.ng-isolate-scope > .ng-valid-date > .form-group:nth-child(4) > .input-group > .noBorderTextBox'
        );

        await mainpage.waitForSelector(
          '.ng-scope > .ng-isolate-scope > .ng-valid-date > .form-group:nth-child(4) > .input-group'
        );
        await mainpage.click(
          '.ng-scope > .ng-isolate-scope > .ng-valid-date > .form-group:nth-child(4) > .input-group'
        );

        await mainpage.waitForSelector(
          '.panel-body #home-customSearch-0-continue'
        );
        await mainpage.click('.panel-body #home-customSearch-0-continue');

        await mainpage.waitForSelector(
          '.content > .ng-scope > .col-md-12 > .col-md-6 > .well'
        );
        await mainpage.click(
          '.content > .ng-scope > .col-md-12 > .col-md-6 > .well'
        );

        await mainpage.waitForSelector(
          '.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding'
        );
        await mainpage.click(
          '.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding'
        );
        await mainpage.waitFor(2000);

        /// testing this

        /* element = await mainpage.$x(`//div[2]/div[5]`);
       await element[0].click(); */

        console.log('1. we have pressed the continue button');
        // 1280 by 699

        await mainpage.waitFor(5000);
        // 860 240

        element = await mainpage.$x(`//*[@id="Gender Choice"]`);
        await element[0].click();
        await mainpage.waitFor(500);
        await mainpage.keyboard.press('ArrowDown');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s

        await mainpage.waitFor(5000);

        console.log('1. we have pressed the male indicator');

        element = await mainpage.$x(`//a[@id='continueOrSubmitBtn']/span`);
        await element[0].click();

        console.log('1. we have pressed the continue button AGAIN');

        // testing this
        /*         await mainpage.waitFor(5000);
        element = await mainpage.$x(
          `//*[@id="Did this rebate drive your purchase"]`
        );
        await element[0].click(); */

        // FUNCTION NOT CURRENTLY SUPPORTED - Request it: github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder/issues
        // Function Attempted: Command: select, Target: id=Did this rebate drive your purchase, Value: label=YES

        await mainpage.waitFor(5000);

        /* // Upload file + continue
         log(chalk.black.bgGreen('Uploading Receipt'));
         await page.waitForSelector('input[type=file]');
         let fileInput = await page.$('input[type=file]');
         await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
         await page.waitFor(1250);
         await page.click('a.btn.cont'); */

        console.log('1. we have reached the POP section');
        //await fileInput.uploadFile(`images/${photoID}.png`);
        // await fileInput2.uploadFile(path);

        // FILE UPLOAD
        // await mainpage.waitFor(500);
        //const fileInput = await page.$('body > input');
        //     await fileInput.uploadFile(`${__dirname}/images/${id}.${ext}`);

        //  element = await mainpage.$x(`//*[@id="addImage-proofOfPurchase"][2]`);
        // await element[0].click();

        ////*[@id="addImage-proofOfPurchase"]
        await mainpage.waitForSelector('#addImage-proofOfPurchase');
        // await mainpage.click('#addImage-proofOfPurchase');
        input = await mainpage.$('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`);
        await mainpage.waitFor(500);

        // Get all the elements for the selector
        inputs = await mainpage.$$('input[type="file"]');

        // Work on individual elements
        await inputs[1].uploadFile(`${__dirname}/${item.path}`);
        await mainpage.waitFor(500);

        // FILE UPLOAD END
        console.log('1. we have reached the uploader section');

        await mainpage.waitFor(500);

        element = await mainpage.$x(`//div[2]/a/span`);
        await element[0].click();

        element = await mainpage.$x(
          `//div[@id='rewardChoicesContainer']/div/div/div/div[2]`
        );
        await element[0].click();

        element = await mainpage.$x(`//a[@id='continueOrSubmitBtn']/span`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="firstName"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="firstName"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        /* ///
        await page.type(
          '#fname',
          fullName.split(' ').slice(0, -1).join(' ')
        );
        await page.type(
          '#Lname',
          fullName.split(' ').slice(-1).join(' ')
        );
        // */

        element = await mainpage.$x(`//*[@name="lastName"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="lastName"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        // function to fix phone number

        let newphone = String(Math.random()).substring(2, 12);

        // body > div.content.container.fluid > div > div.col-md-12.demog.ng-scope > form > div > div:nth-child(1) > div:nth-child(5) > p > span

        element = await mainpage.$x(`//*[@name="address1"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="address1"]`);
        await element[0].type(address);

        await mainpage.waitFor(500);

        // element = await mainpage.$x(`//*[@name="address2"]`);
        // await element[0].type(address2);

        await mainpage.waitFor(500);

        await mainpage.waitFor(500);

        await mainpage.$eval(
          'input[type="checkbox"]',
          (check) => (check.checked = true)
        );

        await mainpage.waitFor(500);

        element = await mainpage.$x(`//*[@name="phoneNumber"]`);
        await element[0].click();

        element = await mainpage.$x(`//*[@name="phoneNumber"]`);
        await element[0].type(newphone);

        await mainpage.waitFor(500);

        element = await mainpage.$x(`//div[@id='continueBtn']/button/span`);
        await element[0].click();

        await mainpage.waitFor(500);
        element = await mainpage.$x(`//*[@id="enteredAddressBtn"]`);
        await element[0].click();
        await mainpage.waitFor(500);
        element = await mainpage.$x(
          `//a[@id='continueOrSubmitBtnBottom']/span`
        );
        await element[0].click();
        // await browser.close();

        // Third Phase of form

        // Fifth Phase - Submit and Complete
        await mainpage.waitFor(20000);
        //Send Reponse
        let finalImage = await mainpage.screenshot({
          encoding: 'base64',
          fullmainpage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Save the tracking code in the screenshot image and enter it here - https://www.mybeerrebate.com//#/tracker - to track the rebate.`,
          image: imgurPost.data.data.link,
        });

        await mainpage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await browser.close();
  }
});
app.post('/goldauto', async (req, res) => {
  console.log(req.body);
  var rebateInfo = {
    rebatePrice: 1,
    products: [
      {
        name: 'DieHard Platinum AGM Battery, Group Size 34, 740 CCA',
        sku: '34-AGM',
        price: 219.99,
        img:
          'https://shop.advanceautoparts.com/wcsstore/CVWEB/staticproductimage//2916/large/10310829_gmp_34agm_pri_larg.jpg',
      },
      {
        name: 'DieHard Platinum AGM Battery, Group Size 24F, 710 CCA',
        sku: '24F-AGM',
        price: 219.99,
        img:
          'https://shop.advanceautoparts.com/wcsstore/CVWEB/staticproductimage//2916/large/10310750_gmp_24fagm_pri_larg.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    var dd = true;
    if (dd) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('12/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      var receiptChoices = [
        'oreilly',
        'tirekingdom',
        'walmart',
      ];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen = receiptChoices[getRandomInt(0, 3)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      console.log('chosen the receipt ' + chosen);
      var amount = 1;
      console.log(amount);
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: 'DieHard',
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
          
        });

        // TODO: Start Script

        newPage.on('request', (req) => {
          if (req.resourceType() == 'font' || req.resourceType() == 'image') {
            req.abort();
          } else {
            req.continue();
          }
        });

        await newPage.setRequestInterception(true);

        await newPage.bringToFront();

        await newPage.goto(
          `https://www.technetprofessionalrebates.com/#/home`,
          {
            waitUntil: 'networkidle0',
          }
        );

        element = await newPage.$x(`//*[@name="offerCode"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="offerCode"]`);
        await element[0].type(`20-21781`);

        element = await newPage.$x(`//*[@id="home-purchasedate-text"]`);
        await element[0].click();

        function randomInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let chosenday = randomInteger(2, 29);

        element = await newPage.$x(`//*[@id="home-purchasedate-text"]`);
        await element[0].type(`12-${chosenday}-2020`);

        element = await newPage.$x(
          `//*[@id="home-offer-purchasedate-continue"]`
        );
        await element[0].click();

        await newPage.waitFor(2550);
        await newPage.waitForSelector('#continueOrSubmitBtn');
        await newPage.click('#continueOrSubmitBtn');

        element = await newPage.$x(`//*[@id="productSelect-search"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="productSelect-search"]`);
        await element[0].type(`AGM`);

        element = await newPage.$x(`//img[@alt='Product Image']`);
        await element[0].click();

        // reward choice select

        await newPage.select('#Reward\\ Choice', 'Virtual Prepaid Mastercard');
        // reward choice end

        await newPage.waitForSelector('#continueOrSubmitBtn');
        await newPage.click('#continueOrSubmitBtn');

        // Start of file upload section

        await newPage.waitFor(1500);
        // Insert File upload

        input = await newPage.$('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`);
        await newPage.waitFor(5000);

        await newPage.$eval(`span.ng-binding.ng-scope`, (elem) => elem.click());
        await page.waitFor(2500);
        // form start

        element = await newPage.$x(`//*[@name="firstName"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="firstName"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        element = await newPage.$x(`//*[@name="lastName"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="lastName"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        let newphone = String(Math.random()).substring(2, 12);

        element = await newPage.$x(`//*[@name="phoneNumber"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="phoneNumber"]`);
        await element[0].type(newphone);

        element = await newPage.$x(`//*[@name="email"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="email"]`);
        await element[0].type(email);

        element = await newPage.$x(`//*[@name="confirmEmail"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="confirmEmail"]`);
        await element[0].type(email);

        element = await newPage.$x(`//*[@name="address1"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="address1"]`);
        await element[0].type(address);

        element = await newPage.$x(`//*[@name="address2"]`);
        await element[0].click();

        /*  element = await newPage.$x(`//*[@name="address2"]`);
        await element[0].type(address2); */

        element = await newPage.$x(`//*[@name="postalCode"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@name="postalCode"]`);
        await element[0].type(zip);

        element = await newPage.$x(`//*[@name="city"]`);
        await element[0].click();

        element = await newPage.$x(
          `//div[@id='pdfGenerate1']/div[3]/div/div/form/div/div[2]/div[4]/p`
        );
        await element[0].click();
        await newPage.waitFor(3000);

        await newPage.waitForSelector('#continueBtn > button');
        await newPage.click('#continueBtn > button');

        await newPage.waitFor(3500);

        element = await newPage.$x(`//*[@id="enteredAddressBtn"]`);
        await element[0].click();
        await newPage.waitFor(3000);

        await newPage.waitForSelector('#continueOrSubmitBtn > span');
        await newPage.click('#continueOrSubmitBtn > span');

        await newPage.waitFor(4000);

        // TRACK THE STATUS
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);		

        //Send Reponse
        let finalImage = await newPage.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Use the email, **${email}**, you submitted with, along with the other personal info you submitted with, and enter it at https://www.technetprofessionalrebates.com/#/tracker to check the status of your rebate!`,
          image: imgurPost.data.data.link,
        });

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
}); // All tests passed
app.post('/duracell', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.5,
    products: [
      {
        name:
          'Duracell Ultra Platinum AGM BCI Group 31M Deep Cycle Marine & RV Battery',
        sku: '721112824093',
        price: 244.99,
        img:
          'https://www.batteriesplus.com/content/images/product/large/852240.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('12/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      var receiptChoices = [
        'oreilly',
        'simpletire', //
        'tirekingdom',
      ];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      console.log('chosen the receipt ' + chosen);
      var amount = 2;
      console.log(amount);
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: 'Duracell',
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script

        page.on('request', (req) => {
          if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            req.resourceType() == 'image'
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        await page.setRequestInterception(true);

        await page.goto(
          `https://apfco.com/secured/W1788/R10451/Home/EntryForm`,
          { waitUntil: 'networkidle0' }
        );

        element = await page.$x(`//*[@id="ship_fname"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_fname"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        element = await page.$x(`//*[@id="ship_lname"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_lname"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        element = await page.$x(`//*[@id="ship_address"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_address"]`);
        await element[0].type(address);

        element = await page.$x(`//*[@id="ship_city"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_city"]`);
        await element[0].type(city);

        element = await page.$x(`//*[@id="ship_zip"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_zip"]`);
        await element[0].type(zip);

        element = await page.$x(`//*[@id="email"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="email"]`);
        await element[0].type(email);

        element = await page.$x(`//*[@id="confirmEmail"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="confirmEmail"]`);
        await element[0].type(email);

        // state dropdown

        await page.waitForSelector('form #ship_state');
        await page.click('form #ship_state');

        await page.select('form #ship_state', stateAbbr);

        await page.waitForSelector('form #ship_state');
        await page.click('form #ship_state');

        // product dropdown

        await page.waitForSelector('form #product_01');
        await page.click('form #product_01');

        await page.select('form #product_01', 'SLI24FM');

        await page.waitForSelector('form #product_01');
        await page.click('form #product_01');

        await page.waitForSelector('form > #item2 > #item2b #product_02');
        await page.click('form > #item2 > #item2b #product_02');

        await page.select('form > #item2 > #item2b #product_02', 'SLI24FM');

        await page.waitForSelector('form > #item2 > #item2b #product_02');
        await page.click('form > #item2 > #item2b #product_02');

        element = await page.$x(`//*[@id="storeNum"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="storeNum"]`);
        await element[0].type(`OLP`);

        element = await page.$x(`//*[@id="remItem"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="opt_in_terms"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="opt_in_Comms"]`);
        await element[0].click();

        // survey 1 dropdown

        await page.waitForSelector('.col-12 #SurveyQuestion01');
        await page.click('.col-12 #SurveyQuestion01');

        await page.select('.col-12 #SurveyQuestion01', 'N');

        await page.waitForSelector('.col-12 #SurveyQuestion01');
        await page.click('.col-12 #SurveyQuestion01');

        await page.waitForSelector('.col-12 #SurveyQuestion02');
        await page.click('.col-12 #SurveyQuestion02');

        await page.select('.col-12 #SurveyQuestion02', 'Y');

        await page.waitForSelector('.col-12 #SurveyQuestion02');
        await page.click('.col-12 #SurveyQuestion02');

        element = await page.$x(`//*[@id="IRcheck"]`);
        await element[0].click();

        /* var frames = await page.frames();
       var newFrame = await frames.find((f) => f.name() === `index=0`);

       element = await page.$x(`//*[@id="recaptcha-anchor-label"]`);
       await element[0].click(); */

        // captcha...

        // File upload

        input = await page.$('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`);
        await page.waitFor(500);

        //

        await page.solveRecaptchas();

        await page.waitForSelector(
          '.container-fluid > .row > .col-12 > form > .batPlusSubButtn'
        );
        await page.click(
          '.container-fluid > .row > .col-12 > form > .batPlusSubButtn'
        );
        await page.waitFor(3000);

        await page.waitForSelector(
          '#entryForm > .col-xs-12 > .form-group > #submit > span'
        );
        await page.click(
          '#entryForm > .col-xs-12 > .form-group > #submit > span'
        );

        await page.waitFor(3000);
        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Use the last name, **${fullName
            .split(' ')
            .slice(-1)
            .join(
              ' '
            )}**, first numbers of your street address, **${address}**, and zip code, **${zip}**, you submitted with, and enter it at https://bpb.rebateresearch.com/ to check the status of your rebate!`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
});
app.post('/x2power', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 1,
    products: [
      {
        name:
          'SLI24FAGMDP X2Power Premium AGM BCI Group 24F Car and Truck Battery',
        sku: '630650661964',
        price: 309.99,
        img:
          'https://www.batteriesplus.com/content/images/product/large/712712.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('12/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      var receiptChoices = [
        'oreilly',
        'simpletire', //
        'tirekingdom',
      ];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      console.log('chosen the receipt ' + chosen);
      var amount = 2;
      console.log(amount);
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: 'X2Power',
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script

        page.on('request', (req) => {
          if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            req.resourceType() == 'image'
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        await page.setRequestInterception(true);

        await page.goto(
          `https://apfco.com/secured/W1788/R10452/Home/EntryForm`,
          { waitUntil: 'networkidle0' }
        );

        element = await page.$x(`//*[@id="ship_fname"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_fname"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        element = await page.$x(`//*[@id="ship_lname"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_lname"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        element = await page.$x(`//*[@id="ship_address"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_address"]`);
        await element[0].type(address);

        element = await page.$x(`//*[@id="ship_city"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_city"]`);
        await element[0].type(city);

        element = await page.$x(`//*[@id="ship_zip"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="ship_zip"]`);
        await element[0].type(zip);

        element = await page.$x(`//*[@id="email"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="email"]`);
        await element[0].type(email);

        element = await page.$x(`//*[@id="confirmEmail"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="confirmEmail"]`);
        await element[0].type(email);

        // state dropdown

        await page.waitForSelector('form #ship_state');
        await page.click('form #ship_state');

        await page.select('form #ship_state', stateAbbr);

        await page.waitForSelector('form #ship_state');
        await page.click('form #ship_state');

        // product dropdown

        await page.waitForSelector('form #product_01');
        await page.click('form #product_01');

        await page.select('form #product_01', 'SLI24FAGMDP');

        await page.waitForSelector('form #product_01');
        await page.click('form #product_01');

        await page.waitForSelector('form > #item2 > #item2b #product_02');
        await page.click('form > #item2 > #item2b #product_02');

        await page.select('form > #item2 > #item2b #product_02', 'SLI24FAGMDP');

        await page.waitForSelector('form > #item2 > #item2b #product_02');
        await page.click('form > #item2 > #item2b #product_02');

        element = await page.$x(`//*[@id="storeNum"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="storeNum"]`);
        await element[0].type(`OLP`);

        element = await page.$x(`//*[@id="remItem"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="opt_in_terms"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="opt_in_Comms"]`);
        await element[0].click();

        // survey 1 dropdown

        await page.waitForSelector('.col-12 #SurveyQuestion01');
        await page.click('.col-12 #SurveyQuestion01');

        await page.select('.col-12 #SurveyQuestion01', 'N');

        await page.waitForSelector('.col-12 #SurveyQuestion01');
        await page.click('.col-12 #SurveyQuestion01');

        await page.waitForSelector('.col-12 #SurveyQuestion02');
        await page.click('.col-12 #SurveyQuestion02');

        await page.select('.col-12 #SurveyQuestion02', 'Y');

        await page.waitForSelector('.col-12 #SurveyQuestion02');
        await page.click('.col-12 #SurveyQuestion02');

        element = await page.$x(`//*[@id="IRcheck"]`);
        await element[0].click();

        /* var frames = await page.frames();
       var newFrame = await frames.find((f) => f.name() === `index=0`);

       element = await page.$x(`//*[@id="recaptcha-anchor-label"]`);
       await element[0].click(); */

        // captcha...

        // File upload

        input = await page.$('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`);
        await page.waitFor(500);

        //

        await page.solveRecaptchas();

        await page.waitForSelector(
          '.container-fluid > .row > .col-12 > form > .batPlusSubButtn'
        );
        await page.click(
          '.container-fluid > .row > .col-12 > form > .batPlusSubButtn'
        );
        await page.waitFor(3000);

        await page.waitForSelector(
          '#entryForm > .col-xs-12 > .form-group > #submit > span'
        );
        await page.click(
          '#entryForm > .col-xs-12 > .form-group > #submit > span'
        );

        await page.waitFor(3000);
        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Use the last name, **${fullName
            .split(' ')
            .slice(-1)
            .join(
              ' '
            )}**, first numbers of your street address, **${address}**, and zip code, **${zip}**, you submitted with, and enter it at https://bpb.rebateresearch.com/ to check the status of your rebate!`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
}); // All tests passed
app.post('/itunes', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.25,
    products: [
      {
        name: 'Pampers 8-Pack Cotton Body Wet Wipe',
        sku: '1862563',
        price: 45.99,
        img:
          'https://mobileimages.lowes.com/product/converted/100184/1001849788.jpg?size=pdhi',
      },
      {
        name: 'Pampers 9-Pack Cotton Body Wet Wipe (2 Sets)',
        sku: '1844410',
        price: 45.99,
        img:
          'https://mobileimages.lowes.com/product/converted/100185/1001851128.jpg?size=pdhi',
      },
      {
        name: 'Pampers 504-Pack Cotton Body Wet Wipe (2 Sets)',
        sku: '1844403',
        price: 52.99,
        img:
          'https://mobileimages.lowes.com/product/converted/100185/1001851104.jpg?size=pdhi',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('10/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      //      var receiptChoices = ["bestbuy"]
      var receiptChoices = ['lowes'];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var amount = 1;
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: 'Pampers',
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script

        await newPage.setRequestInterception(true);

        newPage.on('request', (req) => {
          if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            req.resourceType() == 'image'
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        await newPage.bringToFront();
        await newPage.goto('https://www.pampersgiftcard.com/', {
          waitUntil: 'networkidle0',
          timeout: 0,
        });

        element = await newPage.$x(`//*[@id="retailer_title"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="retailer_titleText"]`);
        await element[0].type(`lowe`);

        await newPage.keyboard.press(`Enter`);

        element = await newPage.$x(`//*[@id="splashEmail"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="splashEmail"]`);
        await element[0].type(email);

        element = await newPage.$x(`//a[@id='splashEmailBtn']/span`);
        await element[0].click();
        await newPage.waitFor(2500);

        //

        element = await newPage.$x(`//*[@id="fName"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="fName"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        element = await newPage.$x(`//*[@id="lName"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="lName"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        element = await newPage.$x(`//*[@id="emailConfirm"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="emailConfirm"]`);
        await element[0].type(email);

        element = await newPage.$x(`//*[@id="phone"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="phone"]`);
        await element[0].type(phone);

        await newPage.waitForSelector(
          '.contentArea > #registerForm > #regForm #gift_card'
        );
        await newPage.click(
          '.contentArea > #registerForm > #regForm #gift_card'
        );

        await newPage.select(
          '.contentArea > #registerForm > #regForm #gift_card',
          'itunes'
        );

        await newPage.waitForSelector(
          '.contentArea > #registerForm > #regForm #gift_card'
        );
        await newPage.click(
          '.contentArea > #registerForm > #regForm #gift_card'
        );

        //Captcha
        await page.solveRecaptchas();

        // End of captcha
        await newPage.waitForSelector('input[type=file]');
        let fileInput = await newPage.$('input[type=file]');
        await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
        await newPage.waitFor(5000);

        await newPage.waitForSelector(
          '#uploadSection > #uploaderArea > #uploadDevice > #uploadSubmit > .primaryLang'
        );
        await newPage.click(
          '#uploadSection > #uploaderArea > #uploadDevice > #uploadSubmit > .primaryLang'
        );

        await newPage.waitForSelector(
          '#imagePreview > #imgPreviewForm > .uploadOptin > #uploadFinalSubmit > .primaryLang'
        );
        await newPage.click(
          '#imagePreview > #imgPreviewForm > .uploadOptin > #uploadFinalSubmit > .primaryLang'
        );

        await newPage.waitFor(3500);
        //Send Reponse

        res.send({
          message: 'Success',
          info: `Check your email periodically for your rebate submission information! It should arrive in a few days through email! Cheers :D`,
          image: 'NA',
        });

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
}); // All tests passed
app.post('/starbucks', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.25,
    products: [
      {
        name: 'Pampers 8-Pack Cotton Body Wet Wipe',
        sku: '1862563',
        price: 45.99,
        img:
          'https://mobileimages.lowes.com/product/converted/100184/1001849788.jpg?size=pdhi',
      },
      {
        name: 'Pampers 9-Pack Cotton Body Wet Wipe (2 Sets)',
        sku: '1844410',
        price: 45.99,
        img:
          'https://mobileimages.lowes.com/product/converted/100185/1001851128.jpg?size=pdhi',
      },
      {
        name: 'Pampers 504-Pack Cotton Body Wet Wipe (2 Sets)',
        sku: '1844403',
        price: 52.99,
        img:
          'https://mobileimages.lowes.com/product/converted/100185/1001851104.jpg?size=pdhi',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  var newPage = await browser.newPage();
  await newPage.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('10/1/2020'), new Date(), {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      //      var receiptChoices = ["bestbuy"]
      var receiptChoices = ['lowes'];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var amount = 1;
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: 'Pampers',
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        // TODO: Start Script

        await newPage.setRequestInterception(true);

        newPage.on('request', (req) => {
          if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            req.resourceType() == 'image'
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        await newPage.bringToFront();
        await newPage.goto('https://www.pampersgiftcard.com/', {
          waitUntil: 'networkidle0',
          timeout: 0,
        });

        element = await newPage.$x(`//*[@id="retailer_title"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="retailer_titleText"]`);
        await element[0].type(`lowe`);

        await newPage.keyboard.press(`Enter`);

        element = await newPage.$x(`//*[@id="splashEmail"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="splashEmail"]`);
        await element[0].type(email);

        element = await newPage.$x(`//a[@id='splashEmailBtn']/span`);
        await element[0].click();
        await newPage.waitFor(2500);

        //

        element = await newPage.$x(`//*[@id="fName"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="fName"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        element = await newPage.$x(`//*[@id="lName"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="lName"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        element = await newPage.$x(`//*[@id="emailConfirm"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="emailConfirm"]`);
        await element[0].type(email);

        element = await newPage.$x(`//*[@id="phone"]`);
        await element[0].click();

        element = await newPage.$x(`//*[@id="phone"]`);
        await element[0].type(phone);

        await newPage.waitForSelector(
          '.contentArea > #registerForm > #regForm #gift_card'
        );
        await newPage.click(
          '.contentArea > #registerForm > #regForm #gift_card'
        );

        await newPage.select(
          '.contentArea > #registerForm > #regForm #gift_card',
          'starbucks'
        );

        await newPage.waitForSelector(
          '.contentArea > #registerForm > #regForm #gift_card'
        );
        await newPage.click(
          '.contentArea > #registerForm > #regForm #gift_card'
        );

        //Captcha
        await page.solveRecaptchas();

        // End of captcha
        await newPage.waitForSelector('input[type=file]');
        let fileInput = await newPage.$('input[type=file]');
        await fileInput.uploadFile(`${__dirname}/images/${photoID}.png`);
        await newPage.waitFor(5000);

        await newPage.waitForSelector(
          '#uploadSection > #uploaderArea > #uploadDevice > #uploadSubmit > .primaryLang'
        );
        await newPage.click(
          '#uploadSection > #uploaderArea > #uploadDevice > #uploadSubmit > .primaryLang'
        );

        await newPage.waitForSelector(
          '#imagePreview > #imgPreviewForm > .uploadOptin > #uploadFinalSubmit > .primaryLang'
        );
        await newPage.click(
          '#imagePreview > #imgPreviewForm > .uploadOptin > #uploadFinalSubmit > .primaryLang'
        );

        await newPage.waitFor(3500);
        //Send Reponse

        res.send({
          message: 'Success',
          info: `Check your email periodically for your rebate submission information! It should arrive in a few days through email! Cheers :D`,
          image: 'NA',
        });

        await newPage.close();
        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await newPage.close();
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await newPage.close();
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await newPage.close();
    await page.close();
    await browser.close();
  }
}); // All tests passed
app.post('/marcum', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 1.5,
    products: [
      {
        name: 'MarCum M3 Flasher Lithium Combo Black',
        sku: '850013782017',
        price: 594.99,
        quantity: 1,
        company: 'MarCum',
        img:
          'https://images-na.ssl-images-amazon.com/images/I/91OTPn2c27L._AC_SL1500_.jpg',
      },
    ],
  };

  // SUBCOMP - Recaptcha Functionality
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-notifications',
    ],
    browserWSEndpoint:
      'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });
  // Configure the navigation timeout
  // MAINCOMP - Intiailize Script
  // var newPage = await browser.newPage();

  var page = await browser.newPage();
  await page.authenticate({
    username: 'lff4fyij',
    password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
  });

  // SUBCOMP - Finance Credits Work
  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(
        new Date('9/1/2020'),
        new Date('12/18/2020'),
        new Date(),
        {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }
      );

      var receiptChoices = ['staples', 'tirekingdom', 'lowes'];
      var photoID = uuidv4();

      // SUBCOMP - Information Generation
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      // Rebate amount is 3+
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: item.quantity,
        image: item.img,
        sku: item.sku,
        price: item.price,
        subprice: item.price,
        quantity: item.quantity,
        // Changed company to be grabbed from object instead for different brand rebates.
        company: item.company,
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      //await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // SUBCOMP - Grab Reciept
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        await page.waitFor(1500);
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
          timeout: 0,
        });
        await page.waitFor(5000);

        // Main Scripts Starts NOW

        let element, formElement, tabs;

        await page.setRequestInterception(true);

        page.on('request', (req) => {
          if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            req.resourceType() == 'image'
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        page.on('dialog', async (dialog) => {
          console.log(dialog.message());
          await dialog.dismiss();
        });

        await page.goto(`https://www.datarebate.com/marcum/`, {
          waitUntil: 'networkidle0',
        });

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtFirstName"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtFirstName"]`);
        await element[0].type(fullName.split(' ').slice(0, -1).join(' '));

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtLastName"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtLastName"]`);
        await element[0].type(fullName.split(' ').slice(-1).join(' '));

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtAddress"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtAddress"]`);
        await element[0].type(`${address} ${address2}`);

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtZipCode"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtZipCode"]`);
        await element[0].type(zip);

        await page.waitFor(1500);

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtCity"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtEmail"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtEmail"]`);
        await element[0].type(email);

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtCnfEmail"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtCnfEmail"]`);
        await element[0].type(email);

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtPhone"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtPhone"]`);
        await element[0].type(phone);

        await page.waitFor(1500);

        element = await page.$x(`//*[@id="txtPurchaseDate"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtPurchaseDate"]`);
        await element[0].type(date);
        await page.waitFor(1500);

        // Drop Down + Upload Section Section Only
        // Select Product
        await page.waitForSelector('#tblProducts #txtPart1');
        await page.click('#tblProducts #txtPart1');

        await page.waitForSelector('#tblProducts #txtPart1');
        await page.click('#tblProducts #txtPart1');

        await page.select(
          '#tblProducts #txtPart1',
          'MarCum M3L Flasher (UPC 850013782017)'
        );

        await page.waitForSelector('#tblProducts #txtPart1');
        await page.click('#tblProducts #txtPart1');

        await page.waitFor(1500);
        // Insert File upload

        input = await page.$('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`);
        await page.waitFor(500);

        // Type in fake Serial Number

        element = await page.$x(`//*[@id="txtSerial_1"]`);
        await element[0].click();

        element = await page.$x(`//*[@id="txtSerial_1"]`);
        await element[0].type(`850013782017`);

        // HACKY HACKY HACKY HACKKKYYY

        element = await page.$x(`//*[@id="btnSubmit"]`);
        await element[0].click();
        await page.waitFor(5000);

        await page.waitFor(5000);
        //await page.$eval('#btnSubmit', (el) => (el.disabled = false));
        // $("#elementID").prop("disabled", true);
        // document.querySelector('.input-checkbox').disabled = true;

        await page.evaluate(
          () => (document.querySelector('[id="btnSubmit"]').disabled = false)
        );

        await page.$eval('#btnSubmit', (el) => (el.disabled = false));

        element = await page.$x(`//*[@id="btnSubmit"]`);
        await element[0].click();

        await page.waitForNavigation();

        const marcumtrackinglink = await page.url();
        var marcumtrackingcode = marcumtrackinglink.split('=').pop();

        // Disable File Upload Button to Submit

        // Fifth Phase - Submit and Complete
        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullpage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });

        fs.unlinkSync(`${__dirname}/images/${photoID}.png`);

        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Your tracking code is: **${marcumtrackinglink}** and your zip code is: **${zip}! Go to **https://www.datarebate.com/** and enter the tracking code as the WEB ID - and the zip code - to track the rebate.`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Theres a problem with this address.',
        image: 'Unavaliable',
      });
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'You dont have the keys required to do this...',
      image: 'Unavaliable',
    });
    await browser.close();
  }
}); // ALl tests passed

/// New Rebate Update - Risk 1.15.2021

app.post('/goodyearvirtual', async (req, res) => {
  const credits = await fetchCredits(req.body.key);
  console.log(credits);

  let invoiceNum = String(new Date().getTime().toString().substring(0, 8));
  console.log(invoiceNum);
  var response = {};
  var isAddressValid = await validate(req.body);
  if (isAddressValid) {
    if (credits >= 3 && credits != false) {
      var today = new Date();
      today.setDate(today.getDate() - getRandomInt(0, 15));
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = String(mm + '/' + dd + '/' + yyyy);
      console.log(today);

      var data = req.body;

      var types = ['jpg', 'jpg', 'jpg'];
      const ext = types[getRandomInt(0, 2)];

      var fullName = data['fullName'];
      var address = data['address1'];
      var address2 = data['address2'];
      var stateAbbr = data['stateAbbr'];
      var subprice = 209.0;
      var itemname = 'ASSURANCE WEATHERREADY';
      var quantity = '4';
      var seller = 'Acceleration Tire';
      var city = data['city'];
      var zip = data['zip'];
      var date = today;
      var email = data['email'];
      var phone = data['phone'];

      var addresses = null;
      if (req.body.address2) {
        addresses = `${address} ${address2}`;
      } else {
        addresses = `${address}`;
      }
      //cash
      var date = today;
       const tireSizeOptions = ["195/65R15", "195/55R16", "205/55R16", "205/60R16", "205/65R16", "215/45R17","215/60R17","215/55R18","225/60R18","235/65R18","255/55R18"]
              let chosenTireSizeOption = String(tireSizeOptions[Math.floor(Math.random() * tireSizeOptions.length)]);
      var { receiptURL, chosen } = tireReceiptGeneratorGoodyear({
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: invoiceNum,
        itemName: itemname,
        quantity: quantity,
        image:
          'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRG6lF2n1qOOtpG0pkoIdVvXiIu_pSxr5Ue99yxqHYkJNG8dhqlU0T0leHdWyBW1jHxvOKK1ahftrtzJT0SzryvLC7OKDlN',
        sku: '',
        price: subprice,
        size: chosenTireSizeOption,
      });
      var url = receiptURL;
      console.log(url);

     
      var id = uuidv4();

      puppeteer.use(StealthPlugin());

      puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
          },
          visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
        })
      );
      // const browser = await puppeteer.launch({headless:false});
      puppeteer
        .launch({
          args: [
       //     '--proxy-server=http://34.195.20.123:31112',
            '--disable-web-security',
            '--window-size=1280,720',
            '--no-sandbox',
            '--disable-features=IsolateOrigins,site-per-process',
          ],

          headless: true,
          slowMo: 50,
         // browserWSEndpoint:
       //     'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112',
        })
        .then(async (browser) => {
          (async () => {
            try {
              const page = await browser.newPage();
           /*    await page.authenticate({
                username: 'lff4fyij',
                password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
              }); */
              await page._client.send('Emulation.clearDeviceMetricsOverride');

              await page.goto(url);
              await page.screenshot({
                path: `${__dirname}/images/${id}.${ext}`,
                fullPage: true,
              });


              
              await page.goto('https://www.goodyearrebates.com/new');
              await page.waitForSelector('#main > #form-new-claim > .section > .container > .btn-next')
              await page.click('#main > #form-new-claim > .section > .container > .btn-next')
                await page.waitFor(2000)
        //       input = await page.waitForSelector('#form-new-claim > section.section.invoice > div > div > div > div > main > ul > button')
        // await input.uploadFile(`${__dirname}/images/${id}.${ext}.png`);
              
              input = await page.waitForSelector('input[type="file"]');
              await page.waitFor(2000)
              await input.uploadFile(`${__dirname}/images/${id}.jpg`);
              await page.waitFor(2000)
              await page.waitFor(500);

              

              await page.waitForSelector('#main > #form-new-claim > .invoice > .container > .btn-next')
              await page.click('#main > #form-new-claim > .invoice > .container > .btn-next')

              await page.waitForSelector('.component-payment-info #paymentMethodId')
              await page.click('.component-payment-info #paymentMethodId')
              
              await page.waitForSelector('.component-typeahead #dealer')
  
              // Choose Retailer Name 
              if (chosen == 'tirerack') {
                await page.type('.component-typeahead #dealer', "Tire Rack Online");
                await page.waitForSelector('.ta-suggestion-list > .ta-suggestion-list-results > .ta-suggestion:nth-child(1) > div > .ta-suggestion-dealer-name')
                await page.click('.ta-suggestion-list > .ta-suggestion-list-results > .ta-suggestion:nth-child(1) > div > .ta-suggestion-dealer-name')
              } else if (chosen=='discounttire') {
                await page.type('.component-typeahead #dealer', "Discount Tire Online");
                await page.waitForSelector('.ta-suggestion:nth-child(1) > div > .ta-suggestion-dealer-name > span > span:nth-child(3) > .ta-suggestion-highlight')
                await page.click('.ta-suggestion:nth-child(1) > div > .ta-suggestion-dealer-name > span > span:nth-child(3) > .ta-suggestion-highlight')

              } else {
                await page.type('.component-typeahead #dealer', "Discount Tire Online");
                await page.waitForSelector('.ta-suggestion:nth-child(1) > div > .ta-suggestion-dealer-name > span > span:nth-child(3) > .ta-suggestion-highlight')
                await page.click('.ta-suggestion:nth-child(1) > div > .ta-suggestion-dealer-name > span > span:nth-child(3) > .ta-suggestion-highlight')
              }
              
              
              
              
              // Fill in calendar for purchase date
               await page.waitFor(2000)
              await page.waitForSelector('.SingleDatePicker > div > .SingleDatePickerInput > .SingleDatePickerInput_calendarIcon > .SingleDatePickerInput_calendarIcon_svg')
  await page.click('.SingleDatePicker > div > .SingleDatePickerInput > .SingleDatePickerInput_calendarIcon > .SingleDatePickerInput_calendarIcon_svg')
  
  await page.waitForSelector('.CalendarMonthGrid_month__horizontal:nth-child(2) > .CalendarMonth > .CalendarMonth_table > tbody > tr:nth-child(1) > .CalendarDay:nth-child(6)')
  await page.click('.CalendarMonthGrid_month__horizontal:nth-child(2) > .CalendarMonth > .CalendarMonth_table > tbody > tr:nth-child(1) > .CalendarDay:nth-child(6)')


        await page.evaluate(() => {
          let dom = document.querySelector('#dateOfPurchase');
          console.log("set the variable");
          dom.outerHTML = `<input class="DateInput_input DateInput_input_1 DateInput_input__readOnly DateInput_input__readOnly_2" aria-label="YYYY-MM-DD" type="text" id="dateOfPurchase" name="dateOfPurchase" placeholder="YYYY-MM-DD" autocomplete="off" aria-describedby="DateInput__screen-reader-message-dateOfPurchase" defaultValue="${yyyy}-${mm}-${dd}">`
        });  
              
              // Fill in invoice receipt number
              await page.type('.component-invoice-number #invoiceNumber', String(invoiceNum));
              // Start of Vehicle Information Section
              // Selecting Make 
              await page.waitFor(1200);
              // Create Array
console.log("Test to make sure this running");

              await page.waitFor(500); //Wait a bit for the website to refresh contents



              // TIre Name, Quantity, Size, Total Prize, Pressing Next
              
              await page.type('#modelNumber-1', "Assurance WeatherReady");
              await page.waitForSelector('.ta-suggestion-list-results > .ta-group > .ta-suggestion > span > .ta-suggestion-highlight')
              await page.click('.ta-suggestion-list-results > .ta-group > .ta-suggestion > span > .ta-suggestion-highlight')
              
             await page.type('#quantity-1', "4");
             // Getting Random Sizes
              await page.type('.component-automotive-tire-size #automotiveTireSize', chosenTireSizeOption);

              // Finally entering the price and pressing next
              await page.type('#purchasePrice', String(taxPrice))

              await page.waitForSelector('body > #main > #form-new-claim > .section > .btn-next')
              await page.click('body > #main > #form-new-claim > .section > .btn-next')
  
              await page.waitForSelector('#main > #form-new-claim > .program-selection > .container > .btn-next')
              await page.click('#main > #form-new-claim > .program-selection > .container > .btn-next')
              
              // Contact Information
              await page.type('#firstName', String(fullName.split(' ').slice(0, -1).join(' ')))
              await page.type('#lastName', String(fullName.split(' ').slice(-1).join(' ')))
              await page.type('#personalEmail', String(email))
              await page.type('#verifyEmail', String(email))
              await page.type('#phone', String(phone))
              await page.type('#address1', String(address))
              await page.type('#address2', String(address2))
              await page.type('#city', String(city))
              await page.type('#postalCode', String(zip))

              // Select State Dropdown 
            await page.waitForSelector('.col-md-6 #province')
            await page.click('.col-md-6 #province')
              await page.select('.col-md-6 #province', stateAbbr)
              
              // Next and virtual option
               
  await page.waitForSelector('#main > #form-new-claim > .personal-info > .container > .btn-next')
              await page.click('#main > #form-new-claim > .personal-info > .container > .btn-next')
              
               await page.waitForSelector('.options-selector-buttons > .row > .col-sm-6:nth-child(2) > .bucket > .btn')
  await page.click('.options-selector-buttons > .row > .col-sm-6:nth-child(2) > .bucket > .btn')
  
  await page.waitForSelector('#main > #form-new-claim > .fulfillment > .container > .btn-next')
  await page.click('#main > #form-new-claim > .fulfillment > .container > .btn-next')
  
  await page.waitForSelector('.col-md-8 > div:nth-child(1) > .component-custom-checkbox > .checkbox-inline > input')
  await page.click('.col-md-8 > div:nth-child(1) > .component-custom-checkbox > .checkbox-inline > input')
  
  await page.waitForSelector('.col-md-8 > div:nth-child(2) > .component-custom-checkbox > .checkbox-inline > input')
  await page.click('.col-md-8 > div:nth-child(2) > .component-custom-checkbox > .checkbox-inline > input')
  
  await page.waitForSelector('#main > #form-new-claim > .confirmation > .container > .btn-next')
              await page.click('#main > #form-new-claim > .confirmation > .container > .btn-next')
              
               await page.waitFor(4200);
                 await page.waitForSelector('.row > .col-md-8 > div > .btn > span')
              await page.click('.row > .col-md-8 > div > .btn > span')
              await page.waitFor(1200);
              let trackinglinkgoodyear = 'page.url()'






              // End of Script
              await page.waitFor(1200);
              var base64 = await page.screenshot({
                encoding: 'base64',
                fullPage: true,
              });
              base64 = await watermark(base64);
              var options = {
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                  Authorization: 'Client-ID 85d1b80290d4578',
                },
                formData: {
                  type: 'base64',
                  image: base64,
                },
              };
              const s = await request.post(options);

              console.log(JSON.parse(s)['data']['link']);

              await browser.close();
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);
              await removeCredit(req.body.key);

  
              
              response.image = JSON.parse(s)['data']['link'];
              response.info = `Use the link, ${trackinglinkgoodyear}, to track this rebate.`;
              response.message = 'success';
              res.send(response);
            } catch (e) {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('error');
            } finally {
              response.message = 'error';
              response.image = null;
              response.info =
                'Ensure that address hasnt been entered twice for this rebate or try again later - Credits have not been deducted';
              res.send(JSON.stringify(response));
              console.log('We do cleanup here');
            }
          })();
        });
    } else {
      if (credits < 1) {
        const s = await deleteKey(req.body.key);
        if (!s) {
          response.message = 'Error';
          response.image = `NA`;
          response.info = 'Key not found';
        }
        if (s) {
          response.message = 'Insufficient credits';
          response.image = `credits available: ${credits}`;
          response.info = 'Key will be removed';
        }
      }

      res.send(response);
    }
  } else {
    response.message = 'error';
    response.image = null;
    response.info =
      'Address invalid - Please verify with Google Maps the correct info and resubmit';
    res.send(response);
  }
}); // Incomplete

app.post('/nature', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.5,
    products: [
      // Balance Bar Company
      {
        name: 'Balance Bar, Healthy Protein Snacks, Cookie Dough, With Vitamin A, Vitamin C, Vitamin D, and Zinc to Support Immune Health, 1.76 oz, Pack of Three 6-Count Boxes',
        sku: 'B01MRFI0NE',
        price: 16.99,
        amount: 3,
        company: 'BALANCE Bar',
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71FNwDbCWUL._AC_SL1146_.jpg',
      },
      {
        name: 'Balance Bar, Healthy Protein Snacks, Peanut Butter, with Vitamin A, Vitamin C, Vitamin D, and Zinc to Support Immune Health, 1.76 oz, Pack of Three 6-Count Boxes',
        sku: 'B01M9K9G8G',
        company: 'BALANCE Bar',
        price: 16.99,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/61jZ3zIvedL._AC_SL1200_.jpg',
      },
      {
        name: 'Balance Bar, Healthy Protein Snacks, Yogurt Honey Peanut, With Vitamin A, Vitamin C, Vitamin D, and Zinc to Support Immune Health, 1.76 oz, Pack of Three 6-Count Boxes',
        sku: 'B01M7YXBL2',
        company: 'BALANCE Bar',
        price: 21.54,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/61fxsnbw2tL._AC_SL1146_.jpg',
      },
      // X Company
      {
        name: 'Ester-C Vitamin C 1000 mg Coated Tablets, 120 Count, Immune System Booster, Stomach-Friendly Supplement, Gluten-Free',
        sku: 'B0013FYHSW',
        company: 'Ester-C',
        price: 23.75,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/618EiiNmkaL._AC_SL1001_.jpg',
      },
      {
        name: 'American Health Ester-C 500 mg with Citrus Bioflavonoids - 240 Capsules - Gentle On Stomach',
        sku: 'B000WKSZ7S',
        company: 'Ester-C',
        price: 24.35,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71pckRwnVtL._AC_SL1500_.jpg',
      },
      {
        name: 'American Health Ester-C with Citrus Bioflavonoids Veg Tablets - 24-Hour Immune Support, 180 Count, 180 Servings',
        sku: 'B000WKW6QO',
        company: 'Ester-C',
        price: 28.89,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71r4S4wCQPL._AC_SL1500_.jpg',
      },
      // Nature's Bounty
      {
        name: 'Nature’s Bounty 125 mcg (5000iu), 240 Pack',
        sku: 'B08SWL65TP',
        company: 'Nature’s Bounty',
        price: 16.44,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/81gVEzsGyCL._AC_SL1500_.jpg',
      },
      {
        name: 'Nature’s Bounty Elderberry Gummies, Contains Vitamin A, C, D, E and Zinc, 40 Gummies',
        sku: 'B07R95PCB8',
        company: 'Nature’s Bounty',
        price: 10.99,
        amount: 3,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/81-EbKolasL._AC_SL1500_.jpg',
      },
      {
        name: 'Nature’s Bounty Turmeric Pills and Herbal Health Supplement, Supports Joint Pain Relief and Antioxidant Health, 538mg, 45 Capsules',
        sku: 'B00V4CSADM',
        company: 'Nature’s Bounty',
        price: 15.99,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/714AYcPcj3L._AC_SL1500_.jpg',
      },
      {
        name: 'Nature’s Bounty Complete Mens Multivitamin, 100 Tablets',
        sku: 'B08SWL65TP',
        company: 'Nature’s Bounty',
        price: 10.26,
        amount: 3,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/61hET1hBU6L._AC_SL1500_.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',
	  

      '--disable-features=IsolateOrigins,site-per-process',
    ],
   browserWSEndpoint:
     'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 75,
  });

  var page = await browser.newPage();


  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/1/2021'), new Date('1/23/2021'));
      var receiptChoices = ['besybuydetails'];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: item.amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: item.company,
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');
        console.log(receiptURL);

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });
 await page.authenticate({
 username: 'lff4fyij',
 password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
 });
          // Enter User Email
        await page.goto('https://www.naturesbountypromo.com/upload')
        await page.setViewport({ width: 1404, height: 896 })
        await page.waitForSelector('.row #emailAddress')
        await page.click('.row #emailAddress')
        await page.type('.row #emailAddress', email)
        await page.waitForSelector('.row > .col-7 > #uploadReceiptForm > .buttons > .button')
        await page.click('.row > .col-7 > #uploadReceiptForm > .buttons > .button')
        // Enter Receipt Upload
        input = await page.waitForSelector('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`)
        await page.waitFor(4500);
        await page.waitForSelector('#uploadConfirmImageFileForm > fieldset > button')
        await page.click('#uploadConfirmImageFileForm > fieldset > button')
        await page.waitFor(6000)
        // Start filling out the form

	await page.waitForSelector('.container > #registerForm #form_Firstname')
        await page.type('.container > #registerForm #form_Firstname', fullName.split(' ').slice(0, -1).join(' '))
        await page.type('.container > #registerForm #form_Lastname', fullName.split(' ').slice(-1).join(' '))
        await page.type('.container > #registerForm #form_Address1', address)
        await page.type('.container > #registerForm #form_Address2', address2)
        await page.type('.container > #registerForm #form_City', city)
        await page.type('.container > #registerForm #form_Zip', zip)
        await page.type('.container > #registerForm #form_Phone', getRandomInt(1000000000,9999999999).toString())
        // Complete Checkboxes & Solve Captcha & Press Submit Button
        
        await page.select('.container > #registerForm #form_State', `string:${String(abbrState(stateAbbr, 'name'))}`)
		        await page.waitFor(750);

  await page.click('.container > #registerForm > .ng-scope > .ng-invalid > .box-label')
  
        await page.solveRecaptchas()
        await page.waitFor(2000);
        console.log('solved the catpcha')
  await page.click('#registerForm > fieldset.buttons > button')
          await page.waitFor(7000);
        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Your rebate has been submitted successfully. Look out for an email confirmation soon. It may take a few hours to arrive if the systems are overloaded.`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await page.close();
    await browser.close();
  }
}); // All tests passed - CHECK

app.post('/deramaxx', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 3,
    products: [
      {
        name: 'American Health Ester-C 500 mg with Citrus Bioflavonoids - 240 Capsules - Gentle On Stomach',
        sku: 'B000WKSZ7S',
        company: 'Ester-C',
        price: 24.35,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71pckRwnVtL._AC_SL1500_.jpg',
      },
      {
        name: 'American Health Ester-C with Citrus Bioflavonoids Veg Tablets - 24-Hour Immune Support, 180 Count, 180 Servings',
        sku: 'B000WKW6QO',
        company: 'Ester-C',
        price: 28.89,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71r4S4wCQPL._AC_SL1500_.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
   browserWSEndpoint:
     'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });

  var page = await browser.newPage();
 await page.authenticate({
 username: 'lff4fyij',
 password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
 });

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/1/2021'), new Date('1/23/2021'));
      var receiptChoices = ['lowes', 'besybuydetails'];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: item.amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: item.company,
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

         // Start Main Script
        await page.goto('https://www.elancorebates.com/#/promodisplay')
        await page.waitForSelector('.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding')
        await page.click('.col-md-6 > div > .ng-scope > #continueOrSubmitBtn > .ng-binding')
        input = await page.waitForSelector('input[type="file"]');
        await input.uploadFile(`${__dirname}/images/${photoID}.png`)
        await page.waitFor(3000);

        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Your rebate has been submitted successfully. Look out for an email confirmation soon. It may take a few hours to arrive if the systems are overloaded.`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await page.close();
    await browser.close();
  }
}); // Incomplete

app.post('/listerine', async (req, res) => {
  var rebateInfo = {
    rebatePrice: 0.25,
    products: [
      {
        name: 'Listerine Total Care Anticavity Fluoride Mouthwash, Fresh Mint Flavor, 1 L',
        sku: '312547306355',
        company: 'Listerine',
        price: 6.12,
        amount: 1,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/81vNiROdiIL._SL1500_.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
    args: [
      //'--proxy-server=http://34.195.20.123:31112',
      '--disable-web-security',
      '--window-size=1280,720',

      '--disable-features=IsolateOrigins,site-per-process',
    ],
  //browserWSEndpoint:
    // 'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://34.195.20.123:31112:31112&--window-size=1280,720',

    slowMo: 50,
  });

 /*  var page = await browser.newPage();
 await page.authenticate({
 username: 'lff4fyij',
 password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
 });
 */
  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/1/2021'), new Date('1/24/2021'));
      var receiptChoices = ['walmart', 'besybuydetails', "staples", 'lowes'];
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: item.amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: item.company,
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `images/${photoID}.png`,
          fullPage: true,
        });

        var listerinepassword = generator.generate({
          length: 10,
          numbers: true
        });

         // Start Main Script
        await page.setViewport({ width: 1920, height: 983 })
        await page.goto('https://www.earnrewards.com/listerine21daychallenge/create_account')
        await page.type('#first-name', fullName.split(' ').slice(0, -1).join(' '))
        await page.type('#last-name', fullName.split(' ').slice(-1).join(' '))
        await page.type('#address1', address)
        await page.type('#city', city)
        await page.type('#zip', zip)
        await page.type('#email', email)
        await page.type('#email2', email)
        await page.type('#password', listerinepassword)
        await page.type('#password2', listerinepassword)
        await page.waitForSelector('.submit-spinner-form #state')
        await page.click('.submit-spinner-form #state')
        await page.select('.submit-spinner-form #state', stateAbbr)
        await page.waitForSelector('.submit-spinner-form #state')
        await page.click('.submit-spinner-form #state')
        await page.waitForSelector('.submit-spinner-form #tos')
        await page.click('.submit-spinner-form #tos')
        await page.waitForSelector('.submit-spinner-form #old-enough')
        await page.click('.submit-spinner-form #old-enough')
        await page.waitFor(3000)
        await page.solveRecaptchas()
        await page.waitFor(3000)
        await page.waitForSelector('#content > .wrap > .submit-spinner-form > .text-center > .btn')
        await page.click('#content > .wrap > .submit-spinner-form > .text-center > .btn')
  
        await navigationPromise
         

        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Your rebate has been submitted successfully. Look out for an email confirmation soon. It may take a few hours to arrive if the systems are overloaded.`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await page.close();
    await browser.close();
  }
}); // Incomplete

app.post('/bandaid', async (req, res) => {
  var rebateInfo = {
    rebatePrice: .50,
    products: [
      {
        name: 'Aveeno Positively Radiant Skin Brightening Exfoliating Daily Facial Scrub, Moisture-Rich Soy Extract, Soap-Free, Hypoallergenic & Non-Comedogenic Face Cleanser, 5 Oz',
        sku: '38137119283',
        company: 'Aveeno',
        price: 5.64,
        amount: 5,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71nCNI4p2oL._SL1500_.jpg',
      },
      {
        name: 'Aveeno Baby Hand & Face Cleansing & Moisturizing Wipes with Oat Extract and Aloe, Fragrance-Free Wipes for Sensitive Skin, Free of Sulfates, Alcohol, Parabens, and Dyes, 25 ct (Pack of 4)',
        sku: '38137117987',
        company: 'Aveeno',
        price: 13.96,
        amount: 2,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/618QfqnyyWL._AC_SL1440_.jpg',
      },
      {
        name: 'Aveeno Baby Calming Comfort Bath & Wash with Relaxing Lavender & Vanilla Scents & Natural Oat Extract, Hypoallergenic & Tear-Free Formula, Paraben-, Phthalate- & Soap-Free, 18 fl. oz',
        sku: '381371159505',
        company: 'Aveeno',
        price: 11.98,
        amount: 3,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71LM1%2B0SBXL._AC_SL1500_.jpg',
      },
      {
        name: 'Adhesive Strip Band-Aid® 0.875 X 2.5625 Inch Plastic Rectangle Tan',
        sku: '38137004414',
        company: 'Band-Aid',
        price: 11.99,
        amount: 3,
        img:
          'https://www.suprememed.com/pub/media/catalog/product/cache/64831c4317c6ec42652220923459f7ca/a/d/adhesive-bandage-band-aid-strip-7-8-x-2-9-16-inch-38137004414_587763.jpg',
      },
      {
        name: 'First Aid Water Block Waterproof Adhesive Tape Roll',
        sku: '38137117121',
        company: 'Johnson & Johnson',
        price: 3.99,
        amount: 10,
        img:
          'https://pics.drugstore.com/prodimg/618576/900.jpg',
      },
      //
      {
        name: 'Aveeno Positively Radiant Skin Brightening Exfoliating Daily Facial Scrub, Moisture-Rich Soy Extract, Soap-Free, Hypoallergenic & Non-Comedogenic Face Cleanser, 5 Oz',
        sku: '38137119283',
        company: 'Aveeno',
        price: 5.64,
        amount: 6,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71nCNI4p2oL._SL1500_.jpg',
      },
      {
        name: 'Aveeno Baby Hand & Face Cleansing & Moisturizing Wipes with Oat Extract and Aloe, Fragrance-Free Wipes for Sensitive Skin, Free of Sulfates, Alcohol, Parabens, and Dyes, 25 ct (Pack of 4)',
        sku: '38137117987',
        company: 'Aveeno',
        price: 13.96,
        amount: 3,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/618QfqnyyWL._AC_SL1440_.jpg',
      },
      {
        name: 'Aveeno Baby Calming Comfort Bath & Wash with Relaxing Lavender & Vanilla Scents & Natural Oat Extract, Hypoallergenic & Tear-Free Formula, Paraben-, Phthalate- & Soap-Free, 18 fl. oz',
        sku: '381371159505',
        company: 'Aveeno',
        price: 11.98,
        amount: 4,
        img:
          'https://images-na.ssl-images-amazon.com/images/I/71LM1%2B0SBXL._AC_SL1500_.jpg',
      },
      {
        name: 'Adhesive Strip Band-Aid® 0.875 X 2.5625 Inch Plastic Rectangle Tan',
        sku: '38137004414',
        company: 'Band-Aid',
        price: 11.99,
        amount: 4,
        img:
          'https://www.suprememed.com/pub/media/catalog/product/cache/64831c4317c6ec42652220923459f7ca/a/d/adhesive-bandage-band-aid-strip-7-8-x-2-9-16-inch-38137004414_587763.jpg',
      },
      {
        name: 'First Aid Water Block Waterproof Adhesive Tape Roll',
        sku: '38137117121',
        company: 'Johnson & Johnson',
        price: 3.99,
        amount: 9,
        img:
          'https://pics.drugstore.com/prodimg/618576/900.jpg',
      },
    ],
  };
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'fa246e3abd30c14532e78c90d14ad08a', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  var browser = await puppeteer.launch({
    headless: true,
	ignoreHTTPSErrors: true,
    args: [
      '--proxy-server=http://35.170.89.235:31112',
      '--disable-web-security',
      '--window-size=1280,720',
    '--ignore-certificate-errors',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
   browserWSEndpoint:
     'wss://chrome.browserless.io?token=a8e62c23-2b4a-4c86-81ac-12512dbaad50&--proxy-server=https://35.170.89.235:31112:31112&--window-size=1280,720',

    slowMo: 20,
  });

  var page = await browser.newPage();
  await page.authenticate({
 username: 'lff4fyij',
 password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
 }); 

  if (
    (await fetchCredits(req.body.key)) >= rebateInfo.rebatePrice &&
    (await fetchCredits(req.body.key)) != null &&
    (await fetchCredits(req.body.key)) != undefined
  ) {
    if (await validate(req.body)) {
      var {
        fullName,
        address,
        address2,
        stateAbbr,
        city,
        zip,
        email,
        phone,
      } = req.body;
      var date = randomTime(new Date('1/1/2021'), new Date('1/23/2021'));
      var receiptChoices = ['besybuydetails'];
      
      var photoID = uuidv4();

      //Generating all needed info
      var birthday = randomTime(new Date('6/25/1970'), new Date('1/1/2001'), {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      var chosen =
        receiptChoices[Math.floor(Math.random() * receiptChoices.length)];
      
      console.log(`we have chosen ${chosen}`);
      var item =
        rebateInfo.products[
          Math.floor(Math.random() * rebateInfo.products.length)
        ];
      var receiptURL = `http://localhost:8000/${chosen}?`;
      var data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        address2: address2,
        city: city,
        stateAbbr: stateAbbr,
        zip: zip,
        date: date,
        invoiceNum: new Date().getTime().toString().substring(0, 8),
        itemName: item.name,
        quantity: item.amount,
        image: item.img,
        sku: item.sku,
        price: item.price,
        company: item.company,
      };
      for (let index = 0; index < Object.entries(data).length; index++) {
        receiptURL += `${Object.entries(data)[index][0]}=${
          Object.entries(data)[index][1]
        }&`;
      }
      await page._client.send('Emulation.clearDeviceMetricsOverride');

      try {
        // TODO: Get Receipt
        await page.goto(receiptURL, {
          waitUntil: 'networkidle0',
        });
        console.log(receiptURL);
        await page.screenshot({
          path: `${__dirname}/images/${photoID}.png`,
          fullPage: true,
        });

         // Start Main Script
        
           var page = await browser.newPage();
  await page.authenticate({
 username: 'lff4fyij',
 password: 'AsxCCUPkQLQkZ3no_country-UnitedStates',
 }); 
          
  await page.goto('https://www2.activaterewards.com/startsmart/choose_receipt_type', { waitUntil: 'domcontentloaded' })
  
  await page.setViewport({ width: 1756, height: 846 })
  
  await page.waitForSelector('#main > #chooseReceiptTypeWrapper > .btn:nth-child(5) > .btn-text > .title')
        await page.click('#main > #chooseReceiptTypeWrapper > .btn:nth-child(5) > .btn-text > .title')
        
        await page.waitForSelector('#ActivationDataFirstName')

        await page.type('#ActivationDataFirstName', fullName.split(' ').slice(0, -1).join(' '))
        await page.type('#ActivationDataLastName', fullName.split(' ').slice(-1).join(' '))
        await page.type('#ActivationDataAddress1', address)
        await page.type('#ActivationDataCity', city)
        await page.type('#ActivationDataPostal', zip)
        await page.type('#ActivationDataEmail', email)
        await page.type('#ActivationDataEmail2', email)

          
  await page.waitForSelector('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataTos')
  await page.click('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataTos')
  
  await page.waitForSelector('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataState')
  await page.click('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataState')
  
  await page.select('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataState', stateAbbr)
  
  await page.waitForSelector('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataState')
        await page.click('#main > #activationFormWrapper > #ActivationDataActivateForm #ActivationDataState')
		        await page.waitFor(300)

        await page.solveRecaptchas()

         		        await page.waitFor(300)

const elements = await page.$x(`/html/body/div[1]/div/div/form/button`)
await elements[0].click() 

  
await page.waitFor(1000)
await page.waitForSelector("#proceed-button")
await page.click("#proceed-button")
await page.waitFor(7500)

        input = await page.waitForSelector(`input[type="file"]`);
              await page.waitFor(2000)
              await input.uploadFile(`${__dirname}/images/${photoID}.png`);
              await page.waitFor(6000)

          
  await page.waitForSelector('#wrapper > #main > .container > #ActivationDataUploadForm > .btn')
  await page.click('#wrapper > #main > .container > #ActivationDataUploadForm > .btn', {
        waitUntil: 'networkidle0'
      })
  
        await page.waitFor(3500)
        
        //Send Reponse
        let finalImage = await page.screenshot({
          encoding: 'base64',
          fullPage: true,
        });
        finalImage = await watermark(finalImage);
        await removeCreditz(req.body.key);
        await removeCreditz(req.body.key);

        let imgurPost = await axios({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 85d1b80290d4578',
          },
          data: {
            type: 'base64',
            image: finalImage,
          },
        });
        console.log(imgurPost.data.data.link);
        res.send({
          message: 'Success',
          info: `Your rebate has been submitted successfully. Look out for an email confirmation soon. It may take a few hours to arrive if the systems are overloaded.`,
          image: imgurPost.data.data.link,
        });

        await page.close();
        await browser.close();
      } catch (error) {
        console.log(error);
        res.send({
          message: 'error',
          info: 'Script Error | Contact Admin |' + error,
          image: 'Unavaliable',
        });
        await page.close();
        await browser.close();
      }
    } else {
      res.send({
        message: 'error',
        info: 'Address Error',
        image: 'Unavaliable',
      });
      await page.close();
      await browser.close();
    }
  } else {
    res.send({
      message: 'error',
      info: 'Credit Error',
      image: 'Unavaliable',
    });
    await page.close();
    await browser.close();
  }
}); // Incomplete