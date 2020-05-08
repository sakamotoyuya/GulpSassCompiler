# README.md
本プロジェクトはタスクランナーgulpにより
以下のタスクを自動化するものになります。
- sassの自動コンパイル
- autoprefixerによるベンダープレフィックスの自動化
- serverの起動
- serverの自動リロード
## require
node.js
gulp

## 実行方法
```
npm install
gulp
```
## 備忘録
以下のサイトを参考に本プロジェクトを作成。
- [参考サイト１](https://qiita.com/nabe_kurage/items/b3f154a09962f692df14)
- [参考サイト2](https://www.npmjs.com/package/gulp-autoprefixer)
- [参考サイト3](https://webdesign-trends.net/entry/10069)
- [参考サイト4](https://3owebcreate.com/web/coding/webpack_autoprefixer_setting)
- [参考サイト5](https://satoyan419.com/gulp-v4/)
- [参考サイト6](https://codecodeweb.com/blog/459/)
- [参考サイト7](https://www.tweeeety.blog/entry/2018/06/18/060030)

必要なプラグインのインストール
コマンドライン
```
npm init
npm install gulp --save-dev
npm install gulp-sass --save-dev
npm install browser-sync --save-dev
npm install gulp-plumber --save-dev
npm install --save-dev gulp-autoprefixer
```

- glupfile.js
```js
var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");

gulp.task("server", function(db) {
  browser({
    server: {
      baseDir: "./"
    }
  });
  db();
});

gulp.task("sass",function(db){//タスクの登録("sass"タスクを登録する)
  gulp.src("sass/**/*.scss")//gulp.src()...読み込むファイルを設定する
  .pipe(plumber())
  .pipe(sass({outputStyle:'expanded'}))//pipe()...srcで取得したファイルに行う処理を記載する。
                                      //sass()...コンパイルの実行をする。outputStyleで吐き出すcssのスタイルを設定する。
  .pipe(autoprefixer({
    cascade:false
  }))
  .pipe(gulp.dest("./css"))//gulp.dest()...出力したい場所を記載する。
  db();
});

gulp.task("reload",function(db){
  browser.reload();
  db();
})

gulp.task("watch",function(db){
  gulp.watch("sass/**/*.scss",gulp.parallel(["sass","reload"]));
  gulp.watch("./**/*.html",gulp.series(["reload"]));
  //watch(['監視するファイル'],['実行したいタスク名'])
  //タスク名をdefaultにするとコマンドにタスク名を入れる必要がなくなり便利です。
  db();
});

gulp.task('default',gulp.series(gulp.parallel(['sass','watch','server'])));

```
package.jsonの修正
```json
{
  "name": "gulptest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.26.7",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-plumber": "^1.2.1",
    "gulp-sass": "^4.1.0"
  },
  //★ここにautoprefixerの設定を追加
  "browserslist": [
    "last 2 version",
    "> 5%",
    "ie >= 9"
  ]
}

```
