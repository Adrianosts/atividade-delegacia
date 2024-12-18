## Sistema backend para gerenciar registros de criminosos, crimes e armas utilizando **Prisma ORM**com um banco de dados **PostgreSQL**.

## 1. Estrutura do Banco de Dados

### a) `Criminal`
- Representa um criminoso.
- Contém atributos como `name`, `lastName`, `age`, `cpf`, e timestamps (`createdAt`, `updatedAt`).
- Relacionamento:
    - Um criminoso pode estar envolvido em vários crimes.

###  b) `Crime`
- Representa uma arma relacionada a um crime.
- Contém atributos como `crimeDescription`, `crimeType` (enumerado).
- Relacionamento:
    - Um crime pode envolver várias armas.

### c) `Weapon`
- Representa uma arma relacionada a um crime.
- Contém atributos como `weaponDescription`, `weaponType` (enumerado).
- Relacionamento:
   - Uma arma pertence a apenas um crime.
 

## 2. Operações no Servidor

É usado Express.js para criar uma API RESTful que interage com os modelos definidos no Prisma. As operações implementadas são:

### a) Cadastrar um novo criminoso
Endpoint: `POST /criminals`

1.Recebe um corpo da requisição com:
- Informações do criminoso: `name`, `lastName`, `age`, `cpf`.
- Informações do crime associado: `crimeDescription`, `crimeType`.
- Informações da arma associada ao crime: `weaponDescription`, `weaponType`.

  2.Valida se todos os campos obrigatórios foram preenchidos. Caso contrário, retorna um erro `400`.

  3.Cria um registro no banco de dados:
  - Um criminoso.
  - Um crime associado ao criminoso.
  - Uma arma associada ao crime.
 
  4.Retorna o criminoso criado com seus crimes e armas.
  
### b) Listar todos os criminosos
Endpoint: `GET /criminals`

1.Consulta no banco de dados todos os criminosos registrados.

2.Retorna:
- Informações básicas do criminoso (`name`, `lastName`, `age`, `cpf`).
- Crimes associados ao criminoso.
- Armas relacionadas a cada crime.

- Se nenhum criminoso for encontrado, retorna um erro `404`.

### c) Buscar crimes de um criminoso pelo CPF
Endpoint: `GET /criminals/:cpf/crimes`

1.Recebe o CPF como parâmetro na URL.

2.Valida se o CPF foi fornecido. Caso contrário, retorna um erro `400`.

3. Busca no banco de dados:
   - Um criminoso pelo CPF.
   - Crimes associados a esse criminoso, incluindo as armas relacionadas a cada crime.
  
4.Retorna os crimes encontrados, com detalhes como:
  - ID do crime.
  - Descrição e tipo do crime.
  - Informações das armas utilizadas no crime.

Se o criminoso não for encontrado, retorna um erro `404`.



## 3. Enumerações Definidas
Forma criados dois enums no Prisma para representar tipos de crimes e armas, melhorando a integridade dos dados.

### a) `TypeCrime`
- Lista de tipos de crimes possíveis:
    - `HOMICIDIO`
    - `ROUBO`
    - `SEQUESTRO`
 
### b) `TypeWeapon`
- Lista de tipos de armas possíveis:
    - `FACA`
    - `PISTOLA`
    - `OUTROS`

## Resumo

- Banco de dados: PostgreSQL configurado via variável de ambiente `DATABASE_URL`.
- ORM: Prisma para manipulação dos dados.
- Servidor: Express.js com endpoints para CRUD básico.
- Recursos avançados:
    - Relacionamentos entre modelos (Criminoso → Crime → Arma).
    - Validação de entrada e tratamento de erros (códigos `400`, `404`, `500`).
    - Utilização de select e include no Prisma para retornar apenas os dados necessários.
