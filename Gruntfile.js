module.exports = function(grunt) {
	// Do grunt-related things in here

	'use strict';
	
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
	
	// Project configuration.
	grunt.initConfig(gruntConf);
	
	// load the grunt modules
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// compilation and basic watch task.
	grunt.registerTask('default', 'JS Minification', function() {
		grunt.task.run('bowercopy', 'uglify', 'watch');
	});
  
};