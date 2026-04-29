import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderTemplate(templateName: string, data: any) {
  const filePath = path.resolve(
    __dirname,
    'templates',
    `${templateName}.hbs`
  )

  const templateFile = fs.readFileSync(filePath, 'utf-8')

  const compileTemplate = handlebars.compile(templateFile)

  return compileTemplate(data)
}