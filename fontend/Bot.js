const { token, prefix, devToken, webhook, admins } = require('./config.js');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const request = require('request-promise-native');

function returnMessage(message, user) {
  let rawdata = fs.readFileSync(`./messages/${message}.json`);
  let messageJson = JSON.parse(rawdata);
  if (user) {
    messageJson.title += ` ${user}`;
  }
  messageJson.timestamp = new Date();
  return messageJson;
}

function returnCurrentRebates() {
  let rawdata = fs.readFileSync('./rebatesList.json');
  let rebatesJson = JSON.parse(rawdata);
  return rebatesJson.allRebates;
}

async function returnBalance(key) {
  var response = await axios.get(`http://localhost:8000/credits?key=${key}`, {
    timeout: 1000,
  });
  return response.data;
}

function returnPages() {
  let pages = [];
  let currentRebates = returnCurrentRebates();
  let selectionIndex = 1;

  currentRebates.map((page) => {
    let rebates = '';
    let path = {};

    for (let index = 0; index < page.rebates.length; index++) {
      rebates += `\n[${selectionIndex}] - ${page.rebates[index]}`;
      path[selectionIndex.toString()] = page.paths[index];
      selectionIndex++;
    }
    pages.push({
      title: page.price,
      rebates: rebates.trim(),
      path: path,
    });
  });

  finalPages = [];

  for (let index = 0; index < pages.length; index = index + 2) {
    finalPages.push(pages.slice(index, index + 2));
  }
  return finalPages;
}

function editMessage(botMessage, pageIndex, user) {
  let pages = returnPages();
  let editedMessage = returnMessage('rebates', user);

  for (let index = 0; index < pages[pageIndex].length; index++) {
    editedMessage.fields[index].name = pages[pageIndex][index].title;
    editedMessage.fields[index].value = pages[pageIndex][index].rebates;
  }

  botMessage.edit({ embed: editedMessage });
}

function parseRebates(selection) {
  let pages = returnPages();
  for (let index = 0; index < pages.length; index++) {
    for (let index2 = 0; index2 < pages[index].length; index2++) {
      if (pages[index][index2].rebates.includes(`[${selection}]`)) {
        console.log(pages[index][index2].title);
        var options = pages[index][index2].rebates.split('\n');
        for (let index3 = 0; index3 < options.length; index3++) {
          if (options[index3].includes(`[${selection}]`)) {
            return {
              price: pages[index][index2].title,
              selection: options[index3],
              path: pages[index][index2].path[selection.toString()],
            };
          }
        }
      }
    }
  }
}

async function sendRequest(data, message, path) {
  finalMessage = returnMessage('finalMessage', message.author.tag);
  let response = await axios.post('http://localhost:8000/' + path, data, {
    'Content-Type': 'application/json',
    timeout: 350000,
  });

  finalMessage.fields[0].value = response.data.message;
  finalMessage.fields[1].value = response.data.info;
  finalMessage.fields[2].value = response.data.image;

  if (response.data.message == 'error') {
    finalMessage.fields[1].value = 'Error - Resubmit';

    finalMessage.color = 16711731;
    await message.reply({
      embed: finalMessage,
    });
    await sendBackendLog({
      person: `Full Name: ${data.fullName}\nPhone: ${data.phone}`,
      status: 'Failure',
      rebate: path,
      key: data.key,
      info: response.data.info,
      image: 'NA',
      address: `${data.address}, ${data.address2}\n ${data.city}, ${data.stateAbbr}, ${data.zip}`,
      user: message.author.tag,
    });
  } else {
    await message.reply({
      embed: finalMessage,
    });
    await sendBackendLog({
      person: `Full Name: ${data.fullName}\nPhone: ${data.phone}`,
      status: 'Success',
      rebate: path,
      key: data.key,
      info: response.data.info,
      image: response.data.image,
      address: `${data.address}, ${data.address2}\n ${data.city}, ${data.stateAbbr}, ${data.zip}`,
      user: message.author.tag,
    });
  }
}

async function submitRebateRequest(promptData, message, token, path) {
  console.log('path: ' + path);
  var data = {
    email: promptData[0],
    fullName: promptData[1],
    address1: promptData[2],
    address: promptData[2],
    address2: promptData[3].toLowerCase() == 'na' ? '' : promptData[3],
    city: promptData[4],
    stateAbbr: promptData[5],
    zip: promptData[6],
    phone: promptData[7],
    key: token,
  };
  console.log(data);

  if (Array.isArray(path)) {
    path.forEach(
      async (path) => await sendRequest(data, message, path.toLowerCase())
    );
  } else {
    await sendRequest(data, message, path.toLowerCase());
  }
}

async function submitAddress(promptData, message) {
  var data = {
    address1: promptData[0],
    address: promptData[0],
    address2: promptData[1].toLowerCase() == 'na' ? '' : promptData[1],
    city: promptData[2],
    stateAbbr: promptData[3],
    zip: promptData[4],
  };
  let response = await axios.post(
    'http://localhost:8000/addressVerification',
    data,
    { 'Content-Type': 'application/json' }
  );
  finalMessage = returnMessage('finalMessage', message.author.tag);
  finalMessage.fields[0].value = response.data.message;
  finalMessage.fields[1].value = response.data.info;
  finalMessage.fields.splice(2, 1);

  if (response.data.message == 'error') {
    finalMessage.color = 16711731;
    await message.reply({
      embed: finalMessage,
    });
  } else {
    await message.reply({
      embed: finalMessage,
    });
  }
}

async function adminSubmit(path, message) {
  var data = {
    email: 'jakepaul381@gmail.com',
    fullName: 'jasper smith',
    address: '2145 armstrong dr',
    address1: '2145 armstrong dr',
    stateAbbr: 'CA',
    city: 'Pleasanton',
    zip: '94588',
    phone: '9253716231',
    key: '9UUKPTS3C3CCE5MET1WFAMNVQ9RZ5UXQNFQ3TWR1G4BXGG1HCG',
  };
  await sendRequest(data, message, path.toLowerCase());
}

async function sendBackendLog(data) {
  var backendMessage = returnMessage('backendLog', false);
  backendMessage.content = data.person;
  backendMessage.embeds[0].color =
    data.status.toLowerCase() == 'success' ? 1953362 : 16711731;
  backendMessage.embeds[0].fields[0].value = data.status;
  backendMessage.embeds[0].fields[1].value = data.rebate;
  backendMessage.embeds[0].fields[2].value = data.key;
  backendMessage.embeds[0].fields[3].value = data.info;
  backendMessage.embeds[0].fields[4].value = data.image;
  backendMessage.embeds[0].fields[5].value = data.address;
  backendMessage.embeds[0].fields[6].value = data.user;
  await axios.post(webhook, backendMessage, {
    'Content-Type': 'application/json',
  });
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('for rebates', {
    type: 'WATCHING',
  });
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const argsByComma = message.content.slice(prefix.length).trim().split(',');
  const cmd = args.shift().toLowerCase();

  //We use cmd^ to remove the command from args split by comma
  argsByComma[0] = argsByComma[0].replace(cmd, '').trim();
  argsByComma.forEach((arg, i) => (argsByComma[i] = arg.trim()));

  let filter = (reaction, user) => {
    return (
      ['⬅️', '➡️'].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  let filter2 = (m) => m.author.id === message.author.id;

  if (cmd == 'admin' && admins.includes(message.author.id)) {
    await message.reply('Submitting');
    await adminSubmit(args[0], message);
  }

  if (cmd == 'stack') {
    if (args.length < 1) {
      // Key not given
      let errorMessage = returnMessage('error', message.author.tag);
      errorMessage.description =
        '😰 Uh oh, look likes somethings missing! I think you meant to type ``!stack [key1,key2,key3]``';
      await message.channel.send({
        embed: errorMessage,
      });
    } else {
      let balanceMessage = returnMessage('stack', message.author.tag);

      var keys = args[0].toString().split(',');
      if (keys.length < 2) {
        balanceMessage.fields[0].value = 'ERROR 2+ keys needed to Stack';
        balanceMessage.color = 16711731;
        await message.channel.send({
          embed: balanceMessage,
        });
      } else {
        var total = 0.0;
        var curr;
        var invalid = true;
        var x;
        for (x = 0; x < keys.length; x++) {
          curr = await fetchCredits(keys[x].replace(/\s/g, ''));
          if (curr == 0 || curr == null) {
            invalid = false;
          }
        }
        if (invalid == true) {
          for (x = 0; x < keys.length; x++) {
            curr = await fetchCredits(keys[x].replace(/\s/g, ''));

            total += await fetchCredits(keys[x].replace(/\s/g, ''));

            await delCredits(keys[x].replace(/\s/g, ''));
          }

          console.log(total);
          var balance = await newCredit(total);

          balanceMessage.fields[0].value = balance;
          await message.channel.send({
            embed: balanceMessage,
          });
        } else {
          balanceMessage.fields[0].value = 'ERROR invalid key in stack command';
          balanceMessage.color = 16711731;
          await message.channel.send({
            embed: balanceMessage,
          });
        }
      }
    }
  }

  if (cmd == 'balance') {
    if (args.length < 1) {
      // Key not given
      let errorMessage = returnMessage('error', message.author.tag);
      errorMessage.description =
        '😰 Uh oh, look likes somethings missing! I think you meant to type ``!balance [key]``';
      await message.channel.send({
        embed: errorMessage,
      });
    } else {
      let balanceMessage = returnMessage('balance', message.author.tag);
      let balance = await returnBalance(args[0]);

      if (balance) {
        balanceMessage.fields[0].value = balance;
        await message.channel.send({
          embed: balanceMessage,
        });
      } else {
        balanceMessage.fields[0].value = 'ERROR';
        balanceMessage.color = 16711731;
        await message.channel.send({
          embed: balanceMessage,
        });
      }
    }
  }

  if (cmd == 'submit') {
    if (args.length < 2) {
      // Key not given
      let errorMessage = returnMessage('error', message.author.tag);
      errorMessage.description =
        '😰 Uh oh, look likes somethings missing! I think you meant to type ``!submit [selection] [token]`` Use ``!rebates`` to see the current selection of rebates';
      await message.channel.send({
        embed: errorMessage,
      });
    } else {
      var selection = args[0];
      var token = args[1];
      var parsedRebate = parseRebates(selection);

      var initialMessage = returnMessage('infoInitial', message.author.tag);
      initialMessage.description = initialMessage.description
        .replace('#', selection)
        .replace(
          'optiondescription',
          parsedRebate.selection.replace(`[${selection}] - `, '').trim()
        )
        .replace('ticketprice', parsedRebate.price);

      var promptmessage = returnMessage('infoPrompt', message.author.tag);

      await message.reply({ embed: initialMessage });
      var responses = [];
      var collector = message.channel.createMessageCollector(filter2, {
        time: 10000000,
      });
      collector.on('collect', async (m) => {
        if (m.content.toLowerCase() !== 'cancel') {
          switch (responses.length) {
            case 0:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'Full Name';
              promptmessage.fields[0].value =
                "Please reply with your full name. Dont worry you can enter a fake name if you'd prefer.";
              m.reply({ embed: promptmessage });
              break;
            case 1:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'Street Address';
              promptmessage.fields[0].value =
                'Please reply with your street address. If the rebate provides a physical reward this information must be accurate.\n Example: 7707 West Hartford Drive';
              m.reply({ embed: promptmessage });
              break;
            case 2:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'Address Line 2';
              promptmessage.fields[0].value =
                'Please reply with your Apt, Suite, etc. or type NA if not needed';
              m.reply({ embed: promptmessage });
              break;
            case 3:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'City';
              promptmessage.fields[0].value = 'Please reply with your city';
              m.reply({ embed: promptmessage });
              break;
            case 4:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'State Abbreviation';
              promptmessage.fields[0].value =
                'Please reply with State Abbreviation (CA,NY,TX,etc.)';
              m.reply({ embed: promptmessage });
              break;
            case 5:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'Zip';
              promptmessage.fields[0].value = 'Please enter US Zip code';
              m.reply({ embed: promptmessage });
              break;
            case 6:
              responses.push(m.content);
              promptmessage.title = '';
              promptmessage.fields[0].name = 'Phone';
              promptmessage.fields[0].value = 'Please enter your phone number';
              m.reply({ embed: promptmessage });
              break;
            case 7:
              // finished
              responses.push(m.content);
              m.reply({ embed: returnMessage('submitConfirm', m.author.tag) });
              await submitRebateRequest(responses, m, token, parsedRebate.path);
              break;
            default:
              collector.stop();
          }
        } else {
          collector.stop();
        }
      });
    }
  }

  if (cmd == 'rebates') {
    let pageIndex = 0;
    let pages = returnPages();
    let rebatesMessage = returnMessage('rebates', message.author.tag);

    for (let index = 0; index < pages[0].length; index++) {
      rebatesMessage.fields[index].name = pages[0][index].title;
      rebatesMessage.fields[index].value = pages[0][index].rebates;
    }

    message.channel
      .send({
        embed: rebatesMessage,
      })
      .then((botMessage) => {
        botMessage.react('⬅️');
        botMessage.react('➡️');
        botMessage
          .createReactionCollector(filter, {
            time: 10000000,
          })
          .on('collect', (reaction) => {
            if (reaction.emoji.name === '⬅️') {
              // Go back
              pageIndex == 0 ? (pageIndex = pages.length - 1) : --pageIndex;
              editMessage(botMessage, pageIndex, message.author.tag);
            } else {
              // Go forward
              pageIndex == pages.length - 1 ? (pageIndex = 0) : ++pageIndex;
              editMessage(botMessage, pageIndex, message.author.tag);
            }

            // https://discordjs.guide/popular-topics/reactions.html#removing-reactions-by-user
            const userReactions = botMessage.reactions.cache.filter(
              (reaction) => reaction.users.cache.has(message.author.id)
            );
            try {
              for (const reaction of userReactions.values()) {
                reaction.users.remove(message.author.id);
              }
            } catch (error) {
              console.error('Failed to remove reactions.');
            }
          });
      });
  }

  if (cmd == 'rebateslist') {
    let pages = returnPages();
    let rebatesMessage = returnMessage('rebates', message.author.tag);
    rebatesMessage.description = rebatesMessage.description.split('.')[0];
    rebatesMessage.fields = [];
    for (let index = 0; index < pages.length; index++) {
      for (let index2 = 0; index2 < pages[index].length; index2++) {
        rebatesMessage.fields.push({
          name: pages[index][index2].title,
          value: pages[index][index2].rebates,
          inline: false,
        });
      }
    }
    message.channel.send({
      embed: rebatesMessage,
    });
  }

  if (cmd == 'rebatelist') {
    let pages = returnPages();
    let rebatesMessage = returnMessage('rebates', message.author.tag);
    rebatesMessage.description = rebatesMessage.description.split('.')[0];
    rebatesMessage.fields = [];
    for (let index = 0; index < pages.length; index++) {
      for (let index2 = 0; index2 < pages[index].length; index2++) {
        rebatesMessage.fields.push({
          name: pages[index][index2].title,
          value: pages[index][index2].rebates,
          inline: false,
        });
      }
    }
    message.channel.send({
      embed: rebatesMessage,
    });
  }

  if (cmd == 'address') {
    var addressInitial = returnMessage('addressInitial', message.author.tag);
    var promptmessage = returnMessage('infoPrompt', message.author.tag);
    await message.reply({ embed: addressInitial });
    var responses = [];
    var collector = message.channel.createMessageCollector(filter2, {
      time: 10000000,
    });
    collector.on('collect', async (m) => {
      if (m.content.toLowerCase() !== 'cancel') {
        switch (responses.length) {
          case 0:
            responses.push(m.content);
            promptmessage.title = '';
            promptmessage.fields[0].name = 'Address Line 2';
            promptmessage.fields[0].value =
              'Please reply with your Apt, Suite, etc. or type NA if not needed';
            m.reply({ embed: promptmessage });
            break;
          case 1:
            responses.push(m.content);
            promptmessage.title = '';
            promptmessage.fields[0].name = 'City';
            promptmessage.fields[0].value = 'Please reply with your city';
            m.reply({ embed: promptmessage });
            break;
          case 2:
            responses.push(m.content);
            promptmessage.title = '';
            promptmessage.fields[0].name = 'State Abbreviation';
            promptmessage.fields[0].value =
              'Please reply with State Abbreviation (CA,NY,TX,etc.)';
            m.reply({ embed: promptmessage });
            break;
          case 3:
            responses.push(m.content);
            promptmessage.title = '';
            promptmessage.fields[0].name = 'Zip';
            promptmessage.fields[0].value = 'Please enter US Zip code';
            m.reply({ embed: promptmessage });
            break;
          case 4:
            responses.push(m.content);
            await submitAddress(responses, message);
          default:
            collector.stop();
        }
      } else {
        collector.stop();
      }
    });
  }



  if (cmd == 'help') {
    let helpMessage = returnMessage('help', message.author.tag);
    message.channel.send({ embed: helpMessage });
  }
});

client.on("message", message => {


 
  const args = message.content.trim().split(",");
  const command = args[0].substr(1).toLowerCase();
 args.shift()
  if(command === 'rebatefast') {
	  var argsByComma=args;

    if (argsByComma.length < 1) {
      let errorMessage = returnMessage('error', message.author.tag);
      errorMessage.description = '😰 Uh oh, look likes somethings missing!';
	  (async () => {
      await message.channel.send({
        embed: errorMessage,
      });
	  })();

    } else {
      //Simple reorder
	  console.log(argsByComma)
      var selection = argsByComma[0];
      var token = argsByComma[1];
      var responses = [
        argsByComma[7],
        argsByComma[9],
        argsByComma[2],
        argsByComma[3],
        argsByComma[4],
        argsByComma[5],
        argsByComma[6],
        argsByComma[8],
      ];
	  
	  console.log(responses)

      var parsedRebate = parseRebates(selection);
(async () => {

      await message.reply({
        embed: returnMessage('submitConfirm', message.author.tag),
      });
      await submitRebateRequest(responses, message, token, parsedRebate.path);
})();

    }

  }

});
async function fetchCredits(key) {
  var messages = null;
  messages = await request.get(`http://localhost:8000/credits?key=${key}`);

  return parseFloat(messages);
}
async function delCredits(key) {
  var messages = null;
  messages = await request.get(`http://localhost:8000/delcredits?key=${key}`);
  return messages;
}
async function newCredit(key) {
  var messages = await request.get(
    `http://localhost:8000/addkey?admin=5a5b6df3-8020-4147-8499-1e4feffc1a7b&uses=${key}`
  );
  return messages;
}

client.login(token);
