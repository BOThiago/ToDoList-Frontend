export class MenuItemModel {
  route!: string;
  click?: () => void;
  title!: string;
  icon?: string;
  img?: string;
  active?: boolean = false;
}
