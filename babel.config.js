module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        targets: {
          ie: 10 // 根据自己的目标环境进行配置
        },
        debug: true,
        // corejs这一项也需要加上，corejs有2和3两个版本
        // 如果不确定有没有下载core-js，可执行 cnpm i core-js@2 --save
        corejs: 2
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};