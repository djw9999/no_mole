
const QcloudSms = require('qcloudsms_js');
const { message: config } = require('./constants').config;
const timeRange = ["1分钟前", "2分钟前"]
let first = 0;
let createTime = +new Date();

function handleTimeChange (time) {
    let firtTimeSend = timeRange.includes(time.trim()) && !first;
    let OtherTimeSend = timeRange.includes(time.trim()) && (+new Date() - createTime) > 130000 && first === 1;
    if(firtTimeSend || OtherTimeSend) {
        createTime = +new Date();
        first = 1;
        sendMessage(config).then((res) => {
            console.log('res', res[1]);
        }).catch((err) => {
            console.log('err', err);
        });
    } else {
        console.log('无事');
    }
}

function sendMessage(config) {
    return new Promise ((resolve, reject) => {
        const { appid, appkey, phoneNumbers, templateId, smsSign } = config;
        const qcloudsms = QcloudSms(appid, appkey);
        const ssender = qcloudsms.SmsMultiSender();
        ssender.sendWithParam(86, phoneNumbers, templateId, [], smsSign ,"", "", (err, res, resData) => {
            if(err) {
                reject(err);
            } else {
                resolve([res, resData])
            }
        });
    })
}

module.exports = {
    handleTimeChange
}

