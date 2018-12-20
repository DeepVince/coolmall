import axios from 'axios'

export default {
  getData(url, params) {
    let resultUrl = url + "?"
    for (let i = 0, len = params.length; i < len; i++) {
      if (i > 0) {
        resultUrl += "&"
      }
      resultUrl += params[i].key + "=" + params[i].value
    }
    console.log(resultUrl)
    axios.get(resultUrl)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  postData() {
    let params = new URLSearchParams();
    params.append('name', '小米mix2s')
    params.append('price', '3655')
    params.append('brand_id', '2')
    params.append('rough_weight', '233')
    params.append('made_origin', '中国大陆')
    params.append('shelf_time', '2018-9')
    params.append('down_time', '')
    params.append('sales_status', 'in_the_sales')
    params.append('product_id', '97800403189497856')
    params.append('inventory', '60')
    axios.post('http:// :8080/TTMall/goods', params)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {

      })
  },
  deleteData() {
    let condition = {
      key: "nick_name",
      value: "kkkk"
    }

    axios.delete('http://localhost:8080/TTMall/users?' + condition.key + '=' + condition.value)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  putData() {
    let params = {id: "qqq", nick_name: "OOOOllll"}
    axios.put('http://localhost:8080/TTMall/users', {params: "id=qqq", data: params})
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  dateFormat(date) {
    /**
     * date
     */
    const year = date.getFullYear()
    const month = date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()

    /**
     * time
     */
    const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
    const minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
    const second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  }
}
