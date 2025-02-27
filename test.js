import test from 'ava';
import vinylFile from 'vinyl-file';
import hooker from 'hooker';
import gutil from 'gulp-util';
import ava from '.';

test.cb('main', t => {
	const stream = ava();

	hooker.hook(process.stdout, 'write', (...args) => {
		if (/2.*passed/.test(args.join(' '))) {
			hooker.unhook(gutil, 'log');
			t.pass();
			t.end();
		}
	});

	stream.on('error', error => {
		t.ifError(error);
		t.end();
	});

	stream.write(vinylFile.readSync('fixture.js'));
	stream.write(vinylFile.readSync('fixture2.js'));
	stream.end();
});
