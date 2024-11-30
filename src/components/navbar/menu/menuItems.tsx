import {
  School,
  CardMembership,
  Favorite,
  Dashboard,
  Notifications,
  Message,
  Settings,
  Payment,
  Subscriptions,
  CreditCard,
  History,
  Language,
  AccountCircle,
  Edit,
  Help,
  Logout,
} from "@mui/icons-material";

interface MenuItemType {
  icon?: React.ReactNode;
  textKey?: string;
  divider?: boolean;
  url?: string;
}

export const menuItems: MenuItemType[] = [
  {
    icon: <School fontSize="small" />,
    textKey: "my_learning",
    url: "/my-course",
  },
  {
    icon: <CardMembership fontSize="small" />,
    textKey: "my_cart",
    url: "/cart",
  },
  {
    icon: <Favorite fontSize="small" />,
    textKey: "wishlist",
    url: "/my-course/wishlist/",
  },
  {
    icon: <Dashboard fontSize="small" />,
    textKey: "instruction_dashboard",
    url: "/instructor/course",
  },
  { divider: true },

  {
    icon: <Message fontSize="small" />,
    textKey: "messages",
    url: "/messages",
  },
  { divider: true },
  {
    icon: <Settings fontSize="small" />,
    textKey: "account_settings",
    url: "/user/edit-account/",
  },
  {
    icon: <History fontSize="small" />,
    textKey: "purchase_history",
    url: "/purchase-history",
  },

  {
    icon: <AccountCircle fontSize="small" />,
    textKey: "public_profile",
    url: "/user/public-profile",
  },
  {
    icon: <Edit fontSize="small" />,
    textKey: "edit_profile",
    url: "/user/edit-profile/",
  },
  { divider: true },
  // {
  //   icon: <Help fontSize="small" />,
  //   textKey: "help_and_support",
  //   url: "/help-support",
  // },
  {
    icon: <Logout fontSize="small" />,
    textKey: "logout",
  },
];
