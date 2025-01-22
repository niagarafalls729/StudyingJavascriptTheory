import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['monaco-editor'],  // monaco-editor를 최적화 목록에 포함
  },
  server: {
    port: 3000, // 개발 서버 포트
    open: true, // 서버 시작 시 브라우저 열기
  },
});
