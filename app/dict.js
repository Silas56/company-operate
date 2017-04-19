/**
 * Created by dengrunquan on 16/4/25.
 */

/**
 * 得到用户状态
 * @param userStatus
 * @returns {*}
 */
function getUserStatusName(userStatus){
    if(userStatus){
        if(userStatus == 1){
            return "激活";
        }else if(userStatus == 2){
            return "冻结";
        }
    }
    return "没定义";
}

/**
 * 退款状态
 * @param refundStatus
 */
function getrefundStatusName(refundStatus){
//（0：未知；1：交易成功仲裁退款中；2：交易成功仲裁退款拒绝；3：交易成功仲裁取消；4：交易成功退款成功）',
    if(refundStatus){
        if(refundStatus==0){
            return "未知";
        }else if(refundStatus==1){
            return "交易成功仲裁退款中";
        }else if(refundStatus==2){
            return "交易成功仲裁退款拒绝";
        }else if(refundStatus==3){
            return "交易成功仲裁取消";
        }else if(refundStatus==4){
            return "交易成功退款成功";
        }
    }
    return "没定义"
}