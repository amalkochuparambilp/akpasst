let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunc = (input) =>{
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 50;
    speakInput.volume = 1;
    speakInput.lang = 'en-IN';
    window.speechSynthesis.speak(speakInput);
}
window.onload = () => {
    speakFunc("Hey Boss");
    greetingFunc();
}

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    console.log(hour);
    if(hour >= 0 && hour < 12) {
        speakFunc("Good morning")
    } else if(hour >= 12 && hour < 16) {
        speakFunc("Good afternoon")
    } else {
        speakFunc("Good evening. Welcome to AKP Virtual Assistant")
    }
}

const startVoiceInput = () => {
    if('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (e) => {
            let spokenText = e.result[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-soild fa-microphone-lines-slash"></i>`;
        }
        recognition.start();
    } else {
        alert("not support ")
   }
}

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = `<i class="fa-soild fa-microphone-lines"></i>`;
    startVoiceInput();
}

const handleCommands = (command) => {
    console.log(command);
    if(command.includes("hello") || command.includes("hey") || command.includes("hi")) {
        speakFunc("Hello Boss, How can i help you");
    } else if(command.includes("who are you") || command.includes("how are you")) {
        speakFunc("I am AKP Virtual Assistance, Developed By Amal K P");
    } else if(command.includes("Amal") || command.includes("KP")) {
        speakFunc("Opening... Amal K P profile");
        window.open("https://instagram.com/espoir.__._");
    } else if(command.includes("time")) {
        let time = new Date().toLocaleString(undefined,{hour:'numeric',minute:'numeric'});
        speakFunc(time);
    } else if(command.includes("tell me the date") || command.includes("time")) {
        let date = new Date().toLocaleString(undefined,{day:'numeric',month:'long'})
    } else {
        speakFunc(`What I Found on internet regarding ${command}`);
        window.open(`https://google.com/search?q=${command}`)
    }
}