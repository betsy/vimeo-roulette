const threshold = 450000000; // generate random video ids between 0 and this value
var linkElem;
var videoPlayer;

function tryUntilSuccess(vp, retries)
{
	if (!retries) return 0;
	date = new Date();
	new_video_id = Math.round(Math.random(date.getMilliseconds())*threshold);

	console.log("new video id: "+new_video_id+". retries left: "+retries);
	linkElem.href = "https://player.vimeo.com/video/"+new_video_id;
	linkElem.innerHTML = "https://player.vimeo.com/video/"+new_video_id;

    return vp.loadVideo("https://player.vimeo.com/video/"+new_video_id).catch(rej => {
		console.log("reject: "+rej);
		tryUntilSuccess(vp, retries-1);
    });
}


window.onload = function(e){
	var options = {
		url: "https://player.vimeo.com/video/350477474/", // default, blank video
		width: 800
	};

	videoPlayer = new Vimeo.Player('myVideo', options);
	linkElem = document.querySelector('#link-elem');
	tryUntilSuccess(videoPlayer, 30);
}