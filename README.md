# axelrod

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Force Push

This is actually the third version of this codebase. As time progressed and code got messier, it became easier to start from scratch. Here are the commit histories of previous versions:

### Version 1 & 2

Version '2' was built in a branch and introduced the move from Firebase Real Time Database to Cloudstore. The new version used Cloudstore, Nuxt.js and significantly reduced the number of DB read/writes. 

```
*   67600ca at Mon, 11 Feb 2019 21:09:28 +0000: Merge pull request #1 from phazonoverload/cloudstore
|\  
| * 490be07 at Mon, 11 Feb 2019 20:58:38 +0000: Game works!
| * e4cb2bc at Mon, 11 Feb 2019 16:33:16 +0000: hash mode
| * d10d856 at Mon, 11 Feb 2019 12:55:53 +0000: calculating works
| * aaa3244 at Mon, 11 Feb 2019 12:20:32 +0000: fixed calculation
| * 6224bfe at Mon, 11 Feb 2019 12:14:48 +0000: pushing into moves collection
| * dbbd259 at Sun, 10 Feb 2019 23:58:23 +0000: current round, fixed calculator
| * fb0b38d at Sun, 10 Feb 2019 23:04:42 +0000: calculate works
| * 1a3ede3 at Sun, 10 Feb 2019 20:04:37 +0000: voting works
| * 928f5a8 at Sun, 10 Feb 2019 19:23:54 +0000: Current pos from score
| * 8c42d49 at Sun, 10 Feb 2019 19:15:31 +0000: Bug
| * 35cc7e5 at Sun, 10 Feb 2019 19:09:00 +0000: scores being stores correctly
| * ac1aed4 at Sun, 10 Feb 2019 17:45:22 +0000: Player listing
| * 9c7967b at Sun, 10 Feb 2019 17:05:27 +0000: orc settings, toast messages
| * f8028b2 at Sun, 10 Feb 2019 14:45:38 +0000: entering/leaving games all works as expected
| * b4fa53d at Sun, 10 Feb 2019 13:29:42 +0000: Firestore integration - orchestrator root made
| * 40b3f81 at Sun, 10 Feb 2019 12:08:17 +0000: Pretty much commented everything out
|/  
* 5d34170 at Sun, 10 Feb 2019 11:57:18 +0000: Small visual changes to orchestrator
* 79affb1 at Sat, 9 Feb 2019 01:20:33 +0000: reveal
* da4bc46 at Fri, 8 Feb 2019 13:01:22 +0000: Voting works
* b8902e8 at Fri, 8 Feb 2019 01:13:58 +0000: Fixed bug around archestrator
* 7d3ff56 at Fri, 8 Feb 2019 01:10:12 +0000: show player's votes
* 18b9898 at Fri, 8 Feb 2019 00:48:52 +0000: voting mechanism works
* 60db86a at Fri, 8 Feb 2019 00:23:12 +0000: Admin polls for player updates
* 66c7033 at Fri, 8 Feb 2019 00:19:52 +0000: Moving redundant conditional
* c928e2a at Fri, 8 Feb 2019 00:18:10 +0000: user client polls for changes
* 3cd2908 at Thu, 7 Feb 2019 12:08:17 +0000: decouple player listing from load game
* bd43f55 at Thu, 7 Feb 2019 11:31:41 +0000: Stopped double game creation
* bbf95e4 at Thu, 7 Feb 2019 10:39:06 +0000: Don't create a user if they already exist in game
* 23c3824 at Wed, 6 Feb 2019 20:02:00 +0000: orchestrator can change game state
* d76d128 at Wed, 6 Feb 2019 08:56:44 +0000: added retreival of users in admin panel
* ac003c7 at Tue, 5 Feb 2019 21:09:06 +0000: join game, added to firebase
* 9175d2e at Tue, 5 Feb 2019 16:38:02 +0000: init
```

