const fs = require("fs");
const path = require("path");

const directive = '"use client";\n';
const distDir = path.join(__dirname, "..", "dist");

const mainMinPath = path.join(distDir, "main.min.js");
fs.writeFileSync(mainMinPath, directive + fs.readFileSync(mainMinPath, "utf8"));

const nextPath = path.join(distDir, "next.js");
if (fs.existsSync(nextPath)) {
  fs.writeFileSync(nextPath, directive + fs.readFileSync(nextPath, "utf8"));
}
