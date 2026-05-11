import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  turbopack: {
    resolveAlias: {
      // 클라이언트 번들에서 native 모듈 안전 처리
    },
  },
};

export default nextConfig;
