/**
 * Task that creates two custom jQuery builds based on the
 * modules that need to be excluded (as defined in config.json)
 * 
 * @author   Boye Oomens <boye@e-sites.nl>
 * @see      http://projects.jga.me/jquery-builder/
 * @version  0.1.0
 */

var shell = require('gulp-shell');

gulp.task('buildjquery', function () {
	var curl = [
			'https://raw.githubusercontent.com/jgallen23/jquery-builder/',
			'0.7.0',
			'/dist/'
		],
		jqs = conf.jquery,
		path = conf.path.js + '/vendor/jquery',
		fileName = 'jquery-%version%.min.js',
		commands = [];	

	jqs.forEach(function (el) {
		url = curl.slice(0);
		url.push(el.version);
		url.push('/jquery-' + el.exclude.sort().join('-') + '.min.js');

		commands.push('curl ' + url.join('') + ' > ' + path + '/' + fileName.replace('%version%', el.version));
	});

	return gulp.src('./', {read: false}).pipe(shell(commands));
});