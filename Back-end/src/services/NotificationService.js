const fs = require('fs');
const EmailService = require('./EmailService');
const userModel = require("../../src/model/user.model");



/**
 * Generate config | EDITABLE
 * 
 * @param {*} type 
 * @returns 
 */
const generateConfig = async (type, param) => {
    let files = {};
    let target_user = [];
    let recipients = {email:[]};
    let title = "";
    console.log(type);
    //edit if have different type of notification
    if(type == 'requestApproval') {
        title = "Permintaan Persetujuan Part.";
        // target_user = await userModel.getByRoleId(3); 
        target_user = [{email: 'farhannn1702@gmail.com'}]
        files.email = "bodyEmailNotifRequestApproval.html";
        // {email: 'adnanwafeeq1@gmail.com'}
    } else {
        console.log('Notification type not found!')
        throw Error('Notification type not found!');
    }
    console.log(target_user)
    for (let i = 0; i < target_user.length; i++){

        recipients.email.push(target_user[i].email);
    }
    return { recipients, files, title }
}




/**
 * Funtion fill parameters for body text
 * 
 * @param {*} template 
 * @param {*} param 
 * @returns String
 */
const fillParameters = (template, param) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => param[key] || match);
}


/**
 * SEND NOTIFICATION FUNCTION | DO NOT EDIT |
 * @param type String
 * @param param Object
 * @param sendWhatsapp Boolean | optional
 * @param sendEmail Boolean | optional
 * @param recipients Array<String> | optional
 * @param files Object | optional
 * @param String | optional
 * 
 * return Boolean
 */
sendNotification = async (type, param, configParam={})  => {
    //check param
    const sendEmail = configParam.sendEmail? configParam.sendEmail : true
    let recipients = configParam.recipients? configParam.recipients : []
    let files = configParam.files? configParam.files : {}
    let title = configParam.title? configParam.title : ""

    //declare folder path
    const emailFolderPath = './src/views/email/';
    
    //declare body email
    let bodyEmail = "";
    //config variable
    let config = {};

    //fill recipient using defaulr setting if null
    if(param && recipients && files && title){
        config = {
            recipients: recipients,
            files: files,
            title: title,
        }
    } else {
        config = await generateConfig(type, param);
    }

    //set notification body file path
    let emailFilePath = `${emailFolderPath}${config.files.email}`;

    try{
        //read body file as text
        bodyEmail = fs.readFileSync(emailFilePath, 'utf8');
    } catch(err){
        throw Error(err);
    }

    // set variable inside test body
    bodyEmail = fillParameters(bodyEmail, param);

    if(Boolean(sendEmail)){
        await EmailService.sendEmail({
            subject: config.title,
            to: config.recipients.email,
            cc: "",
            text: "Please enable HTML!",
            body: bodyEmail,
            attachments:[]
        });
    }
    return true;
}

module.exports = {
    sendNotification
}