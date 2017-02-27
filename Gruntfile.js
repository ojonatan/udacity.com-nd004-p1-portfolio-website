module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			content: {
				options:{
					livereload: true
				},
				files:[
					'public/**',
					'public/img/**',
					'public/css/**',
					'public/js/**',
					'server/**'
				],
				tasks:[]
			},
			less: {
				options:{
					livereload: true
				},
				files:[
					'less/**'
				],
				tasks:['less']
			}
		},
		express: {
			all:{
				options:{
					server: 'server.js',
					hostname: 'localhost',
					bases: ['./public'],
					livereload: true
				}
			}
		},
		bowerInstall: {
			target: {

				// Point to the files that should be updated when
				// you run `grunt bower-install`
				src: [
					'public/*.html'
				],

				// Optional:
				// ---------
				cwd: '',
				dependencies: true,
				devDependencies: false,
				exclude: [],
				fileTypes: {},
				ignorePath: '',
				overrides: {}
			}
		},
		responsive_images: {
			dev: {
				options: {
					engine: 'im',
					sizes: [
						{
							name: 'small',
							width: 320,
							height: 240
						},
						{
							name: 'small_2x',
							width: 640,
							height: 480
						},
						{
							name: 'medium',
							width: 768
						},
						{
							name: 'medium_2x',
							width: 1560
						},
						{
							name: "large",
							width: 1024,
							separator: "-",
							quality: 60
						},
						{
							name: "large",
							width: 2048,
							separator: "-",
							suffix: "_x2",
							quality: 60
						}
					]
				},

				/*
				You don't need to change this part if you don't change
				the directory structure.
				*/
				files: [{
					expand: true,
					src: ['*.{gif,jpg,png}'],
					cwd: 'images_src/',
					dest: 'public/img/'
				}]
			}
		},

		/* Clear out the images directory if it exists */
		clean: {
			dev: {
				src: ['public/img'],
			}
		},

		shell: {
			file_optimizer: {
				command: '"C:/Program Files/FileOptimizer/FileOptimizer64.exe" public\\img'
			}
		},

		mkdir: {
			dev: {
				options: {
					create: ['public/img']
				},
			},
		},
		less: {
			production: {
				options: {
					sourceMap: false,

					paths: ['public/css'],
					plugins: [
						new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
						new (require('less-plugin-clean-css'))({})
					],
					modifyVars: {
						imgPath: '"//localhost:3000/img"',
						bgColor: 'red'
					}
				},
				files: {
					'public/css/bootstrap.css': 'less/bootstrap.custom.less',
					'public/css/main.css': 'less/main.less'
				}
			}
		}
	});
	grunt.registerTask('server',['express','watch']);
	grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'shell']);

};
