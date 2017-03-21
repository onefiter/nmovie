module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },


        },

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    nodeArgs: ['--debug'],
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watch: ['./'],
                    delay: 1000,
                    env: {
                        PORT: '3000'
                    },
                    cwd: __dirname
                }
            }
        },


        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    /**
     * 加载三个组件
     */
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent') //针对慢任务开发 less  sass coffee

    // grunt.loadNpmTasks('grunt-mocha-test')
    // grunt.loadNpmTasks('grunt-contrib-less')
    //grunt.loadNpmTasks('grunt-contrib-uglify')
    // grunt.loadNpmTasks('grunt-contrib-jshint')

    //防止语法错误而中断服务
    grunt.option('force', true)

    //注册默认任务
    grunt.registerTask('default', ['concurrent'])

    // grunt.registerTask('test', ['mochaTest'])
}