let Cookie = {
    getItem(key) {      
     let arr = document.cookie.split('; ');
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i].split('=');
            if (temp[0] == key) {
                return temp[1];
            }
        }
    },
    setItem(key, value, day) {
        if (day) {
            let date = new Date();  
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + value + ';expires=' + date;

        } else {
            document.cookie = key + '=' + value;
        }
    },
    removeItem(key) {
        this.setItem(key, '', -100);
    },
    clear() {
        let arr = document.cookie.split('; ');
        let keys = [];
        for (let i = 0; i < arr.length; i++) {
            let arrTemp = arr[i].split("=");
            keys.push(arrTemp[0]);
        }
        keys.forEach(ele => {
            this.setItem(ele, "", -100)
        })


    }

}