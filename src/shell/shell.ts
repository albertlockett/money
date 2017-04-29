import { argv } from 'yargs';
import create from './create';
import help from './help'


async function run() {

  // show help menu if user asks for it:
  if(argv.h || argv.help) {
    help();
    return;
  }

  await create();
}

run()
