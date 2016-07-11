var signupBeforeInsertHook = {
    before: {
        insert: function (doc) {
            // 判断用户是否已报名
            // var isSigned = Signups.find({mamaId: doc.mamaId,mamapaId: doc.mamapaId}).count();
            // if(isSigned){
            //     alert('您已报名!');
            //     return;
            // }
            console.log(doc);
            // 获取当前妈妈 pa 各项信息
            var tMamaPas = MamaPas.find({_id: doc.mamapaId}).fetch();

            // 检查报名是否已满
            if(tMamaPas[0].numLimit <=  Signups.find({mamapaId: doc.mamapaId}).count()){
                alert("报名已满!");
                return;
            }

            // 获取用户报名时间
            doc.signedAt = new Date();

            // 检测用户是否填写完整
            if(tMamaPas[0].signupFields.mamaName) {
                if (!(tMamaPas[0].signupFields.mamaName == !!doc.mamaName)) {
                    alert("请填写姓名");
                    console.log("请填写姓名");
                    $("#signup").attr("disabled",false);
                    // AutoForm.resetForm('#afInsertSignups');
                    return;

                }
            }
            if( tMamaPas[0].signupFields.mamaTel){
                if(!(tMamaPas[0].signupFields.mamaTel == !!doc.mamaTel)){
                    alert("请填写联系电话");
                    console.log("请填写联系电话");
                    $("#signup").attr("disabled",false);
                    return;
                }
            }
            if( tMamaPas[0].signupFields.mamaAddress){
                if(!(tMamaPas[0].signupFields.mamaAddress == !!doc.mamaAddress)){
                    alert("请填写家庭住址");
                    console.log("请填写家庭住址");
                    $("#signup").attr("disabled",false);
                    return;
                }
            }
            if( tMamaPas[0].signupFields.babyName){
                if(!(tMamaPas[0].signupFields.babyName == !!doc.babyName)){
                    alert("请填写宝宝姓名");
                    console.log("请填写宝宝姓名");
                    $("#signup").attr("disabled",false);
                    return;
                }
            }
            if( tMamaPas[0].signupFields.babyBirthday){
                if(!(tMamaPas[0].signupFields.babyBirthday == !!doc.babyBirthday)){
                    alert("请填写宝宝生日");
                    console.log("请填写宝宝生日");
                    $("#signup").attr("disabled",false);
                    return;
                }
            }
            if( tMamaPas[0].signupFields.pregnantWeek){
                if(!(tMamaPas[0].signupFields.pregnantWeek == !!doc.pregnantWeek)){
                    alert("请填写怀孕几周");
                    console.log("请填写怀孕几周");
                    $("#signup").attr("disabled",false);
                    return;
                }
            }
            if( tMamaPas[0].signupFields.weixinGroup){
                if(!(tMamaPas[0].signupFields.weixinGroup == !!doc.weixinGroup)){
                    alert("请填写怀孕几周");
                    console.log("请填写怀孕几周");
                    $("#signup").attr("disabled",false);
                    return;
                }
            }
            // return;
            // 判断用户是否已报名
            // var isSigned = Signups.find({mamaId: doc.mamaId,mamapaId: doc.mamapaId}).count();
            // if(isSigned){
            //     alert('您已报名!');
            // }else{
            //     return doc;
            // }
            return doc;
        }
    },
    after: {
        insert: function (error, result) {
            // Meteor.call('postInsert', post, function(error, result) {
            //     // 显示错误信息并退出
            //     if (error)
            //         return alert(error.reason);
            //     console.log(result);
            //     // Router.go('postPage', {_id: result._id});
            // });
            if (error) {
                console.log(error);
            }else{
                console.log(result);
                $('#mmp_details_fxtip').show();
            }
        }
    }
};
AutoForm.addHooks('afInsertSignups', signupBeforeInsertHook);
