const mongoose = require('mongoose');

const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
    await mongoose.connect(config.database, config.options);

    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const users = await User.create(
        {username: 'Adil', password: 'adil123', fullName: 'Adil', phoneNumber: '+996990442280', token: 'uahahah'},
        {username: 'Ruslan', password: 'ruslan123', fullName: 'Ruslan', phoneNumber: '+996700442280', token: 'hihihihi'}
    );

    const categories = await Category.create(
        {title: 'Транспорт'},
        {title: 'Недвижимость'},
        {title: 'Электроника'},
        {title: 'Спорт и Хобби'},w
    );

    await Product.create(
        {
            userId: users[0]._id,
            categoryId: categories[0]._id,
            title: 'Audi Q7 4M Кроссовер',
            description: 'Silk Road Auto. Подбор и доставка двигателем, японской и европейской сборки из России! Минимальные цены! Все авто с русифицированным меню, с маленьким пробегом, с комплектом шин и дисков (зима- лето)! Срок доставки 7-14 дней. Цена с учетом таможенной очистки и доставки.',
            image: 'audi.jpg',
            price: 32100,
            datetime: '2020-03-21T07:13:37.098Z'
        },
        {
            userId: users[1]._id,
            categoryId: categories[0]._id,
            title: 'Audi A8 D4/4H [рестайлинг] Седан',
            description: '2013 года выпуска Объем 3.0 Черный на черном Европеец Присоски, безключевой доступ, подогрев сидений всех,шторки, двухзонный климат контроль В идеальном состоянии',
            image: 'audi2.jpg',
            price: 27000,
            datetime: '2020-03-19T07:13:37.098Z'
        },
        {
            userId: users[1]._id,
            categoryId: categories[0]._id,
            title: 'Lexus RX 3 поколение Кроссовер 5-дв',
            description: 'Срочно продаю Lexus RX 350(3 поколения), год 2009, объем 3.5, 4 WD, бензин, цвет серебристый металлик, свежий из США, Carfax чистый, 3 родных ключа с завода, сигнализация, не битые в родной краске, на панели приборов никаких ошибок нет, стекла родные "Lexus", коробка, мотор в идеальном состоянии, ходовая вложении не требует, кондиционер-печка работают как положено, машины в полной комплектации из опции: салон черная кожа, монитор, камера зад.вида, подогрев и обдув сидений, люк, мультируль и ещё много чего есть интересного ...',
            image: 'lexus.jpg',
            price: 18700,
            datetime: '2020-03-21T10:23:37.098Z'
        },
        {
            userId: users[1]._id,
            categoryId: categories[2]._id,
            title: 'Mac Book Air 2013',
            description: 'Тонкий и лёгкий MacBook Air — это дисплей Retina, новая клавиатура Magic Keyboard, Touch ID, скорость до 2 раз выше',
            image: 'macbook.jpeg',
            price: 600,
            datetime: '2020-03-21T12:23:42.098Z'
        },
        {
            userId: users[0]._id,
            categoryId: categories[2]._id,
            title: 'Canon 60d 18-200mm',
            description: 'Обновление всемирно известной линейки EOS от Canon приходит к нам в виде EOS 60D. Новая модель имеет 18-мегапиксельный сенсор CMOS формата APS-C и уже успевший себя хорошо зарекомендовать процессор DIGIC 4; уже эти две детали гарантируют высококачественные снимки с прекрасной передачей и быстродействие камеры (считывание с сенсора происходит в четыре канала), которое обеспечивает скорость непрерывной съемки в 5.3 кадра в секунду. Система экспозамера в этой модели взята из 7D: это iFCL с 63-зонным двухслойным сенсором. Автофокус производится по 9-точечной системе. Не стоит забывать о функции видеозаписи - здесь она в формате FullHD 1080p.',
            image: 'canon.jpg',
            price: 1000,
            datetime: '2020-03-21T14:23:42.098Z'
        },
        {
            userId: users[1]._id,
            categoryId: categories[3]._id,
            title: 'Велосипед Stinger 26" Laguna D, 17"',
            description: 'Stinger Laguna D - женский спортивный велосипед, но с достаточно низкой геометрией рамы, чтобы девушкам было еще удобнее садиться на велосипед. Алюминиевая рама, дисковые тормоза и амортизационная вилка - у этой модели есть все, что нужно для комфортной поездки, как по городу, так и по пресеченной местности. Наименование заднего переключателя: Shimano Tourney Тормоза: STG DISC Тип вилки:',
            image: 'velik.jpeg',
            price: 300,
            datetime: '2020-03-21T15:23:42.098Z'
        },
        {
            userId: users[0]._id,
            categoryId: categories[1]._id,
            title: 'Продажа Дома от собственника: 700 кв. м, 7 комнат',
            description: 'Продаю 3х уровневый особняк в центре, общей площадью 700 м2, участок 7 соток На участке находиться свой трансформатор на 100 кВт. 1эй этаж прихожая, санузел, гараж на 2 машины, холл 86 м2, кухня – столовая 20м2, зал 40м2,' +
                'гостевая спальня, выход в бассейн, сауну, санузел, бройлерную (все вместе 100м2).' +
                'С бассейна выход на террасу.' +
                '2ой этаж - холл, 2 спальни с санузлом, 1 спальня без су, кабинет, санузел.' +
                'Нижний 3 ий уровень - спальня, тренажерный зал, караоке, прачечная, кладовая.' +
                'В доме свежий дизайнерский ремонт.' +
                'Все центральные коммуникации, отопление газовое (2 котла ) и электрическое ( 1 котел).' +
                'Дом оснащен сигнализацией с датчиками на весь дом, видеокамерами по всему периметру,' +
                'Охранной тревожной кнопкой..' +
                'Район Турусбекова – Куренкеева, 15 минут пешком до ТЦ «Бишкек Парк».',
            image: 'dom.jpeg',
            price: 390000,
            datetime: '2020-03-21T15:33:42.098Z'
        }

    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong');
});
