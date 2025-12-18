# MF Trim

Extensão VS Code para cortar (trim) cada linha do arquivo ativo a no máximo 80 bytes (UTF-8).

Uso:

- Abra um arquivo no VS Code.
- Pressione `Ctrl+Shift+P` e digite `mftrim`, ou execute o comando `mftrim: Trim lines to 80 bytes`.

Comportamento:

- Para cada linha do documento, qualquer conteúdo a partir do byte 81 é removido.
- A remoção respeita limites de caracteres UTF-8 (não quebra sequências multibyte).
