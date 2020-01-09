import theme from './aliyunTheme'
export default {
  base: '/apd',
  publicPath: '/apd/',
  plugins: [
    [
      'umi-plugin-react',
      {
      },
    ]
  ],
  theme: {
    ...theme
  },
}
