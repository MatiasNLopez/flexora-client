"use client";

import { useState } from "react";
import { Sidebar, SidebarItems, SidebarCollapse, SidebarLogo } from "flowbite-react";
import BurgerButton from "./iu/BurgerButton";
import { Button, Card } from "flowbite-react";
import Link from "next/link";
import {
  HiOutlineMenu,
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineLogin,
} from "react-icons/hi";
import SidebarItemGroup from "./iu/SidebarItemGroup";
import SidebarItem from "./iu/SidebarItem";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);
  const [showCta, setShowCta] = useState(true);

  return (
    <>
      <BurgerButton
        aria-controls="flexora-sidebar"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Open sidebar</span>
        <HiOutlineMenu className="w-6 h-6" />
      </BurgerButton>
      <aside
        id="flexora-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto px-3 py-4">
          <Sidebar aria-label="Flexora Sidebar" className="!bg-transparent">
            <SidebarLogo href="#" img="/next.svg" imgAlt="Flexora" className="mb-3">
              Flexora
            </SidebarLogo>

            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem as={Link} href="#" icon={HiOutlineHome}>
                  Dashboard
                </SidebarItem>

                <SidebarCollapse icon={HiOutlineViewGrid} label="POS Order">
                  <SidebarItem as={Link} href="#">New Order</SidebarItem>
                  <SidebarItem as={Link} href="#">Returns</SidebarItem>
                </SidebarCollapse>

                <SidebarCollapse icon={HiOutlineUser} label="Users">
                  <SidebarItem as={Link} href="/dashboard/users">List</SidebarItem>
                  <SidebarItem as={Link} href="/dashboard/roles">Roles</SidebarItem>
                </SidebarCollapse>

                <SidebarItem as={Link} href="#" icon={HiOutlineLockClosed}>
                  Products
                </SidebarItem>

                <SidebarCollapse icon={HiOutlineLockClosed} label="Transactions">
                  <SidebarItem as={Link} href="#">Payments</SidebarItem>
                  <SidebarItem as={Link} href="#">Refunds</SidebarItem>
                </SidebarCollapse>

                <SidebarCollapse icon={HiOutlineLockClosed} label="Orders">
                  <SidebarItem as={Link} href="#">Sales Order</SidebarItem>
                  <SidebarItem as={Link} href="#">Purches Order</SidebarItem>
                </SidebarCollapse>

                <SidebarItem as={Link} href="#" icon={HiOutlineBell} label="1" labelColor="pink">
                  Inventory
                </SidebarItem>

                <SidebarItem as={Link} href="#" icon={HiOutlineViewGrid}>
                  Docs
                </SidebarItem>
                <SidebarItem as={Link} href="#" icon={HiOutlineViewGrid}>
                  Components
                </SidebarItem>
                <SidebarItem as={Link} href="#" icon={HiOutlineLogin}>
                  Help
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>

            {showCta && (
              <div className="mt-4">
                <Card className="bg-blue-50 dark:bg-blue-900 border-0">
                  <div className="flex items-start gap-2">
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">Beta</span>
                    <button
                      aria-label="Close"
                      onClick={() => setShowCta(false)}
                      className="ml-auto w-6 h-6 rounded-lg text-blue-900 hover:bg-blue-200 dark:text-blue-400 dark:hover:bg-blue-800 grid place-items-center"
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-400 mt-2">
                    New dashboard! Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
                  </p>
                  <Button color="blue" size="xs" className="w-fit">Check it out</Button>
                </Card>
              </div>
            )}
          </Sidebar>
        </div>
      </aside>

      {/* Content spacing now handled by dashboard layout */}
    </>
  );
}