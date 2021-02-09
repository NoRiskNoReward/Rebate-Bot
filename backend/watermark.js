const Jimp = require('jimp');
var fs = require('fs');
const fses = require('fs').promises;
var s;
(async () => {
  s = await watermark('ss');
  console.log(s);
})();
async function watermark(ORIGINAL_IMAGE) {
  var bitmap = await fses.readFile(
    './images/48c0cece-3ecf-4ef0-9edb-20552623773f.jpeg'
  );
  // convert binary data to base64 encoded string
  var ORIGINAL_IMAGE = new Buffer(bitmap).toString('base64');

  const LOGO = 'https://i.imgur.com/34rIGBW.png';

  const LOGO_MARGIN_PERCENTAGE = 1;

  const main = async () => {
    const [image, logo] = await Promise.all([
      Jimp.read(Buffer.from(ORIGINAL_IMAGE, 'base64')),
      Jimp.read(LOGO),
    ]);

    logo.resize(image.bitmap.width, Jimp.AUTO);

    const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;

    return image.composite(logo, X, Y, [
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 0.1,
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
  return s;
}
