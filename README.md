# sinuca3D
Jogo de Sinuca Básico em 3D feito em babylonjs para cadeira de Matemática e Física para Jogos.


Para rodar o codigo compilado, baixe um servidor local como o Xampp, ou o Wamp. 
Extensões do vscode como o express e o live-server também servem.


Para compilar o codigo, baixe as dependências do projeto utilizando:

-- npm install



há um script para compilição com live reload bastando rodar: 

-- npm run watch


# Issues Conhecidas

Não há uma prevenção de colisão por frame, fazendo com que quando o objeto colida (como é o caso de AABB com circulo) já seja tarde demais.
