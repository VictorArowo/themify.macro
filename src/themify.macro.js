const { createMacro } = require("babel-plugin-macros");
module.exports = createMacro(themifyMacro);

const isFunctionSyntax = (referencePath) =>
  referencePath.parentPath.type === "CallExpression";

function themifyMacro({ references, babel: { types: t } }) {
  references.default.forEach((referencePath) => {
    // const program = referencePath.find((p) => p.isProgram());

    // program.unshiftContainer(
    //   "body",
    //   t.importDeclaration(
    //     [t.importDefaultSpecifier(t.identifier("styled"))],
    //     t.stringLiteral("styled-components")
    //   )
    // );

    const valueString =
      referencePath.parentPath.parent.quasi.quasis[0].value.raw;

    const value = evaluate(valueString);

    referencePath.parentPath.parent.quasi.quasis[0].value = {
      raw: `${value}`,
      cooked: `${value}`,
    };

    if (!isFunctionSyntax(referencePath)) {
      referencePath.parent.object.name = "styled";
      referencePath.parent.object.loc.identifier = "styled";
    } else {
      referencePath.parent.callee.name = "styled";
    }
  });
}

function evaluate(value) {
  const lines = value.split(";\n");
  const processed = lines
    .filter((el) => el.trim() !== "")
    .map((el) => {
      const sp = el.split(":");

      return /\(.*\)/.test(sp[1])
        ? `${sp[0]}: \${({theme}) => theme[${sp[1]}]};`
        : `${sp[0]}: ${sp[1].trim()};`;
    });

  return processed.reduce((acc, el) => (acc += `\n${el}`)) + "\n";
}
