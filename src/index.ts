import express, { Request, Response } from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());

const repository = new PrismaClient();

// Cadastrar um novo criminoso
app.post("/criminals", async (request: Request, response: Response) => {
  try {
    const {
      name,
      lastName,
      age,
      cpf,
      crimeDescription,
      crimeType,
      weaponDescription,
      weaponType,
    } = request.body;

    if (
      !name ||
      !lastName ||
      !age ||
      !cpf ||
      !crimeDescription ||
      !crimeType ||
      !weaponDescription ||
      !weaponType
    ) {
      return response.status(400).json({
        success: false,
        code: response.statusCode,
        messsage: "Preencha todos os campos obrigatórios",
      });
    }

    const newCriminal = await repository.criminal.create({
      data: {
        name,
        lastName,
        age,
        cpf,
        crimes: {
          create: [
            {
              crimeDescription,
              crimeType,
              weapons: {
                create: [
                  {
                    weaponDescription,
                    weaponType,
                  },
                ],
              },
            },
          ],
        },
      },
      select: {
        name: true,
        lastName: true,
        age: true,
        cpf: true,
        crimes: {
          select: {
            crimeDescription: true,
            crimeType: true,
            weapons: {
              select: {
                weaponDescription: true,
                weaponType: true,
              },
            },
          },
        },
      },
    });

    response.status(201).json({
      success: true,
      message: "Criminoso cadastrado com sucesso!",
      data: newCriminal,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      code: response.statusCode,
      message: "Erro ao cadastrar o criminoso",
    });
  }
});

// Listar todos os criminosos
app.get("/criminals", async (request: Request, response: Response) => {
  try {
    const criminals = await repository.criminal.findMany({
      select: {
        name: true,
        lastName: true,
        age: true,
        cpf: true,
        crimes: {
          select: {
            crimeDescription: true,
            crimeType: true,
            weapons: {
              select: {
                weaponDescription: true,
                weaponType: true,
              },
            },
          },
        },
      },
    });

    if (!criminals) {
      return response.status(404).json({
        success: false,
        code: response.statusCode,
        message: "Nenhum criminoso encontrado",
      });
    }

    response.json({
      success: true,
      message: "Listagem de criminosos",
      data: criminals,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      code: response.statusCode,
      message: "Erro ao listar os criminosos",
    });
  }
});

// Buscar pelo CPF um criminoso e seus crimes 
app.get(
  "/criminals/:cpf/crimes",
  async (request: Request, response: Response) => {
    try {
      const { cpf } = request.params;

      if (!cpf) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "CPF não encntrado!",
        });
      }

      const criminal = await repository.criminal.findUnique({
        where: { cpf },
        include: {
          crimes: {
            select: {
              id: true,
              crimeDescription: true,
              crimeType: true,
              weapons: {
                select: {
                  id: true,
                  weaponDescription: true,
                  weaponType: true,
                },
              },
            },
          },
        },
      });

      if (!criminal) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Criminoso não encontrado",
        });
      }

      response.status(200).json({
        success: true,
        message: "Crimes encontrados com sucesso.",
        data: criminal.crimes,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao buscar os crimes do criminoso.",
      });
    }
  }
);

// Listar pelo CPF armas registradas para um determinado criminoso 
app.get(
  "/criminals/:cpf/weapons",
  async (request: Request, response: Response) => {
    try {
      const { cpf } = request.params;

      if (!cpf) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "CPF não encontrado!",
        });
      }

      const criminal = await repository.criminal.findUnique({
        where: { cpf },
        include: {
          crimes: {
            select: {
              id: true,
              weapons: {
                select: {
                  id: true,
                  weaponDescription: true,
                  weaponType: true,
                },
              },
            },
          },
        },
      });

      if (!criminal) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Criminoso não encontrado",
        });
      }

      response.status(200).json({
        success: true,
        message: "Armas encontradas com sucesso.",
        data: criminal.crimes.map((crime) => crime.weapons),
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao buscar as armas do criminoso.",
      });
    }
  }
);

app.listen(3000, () => {
  console.log("🚀 Server ready at: http://localhost:3000");
});