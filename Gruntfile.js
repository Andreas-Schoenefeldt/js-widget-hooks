module.exports = function(grunt) {
	// Do grunt-related things in here

	'use strict';
	
	// single point of repository information
	const repository = {
		  name: "js-widget-hooks"
		, description: "A standardized way to initialize and handle clientside widgets. Helps to keep them organized and only to load them if the code should realy be executed. It provides a strong linking of the actual html code with the executed javascript without much hassle."
		, license : 'MIT'
		, authors: [
			"Andreas Schönefeldt <schoenefeldt.andreas@gmail.com>"
		]
		, repository : 'https://github.com/Andreas-Schoenefeldt/js-widget-hooks.git'
	};
    const semver = require('semver');
    const pkg = grunt.file.readJSON('package.json');
    const currentVersion = pkg.version;

    repository.version = currentVersion;
	
	// define the current versions here
	
	var gruntConf = {
		  pkg: pkg
		
		, watch: { // tracks changes of the watched files and rerunns the generation commands for development convenience
			  options: {
				livereload: true,
			}
			
			, uglify : {
				files: ['src/dev/*.js', 'test/main.js'],
				tasks: ['uglify:prd', 'webpack']
			}
		}

		, webpack: {
            options: {
            	mode: 'development'
			},
            prod: require('./webpack.config')
		}
		
		, uglify: { // minify and optimize js files
			  options : {
				  screwIE8 : true
				, banner: '/*! <%= pkg.name %> - v<%= bump.options.setVersion %> - <%= grunt.template.today("yyyy-mm-dd") %> \n *  <%= pkg.description %>\n */\n'
			}
			, prd: {
			  files: {
				// '../static/js/global-nav-1.1.1.min.js': ['../static/js/global-nav-1.1.1.js']
			  }
			}
		},

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['-a'],
                pushTo: 'origin',
                setVersion: pkg.version,
                globalReplace: true,
                // regExp: /(['|"]?version['|"]?[ ]*:[ ]*['|"]?|^framework:[\S\s]*?assets:[\s]*version:[ ]*)(\d+\.\d+\.\d+(-false\.\d+)?(-\d+)?)[\d||A-a|.|-]*(['|"]?)/gmi
            }
        },

        prompt: {
            bump: {
                options: {
                    questions: [
                        {
                            config:  'bump.options.setVersion',
                            type:    'list',
                            message: 'Bump version from ' + '<%= pkg.version %>' + ' to:',
                            choices: [
                                {
                                    value: semver.inc(currentVersion, 'patch'),
                                    name:  'Patch:  ' + semver.inc(currentVersion, 'patch') + ' Backwards-compatible bug fixes.'
                                },
                                {
                                    value: semver.inc(currentVersion, 'minor'),
                                    name:  'Minor:  ' + semver.inc(currentVersion, 'minor') + ' Add functionality in a backwards-compatible manner.'
                                },
                                {
                                    value: semver.inc(currentVersion, 'major'),
                                    name:  'Major:  ' + semver.inc(currentVersion, 'major') + ' Incompatible API changes.'
                                },
                                {
                                    value: 'custom',
                                    name:  'Custom: ?.?.? Specify version...'
                                }
                            ]
                        },
                        {
                            config:   'bump.options.setVersion',
                            type:     'input',
                            message:  'What specific version would you like',
                            when:     function (answers) {
                                return answers['bump.options.setVersion'] === 'custom';
                            },
                            validate: function (value) {
                                var valid = semver.valid(value);
                                return !!valid || 'Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details.';
                            }
                        }
                    ]
                }
            }
        },

        shell: {
            build: {
                command: [
                    'npm publish'
                ].join('&&')
            }
        }
	};
	
	gruntConf.uglify.prd.files['dist/js-widget-hooks.js'] = ['src/dev/js-widget-hooks.js'];
	
	let init = function(){
		// writing the package files
		grunt.log.writeln( 'Starting file compilation...'['yellow']);
		grunt.log.writeln(('  > Package v. ' + gruntConf.pkg.version)['green'].bold);
		grunt.log.writeln( '');

		grunt.log.writeln( '  > Rewriting Package Files...'['green'].bold);
		grunt.log.writeln(('    | package.json')['yellow'].bold);
		grunt.file.write('package.json', JSON.stringify(gruntConf.pkg, null, 2));

		grunt.log.writeln(('    | bower.json')['yellow'].bold);
		grunt.file.write('bower.json', JSON.stringify(bower, null, 2));

		// grunt.log.writeln(('    | composer.json')['yellow'].bold);
		// grunt.file.write('composer.json', JSON.stringify(composer, null, 2));
	};
	
	// bower update
	let bower = grunt.file.readJSON('bower.json');
	bower.version = repository.version;
	bower.license = repository.license;
	bower.authors = repository.authors;
	bower.description = repository.description;
	bower.repository = repository.repository
	bower.main = [];
	for (let file in gruntConf.uglify.prd.files) {
		bower.main.push(file);
	}
	
	// filling the variables
	gruntConf.pkg.version = repository.version;
	gruntConf.pkg.license = repository.license
	gruntConf.pkg.name = repository.name;
	gruntConf.pkg.description = repository.description;
	gruntConf.pkg.repository = repository.repository;
	
	// Project configuration.
	grunt.initConfig(gruntConf);
	
	// load the grunt modules
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bump');
	
	// compilation and basic watch task.
	grunt.registerTask('default', 'JS Minification', function() {
		init();
		grunt.task.run('ui', 'watch');
	});

	grunt.registerTask('ui', 'JS Minification', function () {
        grunt.task.run('uglify', 'webpack');
	});

    grunt.registerTask('build', 'Production Build', function() {
        grunt.task.run('prompt', 'ui', 'bump', 'shell:build');
    });
  
};

