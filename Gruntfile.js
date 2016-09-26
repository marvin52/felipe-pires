
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/js/main.js': 'src/js/main.js'
        }
      }
    },
  sass: {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/css/style.css': 'src/sass/style.sass'
      }
    }
  },
  jade: {
    compile: {
      options: {
        data: {
          debug: false
        }
      },
      files: [ {
              cwd: "source/jade",
              src: "**/*.jade",
              dest: "dist/html",
              expand: true,
              ext: ".html"
            } ]
    }
  },
  watch: {
    scripts: {
      files: ['src/js/**/*.js', 'src/sass/**/*.sass', 'src/jade/**/*.jade'],
      tasks: ['build'],
      options: {
        interrupt: true,
      },
    },
  },
    cssmin: {
      options: {
        shorthandCompacting: true,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt)



  grunt.registerTask('build', ['browserify', 'sass', 'cssmin', 'jade']);

};