/*
  Ce fichier grunt nous permettra de n'importer qu'un nombre réduit et invariable de scripts dans index.html
  quel que soit le nombre de fichiers que nous auront. Il suffira simplement de bien les placer dans les dossiers
  et de lancer la tâche grunt à chaque modification en tapant "grunt" ou "grunt concat:dist"
*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n', // permet d'ajouter un saut de ligne entre chaque fichier concaténé.
      },
      dist: {
        files : {
          './js/controllers.js' : './js/controllers/*.js', 
          './js/factories.js' : './js/factories/*.js',
        },
      }
    }
  });

  grunt.file.setBase('../')
  grunt.loadNpmTasks('grunt-contrib-concat'); // Chargement du module concat où tous les codes de la tâche concat sont présents
  grunt.registerTask('default', 'concat:dist'); // Alias de la tâche en default, on pourra la lancer en tapant "grunt" tout court dans le terminal 
}