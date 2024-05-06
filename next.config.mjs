// @ts-check
import bundleAnalyser from "@next/bundle-analyzer";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/**
 * @param {import("next").NextConfig | undefined} config
 */
function defineNextConfig(config) {
  const withBundleAnalyzer = bundleAnalyser({
    enabled: process.env.ANALYZE === "true",
  });

  return withBundleAnalyzer(config);
}
/** @type {import("next").NextConfig} */
const config = defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
});
export default config;
