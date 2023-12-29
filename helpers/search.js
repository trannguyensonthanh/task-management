module.exports = (req) => {
 const obj = {
    keyword: "",
 }
       if (req.query.keyword) {
       obj.keyword = req.query.keyword;
        const regex = new RegExp(obj.keyword, "i")
      obj.title = regex;  
       }
      return obj
} 