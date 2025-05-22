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
    }

    handleKey(e) {
        if(e.key === 'Enter') this.processCommand();
        if(e.key === 'ArrowUp') this.historyNav(-1);
        if(e.key === 'ArrowDown') this.historyNav(1);
    }

    processCommand() {
        const fullCommand = this.input.value.trim();
        this.input.value = '';
        
        if(!fullCommand) return;
        
        this.history.push(fullCommand);
        this.print(`$ ${fullCommand}`, 'command');
        
        if(fullCommand === 'clear') return (this.output.innerHTML = '');
        
        const [baseCommand, ...args] = fullCommand.split(' ');
        
        if(commands[baseCommand]) {
            Promise.resolve(commands[baseCommand].execute(args.join(' ')))
                .then(result => this.print(result))
                .catch(error => this.print(error, 'error'));
        } else {
            this.print(`Command not found: ${baseCommand}`, 'error');
        }
    }

    print(text, type = 'output') {
        const div = document.createElement('div');
        div.className = `terminal-${type}`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        this.output.appendChild(div);
        
        this.output.scrollTo({
            top: this.output.scrollHeight,
            behavior: 'smooth'
        });
    }

    printWelcome() {
        this.print("Welcome to Nicholas Galen's terminal!\nType 'help' to start", 'system');
    }

    historyNav(direction) {
        const index = Math.max(0, Math.min(this.history.length, this.history.length + direction));
        this.input.value = this.history[index] || '';
    }
}

window.addEventListener('DOMContentLoaded', () => new Terminal());