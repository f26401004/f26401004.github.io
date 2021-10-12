const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const plugins = [];

if (!IS_PROD) {
  plugins.push(new BundleAnalyzerPlugin());
} else {
  plugins.push(
    new BrotliPlugin({
      test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
      minRatio: 0.8,
    })
  );
}

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(pdf)(\?.*)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "files/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: plugins,
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
        new TerserPlugin({
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          minify: TerserPlugin.esbuildMinify,
          terserOptions: {
            format: {
              comments: !IS_PROD,
            },
            compress: {
              drop_console: IS_PROD,
            },
          },
          extractComments: !IS_PROD,
        }),
        new CssMinimizerPlugin(),
      ],
    },
  },
};
