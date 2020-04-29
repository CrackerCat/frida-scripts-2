var table = ["setup", "destroy", "submit", "cancel", "getevents", "setxattr", "lsetxattr", "fsetxattr", "getxattr", "lgetxattr", "fgetxattr", "listxattr", "llistxattr", "flistxattr", "removexattr", "lremovexattr", "fremovexattr", "getcwd", "dcookie", "eventfd2", "create1", "ctl", "pwait", "dup", "dup3", "fcntl", "init1", "watch", "watch", "ioctl", "set", "get", "flock", "mknodat", "mkdirat", "unlinkat", "symlinkat", "linkat", "renameat", "umount2", "mount", "root", "nfsservctl", "statfs", "fstatfs", "truncate", "ftruncate", "fallocate", "faccessat", "chdir", "fchdir", "chroot", "fchmod", "fchmodat", "fchownat", "fchown", "openat", "close", "vhangup", "pipe2", "quotactl", "getdents64", "lseek", "read", "write", "readv", "writev", "pread64", "pwrite64", "preadv", "pwritev", "sendfile", "pselect6", "ppoll", "signalfd4", "vmsplice", "splice", "tee", "readlinkat", "fstatat", "fstat", "sync", "fsync", "fdatasync", "range2", "range", "create", "settime", "gettime", "utimensat", "acct", "capget", "capset", "personality", "exit", "group", "waitid", "address", "unshare", "futex", "list", "list", "nanosleep", "getitimer", "setitimer", "load", "module", "module", "create", "gettime", "getoverrun", "settime", "delete", "settime", "gettime", "getres", "nanosleep", "syslog", "ptrace", "setparam", "setscheduler", "getscheduler", "getparam", "setaffinity", "getaffinity", "yield", "max", "min", "interval", "syscall", "kill", "tkill", "tgkill", "sigaltstack", "sigsuspend", "sigaction", "sigprocmask", "sigpending", "sigtimedwait", "sigqueueinfo", "sigreturn", "setpriority", "getpriority", "reboot", "setregid", "setgid", "setreuid", "setuid", "setresuid", "getresuid", "setresgid", "getresgid", "setfsuid", "setfsgid", "times", "setpgid", "getpgid", "getsid", "setsid", "getgroups", "setgroups", "uname", "sethostname", "setdomainname", "getrlimit", "setrlimit", "getrusage", "umask", "prctl", "getcpu", "gettimeofday", "settimeofday", "adjtimex", "getpid", "getppid", "getuid", "geteuid", "getgid", "getegid", "gettid", "sysinfo", "open", "unlink", "timedsend", "timedreceive", "notify", "getsetattr", "msgget", "msgctl", "msgrcv", "msgsnd", "semget", "semctl", "semtimedop", "semop", "shmget", "shmctl", "shmat", "shmdt", "socket", "socketpair", "bind", "listen", "accept", "connect", "getsockname", "getpeername", "sendto", "recvfrom", "setsockopt", "getsockopt", "shutdown", "sendmsg", "recvmsg", "readahead", "brk", "munmap", "mremap", "key", "key", "keyctl", "clone", "execve", "mmap", "fadvise64", "swapon", "swapoff", "mprotect", "msync", "mlock", "munlock", "mlockall", "munlockall", "mincore", "madvise", "pages", "mbind", "mempolicy", "mempolicy", "pages", "pages", "tgsigqueueinfo", "open", "accept4", "recvmmsg", "syscall", "wait4", "prlimit64", "init", "mark", "at", "at", "adjtime", "syncfs", "setns", "sendmmsg", "readv", "writev", "kcmp", "module", "setattr", "getattr", "renameat2", "seccomp", "getrandom", "create", "bpf", "execveat", "userfaultfd", "membarrier", "mlock2", "range", "preadv2", "pwritev2", "mprotect", "alloc", "free", "statx", "syscalls"];

function stalkSVC() {
    Stalker.follow(Process.getCurrentThreadId(), {
        transform: function (iter) {
            var insn = iter.next();
            do {
                if (insn.mnemonic === 'svc') {
                    iter.putCallout(onSVC)
                }
                iter.keep();
            } while ((insn = iter.next()) !== null);
        }
    });
}

function onSVC(context) {
    var sc = parseInt(context['x8']);
    console.log('syscall N', sc, '[' + table[sc] + ']')
}
