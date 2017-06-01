/**
 * Created by zhengqj on 2017/5/31.
 */
const defaultOption = {
    headers: {
        isFetch: 1
    }
}

export default {
    baseUrl: '/api/',
    fetchData(url, options = defaultOption){
        return new Promise((resolve, reject) => {
            fetch(url, options).then(res => res.json())
                .then(data => resolve(data)).catch(err => reject(err))
        })
    },
    async getOutProvMap(day){
        let datas = await this.fetchData(this.baseUrl + 'getOutProvMap/' + day);
        return datas;
    },
}