-- CreateEnum
CREATE TYPE "TypeCrime" AS ENUM ('HOMICIDIO', 'ROUBO', 'SEQUESTRO');

-- CreateEnum
CREATE TYPE "TypeWeapon" AS ENUM ('FACA', 'PISTOLA', 'OUTROS');

-- CreateTable
CREATE TABLE "criminals" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criminals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "crimeDescription" VARCHAR(255) NOT NULL,
    "crime_type" "TypeCrime" NOT NULL,
    "criminal_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" UUID NOT NULL,
    "weapon_description" VARCHAR(255) NOT NULL,
    "weapon_type" "TypeWeapon" NOT NULL,
    "crime_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criminals_cpf_key" ON "criminals"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "crimes_criminal_id_key" ON "crimes"("criminal_id");

-- CreateIndex
CREATE UNIQUE INDEX "weapons_crime_id_key" ON "weapons"("crime_id");

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "criminals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_crime_id_fkey" FOREIGN KEY ("crime_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
