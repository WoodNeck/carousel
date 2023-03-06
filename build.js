/* eslint-env node */
const { build, analyzeMetafile } = require("esbuild");

const buildModule = async format => {
  try {
    const result = await build({
      format,
      entryPoints: ["./src/index.ts"],
      outfile: `./lib/carousel.${format}.js`,
      bundle: true,
      minify: true,
      sourcemap: true,
      metafile: true
    });

    console.log(await analyzeMetafile(result.metafile));
  } catch (err) {
    process.stderr.write(err.stderr);
    process.exit(1);
  }
};

const run = async () => {
  await buildModule("esm");
  await buildModule("cjs");
  await buildModule("iife");
};

run();
