import {
  Computer,
  School,
  DataUsage,
  Security,
  Cloud,
  Devices,
  Storage,
  Build,
  DeveloperBoard,
  Wifi,
  Engineering,
  Psychology,
} from "@mui/icons-material";
import { t } from "i18next";

export enum CategoryType {
  PROGRAMMING = "Programming",
  DATA_SCIENCE = "Data Science",
  WEB_DEVELOPMENT = "Web Development",
  CYBER_SECURITY = "Cyber Security",
  CLOUD_COMPUTING = "Cloud Computing",
  MACHINE_LEARNING = "Machine Learning",
  DATABASE_ADMINISTRATION = "Database Administration",
  DEVOPS = "DevOps",
  IT_SUPPORT = "IT Support",
  NETWORKING = "Networking",
  SOFTWARE_ENGINEERING = "Software Engineering",
  ARTIFICIAL_INTELLIGENCE = "Artificial Intelligence",
}

interface MenuItemType {
  icon?: React.ReactNode;
  textKey?: string;
  divider?: boolean;
  url?: string;
}

export const categoriesItem: MenuItemType[] = [
  {
    icon: <School fontSize="small" />,
    textKey: "programming",
    url: `/course_type/${CategoryType.PROGRAMMING}`,
  },
  {
    icon: <DataUsage fontSize="small" />,
    textKey: "data_science",
    url: `/course_type/${CategoryType.DATA_SCIENCE}`,
  },
  {
    icon: <Computer fontSize="small" />,
    textKey: "web_development",
    url: `/course_type/${CategoryType.WEB_DEVELOPMENT}`,
  },
  {
    icon: <Security fontSize="small" />,
    textKey: "cyber_security",
    url: `/course_type/${CategoryType.CYBER_SECURITY}`,
  },
  { divider: true },
  {
    icon: <Cloud fontSize="small" />,
    textKey: "cloud_computing",
    url: `/course_type/${CategoryType.CLOUD_COMPUTING}`,
  },
  {
    icon: <Devices fontSize="small" />,
    textKey: "machine_learning",
    url: `/course_type/${CategoryType.MACHINE_LEARNING}`,
  },
  { divider: true },
  {
    icon: <Storage fontSize="small" />,
    textKey: "database_administration",
    url: `/course_type/${CategoryType.DATABASE_ADMINISTRATION}`,
  },
  {
    icon: <Build fontSize="small" />,
    textKey: "devops",
    url: `/course_type/${CategoryType.DEVOPS}`,
  },
  {
    icon: <Engineering fontSize="small" />,
    textKey: "it_support",
    url: `/course_type/${CategoryType.IT_SUPPORT}`,
  },
  {
    icon: <Wifi fontSize="small" />,
    textKey: "networking",
    url: `/course_type/${CategoryType.NETWORKING}`,
  },
  {
    icon: <DeveloperBoard fontSize="small" />,
    textKey: "software_engineering",
    url: `/course_type/${CategoryType.SOFTWARE_ENGINEERING}`,
  },
  { divider: true },
  {
    icon: <Psychology fontSize="small" />,
    textKey: "artificial_intelligence",
    url: `/course_type/${CategoryType.ARTIFICIAL_INTELLIGENCE}`,
  },
];
