import * as readline from 'readline';

let rl;

// print out all an enum's options
export function stringifyEnum(e): string {

  let enumProps: Map<number, string> = new Map();

  for (let member in e) {
    if ( parseInt(member, 10) >= 0) {
      enumProps.set(parseInt(member, 10), e[member]);
    }
  }

  let stringBuilder = [];
  for(let prop of enumProps) {
    stringBuilder.push(`${prop[0]} - ${prop[1]}`);
  }

  return stringBuilder.join('\n');
}


export function prompt(text: string): Promise<String> {
  return new Promise(resolve => {
    rl.question(text, function(answer) {
      resolve(answer);
    });
  });
}

export function open() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}


export function close(): void {
  rl.close();
}
