## gulp-imgname

修改文件内的img名

## 安装

```bash
    yarn add gulp-imgname --dev
```


## 用法

```javascript
    const gulp = require('gulp');
    const imgname=require('gulp-imgname');
    gulp.task('default',function(){
        gulp.src('./src/**/*.+(html|css|scss)',ignore:"/\.png/i")
        .pipe(imgname({prev:"max-"}))
        .pipe(gulp.dest('./dist'))
    })
```

## options

* `prev`:string
前缀

* `next`:string
后缀

* `format`:string
格式
* `ignore`:reg
忽略