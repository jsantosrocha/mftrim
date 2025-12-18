const vscode = require('vscode');

function trimBufferToBytes(buf, maxBytes) {
  if (buf.length <= maxBytes) return buf;
  let slice = buf.slice(0, maxBytes);
  while (slice.length > 0 && (slice[slice.length - 1] & 0xC0) === 0x80) {
    slice = slice.slice(0, slice.length - 1);
  }
  return slice;
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('mftrim.trim', async function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Nenhum editor ativo. Abra um arquivo e tente novamente.');
      return;
    }
    const doc = editor.document;
    await editor.edit(editBuilder => {
      for (let i = 0; i < doc.lineCount; i++) {
        const line = doc.lineAt(i);
        const text = line.text;
        const buf = Buffer.from(text, 'utf8');
        if (buf.length <= 80) continue;
        const trimmedBuf = trimBufferToBytes(buf, 80);
        const newText = trimmedBuf.toString('utf8');
        editBuilder.replace(line.range, newText);
      }
    });
    vscode.window.showInformationMessage('Trim concluído: linhas com no máximo 80 bytes.');
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
