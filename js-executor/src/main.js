import * as monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('editor'), {
  value: "console.log('Hello World');",
  language: 'javascript'
});