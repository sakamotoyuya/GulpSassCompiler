var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");

gulp.task("server", function(db) {
  browser({
    server: {
      baseDir: "./"//ドキュメントディレクトリを指定する。
    }
  });
  db();
});

gulp.task("sass",function(db){//タスクの登録（"sass"タスク登録)
  gulp.src("sass/**/*.scss")//gulp.src()...読み込むファイルの設定
  .pipe(plumber())//plumber()...エラーが起きたとしても強制終了させない
  .pipe(sass({outputStyle:'expanded'}))
  //pipe()...srcで取得したファイルに行う処理を記載
  //sass()...コンパイルの実行をする。outputStyleで吐き出すcssのスタイルを設定
  .pipe(autoprefixer({//autoprefixer()...ベンダープレフィックスの付与
    cascade:false
  }))
  .pipe(gulp.dest("./css"))//gulp.dest()...出力したい場所を記載
  db();
});

gulp.task("reload",function(db){
  browser.reload();//ブラウザーのリロード
  db();
})

gulp.task("watch",function(db){
  //watch(['監視するファイル'],['実行したいタスク名'])
  //タスク名をdefaultにするとコマンドにタスク名を入れる必要がなくなる。

  //scssファイルに更新があったらsassタスク、reloadタスクを実行する
  gulp.watch("sass/**/*.scss",gulp.parallel(["sass","reload"]));
  //htmlファイルに更新があったらreloadタスクを実行する
  gulp.watch("./**/*.html",gulp.series(["reload"]));
  db();
});

//sassタスクwatchタスク、serverタスクを実行する。
gulp.task('default',gulp.series(gulp.parallel(['sass','watch','server'])));
