import { ComponentProps } from "react";
import { SidebarItemGroup as FlowbiteSidebarItemGroup } from "flowbite-react";

type Props = ComponentProps<typeof FlowbiteSidebarItemGroup>;

export default function SidebarItemGroup(props: Props) {
  return <FlowbiteSidebarItemGroup {...props} />;
}

