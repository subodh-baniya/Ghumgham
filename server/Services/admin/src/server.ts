import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import app from './app.js';


AdminJS.registerAdapter({
  Database: AdminJSTypeorm.Database,
  Resource: AdminJSTypeorm.Resource,
});

const adminOptions = {
  resources: [

  ], // Add your Entities here
  rootPath: '/admin',
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(admin.options.rootPath, adminRouter);

app.listen(3000, () => {
  console.log('AdminJS started at http://localhost:3000/admin');
});
