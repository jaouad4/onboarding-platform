-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('TECHNIQUE', 'COMMERCE', 'MARKETING', 'FINANCE', 'RH');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING_CERTIFICATION', 'CERTIFICATION_SUBMITTED', 'CERTIFICATION_VERIFIED', 'READY');

-- CreateEnum
CREATE TYPE "PrimaryVerificationStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED');

-- CreateEnum
CREATE TYPE "AdminVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "domain" "Domain",
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_CERTIFICATION',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "firstLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pdfStoragePath" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "primaryVerificationStatus" "PrimaryVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "primaryVerificationNote" TEXT,
    "adminVerificationStatus" "AdminVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "adminVerificationNote" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,

    CONSTRAINT "CertificationSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "CertificationSubmission" ADD CONSTRAINT "CertificationSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
