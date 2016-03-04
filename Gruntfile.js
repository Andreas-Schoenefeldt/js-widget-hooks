module.exports = function(grunt) {
	// Do grunt-related things in here

	'use strict';
	
	// single point of repository information
	var repository = {
		  name: "js-widget-hooks"
		, description: "A standardized way to initialize and handle clientside widgets. Helps to keep them organized and only to load them if the code should realy be executed. It provides a strong linking of the actual html code with the executed javascript without much hassle."
		, version: "1.0.4" // The current Version
		, license : 'MIT'
		, authors: [
			"Andreas Schönefeldt <schoenefeldt.andreas@gmail.com>"
		]
		, repository : 'https://github.com/Andreas-Schoenefeldt/js-widget-hooks.git'
	}
	
	// define the current versions here
	
	var gruntConf = {
		  pkg: grunt.file.readJSON('package.json')
		
		, bowercopy: {
            options: {
                srcPrefix: 'bower_components',
                destPrefix: 'src'
            },
            all: {
                files: {
                      'jquery.js': 'jquery/dist/jquery.min.js'
                }
            }
		  }
		
		, watch: { // tracks changes of the watched files and rerunns the generation commands for development convenience
			  options: {
				livereload: true,
			}
			
			, uglify : {
				files: ['src/dev/*.js'],
				tasks: ['uglify:prd']
			}
		}
		
		, uglify: { // minify and optimize js files
			  options : {
				  screwIE8 : true
				, banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n *  <%= pkg.description %>\n */\n'
			}
			, prd: {
			  files: {
				// '../static/js/global-nav-1.1.1.min.js': ['../static/js/global-nav-1.1.1.js']
			  }
			}
		}
	}
	
	gruntConf.uglify.prd.files['dist/widget-hooks.js'] = ['src/dev/widget-hooks.js'];
	
	var init = function(){
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
	}
	
	// bower update
	var bower = grunt.file.readJSON('bower.json');
	bower.version = repository.version;
	bower.license = repository.license;
	bower.authors = repository.authors;
	bower.description = repository.description;
	bower.repository = repository.repository
	bower.main = [];
	for (var file in gruntConf.uglify.prd.files) {
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
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// compilation and basic watch task.
	grunt.registerTask('default', 'JS Minification', function() {
		init();
		grunt.task.run('bowercopy', 'uglify', 'watch');
	});
  
};

