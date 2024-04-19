// create the client once and then we can import it
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
