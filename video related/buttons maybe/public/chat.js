
//run npm install then npm start for it to work, should be localhost 3000 for now
//speaking of this needs combining with the rest of the site


$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')


	const param = new URLSearchParams(window.location.search)
	if (param == "?position=host"){
		document.getElementById("mainvideo").setAttribute("hidden", "false")
	} else {
		document.getElementById("mainvideo").setAttribute("hidden", "true")
	}

	//sends play signal
	var vid = document.getElementById("mainvideo")
		vid.addEventListener("playing", (data) =>{
			socket.emit('playing')
		});
	//sends pause signal
	vid.addEventListener("pause", (data) => {
		socket.emit('paused')
	});
});


