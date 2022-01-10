const main=document.querySelector("main"); 
const btnClose = document.querySelector("#close");
const readBtn = document.querySelector(".read");
const btnToggle = document.querySelector("#btntoggle");
const voicesSelect = document.getElementById("voices");


let textarea=document.querySelector(".textarea");


const data = [{
	image: 'pexels-artem-beliaikin-1088542.jpg',
	text: "I'm Thirsty"
	},
	
	{
				image: 'pexels-andrea-piacquadio-789822.jpg',
				text: "I'm Happy"
	},

	{
	image: '2.jpg',
	text: "I'm Hungry"
	},

	{
		image: 'pexels-julia-larson-6455942.jpg',
		text: "I'm Tired"
	},

	{
			image: 'pexels-andrea-piacquadio-3760275.jpg',
			text: "I'm Hurt"
	},

	{
				image: 'pexels-wildan-zainul-faki-3360089.jpg',
				text: "I'm Scared"
	},

	{
		image: 'pexels-mohamed-abdelghaffar-783941.jpg',
		text: "I'm Angry"
	},

	{
			image: 'pexels-sofia-alejandra-3007355.jpg',
			text: "I'm Sad"
	},
	{
	image: 'pexels-jonas-mohamadi-1416736.jpg',
	text: "I want to go Outside"
	},

	{
	image: 'pexels-emre-can-acer-2079249.jpg',
	text: "I want to go Home"
	},

	{
		image: 'pexels-周-康-710743.jpg',
		text: "I want to go to School"
	},

	{
			image: 'pexels-andrea-piacquadio-3768140.jpg',
			text: "I want to go to Grandma"
	},	
];

data.forEach(createBox);

//Create speech boxes
function createBox(item){
	const box = document.createElement('div');

	const {image, text} = item;

	box.classList.add('box');
	box.innerHTML = `
	<img src="${image}" alt="${text}">
	<p class="info">${text}</p>`;

	//@todo - event
	function out(){
		box.classList.remove("active");
	}

	function speak(){
		setTextMessage(text);
		speakText();
	
		box.classList.add("active");
		setTimeout(out, 800);
	}

	box.addEventListener("click", speak);

	main.appendChild(box);
}

// Button Toggle
btnToggle.addEventListener("click", toggle);


function toggle(){
	document.getElementById("textbox").classList.toggle("show");
}


// Close Textarea
btnClose.addEventListener("click", close);
function close(){
	document.getElementById("textbox").classList.remove("show");
}


//Store Voices
let voices = [];

function getVoices(){
	voices = speechSynthesis.getVoices();

	voices.forEach(voice => {
		const option = document.createElement(("option"));

		option.value = voice.name;
		option.innerText = `${voice.name} ${voice.lang}`;

		voicesSelect.appendChild(option);
	});
}


//Voice Changed
speechSynthesis.addEventListener("voiceschanged", getVoices);




//Initialixe Speech Synthesis
const message = new SpeechSynthesisUtterance();


//Set Text
function setTextMessage(text){
	message.text = text;
}


//Speak Text
function speakText(){
	speechSynthesis.speak(message);
	//console.log(message);
}

//Set voice
function setVoice(e){
	message.voice  = voices.find(voice => voice.name === e.target.value);
}

// Change voice
voicesSelect.addEventListener("change", setVoice);

//Read text button
readBtn.addEventListener("click", ()=> {
	setTextMessage(textarea.value);
	speakText();
	//console.log(setTextMessage(textarea.value));
});

getVoices();
