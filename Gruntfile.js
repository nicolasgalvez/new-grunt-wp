module.exports = function(grunt) {
  "use strict";
// lets grab the JSON data for the sensitive data.
grunt.config.set('deploy',grunt.file.readJSON('deploy.json'));
  grunt.initConfig({
    wordpressdeploy: {
      options: {
        backup_dir: "backups/",
        rsync_args: ['--verbose', '--progress', '-rlpt', '--compress', '--omit-dir-times', '--delete', '-k'],
        exclusions: ['Gruntfile.js', '.git/', 'tmp/*', 'backups/', 'composer.json', 'composer.lock', 'README.md', '.gitignore', 'package.json', 'node_modules', 'deploy.json', '.htaccess'] //, 'wp-config.php'] // comment out wp-config on initial pull from production 
      },
      local: grunt.config.get('deploy.local'),
      staging: grunt.config.get('deploy.staging'),
      production: grunt.config.get('deploy.production')
    },
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-wordpress-deploy');

  // Register tasks
  grunt.registerTask('default', [
    'wordpressdeploy'
  ]);
};