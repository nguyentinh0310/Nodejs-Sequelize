Link docs: https://sequelize.org/master/manual/migrations.html

1: Cài đặt các thư viện: sequlize-cli, sequelize và mysql2.

```bash
  yarn add -D sequelize-cli
  yarn add mysql2
  yarn add sequelize
```

  Nội dung file .sequelizerc

```bash
const path = require('path');
  module.exports = {
    'config': path.resolve('./src/config', 'config.json'),
    'migrations-path': path.resolve('./src', 'migrations'),
    'models-path': path.resolve('./src', 'models'),
    'seeders-path': path.resolve('./src', 'seeders')
  }
```

2: Thêm file .sequelizerc và chạy câu lệnh: `node_modules/.bin/sequelize init`.

3: Tạo model: `yarn sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

4: Tạo migrations: `yarn sequelize-cli db:migrate`

5.1: Tạo Seeder: `yarn sequelize-cli seed:generate --name demo-user`

5.2: Chạy Seeder: `yarn sequelize-cli db:seed:all`

+ Quản lý thêm sửa xóa nhân viên + Quản lý thêm sửa xóa khách hàng
+ Quản lý thêm sửa xóa Project cho khách hàng
+ Thêm người vào project theo các khoảng thời gian nhất định
+ Báo cáo hàng ngày của nhân viên các công việc đã làm trong các
project được assign
