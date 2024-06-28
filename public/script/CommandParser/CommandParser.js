class CommandParser {
    constructor() {
        this.commandPatterns = {
            "add": /^add\s+([A-Za-z\s]+)\s+(\d+)$/,  
            "login": /^login$/,
            "logout": /^logout$/,
            "register": /^register$/,
            "ls": /^ls$/,
            "rm": /^rm\s+([A-Za-z\s]+)$/,
            "show": /^show\s+([A-Za-z\s]+)$/,
            "cart": /^cart$/,
            "buy": /^buy$/,
            "help": /^help$/,
            "new": /^new$/,
            "del": /^del\s+([A-Za-z\s]+)$/,
        };
        this.adminCmd = ["new", "del"];
        this.infoCmd = ["cart", "ls", "help", "logout"];
    }

    parse(line) {
        for (let cmd in this.commandPatterns) {
            const regex = this.commandPatterns[cmd];
            const match = line.match(regex);
            if (match) {
                return {
                    command: cmd,
                    args: match.slice(1)
                };
            }
        }
        return null;
    }

    isAdmin(cmd) {
        return (this.adminCmd.includes(cmd));
    }

    isInfo(cmd) {
        return (this.infoCmd.includes(cmd));
    }
}


export {CommandParser}