/**
 * Seed Project for the development of front-end javascript applications using bower and grunt. 
 * The project is pre-configured with the following grunt modules:
 * 
 * 1) connect
 * 2) open
 * 3) sass
 * 4) copy
 * 5) uglify
 * 6) concat
 * 7) remove
 * 8) string-replace
 * 9) usebanner
 * 10) watch
 */
module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: {
            dist: "dist",
            src: "src",
            host: "0.0.0.0",
            port: "8888"
        },

        /**
         * Connect is a static web server for development.
         */
        connect: {
            server: {
                options: {
                    hostname: '<%=app.host%>',
                    port: '<%=app.port%>',
                    base: "<%=app.dist%>",
                    livereload: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [proxy].concat(defaultMiddleware);
                    }
                },
                /**
                 * Grunt Connect support for proxying API calls during development.
                 * Create a proxy between the application and a REST api to prevent CORS.
                 */
                proxies: [{
                    context: '/app/rest',
                    host: "192.168.10.1",
                    port: 8080,
                }]
            }
        },

        /**
         * Open urls and files from a grunt task.
         */
        open: {
            all: {
                path: 'http://<%=app.host%>:<%=app.port%>'
            }
        },

        /**
         *  Compile Sass to CSS.
         */
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: {
                    '<%=app.dist%>/css/main.css': '<%=app.src%>/css/style.css'
                }
            }
        },

        /**
         * Copy static files and folders to the static web server document root.
         */
        copy: {
            main: {
                files: [{
                        cwd: '<%=app.src%>/images',
                        src: '**/*',
                        dest: '<%=app.dist%>/images',
                        expand: true
                    }, {
                        cwd: '<%=app.src%>/',
                        src: '*.html',
                        dest: '<%=app.dist%>/',
                        expand: true
                    }, {
                        cwd: '<%=app.src%>/partials',
                        src: '**/*',
                        dest: '<%=app.dist%>/partials',
                        expand: true
                    }, {
                        cwd: '<%=app.src%>/data',
                        src: '**/*.json',
                        dest: '<%=app.dist%>/data',
                        expand: true
                    }, {
                    cwd: '<%=app.src%>/css',
                    src: '**/*.css',
                    dest: '<%=app.dist%>/css',
                    expand: true
                }
                ]
            }
        },

        /**
         * Minify files with UglifyJS.
         */
        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%=app.src%>/js',
                    src: '**/*js',
                    dest: '<%=app.dist%>/js',
                    ext: '.js',
                    extDot: 'last'
                }]
            }
        },

        /**
         * Concatenate files.
         */
        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: [
                //vendors js
                '<%=app.src%>/vendors/jquery/<%=app.dist%>/jquery.min.js',
                '<%=app.src%>/vendors/jquery-ui/jquery-ui.min.js',
                '<%=app.src%>/vendors/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                //angular dep
                '<%=app.src%>/vendors/angular/angular.min.js',
                '<%=app.src%>/vendors/angular-route/angular-route.min.js',
                '<%=app.src%>/vendors/angular-marked/dist/angular-marked.min.js',

                //app scripts
                '<%=app.dist%>/js/module.js',
                '<%=app.dist%>/js/app.js',
                    '<%=app.dist%>/js/factory/**/*.js',
                '<%=app.dist%>/js/services/**/*.js',

                '<%=app.dist%>/js/directives/**/*.js',
                '<%=app.dist%>/js/filters/**/*.js',
                '<%=app.dist%>/js/controllers/**/*.js'

                ],
                dest: '<%=app.dist%>/libs/app.min.js'
            }
        },

        /**
         * Remove directory and files.
         */
        remove: {
            default_options: {
                trace: true,
                dirList: ['<%=app.dist%>/js']
            }
        },

        /**
         * Replace strings on files by using string or regex patters.
         */
        'string-replace': {
            inline: {
                files: {
                    '<%=app.dist%>/': ['<%=app.dist%>/*.html', '<%=app.dist%>/libs/*.js', '<%=app.dist%>/css/*.css'],
                },
                options: {
                    replacements: [{
                        pattern: /{{VERSION}}/g,
                        replacement: '<%=pkg.version%>'
                    }]
                }
            }
        },

        /**
         * Adds a simple banner to files.
         */
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '/*!\n' +
                        '  * <%=pkg.name%> : <%=pkg.description%>\n' +
                        '  * @version <%=pkg.version%>\n' +
                        '  * @author <%=pkg.author%>\n' +
                        '  * @date <%=grunt.template.today("yyyy-mm-dd")%>\n' +
                        '  */\n',
                    linebreak: true
                },
                files: {
                    src: ['<%=app.dist%>/**/*.js']
                }
            }
        },

        /**
         * Run tasks whenever watched files change.
         */
        watch: {
            img: {
                options: {
                    livereload: true
                },
                files: ['<%=app.src%>/**/*.png',
                        '<%=app.src%>/**/*.jpg',
                        '<%=app.src%>/**/*.gif',
                        '<%=app.src%>/**/*.eot',
                        '<%=app.src%>/**/*.svg',
                        '<%=app.src%>/**/*.ttf',
                        '<%=app.src%>/**/*.woff',
                        '<%=app.src%>/**/*.woff2'
                    ],
                tasks: ['copy']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['<%=app.src%>/*.html', '<%=app.src%>/**/*.html'],
                tasks: ['copy']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['<%=app.src%>/**/*.js'],
                tasks: ['uglify', 'string-replace', 'concat']
            },
            css: {
                options: {
                    livereload: true
                },
                files: ['<%=app.src%>/**/*.css'],
                tasks: ['copy', 'sass']
            }
        }
    });

    grunt.registerTask('default', ['uglify', /*'sass',*/ "copy", 'string-replace', 'concat', 'remove', 'usebanner']);

    grunt.registerTask('server', ['default', 'configureProxies:server', "open", 'connect:server', 'watch']);
    grunt.registerTask('serve', ['server']);
};
