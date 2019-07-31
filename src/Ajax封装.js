let $ = {
    get(options) {
        this.ajax('get', options)
    },
    post(options) {
        this.ajax('post', options)
    },

    ajax(type, options) {
        let {
            url,
            data,
            successCallBack,
            errorCallBack,
            time
        } = options;
        time = time || 10000;
        let xhr = new XMLHttpRequest();
        let queryStr = this.objToString(data);
        //区分是什么请求
        if (type == 'get') {
            url += queryStr.length == 0 ? 's=' + Math.random() : '?' + queryStr;
            //如果有中文，转码
            url = encodeURI(url);
            xhr.open('get', url, true);
            xhr.send();
        } else if (type == 'post') {
            xhr.open('post', url, true);
            //添加头文件
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(queryStr);
        }


        //长时间请求不到数据，取消请求，提示网络繁忙
        let timer = setTimeout(() => {
            xhr.abort(); //取消网络请求
            alert('网络繁忙，请检查您的网络!')
        }, time);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                clearTimeout(timer);
                xhr.status == 200 ? successCallBack(xhr) : errorCallBack(xhr);
            }
        }
    },
    //对象转字符串
    objToString(data) {
        let arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }
        return arr.join("&")
    }
}
