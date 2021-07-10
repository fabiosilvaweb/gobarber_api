# GoBarber - Aplicação back-end

Aplicação back-end do sistema de agendamento para barbearias

### Documentação no swagger
[Documentação](https://api.fabiosilvaweb.com/gobarber/api-docs/)

### Configurando projeto

Crie um arquivo .env e coloque as informações iguais ao arquivo **.env.development**

Agora instale os pacotes com o comando:
```bash
yarn || npm install
```
Configure um arquivo ormconfig.json e adicione as seguintes informações
```json
[
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "root",
    "database": "gobarber",
    "entities": [
      "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations/"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "gobarber",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
```