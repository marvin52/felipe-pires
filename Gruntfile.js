
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
          debug: true
        },
        pretty: true
      },
      files: {
      "index.html": ["source/jade/app.jade"]
      }
    }
  },
  watch: {
    scripts: {
      files: ['source/js/**/*.js', 'source/sass/**/*.sass', 'source/jade/**/*.jade'],
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