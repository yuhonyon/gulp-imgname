const through = require('through2');
const gutil = require('gulp-util');
const path = require('path');
const PluginError = gutil.PluginError;
const ASSET_REG = {
    "IMAGE": /(<img[^>]+src=)['"]([^'"]+)["']/ig,
    "BACKGROUND": /(url\()(?!data:|about:)([^)]*)/ig
};

function gulpImgName(options) {

    let config = {
        prev: 'aaa',
        next: "bbb",
        format: "ccc",
    };
    if (typeof options == "object") {
        for (let i in options) {
            config[i] = options[i];
        }
    }



    let stream = through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {
            let content = file.contents.toString();
            let filePath = path.dirname(file.path);

            for (let type in ASSET_REG) {
                if (type === "BACKGROUND" && !/\.(css|scss|less)$/.test(file.path)) {

                } else {
                    content = content.replace(ASSET_REG[type], function(str, tag, src) {


                        if (!/\.[^\.]+$/.test(src)) {
                            return str;
                        }

                        if (/^https?:\/\//.test(src)) {
                            return str;
                        }

                        if (config.next) {
                            src = src.replace(/\.((png)|(jpg)|(gif)|(jpeg))/, config.next + ".$1");
                        }

                        if (config.format) {
                            src = src.replace(/\.((png)|(jpg)|(gif)|(jpeg))/i,"."+config.format);
                        }

                        if (config.prev) {
                            if(/\//.test(src)){
                                src = src.replace(/\/(?=([^\/]*)$)/, "/" + config.prev);
                            }
                            else{
                                src=config.prev+src;
                            }
                            
                        }

                        return tag + '"' + src + '"';
                    });
                }
            }





            file.contents = new Buffer(content);


        }

        this.push(file);
        cb();
    });

    return stream;
};


module.exports = gulpImgName;
