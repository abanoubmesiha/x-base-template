import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
} from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from "react";

const NavItem = ({ icon: Icon, label, isCollapsed, onClick }) => (
  <Button
    variant="ghost"
    className={`w-full justify-start ${isCollapsed ? "px-2" : "px-4"}`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    {!isCollapsed && <span className="ml-2">{label}</span>}
  </Button>
);

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: InboxIcon, label: "Inbox" },
    { icon: CalendarIcon, label: "Calendar" },
    { icon: SearchIcon, label: "Search" },
    { icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-xl font-bold">Application</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
              onClick={() => {}}
            />
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

const MobileSidebar = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <MobileSidebar>
        <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
      </MobileSidebar>
      <main className="flex-1 p-4">
        <div className="md:hidden mb-4">
          <MobileSidebar>
            <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
          </MobileSidebar>
        </div>
        <h1 className="text-2xl font-bold mb-4">Page Content</h1>
        <p>This is a placeholder for the main content of the page.</p>
      </main>
    </div>
  );
}
