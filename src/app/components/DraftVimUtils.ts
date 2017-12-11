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
  h: 72,
  i: 73
};


export const handleKeyCommand: (
  command: string, vimState: VimEditorState
) => VimEditorState | void = (command, vimState) => {
  

  if(command === 'char-left') {
    if(vimState.commandMode) {
      return moveCursor({ x: -1 }, vimState);
    } else {
      return insertCharacter('h', vimState);
    }
  }

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

    case Keys.h:
      return 'char-left';

    case Keys.i: 
      return 'insert';
    
    default:
      return getDefaultKeyBinding(event);
  }
};


type CursorDiff = {
  x: number; // horizontal movement within editor (< 0 = left, > 0 = right)
};
export const moveCursor: (
  c: CursorDiff, v: VimEditorState
) => VimEditorState = (cursorDiff, vimState) => {

  let editorState = vimState.editorState;
  let selection = editorState.getSelection();
  let focusOffset = selection.getFocusOffset();

  let nextFocusOffset = Math.max(0, focusOffset + cursorDiff.x);
  selection = selection.merge({ 
    anchorOffset: nextFocusOffset, 
    focusOffset: nextFocusOffset 
  });
  editorState = EditorState.forceSelection(editorState, selection);

  return { ...vimState, editorState };
};
