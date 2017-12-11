import { 
  ContentState,
  EditorState, 
  getDefaultKeyBinding,
  Modifier
} from 'draft-js';

type VimEditorState = {
  commandMode: boolean;
  editorState: EditorState;
};


const Keys = {
  i: 73
};


export const handleKeyCommand: (
  command: string, vimState: VimEditorState
) => VimEditorState | void = (command, vimState) => {
  
  if(command === 'insert') {

    if(vimState.commandMode) {
      return { ...vimState, commandMode: false };
    } else {
      return insertCharacter('i', vimState);
    }
  }
  
  return;
};


export const insertCharacter: (
  character: string, vimState: VimEditorState
) => VimEditorState = (character, vimState) => {

  let editorState = vimState.editorState;
  let content: ContentState = editorState.getCurrentContent();
  let selection = editorState.getSelection();

  if(selection.isCollapsed()) {
    content = Modifier.insertText(content, selection, character);
    
    selection = selection.merge({ 
      anchorOffset: selection.getAnchorOffset() + 1,
      focusOffset: selection.getFocusOffset() + 1 
    });
  } else {
    content = Modifier.replaceText(content, selection, character);
    
    if(selection.isBackward) {
      selection = selection.merge({ 
        anchorOffset: selection.getFocusOffset() + 1,
        focusOffset: selection.getFocusOffset() + 1
      });
    } else {
      selection = selection.merge({ 
        anchorOffset: selection.getAnchorOffset() + 1,
        focusOffset: selection.getAnchorOffset() + 1 
      });
    }
  }

  editorState = EditorState.push(editorState, content, 'change-block-data');
  editorState = EditorState.forceSelection(editorState, selection);

  return { ...vimState, editorState };
};


export const keyBindingFn: (e) => string = (event) => {
  
  switch(event.keyCode) {
    case Keys.i: 
      return 'insert';
    
    default:
      return getDefaultKeyBinding(event);
  }
};

