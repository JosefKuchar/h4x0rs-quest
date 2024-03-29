import Game, { State } from './Game';

export default class Terminal {
    terminalElement: HTMLDivElement;
    inputElement: HTMLInputElement;
    game: Game;

    constructor(
        terminalElement: HTMLDivElement,
        inputElement: HTMLInputElement,
        game: Game
    ) {
        this.terminalElement = terminalElement;
        this.inputElement = inputElement;
        this.game = game;

        inputElement.onkeydown = e => {
            if (e.keyCode == 13) {
                this.writeLine(
                    (this.game.screens.game.currentNode.root
                        ? 'root@'
                        : 'h4x0r@') +
                        this.game.screens.game.currentNode.ip +
                        '&gt; ' +
                        inputElement.value
                );

                let args = inputElement.value.split(' ');

                if (args[0] == 'clear') this.clear();
                else {
                    const result = this.handle(args);
                    if (result != undefined) {
                        this.writeLine(result);
                    }
                }

                inputElement.value = '';
            }
        };
    }

    writeLine(message: string) {
        message
            .split('\n')
            .forEach(
                line =>
                    (this.terminalElement.innerHTML +=
                        '<div>' + line + '</div>')
            );
        this.terminalElement.scrollTo(0, this.terminalElement.scrollHeight); // Scroll to the end
    }

    handle(args: string[]) {
        if (args[0] == 'startx') {
            const result = this.game.boot();
            if (result) this.bootSequence();
            else return 'System: Game is already running!';
        } else if (this.game.screens.game.exploitRunning) {
            return "System: You can't execute commands while the exploit is running!";
        } else {
            if (this.game.state == State.Game) {
                switch (args[0]) {
                    case 'nmap':
                        return (
                            'FOUND:\n' +
                            this.game.screens.game.currentNode.revealOthers()
                        );
                        break;
                    case 'ssh':
                        if (args[1]) {
                            let node = this.game.screens.game.nodes.find(
                                node => {
                                    return args[1] === node.ip;
                                }
                            );

                            if (node != undefined) {
                                this.game.screens.game.currentNode = node;
                                return 'Connected to ' + args[1];
                            } else return 'IP not found: ' + args[1];
                        } else {
                            return "You must specify IP e.g. 'ssh 127.0.0.1'";
                        }
                        break;
                    case 'exploit':
                        if (this.game.screens.game.currentNode.root) {
                            return 'System: Machine already rooted!';
                        } else {
                            this.game.screens.game.exploit();
                        }
                        break;
                    case 'help':
                        return (
                            'AVAILABLE COMMANDS: \n' +
                            'clear - clear the console\n' +
                            'exploit - escalate privileges\n' +
                            'help - list all available commands\n' +
                            'nmap - reveal all available nodes\n' +
                            'ssh - connect to a node\n' +
                            'startx - start the game'
                        );
                    default:
                        return (
                            'System: ' +
                            args[0] +
                            " - Command not found, type 'help' to get all available commands"
                        );
                }
            } else if (this.game.state == State.End) {
                return 'Press F5 if you want to play again'
            } else {
                return "System: You can only use these commands in the game!\nType 'startx' to continue";
            }
        }
    }

    clear() {
        this.terminalElement.innerHTML = '';
    }

    initSequence() {
        let parts = [
            ' _    _ _  _         ___       _     \n' +
                '| |  | | || |       / _ \\     ( )    \n' +
                '| |__| | || |___  _| | | |_ __|/ ___ \n' +
                "|  __  |__   _\\ \\/ / | | | '__| / __|\n" +
                '| |  | |  | |  >  <| |_| | |    \\__ \\\n' +
                '|_|__|_|  |_| /_/\\_\\\\___/|_|    |___/',
            ' / __ \\                | |  \n' +
                '| |  | |_   _  ___  ___| |_ \n' +
                '| |  | | | | |/ _ \\/ __| __|\n' +
                '| |__| | |_| |  __/\\__ \\ |_ \n' +
                ' \\___\\_\\\\__,_|\\___||___/\\__|\n',
            'Made by Josef Kuchař - <a href="//josefkuchar.com">josefkuchar.com</a> - for GWGC2018/19',
            'Press F11 to enter fullscreen',
            "Type 'startx' to continue"
        ];

        parts.forEach((part, i) => {
            setTimeout(() => this.writeLine(part), (i + 1) * 700);
        });
    }

    bootSequence() {
        let parts = [
            'Booting OS...',
            'parse_bootparam: Ignoring tag 0x1004',
            'lx60 platform_init(bootparams:d5f50000)',
            'Linux version 2.6.29-rc7 (pdelaney@pdelaney_fc5.hq.tensilica.com) (gcc version 4.2.1) #201 SMP Tue Nov 17 23:49:39 PST 2009',
            'lx60 platform_setup(cmdline[0]:\'console = ttyS0, 38400 ip = 192.168.11.105: 192.168.11.55: 192.168.11.1: 255.255.255.0: "-2 Linux" root = /dev/nfs rw nfsroot = 192.168.11.55: /exports/LINUX_ROOT.HiFi - 2 debug coredump_filter = 0xff\')',
            'smp_init_cpus: Core Count = 3',
            'smp_init_cpus: Core Id = 9320',
            'On node 0 totalpages: 24576',
            'free_area_init_node: node 0, pgdat d0196540, node_mem_map d01fa000',
            '  Normal zone: 216 pages used for memmap',
            '  Normal zone: 24360 pages, LIFO batch:3',
            'smp_prepare_boot_cpu:',
            'Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 24360',
            '     Kernel command line: console = ttyS0, 38400 ip = 192.168.11.105: 192.168.11.55: 192.168.11.1: 255.255.255.0:"Linux" root=/dev/nfs rw nfsroot=192.168.11.55:/exports/LINUX_ROOT.HiFi-2 debug coredump_filter=0xff',
            'trap_init 0',
            'PID hash table entries: 512 (order: 9, 2048 bytes)',
            'time_init: Platform Calibrating CPU frequency',
            'time_init: ccount_per_jiffy:416777 [41.67 MHz], nsec_per_ccount:23',
            'Console: colour dummy device 80x25',
            'console [ttyS0] enabled',
            'Dentry cache hash table entries: 16384 (order: 4, 65536 bytes)',
            'Inode-cache hash table entries: 8192 (order: 3, 32768 bytes)',
            'Memory: 95196k/98304k available (1229k kernel code, 3040k reserved, 28k data, 72k init 0k highmem)',
            'Calibrating delay loop... 41.26 BogoMIPS (lpj=206336)',
            'Mount-cache hash table entries: 512',
            'cpu 1 fffd',
            'secondary_trap_init 1',
            'Calibrating delay loop... 41.67 BogoMIPS (lpj=208384)',
            'secondary_irq_init: set cached_irq_mask and enable interrupts))',
            'secondary_time_init()',
            'secondary_irq_enable(intrnum:6): cpu:1, INTENABLE:7c',
            'secondary_irq_enable(intrnum:0): cpu:1, INTENABLE:7d',
            'cpu 2 fff9',
            'secondary_trap_init 2',
            'Calibrating delay loop... 41.57 BogoMIPS (lpj=207872)',
            'secondary_irq_init: set cached_irq_mask and enable interrupts))',
            'secondary_time_init()',
            'secondary_irq_enable(intrnum:6): cpu:2, INTENABLE:7c',
            'secondary_irq_enable(intrnum:0): cpu:2, INTENABLE:7d',
            'Brought up 3 CPUs',
            'smp_cpus_done:',
            'net_namespace: 304 bytes',
            'NET: Registered protocol family 16',
            'lx60_init()',
            'bio: create slab <bio-0> at 0',
            'NET: Registered protocol family 2',
            'IP route cache hash table entries: 1024 (order: 0, 4096 bytes)',
            'TCP established hash table entries: 4096 (order: 3, 32768 bytes)',
            'TCP bind hash table entries: 4096 (order: 3, 32768 bytes)',
            'TCP: Hash tables configured (established 4096 bind 4096)',
            'TCP reno registered',
            'NET: Registered protocol family 1',
            'msgmni has been set to 186',
            'alg: No test for md5 (md5-generic)',
            'alg: No test for des (des-generic)',
            'alg: No test for des3_ede (des3_ede-generic)',
            'alg: No test for stdrng (krng)',
            'io scheduler noop registered (default)',
            'Serial: 8250/16550 driver, 4 ports, IRQ sharing disabled',
            'serial8250: ttyS0 at MMIO 0x0 (irq = 3) is a 16550A',
            'oeth_probe: {',
            'oeth_setup: Open Ethernet Core Version 1.0.1',
            ' : oeth_setup: Found id1:2000, id2:5c30 at phy_id:3.',
            ' : Hardware MAC Address: 00:50:c2:13:6f:0f',
            'eth0 (): not using net_device_ops yet',
            'oeth_probe: }',
            'mice: PS/2 mouse device common for all mice',
            'TCP cubic registered',
            'NET: Registered protocol family 17',
            'RPC: Registered udp transport module.',
            'RPC: Registered tcp transport module.',
            "oeth_open:  Ready to process packets now on dev->name:'eth0', dev:d597d800;",
            'IP-Config: Complete:',
            '     device=eth0, addr=192.168.11.105, mask=255.255.255.0, gw=192.168.11.1,',
            '     host="HiFi-2 Demo", domain=, nis-domain=(none),',
            '     bootserver=192.168.11.55, rootserver=192.168.11.55, rootpath=',
            'Looking up port of RPC 100003/2 on 192.168.11.55',
            'Looking up port of RPC 100005/1 on 192.168.11.55',
            'VFS: Mounted root (nfs filesystem) on device 0:11.',
            'Freeing unused kernel memory: 72k freed',
            'Starting portmap: done',
            'Initializing random number generator... done.',
            'Starting network...',
            'ip: RTNETLINK answers: File exists',
            'Starting sshd: OK',
            'Starting NFS statd: done',
            'Starting NFS services: done',
            'Starting NFS daemon: done',
            'Starting NFS mountd: done',
            "Starting domain name daemon: namedwarning: `named' uses 32 - bit capabilities(legacy support in use) ",
            'Mounting Other NFS Filesystems',
            'Booting done',
            '---------------------------------------------------------------',
            'Others from your squad are doing the "dirty job", you must gain superuser privileges on all onboard computers for future analysis',
            "Type 'help' to get all available commands"
        ];
        parts.forEach((part, i) => {
            setTimeout(() => {
                this.game.screens.booting.progress = i + 1;
                this.game.screens.booting.total = parts.length;
                this.writeLine(part);
            }, (i + 1) * 30);
        });
    }
}
