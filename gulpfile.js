
var elixir = require('laravel-elixir');
var fs = require('fs');

var jsxTransform = require('./jsxTransform.js');


var gulp = require('gulp');


var $ = elixir.Plugins;
var config = elixir.config;

config.assetsPath = 'src';


elixir.extend('js', function(scripts, output, baseDir) {
    var paths = prepGulpPaths(scripts, baseDir, output);
    new elixir.Task('js', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

var gulpTask = function(paths, babel) {
    //this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.concat(paths.output.name))
        .pipe($.if(babel, $.babel(babel)))
        .on('error', function(e) {
            new elixir.Notification().error(e, 'Babel Compilation Failed!');
            this.emit('end');
        })
        .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
       // .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(jsxTransform())
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new elixir.Notification('Scripts Merged!'))
    );
};

var prepGulpPaths = function(src, baseDir, output) {
    return new elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'all.js');
};


elixir(function(mix) {
   // mix.js(['./src/index.js'], './publish/all.js');
});


 
elixir(function (mix) {
	
	//ext-require.js
    mix.scripts([
        'ext/src/Ext.js',
        'ext/src/lang/Object.js',
        'ext/src/lang/Array.js',
        'ext/src/lang/Function.js',
        'ext/src/class/Base.js',
        'ext/src/class/Class.js',
        'ext/src/class/ClassManager.js',
        'ext/src/class/Loader.js',
    ], 'publish/ext-require.js');
    
    
    mix.scripts([
        '../../node_modules/bon-template/src/bon.js',
        'core/Event.js',
        'core/RoleMap.js',
        'core/Observable.js',
        'core/Component.js',
        'core/Component2.js',
        'core/DomHelper.js',
        'core/Template.js',
        'core/XTemplate.js',
        'core/vdt.js',
        'core/DataView.js',
        'core/DataViewVdt.js',
        'core/Page.js'
    ], 'publish/core.js');
    
	
	mix.js(['business/module/Dog.js'], './publish/all.js');
    
});
