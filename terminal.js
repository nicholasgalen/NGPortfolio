class Terminal {
    constructor() {
        this.input = document.getElementById('terminalInput');
        this.output = document.getElementById('terminalOutput');
        this.history = [];
        this.init();
    }

    init() {
        this.input.addEventListener('keydown', (e) => this.handleKey(e));
        this.printWelcome();
        this.input.focus();
    }

    handleKey(e) {
        if(e.key === 'Enter') this.processCommand();
        if(e.key === 'ArrowUp') this.historyNav(-1);
        if(e.key === 'ArrowDown') this.historyNav(1);
    }

    processCommand() {
        const cmd = this.input.value.trim().toLowerCase();
        this.input.value = '';
        
        if(!cmd) return;
        
        this.history.push(cmd);
        this.print(`$ ${cmd}`, 'command');
        
        if(cmd === 'clear') return this.output.innerHTML = '';
        if(commands[cmd]) return this.print(commands[cmd].execute());
        
        this.print(`Command not found: ${cmd}`, 'error');
    }

    print(text, type = 'output') {
        const div = document.createElement('div');
        div.className = `terminal-${type}`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        this.output.appendChild(div);
        this.output.scrollTop = this.output.scrollHeight;
    }

    printWelcome() {
        this.print(`Welcome to Nicholas Galen's terminal!\nType 'help' to start`, 'system');
    }

    historyNav(direction) {
        const index = Math.max(0, Math.min(this.history.length, this.history.length + direction));
        this.input.value = this.history[index] || '';
    }
}

window.addEventListener('DOMContentLoaded', () => new Terminal());