const path = require('path');
const express = require('express');//thư viện vừa cài
const morgan = require('morgan');
const app = express();//đối tượng app
const handlebars = require('express-handlebars');
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override');
const port = 3000;//cổng của web
const SortMiddleware = require('./app/controllers/SortMiddlewareCtrl');

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(SortMiddleware);

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(cookieParser());

app.engine('handlebars', handlebars.engine({
  helpers: {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'funnel-outline',
        asc: 'caret-up-outline',
        desc: 'caret-down-outline',
      }; 

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      };

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}" style="color: black">
              <ion-icon name="${icon}"></ion-icon>
              </a>`
    }
  }
}));

// app.engine(
//   handlebars({
//     helpers: {
//       sortable: (field, sort) => {



//         return `<a href="?_sort&column=Ten_Tour&type=desc">
//           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
//             fill="#000000">
//             <path d="M0 0h24v24H0z" fill="none" />
//             <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
//           </svg>
//         </a>`;
//       }
//     },
//   }),
// );

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
