# REBATE BOT

Before you say the code is horrible: 70% of this source code was written by previous shitty non devs that don't know how to do anything. It can't be rescued. I've since rewritten it and I might release or start a better server soon.
-------------
- *Please drop a star if this helped you!*
- *Need help setting this up or want me to set it up for you readily hosted? DM me on Discord (Risk#2020)*
-------------
![alt text](https://i.vimeocdn.com/video/976239642.webp?mw=700&mh=613)
- Automated Discord bot for Submitting Rebates.

*How to use?*

- First NPM Install all the dependencies for both the front end and backend
- Then you need to replace the pool database details at the top of app.js with your own postgres database and structure it like (Number of the row, KEY VALUE, TOKEN AMOUNT)
  ex. 45 | XKJBHFDWUDHOWDBWODIBWDOIWDBWOIDBNWOIDBWODI | 5
- Replace the proxy API key for any new rebates or the rebates you want to use and the authentication details. use proxycheap if you don't want to do some recording.
- For the discord bot change up config.json to include your own webhook log link and your own bot token.
- Boom - unlimited (err) rebates submitted for your own self.

Receipts are removed temporarily so you will need to make your own receipt templates using cheerio.
*How to make receipts?*
1. Order a 1$ item on any receipt store you want.
2. Download Receipt as HTML
3. Use Cheerio to edit the html receipt (ctrl f a receipt example in app.js like walmart to learn how)
4. Just search up a cheerio tutorial online to manually edit the html elements on the fly like how all other receipt gens work.

If you don't want to do this work and just want all the receipts ready made - contact my discord to buy the pack for 50$

*After all this - just do npm start on both and everything should now work*

*How do I make new rebates?*
1. Get puppeteer recorder extension
2. Record yourself doing a rebate manually
3. Add it to the code like the other examples
