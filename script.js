const output = document.getElementById('output');
const input = document.getElementById('command-input');
const terminal = document.querySelector('.terminal');

// SİTE AÇILDIĞINDA GÖRÜNEN BAŞLANGIÇ MESAJI
const welcomeMessage = `
<span style="color: #00ff00;">
'     _ _  _  ___  __   _  
'    | | |/o|| o \/ _| / \ 
'    | V | |||   ( |_n( o )
'     \_/  L||_|\\\__/ \_/ 
'                          
</span>

Welcome to the system. Access permissions: <span style="color:red">ROOT</span>
To see the available commands, type 'help'.
------------------------------------------------------
`;

// Komutların Tanımlandığı Yer
const commands = {
    help: "Available commands: <br> - whoami <br> - cat cv.txt <br> - apt install linkedin <br> - apt install github <br> - social <br> - clear",
    whoami: "Guest - But i am a cyber sec enthusiastic & computer science student.",
    social: "Instagram: @arif_emrk <br>",
    "cat cv.txt": "CV indiriliyor... <br> (If your browser blocks the download<a href='cv.pdf' target='_blank'>Click here</a>)",
    sudo: "I'm in charge here anyway :)",
    ls: "cv.txt  projects/  passwords.txt (Access denied)"
};

// Sayfa yüklendiğinde karşılama mesajını bas
window.onload = () => {
    printOutput(welcomeMessage);
    input.focus();
};

// Ekrana herhangi bir yere tıklanırsa input'a odaklan (Telefonda klavye açılması için)
document.addEventListener('click', () => {
    input.focus();
});

// Enter tuşunu dinle
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = input.value.trim(); // Boşlukları temizle
        processCommand(command);
        input.value = ''; // Input'u temizle
    }
});

function processCommand(cmd) {
    // Önce kullanıcının yazdığı komutu ekrana basalım (History gibi)
    printOutput(`<span class="prompt">root@kali:~$</span> ${cmd}`);

    // Komutu küçük harfe çevir
    const lowerCmd = cmd.toLowerCase();

    // --- ÖZEL KOMUT MANTIĞI (apt install linkedin vb.) ---
    
    if (lowerCmd === 'clear') {
        output.innerHTML = '';
        return;
    }
    
    // LinkedIn Komutu
    else if (lowerCmd.includes('linkedin')) {
        printOutput("LinkedIn profile opens in a new tab....");
        window.open('https://linkedin.com/in/v1rg0', '_blank');
    }
    
    // GitHub Komutu
    else if (lowerCmd.includes('github')) {
        printOutput("GitHub profile opens in a new tab....");
        window.open('https://github.com/arifemrekarabiyik', '_blank');
    }

    // CV İndirme Komutu (cat cv.txt)
    else if (lowerCmd === 'cat cv.txt') {
        printOutput(commands["cat cv.txt"]);
        // Otomatik indirme başlatma
        const link = document.createElement('a');
        link.href = 'cv.pdf';
        link.download = 'cv.pdf';
        link.click();
    }

    // Diğer basit komutlar (commands objesinden kontrol et)
    else if (commands[lowerCmd]) {
        printOutput(commands[lowerCmd]);
    }
    
    // Bilinmeyen komut
    else if (lowerCmd !== '') {
        printOutput(`<span style="color:red;">bash: ${cmd}: command not found</span>`);
    }

    // Ekranı her zaman en aşağı kaydır
    terminal.scrollTop = terminal.scrollHeight;
}

function printOutput(text) {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = text;
    output.appendChild(newDiv);
}
