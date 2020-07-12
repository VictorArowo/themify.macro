const { createMacro } = require("babel-plugin-macros");
module.exports = createMacro(themifyMacro);

const isFunctionSyntax = (referencePath) =>
  referencePath.parentPath.type === "CallExpression";

const evaluate = (value) => {
  const lines = value.split(";\n");
  const processed = lines
    .filter((el) => el.trim() !== "")
    .map((el) => {
      const sp = el.split(":");

      const result = /^(.+)\((.*)\)$/.exec(sp[1]);

      return result
        ? `${sp[0]}: \${({theme}) => theme.${result[1]}[${result[2]}]};`
        : /=>/g.test(sp[1])
        ? `${sp[0]}: \${${eval(sp[1])}};`
        : `${sp[0]}: ${sp[1]};`;
    });

  return processed.reduce((acc, el) => (acc += `\n${el}`)) + "\n";
};

function themifyMacro({ references, babel: { types: t } }) {
  const firstPath = references.default[0];

  const program = firstPath.find((p) => p.isProgram());
  if (!firstPath.parentPath.hub.file.code.includes("styled-components")) {
    program.unshiftContainer(
      "body",
      t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier("styled"))],
        t.stringLiteral("styled-components")
      )
    );
  }

  references.default.forEach((referencePath) => {
    const valueString =
      referencePath.parentPath.parent.quasi.quasis[0].value.raw;

    const value = evaluate(valueString);

    referencePath.parentPath.parent.quasi.quasis[0].value = {
      raw: value,
      cooked: value,
    };

    if (!isFunctionSyntax(referencePath)) {
      referencePath.parent.object.name = "styled";
      referencePath.parent.object.loc.identifier = "styled";
    } else {
      referencePath.parent.callee.name = "styled";
    }
  });
}
