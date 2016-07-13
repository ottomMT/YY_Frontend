Meteor.startup(function () {
    setInterval(function () {
        Meteor.call("getServerTime", function (error, result) {
            Session.set("time", result);
        });
    }, 1000);
});
// Meteor.startup(function () {
//   AutoForm.setDefaultTemplate("semanticUI");
//   SimpleSchema.messages({
//     required: "必需填写 「[label]」",
//     minString: "[label] 需要至少 [min] 个文字",
//     maxString: "[label] 不能超过 [max] 个文字",
//     minNumber: "[label] 不能低于 [min]",
//     maxNumber: "[label] 不能大于 [max]",
//     minDate: "[label] 不能早于 [min]",
//     maxDate: "[label] 不能晚于 [max]",
//     badDate: "[label] 您设置的不是一个有效日期",
//     minCount: "您必需指定最少 [minCount] 个值",
//     maxCount: "您不能指定多于 [maxCount] 个值",
//     noDecimal: "[label] 必需为整数",
//     notAllowed: "[value] 该值不被允许",
//     expectedString: "[label] 必需是 string",
//     expectedNumber: "[label] 必需是 number",
//     expectedBoolean: "[label] 必需是 boolean",
//     expectedArray: "[label] 必需是 数组",
//     expectedObject: "[label] 必需是 对象",
//     expectedConstructor: "[label] 必需是 [type]",
//     regEx: [
//       {msg: "[label] 未通过正则表达式验证"},
//       {exp: SimpleSchema.RegEx.Email, msg: "[label] 必需是一个正确的 e-mail 地址"},
//       {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] 必需是一个完整的 e-mail 地址"},
//       {exp: SimpleSchema.RegEx.Domain, msg: "[label] 必需是一个正确的域名"},
//       {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] 必需是一个完整的域名"},
//       {exp: SimpleSchema.RegEx.IP, msg: "[label] 必需是一个正确的 IPv4 或 IPv6 地址"},
//       {exp: SimpleSchema.RegEx.IPv4, msg: "[label] 必需是一个正确的 IPv4 地址"},
//       {exp: SimpleSchema.RegEx.IPv6, msg: "必需是一个正确的 IPv6 地址"},
//       {exp: SimpleSchema.RegEx.Url, msg: "[label] 必需是一段正确的 URL"},
//       {exp: SimpleSchema.RegEx.Id, msg: "[label] 必需是一组正确的 alphanumeric ID"}
//     ],
//     keyNotInSchema: "[key] 不被 schema 允许"
//   });
// });


