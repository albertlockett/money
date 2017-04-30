const HELP_INFO = `
==============================
== Money Management Utility ==
==============================

usage:
----------------------------
money <command> [args]


commands:
----------------------------
create (default)  create a new transaction using the wizard or by args
list              view list of transactions
list-types        list transaction types


args:
----------------------------
default args
  -h, --help
      show help menu

create args
  -a, --amount <number>
      amount of dollar in the tranasaction

  -t, --today
      transaction took place today

  -y, --yesterday
      transaction took place yesterday

  -d, --day <number>
      offset from today in which transaction took place

  -D, --date <date (YYYY-MM-DD)
      date on which the transaction took place
`;

export default HELP_INFO;
