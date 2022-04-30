/** Flat node with expandable and level information */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
  icon?:string
}
export const TREE_DATA: ExampleFlatNode[] = [
  {
    name: 'Dashboard',
    expandable: true,
    level: 0,
    icon:'home'
  },
  {
    name: 'Student Managemnt',
    expandable: false,
    level: 1,
    icon:'home'
  },
  {
    name: 'Banana',
    expandable: false,
    level: 1,
    icon:'home'
  },
  {
    name: 'Fruit loops',
    expandable: false,
    level: 1,
    icon:'home'
  },
  {
    name: 'Vegetables',
    expandable: true,
    level: 0,
    icon:'home'
  },
  {
    name: 'Green',
    expandable: false,
    level: 1,
    icon:'home'
  },

  {
    name: 'Orange',
    expandable: false,
    level: 1,
    icon:'home'
  },
];
