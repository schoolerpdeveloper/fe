import { RouterEnum } from "src/app/enums/router.enum";

/** Flat node with expandable and level information */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
  icon?:string,
  url?:string
}
export const TREE_DATA: ExampleFlatNode[] = [
  {
    name: 'Dashboard',
    expandable: true,
    level: 0,
    icon:'home',
    // url:`${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}`
  },
  {
    name: 'Student Management',
    expandable: false,
    level: 1,
    icon:'chevron_right',
    url:`${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}/${RouterEnum.STUDENT_MANAGEMENT}`
  },
  {
    name: 'Fees Management',
    expandable: false,
    level: 1,
    icon:'chevron_right',
    url:`${RouterEnum.CONTAINER}/${RouterEnum.FEES_MANAGEMENT}`
  },
];
