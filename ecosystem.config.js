export default {
  apps: [
    {
      name: 'thotsparkz-preview',
      script: 'node_modules/vite/bin/vite.js',
      args: 'preview --host 127.0.0.1 --port 4173',
      exec_mode: 'cluster',
      instances: Number(process.env.WEB_CONCURRENCY || 1),
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=400',
      },
    },
  ],
};
