function playbtn(){
	if (audio.duration > 0 && !audio.paused){
		img.src = "static/images/play.png";
		audio.pause();
	}else{
		img.src = "static/images/pause.png";
		audio.play();
	}
}


function change_musician(){
	musician = document.querySelector('input[name="musician"]:checked').value;
	if (musician == "user"){
		document.getElementById('m1').src = 'static/images/1b.png';
		document.getElementById('m5').src = 'static/images/5.png';
	}
	else {
		document.getElementById('m1').src = 'static/images/1.png';
		document.getElementById('m5').src = 'static/images/5b.png';
	}
}

function change_creator(){
	creator = document.querySelector('input[name="creator"]:checked').value;
	if (creator == 1) {
		document.getElementById('human').src = 'static/images/humanw.png';
		document.getElementById('computer').src = 'static/images/computer.png';
	}
	else {
		document.getElementById('human').src = 'static/images/human.png';
		document.getElementById('computer').src = 'static/images/computerw.png';
	}

	make_enable();
}

function change_satisfaction(){
	satisfaction = document.querySelector('input[name="satisfaction"]:checked').value;
	document.getElementById('s1').src = 'static/images/1w.png';

	document.getElementById('s2').src = 'static/images/2.png';
	document.getElementById('s3').src = 'static/images/3.png';
	document.getElementById('s4').src = 'static/images/4.png';
	document.getElementById('s5').src = 'static/images/5.png';
	
	if (satisfaction > 1) document.getElementById('s2').src = 'static/images/2w.png';
	if (satisfaction > 2) document.getElementById('s3').src = 'static/images/3w.png';
	if (satisfaction > 3) document.getElementById('s4').src = 'static/images/4w.png';
	if (satisfaction > 4) document.getElementById('s5').src = 'static/images/5w.png';

	make_enable();
}

function change_interesting(){
	interesting = document.querySelector('input[name="interesting"]:checked').value;
	document.getElementById('i1').src = 'static/images/1w.png';

	document.getElementById('i2').src = 'static/images/2.png';
	document.getElementById('i3').src = 'static/images/3.png';
	document.getElementById('i4').src = 'static/images/4.png';
	document.getElementById('i5').src = 'static/images/5.png';
	
	if (interesting > 1) document.getElementById('i2').src = 'static/images/2w.png';
	if (interesting > 2) document.getElementById('i3').src = 'static/images/3w.png';
	if (interesting > 3) document.getElementById('i4').src = 'static/images/4w.png';
	if (interesting > 4) document.getElementById('i5').src = 'static/images/5w.png';

	make_enable();
}

setInterval(function(){ make_enable() }, 1000);

function make_enable(){
	if (creator != 0 && satisfaction != 0 && interesting != 0 && audio.currentTime  > 5){
		$('#next').prop("disabled", false);
	}
}

function insert(){
	if (creator == 0 ||satisfaction == 0 || interesting == 0) return;
	$.ajax({
        data : {
        	'musician' : musician,
        	'source' : audio.src.split("/")[5],
        	'creator' : creator,
        	'satisfaction' : satisfaction,
        	'interesting' : interesting
        },
        url: "/insert",
        type: "POST",
        success: function(resp){
        	console.log(resp.data);

        	if (resp.data === "Open Modal"){
	            $("#red").css("color","#8d0c0c");
	            $('#red').text("Τελευταίο βήμα και φυγάμε!")
	            if (($("#myModal").data('bs.modal') || {}).isShown) $('#myModal').modal('hide');
	            if (($("#myModal2").data('bs.modal') || {}).isShown) $('#myModal2').modal('hide');
	            if (($("#myModal3").data('bs.modal') || {}).isShown) $('#myModal3').modal('hide'); 
		        setTimeout(function (){
					$('#myModal3').modal('show'); 
					}, 200);
	            playbtn()
	            return;
        	}
        	playbtn();
			audio.src = "static/samples/" + songs[0];
		    songs.shift();

		    $('#next').prop("disabled", true);
		    document.getElementById('human').src = 'static/images/human.png';
			document.getElementById('computer').src = 'static/images/computer.png';

		    document.getElementById('i1').src = 'static/images/1.png';
		    document.getElementById('i2').src = 'static/images/2.png';
			document.getElementById('i3').src = 'static/images/3.png';
			document.getElementById('i4').src = 'static/images/4.png';
			document.getElementById('i5').src = 'static/images/5.png';

			document.getElementById('s1').src = 'static/images/1.png';
		    document.getElementById('s2').src = 'static/images/2.png';
			document.getElementById('s3').src = 'static/images/3.png';
			document.getElementById('s4').src = 'static/images/4.png';
			document.getElementById('s5').src = 'static/images/5.png';

			creator = 0;
			satisfaction = 0;
			interesting = 0;
			setTimeout(function (){
				playbtn();
				}, 200);
        }
    });
}



function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
