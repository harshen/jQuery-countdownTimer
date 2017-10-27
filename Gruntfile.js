module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: './src',
            doc: './doc',
            bin: './build',
            test: './test',
            dest: './dist'
        },
        pluginName: '<%= pkg.name.replace("countdowntimer", "jQuery.countdownTimer") %>',
        clean: {
            build: ['<%= dirs.dest %>/*', '<%= dirs.doc %>/*', '<%= dirs.bin %>/*'],
            tests: ['<%= dirs.test %>/*.min.tests.html']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html', 'css/*.*', 'js/**/*.*'],
                    dest: '<%= dirs.dest %>'
                }]
            }
        },
        uglify: {
            dev: {
                files: {
                    '<%= dirs.dest %>/js/<%= pluginName %>.js': ['<%= dirs.src %>/js/<%= pluginName %>.js']
                },
                options: {
                    beautify: true,
                    compress: false,
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    expand: true,
                    output: {
                        comments: 'some'
                    }
                }
            },
            min: {
                files: {
                    '<%= dirs.dest %>/js/<%= pluginName %>.min.js': ['<%= dirs.dest %>/js/<%= pluginName %>.js']
                },
                options: {
                    report: 'min',
                    sourceMap: true,
                    expand: true,
                    output: {
                        comments: 'some'
                    }
                }
            }
        },
        qunit: {
            all: ['<%= dirs.test %>/*.html']
        },
        jsdoc: {
            options: {
                destination: '<%= dirs.doc %>'
            },
            all: ['<%= dirs.src %>/js/*.js', 'README.md', '!<%= dirs.src %>/js/*-*.js']
        },
        jshint: {
            files: ['Gruntfile.js', '<%= dirs.src %>/**/*.js', '<%= dirs.test %>/**/*.js', '!<%= dirs.src %>/bower_components/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        jsonlint: {
            all: {
                src: ['*.json']
            }
        },
        eslint: {
            target: ['Gruntfile.js', '<%= dirs.src %>/**/*.js', '<%= dirs.test %>/**/*.js', '!<%= dirs.src %>/bower_components/**/*.js']
        },
        compress: {
            main: {
                options: {
                    archive: '<%= dirs.bin %>/<%= pluginName %>-<%= pkg.version %>.zip'
                },
                expand: true,
                cwd: '<%= dirs.dest %>',
                src: ['**/*'],
                dest: '<%= pluginName %>-<%= pkg.version %>'
            }
        },
        version: {
            dist: {
                options: {
                    prefix: '@version\\s*',
                    replace: '[0-9a-zA-Z\\-_\\+\\.]+'
                },
                src: ['<%= dirs.dest %>/**/*.js', '<%= dirs.dest %>/**/*.css']
            },
            dev: {
                options: {
                    prefix: '@version\\s*',
                    replace: '[0-9a-zA-Z\\-_\\+\\.]+'
                },
                src: ['<%= dirs.src %>/**/*.js', '<%= dirs.src %>/**/*.css', '!<%= dirs.src %>/bower_components/**/*.*']
            },
            project: {
                src: ['*.json']
            }
        },
        replace: {
            dist: {
                src: ['<%= dirs.dest %>/index.html'],
                dest: '<%= dirs.dest %>/index.html',
                replacements: [{
                    from: /bower_components\/jquery\/dist\/jquery.min.js/,
                    to: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'
                }]
            },
            datejs: {
				src: ['<%= dirs.dest %>/js/<%= pluginName %>.js'],
                dest: ['<%= dirs.dest %>/js/<%= pluginName %>.js'],
				replacements: [{
					from: /@date/,
					to: "<%= grunt.template.today('dd/mm/yyyy') %>"
				}]
			},
			datecss: {
				src: ['<%= dirs.dest %>/css/<%= pluginName %>.css'],
                dest: ['<%= dirs.dest %>/css/<%= pluginName %>.css'],
				replacements: [{
					from: /@date/,
					to: "<%= grunt.template.today('dd/mm/yyyy') %>"
				}]
			},
            testmin: {
                src: ['<%= dirs.test %>/countdownTimer.tests.html'],
                dest: '<%= dirs.test %>/countdownTimer.min.tests.html',
                replacements: [{
                    from: /src\/js\/jQuery\.(.*)\.js/g,
                    to: '<%= dirs.dest %>/js/jQuery.$1.min.js'
                }]
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit', 'eslint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', ['clean:build', 'clean:tests', 'eslint', 'jshint', 'jsonlint']);
    grunt.registerTask('dist', ['copy:dist', 'replace:dist', 'replace:datejs', 'replace:datecss']);
    grunt.registerTask('test:unit', ['jshint', 'jsonlint', 'eslint']);
    grunt.registerTask('build', ['uglify:min', 'version:dist', 'version:project', 'jsdoc', 'compress']);
    grunt.registerTask('test', ['eslint', 'jshint', 'jsonlint', 'replace:testmin', 'qunit']);

};
