// 按需引入elmentUi组件
import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Menu,
  MenuItem,
  Submenu,
  MessageBox,
  Message,
  Icon,
  Tabs,
  TabPane,
  Progress,
  Switch,
  Table,
  TableColumn,
  Pagination,
  Row
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Progress)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Pagination)

Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)