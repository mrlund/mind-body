const fs = require('fs-extra')

const contentObj = fs.readJsonSync('./src/assets/content/toc.json');
let root = './src/assets/content/';
contentObj.courseModules.forEach(module => {
    fs.ensureDirSync(root + module.urlName);
    module.sessions.forEach(session => {
        fs.ensureDirSync(root + module.urlName + "/" + session.urlName);
        session.pages.forEach(page => {
            fs.ensureFile(root + module.urlName + "/" + session.urlName + "/" + page.urlName + ".html");
        });        
    });
});

