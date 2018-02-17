const fs = require('fs')
const Twit = require('twit')

const T = new Twit({
	  consumer_key:         process.env.CONSUMER_KEY,
	  consumer_secret:      process.env.CONSUMER_SECRET,
	  access_token:         process.env.ACCESS_TOKEN,
	  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})


const lyrics = fs.readFileSync(__dirname + '/lyrics.txt', 'utf8')

let songs = lyrics.split(/\n\n/)
songs = songs.map(el => el.split('\n').slice(1).filter(el => el.length))

setInterval(function() {

	const song = songs[Math.floor(Math.random() * songs.length)]
	let phrase = Math.floor(Math.random() * (song.length - 1))

	let l = 0
	let first = true
	let str = ''


	while (l <= 140 && phrase < phrase.length) {
		let p = song[phrase]
		if (!p) {
		  return;
		}

		l += p.length
	
		if (!first) {
			l += 1
			str += '\n'
		}

		if (l <= 140) {
			str += p 
		}

		phrase++
		first = false
	}

	str = str.replace(/,?\n$/,'')
	T.post('statuses/update', { status: str }, function(err, data, response) {})

}, 1000 * 60 * 60 * 6)

process.on('uncaughtException', function(){})

