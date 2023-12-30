//[POST] /api/v1/users/register
const md5 = require("md5");
const User = require("../models/user.model")
const ForgotPassword = require("../models/forgot-password.model")
const generateHelper = require("../../../helpers/generate")
const sendMailHelper = require("../../../helpers/sendMail")
// [post] /api/v1/users/register
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password);
 
const existEmail = await User.findOne({
  email: req.body.email,
  deleted: false
});

if(existEmail){
  res.json({
    code: 400,
    message: "Email đã tồn tại"
  });
}
else {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    token: generateHelper.generateRandomString(20)
  })
await user.save();
const token = user.token;
res.cookie("token", token);

res.json({
  code: 200,
  message: "Tạo tài khoản thành công!",
  token: token
}); 
}


}

// [post] /api/v1/users/login
module.exports.login = async (req, res) => {
const email = req.body.email;
const password = req.body.password;

const user = await User.findOne({
  email: req.body.email,
  deleted: false
});

if(!user){
  res.json({
    code: 400,
    message: "Email không tồn tại!",
  }); 
  return;
}
 

if(md5(req.body.password) !== user.password){
res.json({
  code: 400,
  message: "Sai mật khẩu!"
});
return;
}


const token = user.token;
res.cookie("token", token);

res.json({
  code: 200,
  message: "Đăng nhập thành công!",
  token: token
});
 

}

// [post] /api/v1/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false
    
  })

  if (!user) {
    res.json({
      code: 400,
      message: "Email Không tồn tại!"
    });
    return;
  }

const otp = generateHelper.generateRandomNumber(8)
const timeExpire = 5;

const objectForgotPassword = {
  email: email,
  otp: otp,
  expireAt: Date.now() + timeExpire*(1000*60)
}

const forgotPassword = new ForgotPassword(objectForgotPassword);
await forgotPassword.save();

// gửi email
const subject = `Mã OTP ĐỂ XÁC MINH LẤY LẠI MẬT KHẨU`
const html = `Mã OTP ĐỂ XÁC MINH LẤY LẠI MẬT KHẨU LÀ <b>${otp}</b>. Thời hạn sử dụng: ${timeExpire} phút . Lưu ý không được để lộ OTP `;
sendMailHelper.sendMail(email, subject, html );
// end gửi email

  res.json({
    code: 200,
    message: "Đã gửi mã otp qua email!"
  });
}
// [post] /api/v1/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  });

  if(!result){
    res.json({
      code: 400,
      message: "Mã OTP không hợp lệ"
    })
    return;
  }

  const user = await User.findOne({
    email: email
  });

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Xác thực thành công",
    token: token
  })
}
// [post] /api/v1/password/reset
module.exports.resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;

 const user = await User.findOne({
  token: token,
 });

 if (md5(password) === user.password){
  res.json({
    code: 400,
    message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ"
  });
  return;
 }

 await User.updateOne({
  token: token,
 },{
  password: md5(password),
 })

  res.json({
    code: 200,
    message: "đổi mật khẩu thành công"
  });
}

// [Get] /api/v1/password/detail
module.exports.detail = async (req, res) => {

  res.json({
    code: 200,
    message: "Thanh cong",
    info: req.user
  })
}

