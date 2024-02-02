// ! Настраиваем окружение для работы

// todo инициализируем проект 
//  npm init -y   
// todo ставим eslint 
//   npx eslint --init  
// todo делаем гитигнор 
//  npx create-gitignore node  
// todo устанавливаем необходимые библиотеки 
//   npm i sequelize sequelize-cli pg pg-hstore  
// todo создаём файл .sequelizerc , копируем в него следующее:
/*

     const path = require('path');

    module.exports = {
        'config': path.resolve('db', 'config', 'database.json'),
        'models-path': path.resolve('db', 'models'),
        'seeders-path': path.resolve('db', 'seeders'),
        'migrations-path': path.resolve('db', 'migrations'),
    };
//! Создаем базу 

    //  npx sequelize init

//todo правим конфиги доступа к БД на свои

"development": {
    "username": "postgres",
    "password": "123",
    "database": "carv",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },


//  npx sequelize db:create

//! По желанию создаем scripts в package.json

"mig": "npx sequelize db:migrate"
"undo": "npx sequelize db:migrate:undo:all"
"migSeed": "npx sequelize db:seed:all"
"rebase": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all"



// ! Создаём модели
//  npx sequelize-cli model:generate --name User --attributes name:string,password:string
//  npx sequelize-cli model:generate --name Product --attributes name:string,price:integer
//  npx sequelize-cli model:generate --name Order --attributes userId:integer,productId:integer


// ! Работаем с миграциями,  устанавливаем связь
// todo дописываем связь для Sites к ownerId


        references: {
                model: 'Students',
                key: 'id',
            },
            onDelete: 'cascade',
            allowNull: false,

 //!  Накатываем миграции 
// npx sequelize db:migrate

//! Откатываем миграций
// npx sequelize db:migrate:undo:all


// ! Работаем с моделями, устанавливаем связь   belongsTo - hasMany 

 this.belongsTo(models.Students, { foreignKey: 'ownerId' });

 this.hasMany(models.Sites, { foreignKey: 'ownerId' });


// ! Работаем с моделями, устанавливаем связь   belongsToMany - связующая - belongsToMany
// todo Мы связываем User и Product, поэтому Order оставляем пустым

 this.belongsToMany(models.User, { through: models.Order, foreignKey: 'productId' });

 this.belongsToMany(models.Product, { through: models.Order, foreignKey: 'userId' });


//! Создаем сиды-файлы по названию 
// npx sequelize-cli seed:generate --name seedGroups
// npx sequelize-cli seed:generate --name seedStudents


// ! Засидим таблицы
//todo Используем пример кода из комментария, меняем название таблицы, вставляем данные

await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Jooe",
          password: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John De",
          password: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
//todo Не забываем настроить откат сидов!! (порядок важен!) Если в одном файле все сиидим : 1 Orders 2 Users 3 Products; 
     await queryInterface.bulkDelete("Users", null, {});

     
     await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "dgdfhdg",
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "hgfsg",
          price: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
    await queryInterface.bulkDelete("Products", null, {});


      await queryInterface.bulkInsert(
      "Orders",
      [
        {
          userId: 1,
          productId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          productId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
     await queryInterface.bulkDelete("Orders", null, {});

//! Накатываем сиды 
// npx sequelize db:seed:all

//* Если надо накатить один по имени
// npx sequelize db:seed --seed 20240112071944-seedStudents.js

//! По желанию создает scripts в package.json

"mig": "npx sequelize db:migrate"
"undo": "npx sequelize db:migrate:undo:all"
"migSeed": "npx sequelize db:seed:all"
"rebase": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all"

//! Работаем с запросами CRUD
// todo создаём файл app.js
// todo импортим в него модели 

const { Product, User } = require('./db/models');




// todo достаем всех студентов по группе
const findAllBuffaloesStudents = async (groupId) => {
  try {
    const students = await Student.findAll({ where: { groupId } });
    const result = students.map((el) => el.get({ plain: true }));
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// todo достаем всех студента с группой
const studentWithGroup = async () => {
  try {
    const student = await Student.findOne({
      where: {
        id: 1,
      },
      attributes: ['firstname', 'groupId'],
      include: {
        model: Group,
        attributes: ['name'],
      },
    });
    const result = student.get({ plain: true });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

//todo достаем посты с джоиневаем User с атрибутами, Tag весь
const findAllPosts = async () => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['id', 'login', 'email'] },
        { model: Tag },
      ],
    });
    const res = posts.map((el) => el.get({ plain: true }));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

//todo Достаем все теги с джоиневаем Post с атрибутами какие хотим
const findAllTags = async () => {
  try {
    const tags = await Tag.findAll({
      include: { model: Post, attributes: ['id', 'title'] },
    });
    const res = tags.map((el) => el.get({ plain: true }));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

//todo Создаем пост и навешиваем тэги
const createPostTag = async (title, text, userId, tags) => {
  try {
    const post = await Post.create({ title, text, userId });
    tags.forEach((el) => PostTag.create({ postId: post.id, tagId: el }));
  } catch (error) {
    console.log(error);
  }
};

//todo Создаем студента
const createStudent = async () => {
  try {
    const student = await Student.create({
      firstname: 'Dima',
      age: 20,
      groupId: 1,
    });
    console.log(student);
  } catch (error) {
    console.log(error);
  }
};

//todo Если пользователя нету по where, создаем его по defaults.

const regUser = async (login, email, password) => {
  try {
    const [user, isCreated] = await User.findOrCreate({
      where: {
        [Op.or]: [{ login }, { email }],
      },
      defaults: { login, email, password },
    });
    console.log(user);
    console.log('***isCreated***', isCreated);
  } catch (error) {
    console.log(error);
  }
};


//todo Ищем пользователя по ID
const findUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    console.log(user.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
};


//todo Удаляем группу по ID
const deleteGroup = async (id) => {
  try {
    await Group.destroy({ where: { id } });
    console.log('Deleted!');
  } catch (error) {
    console.log(error);
  }
};

//todo меняем name на firstname по ID
const updateStudent = async (id, name, age) => {
  try {
    await Student.update({ firstname: name, age }, { where: { id } });
  } catch (error) {
    console.log(error);
  }
};
