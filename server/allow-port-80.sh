
# ref https://itectec.com/superuser/allow-non-root-process-to-bind-to-port-80-and-443/

sudo setcap CAP_NET_BIND_SERVICE=+eip /path/to/binary
