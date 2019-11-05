const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify-es');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// const uglifyes = require('gulp-uglify-es');
// const composer = require('gulp-uglify/composer');
// const uglify = composer(uglifyes, console);

const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const autoprefixer = require('gulp-autoprefixer');

/*
    --TOP LEVEL FUNCTIONS--
    gulp.task - Define task
    gulp.src - Point to files to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folders for changes
*/

//logs message
gulp.task('message', function () {
    return console.log('gulp is runing...');
});


//Copy All HTML fils
gulp.task("copyHtml", async () => {
    await new Promise((resolve, reject) => {
        gulp.src("src/*.html")
            .pipe(gulp.dest('dist'))
            .on("end", resolve);
    });
});

//Optimize images
gulp.task("imageMin", async () => {
    await new Promise((resolve, reject) => {
        gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
            .on("end", resolve);
    });
});

//Minify js
gulp.task("minify", async () => {
    await new Promise((resolve, reject) => {
        gulp.src('src/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .on("end", resolve);
    });
});

//Compile Sass
gulp.task("sass", async () => {
    await new Promise((resolve, reject) => {
        gulp.src('src/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/css'))
            .on("end", resolve);
    });
});



// gulp.task("vendor", async () => {
//     await new Promise((resolve, reject) => {
//         gulp.src('dist/css/style.css')
//             .pipe(autoprefixer({
//                 cascade: false
//             }))
//             .pipe(gulp.dest('dist/css/vendor'))
//             .on("end", resolve);
//     });
// });


// gulp.task('scripts', function () {
//     return gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
// });
// Scripts
// gulp.task("scripts", async () => {
//     await new Promise((resolve, reject) => {
//         gulp.src("src/js/*.js")
//             .pipe(concat('main.js'))
//             .pipe(uglify())
//             .pipe(gulp.dest('dist/js'))
//             .on("end", resolve);
//     });
// });



// gulp.task('script', () => {
//     return gulp.src('src/**/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('src/dist'))
// });

gulp.task("scripts", async () => {
    await new Promise((resolve, reject) => {
        gulp.src("src/js/*.js")
            .pipe(concat('main.js'))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .on("end", resolve);
    });
});

// Scripts
// gulp.task("scripts", async () => {
//     await new Promise((resolve, reject) => {
//         gulp.src("src/js/*.js")
//             .pipe(concat('main.js'))
//             .pipe(uglify())
//             .pipe(gulp.dest('dist/js'))
//             .on("end", resolve);
//     });
// });

//Gulp watch al CSS / html process function
gulp.task('watch', () => {
    gulp.watch(
        ['src/sass/*.scss', 'src/*.html'],
        gulp.series(['sass', 'copyHtml'])
    );
});

//Gulp watch al JS process function
gulp.task('watchJs', () => {
    gulp.watch(
        ['src/js/*.js', 'src/*.html'],
        gulp.series(['scripts', 'copyHtml'])
    );
});
// //Gulp watch all process function  originalsetup
gulp.task('watchAll', () => {
    gulp.watch(
        ['src/js/*.js', 'src/images/*', 'src/sass/*.scss', 'src/*.html'],
        gulp.series(['scripts', 'imageMin', 'sass', 'copyHtml'])
    );
});