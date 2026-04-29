import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export function renderTemplate(templateName: string, data: any) {
  const basePath = path.resolve(
    process.cwd(),
    "src/shared/providers/mail/templates"
  );

  // template específico
  const templateFile = fs.readFileSync(
    path.join(basePath, `${templateName}.hbs`),
    "utf-8"
  );

  const templateCompiled = handlebars.compile(templateFile);
  const content = templateCompiled(data);

  // layout
  const layoutFile = fs.readFileSync(
    path.join(basePath, "layouts/main.hbs"),
    "utf-8"
  );

  const layoutCompiled = handlebars.compile(layoutFile);

  return layoutCompiled({
    ...data,
    body: content,
  });
}