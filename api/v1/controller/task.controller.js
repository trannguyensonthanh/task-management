const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");
// [get] /api/v1/task
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  // pagination
  let initPagination = {
    limitItems: 0,
    currentPage: 0,
  }
  const countTasks = await Task.countDocuments(find); // sử dụng countDoc.. để đếm só lượng những sản phẩm được phép hiển thị
  let objectPagination = paginationHelper(
    initPagination,
    req,
    countTasks
  );

  // sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  //end sort

  const objectSearch = searchHelper(req);
 // đoạn tìm kiếm
 if (objectSearch.title) {
  find.title = objectSearch.title;
}

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.json(tasks);
};

// [get] /api/v1/task/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json("khong tim thay");
  }
};

// [get] /api/v1/task/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
  const id = req.params.id;
  const status = req.body.status
  
await Task.updateOne({
  _id: id
}, {
  status: status
});
  
 res.json({
  code: 200,
  message: "cập nhật trạng thái thành công!"
 })
  } catch (error){
res.json({
  code:400,
  message: "không tồn tại"
})
  }

 
};
