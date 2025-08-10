import { ComponentProps } from "react";
import { SidebarItem as FlowbiteSidebarItem } from "flowbite-react";

type Props = ComponentProps<typeof FlowbiteSidebarItem>;

export default function SidebarItem(props: Props) {
  return <FlowbiteSidebarItem {...props} />;
}

