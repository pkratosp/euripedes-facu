## Sobre o projeto

Projeto criado com a intenção de ajudar uma instituição sem fins lucrativos, este projeto tem como objetivo gerenciar o cadastro de alunos na instituição

## Iniciar a aplicação

Para inciar a aplicação é necessário possuir o docker instalado, caso já possua o docker execute os comandos abaixo

Rode o comando para executar o banco de dados

```sh
docker compose up -d
```

sera executado em ambiente de desenvolvimento

```sh
npm run start:dev
```

## Para criar chaves publicas e privadas

Observação, caso esteja no windows é necessário instalar a lib openssl pelo chocolatey, caso não tenha instalado rode o comando abaixo para instalar a lib, agora caso estaja em uma distro linux como ubunutu, mint, debian entre outros é bem provalel que o openssl já estejá instalado

```sh
choco install openssl
```

gera a chave privada

```sh
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

gera a chave publica

```sh
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## Para gerar um base64 das chaves publicas e privadas

Observação, caso esteja no windows é necessário instalar a lib base64 pelo chocolatey, caso não tenha instalado rode o comando abaixo

# Para windows

```sh
choco install base64
```

```sh
base64 -i private_key.pem -o private_key-base64.txt
```

```sh
base64 -i public_key.pem -o public_key-base64.txt
```

# Para linux

```sh
base64 private_key.pem > private_key-base64.txt
```

```sh
base64 public_key.pem > public_key-base64.txt
```

## Outros comandos

```sh
# formata o projeto
npm run format
```

```sh
# formata o projeto e verifca regras do lint
npm run lint
```

```sh
# executa testes unitarios
npm run test
```

```sh
# executa testes end two end
npm run test:e2e
```

```sh
# executa um relatorio de testes
npm run test:cov
```

```sh
# executa os testes unitarios em modo watch
npm run test:watch
```

```sh
# builda o projeto para produção
npm run build
```

```sh
# executa o projeto em produção após o projeto buildado
npm run start:prod
```
