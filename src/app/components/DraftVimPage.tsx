import * as React from 'react';
import { ContentState, Editor, EditorState } from 'draft-js';
import { handleKeyCommand, keyBindingFn } from './DraftVimUtils';


const DEFAULT_TEXT = `
export const compare: (
  password: string, hashedPassword: string
) => Promise<boolean> = (password, hashedPassword) => {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err: Error, result: boolean) => {
      if(err) { reject(err); }
      resolve(result);
    });
  });
  
};
`;


type State = {
  commandMode: boolean;
  editorState: EditorState;
};


export class DraftVimPage extends React.Component<{}, State> {

  constructor(props, context) {
    super(props, context);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEscape = this.onEscape.bind(this);

    this.state = {
      commandMode: false,
      editorState: EditorState.createWithContent(
        ContentState.createFromText(DEFAULT_TEXT)
      )
    };

  }


  private handleKeyCommand(command) {
    const nextState = handleKeyCommand(command, this.state);
    if(nextState) { 
      this.setState(nextState);
      return 'handled';
    }

    return 'not-handled';
  }


  private onEscape() {
    this.setState({ commandMode: true });
  }


  private onChange(editorState) {
    this.setState({ editorState });
  }


  public render () {
    return (
      <div className={`draft-editor-container commandMode-${
        this.state.commandMode
      }`}>
        <Editor 
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={keyBindingFn}
            onEscape={this.onEscape}
            onChange={this.onChange} />
        <div>{this.state.commandMode ? ":" : ""}</div>
      </div>
    );
  }
}
