import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/components/Ifcviewer/index.js',
    output: {
        format: 'esm',
        file: './src/components/Ifcviewer/dist/bundle.js'
    },
    plugins: [
        resolve(),
    ]
};