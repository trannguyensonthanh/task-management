module.exports =  (objectPagination, req, countRecords) => {
    if (req.query.page ){
        objectPagination.currentPage = parseInt(req.query.page);
      }
    if (req.query.limit ){
        objectPagination.limitItems = parseInt(req.query.limit);
      }

      objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    
      const totalPage = Math.ceil(countRecords/objectPagination.limitItems)
      objectPagination.totalPage = totalPage;
      return objectPagination
} 